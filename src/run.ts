import assert from 'assert'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import { WorkflowRunEvent } from '@octokit/webhooks-types'
import { CheckSuiteQuery } from './generated/graphql'
import { CheckAnnotationLevel, CheckConclusionState } from './generated/graphql-types'
import { getCheckSuite } from './queries/check-suite'

type Octokit = InstanceType<typeof GitHub>

type Inputs = {
  token: string
}

export type Outputs = {
  annotationMessages: string
  annotationFailureMessages: string
  cancelled: boolean
  skipped: boolean
  associatedPullRequest: AssociatedPullRequest | undefined
}

type AssociatedPullRequest = {
  number: number
  url: string
}

export const run = async (inputs: Inputs): Promise<Outputs | undefined> => {
  if (github.context.eventName === 'workflow_run') {
    const e = github.context.payload as WorkflowRunEvent
    const octokit = github.getOctokit(inputs.token)
    return await handleWorkflowRun(e, octokit)
  }

  core.warning(`unknown event ${github.context.eventName}`)
}

const handleWorkflowRun = async (e: WorkflowRunEvent, octokit: Octokit): Promise<Outputs> => {
  const { check_suite_node_id } = e.workflow_run
  core.info(`Getting the check suite ${check_suite_node_id}`)
  const checkSuite = await getCheckSuite(octokit, { id: check_suite_node_id })
  core.info(`Found the check suite: ${JSON.stringify(checkSuite, undefined, 2)}`)
  return computeOutputs(checkSuite)
}

export const computeOutputs = (checkSuite: CheckSuiteQuery): Outputs => {
  assert(checkSuite.node != null)
  assert(checkSuite.node.__typename === 'CheckSuite')

  const annotationMessages = new Set<string>()
  const annotationFailureMessages = new Set<string>()
  const conclusions = new Array<CheckConclusionState>()
  for (const checkRun of checkSuite.node.checkRuns?.nodes ?? []) {
    if (checkRun == null) {
      continue
    }
    if (checkRun.conclusion) {
      conclusions.push(checkRun.conclusion)
    }
    for (const annotation of checkRun.annotations?.nodes ?? []) {
      if (annotation?.message) {
        annotationMessages.add(annotation.message)
        if (annotation.annotationLevel === CheckAnnotationLevel.Failure) {
          annotationFailureMessages.add(annotation.message)
        }
      }
    }
  }

  let associatedPullRequest
  assert(checkSuite.node.commit.associatedPullRequests != null)
  assert(checkSuite.node.commit.associatedPullRequests.nodes != null)
  if (checkSuite.node.commit.associatedPullRequests.nodes.length > 0) {
    const pull = checkSuite.node.commit.associatedPullRequests.nodes[0]
    assert(pull != null)
    associatedPullRequest = {
      number: pull.number,
      url: pull.url,
    }
  }

  return {
    annotationMessages: [...annotationMessages].join('\n'),
    annotationFailureMessages: [...annotationFailureMessages].join('\n'),
    cancelled: conclusions.some((c) => c === CheckConclusionState.Cancelled),
    skipped: conclusions.every((c) => c === CheckConclusionState.Skipped),
    associatedPullRequest,
  }
}

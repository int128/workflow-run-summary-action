import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import { WorkflowRunEvent } from '@octokit/webhooks-types'
import { CheckConclusionState } from './generated/graphql-types'
import { getCheckSuite } from './queries/check-suite'

type Octokit = InstanceType<typeof GitHub>

type Inputs = {
  token: string
}

type Outputs = {
  annotationMessages: string
  cancelled: boolean
  skipped: boolean
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
  const checkSuite = await getCheckSuite(octokit, { id: e.workflow_run.check_suite_node_id })
  if (checkSuite.node?.__typename !== 'CheckSuite') {
    throw new Error(`unknown __typename ${checkSuite.node?.__typename ?? 'undefined'}`)
  }

  const annotationMessages = new Set<string>()
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
      }
    }
  }

  return {
    annotationMessages: [...annotationMessages].join('\n'),
    cancelled: conclusions.some((c) => c === CheckConclusionState.Cancelled),
    skipped: conclusions.every((c) => c === CheckConclusionState.Skipped),
  }
}

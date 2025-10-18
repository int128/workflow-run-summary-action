import * as core from '@actions/core'
import type { Octokit } from '@octokit/action'
import type { Context } from './github.js'
import { getWorkflowRun } from './queries/getWorkflowRun.js'
import { getWorkflowRunSummary } from './workflow-run.js'

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

export const run = async (octokit: Octokit, context: Context): Promise<Outputs> => {
  const workflowRunNodeId = await getWorkflowRunNodeId(octokit, context)

  core.startGroup(`GraphQL: getWorkflowRun(${workflowRunNodeId})`)
  const workflowRun = await getWorkflowRun(octokit, { id: workflowRunNodeId })
  core.info(JSON.stringify(workflowRun, null, 2))
  core.endGroup()

  const summary = getWorkflowRunSummary(workflowRun)
  core.startGroup('Summary')
  core.info(JSON.stringify(summary, null, 2))
  core.endGroup()

  core.summary.addHeading('workflow-run-summary-action', 2)
  core.summary.addHeading('Annotations', 3)
  core.summary.addCodeBlock(summary.annotationMessages.join('\n'))
  core.summary.addHeading('Annotations (failure)', 3)
  core.summary.addCodeBlock(summary.annotationFailureMessages.join('\n'))
  if (summary.associatedPullRequest) {
    core.summary.addHeading('Pull Request', 3)
    core.summary.addLink(`#${summary.associatedPullRequest.number}`, summary.associatedPullRequest.url)
  }
  await core.summary.write()

  return {
    annotationMessages: summary.annotationMessages.join('\n'),
    annotationFailureMessages: summary.annotationFailureMessages.join('\n'),
    cancelled: summary.cancelled,
    skipped: summary.skipped,
    associatedPullRequest: summary.associatedPullRequest,
  }
}

const getWorkflowRunNodeId = async (octokit: Octokit, context: Context) => {
  if ('workflow_run' in context.payload && context.payload.workflow_run != null) {
    const workflowRunNodeId = context.payload.workflow_run.node_id
    core.info(`The target workflow run is ${workflowRunNodeId}`)
    return workflowRunNodeId
  }

  core.info(`Getting the current workflow run ${context.runId}`)
  const { data: workflowRun } = await octokit.rest.actions.getWorkflowRun({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.runId,
  })
  const workflowRunNodeId = workflowRun.node_id
  core.info(`The current workflow run is ${workflowRunNodeId}`)
  return workflowRunNodeId
}

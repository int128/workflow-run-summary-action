import * as core from '@actions/core'
import { getWorkflowRunSummary } from './workflow-run.js'
import { getWorkflowRun } from './queries/getWorkflowRun.js'
import { Context } from './github.js'
import { Octokit } from '@octokit/action'

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

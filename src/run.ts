import * as core from '@actions/core'
import { getWorkflowRunSummary } from './workflow-run.js'
import { getWorkflowRun } from './queries/workflow-run.js'
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

export const run = async (octokit: Octokit, context: Context): Promise<Outputs | undefined> => {
  const workflowRun = await getWorkflowRunForEvent(octokit, context)
  return getWorkflowRunSummary(workflowRun)
}

const getWorkflowRunForEvent = async (octokit: Octokit, context: Context) => {
  if ('workflow_run' in context.payload && context.payload.workflow_run != null) {
    const workflowRun = context.payload.workflow_run
    const workflowRunNodeId = workflowRun.node_id
    core.info(`Getting the target workflow run ${workflowRunNodeId}`)
    return await getWorkflowRun(octokit, { id: workflowRunNodeId })
  }

  core.info(`Getting the current workflow run ${context.runId}`)
  const { data: workflowRun } = await octokit.rest.actions.getWorkflowRun({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.runId,
  })
  const workflowRunNodeId = workflowRun.node_id
  core.info(`Getting the workflow run ${workflowRunNodeId}`)
  return await getWorkflowRun(octokit, { id: workflowRunNodeId })
}

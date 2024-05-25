import * as core from '@actions/core'
import * as github from '@actions/github'
import { WorkflowRunEvent } from '@octokit/webhooks-types'
import { getWorkflowRunSummary } from './workflow-run.js'
import { getWorkflowRun } from './queries/workflow-run.js'

type Octokit = ReturnType<typeof github.getOctokit>

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
  const octokit = github.getOctokit(inputs.token)
  if (github.context.eventName === 'workflow_run') {
    const e = github.context.payload as WorkflowRunEvent
    return await handleWorkflowRun(e, octokit)
  }
  return handleOtherEvent(octokit)
}

const handleWorkflowRun = async (e: WorkflowRunEvent, octokit: Octokit): Promise<Outputs> => {
  core.info(`Getting the workflow run ${e.workflow_run.node_id}`)
  const checkSuite = await getWorkflowRun(octokit, { id: e.workflow_run.node_id })
  core.info(`Found the workflow run: ${JSON.stringify(checkSuite, undefined, 2)}`)
  return getWorkflowRunSummary(checkSuite)
}

const handleOtherEvent = async (octokit: Octokit): Promise<Outputs> => {
  core.info(`Getting the workflow run ${github.context.runId}`)
  const { data: workflowRun } = await octokit.rest.actions.getWorkflowRun({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    run_id: github.context.runId,
  })

  core.info(`Getting the workflow run ${workflowRun.node_id}`)
  const checkSuite = await getWorkflowRun(octokit, { id: workflowRun.node_id })
  core.info(`Found the workflow run: ${JSON.stringify(checkSuite, undefined, 2)}`)
  return getWorkflowRunSummary(checkSuite)
}

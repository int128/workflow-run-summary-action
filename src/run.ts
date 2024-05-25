import assert from 'assert'
import * as core from '@actions/core'
import * as github from '@actions/github'
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
  const workflowRun = await getWorkflowRunForEvent(octokit)
  return getWorkflowRunSummary(workflowRun)
}

const getWorkflowRunForEvent = async (octokit: Octokit) => {
  if (github.context.eventName === 'workflow_run') {
    const workflowRun: unknown = github.context.payload.workflow_run
    assert(typeof workflowRun === 'object')
    assert(workflowRun !== null)
    assert('node_id' in workflowRun)
    assert(typeof workflowRun.node_id === 'string')
    core.info(`Getting the target workflow run ${workflowRun.node_id}`)
    return await getWorkflowRun(octokit, { id: workflowRun.node_id })
  }

  core.info(`Getting the current workflow run ${github.context.runId}`)
  const { data: workflowRun } = await octokit.rest.actions.getWorkflowRun({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    run_id: github.context.runId,
  })
  core.info(`Getting the workflow run ${workflowRun.node_id}`)
  return await getWorkflowRun(octokit, { id: workflowRun.node_id })
}

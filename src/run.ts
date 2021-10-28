import * as core from '@actions/core'
import * as github from '@actions/github'
import { GitHub } from '@actions/github/lib/utils'
import { WorkflowRunEvent } from '@octokit/webhooks-types'

type Octokit = InstanceType<typeof GitHub>

type Inputs = {
  token: string
}

export const run = async (inputs: Inputs): Promise<void> => {
  if (github.context.eventName === 'workflow_run') {
    const e = github.context.payload as WorkflowRunEvent
    const octokit = github.getOctokit(inputs.token)
    return await handleWorkflowRun(e, octokit)
  }
  core.warning(`unknown event ${github.context.eventName}`)
}

const handleWorkflowRun = async (e: WorkflowRunEvent, octokit: Octokit) => {
  const { data: suite } = await octokit.rest.checks.listForSuite({
    owner: e.workflow_run.repository.owner.login,
    repo: e.workflow_run.repository.name,
    check_suite_id: e.workflow_run.check_suite_id,
  })

  for (const run of suite.check_runs) {
    core.info(JSON.stringify(run, undefined, 2))
  }
}

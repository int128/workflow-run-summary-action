import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  const outputs = await run({
    token: core.getInput('token', { required: true }),
  })
  if (outputs !== undefined) {
    core.setOutput('annotation-messages', outputs.annotationMessages)
    core.setOutput('annotation-failure-messages', outputs.annotationFailureMessages)
    core.setOutput('cancelled', outputs.cancelled)
    core.setOutput('skipped', outputs.skipped)

    if (outputs.associatedPullRequest !== undefined) {
      core.setOutput('pull-request-number', outputs.associatedPullRequest.number)
      core.setOutput('pull-request-url', outputs.associatedPullRequest.url)
    }
  }
}

main().catch((e: Error) => {
  core.setFailed(e)
  console.error(e)
})

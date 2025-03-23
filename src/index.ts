import * as core from '@actions/core'
import { run } from './run.js'
import { getContext, getOctokit } from './github.js'

const main = async () => {
  const outputs = await run(getOctokit(), await getContext())
  core.setOutput('annotation-messages', outputs.annotationMessages)
  core.setOutput('annotation-failure-messages', outputs.annotationFailureMessages)
  core.setOutput('cancelled', outputs.cancelled)
  core.setOutput('skipped', outputs.skipped)

  if (outputs.associatedPullRequest !== undefined) {
    core.setOutput('pull-request-number', outputs.associatedPullRequest.number)
    core.setOutput('pull-request-url', outputs.associatedPullRequest.url)
  }
}

try {
  await main()
} catch (e) {
  core.setFailed(e instanceof Error ? e : String(e))
  console.error(e)
}

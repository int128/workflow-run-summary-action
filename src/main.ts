import * as core from '@actions/core'
import { run } from './run'

const main = async (): Promise<void> => {
  const outputs = await run({
    token: core.getInput('token', { required: true }),
  })
  if (outputs !== undefined) {
    core.setOutput('annotation-messages', outputs.annotationMessages)
    core.setOutput('cancelled', outputs.cancelled)
    core.setOutput('skipped', outputs.skipped)
  }
}

main().catch((e) => core.setFailed(e instanceof Error ? e.message : JSON.stringify(e)))

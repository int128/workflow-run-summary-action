# workflow-run-summary-action [![ts](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml)

This is an action to get the summary of current workflow run.

## Getting Started

Here is an example to send a Slack notification on failure.

````yaml
name: slack-notification

on:
  workflow_run:
    types:
      - completed

jobs:
  main-branch:
    if: github.event.workflow_run.conclusion == 'failure' && github.event.workflow_run.head_branch == 'main'
    runs-on: ubuntu-latest
    steps:
      - uses: int128/workflow-run-summary-action@v1
        id: summary

      - uses: actions/github-script@v6
        id: payload
        env:
          body: |-
            @${{ github.actor }} check ${{ github.event.workflow_run.conclusion }} at <${{ github.event.workflow_run.html_url }}|${{ github.event.workflow_run.name }}>
            ```
            ${{ steps.summary.outputs.annotation-messages }}
            ```
        with:
          # preview on https://app.slack.com/block-kit-builder
          script: |
            return {
              blocks: [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": process.env.body,
                  }
                }
              ]
            }

      - if: steps.summary.outputs.cancelled == 'false' && steps.summary.outputs.skipped == 'false'
        uses: slackapi/slack-github-action@v1
        with:
          channel-id: YOUR-CHANNEL-ID
          payload: ${{ steps.payload.outputs.result }}
        env:
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_APP_TOKEN }}
````

For example,

<img width="900" alt="image" src="https://user-images.githubusercontent.com/321266/155245109-22712f13-2f04-428d-9156-3fae5880ecd6.png">

You can preview a payload from https://app.slack.com/block-kit-builder.

### Example use-case

- https://github.com/quipper/slack-notification-action

## Summary

When this action is run on a `workflow_run` event, it inspects the target workflow run.
Otherwise, it inspects the current workflow run.

### Annotation messages

This actions returns the annotation messages of the current workflow run as follows:

- `annotation-messages`
- `annotation-failure-messages`

### Associated pull request

If the workflow run has an associated pull request, this action returns the following outputs:

- `pull-request-number`
- `pull-request-url`

### Conclusion

GitHub Actions returns the conclusion of workflow to `failure`, even if any job has been `cancelled` or `skipped`.

This action calculates the accurate conclusion from all jobs.
It provides the following outputs:

- `cancelled`: `true` if any job is cancelled
- `skipped`: `true` if all jobs are skipped

## Specification

### Inputs

| Name    | Default        | Description  |
| ------- | -------------- | ------------ |
| `token` | `github.token` | GitHub token |

### Outputs

| Name                          | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `annotation-messages`         | Annotation messages related to the workflow run |
| `annotation-failure-messages` | Annotation messages of failure only             |
| `pull-request-number`         | Number of associated pull request, if exists    |
| `pull-request-url`            | URL of associated pull request, if exists       |
| `cancelled`                   | `true` if any check run is cancelled            |
| `skipped`                     | `true` if all checks are skipped                |

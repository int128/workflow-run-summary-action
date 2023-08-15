# workflow-run-summary-action [![ts](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml)

This is an action to get the summary of the current workflow run.

## Purpose

This action provides the following outputs.

### Annotation messages

It would be nice if we can see the cause of failure on Slack notification.
For example,

<img width="900" alt="image" src="https://user-images.githubusercontent.com/321266/155245109-22712f13-2f04-428d-9156-3fae5880ecd6.png">

This actions fetches the annotations of the current workflow run.
It provides the following outputs:

- `annotation-messages`
- `annotation-failure-messages`

### Conclusion

GitHub Actions sets the conclusion of workflow to `failure`, even if it was `cancelled` or `skipped`.
This action determines the accurate conclusion from all jobs.
It provides the following outputs:

- `cancelled`
- `skipped`

## Getting Started

This example workflow sends a notification when a workflow fails on main branch.

````yaml
name: slack-notification

on:
  workflow_run:
    types:
      - completed
    workflows:
      - '*--test'

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

You can build a Slack payload on https://app.slack.com/block-kit-builder.

## Use-case

- https://github.com/quipper/slack-notification-action

## Specification

This action fetches the details of workflow run by GraphQL [check suite query](src/queries/check-suite.ts).

### Inputs

| Name    | Default        | Description  |
| ------- | -------------- | ------------ |
| `token` | `github.token` | GitHub token |

### Outputs

| Name                          | Description                                     |
| ----------------------------- | ----------------------------------------------- |
| `annotation-messages`         | Annotation messages related to the workflow run |
| `annotation-failure-messages` | Annotation messages of failure only             |
| `cancelled`                   | `true` if any check run is cancelled            |
| `skipped`                     | `true` if all checks are skipped                |
| `pull-request-number`         | Number of associated pull request, if exists    |
| `pull-request-url`            | URL of associated pull request, if exists       |

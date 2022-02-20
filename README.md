# workflow-run-summary-action [![ts](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml)

This is an action to get a summary of a workflow run.


## Getting Started

### Slack notification

Here is an example to send a notification to a Slack channel when a workflow fails on main branch.

GitHub Actions sets the conclusion as `failure` even if a workflow was cancelled or skipped.
You can determine the cancel or skip by this action.

```yaml
name: notify-slack

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
      - if: steps.summary.outputs.cancelled == 'false' && steps.summary.outputs.skipped == 'false'
        uses: sonots/slack-notice-action@v3
        with:
          status: custom
          payload: |
            {
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": process.env.SLACK_PAYLOAD
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_PAYLOAD: |
            @${{ github.actor }} check ${{ github.event.workflow_run.conclusion }} at <${{ github.event.workflow_run.html_url }}|${{ github.event.workflow_run.name }}>
            ```
            ${{ steps.summary.outputs.annotation-messages }}
            ```
```

You can build a payload on https://app.slack.com/block-kit-builder.


## Inputs

| Name | Default | Description
|------|----------|------------
| `token` | `github.token` | GitHub token


## Outputs

| Name | Description
|------|------------
| `annotation-messages` | annotation messages related to the workflow run
| `cancelled` | true if any check run is cancelled
| `skipped` | true if all checks are skipped

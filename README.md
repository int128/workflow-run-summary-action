# workflow-run-summary-action [![ts](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml)

This action provides the summary of workflow run.

## Getting Started

### Example: Slack notification

Here is a workflow to send the summary of workflow run to Slack using [slackapi/slack-github-action](https://github.com/slackapi/slack-github-action).

````yaml
name: slack-notification

on:
  workflow_run:
    types:
      - completed
    branches:
      - main

jobs:
  failure:
    if: github.event.workflow_run.conclusion == 'failure'
    runs-on: ubuntu-latest
    steps:
      - uses: int128/workflow-run-summary-action@v1
        id: summary
      - uses: actions/github-script@v7
        id: body-json
        with:
          script: return process.env.body
        env:
          body: |
            @${{ github.actor }} Workflow <${{ github.event.workflow_run.html_url }}|${{ github.event.workflow_run.name }}> is ${{ github.event.workflow_run.conclusion }}.
            ```
            ${{ steps.summary.outputs.annotation-messages }}
            ```
      - if: steps.summary.outputs.cancelled == 'false' && steps.summary.outputs.skipped == 'false'
        uses: slackapi/slack-github-action@v2
        with:
          method: chat.postMessage
          token: ${{ secrets.SLACK_BOT_TOKEN }}
          payload: |
            channel: your-channel-id
            blocks:
              - type: section
                text:
                  type: mrkdwn
                  text: ${{ steps.body-json.outputs.result }}
````

## Specification

When this action is run on a `workflow_run` event, it inspects the target workflow run.
Otherwise, it inspects the current workflow run.

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

#### Annotation messages

If the workflow run contains annotation messages, this action collects them and returns as a single string.

- `annotation-messages`
- `annotation-failure-messages`

#### Associated pull request

If the commit of the workflow run is associated with a pull request, this action returns the following outputs:

- `pull-request-number`
- `pull-request-url`

#### Conclusion

GitHub Actions returns the `conclusion` of workflow run to failure, even if any job has been cancelled or skipped.
You can determine the conclusion using the following outputs:

- `cancelled` indicates whether any job is cancelled.
- `skipped` indicates whether all jobs are skipped.

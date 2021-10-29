# workflow-run-summary-action [![ts](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml/badge.svg)](https://github.com/int128/workflow-run-summary-action/actions/workflows/ts.yaml)

This is an action to calculate summary of a workflow run.


## Getting Started

To run this action:

```yaml
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: int128/workflow-run-summary-action@v1
        id: summary
```


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

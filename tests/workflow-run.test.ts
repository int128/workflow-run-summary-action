import { describe, expect, test } from 'vitest'
import { CheckAnnotationLevel, CheckConclusionState } from '../src/generated/graphql-types.js'
import { getWorkflowRunSummary, WorkflowRunSummary } from '../src/workflow-run.js'

describe('getWorkflowRunSummary', () => {
  test('full fields', () => {
    // https://github.com/int128/workflow-run-summary-action/actions/runs/5861542956/job/15891810930
    // {"id": "CS_kwDOGSet3s8AAAADg4c9nQ"}
    const outputs = getWorkflowRunSummary({
      node: {
        __typename: 'WorkflowRun',
        checkSuite: {
          checkRuns: {
            nodes: [
              {
                conclusion: CheckConclusionState.Success,
                annotations: {
                  nodes: [
                    {
                      message: 'this is an example',
                      annotationLevel: CheckAnnotationLevel.Failure,
                    },
                  ],
                },
              },
            ],
          },
          commit: {
            associatedPullRequests: {
              totalCount: 1,
              nodes: [
                {
                  number: 484,
                  url: 'https://github.com/int128/workflow-run-summary-action/pull/484',
                },
              ],
            },
          },
        },
      },
    })
    expect(outputs).toStrictEqual<WorkflowRunSummary>({
      cancelled: false,
      skipped: false,
      annotationMessages: new Set(['this is an example']),
      annotationFailureMessages: new Set(['this is an example']),
      associatedPullRequest: {
        number: 484,
        url: 'https://github.com/int128/workflow-run-summary-action/pull/484',
      },
    })
  })

  test('no annotations or associated pulls', () => {
    // https://github.com/int128/sandbox/actions/runs/5862603103/job/15894663930
    // {"id": "CS_kwDOBCmOrs8AAAADg69rsw"}
    const outputs = getWorkflowRunSummary({
      node: {
        __typename: 'WorkflowRun',
        checkSuite: {
          checkRuns: {
            nodes: [
              {
                conclusion: CheckConclusionState.Success,
                annotations: {
                  nodes: [],
                },
              },
            ],
          },
          commit: {
            associatedPullRequests: {
              totalCount: 0,
              nodes: [],
            },
          },
        },
      },
    })
    expect(outputs).toStrictEqual<WorkflowRunSummary>({
      cancelled: false,
      skipped: false,
      annotationMessages: new Set(),
      annotationFailureMessages: new Set(),
      associatedPullRequest: undefined,
    })
  })
})

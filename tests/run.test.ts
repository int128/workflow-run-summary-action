import { CheckAnnotationLevel, CheckConclusionState } from '../src/generated/graphql-types.js'
import { Outputs, computeOutputs } from '../src/run.js'

describe('computeOutputs', () => {
  test('full fields', () => {
    // https://github.com/int128/workflow-run-summary-action/actions/runs/5861542956/job/15891810930
    // {"id": "CS_kwDOGSet3s8AAAADg4c9nQ"}
    const outputs = computeOutputs({
      node: {
        __typename: 'CheckSuite',
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
    })
    expect(outputs).toStrictEqual<Outputs>({
      cancelled: false,
      skipped: false,
      annotationMessages: 'this is an example',
      annotationFailureMessages: 'this is an example',
      associatedPullRequest: {
        number: 484,
        url: 'https://github.com/int128/workflow-run-summary-action/pull/484',
      },
    })
  })

  test('no annotations or associated pulls', () => {
    // https://github.com/int128/sandbox/actions/runs/5862603103/job/15894663930
    // {"id": "CS_kwDOBCmOrs8AAAADg69rsw"}
    const outputs = computeOutputs({
      node: {
        __typename: 'CheckSuite',
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
    })
    expect(outputs).toStrictEqual<Outputs>({
      cancelled: false,
      skipped: false,
      annotationMessages: '',
      annotationFailureMessages: '',
      associatedPullRequest: undefined,
    })
  })
})

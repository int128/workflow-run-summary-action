import { GitHub } from '@actions/github/lib/utils'
import { CheckSuiteQuery, CheckSuiteQueryVariables } from '../generated/graphql'

type Octokit = InstanceType<typeof GitHub>

const query = /* GraphQL */ `
  query checkSuite($id: ID!) {
    node(id: $id) {
      __typename
      ... on CheckSuite {
        checkRuns(first: 100) {
          nodes {
            conclusion
            annotations(first: 10) {
              nodes {
                message
                annotationLevel
              }
            }
          }
        }
      }
    }
  }
`

export const getCheckSuite = async (o: Octokit, v: CheckSuiteQueryVariables): Promise<CheckSuiteQuery> =>
  await o.graphql(query, v)

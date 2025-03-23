import assert from 'assert'
import { GetWorkflowRunQuery } from './generated/graphql.js'
import { CheckAnnotationLevel, CheckConclusionState } from './generated/graphql-types.js'

export type WorkflowRunSummary = {
  annotationMessages: string[]
  annotationFailureMessages: string[]
  cancelled: boolean
  skipped: boolean
  associatedPullRequest: AssociatedPullRequest | undefined
}

type AssociatedPullRequest = {
  number: number
  url: string
}

export const getWorkflowRunSummary = (workflowRun: GetWorkflowRunQuery): WorkflowRunSummary => {
  assert(workflowRun.node != null)
  assert(workflowRun.node.__typename === 'WorkflowRun')
  const checkSuite = workflowRun.node.checkSuite

  const annotationMessages = new Set<string>()
  const annotationFailureMessages = new Set<string>()
  const conclusions = new Array<CheckConclusionState>()
  for (const checkRun of checkSuite.checkRuns?.nodes ?? []) {
    assert(checkRun != null)
    if (checkRun.conclusion) {
      conclusions.push(checkRun.conclusion)
    }
    for (const annotation of checkRun.annotations?.nodes ?? []) {
      if (annotation?.message) {
        annotationMessages.add(annotation.message)
        if (annotation.annotationLevel === CheckAnnotationLevel.Failure) {
          annotationFailureMessages.add(annotation.message)
        }
      }
    }
  }

  return {
    annotationMessages: [...annotationMessages],
    annotationFailureMessages: [...annotationFailureMessages],
    cancelled: conclusions.some((conclusion) => conclusion === CheckConclusionState.Cancelled),
    skipped: conclusions.every((conclusion) => conclusion === CheckConclusionState.Skipped),
    associatedPullRequest: getAssociatedPullRequest(workflowRun),
  }
}

const getAssociatedPullRequest = (workflowRun: GetWorkflowRunQuery): AssociatedPullRequest | undefined => {
  assert(workflowRun.node != null)
  assert(workflowRun.node.__typename === 'WorkflowRun')
  const associatedPullRequests = workflowRun.node.checkSuite.commit.associatedPullRequests
  assert(associatedPullRequests != null)
  assert(associatedPullRequests.nodes != null)
  if (associatedPullRequests.nodes.length === 0) {
    return
  }
  const pull = associatedPullRequests.nodes[0]
  assert(pull != null)
  return {
    number: pull.number,
    url: pull.url,
  }
}

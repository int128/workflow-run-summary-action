import * as Types from './graphql-types.js';

export type GetWorkflowRunQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetWorkflowRunQuery = { __typename?: 'Query', node?: { __typename: 'AddedToMergeQueueEvent' } | { __typename: 'AddedToProjectEvent' } | { __typename: 'App' } | { __typename: 'AssignedEvent' } | { __typename: 'AutoMergeDisabledEvent' } | { __typename: 'AutoMergeEnabledEvent' } | { __typename: 'AutoRebaseEnabledEvent' } | { __typename: 'AutoSquashEnabledEvent' } | { __typename: 'AutomaticBaseChangeFailedEvent' } | { __typename: 'AutomaticBaseChangeSucceededEvent' } | { __typename: 'BaseRefChangedEvent' } | { __typename: 'BaseRefDeletedEvent' } | { __typename: 'BaseRefForcePushedEvent' } | { __typename: 'Blob' } | { __typename: 'Bot' } | { __typename: 'BranchProtectionRule' } | { __typename: 'BypassForcePushAllowance' } | { __typename: 'BypassPullRequestAllowance' } | { __typename: 'CWE' } | { __typename: 'CheckRun' } | { __typename: 'CheckSuite' } | { __typename: 'ClosedEvent' } | { __typename: 'CodeOfConduct' } | { __typename: 'CommentDeletedEvent' } | { __typename: 'Commit' } | { __typename: 'CommitComment' } | { __typename: 'CommitCommentThread' } | { __typename: 'Comparison' } | { __typename: 'ConnectedEvent' } | { __typename: 'ConvertToDraftEvent' } | { __typename: 'ConvertedNoteToIssueEvent' } | { __typename: 'ConvertedToDiscussionEvent' } | { __typename: 'CrossReferencedEvent' } | { __typename: 'DemilestonedEvent' } | { __typename: 'DependencyGraphManifest' } | { __typename: 'DeployKey' } | { __typename: 'DeployedEvent' } | { __typename: 'Deployment' } | { __typename: 'DeploymentEnvironmentChangedEvent' } | { __typename: 'DeploymentReview' } | { __typename: 'DeploymentStatus' } | { __typename: 'DisconnectedEvent' } | { __typename: 'Discussion' } | { __typename: 'DiscussionCategory' } | { __typename: 'DiscussionComment' } | { __typename: 'DiscussionPoll' } | { __typename: 'DiscussionPollOption' } | { __typename: 'DraftIssue' } | { __typename: 'Enterprise' } | { __typename: 'EnterpriseAdministratorInvitation' } | { __typename: 'EnterpriseIdentityProvider' } | { __typename: 'EnterpriseMemberInvitation' } | { __typename: 'EnterpriseRepositoryInfo' } | { __typename: 'EnterpriseServerInstallation' } | { __typename: 'EnterpriseServerUserAccount' } | { __typename: 'EnterpriseServerUserAccountEmail' } | { __typename: 'EnterpriseServerUserAccountsUpload' } | { __typename: 'EnterpriseUserAccount' } | { __typename: 'Environment' } | { __typename: 'ExternalIdentity' } | { __typename: 'Gist' } | { __typename: 'GistComment' } | { __typename: 'HeadRefDeletedEvent' } | { __typename: 'HeadRefForcePushedEvent' } | { __typename: 'HeadRefRestoredEvent' } | { __typename: 'IpAllowListEntry' } | { __typename: 'Issue' } | { __typename: 'IssueComment' } | { __typename: 'Label' } | { __typename: 'LabeledEvent' } | { __typename: 'Language' } | { __typename: 'License' } | { __typename: 'LinkedBranch' } | { __typename: 'LockedEvent' } | { __typename: 'Mannequin' } | { __typename: 'MarkedAsDuplicateEvent' } | { __typename: 'MarketplaceCategory' } | { __typename: 'MarketplaceListing' } | { __typename: 'MemberFeatureRequestNotification' } | { __typename: 'MembersCanDeleteReposClearAuditEntry' } | { __typename: 'MembersCanDeleteReposDisableAuditEntry' } | { __typename: 'MembersCanDeleteReposEnableAuditEntry' } | { __typename: 'MentionedEvent' } | { __typename: 'MergeQueue' } | { __typename: 'MergeQueueEntry' } | { __typename: 'MergedEvent' } | { __typename: 'MigrationSource' } | { __typename: 'Milestone' } | { __typename: 'MilestonedEvent' } | { __typename: 'MovedColumnsInProjectEvent' } | { __typename: 'OIDCProvider' } | { __typename: 'OauthApplicationCreateAuditEntry' } | { __typename: 'OrgAddBillingManagerAuditEntry' } | { __typename: 'OrgAddMemberAuditEntry' } | { __typename: 'OrgBlockUserAuditEntry' } | { __typename: 'OrgConfigDisableCollaboratorsOnlyAuditEntry' } | { __typename: 'OrgConfigEnableCollaboratorsOnlyAuditEntry' } | { __typename: 'OrgCreateAuditEntry' } | { __typename: 'OrgDisableOauthAppRestrictionsAuditEntry' } | { __typename: 'OrgDisableSamlAuditEntry' } | { __typename: 'OrgDisableTwoFactorRequirementAuditEntry' } | { __typename: 'OrgEnableOauthAppRestrictionsAuditEntry' } | { __typename: 'OrgEnableSamlAuditEntry' } | { __typename: 'OrgEnableTwoFactorRequirementAuditEntry' } | { __typename: 'OrgInviteMemberAuditEntry' } | { __typename: 'OrgInviteToBusinessAuditEntry' } | { __typename: 'OrgOauthAppAccessApprovedAuditEntry' } | { __typename: 'OrgOauthAppAccessBlockedAuditEntry' } | { __typename: 'OrgOauthAppAccessDeniedAuditEntry' } | { __typename: 'OrgOauthAppAccessRequestedAuditEntry' } | { __typename: 'OrgOauthAppAccessUnblockedAuditEntry' } | { __typename: 'OrgRemoveBillingManagerAuditEntry' } | { __typename: 'OrgRemoveMemberAuditEntry' } | { __typename: 'OrgRemoveOutsideCollaboratorAuditEntry' } | { __typename: 'OrgRestoreMemberAuditEntry' } | { __typename: 'OrgUnblockUserAuditEntry' } | { __typename: 'OrgUpdateDefaultRepositoryPermissionAuditEntry' } | { __typename: 'OrgUpdateMemberAuditEntry' } | { __typename: 'OrgUpdateMemberRepositoryCreationPermissionAuditEntry' } | { __typename: 'OrgUpdateMemberRepositoryInvitationPermissionAuditEntry' } | { __typename: 'Organization' } | { __typename: 'OrganizationIdentityProvider' } | { __typename: 'OrganizationInvitation' } | { __typename: 'OrganizationMigration' } | { __typename: 'Package' } | { __typename: 'PackageFile' } | { __typename: 'PackageTag' } | { __typename: 'PackageVersion' } | { __typename: 'ParentIssueAddedEvent' } | { __typename: 'ParentIssueRemovedEvent' } | { __typename: 'PinnedDiscussion' } | { __typename: 'PinnedEnvironment' } | { __typename: 'PinnedEvent' } | { __typename: 'PinnedIssue' } | { __typename: 'PrivateRepositoryForkingDisableAuditEntry' } | { __typename: 'PrivateRepositoryForkingEnableAuditEntry' } | { __typename: 'Project' } | { __typename: 'ProjectCard' } | { __typename: 'ProjectColumn' } | { __typename: 'ProjectV2' } | { __typename: 'ProjectV2Field' } | { __typename: 'ProjectV2Item' } | { __typename: 'ProjectV2ItemFieldDateValue' } | { __typename: 'ProjectV2ItemFieldIterationValue' } | { __typename: 'ProjectV2ItemFieldNumberValue' } | { __typename: 'ProjectV2ItemFieldSingleSelectValue' } | { __typename: 'ProjectV2ItemFieldTextValue' } | { __typename: 'ProjectV2IterationField' } | { __typename: 'ProjectV2SingleSelectField' } | { __typename: 'ProjectV2StatusUpdate' } | { __typename: 'ProjectV2View' } | { __typename: 'ProjectV2Workflow' } | { __typename: 'PublicKey' } | { __typename: 'PullRequest' } | { __typename: 'PullRequestCommit' } | { __typename: 'PullRequestCommitCommentThread' } | { __typename: 'PullRequestReview' } | { __typename: 'PullRequestReviewComment' } | { __typename: 'PullRequestReviewThread' } | { __typename: 'PullRequestThread' } | { __typename: 'Push' } | { __typename: 'PushAllowance' } | { __typename: 'Query' } | { __typename: 'Reaction' } | { __typename: 'ReadyForReviewEvent' } | { __typename: 'Ref' } | { __typename: 'ReferencedEvent' } | { __typename: 'Release' } | { __typename: 'ReleaseAsset' } | { __typename: 'RemovedFromMergeQueueEvent' } | { __typename: 'RemovedFromProjectEvent' } | { __typename: 'RenamedTitleEvent' } | { __typename: 'ReopenedEvent' } | { __typename: 'RepoAccessAuditEntry' } | { __typename: 'RepoAddMemberAuditEntry' } | { __typename: 'RepoAddTopicAuditEntry' } | { __typename: 'RepoArchivedAuditEntry' } | { __typename: 'RepoChangeMergeSettingAuditEntry' } | { __typename: 'RepoConfigDisableAnonymousGitAccessAuditEntry' } | { __typename: 'RepoConfigDisableCollaboratorsOnlyAuditEntry' } | { __typename: 'RepoConfigDisableContributorsOnlyAuditEntry' } | { __typename: 'RepoConfigDisableSockpuppetDisallowedAuditEntry' } | { __typename: 'RepoConfigEnableAnonymousGitAccessAuditEntry' } | { __typename: 'RepoConfigEnableCollaboratorsOnlyAuditEntry' } | { __typename: 'RepoConfigEnableContributorsOnlyAuditEntry' } | { __typename: 'RepoConfigEnableSockpuppetDisallowedAuditEntry' } | { __typename: 'RepoConfigLockAnonymousGitAccessAuditEntry' } | { __typename: 'RepoConfigUnlockAnonymousGitAccessAuditEntry' } | { __typename: 'RepoCreateAuditEntry' } | { __typename: 'RepoDestroyAuditEntry' } | { __typename: 'RepoRemoveMemberAuditEntry' } | { __typename: 'RepoRemoveTopicAuditEntry' } | { __typename: 'Repository' } | { __typename: 'RepositoryInvitation' } | { __typename: 'RepositoryMigration' } | { __typename: 'RepositoryRule' } | { __typename: 'RepositoryRuleset' } | { __typename: 'RepositoryRulesetBypassActor' } | { __typename: 'RepositoryTopic' } | { __typename: 'RepositoryVisibilityChangeDisableAuditEntry' } | { __typename: 'RepositoryVisibilityChangeEnableAuditEntry' } | { __typename: 'RepositoryVulnerabilityAlert' } | { __typename: 'ReviewDismissalAllowance' } | { __typename: 'ReviewDismissedEvent' } | { __typename: 'ReviewRequest' } | { __typename: 'ReviewRequestRemovedEvent' } | { __typename: 'ReviewRequestedEvent' } | { __typename: 'SavedReply' } | { __typename: 'SecurityAdvisory' } | { __typename: 'SponsorsActivity' } | { __typename: 'SponsorsListing' } | { __typename: 'SponsorsListingFeaturedItem' } | { __typename: 'SponsorsTier' } | { __typename: 'Sponsorship' } | { __typename: 'SponsorshipNewsletter' } | { __typename: 'Status' } | { __typename: 'StatusCheckRollup' } | { __typename: 'StatusContext' } | { __typename: 'SubIssueAddedEvent' } | { __typename: 'SubIssueRemovedEvent' } | { __typename: 'SubscribedEvent' } | { __typename: 'Tag' } | { __typename: 'Team' } | { __typename: 'TeamAddMemberAuditEntry' } | { __typename: 'TeamAddRepositoryAuditEntry' } | { __typename: 'TeamChangeParentTeamAuditEntry' } | { __typename: 'TeamDiscussion' } | { __typename: 'TeamDiscussionComment' } | { __typename: 'TeamRemoveMemberAuditEntry' } | { __typename: 'TeamRemoveRepositoryAuditEntry' } | { __typename: 'Topic' } | { __typename: 'TransferredEvent' } | { __typename: 'Tree' } | { __typename: 'UnassignedEvent' } | { __typename: 'UnlabeledEvent' } | { __typename: 'UnlockedEvent' } | { __typename: 'UnmarkedAsDuplicateEvent' } | { __typename: 'UnpinnedEvent' } | { __typename: 'UnsubscribedEvent' } | { __typename: 'User' } | { __typename: 'UserBlockedEvent' } | { __typename: 'UserContentEdit' } | { __typename: 'UserList' } | { __typename: 'UserNamespaceRepository' } | { __typename: 'UserStatus' } | { __typename: 'VerifiableDomain' } | { __typename: 'Workflow' } | { __typename: 'WorkflowRun', checkSuite: { __typename?: 'CheckSuite', checkRuns?: { __typename?: 'CheckRunConnection', nodes?: Array<{ __typename?: 'CheckRun', conclusion?: Types.CheckConclusionState | null, annotations?: { __typename?: 'CheckAnnotationConnection', nodes?: Array<{ __typename?: 'CheckAnnotation', message: string, annotationLevel?: Types.CheckAnnotationLevel | null } | null> | null } | null } | null> | null } | null, commit: { __typename?: 'Commit', associatedPullRequests?: { __typename?: 'PullRequestConnection', totalCount: number, nodes?: Array<{ __typename?: 'PullRequest', number: number, url: string } | null> | null } | null } } } | { __typename: 'WorkflowRunFile' } | null };

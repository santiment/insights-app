import { mutate } from 'webkit/api'

const UPDATE_DRAFT_MUTATION = `
  mutation updateInsight(
    $id: ID!
    $title: String
    $text: String
    $tags: [String]
    $isPro: Boolean
    $isPulse: Boolean
    $projectId: Int
  ) {
    insight: updateInsight(
      id: $id
      title: $title
      text: $text
      tags: $tags
      isPaywallRequired: $isPro
      isPulse: $isPulse
      priceChartProjectId: $projectId
    ) {
      id
      updatedAt
    }
  }
`

const accessor = ({ insight }) => insight
export const mutateUpdateDraft = (variables) =>
  mutate(UPDATE_DRAFT_MUTATION, { variables }).then(accessor)

// -------------------

const CREATE_DRAFT_MUTATION = `
  mutation createInsight(
    $title: String!
    $text: String
    $tags: [String]
    $isPro: Boolean
    $isPulse: Boolean
    $projectId: Int
  ) {
    insight: createInsight(
      title: $title
      text: $text
      tags: $tags
      isPaywallRequired: $isPro
      isPulse: $isPulse
      priceChartProjectId: $projectId
    ) {
      id
      updatedAt
    }
  }
`
export const mutateCreateDraft = (variables) =>
  mutate(CREATE_DRAFT_MUTATION, { variables }).then(accessor)

// -------------------

const PUBLISH_DRAFT_MUTATION = (id) => `
  mutation {
    publishInsight(id:${id}) {
      id
    }
  }
`
export const mutatePublishDraft = (id) => mutate(PUBLISH_DRAFT_MUTATION(id))

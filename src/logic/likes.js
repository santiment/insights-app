import { client } from '@/apollo'
import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from '@/gql/likes'

export function toggleInsightLike(insightId, likeState) {
  return client.mutate({
    mutation: likeState ? LIKE_INSIGHT_MUTATION : UNLIKE_INSIGHT_MUTATION,
    variables: {
      id: +insightId,
    },
  })
}


export function addInsightVote(insightId) {
  return client.mutate({
    mutation: LIKE_INSIGHT_MUTATION,
    variables: {
      id: +insightId,
    },
  })
}

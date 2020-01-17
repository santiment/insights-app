import { client } from '@/apollo'
import { COMMENTS_FOR_INSIGHT_QUERY } from '@/gql/comments'

export function getComments(id, cursor, apollo = client) {
  return apollo.query({
    query: COMMENTS_FOR_INSIGHT_QUERY,
    variables: {
      id,
      cursor,
    },
  })
}

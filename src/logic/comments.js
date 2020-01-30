import { client } from '@/apollo'
import {
  COMMENTS_FOR_INSIGHT_QUERY,
  CREATE_COMMENT_MUTATION,
} from '@/gql/comments'

export function getComments(id, cursor, apollo = client) {
  return apollo.query({
    query: COMMENTS_FOR_INSIGHT_QUERY,
    variables: {
      id,
      cursor,
    },
    fetchPolicy: 'network-only',
  })
}

export function createComment(id, content) {
  return client.mutate({
    mutation: CREATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      content,
    },
  })
}

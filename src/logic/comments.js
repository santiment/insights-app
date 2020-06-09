import { client } from '@/apollo'
import {
  COMMENTS_FOR_INSIGHT_QUERY,
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
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

export function createComment(id, content, parentId) {
  return client.mutate({
    mutation: CREATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      parentId: parentId ? +parentId : null,
      content,
    },
  })
}

export function deleteComment(id) {
  return client.mutate({
    mutation: DELETE_COMMENT_MUTATION,
    variables: {
      id: +id,
    },
  })
}

export function editComment(id, content) {
  return client.mutate({
    mutation: UPDATE_COMMENT_MUTATION,
    variables: {
      id: +id,
      content,
    },
  })
}

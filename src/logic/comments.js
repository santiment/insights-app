import { goto } from '@sapper/app'
import { client } from '@/apollo'
import { notifications } from '@/stores/notifications'
import {
  COMMENTS_FOR_INSIGHT_QUERY,
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION,
  UPDATE_COMMENT_MUTATION,
} from '@/gql/comments'

const SCHEDULED_COMMENT = 'SCHEDULED_COMMENT'

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

export function saveComment(id, content) {
  localStorage.setItem(
    SCHEDULED_COMMENT,
    JSON.stringify({ id, content, href: window.location.pathname }),
  )

  notifications.add({
    title: 'Your comment was saved and will be posted after sign up',
  })

  return goto('/login')
}

export function clearSavedComment() {
  localStorage.removeItem(SCHEDULED_COMMENT)
}

export function lookupSavedComment() {
  const json = localStorage.getItem(SCHEDULED_COMMENT)

  if (!json) return

  const { content, href } = JSON.parse(json)

  notifications.add({
    title: 'You have unposted comment',
    dismissAfter: 999999,
    actions: [
      {
        label: 'View and edit',
        href: `${href}?comment=${content}&_wc=1#comments`,
      },
    ],
  })
}

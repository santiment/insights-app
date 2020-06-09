import { goto } from '@sapper/app'
import { notifications } from '@/stores/notifications'

const SCHEDULED_COMMENT = 'SCHEDULED_COMMENT'

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

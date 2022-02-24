import { goto } from '@sapper/app'
import { getSessionValue } from '@/stores/utils'
import { showAddToWatchlistDialog } from '@cmp/AddToWatchlistDialog/index.svelte'

export function startAddToWatchlistFlow(project) {
  const { currentUser } = getSessionValue()

  if (!currentUser) {
    return goto('/login')
  }

  return showAddToWatchlistDialog(project).then((amountModified) => {
    if (!(amountModified > 0)) return

    notifications.add({
      type: 'success',
      title: `${amountModified} watchlist${amountModified > 1 ? 's were' : ' was'} modified`,
    })
  })
}

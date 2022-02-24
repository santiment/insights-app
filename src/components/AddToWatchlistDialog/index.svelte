<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import { Preloader } from 'webkit/utils/fn'
  import AddToWatchlistDialog from './index.svelte'
  import {
    queryUserWatchlists,
    mutateAddWatchlistItems,
    mutateRemoveWatchlistItems,
  } from '@/api/watchlists'

  export const showAddToWatchlistDialog = (project) =>
    dialogs.show(AddToWatchlistDialog, { project })
  export const watchlistsPreloader = Preloader(queryUserWatchlists)

  const idSorter = (a, b) => a.id - b.id
  const concatIds = (acc, { id }) => acc + id + ','
  const getWatchlistsHash = (watchlists) => watchlists.sort(idSorter).reduce(concatIds, '')
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'
  import { showNewWatchlistDialog } from '@cmp/NewWatchlistDialog.svelte'
  import Watchlists from './Watchlists.svelte'

  export let DialogPromise
  export let project
  const projectId = +project.id

  let closeDialog
  let loading = true
  let watchlists = []
  let selected = new Set()
  let defaultSelections = []
  let hash = ''

  $: disabled = hash === getWatchlistsHash(Array.from(selected))

  queryUserWatchlists().then((data) => {
    watchlists = data
    selected = new Set(
      watchlists.filter(({ listItems }) =>
        listItems.some(({ project }) => projectId === +project.id),
      ),
    )
    defaultSelections = Array.from(selected)
    hash = getWatchlistsHash(defaultSelections.slice())

    loading = false
  })

  function onNewWatchlist() {
    showNewWatchlistDialog({ strict: true }).then((watchlist) => {
      watchlists.push(watchlist)
      watchlists = watchlists
    })
  }

  function onApply() {
    if (loading || disabled) return
    loading = true

    const additionSet = new Set(selected)
    const removals = []

    defaultSelections.forEach((watchlist) => {
      if (additionSet.has(watchlist)) additionSet.delete(watchlist)
      else removals.push(watchlist)
    })

    const additions = Array.from(additionSet)
    const items = [{ projectId }]
    const addItems = ({ id }) => mutateAddWatchlistItems(+id, items)
    const removeItems = ({ id }) => mutateRemoveWatchlistItems(+id, items)

    return Promise.all(additions.map(addItems).concat(removals.map(removeItems))).then(() => {
      additions.forEach((watchlist) => {
        watchlist.listItems.push({ project: { id: projectId } })
      })
      removals.forEach((watchlist) => {
        watchlist.listItems = watchlist.listItems.filter(({ project }) => +project.id !== projectId)
      })

      DialogPromise.resolve(additions.length + removals.length)
      closeDialog()
    })
  }
</script>

<Dialog {...$$props} title="Add to watchlist" bind:closeDialog>
  <section>
    <Watchlists {watchlists} {loading} bind:selected />

    <button class="btn-2 row hv-center fluid mrg-l mrg--t" on:click={onNewWatchlist}>
      <Svg id="plus-circle" w="16" class="mrg-s mrg--r" />
      Create watchlist
    </button>
  </section>

  <div class="actions row">
    <div class="btn-2 mrg-a mrg--l" on:click={closeDialog}>Cancel</div>
    <div class="btn-1 mrg-l mrg--l" class:disabled class:loading on:click={onApply}>Apply</div>
  </div>
</Dialog>

<style>
  section {
    padding: 12px 20px 0;
    margin-bottom: 12px;
    min-width: 320px;
  }
  .actions {
    padding: 0 20px 20px;
  }

  button {
    --fill: var(--waterloo);
  }
</style>

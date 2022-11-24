<script>
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'

  export let items
  export let query
  export let pageSize = 10
  export let rootMargin = '650px'

  let page = 1
  let loading = false
  let hasMore = process.browser && items.length >= pageSize

  function onIntersect() {
    if (hasMore && !loading) loadItems()
  }

  function loadItems() {
    loading = true
    query(++page).then((data) => {
      items = items.concat(data)
      hasMore = data.length === pageSize
      loading = false
    })
  }

  export function reset() {
    page = 1
    loading = false
    hasMore = true
  }
</script>

<slot {items} />

{#if hasMore}
  <div>
    <ViewportObserver options={{ rootMargin }} on:intersect={onIntersect}>
      Loading...
    </ViewportObserver>
  </div>
{/if}

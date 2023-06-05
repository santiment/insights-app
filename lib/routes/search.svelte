<script>
  import { onDestroy } from 'svelte'
  import { stores } from '@sapper/app'
  import { debounce } from 'san-webkit/lib/utils/fn'
  import ViewportObserver from 'san-webkit/lib/ui/ViewportObserver.svelte'
  import { querySearchPageInsights } from './../api/insights/search'
  import InsightCard from './../components/InsightCard/index.svelte'

  const { page } = stores()

  let insights = []
  let hasMore = false
  let offset = 20
  let searchTerm = $page.query.t || ''
  let loading = !!searchTerm

  $: filteredInsights = insights.slice(0, offset)
  $: process.browser && searchTerm && getInsights(searchTerm)

  const [getInsights, clearTimer] = debounce(300, () => {
    const value = searchTerm
    hasMore = false
    loading = true
    history.replaceState(null, '', '/search?t=' + value)

    querySearchPageInsights(searchTerm).then((data) => {
      if (value !== searchTerm) return
      insights = data
      offset = 20
      hasMore = true
      loading = false
    })
  })

  function onIntersect() {
    offset += 20
    hasMore = insights.length > offset
  }
  const unsubscribe = page.subscribe(({ query }) => {
    if (query.f) searchTerm = query.t
  })

  onDestroy(() => {
    unsubscribe()
    clearTimer()
  })
</script>

<svelte:head>
  <title>Insights</title>
  <meta property="og:title" content="Insights" />
  <meta name="description" content="Community Insights" />
  <meta property="og:description" content="Community Insights" />
</svelte:head>

<h2 class="row v-center mrg-l mrg--b">
  Search results for:

  <input
    class="input mrg-s mrg--l"
    type="text"
    placeholder="Search for insights..."
    bind:value={searchTerm}
  />
</h2>

<ViewportObserver
  options={{ rootMargin: '650px' }}
  on:intersect={onIntersect}
  observeWhile={hasMore}
>
  {#if loading}
    Loading...
  {:else}
    {#each filteredInsights as insight (insight.id)}
      <InsightCard {insight} source="insights_search" class="mrg-l mrg--t" />
    {/each}
  {/if}
</ViewportObserver>

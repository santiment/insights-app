<script>
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { queryAllInsights } from '@/api/insights'
  import { session } from '@/stores/session'
  import Feed from './Feed.svelte'
  import InsightCard from './InsightCard/index.svelte'
  import PulseCard from './InsightCard/Pulse.svelte'

  export let insights, tags, onlyPro
  export let isOnlyPulse = undefined
  export let query = queryAllInsights

  $: reset(tags, onlyPro)
  $: isWithPrice = !$session.isMobile

  let page = 1
  let loading = false
  let hasMore = process.browser

  function onIntersect() {
    if (hasMore && !loading) loadInsights()
  }

  function loadInsights() {
    loading = true
    query(++page, tags, onlyPro, isOnlyPulse).then((data) => {
      insights = insights.concat(data)
      hasMore = data.length === 10
      loading = false
    })
  }

  function reset() {
    page = 1
    loading = false
    hasMore = true
  }
</script>

<Feed items={insights} let:item>
  {#if item.isPulse}
    <PulseCard insight={item} class="mrg-xl mrg--b" />
  {:else}
    <InsightCard insight={item} class="mrg-xl mrg--b" {isWithPrice} />
  {/if}
</Feed>

{#if hasMore}
  <div>
    <ViewportObserver options={{ rootMargin: '650px' }} on:intersect={onIntersect}
      >Loading...</ViewportObserver>
  </div>
{/if}

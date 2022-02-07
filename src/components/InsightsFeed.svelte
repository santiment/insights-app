<script>
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { queryAllInsights } from '@/api/insights'
  import Feed from './Feed.svelte'
  import InsightCard from './InsightCard/index.svelte'

  export let insights, tags, onlyPro

  $: reset(tags, onlyPro)

  let page = 1
  let loading = false
  let hasMore = process.browser

  function onIntersect() {
    if (hasMore && !loading) loadInsights()
  }

  function loadInsights() {
    loading = true
    queryAllInsights(++page, tags, onlyPro).then((data) => {
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
  <InsightCard insight={item} class="mrg-xl mrg--b" />
</Feed>

{#if hasMore}
  <div>
    <ViewportObserver options={{ rootMargin: '650px' }} on:intersect={onIntersect}
      >Loading...</ViewportObserver>
  </div>
{/if}

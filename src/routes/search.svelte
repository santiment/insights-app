<script>
  import { onDestroy } from 'svelte'
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import { INSIGHTS_SEARCH_QUERY } from '@/gql/insights'
  import { getMobileComponent } from '@/utils/responsive'
  import ViewportObserver from '@/components/ViewportObserver'
  import BackToTop from '@/components/BackToTop'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'

  const { page } = stores()
  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)
  const options = {
    rootMargin: '650px',
  }

  let insights = []
  let hasMore = false
  let offset = 20
  let searchTerm = $page.query.t || ''
  let loading = !!searchTerm

  $: filteredInsights = insights.slice(0, offset)

  $: process.browser && searchTerm && getInsights(searchTerm)

  const sorter = (
    { publishedAt: _a, updatedAt: a = _a },
    { publishedAt: _b, updatedAt: b = _b },
  ) => new Date(b) - new Date(a)
  const insightsAccessor = ({ data: { insights } }) =>
    insights.sort(sorter).map((insight) => {
      insight.tags = insight.tags.filter(Boolean)
      return insight
    })

  let timer
  function getInsights(search) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      hasMore = false
      loading = true
      history.replaceState(null, '', '/search?t=' + search)

      client
        .query({
          query: INSIGHTS_SEARCH_QUERY,
          variables: {
            searchTerm: search,
          },
          errorPolicy: 'all',
        })
        .then(insightsAccessor)
        .then((items) => {
          if (search !== searchTerm) return
          insights = items
          offset = 20
          hasMore = true
          loading = false
        })
    }, 300)
  }

  function onIntersect() {
    offset += 20
    hasMore = insights.length > offset
  }

  onDestroy(
    page.subscribe(({ query }) => {
      if (query.f) searchTerm = query.t
    }),
  )
</script>

<BackToTop />

<h2>
  Search results for:
  <input class="SAN-input" type="text" bind:value="{searchTerm}" />
</h2>

<ViewportObserver
  {options}
  on:intersect="{onIntersect}"
  observeWhile="{hasMore}"
>
  {#if loading} Loading... {:else} {#each filteredInsights as insight
  (insight.id)}
  <div class="item">
    <InsightCard {insight} />
  </div>
  {/each} {/if}
</ViewportObserver>

<style>
  h2 {
    margin-bottom: 16px;
  }

  .item {
    margin-bottom: 16px;
  }
</style>

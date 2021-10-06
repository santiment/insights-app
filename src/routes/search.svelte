<script>
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import { INSIGHTS_SEARCH_QUERY } from '@/gql/insights'
  import { getMobileComponent } from '@/utils/responsive'
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'

  const { page } = stores()
  const InsightCard = getMobileComponent(InsightCardMobile, InsightCardDesktop)

  let insights = []
  let searchTerm = $page.query.t || ''

  $: insights.forEach((insight) => {
    insight.tags = insight.tags.filter(Boolean)
  })

  $: process.browser && searchTerm && getInsights(searchTerm)

  const sorter = (
    { publishedAt: _a, updatedAt: a = _a },
    { publishedAt: _b, updatedAt: b = _b },
  ) => new Date(b) - new Date(a)
  const insightsAccessor = ({ data: { insights } }) => insights.sort(sorter)

  let timer
  function getInsights(searchTerm) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('fetching')
      history.replaceState(null, '', '/search?t=' + searchTerm)

      client
        .query({
          query: INSIGHTS_SEARCH_QUERY,
          variables: {
            searchTerm,
          },
          errorPolicy: 'all',
        })
        .then(insightsAccessor)
        .then((items) => (insights = items))
    }, 300)
  }
</script>

<h2>
  Search results for:
  <input class="SAN-input" type="text" bind:value="{searchTerm}" />
</h2>

{#each insights as insight (insight.id)}
<div class="item">
  <InsightCard {insight} />
</div>
{/each}

<style lang="scss">
  @import '@/mixins.scss';

  h2 {
    /* @include text('h4'); */
    margin-bottom: 16px;
  }

  .item {
    margin-bottom: 16px;
  }
</style>

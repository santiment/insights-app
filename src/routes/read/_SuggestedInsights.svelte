<script>
  import { querySuggestedUserInsights } from '@/api/insights'
  import { querySuggestedFeaturedInsights } from '@/api/insights/featured'
  import InsightCard from '@cmp/InsightCard/index.svelte'
  import { onDestroy } from 'svelte'

  export let insight
  export let user

  let insights = []
  let node, observer

  $: user.id && node && setupObserver()

  function loadSuggestions() {
    observer.unobserve(node)
    observer = null

    const filter = ({ id }) => id !== insight.id
    querySuggestedUserInsights(user.id).then((data) => {
      const filtered = data.filter(filter)
      if (filtered.length > 2) return (insights = filtered)
      querySuggestedFeaturedInsights().then((featured) => {
        insights = filtered.concat(featured)
      })
    })
  }

  function setupObserver() {
    const dispatcher = ([{ isIntersecting }]) => isIntersecting && loadSuggestions()
    observer = new IntersectionObserver(dispatcher, { rootMargin: '200px' })
    observer.observe(node)
  }

  onDestroy(() => {
    if (observer) observer.unobserve(node)
  })
</script>

<section class="column v-center" bind:this={node}>
  <h3 class="body-1 mrg-xl mrg--b">Suggested insights</h3>

  <div class="visible">
    <div class="scroll row">
      {#each insights as insight}
        <InsightCard {insight} isWithPrice={false} class="$style.item mrg-xl mrg--r" />
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    background: var(--athens);
    margin: 32px 0 -32px calc((1140px - 100vw) / 2);
    width: 100vw;
    padding: 40px;
  }

  .scroll {
    overflow-x: auto;
    height: calc(100% + 10px);
    width: 1143px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scroll::-webkit-scrollbar {
    display: none;
  }

  .item {
    width: 365px;
    min-width: 365px;
  }
</style>

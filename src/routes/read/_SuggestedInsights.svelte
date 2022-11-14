<script>
  import { onDestroy } from 'svelte'
  import { querySuggestedUserInsights } from '@/api/insights/user'
  import { querySuggestedFeaturedInsights } from '@/api/insights/featured'
  import InsightCard from '@cmp/InsightCard/index.svelte'
  import { session } from '@/stores/session'

  export let insight
  export let user

  let insights = []
  let node, observer
  let width

  $: user.id && node && setupObserver()
  $: isMobile = $session.isMobile

  function loadSuggestions() {
    if (!observer) return
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

<svelte:window bind:innerWidth={width} />

<section class="column v-center" style="width: {width}" bind:this={node}>
  <h3 class="{isMobile ? 'h4' : 'body-1'} mrg-xl mrg--b">Suggested insights</h3>

  <div class="visible">
    <div class="scroll row no-scrollbar">
      {#each insights as insight}
        <InsightCard
          {insight}
          isWithPrice={false}
          class="$style.item {isMobile ? 'mrg-m' : 'mrg-xl'} mrg--r"
        />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  section {
    background: var(--athens);
    margin: 32px 0 -32px calc((1140px - 100vw) / 2);
    width: 100vw;
    padding: 40px;
  }

  .visible {
    max-width: 100%;
  }

  .scroll {
    overflow-x: auto;
    height: calc(100% + 10px);
    width: 1143px;
    -ms-overflow-style: none;
  }

  .item {
    width: 365px;
    min-width: 365px;
    --overflow-lines: 1;
  }

  :global(body:not(.desktop)) {
    section {
      height: 305px;
      margin: 40px 0 -24px 0;
      padding: 40px 20px;
    }

    .scroll {
      width: 100%;
      height: 100%;
    }

    .item {
      width: 350px;
      min-width: 350px;

      &:last-of-type {
        margin: 0;
      }
    }
  }
</style>

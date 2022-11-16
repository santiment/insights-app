<script>
  import { queryAllInsights } from '@/api/insights'
  import { session } from '@/stores/session'
  import Feed from './Feed.svelte'
  import InsightCard from './InsightCard/index.svelte'
  import PulseCard from './InsightCard/Pulse.svelte'
  import ViewportPagination from './ViewportPagination.svelte'

  export let insights, tags, onlyPro
  export let isOnlyPulse = undefined
  export let query = queryAllInsights
  export let source = 'insights'

  let reset

  $: reset && reset(tags, onlyPro)
  $: isWithPrice = !$session.isMobile

  const loadInsights = (page) => query(page, tags, onlyPro, isOnlyPulse)
</script>

<ViewportPagination bind:reset items={insights} query={loadInsights} let:items>
  <Feed {items} let:item>
    {#if item.isPulse}
      <PulseCard insight={item} {source} class="mrg-xl mrg--b" />
    {:else}
      <InsightCard insight={item} {source} class="mrg-xl mrg--b" {isWithPrice} />
    {/if}
  </Feed>
</ViewportPagination>

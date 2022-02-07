<script>
  import SmallCard from '@cmp/InsightCard/SmallCard.svelte'

  export let insights = []
</script>

<h2 class="h4 mrg-l mrg--b">Handpicked Takes</h2>

{#each insights as insight}
  <SmallCard {insight} class="mrg-l mrg--b" />
{/each}

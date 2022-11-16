<script>
  import SmallCard from '@cmp/InsightCard/SmallCard.svelte'

  export let insights = []
</script>

<h2 class="h4 mrg-l mrg--b">Handpicked Takes</h2>

<div class="scroll">
  {#each insights as insight}
    <SmallCard {insight} source="insights_handpicked" class="mrg-l mrg--b" />
  {/each}
</div>

<style>
  .scroll {
    overflow: hidden;
    min-height: 277px;
  }
  .scroll:hover {
    overflow-y: auto;
    overflow-y: overlay;
  }
</style>

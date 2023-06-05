<script>
  import { currentUser } from './../stores/user'
  $: hasNoInsights = $currentUser && $currentUser.insightsCount.totalCount === 0
</script>

{#if hasNoInsights}
  <a href="/new" class="btn-2 btn-1 mrg-xl mrg--b" sapper:prefetch>Write Insight</a>
{/if}

<style>
  a {
    --border: var(--green);
    text-align: center;
  }
</style>

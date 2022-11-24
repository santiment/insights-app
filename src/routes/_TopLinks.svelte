<script>
  import TagFilters from '@cmp/TagFilters.svelte'
  import { session } from '@/stores/session'

  export let isPulse = false
</script>

{#if !$session.isMobile}
  <a href="/" class="h4 txt-m" class:active={!isPulse} sapper:prefetch>Insights</a>
  <a href="/pulse" class="h4 txt-m" class:active={isPulse} sapper:prefetch>Pulse Insights</a>
{/if}

<TagFilters base={isPulse ? 'pulse' : ''} />

<style>
  a {
    margin-right: 32px;
    color: var(--casper);
  }

  .active {
    color: var(--black);
  }
</style>

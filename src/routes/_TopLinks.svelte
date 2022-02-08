<script>
  import TagFilters from '@cmp/TagFilters.svelte'
</script>

<a href="/" class="h4 txt-m active" sapper:prefetch>Insights</a>
<a href="/pulse" class="h4 txt-m" sapper:prefetch>Pulse Insights</a>

<TagFilters />

<style>
  a {
    margin-right: 32px;
    color: var(--casper);
  }

  .active {
    color: var(--black);
  }
</style>

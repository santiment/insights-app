<script>
  import { stores } from '@sapper/app'
  import Tag from './_Tag.svelte'

  export let base = ''
  const { page } = stores()

  let activeTags
  $: {
    const { tags, onlyPro } = $page.query
    activeTags = onlyPro !== undefined ? 'pro' : (tags || '').toLowerCase()
  }
</script>

<template lang="pug">
-
  var tags = [
    {name: '', label: 'All'},
    {name: 'defi', label: 'DeFi'},
    {name: 'btc', label: 'BTC'},
    {name: 'eth,erc-20', label: 'ETH + ERC-20'},
    {name: 'strategies/alpha', label: 'Strategies/Alpha'},
    {name: 'metric tutorials', label: 'Metric Tutorials'},
  ] 

.tags
  each tag in tags
    - const {name, label} = tag
    Tag(href=name ? '{base}?tags='+name : '{base}', active=`{'${name}' === activeTags}`)= label 

  +if('base !== "pulse"')
    Tag.Tags__pro(href='{base}?onlyPro', active!='{"pro" === activeTags}') Only for PRO
</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin: -8px 0 40px;
  }

  :global(.Tags__pro) {
    border-color: var(--orange);
    color: var(--orange) !important;

    &.active {
      background: var(--orange-light-1);
    }
  }
</style>

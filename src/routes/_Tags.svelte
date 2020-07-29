<script>
  import { stores } from '@sapper/app'
  import Tag from './_Tag.svelte'

  export let base = ''
  const { page } = stores()
  $: activeTags = $page.query.tags || ''
</script>

<template lang="pug">
-
  var tags = [
    {name: '', label: 'All'},
    {name: 'defi', label: 'DeFi'},
    {name: 'btc', label: 'BTC'},
    {name: 'eth', label: 'ETH + ERC-20'},
    //{name: 'alpha', label: 'Alpha'},
    //{name: 'tutorials', label: 'Tutorials'},
  ] 

.tags
  each tag in tags
    - const {name, label} = tag
    Tag(href=name ? '{base}?tags='+name : '{base}', active=`{'${name}' === activeTags}`)= label 
</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .tags {
    display: flex;
    grid-column-gap: 15px;
    margin-bottom: 40px;
  }
</style>

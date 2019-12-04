<script>
  import Asset from './Asset.svelte'

  export let assets
</script>

<template lang="pug">
include /ui/mixins

h2 Assets from this insight

+each('assets as asset (asset.slug)')
  +if('asset.historyPrice.length')
    Asset({asset})

</template>

<style lang="scss">
  @import '@/mixins';

  h2 {
    @include text('body-3');
    color: var(--waterloo);
    margin: 0 0 16px;
  }
</style>

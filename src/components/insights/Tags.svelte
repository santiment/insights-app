<script>
  import Tag from './Tag.svelte'
  import { noTrendTagsFilter } from '@/utils/insights'

  export let tags

  let filteredTags
  $: filteredTags = tags.filter(noTrendTagsFilter)
</script>

<template lang="pug">
+each('filteredTags as {name}')
  Tag.tags__item({name})
</template>

<style>
  :global(.tags__item) {
    margin-right: 4px;
  }
</style>

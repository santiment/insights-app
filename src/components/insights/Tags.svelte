<script>
  import { stores } from '@sapper/app'
  import Tag from './Tag.svelte'
  import { noTrendTagsFilter } from '@/utils/insights'

  export let tags
  const { page } = stores()

  $: filteredTags = tags.filter(noTrendTagsFilter)
  $: base = $page.path === '/pulse' ? 'pulse' : ''

</script>

<template lang="pug">
+each('filteredTags as {name}')
  Tag.tags__item({name}, {base})
</template>

<style>
  :global(.tags__item) {
    margin-right: 4px;
  }
</style>

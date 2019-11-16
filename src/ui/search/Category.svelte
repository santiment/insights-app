<script>
  export let id,
    title,
    component,
    items,
    itemKey,
    onSuggestionSelect,
    cursoredSuggestion
</script>

<template lang="pug">
include /ui/mixins

h3.category {title}
+each('items as suggestion (suggestion[itemKey])')
  +button.suggestion(variant='ghost', fluid,
  class:cursored='{suggestion === cursoredSuggestion}',
  on:mousedown!='{() => onSuggestionSelect({category: id, item: suggestion})}')
    svelte:component(this='{component}', {suggestion})

</template>

<style lang="scss">
  @import '@/mixins';

  .category {
    @include text('caption');
    color: var(--waterloo);
    margin: 0 8px 8px;
  }

  .suggestion {
    padding: 6px 8px;
    color: var(--waterloo);
    height: auto;
    min-height: 32px;

    &:hover,
    &:focus {
      color: var(--jungle-green);
    }
  }

  .cursored {
    background: var(--porcelain);
  }
</style>

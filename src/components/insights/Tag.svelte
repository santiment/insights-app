<script>
  let klass = ''
  export { klass as class }
  export let name
</script>

<template lang="pug">
include /ui/mixins

+button.tag(href="/tags/{name}", border, class="{klass}") {name}
</template>

<style lang="scss">
  @import '@/mixins';

  :global(.tag) {
    height: auto;
    padding: 1px 6px;
    color: var(--waterloo);
    display: inline-block;
    text-transform: lowercase;
    @include text('caption');
  }
</style>

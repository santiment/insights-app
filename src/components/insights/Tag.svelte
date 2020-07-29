<script>
  let klass = ''
  export { klass as class }
  export let base = '',
    name = ''
</script>

<template lang="pug">
include /ui/mixins

+button.tag(href="{base}?tags={name.toLowerCase()}", border, class="{klass}") {name}
</template>

<style lang="scss">
  @import '@/mixins';

  .tag {
    height: auto;
    padding: 1px 6px;
    color: var(--waterloo);
    display: inline-block;
    text-transform: lowercase;
    @include text('caption');
  }
</style>

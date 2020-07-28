<script>
  let klass = ''
  export { klass as class }
</script>

<template lang="pug">
include /ui/mixins

+button(href='/new', variant='fill', accent='jungle-green', rel='prefetch', class='{klass}')
  +icon('plus-round').plus
  slot
    |Write insight
</template>

<style lang="scss">
  @import '@/mixins';

  .plus {
    @include size(15px);
    margin-right: 8px;
  }
</style>

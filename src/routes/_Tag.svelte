<script>
  let klass = ''
  export { klass as class }
  export let href,
    active = false
</script>

<template lang="pug">
include /ui/mixins

+panel.tag(href='{href}', class:active, class='{klass}')
  slot

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .tag {
    color: var(--waterloo);
    padding: 6px 16px;
    margin: 8px 15px 0 0;

    @include responsive('phone', 'phone-xs') {
      margin-right: 8px;
    }
  }

  .active {
    background: var(--jungle-green-light);
    color: var(--jungle-green);
  }
</style>

<script>
  export let href,
    active = false
</script>

<template lang="pug">
include /ui/mixins

+panel.tag(href='{href}', class:active)
  slot

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .tag {
    color: var(--waterloo);
    padding: 6px 16px;
    margin-right: 15px;
  }

  .active {
    background: var(--jungle-green-light);
    color: var(--jungle-green);
  }
</style>

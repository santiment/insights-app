<template lang="pug">
include /ui/mixins

.wrapper
  +button.item(variant='ghost', fluid) Documentation
  +button.item(variant='ghost', fluid) Developer API
  +button.item(variant='ghost', fluid) Support
</template>

<style lang="scss">
  .wrapper {
    padding: 8px;
  }
  .item {
    white-space: nowrap;
    width: 100%;
  }
</style>

<template lang="pug">
include /ui/mixins

- var appPath = 'https://app.santiment.net/'

.wrapper
  +button.item(href=appPath+'docs', variant='ghost', fluid) Documentation
  +button.item(href=appPath+'apidocs', variant='ghost', fluid) Developer API
  +button.item(href=appPath+'support', variant='ghost', fluid) Support
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

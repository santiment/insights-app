<template lang="pug">
include /ui/mixins

-
  appLink = 'https://app.santiment.net'

.wrapper
  +button.item(variant='ghost', fluid, href=appLink+'/labs/trends') Social trends 🔥
  +button.item(variant='ghost', fluid, href=appLink+'/ethereum-spent') ETH spent
  +button.item(variant='ghost', fluid, href=appLink+'/labs/balance') Historical balance
  +button.item(variant='ghost', fluid, href=appLink+'/dashboards') Dashboards
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

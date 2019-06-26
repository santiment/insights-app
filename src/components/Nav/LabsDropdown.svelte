<template lang="pug">
include /ui/mixins

.wrapper
  +button.item(variant='ghost', fluid) Social trends 🔥
  +button.item(variant='ghost', fluid) ETH spent
  +button.item(href="/labs/balance", variant='ghost', fluid) Historical balance
  +button.item(variant='ghost', fluid) Dashboards
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

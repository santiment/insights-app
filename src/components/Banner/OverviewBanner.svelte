<script>
  export let banner;
</script>

<template lang="pug">
include /ui/mixins

.wrapper(bind:this="{banner}")
  +panel
    .content
      .text
        h2.title Some text

  .advantages
    .advantage 1
    .advantage 2
    .advantage 3
</template>

<style lang="scss">
  .wrapper {
    border: 1px solid red;
    padding: 100px;
  }
</style>

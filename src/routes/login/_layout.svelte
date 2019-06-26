<script context="module">
  export async function preload(_, { isLoggedIn }) {
    if (isLoggedIn) {
      return this.redirect(302, '')
    }
  }
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper
  slot
</template>

<style>
  .wrapper {
    width: 500px;
    margin: 0 auto;
    padding: 30px 80px 36px;
    text-align: center;

    @include responsive('phone', 'phone-xs') {
      width: 100%;
      padding: 15px 30px;
    }
  }
</style>

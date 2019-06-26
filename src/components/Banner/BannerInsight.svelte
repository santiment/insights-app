<script>
  import OverviewBanner from './OverviewBanner.svelte'
  import ViewportObserver from '@/components/ViewportObserver'

  export let insightHeight

  let banner
  let isShown = false

  const options = {
    rootMargin: '-50px',
  }

  function toggleVisibility() {
    isShown = !isShown
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver({options}, on:intersect='{toggleVisibility}', on:leaving='{toggleVisibility}', top)
  OverviewBanner

+if('isShown')
  +panel.banner
    .img
    .content
      .text
        h2.title Aloha
        p.desc test
      .form
        subscribe
</template>

<style lang="scss">
  .banner {
    height: 90px;
    box-shadow: 0px 10px 20px rgba(24, 27, 43, 0.1);
    position: fixed;
    bottom: 8px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 10;
    max-width: 85%;
  }
</style>

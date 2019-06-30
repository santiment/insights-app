<script>
  import Notifications from '@/components/Notifications'
  import LoadProgress from '@/components/LoadProgress.svelte'
  import NavDesktop from '@/components/Nav'
  import NavMobile from '@/components/Mobile/Nav'
  import { getMobileComponent } from '@/utils/responsive'

  const Nav = getMobileComponent(NavMobile, NavDesktop)

  export let segment
</script>

<template lang="pug">
LoadProgress

Nav({segment})

main
  slot

Notifications

</template>

<style>
  main {
    max-width: 1024px;
    margin: 0 auto;
    padding: 25px 0;
  }
</style>

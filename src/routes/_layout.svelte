<script context="module">
  import { CURRENT_USER_QUERY } from '@/gql/user'
  export async function preload(page, session, { apollo }) {
    if (typeof session.currentUser !== 'object') {
      console.log('--- fetching currentUser ---')
      // loadingUser is needed for synchronizing with '/login' for redirect
      session.loadingUser = apollo.query({ query: CURRENT_USER_QUERY })
      const {
        data: { currentUser },
      } = await session.loadingUser
      console.log('--- done fetching ---')
      session.currentUser = currentUser
      session.loadingUser = null
    }
  }
</script>

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

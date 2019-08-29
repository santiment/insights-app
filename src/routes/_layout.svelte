<script context="module">
  import { CURRENT_USER_QUERY } from '@/gql/user'
  export async function preload(page, session, { apollo }) {
    if (typeof session.currentUser !== 'object') {
      // loadingUser is needed for synchronizing with '/login' for redirect
      session.loadingUser = apollo.query({ query: CURRENT_USER_QUERY })
      const {
        data: { currentUser },
      } = await session.loadingUser
      session.currentUser = currentUser
      session.loadingUser = null
    }
  }
</script>

<script>
  import { stores } from '@sapper/app'
  import Notifications from '@/components/Notifications'
  import LoadProgress from '@/components/LoadProgress.svelte'
  import NavDesktop from '@/components/Nav'
  import NavMobile from '@/components/Mobile/Nav'
  import { getMobileComponent } from '@/utils/responsive'

  export let segment

  const Nav = getMobileComponent(NavMobile, NavDesktop)

  const { page } = stores()

  const ROUTES_WITHOUT_TABS = new Set(['new', 'read'])
  $: activePath = getActivePath($page.path)

  function getActivePath(path) {
    switch (path) {
      case '/my':
      case '/my/drafts':
        return path
      default:
        return '/'
    }
  }
</script>

<template lang="pug">
include /ui/mixins

LoadProgress

Nav({segment})

main
  +if("!ROUTES_WITHOUT_TABS.has(segment)")
    +tabs.tabs
      +tab(href="/", class:active="{activePath === '/'}") All Insights
      +tab(href="/my", class:active="{activePath === '/my'}") My Insights
      +tab(href="/my/drafts", class:active="{activePath === '/my/drafts'}") My Drafts

  slot

Notifications

</template>

<style>
  main {
    max-width: 1024px;
    margin: 0 auto;
    padding: 25px 0;
  }

  .tabs {
    margin-bottom: 40px;
  }
</style>

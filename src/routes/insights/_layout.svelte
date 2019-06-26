<script>
  import { goto } from '@sapper/app'
  import { stores } from '@sapper/app'

  export let segment
  const { page } = stores()

  const ROUTES_WITHOUT_TABS = new Set(['new', 'read'])
  $: activePath = getActivePath($page.path)

  function getActivePath(path) {
    switch (path) {
      case '/insights/my':
      case '/insights/my/drafts':
        return path
      default:
        return '/insights'
    }
  }
</script>

<template lang="pug">
include /ui/mixins

+if("!ROUTES_WITHOUT_TABS.has(segment)")
  +tabs
    +tab(href="/insights", class:active="{activePath === '/insights'}") All Insights
    +tab(href="/insights/my", class:active="{activePath === '/insights/my'}") My Insights
    +tab(href="/insights/my/drafts", class:active="{activePath === '/insights/my/drafts'}") My Drafts

slot
</template>

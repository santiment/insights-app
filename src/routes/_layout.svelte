<script context="module">
  import { CURRENT_USER_QUERY } from '@/gql/user'
  import { checkGDPR } from '@/logic/gdpr'

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

    if (page.path !== '/gdpr') {
      checkGDPR(session.currentUser, this)
    }
  }
</script>

<script>
  import { setContext } from 'svelte'
  import { stores } from '@sapper/app'
  import Notifications from '@/components/Notifications'
  import LoadProgress from '@/components/LoadProgress'
  import NavDesktop from '@/components/Nav'
  import NavMobile from '@/components/Mobile/Nav'
  import CookiePopup from '@/components/CookiePopup'
  import Analytics from '@/components/Analytics'
  import FirstPromoter from '@/components/FirstPromoter'
  import Intercom from '@/components/Intercom'
  import Stripe from '@/components/Stripe'
  import Tags from './_Tags.svelte'
  import { user$ } from '@/stores/user'
  import { toggleInsightLike } from '@/logic/likes'
  import { lookupSavedComment } from '@/utils/comments'
  import { getMobileComponent } from '@/utils/responsive'

  export let segment

  const Nav = getMobileComponent(NavMobile, NavDesktop)
  const isMobile = Nav === NavMobile

  const currentUser = user$()

  const ROUTES_WITH_TABS = new Set([
    undefined, // index page
    'pulse',
    'tags',
  ])

  let wasNotified = false

  $: if (process.browser && !wasNotified && $currentUser) {
    wasNotified = true
    lookupSavedComment()
  }

  setContext('toggleInsightLike', toggleInsightLike)
</script>

<template lang="pug">
include /ui/mixins

+if('process.env.BACKEND_URL !== "https://api-stage.santiment.net"')
  Analytics
  FirstPromoter 

LoadProgress

CookiePopup

Stripe 
  Nav

  main(class:isMobile)
    +if("ROUTES_WITH_TABS.has(segment)")
      .tabs
        a.tab(href="/", class:active="{!segment}", prefetch) Insights
        a.tab(href="/pulse", class:active="{segment === 'pulse'}", prefetch) Pulse Insight
      Tags(base!='{segment || ""}')

    slot

Notifications

+if('process.env.BACKEND_URL !== "https://api-stage.santiment.net" && !isMobile')
  Intercom 

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  main {
    max-width: $desktop-container-width;
    margin: 0 auto;
    height: 100%;
    padding: 95px 15px 25px;

    @include responsive('desktop') {
      padding: 95px 0 25px;
    }
  }

  .isMobile {
    padding: 16px;

    :global(.bot-scroll) {
      padding-bottom: 76px;
    }
  }

  .tabs {
    margin-bottom: 32px;

    &_mobile {
      width: auto;
      margin: 0 -16px 20px;
      padding: 0 16px;
    }
  }

  .tab {
    @include text('h4', 'm');
    margin-right: 32px;
    color: var(--casper);

    &:last-child {
      margin: 0;
    }

    &.active {
      color: var(--rhino);
    }
  }
</style>

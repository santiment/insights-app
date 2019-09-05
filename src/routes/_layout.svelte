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
  import { stores } from '@sapper/app'
  import Notifications from '@/components/Notifications'
  import LoadProgress from '@/components/LoadProgress'
  import NavDesktop from '@/components/Nav'
  import NavMobile from '@/components/Mobile/Nav'
  import CookiePopup from '@/components/CookiePopup'
  import { getMobileComponent } from '@/utils/responsive'

  export let segment

  const Nav = getMobileComponent(NavMobile, NavDesktop)
  const isMobile = Nav === NavMobile

  const { page, session } = stores()

  const ROUTES_WITHOUT_TABS = new Set([
    'new',
    'read',
    'edit',
    'login',
    'logout',
    'gdpr',
    'experience',
  ])
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

mixin newInsight()
  +button(href='/new', variant='fill', accent='jungle-green')&attributes(attributes)
    +icon('plus-round').plus
    |Write insight

LoadProgress

CookiePopup

Nav({segment}, isLoggedIn='{$session.currentUser}')

main(class:isMobile)
  +if("!ROUTES_WITHOUT_TABS.has(segment)")
    .top
      h1 Insights
      .right
        +if('!isMobile')
          +newInsight(rel='prefetch').btn
  
    +tabs.tabs(class:tabs_mobile='{isMobile}')
      +tab(href="/", class:active="{activePath === '/'}", prefetch) All Insights
      +tab(href="/my", class:active="{activePath === '/my'}", prefetch) My Insights
      +tab(href="/my/drafts", class:active="{activePath === '/my/drafts'}", prefetch) My Drafts
    +if('isMobile')
      +newInsight().btn_mobile(fluid)

  slot

Notifications

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .top {
    display: flex;
    align-items: center;
    margin: 0 0 20px;
    justify-content: space-between;
  }

  .right {
    display: flex;
  }

  h1 {
    @include text('h3', 'm');

    @include responsive('phone', 'phone-xs') {
      @include text('h4', 'm');
    }
  }

  .plus {
    @include size(15px);
    margin-right: 8px;
  }

  .btn {
    margin-left: 16px;

    &_mobile {
      justify-content: center;
      margin-bottom: 20px;
    }
  }

  main {
    max-width: $desktop-container-width;
    margin: 0 auto;
    padding: 95px 0 25px;
    height: 100%;
  }

  .isMobile {
    padding: 16px 16px;

    :global(.bot-scroll) {
      padding-bottom: 76px;
    }
  }

  .tabs {
    margin-bottom: 40px;

    &_mobile {
      width: auto;
      margin: 0 -16px 20px;
      padding: 0 16px;
    }
  }
</style>

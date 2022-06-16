<script context="module">
  export function preload(page, session) {
    if (page.path === '/gdpr') return

    const user = session.currentUser
    if (user && !user.privacyPolicyAccepted) {
      return this.redirect(302, '/gdpr')
    }
  }
</script>

<script>
  import { setContext } from 'svelte'
  import { stores } from '@sapper/app'
  import { track } from 'webkit/analytics'
  import PageLoadProgress from 'webkit/ui/PageLoadProgress.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte'
  import CookiePopup from 'webkit/ui/CookiesPopup.svelte'
  import Notifications from 'webkit/ui/Notifications'
  import { session } from '@/stores/session'
  import Nav from '@cmp/Nav/index.svelte'
  import NavMobile from '@cmp/Nav/Mobile.svelte'

  const { preloading, page } = stores()

  setContext('isMobile', $session.isMobile)

  $: process.browser && $page.path && track.pageview('insights')
</script>

{#if $session.isMobile}
  <NavMobile />
{:else}
  <Nav />
{/if}

{#if process.browser && $session.isDesktop}
  <BackToTop />
{/if}

<main class="section">
  <slot />
</main>

{#if process.browser}
  <CookiePopup />
  <Dialogs />
  <Notifications />
  <PageLoadProgress {preloading} />
{/if}

<style>
  main {
    padding: 32px 0;
    flex: 1;
    width: 100%;
  }

  :global(.isMobile) main {
    padding: 16px 16px 76px;
  }
</style>

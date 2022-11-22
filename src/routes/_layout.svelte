<script context="module">
  export function preload(page, session) {
    if (page.path === '/gdpr') return

    const user = session.currentUser
    if (user && !user.privacyPolicyAccepted) {
      return this.redirect(302, '/gdpr')
    }
  }

  export const MOBILE_NAVBAR_LINKS = [
    {
      title: 'Market',
      icon: 'market',
      href: 'https://app.santiment.net/assets',
    },
    {
      title: 'Chart',
      icon: 'chart',
      href: 'https://app.santiment.net/projects',
      slug: '/bitcoin',
    },
    {
      title: 'Watchlist',
      icon: 'watchlist',
      href: 'https://app.santiment.net/watchlists',
    },
    {
      title: 'Insights',
      icon: 'insights',
      href: '/',
    },
  ]
</script>

<script>
  import { setContext } from 'svelte'
  import { stores } from '@sapper/app'
  import { isTrackingEnabled } from 'webkit/analytics'
  import { updateAmplitude } from 'webkit/analytics/amplitude'
  import { trackPageView, trackLoginFinish } from 'webkit/analytics/events/general'
  import { getSavedLoginMethod } from 'webkit/analytics/events/utils'
  import { trackSignupFinish } from 'webkit/analytics/events/onboarding'
  import PageLoadProgress from 'webkit/ui/PageLoadProgress.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte'
  import CookiePopup from 'webkit/ui/CookiesPopup.svelte'
  import Notifications from 'webkit/ui/Notifications'
  import Header from 'webkit/ui/MobileHeader/Header.svelte'
  import Navbar from 'webkit/ui/MobileNavbar/Navbar.svelte'
  import Search from 'webkit/ui/MobileSearch/Search.svelte'
  import Product from 'webkit/ui/Product.svelte'
  import Svg from 'webkit/ui/Svg'
  import Nav from '@cmp/Nav/index.svelte'
  import { session } from '@/stores/session'
  import { currentUser } from '@/stores/user'

  const { preloading, page } = stores()

  setContext('isMobile', $session.isMobile)

  let source = ''
  let show = false

  if (process.browser) {
    page.subscribe(({ path }) => {
      if (source && source !== path) {
        trackPageView({
          url: path,
          type: 'insights',
          sourceType: 'insights',
          sourceUrl: source,
        })
      }

      source = path
    })

    if (isTrackingEnabled) {
      currentUser.subscribe((user) => {
        if (!user) return
        updateAmplitude(user.id, user.username, user.email)

        const { method } = getSavedLoginMethod() || {}
        if (method) {
          if (user.firstLogin) {
            trackSignupFinish(method)
          } else {
            trackLoginFinish(method)
          }
        }
      })
    }
  }
</script>

{#if $session.isMobile}
  <Header onSearchClick={() => (show = true)}>
    <svelte:fragment slot="left">
      {#if $page.path.startsWith('/read')}
        <a href="/" class="btn row v-center body-2">
          <Svg id="arrow-left-big" w="8" h="14" class="mrg-m mrg--r" />
          All insights
        </a>
      {:else}
        <Product title="Sanbase" />
      {/if}
    </svelte:fragment>
  </Header>
  <Navbar links={MOBILE_NAVBAR_LINKS} path={$page.path} user={$currentUser} isFullLink />
  <Search bind:show />
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

<style lang="scss">
  main {
    padding: 32px 0;
    flex: 1;
    width: 100%;
  }

  :global(body:not(.desktop)) main {
    margin-bottom: 83px;
    overflow-y: auto;
    padding: 0;
  }
</style>

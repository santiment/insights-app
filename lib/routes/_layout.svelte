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
  import { isTrackingEnabled } from 'san-webkit/lib/analytics'
  import { updateAmplitude } from 'san-webkit/lib/analytics/amplitude'
  import { trackPageView, trackLoginFinish } from 'san-webkit/lib/analytics/events/general'
  import { getSavedLoginMethod } from 'san-webkit/lib/analytics/events/utils'
  import { trackSignupFinish } from 'san-webkit/lib/analytics/events/onboarding'
  import { parseAuthSearchParams } from 'san-webkit/lib/utils/auth'
  import PageLoadProgress from 'san-webkit/lib/ui/PageLoadProgress.svelte'
  import BackToTop from 'san-webkit/lib/ui/BackToTop.svelte'
  import Dialogs from 'san-webkit/lib/ui/Dialog/Dialogs.svelte'
  import CookiePopup from 'san-webkit/lib/ui/CookiesPopup.svelte'
  import Notifications from 'san-webkit/lib/ui/Notifications'
  import Navbar from 'san-webkit/lib/ui/MobileNavbar/Navbar.svelte'
  import Nav from './../components/Nav/index.svelte'
  import { session } from './../stores/session'
  import { currentUser } from './../stores/user'

  const { preloading, page } = stores()

  setContext('isMobile', $session.isMobile)

  let source = ''

  if (process.browser) {
    page.subscribe(({ path }) => {
      if (source !== path) {
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

        let { method } = getSavedLoginMethod() || {}
        const { auth } = parseAuthSearchParams()

        if (auth) {
          method = auth

          window.history.replaceState(window.history.state, null, window.location.pathname)
        }

        if (method) {
          if (user.firstLogin) {
            window.onGdprAccept = () => trackSignupFinish(method)
          } else {
            trackLoginFinish(method)
          }
        }
      })
    }
  }
</script>

{#if $session.isMobile}
  <Navbar links={MOBILE_NAVBAR_LINKS} path={$page.path} user={$currentUser} isFullLink />
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

<style lang="scss">main {
  padding: 32px 0;
  flex: 1;
  width: 100%;
}

:global(body:not(.desktop)) main {
  margin-bottom: 83px;
  overflow-y: auto;
  padding: 0;
}</style>

<script context="module">
  import { PlanName } from 'webkit/utils/plans'

  Object.assign(PlanName, {
    PRO_PLUS: 'Pro+',

    PRO: 'Sanbase Pro',
    MAX: 'Sanbase Max',

    BUSINESS_PRO: 'Business Pro',
    BUSINESS_MAX: 'Business Max',
    CUSTOM: 'Enterprise',
  })

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
  import { parseAuthSearchParams } from 'webkit/utils/auth'
  import PageLoadProgress from 'webkit/ui/PageLoadProgress.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import Dialogs from 'webkit/ui/Dialog/Dialogs.svelte'
  import CookiePopup from 'webkit/ui/CookiesPopup.svelte'
  import Notifications from 'webkit/ui/Notifications'
  import Navbar from 'webkit/ui/MobileNavbar/Navbar.svelte'
  import Nav from '@cmp/Nav/index.svelte'
  import { session } from '@/stores/session'
  import { currentUser } from '@/stores/user'

  const { preloading, page } = stores()

  setContext('isMobile', $session.isMobile)

  let source = ''

  if (process.browser) {
    let isFpromTracked = false

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

    currentUser.subscribe((user) => {
      if (!user) return
      if (isFpromTracked) return

      const { id, email, username } = user

      if (window.$FPROM) {
        isFpromTracked = true //
        window.$FPROM.trackSignup({ id, email, username })
      }
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

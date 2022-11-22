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
  import { session } from '@/stores/session'
  import { currentUser } from '@/stores/user'
  import Nav from '@cmp/Nav/index.svelte'
  import NavMobile from '@cmp/Nav/Mobile.svelte'

  const { preloading, page } = stores()

  setContext('isMobile', $session.isMobile)

  let source = ''

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

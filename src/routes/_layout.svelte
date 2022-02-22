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
  import { dialogs } from 'webkit/ui/Dialog'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import { session } from '@/stores/session'
  import Nav from '@cmp/Nav/index.svelte'
  import NavMobile from '@cmp/Nav/Mobile.svelte'
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

<div id="dialogs">
  {#each $dialogs as { Component, props }, i}
    <svelte:component this={Component} {...props} {i} />
  {/each}
</div>

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

<script>
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

<style>
  main {
    padding: 32px 0;
    flex: 1;
    width: 100%;
  }
  :global(.isMobile) main {
    padding: 16px;
  }
</style>

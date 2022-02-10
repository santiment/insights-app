<script>
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import { session } from '@/stores/session'
  import Nav from '@cmp/Nav/index.svelte'
</script>

{#if $session.isMobile === false}
  <Nav />
{/if}

{#if process.browser && $session.isMobile === false}
  <BackToTop />
{/if}

<main class="section">
  <slot />
</main>

<style>
  main {
    padding: 32px 0;
  }
  :global(.isMobile) main {
    padding: 16px;
  }
</style>

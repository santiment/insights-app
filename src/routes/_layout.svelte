<script>
  import Nav from '@/_components/Nav/index.svelte'
  import BackToTop from 'webkit/ui/BackToTop.svelte'
  import { session } from '@/stores/session'
</script>

<svelte:head>
  <title>Insights</title>
  <meta property="og:title" content="Insights" />
  <meta name="description" content="All Community Insights" />
  <meta property="og:description" content="All Commmunity Insights" />
</svelte:head>

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

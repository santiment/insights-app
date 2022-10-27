<script>
  import Product from 'webkit/ui/Product.svelte'
  import Products from 'webkit/ui/Products/svelte'
  import HalloweenBtn from 'webkit/ui/Halloween/Button.svelte'
  import Search from './Search.svelte'
  import Account from './Account.svelte'

  let isMenuOpened = false
</script>

<nav class:fixed={isMenuOpened}>
  <div class="section row v-center">
    <Product title="Insights" class="mrg-l mrg--r" isHalloween />
    <Products active="insights" isCompact isColumn />

    <Search />

    <div class="break mrg-xl mrg--l mrg--r" />

    {#if process.browser}
      <HalloweenBtn class="mrg-l mrg--r" />
    {/if}

    <Account />
  </div>
</nav>

<style>
  nav {
    background: var(--white);
    border-bottom: 1px solid var(--porcelain);
    padding: 16px 0;
    z-index: 3;
  }
  :global(.desktop) nav {
    padding: 19px 0;
  }

  .break {
    width: 1px;
    height: 32px;
    background: var(--porcelain);
  }
</style>

<script>
  import Product from 'webkit/ui/Product.svelte'
  import Products from 'webkit/ui/Products/svelte'
  // import MobileMenu from './MobileMenu.svelte'
  import Search from './Search.svelte'
  import Account from './Account.svelte'

  let isMenuOpened = false
</script>

<nav class:fixed={isMenuOpened}>
  <div class="section row v-center">
    <Product title="Insights" class="mrg-l mrg--r" />
    <Products active="insights" />

    <Search />

    <div class="break mrg-xl mrg--l mrg--r" />

    <Account />
  </div>
</nav>

<style>
  nav {
    border-bottom: 1px solid var(--porcelain);
    padding: 16px 0;
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

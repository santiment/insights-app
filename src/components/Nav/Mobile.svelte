<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Menu from './MobileMenu.svelte'

  let isMenuOpened = false
  const toggleMenu = () => (isMenuOpened = !isMenuOpened)
</script>

<nav class="row v-center c-casper caption txt-m">
  <a href="https://app.santiment.net/feed">
    <Svg illus id="nav/feed" w="15" h="17" />
    Feed
  </a>
  <a href="https://app.santiment.net/assets">
    <Svg illus id="nav/market" w="18" h="19" />
    Market
  </a>
  <a href="https://app.santiment.net/watchlists">
    <Svg illus id="nav/watchlists" w="21" h="17" />
    Watchlists
  </a>
  <a href="/" class:active={!isMenuOpened} on:click={() => (isMenuOpened = false)}>
    <Svg illus id="nav/insights" w="17" h="17" />
    Insights
  </a>
  <button class:active={isMenuOpened} on:click={toggleMenu}>
    <Svg illus id="nav/menu" w="17" h="16" />
    Menu
  </button>
</nav>

{#if isMenuOpened}
  <Menu />
{/if}

<style>
  nav {
    box-shadow: 0 0 20px rgba(24, 27, 43, 0.05);
    z-index: 11;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--white);
    border: 2px solid var(--porcelain);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  nav :global(svg) {
    margin-bottom: 4px;
  }

  a,
  button {
    padding: 10px 12px 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .active {
    color: var(--green);
    --black: var(--green);
    --porcelain: var(--green-light-2);
  }
</style>

<script>
  import Product from 'webkit/ui/Product.svelte'
  import Products from 'webkit/ui/Products/svelte'
  import NftButton from 'webkit/ui/ChristmasNFTDialog/Button.svelte'
  import { checkWasNftDialogClosedOnce } from 'webkit/ui/ChristmasNFTDialog/api'
  import { showChristmasNFTDialog } from 'webkit/ui/ChristmasNFTDialog/Dialog.svelte'
  import Search from './Search.svelte'
  import Account from './Account.svelte'
  import { onDestroy, onMount } from 'svelte'

  let isMenuOpened = false

  let timer
  onMount(() => {
    if (!checkWasNftDialogClosedOnce()) {
      timer = setTimeout(() => showChristmasNFTDialog(), 2000)
    }

    window.onNftGameStart = () => {
      const data = { campaign_participant: 'nft_battle_2022' }

      if (window.Intercom) {
        window.Intercom('update', data)
      }

      if (window.identifyAmplitude) {
        window.identifyAmplitude((identity) => {
          Object.keys(data).forEach((key) => {
            identity.set(key, data[key])
          })
        })
      }
    }
  })

  onDestroy(() => {
    if (!process.browser) return

    delete window.onNftGameStart
    clearTimeout(timer)
  })
</script>

<nav class:fixed={isMenuOpened}>
  <div class="section row v-center">
    <Product title="Insights" class="mrg-l mrg--r" />
    <Products active="insights" isCompact isColumn />

    <Search />

    <div class="break mrg-xl mrg--l mrg--r" />

    <NftButton class="mrg-l mrg--r" />

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

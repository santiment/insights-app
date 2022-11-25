<script>
  import { stores } from '@sapper/app'
  import Header from 'webkit/ui/MobileHeader/Header.svelte'
  import Search from 'webkit/ui/MobileSearch/Search.svelte'
  import Svg from 'webkit/ui/Svg'
  import VoteButton from '@cmp/VoteButton.svelte'
  import ShareBtn from '@cmp/ShareButton.svelte'

  const { page } = stores()

  export let insight
  export let isDraft

  let show = false
  let source = 'insights_article_header'
</script>

<Header onSearchClick={() => (show = true)}>
  <svelte:fragment slot="left">
    {#if $page.path.startsWith('/read')}
      <a href="/" class="btn row v-center body-2">
        <Svg id="arrow-left-big" w="8" h="14" class="mrg-m mrg--r" />
        All insights
      </a>
    {:else}
      <h4 class="h4 txt-m">Insights</h4>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="right">
    {#if $page.path.startsWith('/read') && insight}
      <VoteButton {insight} {source} class="$style.action $style.vote body-2" />
      {#if !isDraft}
        <ShareBtn {insight} {source} class="$style.action row hv-center mrg-m mrg--l" />
      {/if}
    {:else}
      <button class="search row hv-center" on:click={() => (show = true)}>
        <Svg id="search" w="18" />
      </button>
    {/if}
  </svelte:fragment>
</Header>
<Search bind:show />

<style>
  .search {
    width: 40px;
    height: 40px;
  }

  .action {
    height: 40px;
  }

  .vote {
    padding: 8px 16px !important;
  }
</style>

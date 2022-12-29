<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { showChristmasNFTDialog } from 'webkit/ui/ChristmasNFTDialog/Dialog.svelte'
  import { Page } from 'webkit/ui/ChristmasNFTDialog/types'
  import { trackNftBattleCTA } from 'webkit/analytics/events/nftbattle'
  import CommentBtn from '@cmp/CommentButton.svelte'
  import ShareBtn from '@cmp/ShareButton.svelte'
  import EditBtn from '@cmp/EditButton.svelte'
  import VoteButton from '@cmp/VoteButton.svelte'
  import { checkIsNFTTag } from '@/utils/insights'

  export let insight
  export let link
  export let hidden = true
  export let isAuthor
  export let isDraft

  const source = 'insights_article_side_actions'

  $: ({ id, commentsCount, tags } = insight)
  $: isNftBattle = (tags || []).some((tag) => tag && checkIsNFTTag(tag.name))
</script>

<aside>
  <div class:hidden class="fixed column c-waterloo">
    <VoteButton {insight} {source} />
    <CommentBtn
      {id}
      href="/read/{link}"
      {source}
      class="mrg-s mrg--t mrg--b"
      count={commentsCount}
    />
    {#if !isDraft}<ShareBtn {insight} {source} class="mrg-s mrg--b" />{/if}
    {#if isAuthor}<EditBtn {insight} class="" />{/if}

    {#if isNftBattle}
      <button
        class="nft btn row v-center"
        on:click={() => {
          trackNftBattleCTA(source)
          showChristmasNFTDialog({ page: Page.Info })
        }}
      >
        <Svg id="nft" w="16" />
        NFTBattle
      </button>
    {/if}
  </div>
</aside>

<style>
  aside {
    position: absolute;
    left: -130px;
    top: 95px;
  }

  .fixed {
    position: fixed;
    transition: opacity 150ms ease-in;
    opacity: 1;
    align-items: flex-start;
  }

  .hidden {
    opacity: 0;
    pointer-events: none;
  }

  .nft {
    gap: 8px;
    padding: 10px 12px;
    border-radius: 54px;
    margin: 24px 4px;
    writing-mode: sideways-lr;
    --bg: var(--purple-light-1);
    --color: var(--purple);
    --color-hover: var(--purple-hover);
  }
</style>

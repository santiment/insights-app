<script>
  import CommentBtn from '@cmp/CommentButton.svelte'
  import ShareBtn from '@cmp/ShareButton.svelte'
  import EditBtn from '@cmp/EditButton.svelte'
  import VoteButton from '@cmp/VoteButton.svelte'

  export let insight
  export let link
  export let hidden = true
  export let isAuthor
  export let isDraft

  $: ({ votes, commentsCount } = insight)
</script>

<aside>
  <div class:hidden class="fixed column c-waterloo">
    <VoteButton {insight} />
    <CommentBtn href="/read/{link}" class="mrg-s mrg--t mrg--b" count={commentsCount} />
    {#if !isDraft}<ShareBtn {insight} class="mrg-s mrg--b" />{/if}
    {#if isAuthor}<EditBtn {insight} class="" />{/if}
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
</style>

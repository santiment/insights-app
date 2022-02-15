<script>
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import CommentBtn from '@cmp/CommentButton.svelte'

  export let insight
  export let link
  export let hidden = true

  $: ({ votes, commentsCount } = insight)
</script>

<aside>
  <div class:hidden class="fixed column c-waterloo">
    <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />
    <CommentBtn href="/read/{link}" class="mrg-s mrg--t mrg--b" count={commentsCount} />
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

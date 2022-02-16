<script>
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import CommentBtn from '@cmp/CommentButton.svelte'
  import { startFollowFlow } from '@/flow/follow'

  export let insight
  export let link
  export let isFollowing

  $: ({ user, votes, commentsCount } = insight)
  $: ({ username } = user)
  $: followMsg = `Follow ${username}`

  const delay = () => ({ delay: 500 })

  function onFollow({ currentTarget }) {
    currentTarget.textContent = isFollowing ? followMsg : 'Unfollow'
    startFollowFlow(user.id)
  }
</script>

<div class="epilogue body-2 c-waterloo mrg-xl mrg--t">
  <h3 class="h4 txt-m mrg-l mrg--b c-black">Thanks for reading!</h3>
  <p class="cta">
    If you enjoyed this insight please leave a like, join discussion in the comments and share it
    with your friends!
  </p>

  <div class="row h-center body-3">
    <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />
    <CommentBtn href="read/{link}" count={commentsCount} />
  </div>

  {#if !isFollowing}
    <div class="follow column v-center" out:delay>
      <h3 class="h4 txt-m mrg-s mrg--b c-black">Never miss a post from {username}!</h3>
      <p class="mrg-xl mrg--b">Get 'early bird' alerts for new insights from this author</p>
      <button class="btn-1 btn--s body-3" on:click={onFollow}>{followMsg}</button>
      <img src="/overview_banner.svg" alt="Banner" loading="lazy" />
    </div>
  {/if}
</div>

<style>
  .epilogue {
    text-align: center;
  }
  .cta {
    max-width: 460px;
    margin: 14px auto 28px;
  }

  .follow {
    margin: 40px auto 0;
    padding: 32px;
    background: var(--athens);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }
  .h4,
  .btn-1 {
    z-index: 1;
  }

  .btn-1 {
    color: #fff;
    --bg: #2f354d;
    --bg-hover: #2b3046;
  }

  img {
    position: absolute;
    opacity: 0.2;
    top: 0;
    left: 0;
    width: 100%;
  }
</style>

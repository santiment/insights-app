<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ title, user, publishedAt, votes } = insight)
  $: date = formatDate(publishedAt)

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<div class="border {className}">
  <div class="column">
    <div class="top">
      <a href="/" class="body-2 mrg-m mrg--b">{title}</a>

      <Profile {user}>
        <div class="caption c-waterloo">{date}</div>
      </Profile>
    </div>
    <div class="bottom c-waterloo">
      <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />
    </div>
  </div>
</div>

<style>
  .top {
    padding: 18px 16px 16px 24px;
    border-bottom: 1px solid var(--porcelain);
  }
  .bottom {
    padding: 12px 16px 12px 24px;
  }

  a {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

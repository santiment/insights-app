<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Svg from 'webkit/ui/Svg/svelte'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import LikeBtn from 'webkit/ui/LikeButton/svelte'
  import Tags from '@cmp/Tags.svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ id, title, user, publishedAt, votes, tags } = insight)
  $: date = formatDate(publishedAt)
  $: readLink = '/read/' + getSEOLinkFromIdAndTitle(id, title)

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<div class="border {className}">
  <div class="column">
    <div class="top">
      <a href={readLink} class="title body-2 mrg-m mrg--b">{title}</a>

      <Profile {user}>
        <div class="caption c-waterloo">{date}</div>
      </Profile>
    </div>
    <div class="bottom row v-center c-waterloo">
      <LikeBtn totalVotes={votes.totalVotes} userVotes={votes.currentUserVotes} />

      <a href="/" class="comment btn-2 mrg-m mrg--l">
        <Svg id="comment" w="16" h="14" class="mrg-xs mrg--r" />
        0
      </a>

      <div class="c-waterloo mrg-a mrg--l caption">
        <Tags {tags} />
      </div>
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

  .title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .comment {
    padding: 5px 12px;
    border-radius: 20px;
    fill: var(--waterloo);
  }
</style>

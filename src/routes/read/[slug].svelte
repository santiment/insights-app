<script context="module">
  import { getIdFromSEOLink } from 'webkit/utils/url'
  import { CommentsType } from 'webkit/api/comments'
  import { queryInsightSSR } from '@/api/insights'

  export async function preload(page) {
    const id = getIdFromSEOLink(page.params.slug)
    const insight = await queryInsightSSR(id, this)

    return { insight }
  }
</script>

<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Comments from 'webkit/ui/Comments/svelte'
  import Tags from '@cmp/Tags.svelte'
  import Author from './_Author.svelte'
  import Epilogue from './_Epilogue.svelte'
  import { currentUser } from '@/stores/user'

  export let insight

  $: ({ title, text, user, publishedAt, tags } = insight)

  $: ({ MMM, D, YYYY } = getDateFormats(new Date(publishedAt)))
  $: date = `${MMM} ${D}, ${YYYY}`
</script>

<div class="insight">
  <div class="row v-center">
    <a href="/" class="c-casper">Insights</a>

    <a href="/read/">{title}</a>
  </div>

  <h1 class="h2 mrg-xl mrg--b mrg--t">{title}</h1>

  <Author {user} {date} />

  <!-- <div class="text mrg-xl mrg--t">{@html text}</div> -->

  <div class="tags c-waterloo mrg-xl mrg--t caption">
    <Tags {tags} />
  </div>

  <Author {user} {date} />
  <Epilogue {insight} />

  <div id="comments">
    <Comments
      type={CommentsType.Insight}
      commentsFor={insight}
      currentUser={$currentUser}
      titleClass="h4 c-waterloo" />
  </div>
</div>

<style>
  .insight {
    max-width: 720px;
    margin: 0 auto;
  }

  .tags {
    padding: 0 0 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--porcelain);
  }

  #comments {
    margin-top: 40px;
  }

  #comments :global(form) {
    margin-bottom: 30px;
  }

  #comments :global(form button) {
    height: 40px;
    min-width: 92px;
  }

  #comments :global(form textarea) {
    resize: vertical;
    min-height: 40px;
    padding: 9px 12px;
  }
</style>

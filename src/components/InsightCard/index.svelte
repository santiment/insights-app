<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import Card from './Card.svelte'
  import Price from './Price.svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ title, user, publishedAt } = insight)
  $: date = formatDate(publishedAt)

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<Card {insight} class={className} let:href>
  <a {href} class="title body-2 mrg-m mrg--b">{title}</a>

  <Profile {user}>
    <div class="caption c-waterloo">{date}</div>
  </Profile>

  <svelte:fragment slot="right">
    {#if process.browser}
      <Price {insight} />
    {/if}
  </svelte:fragment>
</Card>

<style>
  .title {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

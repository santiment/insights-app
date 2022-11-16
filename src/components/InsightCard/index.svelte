<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import Card from './Card.svelte'
  import Price from './Price.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let isWithPrice = process.browser
  export let source

  $: ({ title, user, publishedAt, tags } = insight)
  $: date = formatDate(publishedAt)

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<Card {insight} {source} class={className} let:node let:href>
  <a {href} class="title line-clamp body-2 mrg-m mrg--b" sapper:prefetch>{title}</a>

  <div class="row v-center">
    <Profile {user} {source} feature="insight">
      <div class="caption c-waterloo">{date}</div>
    </Profile>

    <Editorial {user} />
  </div>

  <svelte:fragment slot="right">
    {#if isWithPrice && node && tags.length}<Price {node} {insight} />{/if}
  </svelte:fragment>
</Card>

<style>
  @supports not (display: -webkit-box) {
    .title {
      display: block;
    }
  }
</style>

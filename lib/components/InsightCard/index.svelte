<script>
  import { getDateFormats } from 'san-webkit/lib/utils/dates'
  import Profile from 'san-webkit/lib/ui/Profile/index.svelte'
  import Card from './Card.svelte'
  import Price from './Price.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let isWithPrice = process.browser
  export let source
  export let currentUser
  export let isMobile = false

  $: ({ title, user, publishedAt, tags } = insight)
  $: date = formatDate(publishedAt)

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<Card {insight} {source} class={className} {currentUser} let:node let:href>
  <a {href} class="{isMobile ? 'body-1' : 'body-2'} line-clamp mrg-m mrg--b" sapper:prefetch>
    {title}
  </a>

  <div class="row v-center">
    <Profile {user} {source} feature="insight" class="profile-5xhCHP {isMobile ? 'txt-m' : ''}">
      <div class="{isMobile ? 'body-3' : 'caption'} txt-r c-waterloo">{date}</div>
    </Profile>

    <Editorial {user} {tags} {isMobile} />
  </div>

  <svelte:fragment slot="right">
    {#if isWithPrice && !isMobile && node && tags.length}
      <Price {node} {insight} />
    {/if}
  </svelte:fragment>
</Card>

<style lang="scss">
  :global(body:not(.desktop)) :global(.profile-5xhCHP) {
    --img-size: 40px;
  }

  @supports not (display: -webkit-box) {
    .title {
      display: block;
    }
  }
</style>

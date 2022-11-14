<script>
  import { getDateFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import { session } from '@/stores/session'
  import Card from './Card.svelte'
  import Price from './Price.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let isWithPrice = process.browser

  $: ({ title, user, publishedAt, tags } = insight)
  $: date = formatDate(publishedAt)
  $: isMobile = $session.isMobile

  function formatDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<Card {insight} class={className} let:node let:href>
  <a {href} class="{isMobile ? 'body-1' : 'body-2'} single-line mrg-m mrg--b" sapper:prefetch>
    {title}
  </a>

  <div class="row v-center">
    <Profile {user} class="$style.profile {isMobile ? 'txt-m' : ''}">
      <div class="{isMobile ? 'body-3' : 'caption'} txt-r c-waterloo">{date}</div>
    </Profile>

    <Editorial {user} />
  </div>

  <svelte:fragment slot="right">
    {#if isWithPrice && node && tags.length}
      <Price {node} {insight} />
    {/if}
  </svelte:fragment>
</Card>

<style lang="scss">
  .profile {
    :global(body:not(.desktop)) & {
      --img-size: 40px;
    }
  }
</style>

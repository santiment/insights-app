<script>
  import { getDateFormats, getTimeFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import { session } from '@/stores/session'
  import InsightText from '@cmp/InsightText.svelte'
  import Card from './Card.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight

  $: ({ title, user, publishedAt, pulseText, text = pulseText } = insight)
  $: date = formatDate(publishedAt)
  $: shortDate = formatShortDate(publishedAt)
  $: isMobile = $session.isMobile

  function formatDate(date) {
    date = new Date(date)
    const { MM, D, YY } = getDateFormats(date)
    const { HH, mm } = getTimeFormats(date)
    return `${D}-${MM}-${YY}, ${HH}:${mm}`
  }

  function formatShortDate(date) {
    const { MMM, D, YYYY } = getDateFormats(new Date(date))
    return `${MMM} ${D}, ${YYYY}`
  }
</script>

<Card {insight} class={className} let:href>
  <a
    {href}
    class="{isMobile ? 'body-1 single-line line-clamp' : 'h4'} row justify mrg-m mrg--b"
    sapper:prefetch
  >
    {title}
    {#if !isMobile}
      <span class="c-waterloo caption">{date}</span>
    {/if}
  </a>

  {#if !isMobile}
    <InsightText {text} class="$style.text body-2" />
  {/if}

  <div class="row v-center">
    <Profile {user} class="$style.profile {isMobile ? 'txt-m' : 'c-waterloo caption mrg-m mrg--t'}">
      {#if isMobile}
        <div class="body-3 txt-r c-waterloo">{shortDate}</div>
      {/if}
    </Profile>
    <Editorial {user} />
  </div>
</Card>

<style lang="scss">
  a {
    word-break: break-all;

    :global(body:not(.desktop)) & {
      display: block;
    }
  }

  span {
    align-self: flex-start;
    margin: 4px 0 0 16px;
    white-space: nowrap;
  }

  .profile {
    --img-size: 24px;

    :global(body:not(.desktop)) & {
      --img-size: 40px;
    }
  }

  .text {
    --text-h1-size: 18px;
    --text-h2-size: 16px;

    --text-ul-margin: 10px 0 25px;

    --text-figure-mrg-b: 12px;

    --text-quote-size: 16px;
    --text-quote-padding: 12px 20px;
    --text-quote-margin: 12px 0 16px;
    --text-quotes-size: 50px;
  }
</style>

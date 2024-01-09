<script>
  import { getDateFormats, getTimeFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import InsightText from '@cmp/InsightText.svelte'
  import Card from './Card.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight
  export let source

  $: ({ title, user, publishedAt, pulseText, text = pulseText } = insight)
  $: date = formatDate(publishedAt)

  function formatDate(date) {
    date = new Date(date)
    const { MM, D, YY } = getDateFormats(date)
    const { HH, mm } = getTimeFormats(date)
    return `${D}-${MM}-${YY}, ${HH}:${mm}`
  }
</script>

<Card {insight} class={className} let:href>
  <a {href} class="h4 row justify mrg-m mrg--b" sapper:prefetch>
    {title}
    <span class="c-waterloo caption">{date}</span>
  </a>

  <InsightText {text} class="$style.text body-2" />

  <div class="row v-center">
    <Profile
      {user}
      {source}
      feature="insight"
      class="$style.profile c-waterloo caption mrg-m mrg--t"
    />
    <Editorial {user} />
  </div>
</Card>

<style lang="scss">
  a {
    word-break: break-word;
  }

  span {
    align-self: flex-start;
    margin: 4px 0 0 16px;
    white-space: nowrap;
  }

  .profile {
    --img-size: 24px;
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

<script>
  import { getDateFormats, getTimeFormats } from 'san-webkit/lib/utils/dates'
  import Profile from 'san-webkit/lib/ui/Profile/index.svelte'
  import InsightText from './../../components/InsightText.svelte'
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

  <InsightText {text} class="text-1o8v37 body-2" />

  <div class="row v-center">
    <Profile
      {user}
      {source}
      feature="insight"
      class="profile-36TcUz c-waterloo caption mrg-m mrg--t"
    />
    <Editorial {user} />
  </div>
</Card>

<style lang="scss">a {
  word-break: break-all;
}

span {
  align-self: flex-start;
  margin: 4px 0 0 16px;
  white-space: nowrap;
}

:global(.profile-36TcUz) {
  --img-size: 24px;
}

:global(.text-1o8v37) {
  --text-h1-size: 18px;
  --text-h2-size: 16px;
  --text-ul-margin: 10px 0 25px;
  --text-figure-mrg-b: 12px;
  --text-quote-size: 16px;
  --text-quote-padding: 12px 20px;
  --text-quote-margin: 12px 0 16px;
  --text-quotes-size: 50px;
}</style>

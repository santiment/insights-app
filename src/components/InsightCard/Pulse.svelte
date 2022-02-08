<script>
  import { getDateFormats, getTimeFormats } from 'webkit/utils/dates'
  import Profile from 'webkit/ui/Profile/index.svelte'
  import Card from './Card.svelte'
  import Editorial from './Editorial.svelte'

  let className = ''
  export { className as class }
  export let insight

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
  <a {href} class="h4 row justify mrg-m mrg--b" sapper:prefetch
    >{title}
    <span class="c-waterloo caption">{date}</span>
  </a>

  <div class="text">
    {@html text}
  </div>

  <div class="row v-center">
    <Profile {user} class="$style.profile c-waterloo caption mrg-m mrg--t" />
    <Editorial {user} />
  </div>
</Card>

<style>
  a {
    word-break: break-all;
  }

  span {
    align-self: flex-start;
    margin: 4px 0 0 16px;
    white-space: nowrap;
  }

  .profile {
    --img-size: 24px;
  }
</style>

<script>
  import { onDestroy, onMount } from 'svelte'
  import { dateDifferenceInWords } from 'san-webkit/lib/utils/dates'

  export let insight
  export let isDraft = true

  let tick = 1
  let interval

  $: ({ updatedAt } = insight)
  $: date = new Date(updatedAt)
  $: time = tick && dateDifferenceInWords(date)

  onMount(() => {
    interval = window.setInterval(() => ++tick, 1000 * 60)
  })
  onDestroy(() => {
    clearInterval(interval)
  })
</script>

{isDraft ? 'Draft saved' : 'Insight updated'}
{time}

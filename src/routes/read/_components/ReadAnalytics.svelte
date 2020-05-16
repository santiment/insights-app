<script>
  import { onDestroy } from 'svelte'
  import { sendEvent } from '@/analytics'

  export let id

  let timer

  $: startReadingTimer(id)

  function startReadingTimer() {
    clearTimeout(timer)

    timer = setTimeout(() => {
      sendEvent(
        'reading',
        {
          category: 'user',
        },
        ['intercom'],
      )
    }, 1000 * 20)
  }

  onDestroy(() => {
    clearTimeout(timer)
  })
</script>

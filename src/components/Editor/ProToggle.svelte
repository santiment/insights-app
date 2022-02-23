<script>
  import Toggle from 'webkit/ui/Toggle.svelte'
  import { onDestroy, onMount } from 'svelte'

  const PRO_PASS = 'sanpro'

  export let insight
  export let update

  let isPro = insight.isPro
  let trackPass
  let isVisible = false

  function onClick() {
    isPro = !isPro
    insight.isPro = isPro
    update()
  }

  onMount(() => {
    const keys = []
    let isOverflowed = false

    trackPass = ({ key }) => {
      isOverflowed = keys.push(key) === PRO_PASS.length

      if (isOverflowed) {
        if (keys.join('') === PRO_PASS) {
          isVisible = true
          window.removeEventListener('keypress', trackPass)
        }

        keys.length = 0
      }
    }

    window.addEventListener('keypress', trackPass)
  })

  onDestroy(() => {
    if (trackPass) window.removeEventListener('keypress', trackPass)
  })
</script>

{#if isVisible}
  <button class="row v-center mrg-l mrg--t txt-m c-waterloo" on:click={onClick}>
    <Toggle isActive={isPro} class="mrg-s mrg--r {isPro ? '$style.active' : ''}" />
    PRO Insight
  </button>
{/if}

<style>
  .active {
    background: var(--orange) !important;
  }
</style>

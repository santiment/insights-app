<script>
  import { readable, writable } from 'svelte/store'
  import { onMount, setContext } from 'svelte'

  const stripeKey =
    process.env.BACKEND_URL === 'https://api-stage.santiment.net'
      ? 'pk_test_gy9lndGDPXEFslDp8mJ24C3p'
      : 'pk_live_t7lOPOW79IIVcxjPPK5QfESD'

  const stripe = writable()

  setContext('stripe', stripe)

  onMount(() => {
    if (window.Stripe) {
      stripe.set(window.Stripe(stripeKey))
    }
  })
</script>

<template lang="pug">
svelte:head
  +html('`<script src="https://js.stripe.com/v3"></script>`')

slot
</template>

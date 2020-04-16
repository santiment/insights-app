<script>
  import { onMount, onDestroy } from 'svelte'
  import { goto, stores } from '@sapper/app'
  import { parse } from 'query-string'
  import { client } from '@/apollo'
  import { VERIFY_EMAIL_MUTATION } from '@/gql/login'
  import { getPostponedPaymentInsight } from '@/logic/insights'

  let error, verifiedTimer
  const { session } = stores()

  function startSuccessTimer({ data: { emailLoginVerify } }) {
    const currentUser = emailLoginVerify.user
    session.update((ses) => ({ ...ses, currentUser }))

    verifiedTimer = setTimeout(() => {
      goto(
        currentUser.privacyPolicyAccepted
          ? getPostponedPaymentInsight() || '/'
          : '/gdpr',
      )
    }, 3000)
  }

  onMount(() => {
    client
      .mutate({
        mutation: VERIFY_EMAIL_MUTATION,
        variables: parse(window.location.search),
      })
      .then(startSuccessTimer)
  })

  onDestroy(() => {
    clearTimeout(verifiedTimer)
  })
</script>

<template lang="pug">
+if('error')
  | Can't verify this email
  +elseif('verifiedTimer')
  | Has been verified!
  | You will be redirected to the home page in 3 seconds
</template>

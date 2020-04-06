<script>
  import { createEventDispatcher } from 'svelte'
  import { loginEmail } from '@/logic/login'
  import { sendEvent } from '@/analytics'

  const dispatch = createEventDispatcher()

  let loading = false
  let email

  function onSubmit({ currentTarget }) {
    email = currentTarget.email.value
    loading = true

    loginEmail(email).then(onSuccess)
    sendEvent('sign_up', {
      method: 'email',
    })
  }

  function onSuccess({ data: { emailLogin } }) {
    loading = false
    if (emailLogin.success) {
      dispatch('success', {
        email,
      })
    }
  }
</script>

<template lang="pug">
include /ui/mixins

form(on:submit|preventDefault="{onSubmit}")
  +input(placeholder='Your email', name='email', type='email', autocomplete='off', autofocus, required)
  +button(variant="fill", accent='jungle-green', type='submit', fluid, class:loading) Continue

</template>

<style lang="scss">
  @import '@/mixins.scss';

  input {
    width: 100%;
    height: 40px;
  }

  button {
    --loading-dot-color: var(--white);
    height: 40px;
    margin: 24px 0 0;
    justify-content: center;
  }
</style>

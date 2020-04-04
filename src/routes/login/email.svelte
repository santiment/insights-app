<script>
  import { loginEmail } from '@/logic/login'
  import { sendEvent } from '@/analytics'

  let loading = false
  let success

  function onSubmit({ currentTarget }) {
    loginEmail(currentTarget.email.value).then(isSuccess)
    loading = true
    sendEvent('sign_up', {
      method: 'email',
    })
  }

  function isSuccess({ data: { emailLogin } }) {
    success = emailLogin.success
    loading = false
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper 
  +if('success')
    h2 Email Confirmation
    p We just sent you an email. Please check your inbox and click on the confirmation link.
    .options Back to 
      a(href='/login') log in options

    +else()
      h2 Welcome Back
      p Log in to your Sanbase account to access additional features of our platform
      form(on:submit|preventDefault="{onSubmit}")
        +input(placeholder='Your email', name='email', type='email', autocomplete='off', required)
        +button(variant="fill", accent='jungle-green', type='submit', fluid, class:loading) Continue

      .options Or choose 
        a(href='/login') another log in option

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .wrapper {
    max-width: 320px;
    margin: 0 auto;
  }

  h2 {
    @include text('h3');
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    margin: 10px 0 34px;
  }

  input {
    height: 40px;
  }

  button {
    --loading-dot-color: var(--white);
    height: 40px;
    margin: 24px 0 0;
    justify-content: center;
  }

  .options {
    @include text('body-2');
    color: var(--waterloo);
    margin: 24px 0 0;
  }

  a {
    color: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  input {
    width: 100%;
  }
</style>

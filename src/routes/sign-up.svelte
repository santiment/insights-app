<script context="module">
  export async function preload(_, session) {
    await session.loadingUser
    if (session.currentUser) {
      return this.redirect(302, '')
    }
  }
</script>

<script>
  import { loginEmail } from '@/logic/login'
  import { sendEvent } from '@/analytics'

  let loading = false
  let success
  let email

  function onSubmit({ currentTarget }) {
    email = currentTarget.email.value
    loginEmail(email).then(isSuccess)
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
 +panel(variant='box').content
    +if('success')
      .success
        h2 Email Confirmation
        p We just sent an email to 
          span {email}
          |. Please check your inbox and click on the confirmation link.
        .link Back to 
          a(href='/login') log in options

      +else
        .left
          h2 Sign up now to start your free trial
          p Get 14 days free of Sanbase Pro!
          form(on:submit|preventDefault="{onSubmit}")
            +input(placeholder='Your email', name='email', type='email', autocomplete='off', required)
            +button(variant="fill", accent='jungle-green', type='submit', fluid, class:loading) Continue

          .link Have an account? 
            a(href='/login') Log in

        .right
          .reason Full historical and present data for 30+ on-chain, social & development metrics
          .reason Exclusive End-of-Month market & network reports from the Santiment team
          .reason Complete access to our Spreadsheets plugin and our internal market templates

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .wrapper {
    display: flex;
    align-items: center;
    height: 100%;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      background: url('/login-bg.svg') no-repeat 50%;
    }
  }

  .content {
    margin: 0 auto;
    padding: 55px 110px;
    display: flex;
    min-width: 608px;
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
    width: 100%;
  }

  button {
    --loading-dot-color: var(--white);
    height: 40px;
    margin: 24px 0;
    justify-content: center;
  }

  .link {
    @include text('body-2');
    color: var(--waterloo);
  }

  a {
    color: var(--jungle-green);
    &:hover {
      color: var(--jungle-green-hover);
    }
  }

  .left {
    max-width: 285px;
    text-align: center;
  }

  .right {
    margin-left: 110px;
    padding: 0 0 0 96px;
    border-left: 1px solid var(--porcelain);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .reason {
    @include text('body-2');
    background: url('/sign-up-reason.svg') no-repeat 0 5px;
    padding: 0 0 0 40px;
    margin: 0 0 30px;
    max-width: 306px;

    &:last-child {
      margin: 0;
    }
  }

  .success {
    max-width: 320px;
    text-align: center;
  }
</style>

<script>
  import Confirmation from './_components/Confirmation.svelte'
  import EmailForm from './_components/EmailForm.svelte'

  let email

  function onSuccess({ detail }) {
    email = detail.email
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper 
  +if('email')
    Confirmation({email})

    +else()
      h2 Welcome Back
      p Log in to your Sanbase account to access additional features of our platform
      EmailForm(on:success='{onSuccess}')

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
</style>

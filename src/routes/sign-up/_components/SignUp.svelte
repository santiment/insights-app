<script>
  import EmailForm from '../../login/_components/EmailForm.svelte'
</script>

<template lang="pug">
include /ui/mixins

h2 Sign up now to start your free trial
p Get 14 days free of Sanbase Pro!
EmailForm(on:success)

.link Have an account? 
  a(href='/login') Log in
</template>

<style lang="scss">
  @import '@/mixins.scss';

  h2 {
    @include text('h3');
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
    margin: 10px 0 34px;
  }

  .link {
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

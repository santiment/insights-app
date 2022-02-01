<script>
  import EmailForm from './EmailForm.svelte'
</script>

<template lang="pug">
include /ui/mixins

h2 Welcome Back
p Log in to your Sanbase account to access additional features of our platform
EmailForm(on:success)

.link Or choose 
  a(href='/login') another log in option

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
    color: var(--green);

    &:hover {
      color: var(--green-hover);
    }
  }
</style>

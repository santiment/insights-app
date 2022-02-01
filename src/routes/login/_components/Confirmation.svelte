<script>
  export let email
</script>

<template lang="pug">
include /ui/mixins

h2 Email Confirmation

p We just sent an email to 
  span {email}
  |. Please check your inbox and click on the confirmation link.

.link Back to 
  a(href='/login') log in options
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

  span {
    color: var(--mirage);
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

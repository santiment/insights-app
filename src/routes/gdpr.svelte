<script>
  import Checkbox from '@/components/Checkbox'
  let active = false
</script>

<template lang="pug">
include /ui/mixins

+panel.wrapper()
  h2 Last step to get your SANBase experience.
  p Please, accept our updated Privacy Policy by May, 2018 to continue using SANBase
  div
    Checkbox(bind:active)
    |  I have read and accept the 
    a(href='https://app.santiment.net/privacy-policy') Santiment Privacy Policy
  .btn
    +button(variant='fill', accent='jungle-green', class:disabled='{!active}') I Agree
</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    padding: 16px;
    max-width: 500px;
  }

  h2 {
    @include text('h4', 'm');
  }

  p {
    margin: 12px 0;
  }

  a {
    color: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
      text-decoration: underline;
    }
  }

  .btn {
    text-align: right;
  }
</style>

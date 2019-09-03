<script>
  import Checkbox from '@/components/Checkbox'
  import { setGDPR } from '@/logic/gdpr'

  let active = false
  let loading = false

  function onClick() {
    loading = true
    setGDPR(true)
  }
</script>

<template lang="pug">
include /ui/mixins

.page
  +panel.wrapper()
    h2 Last step to get your SANBase experience.
    p Please, accept our updated Privacy Policy by May, 2018 to continue using SANBase
    div
      Checkbox(bind:active)
      |  I have read and accept the 
      a(href='https://app.santiment.net/privacy-policy') Santiment Privacy Policy
    .btn
      +button(variant='fill', accent='jungle-green', class:disabled='{!active}', class:loading, on:click='{onClick}') I Agree
</template>

<style lang="scss">
  @import '@/mixins';

  .page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

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

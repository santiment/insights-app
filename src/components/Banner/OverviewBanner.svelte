<script>
  export let banner
  let klass = ''
  export { klass as class }

  export let loading = false
  export let onSubmit
  export let isSuccess
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class='{klass}', bind:this="{banner}")
  h2 Never miss a post!
  h3 Get Santiment Crypto Market Updates direct to your inbox

  form(on:submit|preventDefault='{onSubmit}')
    +input(name='email', type='email', placeholder='Enter your email', required)
    +button(type='submit', class:loading) Subscribe

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .wrapper {
    background: var(--jungle-green);
    color: var(--white);
    text-align: center;
    padding: 32px;
    position: relative;
    z-index: 0;
    border-radius: 4px;

    &::after {
      z-index: -1;
      opacity: 0.2;
      content: '';
      background: url('/overview_banner.svg') no-repeat 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  h2 {
    @include text('h4', 'm');
  }

  h3 {
    @include text('body-2');
    margin: 8px 0 23px;
  }

  form {
    margin: 0 auto;
    display: flex;
    max-width: 400px;
  }

  input {
    flex: 1;
    color: var(--mirage);
    margin-right: 16px;
  }

  button {
    background: $mirage;
    color: $white;
    --loading-dot-color: #{$white};
  }

  @include responsive('phone', 'phone-xs') {
    form {
      flex-direction: column;
    }

    input {
      margin: 0 0 8px;
    }

    button {
      justify-content: center;
    }
  }
</style>

<script>
  import { stores } from '@sapper/app'
  import { detectMetamask } from '@/utils/web3'
  import { handleEthLogin } from '@/logic/login'
  import { sendEvent } from '@/analytics'

  const hasMetamask = detectMetamask()

  let loading = false

  function login(ethLogin) {
    loading = true
    sendEvent('sign_up', {
      method: 'metamask',
    })
    handleEthLogin()
      .then((ethLogin) => {
        const { session } = stores()
        session.update((ses) => ({ ...ses, currentUser: ethLogin.user }))
      })
      .catch((err) => {
        console.warn(err)
        loading = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

+if('hasMetamask')
  +button.btn(on:click='{login}', fluid, class:loading) Log in with Metamask

  +else()
    +panel.wrapper
      h4 We can't detect the Metamask!
      p We can auth you with a Metamask account. It's secure and easy.
      .bottom
        a(target='_blank', rel='noopener noreferrer', href='https://metamask.io/#how-it-works') How Metamask works?

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .btn {
    --loading-dot-color: var(--white);
    background: url('/metamask-inverse.svg') no-repeat 10px 50%, #f6851b;
    fill: #fff;
    color: #fff;
    height: 40px;
    justify-content: center;
  }

  .wrapper {
    padding: 16px 20px 16px 64px;
    background: url('/metamask.svg') no-repeat 22px 19px,
      var(--texas-rose-light);
    border: none;
    text-align: left;
  }

  .bottom {
    margin: 6px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h4 {
    @include text('body-2');
  }

  p {
    color: $fiord;
    margin: 4px 0 8px;
  }

  a {
    color: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
    }
  }
</style>

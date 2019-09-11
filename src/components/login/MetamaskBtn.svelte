<script>
  import { stores } from '@sapper/app'
  import { detectMetamask } from '@/utils/web3'
  import { handleEthLogin } from '@/logic/login'

  let klass = ''
  export { klass as class }

  const hasMetamask = detectMetamask()

  let loading = false
  function login(ethLogin) {
    loading = true
    handleEthLogin().then(ethLogin => {
      const { session } = stores()
      session.update(ses => ({ ...ses, currentUser: ethLogin.user }))
    })
  }
</script>

<template lang="pug">
include /ui/mixins

+if('hasMetamask')
  +button.btn(on:click='{login}', fluid, class:loading)
    img(src='metamask-inverse.svg', alt='Metamask Icon')
    |Metamask

  +else()
    +panel.wrapper
      h4.title We can't detect the Metamask!
      p.text We can auth you with a Metamask account. It's secure and easy.
      .bottom
        a(target='_blank', rel='noopener noreferrer', href='https://metamask.io/#how-it-works') How Metamask works?
        a(target='_blank', rel='noopener noreferrer', href='https://metamask.io/')
          img(src='metamask-download.png', alt='Download Metamask', width='128')

</template>

<style lang="scss">
  @import '@/mixins';

  .btn {
    --loading-dot-color: var(--white);
    background: #f6851b;
    fill: #fff;
    color: #fff;
    height: 40px;
  }

  .wrapper {
    padding: 15px;
    background: var(--texas-rose-light);
    border-color: var(--texas-rose-hover);
  }

  .bottom {
    margin: 6px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    margin: -2px 2px 0 -8px;
  }

  .title {
    @include text('body-1');
    margin: 0 0 6px;
  }
</style>

<script>
  import { stores } from '@sapper/app'
  import { detectMetamask } from '@/utils/web3'
  import { handleEthLogin } from '@/utils/login'

  let klass
  export { klass as class }

  const hasMetamask = detectMetamask()

  function login(ethLogin) {
    handleEthLogin().then(ethLogin => {
      const { session } = stores()
      session.update(ses => ({ ...ses, currentUser: ethLogin.user }))
    })
  }
</script>

<template lang="pug">
include /ui/mixins

+if('hasMetamask')
  +button.btn(on:click='{login}', fluid) Metamask

  +else()
    +panel.wrapper
      h4.title We can't detect the Metamask!
      p.text We can auth you with a Metamask account. It's secure and easy.
      .bottom
        a(target='_blank', rel='noopener noreferrer', href='https://metamask.io/#how-it-works') How Metamask works?
        a(target='_blank', rel='noopener noreferrer', href='https://metamask.io/') Link

</template>

<style>
  .btn {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

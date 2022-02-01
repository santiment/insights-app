<script>
  import OverviewBanner from './OverviewBanner.svelte'
  import ViewportObserver from '@/components/ViewportObserver'
  import { cookie } from '@/stores/cookie'
  import { loginEmail } from '@/logic/login'
  import { checkIsMobile } from '@/utils/responsive'
  import { sendEvent } from '@/analytics'

  let banner
  let isVisibleInSession = true
  let isShown = false
  let loading = false
  let isNotMobile = !checkIsMobile()

  const options = {
    rootMargin: '150px 0px -50px',
  }

  function closeBanner() {
    isVisibleInSession = false
  }
  function hideBanner() {
    isShown = false
  }
  function showBanner() {
    isShown = true
  }

  function onSubmit({ currentTarget }) {
    loginEmail(currentTarget.email.value, true).then(() => (loading = false))
    loading = true
    sendEvent('sign_up', {
      method: `${currentTarget.dataset.label} banner`,
    })
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver({options}, on:intersect='{hideBanner}', on:leaving='{showBanner}', top)
  OverviewBanner.banner-overview({loading}, {onSubmit})

+if('isNotMobile && $cookie && isShown && isVisibleInSession')
  +panel.banner
    +button(aria-label='Close', on:click='{closeBanner}').close
      +icon('close')
    h2.title Want more crypto insights?
    p.desc Subscribe to Santiment’s weekly market Digest!
    form(on:submit|preventDefault='{onSubmit}', data-label='Sticky')
      .row
        +input(name='email', type='email', placeholder='Your email', aria-label='Your email', required)
        +icon('email').icon-email
      +button.submit(variant='fill', accent='jungle-green', type='submit', fluid, class:loading) Subscribe
</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .banner {
    width: 270px;
    box-shadow: 0px 4px 12px rgba(24, 27, 43, 0.1);
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 0;
    border-radius: 4px;
    z-index: 10;
    padding: 24px;
    text-align: left;
    background: var(--athens);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      opacity: 0.3;
      background: url('/overview_banner.svg') no-repeat 100%;
      background-size: 240%;
      z-index: -1;
    }
  }

  .title {
    font-weight: bold;
  }

  .desc {
    @include text('caption', 'm');
    color: var(--waterloo);
    margin: 8px 0 20px;
  }

  .row {
    position: relative;
  }

  .icon-email {
    @include size(12px, 10px);
    position: absolute;
    top: 10px;
    left: 18px;
    fill: var(--casper);
  }

  input {
    width: 100%;
    padding-left: 42px;
  }

  .submit {
    --loading-dot-color: var(--white);
    margin: 12px 0 0;
    justify-content: center;
  }

  :global(.banner-overview) {
    margin-top: 30px;
  }

  svg {
    @include size(12px);
  }

  .close {
    fill: var(--waterloo);
    background: transparent;
    position: absolute;
    top: 8px;
    right: 8px;

    &:hover {
      fill: var(--black);
    }
  }
</style>

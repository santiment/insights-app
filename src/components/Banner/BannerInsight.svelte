<script>
  import OverviewBanner from './OverviewBanner.svelte'
  import ViewportObserver from '@/components/ViewportObserver'
  import { WEEKLY_SUBSCRIPTION_FLAG, loginEmail } from '@/logic/login'
  import { isMobile } from '@/utils/responsive'
  import { sendEvent } from '@/analytics'

  let banner
  let isVisibleInSession = true
  let isShown = false
  let loading = false
  let isNotMobile = !isMobile()

  const options = {
    rootMargin: '1000px 0px -50px',
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
    loginEmail(currentTarget.email.value).then(onSuccess)
    loading = true
    sendEvent('sign_up', {
      method: `${currentTarget.dataset.label} banner`,
    })
  }

  function onSuccess({ data: { emailLogin } }) {
    loading = false
    window.localStorage.setItem(WEEKLY_SUBSCRIPTION_FLAG, '+')
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver({options}, on:intersect='{hideBanner}', on:leaving='{showBanner}', top)
  OverviewBanner.banner-overview({loading}, {onSubmit})

+if('isNotMobile && isShown && isVisibleInSession')
  +panel.banner
    +button(aria-label='Close', on:click='{closeBanner}').close
      +icon('close')
    .content
      .text
        h2.title Want more crypto insights?
        p.desc Read daily analysis of top emerging words/stories
      form.form(on:submit|preventDefault='{onSubmit}', data-label='Sticky')
        +input(name='email', type='email', placeholder='Enter your email', aria-label='Your email', required)
        +button.submit(variant='fill', accent='jungle-green', type='submit', class:loading) Get started
</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .banner {
    max-width: $desktop-container-width;
    height: 90px;
    box-shadow: 0px 10px 20px rgba(24, 27, 43, 0.1);
    position: fixed;
    bottom: 8px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 10;
    padding: 3px 150px 3px 151px;
    display: flex;
    background: var(--white) url('/newsletter.svg') no-repeat 18px 50%;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .content,
  .text,
  .form {
    flex: 1;
  }

  .title {
    @include text('body-1');
  }

  .desc {
    color: var(--waterloo);
    @include text('body-2');
  }

  .form {
    display: flex;
    position: relative;
  }

  input {
    flex: 1;
    height: 40px;
    padding: 9px 136px 10px 12px;
  }

  .submit {
    position: absolute;
    top: 4px;
    right: 4px;
    --loading-dot-color: var(--white);
  }

  :global(.banner-overview) {
    margin-top: 30px;
  }

  svg {
    @include size(12px);
  }

  .close {
    fill: var(--casper);
    position: absolute;
    top: 8px;
    right: 8px;

    &:hover {
      fill: var(--mirage);
    }
  }
</style>

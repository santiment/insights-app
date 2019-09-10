<script>
  import { onMount } from 'svelte'

  const COOKIE_POLICY_ACCEPTED = 'COOKIE_POLICY_ACCEPTED'

  let accepted = true

  function onClick() {
    acceptCookiePolicy()
    accepted = true
  }

  function acceptCookiePolicy() {
    localStorage.setItem(COOKIE_POLICY_ACCEPTED, true)
  }

  onMount(() => {
    accepted = localStorage.getItem(COOKIE_POLICY_ACCEPTED)
  })
</script>

<template lang="pug">
include /ui/mixins

+if('!accepted')
  +panel.wrapper(variant='context')
    h2 We are using cookies
    .bottom
      p This website uses the following types of cookies: strictly necessary, functional, performance and marketing cookies. By using this website, you accept our 
        a(href='https://santiment.net/terms-conditions/', rel='noopener noreferrer', target='_blank') Terms & Conditions
      +button(variant='fill', accent='jungle-green', on:click='{onClick}') Accept

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .wrapper {
    max-width: $desktop-container-width;
    position: fixed;
    z-index: 9999;
    bottom: 8px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 23px 24px 21px;
    border-radius: 10px;
    background-image: url('/cookie.svg');
    background-repeat: no-repeat;

    @include responsive('desktop', 'laptop', 'tablet') {
      padding-left: 108px;
      background-position: 20px 50%;
    }
  }

  h2 {
    @include text('body-1');
    margin: 0 0 4px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
  }

  p {
    @include text('body-2');
    color: var(--waterloo);
  }

  button {
    min-width: 100px;
    justify-content: center;
  }

  a {
    color: var(--jungle-green);
  }

  @include responsive('phone', 'phone-xs') {
    .wrapper {
      padding-top: 104px;
      background-position: 50% 24px;
      text-align: center;
      bottom: 0;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .bottom {
      flex-direction: column;
    }

    button {
      width: 100%;
      margin-top: 20px;
    }
  }
</style>

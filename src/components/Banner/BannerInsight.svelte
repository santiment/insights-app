<script>
  import OverviewBanner from './OverviewBanner.svelte'
  import ViewportObserver from '@/components/ViewportObserver'
  import { loginEmail } from '@/logic/login'

  export let insightHeight

  let banner
  let isShown = false
  let loading = false
  let success

  const options = {
    rootMargin: '-50px',
  }

  function toggleVisibility() {
    isShown = !isShown
  }

  function onSubmit({ currentTarget }) {
    loginEmail(currentTarget.email.value).then(isSuccess)

    loading = true
  }

  function isSuccess({ data: { emailLogin } }) {
    success = emailLogin.success
    loading = false
  }
</script>

<template lang="pug">
include /ui/mixins

ViewportObserver({options}, on:intersect='{toggleVisibility}', on:leaving='{toggleVisibility}', top)
  OverviewBanner

+if('isShown')
  +panel.banner
    img(src='sticky_banner_img.png', alt='Banner')
    .content
      .text
        h2.title Want more crypto insights?
        p.desc Read daily analysis of top emerging words/stories
      form.form(on:submit|preventDefault='{onSubmit}')
        +input(name='email', type='email', placeholder='Enter your email')
        +button.submit(variant='fill', accent='jungle-green', type='submit', class:loading) Get started
</template>

<style lang="scss">
  @import '@/mixins';

  .banner {
    height: 90px;
    box-shadow: 0px 10px 20px rgba(24, 27, 43, 0.1);
    position: fixed;
    bottom: 8px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    z-index: 10;
    max-width: 85%;
    padding: 3px 18px;
    display: flex;
  }

  img {
    width: 93px;
    margin-right: 19px;
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
  }
</style>

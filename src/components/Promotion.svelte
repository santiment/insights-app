<script>
  import { stores } from '@sapper/app'
  import { onMount, onDestroy } from 'svelte'
  import gql from 'graphql-tag'
  import { client } from '@/apollo'

  const HIDDEN_WIDGET_URLS = 'HIDDEN_WIDGET_URLS'

  let promotion

  export const ACTIVE_WIDGETS_QUERY = gql`
    query {
      activeWidgets {
        title
        description
        videoLink
        imageLink
        createdAt
      }
    }
  `
  function wasWidgetHidden(url) {
    const urls = localStorage.getItem(HIDDEN_WIDGET_URLS)
    return !!urls && urls.split(',').includes(url)
  }

  onMount(() => {
    client
      .query({ query: ACTIVE_WIDGETS_QUERY })
      .then(({ data: { activeWidgets } }) => {
        if (activeWidgets && activeWidgets.length) {
          const widget = activeWidgets[0]
          console.log(widget, wasWidgetHidden(widget.videoLink))
        }
      })
  })
</script>

<template lang="pug">
include /ui/mixins

//+if('promotion')
section
  a(target='_blank', rel='noopener noreferrer', href='/')
  div
    h3 THIS WEEK IN CRYPTO
    h4 Making a cautiously bullish case for BTC
    +icon('close').close
</template>

<style lang="scss">
  @import '@/variables';
  @import '@/mixins';

  section {
    position: relative;
    padding: 18px 0;
    display: flex;
    align-items: center;
    margin: -25px 0 32px;

    &::before {
      content: '';
      position: absolute;
      background: var(--athens);
      width: 100vw;
      height: 100%;
      top: 0;
      left: calc(#{$desktop-container-width/ 2} - 50vw);
      z-index: -1;
    }
  }

  h3 {
    @include text('body-2', 'm');
    margin: 0 0 4px;
    color: var(--dodger-blue);
  }

  h4 {
    @include text('body-1', 'm');
    margin: 0;
    max-width: 332px;
  }

  a {
    height: 104px;
    width: 230px;
    position: relative;
    border-radius: 4px;
    background: url('https://production-sanbase-images.s3.amazonaws.com/uploads/3b6413fca638bf9a561302bd0cef0ac9e033b6e49cb1f2affc93743da9d98f6b_1591116477664_image%203%20(1).png')
      no-repeat 50% / cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 40px;

    &::before,
    &::after {
      content: '';
      position: absolute;
      transition: transform ease-in-out 0.3s;
    }

    &::before {
      @include size(40px);
      background: #{$rhino}cc;
      border-radius: 50%;
    }

    &::after {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 9px solid $bali-hai;
    }

    &:hover {
      &::before,
      &::after {
        transform: scale(1.2);
      }
    }
  }

  .close {
    @include size(12px);
    position: absolute;
    right: 0;
    top: 20px;
    fill: var(--waterloo);
    cursor: pointer;

    &:hover {
      fill: var(--rhino);
    }
  }
</style>

<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import { onMount, onDestroy } from 'svelte'
  import { ACTIVE_WIDGETS_QUERY } from '@/gql/promotions'
  import {
    prepareThumbnail,
    wasPromotionHidden,
    hidePromotion,
  } from '@/utils/promotions'

  let promotion

  function onClose() {
    hidePromotion(promotion.videoLink)
    promotion = null
  }

  onMount(() => {
    client
      .query({ query: ACTIVE_WIDGETS_QUERY })
      .then(({ data: { activeWidgets } }) => {
        if (activeWidgets && activeWidgets.length) {
          const newPromotion = activeWidgets[0]

          if (wasPromotionHidden(newPromotion.videoLink)) return

          newPromotion.imageLink = prepareThumbnail(newPromotion)
          promotion = newPromotion
        }
      })
  })
</script>

<template lang="pug">
include /ui/mixins

+if('promotion')
  section
    a(target='_blank', rel='noopener noreferrer', href='{promotion.videoLink}', style='background-image:url("{promotion.imageLink}")')
    div
      h3 {promotion.title}
      h4 {promotion.description}
      +icon('close').close(on:click='{onClose}')
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
    background: no-repeat 50% / cover;
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

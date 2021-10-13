<script>
  import Modal from '@/components/Modal'

  export let text

  let enlargedImgSrc

  let accessibleText
  $: accessibleText = text.replace(/<img/g, '<img alt=""')

  function enlargeImg({ target }) {
    if (target.tagName !== 'IMG') return
    enlargedImgSrc = target.src
  }

  function closeModal() {
    enlargedImgSrc = undefined
  }
</script>

<template lang="pug">
include /ui/mixins

div.text(on:click='{enlargeImg}') {@html accessibleText}

Modal(bind:open='{enlargedImgSrc}')
  .enlarger(slot='content')
    +icon('close').enlarger__close(on:click='{closeModal}')
    img.enlarger__img(src='{enlargedImgSrc}', alt='Modal pic')

</template>

<style lang="scss">
  @import '@/mixins';

  .text {
    margin: 25px 0 0;
    word-break: break-word;
    @include text('body-1');

    :global(.md-block-header-one) {
      font-size: 28px;
      line-height: 40px;
      font-weight: 500;
    }

    :global(.md-block-header-two) {
      font-size: 22px;
      line-height: 30px;
      font-weight: 500;
    }

    :global(.md-block-iframe iframe) {
      border: 0;
      width: 100%;
      height: 300px;
    }

    :global(.md-block-image),
    :global(.md-block-iframe) {
      text-align: center;
      margin: 16px 0 32px;
    }

    :global(.md-block-image-caption) {
      font-size: 14px;
      line-height: 20px;
      font-style: italic;
      color: var(--waterloo);
    }

    :global(img) {
      cursor: pointer;
      max-height: 500px;
      max-width: 100%;
    }

    :global(.md-inline-bold) {
      font-weight: bold;
    }

    :global(.md-inline-link) {
      text-decoration: none !important;
      cursor: pointer;
      color: var(--jungle-green);
      position: relative;
      transition: color 0.4s ease, background-size 0.4s ease;
      background-position: 100% 100%;
      background-repeat: no-repeat;
      background-size: 0% 1px;
      background-image: linear-gradient(
        var(--jungle-green-light-3),
        var(--jungle-green-light-3)
      );

      &:hover,
      &:focus,
      &:active {
        color: var(--jungle-green-hover);
        background-size: 100% 1px;
        background-position: 0% 100%;
      }
    }

    :global(.md-inline-underline) {
      text-decoration: none;
      background-position: 100% 100%;
      background-repeat: no-repeat;
      background-size: 100% 1px;
      background-image: linear-gradient(var(--rhino), var(--rhino));
    }

    :global(.md-inline-underline .md-inline-link) {
      background-size: 100% 1px;
      background-image: linear-gradient(
        var(--jungle-green-light-3),
        var(--jungle-green-light-3)
      );
    }

    :global(.md-block-unordered-list-item) {
      padding-left: 35px;
      margin: 10px 0 40px;

      :global(li) {
        list-style: disc outside;
      }
    }

    :global(.md-block-blockquote) {
      @include text('h4');
      padding: 23px 32px;
      background: var(--athens);
      border-radius: 4px;
      color: var(--mirage);
      position: relative;
      margin: 20px 0 30px;

      &::before {
        content: '“';
        position: absolute;
        display: block;
        left: 28px;
        top: 1px;
        font-size: 74px;
        font-family: sans-serif;
        font-weight: bold;
        color: var(--casper);
      }
    }

    :global(.md-block-blockquote + .md-block-blockquote::before) {
      display: none;
    }
  }

  .enlarger {
    width: 84%;
    margin: 5% auto 0;
    position: relative;

    &__close {
      @include size(12px);
      position: absolute;
      top: 0;
      right: -20px;
      fill: #fff;
      cursor: pointer;

      &:hover {
        fill: var(--jungle-green);
      }
    }

    &__img {
      width: 100%;
    }
  }
</style>

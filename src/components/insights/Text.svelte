<script>
  import Modal from '@/components/Modal'

  export let text

  let enlargedImgSrc

  const accessibleText = text.replace(/<img/g, '<img alt=""')

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

    :global(.md-block-image) {
      text-align: center;
      margin: 16px 0 32px;
    }

    :global(img) {
      max-width: 70%;
      cursor: pointer;
    }

    :global(.md-inline-bold) {
      font-weight: bold;
    }

    :global(.md-inline-link) {
      text-decoration: underline;
      color: var(--jungle-green);
    }

    :global(.md-block-image-caption) {
      font-size: 14px;
      line-height: 20px;
      font-style: italic;
      color: var(--waterloo);
    }

    :global(.md-inline-underline) {
      text-decoration: underline;
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

<script>
  import copy from 'copy-to-clipboard'
  import Dialog from '@/ui/dialog/index'

  let klass = ''
  export { klass as class }
  export let link
  export let title = 'Sanbase'
  export let text = 'Hey! Look what I have found at the app.santiment.net!'

  let open
  let btnLabel = 'Copy link'

  let encodedLink
  let encodedTitle
  let encodedText
  $: {
    encodedLink = encodeURIComponent(link)
    encodedTitle = encodeURIComponent(title)
    encodedText = encodeURIComponent(text)
  }

  function copyLink() {
    copy(link)
    notify()
  }

  function notify() {
    btnLabel = 'Copied!'
    setTimeout(() => (btnLabel = 'Copy link'), 1000)
  }
</script>

<template lang="pug">
include /ui/mixins

-
  var socials = [
    {
      label: 'Twitter',
      icon: 'twitter',
      href: 'https://twitter.com/intent/tweet?url={encodedLink}&via=santimentfeed&text={encodedText}'
    },
    {
      label: 'Facebook',
      icon: 'facebook',
      href: 'https://www.facebook.com/sharer/sharer.php?u={encodedLink}'
    },
    {
      label: 'LinkedIn',
      icon: 'linked-in',
      href: 'https://www.linkedin.com/shareArticle?mini=true&title={encodedTitle}&summary={encodedText}&source=santiment.net&url={encodedLink}'
    },
    {
      label: 'Telegram',
      icon: 'telegram',
      href: 'https://telegram.me/share/url?text={encodedText}&url={encodedLink}'
    },
    {
      label: 'Reddit',
      icon: 'reddit',
      href: 'https://reddit.com/submit?title={encodedTitle}&url={encodedLink}'
    },
  ]

Dialog(bind:open, title='Share insight')
  +button.trigger(slot='trigger', class='{klass}', aria-label='Share')
    +icon('share-arrow').icon-share
  +dialogScrollContent.content(slot='content')
    .link
      +input(value='{link}', readonly)
      +button.copy(on:click='{copyLink}') {btnLabel}
    .btns
      each social in socials
        +button.btn(href=social.href, target='_blank', rel='noopened noreferrer', fluid, border)
          +icon(social.icon)(class='icon')
          |Share on #{social.label}

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .trigger {
    height: auto;
    padding: 0;
    fill: var(--waterloo);
    border-radius: 100px;
    padding: 8px 12px;
    height: 32px;
    display: flex;
    align-items: center;
    border: 1px solid var(--porcelain);
    transition: color, fill, box-shadow 0.15s ease-in-out;

    @include text('body-3', 'm');

    &:hover {
      fill: var(--rhino);
      color: var(--rhino);
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
    }
  }

  .icon-share {
    @include size(16px, 14px);
  }

  .content {
    min-width: 700px;

    @include responsive('phone', 'phone-xs') {
      min-width: initial;
    }
  }

  .link {
    display: flex;
    border: 1px solid var(--porcelain);
    border-radius: 4px;
    margin: 0 0 20px;
  }

  input {
    border: none;
    color: var(--dodger-blue);
    flex: 1;
  }

  .copy {
    border-radius: 0;
    border-left: 1px solid var(--porcelain);
    background: none;
    position: relative;

    &::before {
      position: absolute;
      z-index: 2;
      content: '';
      height: 100%;
      top: 0;
      left: -31px;
      width: 30px;
      background: linear-gradient(
        270deg,
        var(--white),
        var(--white) 30.94%,
        hsla(0, 0%, 100%, 0)
      );
    }
  }

  .btn {
    margin: 0 0 8px;
    &:last-child {
      margin: 0;
    }
  }

  .icon {
    @include size(16px, 14px);
    margin-right: 7px;
    fill: var(--casper) !important;
  }
</style>

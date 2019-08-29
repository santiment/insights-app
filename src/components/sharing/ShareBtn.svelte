<script>
  import copy from 'copy-to-clipboard'
  import Dialog from '@/ui/dialog/index'

  let klass = ''
  export { klass as class }
  export let shareLink = '123'

  let open
  let btnLabel = 'Copy link'

  function copyLink() {
    copy(shareLink)
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
      icon: 'twitter'
    },
    {
      label: 'Facebook',
      icon: 'facebook'
    },
    {
      label: 'LinkedIn',
      icon: 'linked-in'
    },
    {
      label: 'Telegram',
      icon: 'telegram'
    },
    {
      label: 'Reddit',
      icon: 'reddit'
    },
  ]

Dialog(bind:open, title='Share insight')
  +button.trigger(slot='trigger', class='{klass}')
    +icon('share').icon-share
  +dialogScrollContent.content(slot='content')
    .link
      +input(value='{shareLink}', readonly)
      +button.copy(on:click='{copyLink}') {btnLabel}
    .btns
      each social in socials
        +button.btn(href='', target='_blank', rel='noopened noreferrer', fluid, border)
          +icon(social.icon)(class='icon')
          |Share on #{social.label}

</template>

<style lang="scss">
  @import '@/mixins.scss';

  .trigger {
    height: auto;
    padding: 0;
  }

  .icon-share {
    @include size(16px);
  }

  .content {
    min-width: 700px;
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

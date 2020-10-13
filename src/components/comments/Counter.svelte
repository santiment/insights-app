<script>
  import { stores } from '@sapper/app'

  let klass = ''
  export { klass as class }
  export let commentsCount,
    link = false,
    isSSRLink = false

  const { page } = stores()

  $: pathname = link || $page.path

  $: href =
    pathname +
    (isSSRLink ? '?_wc=1' : process.browser ? window.location.search : '')
</script>

<template lang="pug">
include /ui/mixins

a.comments(href='{href}#comments', class='{klass}')
  +icon('comment').comments__icon
  | {commentsCount}

</template>

<style lang="scss">
  @import '@/mixins';
  .comments {
    fill: var(--waterloo);
    color: var(--waterloo);
    border-radius: 100px;
    padding: 8px 12px;
    height: 32px;
    display: flex;
    align-items: center;
    border: 1px solid var(--porcelain);
    transition: color, fill, border-color 0.15s ease-in-out;

    @include text('body-3', 'm');

    &:hover {
      fill: var(--rhino);
      color: var(--rhino);
      border-color: var(--mystic);
    }

    &__icon {
      @include size(16px, 14px);
      margin-right: 8px;
      margin-bottom: -1px;
    }
  }
</style>

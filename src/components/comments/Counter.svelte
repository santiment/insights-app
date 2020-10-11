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
    transition: color, fill, box-shadow 0.15s ease-in-out;

    @include text('body-3', 'm');

    &:hover {
      fill: var(--rhino);
      color: var(--rhino);
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
    }

    &__icon {
      @include size(16px, 14px);
      margin-right: 7px;
    }
  }
</style>

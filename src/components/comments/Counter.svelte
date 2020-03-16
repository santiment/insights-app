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
    fill: var(--casper);
    color: var(--waterloo);

    &:hover {
      fill: var(--jungle-green);
    }

    &__icon {
      @include size(16px, 15px);
      margin-right: 4px;
    }
  }
</style>

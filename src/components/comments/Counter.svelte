<script>
  let klass = ''
  export { klass as class }

  export let link = process.browser ? window.location.pathname : undefined
  export let commentsCount
</script>

<template lang="pug">
include /ui/mixins

a.comments(href='{link}?_wc=1#comments', class='{klass}')
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

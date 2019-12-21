<script>
  let klass = ''
  export { klass as class }
  export let link, commentsCount
</script>

<template lang="pug">
include /ui/mixins

a.comments(href='{link}#comments', class='{klass}')
  +icon('comment').comments__icon
  | {commentsCount}

</template>

<style lang="scss">
  @import '@/mixins';
  .comments {
    fill: var(--waterloo);

    &:hover {
      fill: var(--jungle-green);
    }

    &__icon {
      @include size(16px, 15px);
      margin-right: 4px;
    }
  }
</style>

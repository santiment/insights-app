<script>
  import FollowBtn from '@/components/FollowBtn'

  export let author = ''
  export let targetId
  let klass = ''
  export { klass as class }
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class='{klass}')
  h2 Never miss a post from {author}!
  h3 Get 'early bird' alerts for new insights from this author
  FollowBtn({targetId}).follow-banner-btn {' '+author}

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .wrapper {
    background: var(--mirage);
    color: var(--white);
    text-align: center;
    padding: 32px;
    position: relative;
    z-index: 0;
    border-radius: 4px;
    margin-top: 16px;

    &::after {
      z-index: -1;
      opacity: 0.08;
      content: '';
      background: url('/overview_banner.svg') no-repeat 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }

  h2 {
    @include text('h4', 'm');
  }

  h3 {
    @include text('body-2');
    margin: 8px 0 23px;
  }

  :global(.follow-banner-btn) {
    font-size: inherit !important;
    line-height: inherit !important;
    min-width: 100px;
    height: 32px !important;
    justify-content: center;
    background: $jungle-green !important;
    color: $white !important;
    margin: 0 !important;
  }
</style>

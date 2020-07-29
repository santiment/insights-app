<script>
  import MultilineText from '@/components/MultilineText'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'

  export let insight

  let { id, user, title, isPaywallRequired } = insight

  const seoLink = getSEOLinkFromIdAndTitle(id, title)
  const link = `/read/${seoLink}`
</script>

<template lang="pug">
include /ui/mixins

a.title(href="{link}")
  MultilineText(maxLines='{3}') {title}

.bottom
  a.user(href='/user/{user.id}') {user.username}
  +if('isPaywallRequired')
    +icon('crown').paywalled

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .user {
    color: var(--waterloo);
    max-width: calc(70% - 40px);
    flex: 1;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .title {
    @include text('body-2');
    margin: 0 0 6px;
    display: block;
    word-break: break-word;

    &:hover {
      color: var(--jungle-green);
    }
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .paywalled {
    @include size(12px, 9px);
    fill: var(--texas-rose);
    margin-left: auto;
  }
</style>

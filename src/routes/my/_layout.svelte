<script>
  import { checkIsMobile } from '@/utils/responsive'
  import WriteInsight from './_WriteInsight.svelte'

  export let segment

  const isMobile = checkIsMobile()
</script>

<template lang="pug">
include /ui/mixins

.top
  h1 My Insights
  +if('!isMobile')
    WriteInsight.My__new

+tabs.tabs(class:tabs_mobile='{isMobile}')
  +tab(href="/my/drafts", class:active="{segment === 'drafts'}", prefetch) Drafts
  +tab(href="/my", class:active="{!segment}", prefetch) Published

slot
</template>

<style lang="scss">
  @import '@/mixins';

  .top {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }

  h1 {
    @include text('h4', 'm');
  }

  .plus {
    @include size(15px);
    margin-right: 8px;
  }

  :global(.My__new) {
    margin-left: auto;
  }

  .tabs {
    margin-bottom: 40px;

    &_mobile {
      width: auto;
      margin: 0 -16px 20px;
      padding: 0 16px;
    }
  }
</style>

<script>
  import { stores } from '@sapper/app'
  import { checkIsMobile } from '@/utils/responsive'

  const isMobile = checkIsMobile()
  const { page } = stores()
</script>

<template lang="pug">
include /ui/mixins

mixin newInsight()
  +button(href='/new', variant='fill', accent='jungle-green')&attributes(attributes)
    +icon('plus-round').plus
    |Write insight

.top
  h1 My Insights
  +if('!isMobile')
    +newInsight(rel='prefetch').btn

+tabs.tabs(class:tabs_mobile='{isMobile}')
  +tab(href="/my/drafts", class:active="{$page.path === '/my/drafts'}", prefetch) Drafts
  +tab(href="/my", class:active="{$page.path === '/my'}", prefetch) Published
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

  .btn {
    margin-left: auto;

    &_mobile {
      justify-content: center;
      margin-bottom: 20px;
    }
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

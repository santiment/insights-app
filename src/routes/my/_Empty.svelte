<script>
  import InsightCardDesktop from '@/components/insights/InsightCardWithMarketcap'
  import InsightCardMobile from '@/components/insights/InsightCard'
  import WriteInsight from './_WriteInsight.svelte'
  import { getMobileComponent } from '@/utils/responsive'
  import { updateDateSorter } from '@/utils/insights'
</script>

<template lang="pug">
include /ui/mixins

.empty
  .text Use Insights to journal your ideas, perform research, or share with others. Record your trades or research notes, and learn more about your investing style, track your progress over time. Build your reputation and educate yourself at the same time! 
  WriteInsight Write first insight

</template>

<style lang="scss">
  .empty {
    $height: 186px;
    background: url('/empty-page.svg') no-repeat 50% 0;
    width: 480px;
    height: $height;
    padding-top: $height;
    margin: auto;
    text-align: center;
    max-width: 100%;

    :global(.night-mode) & {
      background-image: url('/empty-page_dark.svg');
    }
  }

  .text {
    margin: 20px 0;
  }
</style>

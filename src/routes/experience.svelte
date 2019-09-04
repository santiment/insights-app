<template lang="pug">
include /ui/mixins

svelte:head
  title Experience Santiment Insights
  meta(property='og:title', content='Experience Santiment Insights')
  meta(property='og:description', content='By having a Sanbase account, you can see more data and insights about crypto projects')

.page
  +panel.wrapper(variant='box')
    h2 Create an account to get your Sanbase experience.
    p By having a Sanbase account, you can see more data and insights about crypto projects. You can vote and comment on all you favorite insights and more.
    .btn
      +button(href='/login', variant='fill', accent='jungle-green') Get started
</template>

<style lang="scss">
  @import '@/mixins';

  .page {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrapper {
    padding: 16px;
    max-width: 500px;
  }

  h2 {
    @include text('h4', 'm');
  }

  p {
    margin: 12px 0;
  }

  .btn {
    text-align: right;
  }
</style>

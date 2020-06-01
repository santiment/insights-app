<script>
  import NavCard from './Card.svelte'

  const products = [
    {
      title: 'Sanbase',
      desc: 'Behavior analysis & monitoring platform for 1000+ crypto assets',
      goto: 'Go to Sanbase',
      link: 'https://app.santiment.net',
      logo: '/san-logo.svg',
    },
    {
      title: 'Sansheets',
      desc: 'Google Spreadsheets plugin for importing Santiment data',
      goto: 'Go to Sansheets',
      link: 'https://sheets.santiment.net',
      logo: '/sheets-logo.svg',
    },
    {
      title: 'SanAPI',
      desc: 'The most comprehensive crypto API on the market',
      goto: 'Go to SanAPI',
      link: 'https://neuro.santiment.net',
      logo: '/neuro-logo.svg',
    },
  ]
</script>

<template lang="pug">
include /ui/mixins

h3 Santiment products
  a.link(href='https://santiment.net/') Go to Santiment.net
    +icon('pointer-right').icon-pointer

.products
  +each('products as product')
    NavCard({...product}, animated)

</template>

<style lang="scss">
  @import '@/mixins';

  h3 {
    display: flex;
    justify-content: space-between;
    color: var(--waterloo);
    margin-bottom: 16px;
  }

  .products {
    display: flex;
  }

  .link {
    color: var(--jungle-green);
    fill: var(--jungle-green);

    &:hover {
      color: var(--jungle-green-hover);
      fill: var(--jungle-green-hover);
    }
  }

  .icon-pointer {
    @include size(8px, 6px);
    margin-left: 5px;
  }
</style>

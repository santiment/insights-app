<template lang="pug">
include /ui/mixins

-
  const products = [
    {
      title: 'Sanbase',
      desc: 'Behavior analysis & monitoring platform for 1000+ crypto assets',
      goto: 'Go to Sanbase',
      link: 'https://app.santiment.net',
      logo:'/san-logo.svg'
    },
    {
      title: 'Sheets',
      desc: 'Google Spreadsheets plugin for importing Santiment data',
      goto: 'Go to Sheets',
      link: 'https://sheets.santiment.net',
      logo:'/sheets-logo.svg'
    },
    {
      title: 'API',
      desc: 'The most comprehsive crypto API on the market',
      goto: 'Go to API',
      link: 'https://neuro.santiment.net',
      logo:'/neuro-logo.svg'
    },
  ]

h3 Santiment products
  a.link(href='https://santiment.net/') Go to Santiment.net
    +icon('pointer-right').icon-pointer

.products
  each product in products
    a.product(href=product.link)
      img(src=product.logo, alt='Product logo')
      h2= product.title
      h4= product.desc
      span.link.product__link= product.goto
        +icon('pointer-right').icon-pointer

</template>

<style lang="scss">
  @import '@/mixins';

  img {
    position: absolute;
    top: 9px;
    left: 9px;
  }

  h3 {
    display: flex;
    justify-content: space-between;
    color: var(--waterloo);
    margin-bottom: 16px;
  }

  h2 {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 5px;
  }

  h4 {
    color: var(--waterloo);
  }

  .icon-pointer {
    @include size(8px, 6px);
    margin-left: 5px;
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

  .product {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px 24px 12px 60px;
    border-right: 4px;

    &__link {
      margin-top: 10px;
      visibility: hidden;
    }

    &:hover {
      background: var(--athens);
      color: var(--mirage);

      .link {
        visibility: visible;
      }
    }
  }
</style>

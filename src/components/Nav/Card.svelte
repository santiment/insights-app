<script>
  export let classes = {},
    link,
    logo,
    title,
    desc,
    animated
</script>

<template lang="pug">
include /ui/mixins

a.product(href='{link}', class!='{classes.wrapper || ""}')
  img.fading-up(src='{logo}', alt='{title} logo', class:fading-up='{animated}')
  h2(class:fading-up='{animated}') {title}
  h4(class:fading-up='{animated}') {desc}
  span.link.product__link Go to {title}
    +icon('pointer-right').icon-pointer

</template>

<style lang="scss">
  @import '@/mixins';

  img {
    position: absolute;
    top: 9px;
    left: 9px;
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

  .link {
    color: var(--green);
    fill: var(--green);

    &:hover {
      color: var(--green-hover);
      fill: var(--green-hover);
    }
  }

  .icon-pointer {
    @include size(8px, 6px);
    margin-left: 5px;
  }

  .product {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 16px 24px 12px 60px;
    border-radius: 4px;
    transition: background 0.2s;

    &__link {
      margin-top: 10px;
      opacity: 0;
      transform: translate3d(0px, -10px, 0px);
      transition: opacity 0.12s ease-out, transform 0.22s;
    }

    &:hover {
      background: var(--athens);
      color: var(--mirage);

      .fading-up {
        transform: translate3d(0px, 0, 0px);
      }

      .product__link {
        opacity: 1;
        transform: translate3d(0px, 0px, 0px);
      }
    }
  }

  .fading-up {
    transform: translate3d(0px, 12px, 0px);
    transition: transform 0.24s;
  }
</style>

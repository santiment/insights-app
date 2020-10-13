<template lang="pug">
include /ui/mixins

+icon('rocket')
</template>

<style lang="scss">
  @import '@/mixins';

  @mixin shift($x: 0, $y: 0) {
    transform: translate($x/2, $y/2);
  }

  svg {
    @include size(20px, 22px);
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;

    &:hover {
      animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
      @include shift(0, 0);
    }
  }

  @keyframes shake {
    8% {
      @include shift(0, -2%);
    }
    16% {
      @include shift(-1%, -1%);
    }
    24% {
      @include shift(2%, 0);
    }
    32% {
      @include shift(-4%, 1%);
    }
    40% {
      @include shift(4%, -1%);
    }
    48% {
      @include shift(-4%, 0);
    }
    56% {
      @include shift(4%, 0);
    }
    64% {
      @include shift(-4%, 0);
    }
    72% {
      @include shift(2%, -2%);
    }
    80% {
      @include shift(0, -3%);
    }
    88%,
    100% {
      @include shift(0, 0);
    }
  }
</style>

<script>
  export let title, seoLink
</script>

<template lang="pug">
include /ui/mixins

.wrapper 
  a(href='/') Insights
  +icon('arrow-down')
  a.link(href='/read/{seoLink}') {title}

</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  .wrapper {
    margin: 10px 0 25px;
    color: var(--casper);
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  svg {
    @include size(8px, 5px);
    fill: var(--casper);
    transform: rotate(-90deg);
    margin: 0 13px;
  }

  .link {
    color: $fiord;
    max-width: 200px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    display: inline-block;
    white-space: nowrap;
  }

  :global(.night-mode) .link {
    color: $waterloo;
  }

  a:hover {
    color: var(--jungle-green) !important;
  }
</style>

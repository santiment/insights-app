<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'

  export let title
  export let link
</script>

<div class="row v-center">
  <a href="/" class="c-casper">Insights</a>
  <Svg id="arrow-right" w="4.5" h="8" class="arrow-1kerOP mrg-m mrg--l mrg--r" />
  <a href="/read/{link}" class="title">{title}</a>
</div>

<style>
  div {
    white-space: nowrap;
    z-index: 2;
    position: relative;
  }

  .title {
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :global(.arrow-1kerOP) {
    min-width: 4.5px;
  }
</style>

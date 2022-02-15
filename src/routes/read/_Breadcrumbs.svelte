<script>
  import Svg from 'webkit/ui/Svg/svelte'

  export let title
  export let link
</script>

<div class="row v-center">
  <a href="/" class="c-casper">Insights</a>
  <Svg id="arrow-right" w="4.5" h="8" class="$style.arrow mrg-m mrg--l mrg--r" />
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

  .arrow {
    min-width: 4.5px;
  }
</style>

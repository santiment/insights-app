<script>
  import Svg from 'webkit/ui/Svg/svelte'

  let className = 'mrg-m mrg--l'
  export { className as class }
  export let count = 0
  export let href
</script>

<a href="{href}?_wc=1#comments" class="btn-2 {className}" sapper:prefetch>
  <Svg id="comment" w="16" h="14" class="mrg-xs mrg--r" />
  {count}
</a>

<style>
  .btn-2 {
    padding: 5px 12px;
    border-radius: 20px;
    fill: var(--waterloo);
    white-space: nowrap;
  }
</style>

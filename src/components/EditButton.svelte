<script>
  import Svg from 'webkit/ui/Svg/svelte'

  let className = 'mrg-m mrg--l'
  export { className as class }
  export let insight

  $: ({ id } = insight)
</script>

<a href="/edit/{id}" class="btn-2 btn-rounded {className}" sapper:prefetch>
  <Svg id="pencil" w="16" />
</a>

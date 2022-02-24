<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { showShareDialog } from './ShareDialog.svelte'

  let className = 'mrg-m mrg--l'
  export { className as class }
</script>

<div class="btn-2 btn-rounded {className}" on:click={() => showShareDialog()}>
  <Svg id="share" w="16" h="14" />
</div>

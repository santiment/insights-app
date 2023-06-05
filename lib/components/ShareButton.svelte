<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import { showShareDialog as showMobileShareDialog } from 'san-webkit/lib/ui/Share/Dialog.svelte'
  import { showShareDialog } from './ShareDialog.svelte'
  import { session } from './../stores/session'

  let className = 'mrg-m mrg--l'
  export { className as class }
  export let source
  export let insight

  $: isMobile = $session.isMobile
  $: ({ title } = insight)
</script>

<div
  class="btn-2 btn-rounded {className}"
  on:click={() =>
    isMobile
      ? showMobileShareDialog({
          shareLink: window.location.href,
          shareText: title,
        })
      : showShareDialog({ source })}
>
  <Svg id="share-dots" w="14" h="16" />
</div>

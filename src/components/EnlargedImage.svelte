<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import EnlargedImage from './EnlargedImage.svelte'

  export const enlargeImage = (event) =>
    event?.target?.src && dialogs.show(EnlargedImage, { src: event.target.src, single: true })
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'

  export let src

  let closeDialog
</script>

<Dialog {...$$props} class="$style.dialog" animated={false} noTitle bind:closeDialog>
  <img {src} alt="Enlarged" />

  <button class="btn" on:click={closeDialog}><Svg id="close" w="16" /></button>
</Dialog>

<style>
  .dialog {
    background: none;
    border: none;
    max-width: calc(100% - 100px) !important;
    max-height: unset !important;
  }

  img {
    max-height: 95vh;
  }

  button {
    position: absolute;
    top: -3px;
    right: -32px;
    --fill: #fff;
    --fill-hover: var(--green);
  }
</style>

<script context="module">
  import { dialogs } from 'san-webkit/lib/ui/Dialog'
  import EnlargedImage from './EnlargedImage.svelte'

  export const enlargeImage = (event) =>
    event &&
    event.target &&
    event.target.src &&
    dialogs.show(EnlargedImage, { src: event.target.src, single: true })
</script>

<script>
  import Dialog from 'san-webkit/lib/ui/Dialog'
  import Svg from 'san-webkit/lib/ui/Svg/svelte'

  export let src

  let closeDialog
</script>

<Dialog {...$$props} class="dialog-2moPKG" animated={false} noTitle bind:closeDialog>
  <img {src} alt="Enlarged" />

  <button class="btn" on:click={closeDialog}><Svg id="close" w="16" /></button>
</Dialog>

<style lang="scss">:global(.dialog-2moPKG) {
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

:global(body:not(.desktop)) :global(.dialog-2moPKG) {
  align-self: center;
}</style>

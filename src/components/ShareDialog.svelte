<script context="module">
  import { dialogs } from 'webkit/ui/Dialog'
  import { copy } from 'webkit/utils'
  import ShareDialog from './ShareDialog.svelte'

  export const showShareDialog = () => dialogs.show(ShareDialog)
</script>

<script>
  import Dialog from 'webkit/ui/Dialog'
  import Svg from 'webkit/ui/Svg/svelte'

  export let title = 'Sanbase'
  export let text = 'Hey! Look what I have found at the app.santiment.net!'

  let closeDialog
  let node
  let label = 'Copy link'

  const encodedLink = encodeURIComponent(window.location.href)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text)

  const SOCIALS = [
    {
      label: 'Twitter',
      icon: 'twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedLink}&via=santimentfeed&text=${encodedText}`,
    },
    {
      label: 'Facebook',
      icon: 'facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
    },
    {
      label: 'LinkedIn',
      icon: 'linked-in',
      href: `https://www.linkedin.com/shareArticle?mini=true&title=${encodedTitle}&summary=${encodedText}&source=santiment.net&url=${encodedLink}`,
    },
    {
      label: 'Telegram',
      icon: 'telegram',
      href: `https://telegram.me/share/url?text=${encodedText}&url=${encodedLink}`,
    },
    {
      label: 'Reddit',
      icon: 'reddit',
      href: `https://reddit.com/submit?title=${encodedTitle}&url=${encodedLink}`,
    },
  ]

  function onCopy() {
    label = 'Copied!'
    copy(window.location.href, () => (label = 'Copy link'), 1000, node)
  }
</script>

<Dialog {...$$props} title="Share insight" bind:closeDialog>
  <div class="dialog">
    <div class="link row border mrg-l mrg--b">
      <input readonly type="text" value={window.location.href} bind:this={node} />
      <div class="btn" on:click={onCopy}>{label}</div>
    </div>

    <div class="column">
      {#each SOCIALS as { label, icon, href }}
        <a {href} class="btn-2 btn--s mrg-s mrg--t" target="_blank" rel="noopened noreferrer">
          <Svg id={icon} w="16" class="mrg-s mrg--r" />
          Share on {label}
        </a>
      {/each}
    </div>
  </div>
</Dialog>

<style>
  .dialog {
    padding: 12px 20px;
  }

  .btn-2 {
    fill: var(--casper);
  }

  input {
    padding: 5px 10px;
    border-radius: 4px;
    color: var(--blue);
    min-width: 330px;
  }

  .btn {
    padding: 5px 12px;
    border-left: 1px solid var(--porcelain);
    border-radius: 0;
    --color-hover: var(--green);
    min-width: 83px;
    text-align: center;
  }
</style>

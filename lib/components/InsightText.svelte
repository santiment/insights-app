<script>
  import { enlargeImage } from './EnlargedImage.svelte'

  let className = ''
  export { className as class }
  export let text = ''

  let node

  $: sanitized = sanitize(text)
  $: node && hookImageEnlarger()

  function hookImageEnlarger() {
    const images = node.querySelectorAll('img')
    Array.from(images).forEach((img) => {
      img.onclick = enlargeImage
    })
  }

  function sanitize(text) {
    return text
      .replace(/<\s*script/g, '&lt;script')
      .replace(/="?javascript:/g, '')
      .replace(
        /(onafterprint|onbeforeprint|onbeforeunload|onerror|onhashchange|onload|onoffline|ononline|onpageshow|onresize|onunload|onblur|onchange|oncontextmenu|onfocus|oninput|oninvalid|onreset|onsearch|onselect|onsubmit|onkeydown|onkeypress|onkeyup|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onwheel|onwheel|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onscroll|oncopy|oncut|onpaste|ontoggle)=/g,
        '_=',
      )
  }
</script>

<div class={className} bind:this={node}>
  {@html sanitized}
</div>

<style lang="scss">@charset "UTF-8";
div {
  word-break: break-word;
}
div :global(h1) {
  font-size: var(--text-h1-size, 28px);
  line-height: 40px;
  font-weight: 500;
}
div :global(h2) {
  font-size: var(--text-h2-size, 22px);
  line-height: 30px;
  font-weight: 500;
}
div :global(iframe) {
  border: 0;
  width: 100%;
  height: 300px;
}
div :global(.md-block-iframe) {
  max-width: 100%;
  margin-top: 10px;
}
div :global(a) {
  color: var(--green);
}
div :global(a:hover) {
  color: var(--green-hover);
}
div :global(u) :global(a) {
  background: linear-gradient(var(--green-light-3), var(--green-light-3)) bottom/100% 1px no-repeat;
}
div :global(strong) {
  font-weight: bold;
}
div :global(img) {
  max-width: 100%;
}
div :global(figure) {
  text-align: center;
  max-width: 600px;
  margin: 16px auto var(--text-figure-mrg-b, 32px);
}
div :global(figcaption) {
  font-size: 14px;
  line-height: 20px;
  font-style: italic;
  color: var(--waterloo);
}
div :global(ul),
div :global(ol) {
  padding-left: 35px;
  margin: var(--text-ul-margin, 10px 0 40px);
}
div :global(ul) :global(li) {
  list-style: disc outside;
}
div :global(ol) :global(li) {
  list-style: decimal outside;
}
div :global(u) {
  text-decoration: none;
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 100% 1px;
  background-image: linear-gradient(var(--black), var(--black));
}
div :global(blockquote) {
  font-size: var(--text-quote-size, 24px);
  line-height: 32px;
  padding: var(--text-quote-padding, 23px 32px);
  background: var(--athens);
  border-radius: 4px;
  color: var(--black);
  position: relative;
  margin: var(--text-quote-margin, 20px 0 30px);
}
div :global(blockquote::before) {
  content: "“";
  position: absolute;
  display: block;
  left: 28px;
  top: 1px;
  font-size: var(--text-quotes-size, 74px);
  font-family: sans-serif;
  font-weight: bold;
  color: var(--casper);
}
div :global(blockquote) + :global(blockquote::before) {
  display: none;
}

:global(body:not(.desktop)) div :global(h1) {
  --text-h1-size: 24px;
  line-height: 32px;
  font-weight: 500;
}
:global(body:not(.desktop)) div :global(h2) {
  font-size: var(--text-h2-size, 22px);
  line-height: 30px;
  font-weight: 500;
}
:global(body:not(.desktop)) div :global(iframe) {
  height: 320px;
}
:global(body:not(.desktop)) div :global(.md-block-iframe) {
  margin-top: 16px;
}</style>

<script>
  import { enlargeImage } from './EnlargedImage.svelte'

  let className = ''
  export { className as class }
  export let text = ''

  let node

  $: sanitized = sanitize(text)
  $: node && hookImageEnlarger()
  $: node && hookLinksClick()

  function hookImageEnlarger() {
    const images = node.querySelectorAll('img')
    Array.from(images).forEach((img) => {
      img.onclick = enlargeImage
    })
  }

  function hookLinksClick() {
    const links = node.querySelectorAll('a[href^="?emsg=1"]')
    const embeds = node.querySelectorAll('iframe[src^="https://embed.santiment.net/chart"]')

    for (const node of links) {
      node.removeAttribute('target')
      node.setAttribute('href', window.location.pathname + node.getAttribute('href'))

      node.addEventListener('click', onLinkClick)
    }

    function onLinkClick(e) {
      e.preventDefault()
      const { searchParams } = new URL(e.currentTarget.href)

      if (!searchParams.has('emsg')) return

      const { type = 'chart_asset' } = searchParams
      let data

      switch (type) {
        case 'chart_asset': {
          data = { slug: searchParams.get('slug'), ticker: searchParams.get('ticker') }
          if (!data.slug || !data.ticker) return
          break
        }
      }

      if (!data) return

      for (const iframeNode of embeds) {
        iframeNode.contentWindow.postMessage({ type, data }, '*')
      }
    }
  }

  function sanitize(text) {
    return text
      .replace(/<\s*script/g, '&lt;script')
      .replace(/="?javascript:/g, '')
      .replace(
        /(onafterprint|onbeforeprint|onbeforeunload|onerror|onhashchange|onload|onoffline|ononline|onpageshow|onresize|onunload|onblur|onchange|oncontextmenu|onfocus|oninput|oninvalid|onreset|onsearch|onselect|onsubmit|onkeydown|onkeypress|onkeyup|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onwheel|onwheel|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|onscroll|oncopy|oncut|onpaste|ontoggle)=/g,
        '_=',
      )
      .replace(/([^>])(<br ?\/?>)(<\/p)/g, '$1$2$2$3')
  }
</script>

<div class={className} bind:this={node}>
  {@html sanitized}
</div>

<style lang="scss">
  div {
    word-break: break-word;
    :global {
      h1 {
        font-size: var(--text-h1-size, 28px);
        line-height: 40px;
        font-weight: 500;
        margin: 40px 0 4px;
      }
      h2 {
        font-size: var(--text-h2-size, 22px);
        line-height: 30px;
        font-weight: 500;
      }
      iframe {
        border: 0;
        width: 100%;
        height: 300px;
      }
      .md-block-iframe {
        max-width: 100%;
        margin-top: 10px;
      }

      a {
        color: var(--green);
      }
      a:hover {
        color: var(--green-hover);
      }
      u a {
        background: linear-gradient(var(--green-light-3), var(--green-light-3)) bottom / 100% 1px
          no-repeat;
      }

      strong {
        font-weight: bold;
      }

      img {
        max-width: 100%;
      }

      figure {
        text-align: center;
        max-width: 600px;
        margin: 16px auto var(--text-figure-mrg-b, 32px);
      }

      figcaption {
        font-size: 14px;
        line-height: 20px;
        font-style: italic;
        color: var(--waterloo);
      }

      ul,
      ol {
        padding-left: 35px;
        margin: var(--text-ul-margin, 10px 0 40px);
      }

      ul li {
        list-style: disc outside;
      }

      ol li {
        list-style: decimal outside;
      }

      u {
        text-decoration: none;
        background-position: 100% 100%;
        background-repeat: no-repeat;
        background-size: 100% 1px;
        background-image: linear-gradient(var(--black), var(--black));
      }

      blockquote {
        font-size: var(--text-quote-size, 24px);
        line-height: 32px;
        padding: var(--text-quote-padding, 23px 32px);
        background: var(--athens);
        border-radius: 4px;
        color: var(--black);
        position: relative;
        margin: var(--text-quote-margin, 20px 0 30px);

        &::before {
          content: '“';
          position: absolute;
          display: block;
          left: 28px;
          top: 1px;
          font-size: var(--text-quotes-size, 74px);
          font-family: sans-serif;
          font-weight: bold;
          color: var(--casper);
        }
      }

      blockquote + blockquote::before {
        display: none;
      }
    }
  }

  :global(body:not(.desktop)) {
    div {
      :global {
        h1 {
          --text-h1-size: 24px;
          line-height: 32px;
          font-weight: 500;
        }

        h2 {
          font-size: var(--text-h2-size, 22px);
          line-height: 30px;
          font-weight: 500;
        }

        iframe {
          height: 320px;
        }

        .md-block-iframe {
          margin-top: 16px;
        }
      }
    }
  }
</style>

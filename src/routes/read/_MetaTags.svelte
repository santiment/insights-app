<script>
  export let insight

  $: ({ title, text } = insight)
  $: metaDescriptionText = getRawText(text).slice(0, 140)
  $: previewImgLink = grabFirstImageLink(text)

  function getRawText(text) {
    if (!text) return ''
    const res = text.split(/<.*?>/g).join('')
    return res[0] === ' ' ? res.slice(1) : res
  }

  const IMG_SRC_ATTR_START = 'src="'
  const IMG_SRC_ATTR_START_LENGTH = IMG_SRC_ATTR_START.length
  function grabFirstImageLink(text) {
    const start = text.indexOf(IMG_SRC_ATTR_START)

    if (start === -1) return ''

    const linkStart = start + IMG_SRC_ATTR_START_LENGTH
    return text.slice(linkStart, text.indexOf('"', linkStart))
  }
</script>

<svelte:head>
  <title>{title} - Santiment Community Insights</title>
  <meta name="description" content={metaDescriptionText} />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{title} - Santiment Community Insights" />
  <meta property="og:description" content={metaDescriptionText} />

  {#if previewImgLink}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={previewImgLink} />
    <meta name="og:image" content={previewImgLink} />
  {/if}
</svelte:head>

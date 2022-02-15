<script>
  export let insight

  $: ({ title } = insight)

  let metaDescriptionText = ''
  let previewImgLink = ''
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

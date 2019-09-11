<script>
  export let maxLines

  let anc

  $: if (anc) {
    const container = anc.parentNode
    const initialText = container.textContent

    const initialStyle = getComputedStyle(container).whiteSpace
    const initialHeight = container.clientHeight

    container.style.whiteSpace = 'nowrap'
    const oneLineHeight = container.clientHeight
    container.style.whiteSpace = initialStyle

    const lines = initialHeight / oneLineHeight

    if (lines > maxLines) {
      console.log({
        container,
        initialText,
        initialHeight,
        oneLineHeight,
        maxLines,
      })

      const suggestedBreakIndex =
        initialText.length - parseInt(initialText.length / maxLines, 10)
      container.textContent = initialText.slice(0, suggestedBreakIndex) + '...'
    }
  }
</script>

<template lang="pug">
p(style='display:none', bind:this='{anc}')

slot
</template>

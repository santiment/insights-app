<script>
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { onDestroy, onMount } from 'svelte'
  import InsightText from '@cmp/InsightText.svelte'

  export let insight

  let node

  onMount(() => {
    import('./ReactText').then((data) => render(data.default))
  })
  onDestroy(() => {
    // if (reactMount) {
    // ReactDOM.unmountComponentAtNode(reactMount)
    // }
  })

  function render(Component) {
    if (!node) return
    console.log(Component)
    const { text } = insight

    ReactDOM.render(React.createElement(Component, { text }), node.firstChild)
  }
</script>

<div class="text" bind:this={node}>
  <InsightText class="body-1" />
</div>

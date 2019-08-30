<script>
  import { onMount } from 'svelte'
  import React from 'react'
  import ReactDOM from 'react-dom'

  let reactMount
  let Component

  $: if (Component) {
    ReactDOM.render(React.createElement(Component, {
    }), reactMount)
  }

  onMount(() => {
    import('@/react/InsightEditor/InsightEditor').then(({ default: loaded }) => {
      Component = loaded
    })
  })
</script>

<template lang="pug">
#react-mount-node(bind:this="{reactMount}")
</template>

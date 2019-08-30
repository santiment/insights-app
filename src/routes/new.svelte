<script>
  import { onMount } from 'svelte'
  import React from 'react'
  import ReactDOM from 'react-dom'

  let reactMount
  let Component

  const updateDraft = console.log
  const publishDraft = console.log

  $: if (Component) {
    ReactDOM.render(
      React.createElement(Component, {
        updateDraft,
        publishDraft,
      }),
      reactMount,
    )
  }

  onMount(() => {
    import('@/react/InsightEditor/InsightEditor').then(
      ({ default: loaded }) => {
        Component = loaded
      },
    )
  })
</script>

<template lang="pug">
#react-mount-node(bind:this="{reactMount}")
</template>

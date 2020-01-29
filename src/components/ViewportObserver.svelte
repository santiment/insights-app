<script>
  import { onMount, onDestroy } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  export let observer = undefined,
    options = undefined,
    observeWhile = true,
    top = false,
    id = ''

  let anchor

  const dispatch = createEventDispatcher()

  function initiateObserver() {
    observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        dispatch('intersect')
      } else {
        dispatch('leaving')
      }
    }, options)
  }

  $: if (anchor && options && observeWhile) {
    initiateObserver()

    observer.observe(anchor)
  }

  $: if (!observeWhile && observer) {
    observer.unobserve(anchor)
    observer = undefined
  }

  onDestroy(() => {
    if (observer) {
      observer.unobserve(anchor)
      observer = undefined
    }
  })
</script>

<template lang="pug">
+if('top')
  p(bind:this='{anchor}', {id})
  slot

  +else()
    slot
    p(bind:this='{anchor}', {id})
</template>

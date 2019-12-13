<script>
  export let load
  let Component

  let { load: _, ...props } = $$props

  $: {
    const { load: _, ...rest } = $$props
    props = rest
  }

  load().then(({ default: loaded }) => (Component = loaded))
</script>

<template lang="pug">
+if('Component')
  Component({...props})
</template>

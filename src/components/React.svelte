<script>
  import { onMount } from "svelte";
  import ReactDOM from "react-dom";

  let reactMount;
  let Component;

  $: if (Component) {
    ReactDOM.render(Component, reactMount);
  }

  onMount(() => {
    import("@/react/index").then(({ default: loaded }) => {
      Component = loaded;
    });
  });
</script>

<template lang="pug">

#react-mount-node(bind:this="{reactMount}")

</template>

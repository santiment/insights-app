<script>
  export let load;
  let Component;

  const { load: _, ...props } = $$props;

  load().then(({ default: loaded }) => (Component = loaded));
</script>

<template lang="pug">
+if('Component')
  Component({...props})
</template>

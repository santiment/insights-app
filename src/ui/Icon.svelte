<script>
  let className = ''
  export let id

  export { className as class }
  export let w,
    h = w

  const style = w && `width:${w}px;height:${h}px`
</script>

<svg on:click {style} class="{className}"><use href="/{id}.svg#{id}" /></svg>

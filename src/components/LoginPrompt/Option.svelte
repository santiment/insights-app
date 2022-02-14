<script>
  let className = 'mrg-s mrg--b'
  export { className as class }
  export let href
  export let prefetch = false
  export let icon
</script>

<a class="btn-2 btn--l row hv-center {className}" {href} sapper:prefetch={prefetch}>
  {#if icon}<img src="/webkit/icons/{icon}.svg" alt={icon} class="mrg-s mrg--r" />{/if}
  <slot />
</a>

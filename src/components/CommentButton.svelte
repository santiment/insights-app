<script>
  import Button from 'webkit/ui/Comments/Button.svelte'

  let className = 'mrg-m mrg--l'
  export { className as class }
  export let count = 0
  export let href
</script>

<Button href="{href}?_wc=1#comments" class={className} {count} />

<script>
  import { trackShowComments } from 'san-webkit/lib/analytics/events/interaction'
  import Button from 'san-webkit/lib/ui/Comments/Button.svelte'

  let className = 'mrg-m mrg--l'
  export { className as class }
  export let id
  export let count = 0
  export let href
  export let source
</script>

<Button
  href="{href}?_wc=1#comments"
  class={className}
  {count}
  on:click={() => {
    trackShowComments({ id, source, feature: 'insight' })
  }}
/>

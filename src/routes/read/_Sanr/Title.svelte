<script>
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'

  let className
  export { className as class }
  export let signal
  export let margin = 'mrg-a'

  $: ({ symbol, status, logoUrl } = signal)
  $: opened = status === 'open'
</script>

<h4 class="row v-center body-2 {className}">
  <ProjectIcon class="mrg-s mrg--r" {logoUrl} />
  {symbol}

  <div class="status {margin} mrg--l" class:opened />
</h4>

<style>
  .status {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--casper);
    border: 4px solid var(--border, #e5e8f0);
  }
  :global(.night-mode) .status {
    --border: var(--waterloo);
  }

  .opened {
    background: var(--lima);
    border: 4px solid var(--lima-light-1);
  }
</style>

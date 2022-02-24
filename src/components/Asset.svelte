<script>
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'

  let className = ''
  export { className as class }
  export let asset

  $: ({ slug, ticker, name } = asset)
</script>

<div class="border {className}">
  <a href="https://app.santiment.net/projects/{slug}" class="top row v-center body-2">
    <ProjectIcon {slug} size={22} class="mrg-s mrg--r" />
    <div>
      {name}
      <span class="caption c-waterloo">{ticker}</span>
    </div>
  </a>
  <div class="body">
    <slot />
  </div>
</div>

<style>
  .border {
    width: 235px;
  }

  .top {
    border-bottom: 1px solid var(--porcelain);
  }
  .top,
  .body {
    padding: 16px;
  }
</style>

<script>
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'

  let className = ''
  export { className as class }
  export let project

  $: ({ slug, name, ticker } = project)
</script>

<div class="row v-center {className}" on:click>
  <ProjectIcon {slug} class="mrg-s mrg--r" />
  <span class="name">{name}</span>
  <span class="c-waterloo mrg-s mrg--l">{ticker}</span>
</div>

<style>
  div {
    fill: var(--waterloo) !important;
  }

  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    color: var(---color);
  }
</style>

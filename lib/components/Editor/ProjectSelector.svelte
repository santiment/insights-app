<script>
  import Svg from 'san-webkit/lib/ui/Svg/svelte'
  import { queryProjects } from 'san-webkit/lib/api/projects'
  import Project from './Project.svelte'
  import Selector from './Selector.svelte'

  export let project
  export let update

  let projects = []
  let isOpened

  if (process.browser) queryProjects().then((data) => (projects = data))

  function filter(value, items) {
    const searchTerm = value.toLowerCase()
    return items.filter(
      ({ name, ticker }) =>
        name.toLowerCase().includes(searchTerm) || ticker.toLowerCase().includes(searchTerm),
    )
  }

  function selectProject(item) {
    project = item
    isOpened = false
    update(project)
  }
</script>

<Selector bind:isOpened key="slug" {filter} items={projects} placeholder="Search project">
  {#if project}
    <Project {project} class="project-6dG7e mrg-l mrg--r" />
    <button class="clear btn" on:click|stopPropagation={() => selectProject(null)}>
      <Svg id="close" w="8" />
    </button>
  {:else}
    <div class="c-casper">Select project</div>
  {/if}

  <svelte:fragment slot="item" let:item>
    <Project project={item} on:click={() => selectProject(item)} class="btn-ghost" />
  </svelte:fragment>
</Selector>

<style>
  .clear {
    margin: -2px 12px 0 auto;
    --fill-hover: var(--red);
  }

  :global(.project-6dG7e) {
    min-width: 0;
  }
</style>

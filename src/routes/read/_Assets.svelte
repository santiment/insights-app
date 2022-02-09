<script>
  import { onDestroy } from 'svelte'
  import Asset from '@cmp/Asset.svelte'
  import PriceSincePublication from '@cmp/PriceSincePublication.svelte'
  import { queryInsightRelatedProjects } from '@/api/insights/project'
  import RelatedProject from './_RelatedProject.svelte'

  export let insight
  export let projectData

  let node
  let observer
  let relatedProjects = []

  $: ({ id, project } = insight)
  $: id && node && setupObserver()

  function loadRelatedProjects() {
    observer.unobserve(node)
    observer = null
    queryInsightRelatedProjects(insight.id).then(
      (data) => (relatedProjects = [project].concat(data)),
    )
  }

  function setupObserver() {
    const dispatcher = ([{ isIntersecting }]) => isIntersecting && loadRelatedProjects()
    observer = new IntersectionObserver(dispatcher, { rootMargin: '10px' })
    observer.observe(node)
  }

  onDestroy(() => {
    if (observer) observer.unobserve(node)
  })
</script>

<aside bind:this={node}>
  <h2 class="c-waterloo mrg-l mrg--b">Assets from this insight</h2>

  <Asset asset={project}>
    <PriceSincePublication width={201} {insight} {project} {...projectData} />
  </Asset>

  {#each relatedProjects as project (project.slug)}
    <RelatedProject {project} />
  {/each}
</aside>

<style>
  aside {
    position: absolute;
    top: 95px;
    left: calc(100% + 60px);
    white-space: nowrap;
  }
</style>

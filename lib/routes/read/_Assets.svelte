<script>
  import { onDestroy } from 'svelte'
  import Asset from './../../components/Asset.svelte'
  import PriceSincePublication from './../../components/PriceSincePublication.svelte'
  import { queryInsightRelatedProjects } from './../../api/insights/project'
  import { checkIsNFTTag } from './../../utils/insights'
  import RelatedProject from './_RelatedProject.svelte'
  import Sanr from './_Sanr/index.svelte'

  export let insight
  export let projectData

  let node
  let observer
  let relatedProjects = []

  $: ({ id, project, tags } = insight)
  $: id && node && setupObserver()
  $: isNftBattle = (tags || []).some((tag) => tag && checkIsNFTTag(tag.name))

  const projectFilter = ({ slug }) => project.slug !== slug
  function loadRelatedProjects() {
    observer.unobserve(node)
    observer = null
    queryInsightRelatedProjects(insight.id).then((data) => {
      relatedProjects = [project].concat(data.filter(projectFilter))
    })
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
  {#if isNftBattle}
    <Sanr {insight} />
  {/if}

  <h2 class="body-2 txt-m c-waterloo mrg-xl mrg--b">Assets from this insight</h2>

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

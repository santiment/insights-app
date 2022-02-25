<script>
  import { onDestroy, onMount } from 'svelte'
  import { queryInsightProject } from '@/api/insights/project'
  import PriceSincePublication, {
    queryPriceSincePublication,
  } from '@cmp/PriceSincePublication.svelte'

  export let node
  export let insight
  const { publishedAt } = insight

  let observer
  let project, projectData

  $: project && loadPrice()

  function loadProject() {
    if (observer) observer.unobserve(node)
    observer = null
    queryInsightProject(insight.id, publishedAt).then((result) => (project = result))
  }

  function loadPrice() {
    queryPriceSincePublication(project.slug, publishedAt).then((result) => (projectData = result))
  }

  function observeIntersection() {
    if (!node) return loadProject()

    const dispatcher = ([{ isIntersecting }]) => isIntersecting && loadProject()
    observer = new IntersectionObserver(dispatcher, { rootMargin: '200px' })
    observer.observe(node)
  }

  onMount(observeIntersection)

  onDestroy(() => {
    if (observer) observer.unobserve(node)
  })
</script>

{#if project}
  <PriceSincePublication {insight} {project} {...projectData} width={220} class="$style.price" />
{/if}

<style>
  .price {
    width: 260px;
    min-width: 260px;
    padding: 21px 20px 29px;
    background: linear-gradient(180deg, var(--athens), var(--white));
  }
</style>

<script>
  import Change, { percentChange } from 'webkit/ui/Change.svelte'
  import Chart from 'webkit/ui/MiniChart/svelte'
  import ChartPointRef from 'webkit/ui/MiniChart/PointRef.svelte'
  import { queryPriceData, queryInsightProject } from '@/api/insights/project'
  import { onDestroy, onMount } from 'svelte'

  export let node
  export let insight
  const { publishedAt } = insight
  const publicationTimestamp = +new Date(publishedAt)

  let observer
  let data, project, clientHeight

  $: project && loadPrice()
  $: change = project && percentChange(project.publicationPrice, project.priceUsd)

  function observeIntersection() {
    if (!node) return loadProject()

    const dispatcher = ([{ isIntersecting }]) => isIntersecting && loadProject()
    observer = new IntersectionObserver(dispatcher, { rootMargin: '200px' })
    observer.observe(node)
  }

  function loadProject() {
    if (observer) observer.unobserve(node)
    observer = null
    queryInsightProject(insight.id, publishedAt).then((data) => (project = data))
  }

  function loadPrice() {
    const diff = Date.now() - publicationTimestamp
    const from = new Date(publicationTimestamp - diff * 0.5)
    queryPriceData(project.slug, from.toISOString()).then((result) => (data = result))
  }

  onMount(observeIntersection)

  onDestroy(() => {
    if (observer) observer.unobserve(node)
  })
</script>

{#if project}
  <div class="price c-waterloo column justify">
    {project.ticker} price since publication
    <div class="chart fluid mrg-m mrg--t" bind:clientHeight>
      <Chart {data} width={220} height={clientHeight} valueKey="v" let:points>
        <ChartPointRef
          {data}
          {points}
          stroke="var(--{change < 0 ? 'red' : 'lima'})"
          target={publicationTimestamp} />
      </Chart>
    </div>
    <Change {change} class="$style.change" />
  </div>
{/if}

<style>
  .price {
    width: 260px;
    min-width: 260px;
    padding: 21px 20px 29px;
    text-align: center;
    background: linear-gradient(180deg, var(--athens), var(--white));
  }

  .chart {
    flex: 1;
  }

  .change {
    justify-content: flex-end;
  }
</style>

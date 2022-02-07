<script>
  import Chart from './Chart.svelte'
  import { queryPriceData, queryInsightProject } from '@/api/insights/project'
  import Change, { perceChange } from './Change.svelte'
  import { compare } from 'webpack/lib/Dependency'

  export let insight
  const publicationTimestamp = +new Date(insight.publishedAt)

  let data
  let points

  let clientHeight
  let project
  let publicationPrice = 0
  let cx = 0
  let cy = 0

  const map = (value, valueMin, valueMax, targetMin, targetMax) =>
    targetMin + ((value - valueMin) * (targetMax - targetMin)) / (valueMax - valueMin)

  $: project && loadPrice()
  $: change = publicationPrice && perceChange(publicationPrice, project.priceUsd)
  $: if (points && points.length > 2) {
    const { length } = data
    const first = data[0].d
    const last = data[length - 1].d

    const index = Math.round(map(publicationTimestamp, first, last, 0, length))
    const point = points[index]
    if (point) {
      console.log(point)
      const [x, y] = point.split(',')
      cx = x
      cy = y
    }
  }

  queryInsightProject(insight.id).then((data) => (project = data))
  function loadPrice() {
    const diff = Date.now() - publicationTimestamp
    const from = new Date(publicationTimestamp - diff * 0.3)

    queryPriceData(project.slug, from.toISOString()).then((result) => {
      publicationPrice = result.firstPrice
      data = result.data
    })
  }

  const defaultCompare = (a, b) => a - b
  function binSearch(items, target, compare = defaultCompare) {
    let start = 0
    let stop = items.length - 1
    let value
    let mid

    while (start > 0 && start < stop) {
      mid = Math.floor((start + stop) / 2)
      value = items[mid]
      const dir = compare(value, taget)

      if (dir === 0) break

      if (dir < 0) stop = mid - 1
      else start = mid + 1
    }

    return { value, mid }
  }
</script>

{#if project}
  <div class="price c-waterloo column justify">
    {project.ticker} price since publication
    <div class="chart fluid mrg-m mrg--t" bind:clientHeight>
      <Chart {data} width={220} height={clientHeight} valueKey="v" bind:points>
        <circle {cx} {cy} r="3.5" />
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

  circle {
    fill: var(--white);
    stroke: var(--green);
    stroke-width: 1.5px;
  }
</style>

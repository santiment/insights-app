<script context="module">
  export const getPerformance = ({ performance }) => +(performance * 100).toFixed(2) + '%'
</script>

<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Title from './Title.svelte'
  import Price from './Price.svelte'
  import Direction from './Direction.svelte'
  import { querySignals, querySignalsProjectData } from './api'

  export let insight

  let signals = []

  $: process.browser && getSignals(insight.id)

  function getSignals(insightId) {
    querySignals(insightId)
      .then(({ data }) => {
        return querySignalsProjectData(data)
      })
      .then((data) => (signals = data))
  }
</script>

<h2 class="body-2 txt-m c-waterloo mrg-xl mrg--b">SanR Signals</h2>

<a
  href="https://sanr.app/open-signal"
  rel="noreferrer noopener"
  class="open btn-2 row hv-center fluid"
>
  <Svg id="alert" w="16" h="14" class="mrg-s mrg--r" />
  Open Signal
</a>

{#each signals as signal (signal.id)}
  {@const { signalID, contractAddress } = signal}

  <a
    href="https://sanr.app/?signal={signalID}*{contractAddress}"
    rel="noreferrer noopener"
    class="column border mrg-m mrg--t"
  >
    <Title {signal} class="$style.title" />

    <section class="column c-black">
      <div class="row v-center justify mrg-m mrg--b">
        <Direction {signal} />

        <div class="perf txt-right">
          <div class="caption c-waterloo">Performance</div>
          {getPerformance(signal)}
        </div>
      </div>

      <Price {insight} {signal} />
    </section>
  </a>
{/each}

<style>
  .title {
    border-bottom: 1px solid var(--porcelain);
    padding: 18px 20px;
  }

  section {
    padding: 16px 20px;
  }

  .open {
    --fill: var(--waterloo);
  }
</style>

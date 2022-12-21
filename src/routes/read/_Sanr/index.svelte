<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import ProjectIcon from 'webkit/ui/ProjectIcon.svelte'
  import Price from './Price.svelte'
  import { queryProjectByTicker, querySignals } from './api'

  export let insight

  let signals = []

  $: process.browser && getSignals(insight.id)

  function getSignals(insightId) {
    querySignals(insightId)
      .then(({ data }) => {
        return Promise.all(
          data.slice(0, 5).map((signal) => {
            const [ticker, pair] = signal.symbol.split('/')
            return queryProjectByTicker(ticker).then((project) => {
              return Object.assign(signal, project, { metric: 'price_' + pair.toLowerCase() })
            })
          }),
        )
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
  {@const { status, signalID, contractAddress, direction, symbol, performance, logoUrl } = signal}
  {@const up = direction === 'up'}
  {@const opened = status === 'open'}

  <a
    href="https://sanr.app/?signal={signalID}*{contractAddress}"
    rel="noreferrer noopener"
    class="column border mrg-m mrg--t"
  >
    <h4 class="row v-center body-2">
      <ProjectIcon class="mrg-s mrg--r" {logoUrl} />
      {symbol}

      <div class="status mrg-a mrg--l mrg-a mrg--l" class:opened />
    </h4>

    <section class="column c-black">
      <div class="row v-center justify mrg-m mrg--b">
        <span class="direction" class:up>
          {up ? 'SanRise' : 'SanSet'}
          <Svg id="pointer" w="12" class="$style.pointer mrg-s mrg--l" />
        </span>

        <div class="perf txt-right">
          <div class="caption c-waterloo">Performance</div>
          {+(performance * 100).toFixed(2)}%
        </div>
      </div>

      <Price {insight} {signal} />
    </section>
  </a>
{/each}

<style>
  h4 {
    border-bottom: 1px solid var(--porcelain);
    padding: 18px 20px;
  }

  .status {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--red);
    border: 4px solid var(--red-light-1);
  }
  .opened {
    background: var(--lima);
    border: 4px solid var(--lima-light-1);
  }

  section {
    padding: 16px 20px;
  }

  .direction {
    padding: 10px 12px;
    background: var(--red-light-1);
    border-radius: 6px;
    fill: var(--red);
    --deg: 45deg;
  }
  .up {
    background: var(--green-light-1);
    fill: var(--green);
    --deg: -45deg;
  }

  .pointer {
    rotate: var(--deg);
  }

  .open {
    --fill: var(--waterloo);
  }
</style>

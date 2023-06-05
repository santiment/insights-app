<script context="module">
  import { query } from 'san-webkit/lib/api'
  import { getSEOLinkFromIdAndTitle } from 'san-webkit/lib/utils/url'

  const querySignals = () =>
    window
      .fetch(
        // 'https://sanr-l2-api.production.internal.santiment.net/api/v1/leaderboards/forecasts?filter=%22sanbaseInsight%22:%7B%22$ne%22:null%7D&take=10',

        'https://sanr-l2-api.production.internal.santiment.net/api/v1/leaderboards/forecasts?filter=%22sanbaseInsight%22:%7B%22$ne%22:null%7D&groupBy=sanbaseInsight&sort=performance:DESC&take=10',
      )
      .then((res) => res.json())

  const SIGNAL_INSIGHT_QUERY = (id) => `{
    insight(id:${id}) { id title publishedAt }
  }`

  const querySignalInsight = (insightId) => query(SIGNAL_INSIGHT_QUERY(insightId))
  function querySignalsInsights(signals) {
    return Promise.all(
      signals
        .map((signal) => {
          const { sanbaseInsight } = signal

          return querySignalInsight(sanbaseInsight).then((data) => Object.assign(signal, data))
        })
        .filter(Boolean),
    )
  }
</script>

<script>
  import { querySignalsProjectData } from './read/_Sanr/api'
  import Title from './../routes/read/_Sanr/Title.svelte'
  import Direction from './../routes/read/_Sanr/Direction.svelte'
  import Price from './../routes/read/_Sanr/Price.svelte'
  import { getPerformance } from './read/_Sanr/index.svelte'

  let signals = []

  querySignals()
    .then(({ data }) => {
      const insightsPromise = querySignalsInsights(data)
      const projectsPromise = querySignalsProjectData(data)
      return Promise.all([projectsPromise, insightsPromise]).then(() => projectsPromise)
    })
    .then((data) => (signals = data))
</script>

{#if signals.length}
  <h2 class="h4 mrg-l mrg--b row v-center">
    SanR signals
    <span class="new c-green caption txt-m mrg-m mrg--l">NEW</span>
  </h2>

  <section class="hover-scroll column">
    {#each signals as signal}
      {@const { insight = {}, performance } = signal}
      <a href="/read/{getSEOLinkFromIdAndTitle(insight.id, insight.title)}" class="column border">
        <div class="title body-2">
          <span class="line-clamp">{insight.title}</span>
        </div>

        <div class="signal c-black row v-center justify">
          <div>
            <Title {signal} margin="mrg-m" />

            <div class="row mrg-m mrg--t">
              <Direction {signal} />

              <span class="mrg-l mrg--l"
                >Perf. <span class="performance c-green" class:down={performance < 0}
                  >{getPerformance(signal)}</span
                ></span
              >
            </div>
          </div>

          <Price {insight} {signal} width={125} height={45} />
        </div>
      </a>
    {/each}
  </section>
{/if}

<style>
  .new {
    padding: 4px 6.5px;
    background: var(--green-light-1);
    border-radius: 4px;
  }

  section {
    margin: 0 0 20px;
    gap: 16px;
    min-height: 210px;
    max-height: 210px;

    --dir-padding: 0;
    --dir-bg: none;
    --dir-bg-up: none;
  }

  .title {
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--porcelain);
  }

  .signal {
    padding: 14px 16px;
    background: linear-gradient(180deg, var(--athens), var(--white));
  }

  .down {
    color: var(--red);
  }
</style>

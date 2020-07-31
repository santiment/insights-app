import gql from 'graphql-tag'

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice(
    $slug: String
    $ticker: String
    $from: DateTime
    $to: DateTime
    $interval: interval
  ) {
    historyPrice(
      slug: $slug
      ticker: $ticker
      from: $from
      to: $to
      interval: $interval
    ) {
      priceUsd
      datetime
    }
  }
`

export const PROJECT_PRICE_DIFF_QUERY = gql`
  query getMetric($slug: String!, $from: DateTime!, $to: DateTime!) {
    getMetric(metric: "price_usd") {
      publishPrice: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: LAST
      )

      currentPrice: aggregatedTimeseriesData(
        slug: $slug
        from: $from
        to: $to
        aggregation: FIRST
      )
    }
  }
`

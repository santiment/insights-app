import gql from 'graphql-tag'

export const PROJECTS_BY_TICKER_QUERY = gql`
  query allProjectsByTicker($ticker: String!) {
    allProjectsByTicker(ticker: $ticker) {
      id
      slug
      name
      ticker
      logoUrl
      percentChange7d
      priceUsd
    }
  }
`

export const INSIGHT_PROJECT_QUERY = gql`
  query insightById($insightId: Int!, $from: DateTime!, $to: DateTime!) {
    insight(id: $insightId) {
      id
      project: priceChartProject {
        id
        ticker
        currentPrice: priceUsd
        publicationPrice: aggregatedTimeseriesData(
          from: $from
          to: $to
          metric: "price_usd"
          aggregation: FIRST
        )
      }
    }
  }
`

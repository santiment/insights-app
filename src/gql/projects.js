import gql from 'graphql-tag'

const projectFragment = gql`
  fragment projectFragment on Project {
    id
    slug
    name
    ticker
    logoUrl
  }
`

export const PROJECTS_BY_TICKER_QUERY = gql`
  query allProjectsByTicker($ticker: String!) {
    allProjectsByTicker(ticker: $ticker) {
      ...projectFragment
      percentChange7d
      priceUsd
    }
  }
  ${projectFragment}
`

export const INSIGHT_PROJECT_QUERY = gql`
  query insightById($insightId: Int!, $from: DateTime!, $to: DateTime!) {
    insight(id: $insightId) {
      id
      project: priceChartProject {
        id
        currentPrice: priceUsd
        publicationPrice: aggregatedTimeseriesData(
          from: $from
          to: $to
          metric: "price_usd"
          aggregation: LAST
        )
      }
    }
  }
`

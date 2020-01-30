import gql from 'graphql-tag'

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice(
    $slug: String
    $ticker: String
    $from: DateTime
    $to: DateTime
    $interval: String
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

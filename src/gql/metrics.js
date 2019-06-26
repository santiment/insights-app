import gql from "graphql-tag";

export const HISTORY_PRICE_QUERY = gql`
  query historyPrice(
    $ticker: String
    $from: DateTime
    $to: DateTime
    $interval: String
  ) {
    historyPrice(ticker: $ticker, from: $from, to: $to, interval: $interval) {
      priceBtc
      priceUsd
      volume
      datetime
      marketcap
    }
  }
`;

import gql from "graphql-tag";

export const TRENDING_WORDS_QUERY = gql`
  query trendingWords {
    trendingWords(
      source: ALL
      size: 10
      hour: 1
      from: "2019-06-02T21:00:00.000Z"
      to: "2019-06-05T21:00:00.000Z"
    ) {
      datetime
      topWords {
        score
        word
      }
    }
  }
`;

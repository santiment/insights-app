import gql from 'graphql-tag'

const projectFragment = gql`
  fragment projectFragment on Project {
    id
    name
    slug
    ticker
    logoUrl
  }
`

export const ALL_PROJECTS_SEARCH_QUERY = gql`
  query allProjects($minVolume: Int = 0) {
    allProjects(minVolume: $minVolume) {
      ...projectFragment
      rank
    }
  }
  ${projectFragment}
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

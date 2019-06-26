import gql from "graphql-tag";

const GENERAL_FRAGMENT = gql`
  fragment GENERAL_FRAGMENT on Project {
    id
    name
    slug
    description
    ticker
    coinmarketcapId
  }
`;

const ETH_FRAGMENT = gql`
  fragment ethereumData on Project {
    fundsRaisedUsdIcoEndPrice
    ethAddresses {
      address
    }
  }
`;

const STATS_FRAGMENT = gql`
  fragment project on Project {
    rank
    marketSegment
    priceUsd
    percentChange24h
    volumeUsd
    volumeChange24h
    ethSpent
    averageDevActivity
    averageDailyActiveAddresses
    marketcapUsd
    signals {
      name
      description
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  query allProjects {
    allProjects {
      ...GENERAL_FRAGMENT
      ...STATS_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
  ${STATS_FRAGMENT}
`;

export const ALL_PROJECTS_50_QUERY = gql`
  query allProjects {
    allProjects(page: 1, pageSize: 50) {
      ...GENERAL_FRAGMENT
      ...STATS_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
  ${STATS_FRAGMENT}
`;

export const PROJECT_BY_SLUG_QUERY = gql`
  query projectBySlugGQL($slug: String!) {
    projectBySlug(slug: $slug) {
      ...GENERAL_FRAGMENT
      ...STATS_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
  ${STATS_FRAGMENT}
`;

export const ALL_PROJECTS_SEARCH_QUERY = gql`
  query allProjects {
    allProjects {
      ...GENERAL_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
`;

export const ALL_ERC20_PROJECTS_QUERY = gql`
  query allErc20Projects {
    allErc20Projects {
      ethBalance
      ...GENERAL_FRAGMENT
      ...STATS_FRAGMENT
      ...ETH_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
  ${STATS_FRAGMENT}
  ${ETH_FRAGMENT}
`;

export const ALL_CURRENCY_PROJECTS_QUERY = gql`
  query allCurrencyProjects {
    allCurrencyProjects {
      ...GENERAL_FRAGMENT
      ...STATS_FRAGMENT
    }
  }
  ${GENERAL_FRAGMENT}
  ${STATS_FRAGMENT}
`;

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
  query allProjects {
    allProjects {
      ...projectFragment
      rank
    }
  }
  ${projectFragment}
`

export const ALL_PROJECTS_FEATURED_QUERY = gql`
  query allProjects {
    allProjects {
      ...projectFragment
      percentChange7d
    }
  }
  ${projectFragment}
`

import gql from 'graphql-tag'

export const ALL_PROJECTS_SEARCH_QUERY = gql`
  query allProjects {
    allProjects {
      id
      name
      slug
      ticker
      logoUrl
    }
  }
`

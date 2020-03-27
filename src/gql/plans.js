import gql from 'graphql-tag'

export const PLANS_QUERY = gql`
  query productsWithPlans {
    productsWithPlans {
      id
      plans {
        id
        isDeprecated
        interval
        name
        amount
      }
    }
  }
`

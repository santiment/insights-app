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

export const CHECK_COUPON_QUERY = gql`
  query getCoupon($coupon: String!) {
    getCoupon(coupon: $coupon) {
      amountOff
      id
      isValid
      name
      percentOff
    }
  }
`

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

export const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($cardToken: String!, $planId: Int!, $coupon: String) {
    subscription: subscribe(
      cardToken: $cardToken
      planId: $planId
      coupon: $coupon
    ) {
      id
      trialEnd
      plan {
        id
        name
        product {
          id
        }
      }
    }
  }
`

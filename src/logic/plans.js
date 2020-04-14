import { goto } from '@sapper/app'
import { client } from '@/apollo'
import { PLANS_QUERY, CHECK_COUPON_QUERY } from '@/gql/plans'
import { findSanbasePlans } from '@/utils/plans'

export const getProductsWithPlans = () =>
  client
    .query({
      query: PLANS_QUERY,
    })
    .then(({ data: { productsWithPlans } }) => productsWithPlans)

export const getSanbasePlans = () =>
  getProductsWithPlans().then(products => {
    const product = products.find(findSanbasePlans)
    return product ? product.plans : []
  })

export const getCoupon = coupon =>
  client
    .query({ query: CHECK_COUPON_QUERY, variables: { coupon } })
    .then(({ data: { getCoupon } }) => getCoupon)

import { goto } from '@sapper/app'
import { client } from '@/apollo'
import { PLANS_QUERY } from '@/gql/plans'
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

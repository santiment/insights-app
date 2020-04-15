import {stores} from '@sapper/app'
import {sendEvent} from '@/analytics'
import {client} from '@/apollo'
import {PLANS_QUERY, CHECK_COUPON_QUERY, SUBSCRIBE_MUTATION} from '@/gql/plans'
import {findSanbasePlans} from '@/utils/plans'
import {notifications} from '@/stores/notifications'

export const formatError = (msg) => msg.replace('GraphQL error: ', '')

export const getProductsWithPlans = () =>
  client
    .query({
      query: PLANS_QUERY,
    })
    .then(({data: {productsWithPlans}}) => productsWithPlans)

export const getSanbasePlans = () =>
  getProductsWithPlans().then((products) => {
    const product = products.find(findSanbasePlans)
    return product ? product.plans : []
  })

export const getCoupon = (coupon) =>
  client
    .query({query: CHECK_COUPON_QUERY, variables: {coupon}})
    .then(({data: {getCoupon}}) => getCoupon)

export const subscribeToPlan = (variables) =>
  client.mutate({mutation: SUBSCRIBE_MUTATION, variables})

export function getTokenDataByForm(form) {
  const res = {}
  new FormData(form).forEach((value, key) => {
    res[key] = value
  })
  return res
}

export function buyPlan(stripe, card, form, plan) {
  const {coupon, ...checkoutInfo} = form

  return stripe
    .createToken(card, checkoutInfo)
    .then(({token, error}) => {
      if (error) {
        return Promise.reject(error)
      }

      const variables = {cardToken: token.id, planId: +plan.id}

      if (coupon) {
        variables.coupon = coupon
      }

      sendEvent('upgrade', {
        method: 'Payment submitted',
      })

      return subscribeToPlan(variables)
    })
    .then(({data: {subscription}}) => {
      const {session} = stores()

      session.update((ses) => ({
        ...ses,
        currentUser: {
          ...ses.currentUser,
          subscriptions: [subscription, ...ses.currentUser.subscriptions],
        },
      }))

      return subscription
    })
    .then((data) => {
      sendEvent('upgrade', {
        method: 'Payment success',
      })

      notifications.add({
        type: 'success',
        title: `You have successfully upgraded your plan!`,
      })
      return data
    })
    .catch((e) => {
      sendEvent('upgrade', {
        method: 'Payment fail',
      })

      notifications.add({
        type: 'error',
        title: `Error during the payment`,
        description: formatError(e.message),
        dismissAfter: 10000,
        actions: [
          {
            label: 'Contact us',
            href: 'mailto:support@santiment.net',
          },
        ],
      })

      return Promise.reject(e)
    })
}

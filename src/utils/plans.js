import { ONE_DAY_IN_MS } from './dates'

const sanbaseProductId = '2'

export const findSanbasePlans = ({ id }) => id === sanbaseProductId

export function getCurrentSanbaseSubscription(user) {
  if (!user) return
  const { subscriptions: subs } = user

  return (
    subs &&
    subs.find(
      ({
        plan: {
          product: { id },
        },
      }) => id === sanbaseProductId,
    )
  )
}

export function getTrialDaysLeft(subscription) {
  if (!subscription) return

  let trialEnd = subscription.trialEnd
  if (!trialEnd) return

  const daysDiff = Math.ceil((new Date(trialEnd) - Date.now()) / ONE_DAY_IN_MS)

  if (daysDiff < 1) return

  return daysDiff === 1 ? 'last day' : `${daysDiff} days left`
}

export const formatOnlyPrice = amount => `$${Math.round(amount / 100, 10)}`

export const formatPrice = (price, name, billing) => {
  if (name === PLANS.FREE) return ['$0']
  if (!price) return ['Custom']

  const devider = 100 * (billing === 'year' ? 12 : 1)

  return [`$${parseInt(price / devider, 10)}`, '/mo']
}

const YEAR_MULT_DIV = [1, 12]
const MONTH_MULT_DIV = [12, 1]
export const getYearMonthPrices = (amount, billing) => {
  const [mult, div] = billing === 'year' ? YEAR_MULT_DIV : MONTH_MULT_DIV
  return [formatOnlyPrice(amount * mult), formatOnlyPrice(amount / div)]
}

export const getAlternativeBillingPlan = (plans, oldPlan) => {
  const { name: oldName, interval: oldInterval } = oldPlan

  return plans.find(
    ({ name, interval }) =>
      name.toUpperCase() === oldName && interval !== oldInterval,
  )
}

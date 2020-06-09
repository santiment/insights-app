import { ONE_DAY_IN_MS, getDateFormats } from './dates'

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

export const formatOnlyPrice = (amount) => `$${Math.round(amount / 100, 10)}`

export const formatPrice = (price, name, billing) => {
  if (name.toLowerCase() === 'free') return ['$0']
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

const NEXT_DATE_GET_SET_MONTH = ['setMonth', 'getMonth']
const NEXT_DATE_GET_SET_YEAR = ['setFullYear', 'getFullYear']
export const getNextPaymentDate = (billing) => {
  const [setter, getter] =
    billing === 'year' ? NEXT_DATE_GET_SET_YEAR : NEXT_DATE_GET_SET_MONTH

  const date = new Date()
  date[setter](date[getter]() + 1)

  const { DD, MM, YY } = getDateFormats(date)

  return `${DD}/${MM}/${YY}`
}

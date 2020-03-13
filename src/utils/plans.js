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

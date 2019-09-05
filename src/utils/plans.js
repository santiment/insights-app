const sanbaseProductId = '2'
export const findSanbasePlan = ({ id }) => id === sanbaseProductId

export const getCurrentSanbaseSubscription = user => {
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

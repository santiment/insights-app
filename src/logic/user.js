import { client } from '@/apollo'
import { NEWSLETTER_SUBSCRIPTION_MUTATION } from '@/gql/user'

export const WEEKLY_SUBSCRIPTION_FLAG = 'WEEKLY_SUBSCRIPTION_FLAG'

export const scheduleWeeklySubscription = () =>
  localStorage.setItem(WEEKLY_SUBSCRIPTION_FLAG, '+')

export function handleWeeklySubscription() {
  if (localStorage.getItem(WEEKLY_SUBSCRIPTION_FLAG)) {
    localStorage.removeItem(WEEKLY_SUBSCRIPTION_FLAG)

    return client.mutate({
      mutation: NEWSLETTER_SUBSCRIPTION_MUTATION,
      variables: {
        subscription: 'WEEKLY',
      },
    })
  }
}

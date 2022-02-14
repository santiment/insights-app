import { mutate } from 'webkit/api'

const EMAIL_LOGIN_MUTATION = (email, consent, subscribeToWeeklyNewsletter) => `
  mutation {
    emailLogin(
      email:"${email}",
      consent:"${consent}",
      subscribeToWeeklyNewsletter:${subscribeToWeeklyNewsletter}
    ) {
      success
    }
  }
`

export const emailLoginMutation = (email, consent = '', subscribeToWeeklyNewsletter = false) =>
  mutate(EMAIL_LOGIN_MUTATION(email, consent, subscribeToWeeklyNewsletter))

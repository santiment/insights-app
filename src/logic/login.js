import { client } from '@/apollo'
import { EMAIL_REGISTRATION } from '@/gql/login'

export const loginEmail = email =>
  client.mutate({
    mutation: EMAIL_REGISTRATION,
    variables: {
      email,
      consent: '',
    },
  })

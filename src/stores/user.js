import { stores } from '@sapper/app'

export const user = () => {
  const { session } = stores()
  return session
}

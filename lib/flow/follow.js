import { goto } from '@sapper/app'
import { getSessionValue } from './../stores/utils'
import { currentUser as currentUser$ } from './../stores/user'
import { mutateFollowUser } from './../api/follow'

export const checkIsFollowing = (currentUser, userId) =>
  currentUser && currentUser.following.users.some(({ id }) => +id === +userId)

export function startFollowFlow(userId) {
  const { currentUser } = getSessionValue()
  if (!currentUser) return goto('/login')

  const followings = currentUser.following.users
  const userIndex = followings.findIndex(({ id }) => +id === +userId)
  const isFollowed = userIndex !== -1

  if (isFollowed) {
    followings.splice(userIndex, 1)
  } else {
    followings.push({ id: userId })
  }

  currentUser$.set(currentUser)

  return mutateFollowUser(userId, !isFollowed)
}

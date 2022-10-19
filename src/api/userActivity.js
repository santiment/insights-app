import { mutate } from 'webkit/api'

export const InteractionType = {
  VIEW: 'VIEW',
  COMMENT: 'COMMENT',
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
}

export const mutateStoreUserActivitiy = (id, interactionType) =>
  mutate(`mutation {
    storeUserEntityInteraction(
        entityType: INSIGHT
        entityId: ${id}
        interactionType: ${interactionType}
    )
}`)

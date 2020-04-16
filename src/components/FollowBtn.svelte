<script>
  import { stores, goto } from '@sapper/app'
  import { get } from 'svelte/store'
  import { FOLLOW_USER_MUTATION, UNFOLLOW_USER_MUTATION } from '@/gql/user'
  import { client } from '@/apollo'
  import { debounce } from '@/utils/func'

  let klass = ''
  export { klass as class }
  export let targetId,
    hasIcon = true

  const { session } = stores()

  let wasFollowed, followed
  $: {
    followed = wasFollowed =
      $session.currentUser &&
      $session.currentUser.following.users.some(({ id }) => id === targetId)
  }

  const [mutateFollow] = debounce(() => {
    if (wasFollowed === followed) {
      return
    }
    wasFollowed = followed
    client
      .mutate({
        mutation: followed ? FOLLOW_USER_MUTATION : UNFOLLOW_USER_MUTATION,
        variables: {
          id: +targetId,
        },
      })
      .then(updateFollowings)
      .catch(() => {
        wasFollowed = !wasFollowed
        followed = wasFollowed
      })
  }, 500)

  function updateFollowings() {
    session.update((ses) => {
      const followings = ses.currentUser.following.users
      ses.currentUser.following.users = wasFollowed
        ? [...followings, { id: targetId }]
        : followings.filter(({ id }) => targetId !== id)
      return ses
    })
  }

  function toggleFollow() {
    if (!get(session).currentUser) {
      return goto('/experience')
    }

    followed = !followed
    mutateFollow()
  }
</script>

<template lang="pug">
include /ui/mixins

+button(variant='fill', accent='jungle-green', class='{klass}', on:click='{toggleFollow}')
  +if('followed')
    |Following
    +else
      +if('hasIcon')
        +icon('follow')
      |Follow
      slot
</template>

<style lang="scss">
  @import '@/mixins';

  svg {
    @include size(17px, 16px);
    margin-right: 7px;
  }
</style>

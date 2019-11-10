<script>
  import { stores } from '@sapper/app'
  import { FOLLOW_USER_MUTATION, UNFOLLOW_USER_MUTATION } from '@/gql/user'
  import { client } from '@/apollo'
  import { debounce } from '@/utils/func'

  let klass = ''
  export { klass as class }
  export let targetId

  const { session } = stores()

  let wasFollowed, followed
  $: {
    followed = wasFollowed = $session.currentUser.following.users.some(
      ({ id }) => id === targetId,
    )
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
    session.update(ses => {
      const followings = ses.currentUser.following.users
      ses.currentUser.following.users = wasFollowed
        ? [...followings, { id: targetId }]
        : followings.filter(({ id }) => targetId !== id)
      return ses
    })
  }

  function toggleFollow() {
    followed = !followed
    mutateFollow()
  }
</script>

<template lang="pug">
include /ui/mixins

+button()(class='{klass}', on:click='{toggleFollow}')
  +if('followed')
    |Following
    +else
      |Follow
      slot
</template>

<style lang="scss">
  @import '@/mixins';
  @import '@/variables';

  button {
    @include text('caption');
    margin: -2px 0 0 8px;
    height: auto;
    padding: 1px 8px;
    background: $casper;
    color: $white;

    &:hover {
      color: $white;
      background: $bali-hai;
    }
  }
</style>

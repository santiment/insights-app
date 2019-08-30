<script>
  import { stores } from '@sapper/app'
  import { client } from '@/apollo'
  import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from '@/gql/likes'
  import { debounce } from '@/utils/func'

  const { session } = stores()
  export let id, likes, liked

  let wasLiked = liked

  likes -= liked
  $: _likes = likes + liked

  const [mutateLikes] = debounce(() => {
    if (wasLiked === liked) {
      return
    }
    wasLiked = liked
    client
      .mutate({
        mutation: liked ? LIKE_INSIGHT_MUTATION : UNLIKE_INSIGHT_MUTATION,
        variables: {
          id: +id,
        },
      })
      .catch(() => {
        wasLiked = !wasLiked
        liked = wasLiked
      })
  }, 1000)

  function toggleLike() {
    liked = !liked
    mutateLikes()
  }
</script>

<template lang="pug">
include /ui/mixins

button(disabled='{!$session.currentUser}', on:click='{toggleLike}')
  +icon('liked').icon(class:liked)
  | {_likes}
</template>

<style lang="scss">
  @import '@/mixins';

  button {
    user-select: none;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;

    &:hover .icon {
      transform: scale(1);
    }

    &[disabled] {
      pointer-events: none;
      color: var(--waterloo);
      fill: var(--mystic);
      cursor: default;
    }
  }

  .icon {
    @include size(16px, 14px);
    fill: var(--casper);
    transform: scale(0.75);
    margin: -2px 4px 0 0;
    transition: transform 0.2s ease-in-out;
  }

  .liked {
    fill: var(--persimmon);
  }
</style>

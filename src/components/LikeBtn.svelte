<script>
  import { client } from '@/apollo'
  import { LIKE_INSIGHT_MUTATION, UNLIKE_INSIGHT_MUTATION } from '@/gql/likes'
  import { debounce } from '@/utils/func'

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

.btn(on:click='{toggleLike}')
  +icon('liked').icon(class:liked)
  | {_likes}
</template>

<style lang="scss">
  @import '@/mixins';

  .btn {
    user-select: none;
    cursor: pointer;
  }

  .icon {
    @include size(18px, 16px);
    margin-right: 6px;
    stroke-width: 1.5;
    stroke: var(--casper);
    fill: transparent;
  }

  .liked {
    fill: var(--persimmon);
    stroke: var(--persimmon);
  }
</style>

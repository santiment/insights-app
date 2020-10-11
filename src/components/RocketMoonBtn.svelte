<script>
  import { getContext } from 'svelte'
  import { debounce } from '@/utils/func'
  import { user$ } from '@/stores/user'

  const toggleInsightLike = getContext('toggleInsightLike')
  const currentUser = user$()

  let klass = ''
  export { klass as class }
  export let id, likes, liked

  let wasLiked = liked

  likes -= liked
  $: _likes = likes + liked

  const [mutateLikes] = debounce(() => {
    if (wasLiked === liked) {
      return
    }
    wasLiked = liked

    toggleInsightLike(id, liked).catch(() => {
      wasLiked = !wasLiked
      liked = wasLiked
    })
  }, 200)

  function toggleLike() {
    liked = !liked
    mutateLikes()
  }
</script>

<template lang="pug">
include /ui/mixins

button(disabled='{!$currentUser}', on:click='{toggleLike}', aria-label='Like', class='{klass}', class:liked)
  +icon('rocket').icon
  span {_likes}
</template>

<style lang="scss">
  @import '@/mixins';

  button {
    user-select: none;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;

    &[disabled] {
      pointer-events: none;
      cursor: not-allowed;
    }
  }

  .icon {
    @include size(20px, 22px);
  }

</style>

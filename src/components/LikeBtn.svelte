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
  +icon('liked').icon
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
    color: var(--waterloo);
    stroke: var(--casper);
    stroke-width: 1.5;
    fill: transparent;

    &:hover {
      stroke: var(--red);
    }

    &[disabled] {
      pointer-events: none;
      stroke: var(--mystic);
      fill: var(--mystic);
      cursor: not-allowed;
    }
  }

  .icon {
    @include size(16px, 14px);
    margin: -2px 4px 0 0;
  }

  .liked {
    color: var(--red);
    stroke: var(--red);
    fill: var(--red);
  }
</style>

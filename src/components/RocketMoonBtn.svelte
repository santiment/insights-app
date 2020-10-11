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
  .moonWrapper
    img(src="moon.svg", alt="moon").moon
    span + 14
  +icon('rocket').rocket
  span.text {_likes}
</template>

<style lang="scss">
  @import '@/mixins';

  button {
    user-select: none;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    display: inline-flex;
    align-items: center;
    line-height: 20px;
    border: 1px solid var(--porcelain);
    border-radius: 100px;
    padding: 4px 8px;
    color: var(--waterloo);
    fill: var(--waterloo);
    transition: color, fill, box-shadow 0.15s ease-in-out;

    &:hover {
      color: var(--rhino);
      fill: var(--rhino);
      border-color: var(--mystic);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    }

    &[disabled] {
      pointer-events: none;
      cursor: not-allowed;
    }
  }

  .rocket {
    @include size(20px, 22px);
    margin: 0 7px 0 0;
  }

  .moonWrapper {
    position: absolute;
    top: -38px;
    left: -1px;
    border-radius: 100px;
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
    padding: 8px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    /*opacity: 0;*/
    background-color: var(--white);
    /*transform: translateY(-12px);*/
    transition: transform 0.4s ease-out, opacity 0.35s ease-out;

    @include text('caption');
  }

  .moon {
    margin-right: 4px;
  }

  .text {
    text-align: left;
    @include text('body-3', 'm');
  }

</style>

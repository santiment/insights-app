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
  let showMoon = false
  let scaleMoon = false
  let moonTimeout = null
  let votingInterval = null
  let currentVoting = 0

  $: _likes = likes + currentVoting

  function startVote () {
    if (moonTimeout) {
      clearTimeout(moonTimeout)
    }

    if (showMoon) {
      scaleMoon = true
    }

    currentVoting += 1
    showMoon = true
    makeFire()

    const newVotingInterval = setInterval(repeatVote, 400)
    votingInterval = newVotingInterval
  }

  function repeatVote () {
    makeFire()
    scaleMoon = true
    showMoon = true
    currentVoting += 1
  }

  function stopVote () {
    const newMoonTimeout = setTimeout(() => { showMoon = false }, 1000)
    moonTimeout = newMoonTimeout

    if (votingInterval) {
      clearInterval(votingInterval)
    }
  }

  function makeFire () {
    const rocketSmoke = document.getElementById('smokeOpacity')
    rocketSmoke.beginElement()
  }

  function stopScaleMoon () {
    scaleMoon = false
  }

  function startShakeRocket() {
    const rocket = document.getElementById('shakeRocket')
    rocket.beginElement()
  }

  function stopShakeRocket() {
    const rocket = document.getElementById('shakeRocket')
    rocket.endElement()
  }
</script>

<template lang="pug">
include /ui/mixins

button(on:mouseenter='{startShakeRocket}', on:mouseleave='{stopShakeRocket}', on:mousedown='{startVote}', on:mouseup='{stopVote}', aria-label='Like', class='{klass}', class:voted='{!!currentVoting || wasLiked}')
  div(class='moonWrapper', class:showMoon, class:scaleMoon, on:animationend='{stopScaleMoon}')
    img(src="moon.svg", alt="moon").moon
    span + {currentVoting}
  svg(xmlns='http://www.w3.org/2000/svg', width='20', height='22', viewBox='0 0 15 22', preserveAspectRatio='xMidYMid', class='rocket')
    g(id='rocket')
      g
        animateTransform(transform='translate(0 0)', id='shakeRocket', begin='indefinite', attributeName='transform', type='translate', values='0 -0.5; -0.1 -0.1; 0.2 0; -0.4 0.1; 0.4 -0.1; -0.4 0; 0.4 0; -0.4 -0.2; 0.2 -0.4; -0.1 -0.4; 0 -0.7', keyTimes='0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1', keySplines='0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97', calcMode='spline', dur='1s', repeatCount='indefinite')
        path(fill-rule='evenodd', d='M12.13 11.2l.05-.4c.14-.86.18-1.75.06-2.65a9.4 9.4 0 00-1.52-3.94L8.7 1.25a1.72 1.72 0 00-2.88.01L3.98 4.07a9 9 0 00-1.24 6.61l.14.68-1.53 1.08c-.27.22-.45.56-.44.96l.1 4.26c.01.4.4.68.8.55l2.46-.78a2.2 2.2 0 001.85 1.05l3.08-.01c.8 0 1.48-.44 1.84-1.09l2.69.83c.37.12.77-.16.76-.56l-.1-4.29c-.01-.37-.2-.74-.52-.95l-1.74-1.2v-.01zM2 17.1l2.7-.85.41.66c.22.35.6.57 1 .57l3.06-.01c.44 0 .8-.23.99-.58l.38-.7 2.93.9-.08-3.73a.2.2 0 00-.08-.13l-2.25-1.56.13-1.03c.13-.8.16-1.6.06-2.38a8.38 8.38 0 00-1.35-3.5L7.87 1.8a.72.72 0 00-1.21 0L4.81 4.64a8.02 8.02 0 00-1.26 3.9v.01c-.04.63.03 1.31.16 1.96L4 11.8l-2.02 1.44a.19.19 0 00-.06.16L2 17.1zm6.51-9.2c0 .51-.41.95-.97.95a1 1 0 01-1-.96c0-.52.42-.96.97-.96a1 1 0 011 .97zm1 0a1.92 1.92 0 01-1.95 1.95 2 2 0 01-1.87-2.72 1.92 1.92 0 011.81-1.2c1.1.01 2 .89 2.01 1.97z', clip-rule='evenodd')
        g(id='smoke', opacity='0')
          animate(id='smokeOpacity', attributeName='opacity', begin='indefinite', values='1; 0; 0', keyTimes='0; 0.5; 1', dur='1s', repeatCount='1')
          path(d='M10.49 20.14a.5.5 0 01.86-.5l.62 1.04a.5.5 0 01-.86.52l-.62-1.06z')
            animateTransform(attributeName='transform', type='translate', values='0 0; 2 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='smokeOpacity.begin', repeatCount='1')
          path(d='M5.37 20.14a.5.5 0 10-.86-.5l-.63 1.04a.5.5 0 10.86.52l.63-1.06z')
            animateTransform(attributeName='transform', type='translate', values='0 0; -2 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='smokeOpacity.begin', repeatCount='1')
          path(d='M7.5 19.93a.5.5 0 111 0v1.22a.5.5 0 01-1 0v-1.22z')
            animateTransform(attributeName='transform', type='translate', values='0 0; 0 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='smokeOpacity.begin', repeatCount='1')
  span(class='text', style='--digits-number: {_likes.toString().length}') {_likes}
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
    padding: 4px 8px 4px 7px;
    color: var(--waterloo);
    fill: var(--waterloo);
    transition: color, fill, box-shadow, background-color 0.15s ease-in-out;

    @include responsive('laptop', 'desktop') {
      &:hover {
        color: var(--rhino);
        fill: var(--rhino);
        border-color: var(--mystic);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
      }
    }

    &.voted {
      background-color: var(--jungle-green-light);
      border-color: var(--jungle-green);
      color: var(--jungle-green-hover);
      fill: var(--jungle-green-hover);
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
    opacity: 0;
    background-color: var(--white);
    color: var(--rhino);
    transform: translateY(-12px);
    transition: transform 0.4s ease-out, opacity 0.35s ease-out;

    @include text('caption', 'm');
  }

  .moon {
    margin-right: 4px;
  }

  .text {
    width: calc((var(--digits-number) + 1) * 7px);
    text-align: left;
    @include text('body-3', 'm');
  }

  .showMoon {
    transition-duration: 0.2s, 0.17s;
    opacity: 1;
    transform: translateY(0);
  }

  .scaleMoon {
    animation-name: scaleMoon;
    animation-duration: 0.2s;
  }

  @keyframes scaleMoon {
    0% {
      transform: scale(1);
    }

    70%,
    100% {
      transform: scale(1.05);
    }
  }

</style>

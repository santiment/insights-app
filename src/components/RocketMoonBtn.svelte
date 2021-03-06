<script>
  import { getContext } from 'svelte'
  import { user$ } from '@/stores/user'
  import { checkIsMobile } from '@/utils/responsive'

  const MAX_VOTES_PER_USER = 20

  const likeInsight = getContext('likeInsight')
  const currentUser = user$()
  const isDesktop = !checkIsMobile()

  let klass = ''
  let moonClass = ''
  export { klass as class }
  export { moonClass }
  export let id,
    votes,
    userVotes,
    currentVoting = 0

  let innerWidth
  let rocketShape, fireShape
  let moonTimeout, votingInterval
  let showMoon = false
  let scaleMoon = false

  const pointerUpEvent = isDesktop ? 'mouseup' : 'touchend'
  const rocket = {
    ignite: () => fireShape.beginElement(),
    startShake: () => rocketShape.beginElement(),
    stopShake: () => rocketShape.endElement(),
  }

  $: _votes = votes + currentVoting
  $: onMouseEnter = isDesktop && rocket.startShake
  $: onMouseLeave = isDesktop && rocket.stopShake
  $: digitsAmount = _votes.toString().length

  function addVote() {
    if (userVotes + currentVoting + 1 <= MAX_VOTES_PER_USER) {
      currentVoting += 1
      likeInsight(id)
    }
  }

  function startVote() {
    clearTimeout(moonTimeout)

    if (showMoon) {
      scaleMoon = true
    }

    addVote()
    rocket.ignite()

    if (!isDesktop) {
      rocket.startShake()
    }

    showMoon = true
    votingInterval = setInterval(repeatVote, 400)
    window.addEventListener(pointerUpEvent, stopVote, { once: true })
  }

  function repeatVote() {
    scaleMoon = true
    showMoon = true

    rocket.ignite()
    addVote()
  }

  function stopVote() {
    clearInterval(votingInterval)

    moonTimeout = setTimeout(() => {
      showMoon = false

      if (!isDesktop) {
        rocket.stopShake()
      }
    }, 1000)
  }

  function stopMoonScale() {
    scaleMoon = false
  }
</script>

<template lang="pug">
include /ui/mixins

svelte:window(bind:innerWidth)

button(disabled='{!$currentUser}', on:mouseenter='{onMouseEnter}', on:mouseleave='{onMouseLeave}', on:mousedown|preventDefault='{startVote}', on:touchstart|preventDefault='{startVote}', aria-label='Like', class='{klass}', class:voted='{!!(currentVoting || userVotes)}')
  .moonWrapper(class:showMoon, class:scaleMoon, on:animationend='{stopMoonScale}', class='{moonClass}')
    img(src="moon.svg", alt="moon").moon
    | + {currentVoting + userVotes}
  svg.rocket(xmlns='http://www.w3.org/2000/svg', width='20', height='22', viewBox='0 0 15 22', preserveAspectRatio='xMidYMid')
    g
      animateTransform(bind:this='{rocketShape}', transform='translate(0 0)', begin='indefinite', attributeName='transform', type='translate', values='0 -0.2; -0.1 -0.1; 0.2 0; -0.4 0.1; 0.4 -0.1; -0.4 0; 0.4 0; -0.4 0; 0.2 -0.2; -0.1 -0.2; 0 -0.3', keyTimes='0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1', keySplines='0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97; 0.36 0.07 0.19 0.97', calcMode='spline', dur='1s', repeatCount='indefinite')
      path(fill-rule='evenodd', d='M12.13 11.2l.05-.4c.14-.86.18-1.75.06-2.65a9.4 9.4 0 00-1.52-3.94L8.7 1.25a1.72 1.72 0 00-2.88.01L3.98 4.07a9 9 0 00-1.24 6.61l.14.68-1.53 1.08c-.27.22-.45.56-.44.96l.1 4.26c.01.4.4.68.8.55l2.46-.78a2.2 2.2 0 001.85 1.05l3.08-.01c.8 0 1.48-.44 1.84-1.09l2.69.83c.37.12.77-.16.76-.56l-.1-4.29c-.01-.37-.2-.74-.52-.95l-1.74-1.2v-.01zM2 17.1l2.7-.85.41.66c.22.35.6.57 1 .57l3.06-.01c.44 0 .8-.23.99-.58l.38-.7 2.93.9-.08-3.73a.2.2 0 00-.08-.13l-2.25-1.56.13-1.03c.13-.8.16-1.6.06-2.38a8.38 8.38 0 00-1.35-3.5L7.87 1.8a.72.72 0 00-1.21 0L4.81 4.64a8.02 8.02 0 00-1.26 3.9v.01c-.04.63.03 1.31.16 1.96L4 11.8l-2.02 1.44a.19.19 0 00-.06.16L2 17.1zm6.51-9.2c0 .51-.41.95-.97.95a1 1 0 01-1-.96c0-.52.42-.96.97-.96a1 1 0 011 .97zm1 0a1.92 1.92 0 01-1.95 1.95 2 2 0 01-1.87-2.72 1.92 1.92 0 011.81-1.2c1.1.01 2 .89 2.01 1.97z', clip-rule='evenodd')
      g(opacity='0')
        animate(bind:this='{fireShape}', id='fireOpacity', attributeName='opacity', begin='indefinite', values='1; 0; 0', keyTimes='0; 0.5; 1', dur='1s', repeatCount='1')
        path(d='M10.49 20.14a.5.5 0 01.86-.5l.62 1.04a.5.5 0 01-.86.52l-.62-1.06z')
          animateTransform(attributeName='transform', type='translate', values='0 0; 2 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='fireOpacity.begin', repeatCount='1')
        path(d='M5.37 20.14a.5.5 0 10-.86-.5l-.63 1.04a.5.5 0 10.86.52l.63-1.06z')
          animateTransform(attributeName='transform', type='translate', values='0 0; -2 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='fireOpacity.begin', repeatCount='1')
        path(d='M7.5 19.93a.5.5 0 111 0v1.22a.5.5 0 01-1 0v-1.22z')
          animateTransform(attributeName='transform', type='translate', values='0 0; 0 2; 0 0', keyTimes='0; 0.55; 1', dur='1s', begin='fireOpacity.begin', repeatCount='1')
  span.text(style='--digits-amount: {digitsAmount}') {_votes}
</template>

<style lang="scss">
  @import '@/mixins';

  button {
    user-select: none;
    cursor: pointer;
    background: none;
    outline: none;
    position: relative;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow: none;
    display: inline-flex;
    align-items: center;
    line-height: 20px;
    border: 1px solid var(--porcelain);
    border-radius: 100px;
    padding: 4px 8px 4px 6px;
    color: var(--waterloo);
    fill: var(--waterloo);
    transition: background-color, color, fill, border-color 0.15s ease-in-out;
    touch-action: manipulation;

    &:hover {
      border-color: var(--mystic);
      color: var(--rhino);
      fill: var(--rhino);
    }

    &.voted {
      background-color: var(--jungle-green-light);
      border-color: var(--jungle-green);
      color: var(--jungle-green-hover);
      fill: var(--jungle-green-hover);
    }

    &[disabled] {
      pointer-events: none;
      fill: var(--mystic);
      color: var(--mystic);
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
    white-space: nowrap;
    opacity: 0;
    background-color: var(--white);
    color: var(--rhino);
    transform: translateY(-12px);
    transition: transform 0.4s ease-out, opacity 0.35s ease-out;
    pointer-events: none;

    @include text('caption', 'm');
  }

  .moon {
    margin-right: 4px;
  }

  .text {
    width: calc(var(--digits-amount) * 1ch);
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

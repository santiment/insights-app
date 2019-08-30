<script>
  export let options = []
  export let selected
  export let align = 'right'
  export let focused = false
  export let maxSuggestions = options.length

  let selectorWidth = 0
  let cursor = 0

  $: {
    selected
    cursor = 0
  }

  function onFocus() {
    focused = true
  }
  function onBlur() {
    focused = false
  }

  function onKeyDown(e) {
    const { key, currentTarget } = e
    let newCursor = cursor

    switch (key) {
      case 'ArrowUp':
        e.preventDefault()
        newCursor = cursor - 1
        break
      case 'ArrowDown':
        e.preventDefault()
        newCursor = cursor + 1
        break
      case 'Escape':
        currentTarget.blur()
        break
      case 'Enter':
        selected = options[cursor]
        currentTarget.blur()
      default:
        return
    }

    const maxCursor =
      options.length > maxSuggestions ? maxSuggestions : options.length

    newCursor = newCursor % maxCursor
    cursor = newCursor < 0 ? maxCursor - 1 : newCursor
  }
</script>

<template lang="pug">
include /ui/mixins

.select
  button.trigger(on:click='{onFocus}', on:blur='{onBlur}', on:keydown='{onKeyDown}', bind:offsetWidth='{selectorWidth}')
    |{selected}
    +icon('arrow-down').arrow
  +if('focused')
    .clickaway(on:click='{onBlur}')
    +panel.dropdown(variant='context', style='min-width: {selectorWidth}px', class='dropdown_{align}')
      +each('options as option, index')
        +button.option(variant='ghost', fluid, class:active='{option === selected}', class:cursored='{index === cursor}', on:mousedown!='{() => selected = option}') {option}
    
</template>

<style lang="scss">
  @import '@/mixins';

  .select {
    position: relative;
    display: inline-block;
    user-select: none;
    -webkit-user-select: none;
  }

  .trigger {
    border: 1px solid var(--porcelain);
    padding: 6px 28px 7px 12px;
    outline: none;
    background: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover,
    &:focus {
      border-color: var(--jungle-green);
    }

    &:focus .arrow {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .arrow {
    @include size(7px, 4px);
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    fill: var(--waterloo);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    margin-top: 4px;
    z-index: 1;
    background: var(--white);
    display: flex;
    flex-direction: column;
    padding: 8px;

    &_right {
      right: 0;
    }

    &_left {
      left: 0;
    }
  }

  .option {
    padding: 6px 8px;
  }

  .cursored {
    background: var(--porcelain);
  }

  .clickaway {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 0;
  }
</style>

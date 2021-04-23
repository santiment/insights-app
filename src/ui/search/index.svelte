<script>
  import SearchCategory from './Category.svelte'
  import { debounce } from '@/utils/func'

  export let items
  let klass
  export { klass as class }
  export let emptySuggestions
  export let onSearch

  let searchTerm = ''
  let isFocused = false
  let cursor = 0
  let cursoredSuggestion
  let isSearching = false
  let suggestions

  $: {
    isSearching = true
    filterData(searchTerm)
  }

  $: cursoredSuggestion = getCursoredSuggestion(cursor, items)

  const [filterData] = debounce((searchTerm) => {
    onSearch(searchTerm).then(() => {
      cursor = 0
      isSearching = false
    })
  }, 300)

  function onFocus() {
    isFocused = true
  }
  function onBlur() {
    isFocused = false
  }

  function onSuggestionSelect() {
    const cursored = suggestions.querySelector('.cursored')
    cursored.click()
  }

  function onKeyDown(e) {
    const { key, currentTarget } = e
    let newCursor = cursor
    let selectedSuggestion

    switch (key) {
      case 'ArrowUp':
        e.preventDefault()
        newCursor = cursor - 1
        break
      case 'ArrowDown':
        e.preventDefault()
        newCursor = cursor + 1
        break
      case 'Enter':
        currentTarget.blur()
        onSuggestionSelect(items[cursor])
      default:
        return
    }

    const maxCursor = items.length
    newCursor = newCursor % maxCursor
    cursor = newCursor < 0 ? maxCursor - 1 : newCursor
  }

  function getCursoredSuggestion(index, items) {
    return items[index]
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class='{klass}')
  +input(type="text", placeholder="Search for insights...", aria-label="Search an insight", bind:value="{searchTerm}", on:focus="{onFocus}", on:blur="{onBlur}", on:keydown="{onKeyDown}")
  +icon('search').icon-search
  +if('isFocused')
    +panel.suggestions(variant='context', bind:this='{suggestions}')
      +if('isSearching')
        .noresults Searching...
        +else()
          +if('items.length')
            SearchCategory({items}, {cursoredSuggestion})
            +else()
              .noresults No results found

  +if('searchTerm')
    +icon('close-small').icon-close(on:click!='{() => searchTerm = ""}')
      
</template>

<style lang="scss">
  @import '@/mixins';

  .icon-search {
    @include size(12px);
    fill: var(--casper);
    position: absolute;
    height: 100%;
    left: 0;
    padding: 0 8px 0 16px;
  }

  .icon-close {
    @include size(7px, 100%);
    position: absolute;
    padding: 0 12px 0 10px;
    cursor: pointer;
    right: 0;
    fill: var(--waterloo);

    &:hover {
      fill: var(--rhino);
    }
  }

  .wrapper {
    position: relative;
  }

  input {
    height: 32px;
    width: 200px;
    padding-left: 40px;
    transition: width 0.2s ease-out;

    &:focus {
      width: 340px;
    }

    &:hover + .icon-search,
    &:focus + .icon-search {
      fill: var(--jungle-green-light-3);
    }
  }

  .suggestions {
    position: absolute;
    top: 100%;
    width: 100%;
    margin-top: 4px;
    padding: 8px;
    z-index: 5;
  }

  .noresults {
    cursor: initial;
    min-height: auto;
    text-align: center;
    padding: 6px 8px;
  }
</style>

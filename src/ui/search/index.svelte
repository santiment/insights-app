<script>
  import SearchCategory from './Category.svelte'
  import { debounce } from '@/utils/func'

  export let categories
  export let categoryItems
  let klass
  export { klass as class }
  export let onSuggestionSelect
  export let emptySuggestions

  let searchTerm = ''
  let isFocused = false
  let cursor = 0
  let cursoredSuggestion
  let suggestions = []
  let isSearching = false
  let showedSuggestions = []

  $: if (searchTerm) {
    isSearching = true
    filterData(searchTerm)
  }

  $: cursoredSuggestion = getCursoredSuggestion(cursor, suggestions)

  const [filterData] = debounce(() => {
    const resultCategories = []
    const result = []
    for (let i = 0; i < categoryItems.length; i++) {
      const {
        title,
        id = title,
        predicate,
        sorter,
        maxSuggestions = 5,
        component,
        itemKey,
      } = categories[i]

      const resultItems = categoryItems[i]
        .filter(predicate(searchTerm))
        .sort(sorter)
        .slice(0, maxSuggestions)

      if (resultItems.length) {
        resultCategories.push({
          id,
          title,
          component,
          itemKey,
          items: resultItems,
        })

        result.push(
          ...resultItems.map(item => ({
            category: id,
            item,
          })),
        )
      }
    }

    showedSuggestions = resultCategories
    suggestions = result
    cursor = 0
    isSearching = false
  }, 300)

  function onFocus() {
    isFocused = true
  }
  function onBlur() {
    isFocused = false
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
        onSuggestionSelect(suggestions[cursor])
      default:
        return
    }

    const maxCursor = suggestions.length
    newCursor = newCursor % maxCursor
    cursor = newCursor < 0 ? maxCursor - 1 : newCursor
  }

  function getCursoredSuggestion(index, items) {
    const suggestion = items[index]
    return suggestion && suggestion.item
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class='{klass}')
  +input(type="text", placeholder="Search for assets...", aria-label="Search an asset", bind:value="{searchTerm}", on:focus="{onFocus}", on:blur="{onBlur}", on:keydown="{onKeyDown}")
  +icon('search').icon-search
  +if('isFocused && searchTerm')
    +panel.suggestions(variant='context')
      +each('showedSuggestions as category')
        SearchCategory({...category}, {cursoredSuggestion}, {onSuggestionSelect})
        +else()
          .noresults
            +if('isSearching')
              | Searching...
              +else()
                | No results found
  +if('searchTerm')
    +icon('close-small').icon-close(on:click!='{() => searchTerm = ""}')
      
</template>

<style lang="scss">
  @import '@/mixins';

  .icon-search {
    @include size(16px);
    fill: var(--casper);
    position: absolute;
    height: 100%;
    left: 0;
    padding: 0 8px 0 16px;
  }

  .icon-close {
    @include size(8px, 100%);
    position: absolute;
    padding: 0 12px 0 10px;
    cursor: pointer;
    right: 0;

    &:hover {
      fill: var(--jungle-green);
    }
  }

  .wrapper {
    position: relative;
  }

  input {
    height: 40px;
    width: 260px;
    padding-left: 40px;
    transition: width 0.2s ease-out;

    &:focus {
      width: 340px;
    }

    &:hover + .icon-search {
      fill: var(--jungle-green);
    }

    &:focus + .icon-search {
      fill: var(--mirage);
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

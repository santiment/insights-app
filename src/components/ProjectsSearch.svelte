<script>
  import { onMount } from 'svelte'
  import { client } from '@/apollo'
  import { ALL_PROJECTS_SEARCH_QUERY } from '@/gql/projects'

  let klass
  export { klass as class }
  export let maxSuggestions = 5

  let searchTerm = ''
  let projects = []
  let isFocused = false
  let cursor = 0
  let suggestions = []
  let isSearching = false

  let debounceTimer
  const debounce = (clb, time) => clbArgs => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => clb(clbArgs), time)
  }

  const filterData = debounce(() => {
    suggestions = projects
      .filter(predicate(searchTerm))
      .sort(sorter)
      .slice(0, maxSuggestions)
    cursor = 0
    isSearching = false
    console.log('Filtering')
  }, 300)

  function sorter({ name: { length: a } }, { name: { length: b } }) {
    return a - b
  }

  function predicate(searchTerm) {
    const upperCaseSearchTerm = searchTerm.toUpperCase()
    return ({ ticker, name }) =>
      name.toUpperCase().includes(upperCaseSearchTerm) ||
      ticker.toUpperCase().includes(upperCaseSearchTerm)
  }

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
        selectedSuggestion = suggestions[cursor]
        currentTarget.blur()
        window.location.href = `https://app.santiment.net/projects/${selectedSuggestion.slug}`
      default:
        return
    }

    const maxCursor =
      suggestions.length > maxSuggestions ? maxSuggestions : suggestions.length

    newCursor = newCursor % maxCursor
    cursor = newCursor < 0 ? maxCursor - 1 : newCursor
  }

  function onMouseDown({ currentTarget: { href } }) {
    window.location.href = href
  }

  onMount(() => {
    client
      .query({ query: ALL_PROJECTS_SEARCH_QUERY })
      .then(({ data: { allProjects } }) => (projects = allProjects))
  })

  $: {
    if (searchTerm) {
      isSearching = true
      filterData(searchTerm)
    }
  }
</script>

<template lang="pug">
include /ui/mixins

.wrapper(class='{klass}')
  +input(type="text", placeholder="Search for assets...", aria-label="Search an asset", bind:value="{searchTerm}", on:focus="{onFocus}", on:blur="{onBlur}", on:keydown="{onKeyDown}")
  +icon('search').icon-search
  +if('isFocused && searchTerm !== ""')
    +panel.suggestions(variant='context')
      +each('suggestions as suggestion, index')
        +button.suggestion(href='https://app.santiment.net/projects/{suggestion.slug}', variant='ghost', fluid, class:cursored='{index === cursor}', on:mousedown='{onMouseDown}')
          img(src='{suggestion.logoUrl}', alt='Project logo', width='16', height='16')
          |{suggestion.name}
          span ({suggestion.ticker})
        +else()
          .suggestion.noresults
            +if('isSearching')
              | Searching...
              +else()
                | No results found
      
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

  .suggestion {
    padding: 6px 8px;
    color: var(--waterloo);
    height: auto;
    min-height: 32px;

    &:hover,
    &:focus {
      color: var(--jungle-green);
    }
  }

  .cursored {
    background: var(--porcelain);
  }

  .noresults {
    cursor: initial;
    min-height: auto;
    text-align: center;
    &:hover,
    &:focus {
      /* background-color: inherit !important; */
      color: var(--waterloo);
    }
  }

  span {
    color: var(--waterloo);
    margin-left: 3px;
  }

  img {
    min-width: 16px;
    min-height: 16px;
    margin-right: 5px;
  }
</style>

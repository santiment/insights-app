<script>
  import { onDestroy, onMount } from 'svelte'
  import { debounce } from 'webkit/utils/fn'
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import InputWithIcon from 'webkit/ui/InputWithIcon.svelte'
  import { querySearchInsights, querySearchTermInsights } from '@/api/insights/search'

  let suggestionsNode
  let cursor = 0
  let isFocused = false
  let isSearching = false
  let suggestions = []
  let value = ''

  const onFocus = () => (isFocused = true)
  const onBlur = () => (isFocused = false)
  const onMouseDown = ({ currentTarget }) => currentTarget.click()
  const onSuggestionSelect = () =>
    suggestionsNode && suggestionsNode.querySelector('.cursored').click()

  const [searchInsights, clearTimer] = debounce(250, (searchTerm) => {
    value = searchTerm
    querySearchTermInsights(searchTerm).then(getSuggestions).then(setSuggestions)
  })

  function onInput(e) {
    const value = e.currentTarget.value
    isSearching = true

    if (value) searchInsights(value)
    else querySearchInsights().then(setSuggestions)
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
      case 'Enter':
        currentTarget.blur()
        onSuggestionSelect()
      default:
        return
    }

    const maxCursor = suggestions.length
    newCursor = newCursor % maxCursor
    cursor = newCursor < 0 ? maxCursor - 1 : newCursor
  }

  function getSuggestions(data) {
    if (data.length < 5) return data
    return data.slice(0, 4).concat({
      id: 'more',
      title: 'Show more results',
      link: '/search?f=1&t=' + value,
    })
  }

  function setSuggestions(data) {
    suggestions = data
    isSearching = false
  }

  function getLink({ id, title, link }) {
    return link || `/read/${getSEOLinkFromIdAndTitle(id, title)}`
  }

  onMount(() => {
    querySearchInsights().then(setSuggestions)
  })
  onDestroy(clearTimer)
</script>

<InputWithIcon
  placeholder="Search for insights..."
  icon="search"
  w="12"
  class="$style.input relative mrg-a mrg--l"
  on:focus={onFocus}
  on:blur={onBlur}
  on:input={onInput}
  on:keydown={onKeyDown}>
  {#if isFocused}
    <div class="suggestions column border box" bind:this={suggestionsNode}>
      {#if isSearching}
        Searching...
      {:else}
        {#each suggestions as item, i (item.id)}
          <a
            href={getLink(item)}
            class="btn-ghost"
            class:cursored={i === cursor}
            on:mousedown={onMouseDown}>{item.title}</a>
        {:else}
          No results found
        {/each}
      {/if}
    </div>
  {/if}
</InputWithIcon>

<style>
  .input {
    width: 240px;
    transition: width 0.2s ease-out;
  }
  .input:focus-within {
    width: 340px;
  }

  .suggestions {
    position: absolute;
    left: 0;
    width: 100%;
    top: 36px;
    text-align: center;
    padding: 8px;
    z-index: 5;
  }

  a {
    text-align: left;
  }

  .cursored {
    background: var(--porcelain);
  }
</style>

<script>
  import { onMount } from 'svelte'
  import { client } from '@/apollo'
  import { INSIGHTS_QUERY, INSIGHTS_BY_SEARCH_TERM_QUERY } from '@/gql/insights'
  import ProjectsSearch from '@/ui/search/index.svelte'

  let klass = ''
  export { klass as class }

  let items = []

  const sorter = (
    { publishedAt: _a, updatedAt: a = _a },
    { publishedAt: _b, updatedAt: b = _b },
  ) => new Date(b) - new Date(a)

  const insightsAccessor = ({ data: { insights } }) => insights.sort(sorter)

  function getSuggestions(query, variables) {
    return client
      .query({ query, variables })
      .then(insightsAccessor)
      .then((insights) => {
        const isBigList = variables && insights.length > 4
        items = insights.slice(0, isBigList ? 4 : 5)
        if (isBigList) {
          items.push({
            title: 'Show more results',
            link: '/search?f=1&t=' + variables.searchTerm,
          })
        }
      })
  }

  function onSearch(searchTerm) {
    return getSuggestions(
      searchTerm ? INSIGHTS_BY_SEARCH_TERM_QUERY : INSIGHTS_QUERY,
      searchTerm ? { searchTerm } : undefined,
    )
  }

  onMount(() => {
    getSuggestions(INSIGHTS_QUERY)
  })
</script>

<ProjectsSearch class="NavSearch__wrapper" {items} {onSearch} />

<style lang="scss">
  @import '@/mixins';

  :global(.NavSearch__wrapper) {
    margin-right: 0;
  }
</style>

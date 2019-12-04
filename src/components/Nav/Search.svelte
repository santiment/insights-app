<script>
  import { onMount } from 'svelte'
  import { client } from '@/apollo'
  import { ALL_PROJECTS_SEARCH_QUERY } from '@/gql/projects'
  import ProjectsSearch from '@/ui/search/index.svelte'
  import ProjectSuggestion from './ProjectSuggestion.svelte'

  let klass = ''
  export { klass as class }

  let categoryItems = []

  const ASSETS_CATEGORY = 'Assets'

  const categories = [
    {
      title: ASSETS_CATEGORY,
      predicate,
      sorter,
      component: ProjectSuggestion,
      itemKey: 'id',
    },
  ]

  function sorter({ rank: a }, { rank: b }) {
    return (a || Infinity) - (b || Infinity)
  }

  function predicate(searchTerm) {
    const upperCaseSearchTerm = searchTerm.toUpperCase()
    return ({ ticker, name }) =>
      name.toUpperCase().includes(upperCaseSearchTerm) ||
      ticker.toUpperCase().includes(upperCaseSearchTerm)
  }

  function onSuggestionSelect({ category, item }) {
    switch (category) {
      case ASSETS_CATEGORY:
        window.location.href = `https://app.santiment.net/projects/${item.slug}`
    }
  }

  onMount(() => {
    client
      .query({ query: ALL_PROJECTS_SEARCH_QUERY })
      .then(({ data: { allProjects } }) => (categoryItems = [allProjects]))
  })
</script>

<template lang="pug">
include /ui/mixins

ProjectsSearch.NavSearch__wrapper({categories}, {categoryItems}, {onSuggestionSelect})
</template>

<style lang="scss">
  @import '@/mixins';

  :global(.NavSearch__wrapper) {
    margin-right: 41px;

    &::after {
      content: '';
      position: absolute;
      right: -25px;
      top: 4px;
      height: 32px;
      width: 1px;
      background: var(--porcelain);
    }
  }
</style>

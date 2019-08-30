<script context="module">
  import { client } from '@/apollo'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'

  export async function preload(page, __, { apollo = client }) {
    const { id } = page.params

    const res = await apollo.query({
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id: +id,
      },
      fetchPolicy: 'network-only',
    })

    return {
      draft: res.data.insight,
    }
  }
</script>

<script>
  import Editor from '@/components/insights/Editor'

  export let draft = {}
</script>

<template lang="pug">
Editor({draft})
</template>

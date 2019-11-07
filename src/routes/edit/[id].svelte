<script context="module">
  import { client } from '@/apollo'
  import { INSIGHT_BY_ID_QUERY } from '@/gql/insights'

  export async function preload(page, session, { apollo = client }) {
    if (typeof session.currentUser !== 'object') {
      await session.loadingUser
    }
    const { currentUser } = session

    if (!currentUser) {
      return this.redirect(302, '/experience')
    }

    const { id } = page.params

    const res = await apollo.query({
      query: INSIGHT_BY_ID_QUERY,
      variables: {
        id: +id,
      },
      fetchPolicy: 'network-only',
    })

// TODO: Redirect to /my if insight is not owned [@vanguard | Nov 07, 2019]
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

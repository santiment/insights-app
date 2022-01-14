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

    let data

    try {
      const result = await apollo.query({
        query: INSIGHT_BY_ID_QUERY,
        variables: {
          id: +id,
        },
        fetchPolicy: 'network-only',
      })
      data = result.data
    } catch (e) {
      console.log('INSIGHT_BY_ID_QUERY error')
      this.redirect(500, '/')
      return {}
    }

    if (currentUser.id !== data.insight.user.id) {
      this.redirect(302, '/')
      return {}
    }

    return {
      draft: data.insight,
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

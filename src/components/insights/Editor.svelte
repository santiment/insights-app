<script>
  import { get } from 'svelte/store'
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { client } from '@/apollo'
  import { notifications } from '@/stores/notifications'
  import {
    UPDATE_INSIGHT_DRAFT_MUTATION,
    CREATE_INSIGHT_DRAFT_MUTATION,
    PUBLISH_INSIGHT_DRAFT_MUTATION,
    INSIGHT_BY_ID_QUERY,
  } from '@/gql/insights'
  import { user$ } from '@/stores/user'
  import { subscription$ } from '@/stores/user/subscription'

  export let currentTrends = ''
  export let draft = {}
  let reactMount
  let Component
  let isUpdating

  const { username } = get(user$())
  const subscription = get(subscription$())
  const isPro = subscription && subscription.plan.name === 'PRO'

  $: if (Component) {
    const tags = currentTrends
      ? currentTrends.split(',').map((name) => ({ name }))
      : []

    ReactDOM.render(
      React.createElement(Component, {
        tags,
        ...draft,
        isUpdating,
        updateDraft,
        publishDraft,
        isPro,
      }),
      reactMount,
    )
  }

  function updateDraft(payload) {
    isUpdating = true
    const { tags, ...rest } = payload
    const tagsSet = new Set(tags.map(({ name }) => name.toUpperCase()))

    client
      .mutate({
        mutation: payload.id
          ? UPDATE_INSIGHT_DRAFT_MUTATION
          : CREATE_INSIGHT_DRAFT_MUTATION,
        variables: {
          tags: [...tagsSet],
          ...rest,
        },
      })
      .then(setUpdateTime)
      .then(() => {
        if (draft.readyState !== 'published') return

        client
          .query({
            query: INSIGHT_BY_ID_QUERY,
            variables: {
              id: +draft.id,
            },
            fetchPolicy: 'network-only',
          })
          .then(() => goto(`/read/${draft.id}`))

        notifications.add({
          type: 'success',
          title: 'Your insight was successfully updated',
        })
      })
      .catch(console.warn)
  }

  function setUpdateTime({ data: { updatedDraft } }) {
    draft = { ...draft, ...updatedDraft }
    isUpdating = false
  }

  function publishDraft(id) {
    if (!username) {
      notifications.add({
        type: 'error',
        title:
          'Please, add "Name" in the "Account settings" to publish the insight',
        dismissAfter: 8000,
      })

      return
    }

    client
      .mutate({
        mutation: PUBLISH_INSIGHT_DRAFT_MUTATION,
        variables: {
          id,
        },
      })
      .then(() => {
        goto('/my')
        notifications.add({
          type: 'success',
          title: 'Thanks for your thoughts',
          description: 'We will check your insight and publish it very soon.',
        })
      })
  }

  onMount(() => {
    import('@/react/InsightEditor/InsightEditor').then(
      ({ default: loaded }) => {
        Component = loaded
      },
    )
    return () => {
      if (reactMount) {
        ReactDOM.unmountComponentAtNode(reactMount)
      }
    }
  })
</script>

<template lang="pug">
#react-mount-node.bot-scroll(bind:this="{reactMount}")
</template>

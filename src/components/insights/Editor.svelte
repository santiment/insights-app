<script>
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
  } from '@/gql/insights'

  export let draft = {}
  let reactMount
  let Component
  let isUpdating

  $: if (Component) {
    ReactDOM.render(
      React.createElement(Component, {
        ...draft,
        isUpdating,
        updateDraft,
        publishDraft,
      }),
      reactMount,
    )
  }

  function updateDraft(payload) {
    isUpdating = true
    const { tags, ...rest } = payload
    const tagsSet = new Set(tags.map(({ name }) => name))

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
      .catch(console.warn)
  }

  function setUpdateTime({ data: { updatedDraft } }) {
    draft = updatedDraft
    isUpdating = false
  }

  function publishDraft(id) {
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

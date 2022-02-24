<script>
  import { onMount } from 'svelte'
  import Profile from 'webkit/ui/Profile/svelte'
  import ViewportObserver from 'webkit/ui/ViewportObserver.svelte'
  import { queryConversations } from '@/api/insights/conversations'
  import Conversation from './Conversation.svelte'

  let conversations = []
  let loading = false
  let hasMore = true
  let lastDate

  const options = { root: null, rootMargin: '50% 0px' }
  const getNewDate = () => lastDate && new Date(new Date(lastDate) - 1000).toISOString()
  const insightsFilter = ({ insight }) => insight

  function loadConversations() {
    if (loading) return
    loading = true

    queryConversations(getNewDate()).then((data) => {
      if (!data) return (hasMore = false)

      const { length } = data
      if (length === 0) return (hasMore = false)

      const newLastDate = data[length - 1].insertedAt
      if (lastDate === newLastDate) return (hasMore = false)

      loading = false
      lastDate = newLastDate
      conversations = conversations.concat(data.filter(insightsFilter))
    })
  }

  onMount(loadConversations)
</script>

<h2 class="h4 mrg-l mrg--b">Conversations</h2>

<div class="scroll" bind:this={options.root}>
  <ViewportObserver {options} on:intersect={loadConversations} observeWhile={hasMore}>
    {#each conversations as conversation (conversation.id)}
      <Conversation {conversation} class="mrg-s mrg--b" />
    {/each}
  </ViewportObserver>
</div>

<style>
  h2 {
    margin-top: 28px;
  }

  .scroll {
    overflow: hidden;
  }
  .scroll:hover {
    overflow-y: auto;
    overflow-y: overlay;
  }
</style>

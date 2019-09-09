<script>
  import Toggle from '@/components/Toggle'
  import { CREATE_USER_WATCHLIST } from '@/gql/watchlists'
  import { client } from '@/apollo'

  export let watchlists = []
  export let open

  let isSecret = false
  let value = ''
  let loading
  let error

  $: error =
    value &&
    watchlists.some(({ name }) => name.toLowerCase() === value.toLowerCase()) &&
    'The watchlist with this name already exists'

  function closeDialog() {
    open = false
  }

  function togglePublicity() {
    isSecret = !isSecret
  }

  function onSubmit() {
    if (error || loading) return
    loading = true
    const isPublic = !isSecret

    client
      .mutate({
        mutation: CREATE_USER_WATCHLIST,
        variables: {
          isPublic,
          name: value,
        },
      })
      .then(({ data: { createWatchlist: { id } } }) => {
        watchlists = [...watchlists, { id, isPublic, name: value }]
        value = ''
        loading = false
        open = false
      })
  }
</script>

<template lang="pug">
include /ui/mixins

form(on:submit|preventDefault='{onSubmit}')
  .row.row_input
    label(for='watchlist')
      |Name 
      span ({value.length}/25)
    +input(name='watchlist', type='text', placeholder='For example, Favorites', maxlength='25', required, class:error, bind:value, readonly='{loading}')
    +if('error')
      .error-msg {error}
  .row.row_actions
    .left
      Toggle.watchlists-toggle(active='{isSecret}', on:click='{togglePublicity}')
      |Secret
    .right
      +button()(border, on:click='{closeDialog}') Cancel
      +button.create(type='submit', variant='fill', accent='jungle-green', class:disabled='{error}', class:loading) Create
</template>

<style lang="scss">
  form {
    padding: 12px 20px 20px;
    width: 440px;
  }

  .row {
    display: flex;

    &_input {
      flex-direction: column;
      margin: 0 0 40px;
      position: relative;
    }

    &_actions {
      justify-content: space-between;
      align-items: center;
    }
  }

  label {
    color: var(--waterloo);
  }

  :global(.watchlists-toggle) {
    vertical-align: middle;
    margin-right: 12px;
  }

  .create {
    margin-left: 16px;
  }

  span {
    color: var(--mirage);
  }

  .error-msg {
    color: var(--persimmon);
    position: absolute;
    top: 100%;
  }
</style>

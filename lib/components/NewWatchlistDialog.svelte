<script context="module">
  import { dialogs } from 'san-webkit/lib/ui/Dialog'
  import NewWatchlistDialog from './NewWatchlistDialog.svelte'

  export const showNewWatchlistDialog = (props) => dialogs.show(NewWatchlistDialog, props)
</script>

<script>
  import { onDestroy } from 'svelte'
  import Dialog from 'san-webkit/lib/ui/Dialog'
  import Toggle from 'san-webkit/lib/ui/Toggle.svelte'
  import FieldTooltip from 'san-webkit/lib/ui/FieldTooltip/svelte'
  import { debounce } from 'san-webkit/lib/utils/fn'
  import { mutateCreateWatchlist } from './../api/watchlists'

  export let DialogPromise

  let closeDialog
  let loading = false
  let isPublic = false
  let name = ''
  let error = ''

  const [checkValidity, clearTimer] = debounce(250, () => {
    name = name.trim()
    error = name.length < 3 ? 'The name should be at least 3 characters long' : ''
  })

  function onSubmit({ currentTarget }) {
    if (loading || error) return
    loading = true
    const description = currentTarget.description.value

    mutateCreateWatchlist(name, description, isPublic).then((watchlist) => {
      Object.assign(watchlist, { name, description, isPublic, isScreener: false, listItems: [] })

      DialogPromise.resolve(watchlist)
    })

    closeDialog()
  }

  onDestroy(clearTimer)
</script>

<Dialog {...$$props} title="New watchlist" bind:closeDialog>
  <form class="dialog" on:submit|preventDefault={onSubmit}>
    <FieldTooltip text={error} activeClass="error-2m1tIM">
      <label class="column">
        Name ({name.length}/25)
        <input
          bind:value={name}
          type="text"
          class="input mrg-xs mrg--t"
          required
          minlength="3"
          maxlength="25"
          placeholder="Watchlist's name"
          on:input={checkValidity}
        />
      </label>
    </FieldTooltip>

    <label class="column mrg-l mrg--t mrg--b">
      Description (optional)
      <textarea
        class="input mrg-xs mrg--t"
        placeholder="Watchlist's description"
        name="description"
        rows="3"
      />
    </label>

    <div class="row v-center justify mrg-xl mrg--t">
      <button type="submit" class="btn-1" class:loading class:disabled={!name || error}
        >Create</button
      >

      <button type="button" class="btn row v-center" on:click={() => (isPublic = !isPublic)}>
        {isPublic ? 'Public' : 'Private'}
        <Toggle isActive={isPublic} class="mrg-m mrg--l" />
      </button>
    </div>
  </form>
</Dialog>

<style>
  .dialog {
    padding: 16px 24px 24px;
    width: 600px;
  }

  textarea {
    resize: vertical;
    min-height: 72px;
  }

  label {
    color: var(--waterloo);
  }

  :global(.error-2m1tIM) {
    --border: var(--red);
  }
</style>

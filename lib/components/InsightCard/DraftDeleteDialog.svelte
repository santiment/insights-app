<script context="module">
  import { dialogs } from 'san-webkit/lib/ui/Dialog'
  import DraftDeleteDialog from './DraftDeleteDialog.svelte'

  export const showDraftDeleteDialog = (id) =>
    dialogs.show(DraftDeleteDialog, {
      id,
      strict: true,
    })
</script>

<script>
  import Dialog from 'san-webkit/lib/ui/Dialog'
  import { DialogLock } from 'san-webkit/lib/ui/Dialog/dialogs'
  import { mutateDeleteDraft } from './../../api/insights/user'

  export let id
  export let DialogPromise

  let closeDialog
  let loading = false

  function onDeleteClick() {
    loading = true
    DialogPromise.locking === DialogLock.LOCKED

    mutateDeleteDraft(id)
      .then(() => {
        DialogPromise.resolve()
        closeDialog()
      })
      .catch((e) => {
        console.warn(e)
        DialogPromise.locking === DialogLock.FREE
        loading = false
      })
  }
</script>

<Dialog {...$$props} title="Are you sure you want to delete this draft?" bind:closeDialog>
  <div class="row">
    <div class="btn-2 mrg-a mrg--l" on:click={closeDialog}>Cancel</div>
    <div class="btn-1 mrg-l mrg--l" class:loading on:click={onDeleteClick}>Delete Draft</div>
  </div>
</Dialog>

<style>
  .row {
    padding: 16px 20px 20px;
  }

  :global(body.desktop) .row {
    min-width: 365px;
  }
</style>

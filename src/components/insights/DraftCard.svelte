<script>
  import { stores } from '@sapper/app'
  import Dialog from '@/ui/dialog/index'
  import { dateDifferenceInWords } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle, getRawText } from '@/utils/insights'
  import { client } from '@/apollo'
  import { DELETE_INSIGHT_MUTATION } from '@/gql/insights'

  const { session } = stores()

  export let insight

  const { id, updatedAt, title, text } = insight

  const rawText = getRawText(text).slice(0, 30)
  let open

  const link = getSEOLinkFromIdAndTitle(id, title)
  const ago = dateDifferenceInWords({ from: new Date(updatedAt) })

  function closeDialog() {
    open = false
  }

  function deleteDraft() {
    client
      .mutate({ mutation: DELETE_INSIGHT_MUTATION, variables: { id: +id } })
      .then(() => {
        session.update((ses) => {
          ses.currentUser.insights = ses.currentUser.insights.filter(
            ({ id: _id }) => _id !== id,
          )
          return ses
        })

        closeDialog()
      })
      .catch(console.warn)
  }
</script>

<template lang="pug">
include /ui/mixins

+panel(variant='box').wrapper
  a.title(href='/read/{link}') {title}
  h4 {rawText}
  .bottom
    h3 Edited {ago}
    div 
      Dialog(bind:open, title='Are you sure you want to delete this draft?')
        +icon('remove')(slot='trigger').remove
        +dialogActions.actions(slot='content')
          +button()(on:click='{closeDialog}', border) Cancel 
          +button(variant='fill', accent='jungle-green', on:click='{deleteDraft}') Delete Draft

      a.edit(href='/edit/{id}')
        +icon('edit')
</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    padding: 20px 24px 22px 20px;
    display: flex;
    flex-direction: column;
  }

  .title {
    @include text('body-1');

    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
  }

  h4,
  h3 {
    @include text('body-3');
    color: var(--waterloo);
  }

  h4 {
    flex: 1;
  }

  .bottom {
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .edit {
    margin-left: 23px;
  }

  svg {
    @include size(16px);
    cursor: pointer;
    fill: var(--casper);

    &:hover {
      fill: var(--green);
    }
  }

  .actions {
    margin-top: 16px;
  }
</style>

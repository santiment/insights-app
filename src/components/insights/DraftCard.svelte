<script>
  import { dateDifferenceInWords } from '@/utils/dates'
  import { getSEOLinkFromIdAndTitle } from '@/utils/insights'
  export let insight

  const { id, updatedAt, title, text } = insight

  const link = getSEOLinkFromIdAndTitle(id, title)
  const ago = dateDifferenceInWords({ from: new Date(updatedAt) })
</script>

<template lang="pug">
include /ui/mixins

+panel(variant='box').wrapper
  a.title(href='/insights/read/{link}') My Most Valuable Crypto Market Insights For 2018 and ...
  h4 The result of spending hundreds and hundreds of hours reflecting with the disruptive experts at the forefront of the crypto space.
  .bottom
    h3 Edited {ago}
    div 
      +icon('remove').remove
      a(href='/insights/edit/{id}')
        +icon('edit').edit
</template>

<style lang="scss">
  @import '@/mixins';

  .wrapper {
    padding: 20px 24px 22px 20px;
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
    @include text('body-3') color: var(--waterloo);
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

    &:hover {
      fill: var(--jungle-green);
    }
  }
</style>

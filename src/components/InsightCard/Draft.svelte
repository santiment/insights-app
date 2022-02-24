<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import { dateDifferenceInWords } from 'webkit/utils/dates'
  import { getRawText } from '@/utils/insights'
  import { showDraftDeleteDialog } from './DraftDeleteDialog.svelte'

  export let draft
  export let onDelete

  $: ({ id, title, pulseText, text = pulseText, updatedAt } = draft)
  $: rawText = getRawText(text).slice(0, 80)

  function onDeleteClick() {
    showDraftDeleteDialog(id)
      .then(() => onDelete(draft))
      .catch(() => {})
  }
</script>

<div class="column border c-waterloo">
  <a href="/read/{id}" class="body-1 c-black">{title}</a>
  <div class="text mrg-xs mrg--t">{rawText}</div>
  <div class="row v-center mrg-l mrg--t">
    Edited {dateDifferenceInWords(new Date(updatedAt))}

    <div class="delete btn mrg-a mrg--l" on:click={onDeleteClick}>
      <Svg id="delete" w="16" />
    </div>

    <a href="/edit/{id}" class="btn mrg-xl mrg--l" sapper:prefetch>
      <Svg id="pencil" w="16" />
    </a>
  </div>
</div>

<style>
  .border {
    padding: 20px 24px 22px 20px;
    white-space: nowrap;
    min-width: 0;
  }

  a,
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn {
    --color-hover: var(--green);
  }

  .delete {
    --color-hover: var(--red);
  }
</style>

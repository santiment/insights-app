<script>
  import Text from './Text.svelte'
  import Bottom from './Bottom.svelte'

  export let insight = {}

  let isSaving = false

  $: ({ title = '', readyState } = insight)
  $: isDraft = readyState === 'draft'

  function onTitleInput({ currentTarget }) {
    const value = currentTarget.textContent
    if (!value) currentTarget.innerHTML = ''
  }
</script>

<h2 contenteditable class="txt-b mrg-l mrg--b" on:input={onTitleInput}>{title}</h2>

<Text {insight} />

<Bottom {insight} {isDraft} {isSaving} />

<style lang="scss">
  h2 {
    line-height: 44px;
    font-size: 38px;
    outline: 0;

    &:empty::before {
      content: 'Name your insight';
      color: var(--casper);
      opacity: 0.7;
      pointer-events: none;
      position: absolute;
    }
  }
</style>

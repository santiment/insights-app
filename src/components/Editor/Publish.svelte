<script>
  import Svg from 'webkit/ui/Svg/svelte'
  import Requirements from './Requirements.svelte'
  import PublishSettings from './PublishSettings.svelte'

  export let insight
  export let requirements
  export let update
  export let updateInsight, publishDraft
  export let isSaving, isDraft

  $: disabled = !checkRequirements(requirements)

  function checkRequirements({ title, text, pulse }) {
    return title && text && pulse
  }

  function onPublishClick() {
    if (isDraft) publishDraft()
    else updateInsight()
  }
</script>

<Requirements {disabled} {requirements} isPulse={insight.isPulse}>
  <PublishSettings
    {insight}
    {update}
    {isDraft}
    {onPublishClick}
    isEnabled={!disabled}
    loading={disabled || isSaving}
  >
    <div class="btn-2 btn-1 btn--s" class:disabled>
      {isDraft ? 'Publish' : 'Update'} insight
      <Svg id="arrow" w="8" h="5" class="mrg-xs mrg--l" />
    </div>
  </PublishSettings>
</Requirements>

<style>
  .btn-2 {
    --border: var(--green);
  }
  .disabled {
    --border: var(--porcelain);
  }
</style>

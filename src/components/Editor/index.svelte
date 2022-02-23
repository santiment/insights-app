<script>
  import { onDestroy } from 'svelte'
  import { debounce } from 'webkit/utils/fn'
  import Text from './Text.svelte'
  import Bottom from './Bottom.svelte'
  import { checkIsTrendTag } from '@/utils/insights'

  export let insight = {}
  const { trendTag, tags } = getTags()

  const defaultTitle = insight.title
  const isDraft = insight.readyState === 'draft'

  let title = defaultTitle
  let isSaving = false
  let contentRef = { current: null, checkRequirements }
  let requirements = { title: false, text: false, pulse: false }

  const [scheduleUpdate, clearTimer] = debounce(1000, () => {
    insight.title = title
    insight.text = contentRef.current.sanitize()

    checkRequirements()
    isSaving = false
    console.log('Updating', insight)
  })

  function onTitleInput({ currentTarget }) {
    const value = currentTarget.textContent
    if (!value) currentTarget.innerHTML = ''
    title = value.trim()
    update()
  }

  function checkRequirements() {
    const state = contentRef.current
    if (!state) return

    const text = state.content.getPlainText().trim()
    requirements = {
      title: title.length > 5,
      text: text.length > 5,
      pulse: insight.isPulse ? text.split(' ').length < 151 : true,
    }
  }

  function update() {
    isSaving = true
    scheduleUpdate()
  }

  function getTags() {
    if (!process.browser) return {}

    insight.tags = insight.tags ? insight.tags.map(({ name }) => name) : []
    return {
      trendTag: insight.tags.find(checkIsTrendTag),
      tags: insight.tags.filter((tag) => !checkIsTrendTag(tag)),
    }
  }

  onDestroy(clearTimer)
</script>

<h2 contenteditable class="txt-b mrg-l mrg--b" on:input={onTitleInput}>{defaultTitle}</h2>

<Text {insight} {contentRef} onChange={update} />

<Bottom {insight} {update} {requirements} {isDraft} {isSaving} />

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
    }
  }
</style>

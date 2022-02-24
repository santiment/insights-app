<script>
  import { onDestroy } from 'svelte'
  import { goto } from '@sapper/app'
  import { debounce } from 'webkit/utils/fn'
  import { getSEOLinkFromIdAndTitle } from 'webkit/utils/url'
  import Text from './Text.svelte'
  import Bottom from './Bottom.svelte'
  import { checkIsTrendTag } from '@/utils/insights'
  import { clearQueryInsightCache } from '@/api/insights'
  import { mutateUpdateDraft, mutateCreateDraft, mutatePublishDraft } from '@/api/insights/draft'
  import { currentUser } from '@/stores/user'
  import { session } from '@/stores/session'

  export let insight = { readyState: 'draft' }
  export let trendTag = getTags()

  const defaultTitle = insight.title || ''
  const isDraft = insight.readyState === 'draft'

  let title = defaultTitle
  let isSaving = false
  let contentRef = { current: null, checkRequirements }
  let requirements = { title: false, text: false, pulse: false }

  const [scheduleUpdate, clearTimer] = debounce(1000, () => {
    insight.title = title
    insight.text = contentRef.current.sanitize()

    checkRequirements()
    if (!requirements.title || !requirements.text) return
    if (isDraft) updateInsight()
  })
  function updateInsight() {
    const mutate = insight.id ? mutateUpdateDraft : mutateCreateDraft

    mutate({
      id: +insight.id,
      title: insight.title,
      text: insight.text,
      tags: trendTag ? insight.tags.concat(trendTag) : insight.tags,
      isPro: insight.isPro,
      isPulse: insight.isPulse,
      projectId: insight.project ? +insight.project.id : null,
    }).then((data) => {
      if (isDraft === false) {
        clearQueryInsightCache(insight.id, $session.isMobile)
        goto(`/read/${getSEOLinkFromIdAndTitle(insight.id, insight.title)}`)
        return
      }

      if (!insight.id) {
        insight.id = data.id
        window.history.replaceState({}, '', '/edit/' + data.id)
      }
      insight.updatedAt = data.updatedAt

      isSaving = false
    })
  }

  function publishDraft() {
    if (!$currentUser.username) {
      // notifications.add({
      // type: 'error',
      // title: 'Please, add "Name" in the "Account settings" to publish the insight',
      // dismissAfter: 8000,
      // })
      return
    }

    mutatePublishDraft(insight.id).then(() => {
      clearQueryInsightCache(insight.id, $session.isMobile)
      goto('/my')
      // notifications.add({
      // type: 'success',
      // title: 'Thanks for your thoughts',
      // description: 'We will check your insight and publish it very soon.',
      // })
    })
  }

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
    if (isDraft) isSaving = true
    scheduleUpdate()
  }

  function getTags() {
    if (!process.browser) return {}

    const tags = insight.tags ? insight.tags.map(({ name }) => name) : []
    insight.tags = tags.filter((tag) => !checkIsTrendTag(tag))

    return tags.find(checkIsTrendTag)
  }

  onDestroy(clearTimer)
</script>

<h2 contenteditable class="txt-b mrg-l mrg--b" on:input={onTitleInput}>{defaultTitle}</h2>

<Text {insight} {contentRef} onChange={update} />

<Bottom {insight} {update} {updateInsight} {publishDraft} {requirements} {isDraft} {isSaving} />

<style lang="scss">
  h2 {
    line-height: 44px;
    font-size: 38px;
    outline: 0;
    min-height: 44px;

    &:empty::before {
      position: absolute;
      content: 'Name your insight';
      color: var(--casper);
      opacity: 0.7;
      pointer-events: none;
    }
  }
</style>

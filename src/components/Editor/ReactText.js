import { createElement, useState } from 'react'
import { convertToRaw } from 'draft-js'
import { BLOCK_BUTTONS, INLINE_BUTTONS, Editor, createEditorState } from 'medium-draft'
import sanitizeHtml from 'sanitize-html/dist/sanitize-html'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import Svg from 'webkit/ui/Svg/react'
import ChartIframe from './ReactChartIframe'
import Image from './ReactImage'

const Icon = (id, w, h) => createElement(Svg, { id, w, h })
INLINE_BUTTONS[0].label = Icon('editor/bold', 12, 16)
INLINE_BUTTONS[1].label = Icon('editor/italic', 11.6, 16)
INLINE_BUTTONS[2].label = Icon('editor/underline', 16)
INLINE_BUTTONS[4].label = Icon('editor/link', 16)

BLOCK_BUTTONS[1].label = Icon('editor/quotes', 16)
BLOCK_BUTTONS[2].label = Icon('editor/list', 16)

BLOCK_BUTTONS.push({
  label: Icon('editor/title', 16),
  style: 'header-one',
  icon: 'header',
  description: 'Heading 1',
})
BLOCK_BUTTONS.push({
  label: Icon('editor/subtitle', 10),
  style: 'header-two',
  icon: 'header',
  description: 'Heading 2',
})

const TOOLBAR = {
  block: ['blockquote', 'unordered-list-item', 'header-one', 'header-two'],
  inline: ['hyperlink', 'BOLD', 'UNDERLINE', 'ITALIC'],
}

const IMAGE_SIDE_BUTTON = {
  title: 'Image',
  component: Image,
}

const CHART_SIDE_BUTTON = {
  title: 'Chart',
  component: ChartIframe,
}

const removeAmpersandRepetitions = (str) =>
  str.replace(/(?!<a(.*)>(.*))(&amp;)(?=(.*)<\/a>)/gi, '&')

const sanitizeMediumDraftHtml = (html) =>
  removeAmpersandRepetitions(
    sanitizeHtml(html, {
      allowedTags: [
        ...sanitizeHtml.defaults.allowedTags,
        'figure',
        'figcaption',
        'img',
        'h1',
        'h2',
        'u',
      ],
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        iframe: ['src'],
        '*': ['class', 'id'],
      },
      allowedIframeHostnames: ['embed.santiment.net'],
    }),
  )

const getEditorContent = (text) => convertToRaw(mediumDraftImporter(text))

export default ({ text, contentRef, onChange: onContentChange }) => {
  const [editorState, setEditorState] = useState(() => {
    const state = createEditorState(getEditorContent(text))
    const content = state.getCurrentContent()
    contentRef.current = {
      content,
      sanitize: () => sanitizeMediumDraftHtml(mediumDraftExporter(content)),
    }
    contentRef.checkRequirements()
    return state
  })

  function onChange(state) {
    setEditorState(state)
    const content = state.getCurrentContent()

    if (editorState.getCurrentContent() === content) return

    onContentChange()
    contentRef.current = {
      content,
      sanitize: () => sanitizeMediumDraftHtml(mediumDraftExporter(content)),
    }
  }

  function processURL(url) {
    if (!url) return false

    if (url.startsWith('?emsg=1')) {
      return url
    }
  }

  return createElement(Editor, {
    editorState,
    onChange,
    placeholder: 'Write something interesting ...',
    toolbarConfig: TOOLBAR,
    sideButtons: [IMAGE_SIDE_BUTTON, CHART_SIDE_BUTTON],
    processURL,
  })
}

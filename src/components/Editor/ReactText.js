import { createElement, useState } from 'react'
import { convertToRaw } from 'draft-js'
import { BLOCK_BUTTONS, INLINE_BUTTONS, Editor, createEditorState } from 'medium-draft'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import Svg from 'webkit/ui/Svg/react'
import ChartIframe from './ReactChartIframe'
import Image from './ReactImage'

const Icon = (id, w, h) => createElement(Svg, { id, w, h })
INLINE_BUTTONS[0].label = Icon('text-bold', 12, 16)
INLINE_BUTTONS[1].label = Icon('text-italic', 11.6, 16)
INLINE_BUTTONS[2].label = Icon('text-underline', 16)
INLINE_BUTTONS[4].label = Icon('text-link', 16)

BLOCK_BUTTONS[1].label = Icon('text-quotes', 16)
BLOCK_BUTTONS[2].label = Icon('text-list', 16)

BLOCK_BUTTONS.push({
  label: Icon('text-big', 16),
  style: 'header-one',
  icon: 'header',
  description: 'Heading 1',
})
BLOCK_BUTTONS.push({
  label: Icon('text-small', 10),
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

const getEditorContent = (text) => convertToRaw(mediumDraftImporter(text))

export default ({ text, onImgLoad }) => {
  const [editorState, setEditorState] = useState(() => createEditorState(getEditorContent(text)))

  function onChange(state) {
    setEditorState(() => state)
  }

  return createElement(Editor, {
    editorState,
    onChange,
    toolbarConfig: TOOLBAR,
    sideButtons: [
      {
        ...IMAGE_SIDE_BUTTON,
        props: { onImgLoad },
      },
      CHART_SIDE_BUTTON,
    ],
  })
}

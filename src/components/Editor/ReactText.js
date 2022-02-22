import { createElement, useState } from 'react'
import { convertToRaw } from 'draft-js'
import { BLOCK_BUTTONS, INLINE_BUTTONS, Editor, createEditorState } from 'medium-draft'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'

const getEditorContent = (text) => convertToRaw(mediumDraftImporter(text))

export default ({ text }) => {
  const [editorState, setEditorState] = useState(() => createEditorState(getEditorContent(text)))

  function onChange(state) {
    setEditorState(() => state)
  }

  return createElement(Editor, { editorState, onChange })
}

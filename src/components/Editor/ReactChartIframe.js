import { createElement, useState } from 'react'
import { Block, addNewBlock } from 'medium-draft'
import Svg from 'webkit/ui/Svg/react'

const PATTERN = '^(https://embed.santiment.net/).+'

const ChartIframe = ({ close, setEditorState, getEditorState }) => {
  const [isOpened, setIsOpened] = useState(false)

  function addIframe(src) {
    setEditorState(addNewBlock(getEditorState(), Block.IFRAME, { src }))
  }

  function onClick() {
    setIsOpened(true)
  }

  function onKeyDown(e) {
    const input = e.currentTarget

    const { key } = e
    if (key === 'Enter') {
      input.pattern = PATTERN
      if (input.reportValidity()) {
        e.preventDefault()
        addIframe(input.value)
        close()
      }
    } else if (key === 'Escape') {
      e.preventDefault()
      close()
    }
  }

  function onPaste(e) {
    const paste = (e.clipboardData || window.clipboardData).getData('text')

    let start = paste.indexOf('src="')
    if (start < 0) return
    start += 'src="'.length

    e.preventDefault()
    e.currentTarget.value = paste.slice(start, paste.indexOf('"', start))
  }

  return createElement(
    'div',
    { className: 'md-sd-button body-3 row' },

    createElement('label', { onClick, className: 'btn' }, createElement(Svg, { id: 'pie', w: 16 })),

    isOpened &&
      createElement('input', {
        autoFocus: true,
        className: 'input mrg-s mrg--l',
        type: 'text',
        defaultValue: '',
        pattern: PATTERN,
        placeholder: 'Press ENTER or ESC',
        style: { marginTop: -4 },
        onPaste,
        onKeyDown,
      }),
  )
}

export default ChartIframe

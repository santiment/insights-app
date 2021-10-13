import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import IconIframe from '@santiment-network/ui/Icon/IconFinance'
import { Block, addNewBlock } from 'medium-draft'
import styles from './CustomImageSideButton.module.scss'

const PATTERN = '^(https://embed.santiment.net/).+'

const ChartIframe = ({ close, setEditorState, getEditorState }) => {
  const [isOpened, setIsOpened] = useState(false)

  function addIframe(src) {
    setEditorState(
      addNewBlock(getEditorState(), Block.IFRAME, {
        src,
      }),
    )
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

  return (
    <div className={cx('md-sd-button', styles.button)}>
      <label className={styles.label} onClick={onClick}>
        {React.cloneElement(IconIframe, { height: 17 })}
      </label>

      {isOpened && (
        <input
          autoFocus
          className={cx('SAN-input', styles.src)}
          type='text'
          defaultValue=''
          placeholder='Press ENTER or ESC'
          pattern={PATTERN}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
        />
      )}
    </div>
  )
}

export default ChartIframe

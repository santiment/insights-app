import React from 'react'
import PropTypes from 'prop-types'
import IconTextBig from '@santiment-network/ui/Icon/IconTextBig'
import IconTextSmall from '@santiment-network/ui/Icon/IconTextSmall'
import IconTextBold from '@santiment-network/ui/Icon/IconTextBold'
import IconTextItalic from '@santiment-network/ui/Icon/IconTextItalic'
import IconTextUnderline from '@santiment-network/ui/Icon/IconTextUnderline'
import IconLink from '@santiment-network/ui/Icon/IconLink'
import IconQuote from '@santiment-network/ui/Icon/IconQuote'
import IconBulletList from '@santiment-network/ui/Icon/IconBulletList'
import {
  BLOCK_BUTTONS,
  INLINE_BUTTONS,
  Editor,
  createEditorState,
} from 'medium-draft'
import CustomImageSideButton from './CustomImageSideButton'
import './Editor.scss'

INLINE_BUTTONS[0].label = React.cloneElement(IconTextBold)
INLINE_BUTTONS[1].label = React.cloneElement(IconTextItalic)
INLINE_BUTTONS[2].label = React.cloneElement(IconTextUnderline)
INLINE_BUTTONS[4].label = React.cloneElement(IconLink)

BLOCK_BUTTONS[1].label = React.cloneElement(IconQuote)
BLOCK_BUTTONS[2].label = React.cloneElement(IconBulletList)

BLOCK_BUTTONS.push({
  label: IconTextBig,
  style: 'header-one',
  icon: 'header',
  description: 'Heading 1',
})
BLOCK_BUTTONS.push({
  label: IconTextSmall,
  style: 'header-two',
  icon: 'header',
  description: 'Heading 2',
})

class SanEditor extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    defaultEditorContent: undefined,
    onChange: () => {},
    readOnly: false,
  }

  state = {
    editorState: createEditorState(this.props.defaultEditorContent),
  }

  onChange = editorState => {
    this.setState({ editorState }, () => this.props.onChange(editorState))
  }

  onImgLoad = state => {
    switch (state) {
      case 'start':
      /* return nprogress.start() */
      case 'done':
      default:
      /* return nprogress.done() */
    }
  }

  render() {
    const { editorState } = this.state
    const { placeholder = '', readOnly } = this.props
    return (
      <Editor
        editorEnabled={!readOnly}
        editorState={editorState}
        onChange={this.onChange}
        placeholder={placeholder}
        sideButtons={[
          {
            title: 'Image',
            component: CustomImageSideButton,
            props: {
              onImgLoad: this.onImgLoad,
            },
          },
        ]}
        toolbarConfig={{
          block: [
            'blockquote',
            'unordered-list-item',
            'header-one',
            'header-two',
          ],
          inline: ['hyperlink', 'BOLD', 'UNDERLINE', 'ITALIC'],
        }}
      />
    )
  }
}

export default SanEditor

import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html/dist/sanitize-html'
import debounce from 'lodash.debounce'
import { convertToRaw } from 'draft-js'
import mediumDraftImporter from 'medium-draft/lib/importer'
import mediumDraftExporter from 'medium-draft/lib/exporter'
import { createEditorState } from 'medium-draft'
import Editor from '../Editor/Editor'
import InsightEditorBottom from './InsightEditorBottom'
import InsightEditorTitle from './InsightEditorTitle'
import { client } from '../../apollo'
import { checkIsTrendTag } from '../../utils/insights'
import styles from './InsightEditor.module.scss'

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

class InsightEditor extends Component {
  static propTypes = {
    updateDraft: PropTypes.func.isRequired,
  }

  static defaultProps = {
    title: '',
    text: '',
    readyState: 'draft',
    tags: [],
    isPaywallRequired: false,
    isPro: false,
    isPulse: false,
  }

  defaultEditorContent = convertToRaw(mediumDraftImporter(this.props.text))
  isDraft = this.props.readyState === 'draft'

  state = {
    title: this.props.title,
    textEditorState: createEditorState(this.defaultEditorContent),
    tags: this.props.tags,
    defaultTags: this.props.tags,
    chartProject: this.props.priceChartProject,
    isEditing: false,
    isPaywallRequired: this.props.isPaywallRequired,
    isPulse: this.props.isPulse,
  }

  componentDidUpdate({ tags }) {
    const { defaultTags } = this.state
    const { tags: currentTags } = this.props
    if (!tags.length && !defaultTags.length && currentTags.length > 0) {
      this.setState({ defaultTags: this.props.tags })
    }
  }

  trendTag = this.props.tags.find(({ name }) => checkIsTrendTag(name))

  toggleIsPulse = () => {
    this.setState(
      (state) => ({
        ...state,
        isPaywallRequired: false,
        isPulse: !state.isPulse,
      }),
      this.isDraft ? this.updateDraft : undefined,
    )
  }

  togglePaywallRequired = () => {
    this.setState(
      (state) => ({
        ...state,
        isPaywallRequired: !state.isPaywallRequired,
      }),
      this.isDraft ? this.updateDraft : undefined,
    )
  }

  onTitleChange = (title) => {
    this.setState(
      {
        title,
        isEditing: this.isDraft,
      },
      this.isDraft ? this.updateDraft : undefined,
    )
  }

  onTextChange = (textEditorState) => {
    const currentContent = textEditorState.getCurrentContent()
    if (
      mediumDraftExporter(currentContent) ===
      mediumDraftExporter(this.state.textEditorState.getCurrentContent())
    ) {
      return
    }

    this.setState(
      {
        textEditorState,
        isEditing: this.isDraft,
      },
      this.isDraft ? () => this.updateDraft(currentContent) : undefined,
    )
  }

  onTagsChange = (tags) => {
    this.setState(
      {
        tags,
        isEditing: this.isDraft,
        isTagsModified: true,
      },
      this.isDraft ? this.updateDraft : undefined,
    )
  }

  onChartProjectChange = (chartProject) => {
    this.setState(
      {
        chartProject,
        isEditing: this.isDraft,
      },
      this.isDraft ? this.updateDraft : undefined,
    )
  }

  isTitleAndTextOk() {
    const { title, textEditorState, isPulse } = this.state

    const trimmedTitle = title.trim()
    const trimmedText = textEditorState
      .getCurrentContent()
      .getPlainText()
      .trim()

    return {
      title: trimmedTitle.length > 5,
      text: trimmedText.length > 5,
      pulseText: isPulse ? trimmedText.split(' ').length < 151 : true,
    }
  }

  // NOTE(vanguard): Maybe should be placed in the InsightsEditorPage?
  updateDraft = debounce(
    (currentContent = this.state.textEditorState.getCurrentContent()) => {
      const {
        title,
        tags,
        chartProject,
        isPaywallRequired,
        isPulse,
      } = this.state

      const hasMetRequirements = this.isTitleAndTextOk()
      if (!hasMetRequirements.title || !hasMetRequirements.text) {
        return
      }

      const currentHtml = mediumDraftExporter(currentContent)
      const { id, updateDraft } = this.props

      updateDraft({
        id,
        title,
        text: sanitizeMediumDraftHtml(currentHtml),
        tags: this.trendTag ? [...tags, this.trendTag] : tags,
        chartProject,
        isPaywallRequired,
        isPulse,
      })

      this.setState((prevState) => ({ ...prevState, isEditing: false }))
    },
    1000,
  )

  render() {
    const {
      id,
      title,
      updatedAt,
      isUpdating,
      publishDraft,
      readyState,
      isPro,
    } = this.props
    const {
      isEditing,
      defaultTags,
      isTagsModified,
      isPaywallRequired,
      isPulse,
      chartProject,
    } = this.state
    const tags = isTagsModified ? this.state.tags : defaultTags

    const isLoading = isEditing || isUpdating

    return (
      <ApolloProvider client={client}>
        <div className={styles.wrapper}>
          <div className={styles.insightWrapper}>
            <InsightEditorTitle
              maxLength='140'
              defaultValue={title}
              onChange={this.onTitleChange}
            />
            <Editor
              defaultEditorContent={this.defaultEditorContent}
              placeholder='Write something interesting ...'
              onChange={this.onTextChange}
            />
          </div>
          <InsightEditorBottom
            chartProject={chartProject}
            defaultTags={tags}
            updatedAt={updatedAt}
            onTagsChange={this.onTagsChange}
            isLoading={isLoading}
            hasMetTextRequirements={this.isTitleAndTextOk()}
            onPublishClick={() =>
              this.isDraft ? publishDraft(id) : this.updateDraft()
            }
            isDraft={this.isDraft}
            togglePaywallRequired={this.togglePaywallRequired}
            isPaywallRequired={isPaywallRequired}
            isPro={isPro}
            isPulse={isPulse}
            toggleIsPulse={this.toggleIsPulse}
            onChartProjectChange={this.onChartProjectChange}
          />
        </div>
      </ApolloProvider>
    )
  }
}

export default InsightEditor

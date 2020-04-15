import React from 'react'
import Tooltip from '@santiment-network/ui/Tooltip'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import IconArrowUp from '@santiment-network/ui/Icon/IconArrowUp'
import Timer from '../Timer'
import InsightEditorPublishHelp from './PrePublishHelp'
import PrePublishButton from './PrePublishPopup'
import ShortToggle from './ShortToggle'
import {dateDifferenceInWords} from '../../utils/dates'
import {noTrendTagsFilter} from '../../utils/insights'
import styles from './InsightEditor.module.scss'

const InsightEditorBottom = ({
  defaultTags,
  updatedAt,
  onTagsChange,
  onPublishClick,
  isLoading,
  hasMetTextRequirements,
  isDraft,
  isPulse,
  toggleIsPulse,
  ...props
}) => {
  const options = {from: new Date(updatedAt)}
  const hasMetRequirements =
    hasMetTextRequirements.title && hasMetTextRequirements.text
  const tags = defaultTags.filter(noTrendTagsFilter)
  const actionTargetLabel = isDraft ? 'Publish' : 'Update'
  return (
    <div className={styles.bottom}>
      <div className={styles.container}>
        {updatedAt && (
          <span className={styles.save}>
            {hasMetRequirements && isLoading ? (
              'Saving...'
            ) : (
              <>
                {isDraft ? 'Draft saved ' : 'Insight updated '}
                <Timer interval={1000 * 60}>
                  {() => dateDifferenceInWords(options)}
                </Timer>
              </>
            )}
          </span>
        )}
        {isDraft && <ShortToggle isActive={isPulse} onClick={toggleIsPulse} />}
        {!hasMetRequirements && (
          <Tooltip
            on='hover'
            align='end'
            trigger={
              <div>
                <Button border disabled>
                  {actionTargetLabel} insight
                  {React.cloneElement(IconArrowUp, {className: styles.icon})}
                </Button>
              </div>
            }
          >
            <Panel padding>
              <InsightEditorPublishHelp
                requiredOptions={hasMetTextRequirements}
                isPulse={isPulse}
              />
            </Panel>
          </Tooltip>
        )}
        {hasMetRequirements && (
          <PrePublishButton
            isLoading={isLoading}
            onTagsChange={onTagsChange}
            defaultTags={tags}
            onPublishClick={onPublishClick}
            actionTargetLabel={actionTargetLabel}
            {...props}
          />
        )}
      </div>
    </div>
  )
}

export default InsightEditorBottom

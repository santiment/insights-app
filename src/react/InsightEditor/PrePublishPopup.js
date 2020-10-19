import React from 'react'
import Button from '@santiment-network/ui/Button'
import Panel from '@santiment-network/ui/Panel/Panel'
import IconArrowUp from '@santiment-network/ui/Icon/IconArrowUp'
import ContextMenu from '@santiment-network/ui/ContextMenu'
import ProInsightToggle from './ProInsightToggle'
import ChartProject from './ChartProject'
import TagSelector from '../TagSelector'
import styles from './PrePublishPopup.module.scss'

const PrePublishPopup = ({
  onPublishClick,
  chartProject,
  defaultTags = [],
  onTagsChange,
  isLoading,
  actionTargetLabel,
  isPaywallRequired,
  togglePaywallRequired,
  isPro,
  isPulse,
  onChartProjectChange,
}) => {
  return (
    <ContextMenu
      align='end'
      trigger={
        <Button accent='positive' border>
          {actionTargetLabel} insight
          {React.cloneElement(IconArrowUp, { className: styles.icon })}
        </Button>
      }
    >
      <Panel padding className={styles.wrapper}>
        <p className={styles.paragraph}>
          Add chart project and tags to catch more attention
        </p>

        <div className={styles.label}>
          <span className={styles.bold}>Chart project</span>
        </div>
        <ChartProject project={chartProject} onChange={onChartProjectChange} />

        <div className={styles.label}>
          <span className={styles.bold}>Tags</span>({defaultTags.length}/5)
        </div>
        <TagSelector onChange={onTagsChange} defaultTags={defaultTags} />

        <ProInsightToggle
          isPulse={isPulse}
          isPro={isPro}
          togglePaywallRequired={togglePaywallRequired}
          isPaywallRequired={isPaywallRequired}
        />

        <Button
          variant='fill'
          accent='positive'
          className={styles.button}
          onClick={onPublishClick}
          isLoading={isLoading}
        >
          {actionTargetLabel} insight
        </Button>
      </Panel>
    </ContextMenu>
  )
}

export default PrePublishPopup

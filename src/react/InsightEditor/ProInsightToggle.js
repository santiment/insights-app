import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import styles from './PrePublishPopup.module.scss'

const PRO_PASS = 'sanpro'

const ProInsightToggle = ({
  isPulse,
  isPro,
  togglePaywallRequired,
  isPaywallRequired,
}) => {
  const [isProToggleVisible, setIsProToggleVisible] = useState(false)

  useEffect(() => {
    const keys = []
    let isOverflowed = false

    function trackCode({ key }) {
      isOverflowed = keys.push(key) === PRO_PASS.length

      if (isOverflowed) {
        if (keys.join('') === PRO_PASS) {
          setIsProToggleVisible(true)
        }

        keys.length = 0
      }
    }

    window.addEventListener('keypress', trackCode)

    return () => {
      window.removeEventListener('keypress', trackCode)
    }
  }, [])

  return isProToggleVisible && !isPulse && isPro ? (
    <div className={styles.paywall}>
      <div
        className={cx(styles.toggle, isPaywallRequired && styles.active)}
        onClick={togglePaywallRequired}
      />
      PRO Insight
    </div>
  ) : null
}

export default ProInsightToggle

import React from 'react'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './ShortToggle.module.scss'

const ShortToggle = ({onClick, isActive}) => {
  return (
    <Button onClick={onClick} className={styles.btn}>
      Short insight
      <Toggle isActive={isActive} className={styles.toggle} />
    </Button>
  )
}

export default ShortToggle

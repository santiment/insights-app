import React from 'react'
import Button from '@santiment-network/ui/Button'
import Toggle from '@santiment-network/ui/Toggle'
import styles from './PulseToggle.module.scss'

const PulseToggle = ({ onClick, isActive }) => {
  return (
    <Button onClick={onClick} className={styles.btn}>
      Pulse insight
      <Toggle isActive={isActive} className={styles.toggle} />
    </Button>
  )
}

export default PulseToggle

import React from 'react'
import ValueChange from './ValueChange'

const render = change => `${parseFloat(change).toFixed(2)}%`

const PercentChanges = ({ className, changes }) => (
  <ValueChange className={className} change={changes} render={render} />
)

export default PercentChanges

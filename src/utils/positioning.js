export const getSignByPosition = position => {
  switch (position) {
    case 'top':
      return -1
    case 'left':
      return -1
    case 'right':
      return 1
    case 'bottom':
      return 1
    default:
      return 0
  }
}

export const calculateAlignment = (triggerProp, tooltipProp, align) => {
  switch (align) {
    case 'start':
      return 0
    case 'center':
      return (triggerProp - tooltipProp) / 2
    case 'end':
      return triggerProp - tooltipProp
  }
}

export const getTooltipStyles = (
  tooltip,
  trigger,
  position,
  align,
  offsetX,
  offsetY,
) => {
  const {
    offsetLeft: tooltipLeft,
    offsetTop: tooltipTop,
    clientWidth: tooltipWidth,
    clientHeight: tooltipHeight,
  } = tooltip
  const {
    left: triggerLeft,
    top: triggerTop,
    width: triggerWidth,
    height: triggerHeight,
  } = trigger.getBoundingClientRect()

  const sign = getSignByPosition(position)
  let top = triggerTop
  let left = triggerLeft

  if (position === 'top' || position === 'bottom') {
    top +=
      (position === 'top' ? -tooltipHeight : triggerHeight) + sign * offsetY
    left += calculateAlignment(triggerWidth, tooltipWidth, align)
  } else {
    top += calculateAlignment(triggerHeight, tooltipHeight, align)
    left +=
      (position === 'left' ? -tooltipWidth : triggerWidth) + sign * offsetX
  }

  return { left, top }
}

export const isParentOf = (parent, el) => {
  let toCheck = el

  while (toCheck) {
    if (toCheck === parent) {
      return true
    }
    toCheck = toCheck.parentNode
  }

  return false
}

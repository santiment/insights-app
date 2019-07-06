const defaultMoveClb = (target, value) => target < value
const defaultCheckClb = (target, value) => target === value

export const binarySearch = ({
  moveClb = defaultMoveClb,
  checkClb = defaultCheckClb,
  array,
  target,
}) => {
  let start = 0
  let stop = array.length - 1
  let middle = Math.floor(stop / 2)
  let value = array[middle]

  while (start < stop) {
    if (checkClb(target, value)) {
      break
    }

    if (moveClb(target, value)) {
      stop = middle - 1
    } else {
      start = middle + 1
    }

    middle = Math.floor((start + stop) / 2)
    value = array[middle]
  }

  return {
    value: checkClb(target, value) ? value : undefined,
    index: middle,
  }
}

const moveDatetimes = (target, { datetime }) =>
  new Date(target) < new Date(datetime)

const checkDatetimes = (target, { datetime }) => {
  const a = new Date(target)
  const b = new Date(datetime)

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getYear() === b.getYear()
  )
}

export const binarySearchByDatetime = (array, target) => {
  return binarySearch({
    moveClb: moveDatetimes,
    checkClb: checkDatetimes,
    array,
    target,
  })
}

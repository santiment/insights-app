export const debounce = (fn, time) => {
  let timer

  return [
    (...args) => {
      clearTimeout(timer)
      timer = setTimeout(fn.bind(...args), time)
    },
    timer,
  ]
}

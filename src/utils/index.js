export const mergeTimeseriesByKey = ({
  timeseries,
  key: mergeKey = 'datetime',
  mergeData = (longestTSData, timeserieData) =>
    Object.assign({}, longestTSData, timeserieData),
}) => {
  const longestTSMut = timeseries.reduce((acc, val) => {
    return acc.length > val.length ? acc : val
  }, [])

  const longestTS = longestTSMut.slice()
  let longestTSLastIndex = longestTS.length - 1

  for (const timeserie of timeseries) {
    if (timeserie === longestTSMut) {
      continue
    }

    let longestTSRightIndexBoundary = longestTSLastIndex
    let timeserieRightIndex = timeserie.length - 1

    if (timeserieRightIndex < 0) {
      continue
    }

    for (; timeserieRightIndex > -1; timeserieRightIndex--) {
      for (; longestTSRightIndexBoundary > -1; longestTSRightIndexBoundary--) {
        const longestTSData = longestTS[longestTSRightIndexBoundary]
        const timeserieData = timeserie[timeserieRightIndex]

        if (longestTSData[mergeKey] === timeserieData[mergeKey]) {
          longestTS[longestTSRightIndexBoundary] = mergeData(
            longestTSData,
            timeserieData,
          )

          longestTSRightIndexBoundary--
          break
        }

        const longestDate = new Date(longestTSData[mergeKey])
        if (longestDate < new Date(timeserieData[mergeKey])) {
          const timeserieFirstUnfoundIndex = timeserieRightIndex

          timeserieRightIndex--

          while (
            timeserieRightIndex > 0 &&
            longestDate < new Date(timeserie[timeserieRightIndex][mergeKey])
          ) {
            timeserieRightIndex--
          }

          if (timeserieRightIndex < 0) {
            break
          }

          longestTS[longestTSRightIndexBoundary] = mergeData(
            longestTSData,
            timeserie[timeserieRightIndex],
          )

          longestTS.splice(
            longestTSRightIndexBoundary + 1,
            0,
            ...timeserie.slice(
              timeserieRightIndex + 1,
              timeserieFirstUnfoundIndex + 1,
            ),
          )

          longestTSLastIndex = longestTS.length - 1

          timeserieRightIndex--

          if (timeserieRightIndex < 0) {
            break
          }
        }
      }

      if (longestTSRightIndexBoundary === -1) {
        break
      }
    }
  }

  return longestTS
}

import { writable } from 'svelte/store'
import { InsightSorter } from '@/utils/insights'

function createInsightSorterStore() {
  const { subscribe, set } = writable()

  return {
    subscribe,
    set(sorter) {
      set(InsightSorter[sorter])
    },
  }
}

export const insightSorter = createInsightSorterStore()

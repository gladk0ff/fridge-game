import { ref } from 'vue'
import { getAllStatistics, saveStatistics } from '@S/api'
import { createFakeStatistic } from '@S/utils'
import type { IUserStatistic } from '@S/type'

interface IUsersStatisticList {
  items: IUserStatistic[]
  updating: boolean
  filters: 'all' | 'currentUser'
}

export const statistic = ref<IUsersStatisticList>({
  items: [],
  updating: false,
  filters: 'all'
})

export const addStatisticItem = async (data: IUserStatistic) => {
  await saveStatistics(data)
  statistic.value.items.push(data)
}

export const loadStatistic = async () => {
  statistic.value.updating = true
  statistic.value.items = await getAllStatistics()
  statistic.value.items.push(...createFakeStatistic())
  statistic.value.updating = false
}

import type { IUserStatistic } from './store/statistic'
import { sleep } from './utils'

export const saveStatistics = async (data: IUserStatistic) => {
  await sleep(2000)
  let statistics = localStorage.getItem('statistics')
  const statisticsData: IUserStatistic[] = statistics ? JSON.parse(statistics) : []
  statisticsData.push(data)
  localStorage.setItem('statistics', JSON.stringify(statisticsData))
  return data
}

export const getAllStatistics = async () => {
  await sleep(2000)
  let statistics = localStorage.getItem('statistics')
  return statistics ? JSON.parse(statistics) : []
}

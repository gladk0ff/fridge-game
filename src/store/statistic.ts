import { ref } from 'vue'
import type { IUser } from './auth'
import type { IGame } from './game'
import { getAllStatistics, saveStatistics } from '@S/api'
import { getRandomNumber } from '@S/utils'

interface IStatistic extends Pick<IGame, 'score' | 'time'> {}

export interface IUserStatistic {
  user: IUser
  statistic: IStatistic
}

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
  statistic.value.items = await getAllStatistics()
  statistic.value.items.push(...FAKE_STATISTIC)
}

const FAKE_STATISTIC: IUserStatistic[] = [
  'Петя',
  'Петя',
  'Петя',
  'Вжик123',
  'Вжик123',
  'Вжик123',
  'test4',
  'test1',
  '000asd',
  '000asd',
  '000asd'
].map((name) => {
  return {
    statistic: {
      score: getRandomNumber(1, 5),
      time: parseFloat(`${getRandomNumber(1, 20)}.${getRandomNumber(0, 10)}`)
    },
    user: {
      id: Math.random(),
      name
    }
  }
})

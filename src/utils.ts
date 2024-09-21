import type { IUserStatistic } from './type'

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getRandomNumber(minValue: number, maxValue: number) {
  if (minValue > maxValue) {
    // Перестановка minValue и maxValue, если minValue больше maxValue
    let temp = minValue
    minValue = maxValue
    maxValue = temp
  }

  // Генерация случайного числа между minValue и maxValue
  const range = maxValue - minValue + 1 // Разница между maxValue и minValue плюс 1
  const randomNumber = Math.floor(Math.random() * range) + minValue
  return randomNumber
}

export const createFakeStatistic = (): IUserStatistic[] => {
  const names = [
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
  ]
  return names.map((name) => {
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
}

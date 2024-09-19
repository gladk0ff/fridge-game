import { ref, type Ref, watch } from 'vue'
import type { IUser } from './auth'

interface IFood {
  id: number
  title: string
}

interface IGame {
  user: IUser | null
  score: number
  gameSet: IFood[]
  start: boolean
  time: number
  result: IFood[]
}

export const game = ref<IGame>({
  user: null,
  score: 0,
  start: false,
  gameSet: [],
  result: [],
  time: 0
})

let pinnedTime: number
let timerId: number
let elapsed = 0

watch(
  () => game.value.start,
  (start) => {
    if (start) {
      game.value.gameSet = generateGameSet()
      game.value.score = 0
      game.value.time = 0
    } else {
      // startTimer()
    }
  }
)

watch(
  () => game.value.result,
  (result) => {
    if (result.length === game.value.gameSet.length) stopTimer()
  }
)

export const startGame = (user: IUser) => {
  game.value.user = user
  game.value.start = true
}

export const stopGame = () => {
  game.value.start = false
}

const startTimer = () => {
  pinnedTime = performance.now()
  timerId = setInterval(() => {
    elapsed = performance.now() - pinnedTime
  }, 100)
}

const stopTimer = () => {
  clearInterval(timerId)
  game.value.score = calcResult()
  game.value.time = parseFloat((elapsed / 1000).toFixed(1))
}

const calcResult = () => {
  return game.value.gameSet.reduce((acc, item) => {
    const isRight = game.value.gameSet.includes(item)
    if (isRight) acc += 1
    else acc -= 1
    return acc
  }, 0)
}

export const generateGameSet = () => {
  const result: IFood[] = []
  while (result.length < 5) {
    const randomIndex = Math.floor(Math.random() * foodCollection.length)
    if (!result.includes(foodCollection[randomIndex])) {
      result.push(foodCollection[randomIndex])
    }
  }
  return result
}

const foodCollection: IFood[] = [
  {
    id: 1,
    title: 'Сосиски'
  },
  {
    id: 2,
    title: 'Борщ'
  },
  {
    id: 3,
    title: 'Котлеты'
  },
  {
    id: 4,
    title: 'Арбуз'
  },
  {
    id: 5,
    title: 'Киви'
  },
  {
    id: 6,
    title: 'Сок'
  },
  {
    id: 7,
    title: 'Рыба'
  },
  {
    id: 8,
    title: 'Cыр'
  },
  {
    id: 9,
    title: 'Макароны'
  },
  {
    id: 10,
    title: 'Колбаса'
  }
]

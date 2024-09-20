import { ref, type Ref, watch } from 'vue'
import type { IUser } from './auth'

interface IFood {
  id: number
  title: string
}

export enum GameState {
  NEW = 'NEW',
  START = 'START',
  FINISHED = 'FINISHED',
  MEMORISED = 'MEMORISED'
}

export interface IGame {
  user: IUser | null
  score: number
  gameSet: IFood[]
  time: number
  result: IFood[]
  state: GameState
}

export const game = ref<IGame>({
  user: null,
  score: 0,
  state: GameState.NEW,
  gameSet: [],
  result: [],
  time: 0
})

let pinnedTime: number
let timerId: number
let elapsed = 0

watch(
  () => game.value.result.length,
  (result) => {
    if (result && result === game.value.gameSet.length) stopMemorise()
  }
)

export const addUserToGame = (user: IUser) => {
  game.value.user = user
}

export const startMemorise = () => {
  game.value.state = GameState.MEMORISED
  startTimer()
}

export const stopMemorise = () => {
  game.value.state = GameState.FINISHED
  stopTimer()
  game.value.score = calcResult()
  game.value.time = parseFloat((elapsed / 1000).toFixed(1))
}

export const resetGame = () => {
  game.value.state = GameState.NEW
  game.value.score = 0
  game.value.time = 0
  game.value.result = []
}

export const startGame = () => {
  if (game.value.state !== GameState.NEW) return
  game.value.gameSet = generateGameSet()
  game.value.state = GameState.START
}

const startTimer = () => {
  pinnedTime = performance.now()
  timerId = setInterval(() => {
    elapsed = performance.now() - pinnedTime
  }, 100)
}

const stopTimer = () => {
  clearInterval(timerId)
}

const calcResult = () => {
  return game.value.result.reduce((acc, item) => {
    const isRight = game.value.gameSet.find((r) => r.id === item.id)
    if (isRight) acc += 1
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

export const chooseFood = (food: IFood) => {
  game.value.result.push(food)
}

export const foodCollection: IFood[] = [
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

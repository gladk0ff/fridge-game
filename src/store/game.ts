import { computed, ref, watch } from 'vue'
import type { IFood, IUser } from '@S/type'
import { FOOD_COOLECTION, GameState } from '@S/constants'

export interface IGame {
  user: IUser | null
  score: number
  gameSet: IFood[]
  time: number
  result: IFood[]
  state: GameState
}

let pinnedTime: number
let timerId: number
let elapsed = 0

export const game = ref<IGame>({
  user: null,
  score: 0,
  state: GameState.NEW,
  gameSet: [],
  result: [],
  time: 0
})

watch(
  () => game.value.result.length,
  (result) => {
    if (result && result === game.value.gameSet.length) stopMemorise()
  }
)

export const isNew = computed(() => game.value.state === GameState.NEW)
export const isStart = computed(() => game.value.state === GameState.START)
export const isMemorise = computed(() => game.value.state === GameState.MEMORISED)
export const isFinished = computed(() => game.value.state === GameState.FINISHED)


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

export const generateGameSet = () => {
  const result: IFood[] = []
  while (result.length < 5) {
    const randomIndex = Math.floor(Math.random() * FOOD_COOLECTION.length)
    if (!result.includes(FOOD_COOLECTION[randomIndex])) {
      result.push(FOOD_COOLECTION[randomIndex])
    }
  }
  return result
}

export const chooseFood = (food: IFood) => {
  game.value.result.push(food)
}

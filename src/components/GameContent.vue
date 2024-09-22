<script setup lang="ts">
import { FOOD_COOLECTION, GameState } from '@S/constants'
import { computed, ref, watch, type Ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import { addStatisticItem } from '@S/store/statistic'
import type { IFood } from '@S/type'
import type { IGame } from '@S/store/game'

const { game, isStart } = defineProps<{
  game: IGame
  isFinished: boolean
  isMemorise: boolean
  isStart: boolean
}>()
const emit = defineEmits(['startMemorise', 'chooseFood', 'resetGame'])

let roundTimer: number
const roundLimit = ref(0)
const ROUND_LIMIT = 3

watch(
  () => game.state,
  (state) => {
    console.log('game.state', game.state)

    if (state === GameState.START) {
      roundLimit.value = ROUND_LIMIT
      roundTimer = setInterval(() => {
        roundLimit.value--
      }, 1000)
    }
    if (state === GameState.FINISHED) {
      const { user, score, time } = game
      if (user)
        addStatisticItem({
          user,
          statistic: { score, time }
        })
    }
  }
)

watch(roundLimit, (val) => {
  if (!val) {
    clearInterval(roundTimer)
    roundLimit.value = ROUND_LIMIT
    emit('startMemorise')
  }
})

const filtredAllFood = computed(() => {
  return FOOD_COOLECTION.filter((f) => {
    return !game.result.find((r) => f.id === r.id)
  })
})

const isValidFood = (food: IFood) => {
  return game.gameSet.find((f) => f.id === food.id)
}
</script>

<template>
  <div class="content">
    <template v-if="isStart">
      <h1>Обратный отсчет:</h1>
      <span class="timer">{{ roundLimit }}</span>
    </template>

    <template v-else-if="isMemorise">
      <h1>Так что же было в холодельнике?(мин. 6 ;)</h1>
      <div class="food-collection-all">
        <TransitionGroup tag="div" name="list" class="food-collection">
          <div
            v-for="food of filtredAllFood"
            @click="$emit('chooseFood', food)"
            class="food"
            :key="food.id"
          >
            {{ food.title }}
          </div>
        </TransitionGroup>
      </div>
      <div class="food-collection-result">
        <TransitionGroup
          class="food-collection choosen"
          tag="div"
          name="list"
          v-if="game.result.length"
        >
          <div v-for="food of game.result" class="food" :key="food.id">
            {{ food.title }}
          </div>
        </TransitionGroup>
      </div>
    </template>

    <template v-else-if="isFinished">
      <h1>Итак, что тут у нас :</h1>
      <div class="food-collection">
        <div v-for="food of game.result" class="food" :class="{ wrong: !isValidFood(food) }">
          {{ food.title }}
        </div>
      </div>

      <div class="result">
        <h2>
          ИТОГО:<span class="description">
            {{ game.score }} из {{ game.gameSet.length }} за {{ game.time }}c</span
          >
        </h2>
        <div class="actions">
          <Button label="Еще раз" icon="pi pi-refresh" size="large" @click="$emit('resetGame')" />
          <RouterLink :to="{ name: 'statistics' }">
            <Button
              label="Посмотреть Статистику"
              icon="pi pi-chart-bar"
              text
              size="large"
              severity="help"
            />
          </RouterLink>
        </div>
      </div>
    </template>

    <template v-else>
      <h1>Нажми на холодельник !!</h1>
      <ul class="description">
        <li>
          После того как будет открыт холодильник у Тебя будет некоторое время чтобы запомнить
          продукты!
        </li>
        <li>Потом проверимнасколько Ты хорош в этом =)</li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.food-collection-all {
  min-height: 13rem;
}
.food-collection-result {
  min-height: 5rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

h1 {
  font-size: 4rem;
  background-color: var(--p-yellow-500);
  padding: 1rem;
}

h2 {
  margin: 0;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.result {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}
.choosen {
  margin-top: 1rem;
}
.choosen .food {
  border-color: var(--p-blue-500);
}

.food-collection {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wrong {
  color: white;
  background-color: var(--p-red-300);
}

.description {
  font-size: 2.5rem;
  padding: 1rem;
  background-color: var(--p-yellow-300);
  border: 8px dotted var(--p-yellow-500);
  margin: 0;
  padding-left: 3rem;
}

.timer {
  font-size: 10rem;
  text-align: center;
  font-weight: bold;
  color: var(--p-red-500);
}
</style>

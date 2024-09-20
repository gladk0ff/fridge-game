<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { authStore } from '@S/store/auth'
import { addStatisticItem } from '@S/store/statistic'
import { useRouter, RouterLink } from 'vue-router'
import Divider from 'primevue/divider'
import Button from 'primevue/button'
import {
  startGame,
  game,
  addUserToGame,
  GameState,
  startMemorise,
  foodCollection,
  chooseFood,
  resetGame
} from '@S/store/game'
import FridgeClose from '@S/assets/fridge-close.png'
import FridgeOpen from '@S/assets/fridge-open.png'

let roundTimer
const roundLimit = ref(0)
const ROUND_LIMIT = 3

onMounted(() => {
  addUserToGame(authStore.value.user)
  resetGame()
})

watch(
  () => game.value.state,
  (state) => {
    if (state === GameState.START) {
      roundLimit.value = ROUND_LIMIT
      roundTimer = setInterval(() => {
        roundLimit.value--
      }, 1000)
    }
    if (state === GameState.FINISHED) {
      const { user, score, time } = game.value
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
    startMemorise()
  }
})

const isNew = computed(() => game.value.state === GameState.NEW)
const isStart = computed(() => game.value.state === GameState.START)
const isMemorise = computed(() => game.value.state === GameState.MEMORISED)
const isFinished = computed(() => game.value.state === GameState.FINISHED)

console.log('game.value.state', game.value.state)

const filtredAllFood = computed(() => {
  return foodCollection.filter((f) => {
    return !game.value.result.find((r) => f.id === r.id)
  })
})

const isValidFood = (food) => {
  return game.value.gameSet.find((f) => f.id === food.id)
}
</script>

<template>
  <div class="container">
    <div class="content">
      <template v-if="isStart">
        <h1>Обратный отсчет:</h1>
        <span class="timer">{{ roundLimit }}</span>
      </template>

      <template v-else-if="isMemorise">
        <h1>Так что же было в холодельнике?(мин. 6 ;)</h1>
        <div class="food-collection">
          <div v-for="(food, index) of filtredAllFood" @click="chooseFood(food)" class="food">
            {{ food.title }}
          </div>
        </div>
        <template v-if="game.result.length">
          <div class="food-collection choosen">
            <div v-for="(food, index) of game.result" class="food">
              {{ food.title }}
            </div>
          </div>
        </template>
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
            <Button label="Еще раз" icon="pi pi-refresh" size="large" @click="resetGame" />
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

    <div class="fridge">
      <img v-show="isNew || isMemorise" :src="FridgeClose" alt="" @click="startGame" />
      <img v-show="isStart || isFinished" :src="FridgeOpen" alt="" />
      <div v-if="isStart || isFinished" class="food-set">
        <div v-for="food of game.gameSet" class="food">
          {{ food.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 4rem;
  background-color: var(--p-yellow-500);
  padding: 1rem;
}

.container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  max-width: 130rem;
  gap: 2rem;
  margin-top: 1rem;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.fridge {
  flex: 0.8;
  /* width: 620px; */
  width: 62rem;
  display: flex;
  align-items: center;
  padding-left: 4rem;
}

img {
  max-width: 100%;
  /* max-height: 700px; */
  max-height: 36rem;
  object-fit: contain;
}

.food-set {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-left: 3rem;
}

.food {
  padding: 0.5rem 1rem;
  background-color: var(--p-blue-200);
  font-size: 2rem;
  color: var(--p-yellow-900);
  font-weight: bold;
  border: 4px dashed var(--p-yellow-900);
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

.food-collection {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.wrong {
  color: white;
  background-color: var(--p-red-300);
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
</style>

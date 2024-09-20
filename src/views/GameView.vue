<script setup>
import { ref, watch } from 'vue'
import { authStore } from '@S/store/auth'
import { startGame, stopGame, game } from '@S/store/game'
import FridgeClose from '@S/assets/fridge-close.png'
import FridgeOpen from '@S/assets/fridge-open.png'

let roundTimer
const roundLimit = ref(0)
const ROUND_LIMIT = 3

watch(
  () => game.value.start,
  (start) => {
    if (start) {
      console.log('start', start)
      roundLimit.value = ROUND_LIMIT
      roundTimer = setInterval(() => {
        roundLimit.value--
      }, 1000)
    }
  }
)

watch(roundLimit, (val) => {
  if (!val) {
    clearInterval(roundTimer)
    stopGame()
    roundLimit.value = ROUND_LIMIT
  }
})
</script>

<template>
  <div class="container">
    <div class="content">
      <template v-if="game.start">
        <h1>Обратный отсчет:</h1>
        <span class="timer">{{ roundLimit }}</span>
      </template>

      <template v-else>
        <h1 v-if="!game.start">Нажми на холодельник !!</h1>
        <p class="description">
          ==> После того как будет открыт холодильник у Тебя будет некоторе время чтобы запомнить
          некоторые продукты!
          <br />
          ==> Потом проверить насколько Ты хорош в этом =)
        </p>
      </template>
    </div>

    <div class="fridge">
      <img v-show="game.start" :src="FridgeClose" alt="" @click="startGame(authStore.user)" />
      <img v-show="!game.start" :src="FridgeOpen" alt="" @click="startGame" />
      <div v-if="!game.start" class="food-set">
        <div v-for="(food, index) of game.gameSet" class="food">{{ food.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 5rem;
  background-color: var(--p-yellow-500);
  padding: 1rem;
}

.container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  max-width: 1300px;
  gap: 2rem;
}

.content {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 3rem;
  height: 100%;
}

.fridge {
  flex: 0.9;
  width: 620px;

  display: flex;
  align-items: center;
}

img {
  max-width: 100%;
  max-height: 700px;
  object-fit: contain;
}

.food-set {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-left: 4rem;
}

.food {
  padding: 1rem 2rem;
  background-color: var(--p-blue-200);
  font-size: 2rem;
  color: var(--p-yellow-900);
  font-weight: bold;
  border: 4px dashed var(--p-yellow-900);
}

.description {
  font-size: 3rem;
  padding: 1rem;
  background-color: var(--p-yellow-300);
  border: 8px dotted var(--p-yellow-500);
  margin: 0;
}

.timer {
  font-size: 10rem;
  text-align: center;
  font-weight: bold;
  color: var(--p-red-500);
}
</style>

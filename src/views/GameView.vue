<script setup>
import { startGame, stopGame, game, generateGameSet } from '_src/store/game'
import { authStore } from '_src/store/auth'
import { computed, ref, watch } from 'vue'

import FridgeClose from '_src/assets/fridge-close.png'
import FridgeOpen from '_src/assets/fridge-open.png'

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
    <h1>{{ game.start ? 'Обратный отсчет:' : 'Нажми на  холодельник ' }}</h1>
    <div>
      <div class="timer">
        <h2 v-show="game.start">{{ roundLimit }}</h2>
      </div>
      <div class="fridge">
        <img v-show="game.start" :src="FridgeClose" alt="" @click="startGame(authStore.user)" />
        <img v-show="!game.start" :src="FridgeOpen" alt="" @click="startGame" />
        <div v-if="!game.start" class="food-set">
          <div v-for="food of game.gameSet" class="food">
            {{ food.title }}
          </div>
        </div>
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
}

.fridge {
  width: 600px;

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
  padding: 1rem;
  background-color: var(--p-blue-200);
  font-size: 2rem;
}
</style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { authStore } from '@S/store/auth'

import {
  startGame,
  game,
  addUserToGame,
  startMemorise,
  chooseFood,
  resetGame,
  isFinished,
  isMemorise,
  isNew,
  isStart
} from '@S/store/game'
import FridgeClose from '@S/assets/fridge-close.png'
import FridgeOpen from '@S/assets/fridge-open.png'
import GameContent from '@S/components/GameContent.vue'
import type { IFood } from '@S/type'

onMounted(() => {
  authStore.value.user && addUserToGame(authStore.value.user)
  resetGame()
})
</script>

<template>
  <div class="container">
    <GameContent
      :game="game"
      :isStart="isStart"
      :isFinished="isFinished"
      :isMemorise="isMemorise"
      @startMemorise="startMemorise()"
      @chooseFood="(f: IFood) => chooseFood(f)"
      @resetGame="resetGame()"
    />
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
.container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  max-width: 130rem;
  gap: 2rem;
  margin-top: 1rem;
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
</style>

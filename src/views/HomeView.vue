<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { signOut } from '@S/store/auth'
import { computed } from 'vue'
import BackButton from '@S/components/BackButton.vue'

const router = useRouter()
const route = useRoute()
const isHomeRoute = computed(() => route.name === 'base')

const handleSingOut = () => {
  signOut()
  router.push({ name: 'signUp' })
}
</script>

<template>
  <div class="container">
    <header>
      <Avatar label="P" class="mr-2" size="xlarge" />
      <Button
        class="logout-button"
        icon="pi pi-sign-out"
        severity="secondary"
        text
        aria-label="sing-out"
        size="large"
        @click="handleSingOut"
      />
    </header>
    <main>
      <div v-if="!isHomeRoute" class="back-button-container">
        <BackButton />
      </div>
      <RouterView />
    </main>
    <footer>сделал gladk0ff</footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: inherit;
  height: inherit;
  background: var(--p-blue-100);
}

main {
  padding: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--p-yellow-600);
  width: 100%;
  padding: 1rem;
}

footer {
  background: var(--p-yellow-800);
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: end;
  color: var(--p-yellow-50);
  font-weight: bold;
  font-size: 1rem;
}

.back-button-container {
  position: absolute;
  left: 1rem;
  top: 7rem;
}

.logout-button {
  width: 6rem;
}
.logout-button ::v-deep span {
  font-size: 2rem;
}
</style>

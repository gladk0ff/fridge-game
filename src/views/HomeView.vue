<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import { signOut } from '_src/store/auth'
import { computed } from 'vue'
import BackButton from '_src/components/BackButton.vue'

const router = useRouter()
const route = useRoute()

console.log('route', route)

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
    <footer>gladk0ff</footer>
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
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  background: var(--p-yellow-600);
  width: 100%;
  padding: 2rem;
}

footer {
  height: 100px;
  background: var(--p-yellow-800);
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: end;
}

.back-button-container {
  position: absolute;
  left: 32px;
  top: 120px;
}

.logout-button {
  width: 64px;
}
.logout-button ::v-deep span {
  font-size: 2rem;
}
</style>

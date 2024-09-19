<script setup>
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'

const menus = [
  {
    link: '/game',
    name: 'Играть'
  },
  {
    link: '/statistics',
    name: 'Статистика'
  },
  {
    link: '/rules',
    name: 'Правила'
  },
  {
    link: '/about',
    name: 'О проекте'
  }
]
</script>
<template>
  <nav>
    <RouterLink v-for="menu of menus" :to="menu.link">
      <Button class="button" size="large">{{ menu.name }}</Button>
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

button {
  font-size: 3rem;
  width: 100%;
  padding: 1rem 3rem;
}
</style>

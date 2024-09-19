<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <nav>
    <RouterLink to="/game">
      <Button>Играть</Button>
    </RouterLink>
    <RouterLink to="/statistics">Статистика</RouterLink>
    <RouterLink to="/rules">Правила</RouterLink>
    <RouterLink to="/about">О проекте</RouterLink>
  </nav>
</template>

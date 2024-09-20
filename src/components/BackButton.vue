<script setup>
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const goBack = () => {
  router.push({ name: 'base' })
}
</script>

<template>
  <Button class="back-button" icon="pi pi-caret-left" size="large" @click="goBack"></Button>
</template>

<style lang="css" scoped>
.back-button {
  width: 65px;
}

.back-button ::v-deep span {
  font-size: 2rem;
}
</style>

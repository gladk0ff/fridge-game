<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import FloatLabel from 'primevue/floatlabel'
import { ref, computed } from 'vue'
import { signUp } from '@S/store/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const submitting = ref(false)

const isValid = computed(() => {
  return name.value && name.value.length > 4
})

const login = () => {
  submitting.value = true
  if (isValid.value) {
    signUp(name.value)
    router.push('/')
    submitting.value = true
  }
}
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <h1>Добро пожаловать в Холодильник</h1>

      <form class="content" @submit.prevent="login">
        <FloatLabel class="lable">
          <InputText
            size="large"
            id="username"
            v-model="name"
            required
            :invalid="submitting && !isValid"
          />
          <label for="username">Ваше Имя</label>
        </FloatLabel>
        <small v-if="submitting && !isValid" id="username-help">Минимум 4 символа</small>
        <Button label="войти" severity="success" rounded type="submit" class="action" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  background: var(--p-yellow-600);
}

.wrapper {
  background: var(--p-blue-100);
  padding: 2rem;
  border-radius: 0.5rem;
}

h1 {
  margin-top: 0;
  margin-bottom: 3rem;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.content button {
  width: 100%;
}

.lable {
  display: flex;
  flex-direction: column;
  width: 100%;
}

small {
  text-transform: uppercase;
  color: var(--p-red-600);
  font-weight: bold;
}

.action {
  text-transform: uppercase;
}
</style>

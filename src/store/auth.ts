import { ref, type Ref, watch } from 'vue'

export interface IUser {
  id: number
  name: string
}
export interface AuthStore {
  user: IUser | null
  isAuth: boolean
}

export const authStore: Ref<AuthStore> = ref({
  user: null,
  isAuth: false
})

watch(
  () => authStore.value.user,
  (user) => (authStore.value.isAuth = !!user)
)

export const checkAuth = () => {
  const user = localStorage.getItem('user')
  if (user) {
    authStore.value.user = JSON.parse(user)
  }
}

export const signUp = (name: string) => {
  authStore.value.user = {
    id: Math.random(),
    name
  }
  localStorage.setItem('user', JSON.stringify(authStore.value.user))
}

export const signOut = () => {
  authStore.value.user = null
  localStorage.removeItem('user')
}

export const changeUserName = (name: string) => {
  if (authStore.value.user) {
    authStore.value.user.name = name
  }
}

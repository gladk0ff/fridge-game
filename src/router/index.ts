import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../store/auth'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import MainView from '../views/MainView.vue'
import AboutView from '../views/AboutView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import GameView from '@S/views/GameView.vue'
import RulesView from '@S/views/RulesView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'base',
          component: MainView
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   component: AboutView
        // },
        {
          path: '/statistics',
          name: 'statistics',
          component: StatisticsView
        },
        {
          path: '/game',
          name: 'game',
          component: GameView
        },
        {
          path: '/rules',
          name: 'rules',
          component: RulesView
        }
      ]
    },
    {
      path: '/sign-up',
      name: 'signUp',
      beforeEnter: () => {
        if (authStore.value.isAuth) return { name: 'base' }
      },
      component: SignUp
    }
  ]
})

router.beforeEach(async (to) => {
  if (!authStore.value.isAuth && to.name !== 'signUp') {
    return { name: 'signUp' }
  }
})

export default router

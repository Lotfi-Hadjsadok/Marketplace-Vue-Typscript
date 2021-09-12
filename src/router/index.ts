import { auth } from '@/firebase'
import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    meta: {
      requiresAuth: true,
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresAuth: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requiresAuth: false,
    },
    component: Register
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      const user = store.getters.user;
      if (user?.uid == auth.currentUser.uid) {
        next()
      } else {

        auth.signOut().then(
          () => {
            store.commit('SET_USER', null)
            next('/login')
          }
        )
      }
    } else {
      store.commit("SET_USER", null);
      next('/login')
    }
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth == false)) {
      if (auth.currentUser) {
        next('/')
      } else {
        next()
      }

    }
  }

})
export default router

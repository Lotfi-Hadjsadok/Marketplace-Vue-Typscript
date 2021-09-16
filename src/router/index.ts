import { auth } from '@/firebase'
import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Product from '../views/Product.vue'
import NotFound from '../views/NotFound.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'
import Stats from '../views/admin/Stats.vue'

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
    path: '/admin',
    meta: {
      requiresAdmin: true,
    },
    component: AdminDashboard,
    children: [
      {
        path: '/',
        meta: {
          title: 'Dashboard'
        },
        name: 'admin-dashboard',
        component: Stats
      }
    ]
  },

  {
    path: '/product/:uid/:id/:title',
    name: 'product-employee',
    meta: {
      requiresAuth: true,
    },
    component: Product
  },
  {
    path: '/product/:id/:title',
    name: 'product',
    meta: {
      requiresAuth: true,
    },
    component: Product
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresNotAuth: true
    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requiresNotAuth: true,
    },
    component: Register
  },
  {
    path: '/404',
    name: 'not-found',
    meta: {
      requiresAuth: true,
    },
    component: NotFound
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (auth.currentUser) {
      const user = store.getters.user;
      if (user?.uid == auth.currentUser.uid) {
        if (user.role === 'admin') {
          next()
        } else {
          next('/')
        }
      } else {
        auth.signOut().then(
          () => {
            store.commit('SET_USER', null)
            next('/login')
          }
        )
      }
    } else {
      next('/login')
    }
  }
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
  }
  if (to.matched.some((record) => record.meta.requiresNotAuth)) {
    if (auth.currentUser) {
      next('/')
    } else {
      next()
    }

  }


})
export default router

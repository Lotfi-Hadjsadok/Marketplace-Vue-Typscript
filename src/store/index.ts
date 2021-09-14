import { Cart } from './modules/cart/cart';
import { Products } from './modules/products/products';
import { Auth } from './modules/user/user';
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types'

import createPersistedState from "vuex-persistedstate";
import SecureLS from 'secure-ls';
const ls = new SecureLS({ isCompression: false });

export const userLocal = createPersistedState<any>({
  key: 'user',
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
  paths: ['Auth.user']
})
export const cartLocal = createPersistedState<any>({
  key: 'cart',
  storage: {
    getItem: (key) => ls.get(key),
    setItem: (key, value) => ls.set(key, value),
    removeItem: (key) => ls.remove(key),
  },
  paths: ['Cart.cart']
})





Vue.use(Vuex)

const store: StoreOptions<RootState> = ({
  plugins: [userLocal, cartLocal],

  modules: {
    Auth,
    Products,
    Cart
  }
})
export default new Vuex.Store(store)
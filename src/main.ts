import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from './firebase'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.config.productionTip = false
let app: any
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }
    ).$mount('#app')
  }
})


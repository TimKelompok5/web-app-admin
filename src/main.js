import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import {useApi} from "@/utils/api"

import Notification  from "vue-notification"

Vue.config.productionTip = false
Vue.use(Notification)

useApi().setup()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/module/auth.js"
import user from "@/store/module/user.js"
import podcast from "@/store/module/podcast.js"

import {getCurrentInstance} from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    podcast
  },
})

const useStore = () => {
  const vm = getCurrentInstance().proxy
  return vm.$store;
}

export {
  store,
  useStore
}
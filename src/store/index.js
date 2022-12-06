import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/module/auth.js"
import device from "@/store/module/device.js"
import hospital from "@/store/module/hospital.js"
import userhospital from "@/store/module/userhospital.js"
import apikey from "@/store/module/apikey.js"
import questionnaire from "@/store/module/questionnaire.js"
import user from "@/store/module/user.js"

import {getCurrentInstance} from "vue"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    device,
    hospital,
    userhospital,
    apikey,
    questionnaire,
    user
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
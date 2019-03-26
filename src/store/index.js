import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import auth from "./modules/auth";
import app from "./modules/app";
import paket from "./modules/paket";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, app, paket },
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      paths: ["auth.user"]
    })
  ]
});

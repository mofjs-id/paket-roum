import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/vuetify";
import { auth } from "./plugins/firebase";
import "./registerServiceWorker";

auth.onAuthStateChanged(user => {
  if (user) store.commit("setUser", user);
  if (!store.state.app.isReady) store.commit("setReady");
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

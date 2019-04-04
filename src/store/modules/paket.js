import { functions } from "../../plugins/firebase";

const state = {
  pakets: [],
  lastUpdate: null,
  isUpdating: false
};

const getters = {
  newPakets: state => state.pakets.filter(paket => !!paket.received),
  oldPakets: state => state.pakets.filter(paket => !paket.received)
};

const mutations = {
  setPaket(state, pakets) {
    state.pakets = pakets;
  },
  setLastUpdate(state, lastUpdate) {
    state.lastUpdate = lastUpdate;
  },
  setIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating;
  }
};

const actions = {
  cekPaket({ state, dispatch }) {
    if (!state.lastUpdate || state.lastUpdate < Date.now() + 5 * 60 * 1000)
      dispatch("getPaket");
  },
  getPaket({ commit }) {
    const getPaket = functions.httpsCallable("getPaket");
    commit("setIsUpdating", true);
    return getPaket()
      .then(result => result.data)
      .then(paket => {
        commit("setPaket", paket);
      })
      .finally(() => {
        commit("setIsUpdating", false);
        commit("setLastUpdate", Date.now());
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

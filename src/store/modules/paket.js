import { functions } from "../../plugins/firebase";

const state = {
  paket: []
};

const mutations = {
  setPaket(state, paket) {
    state.paket = paket;
  }
};

const actions = {
  getPaket({ commit, dispatch }) {
    const getPaket = functions.httpsCallable("getPaket");
    dispatch("pendingPromise", getPaket())
      .then(result => result.data)
      .then(paket => {
        console.log(paket);
        commit("setPaket", paket);
      });
  }
};

export default {
  state,
  mutations,
  actions
};

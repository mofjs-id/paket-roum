const state = {
  isPending: false,
  isReady: false
};

const mutations = {
  setPending(state, isPending) {
    state.isPending = isPending;
  },
  setReady(state) {
    state.isReady = true;
  }
};

const actions = {
  pendingPromise({ commit }, promise) {
    commit("setPending", true);
    return promise.finally(() => {
      commit("setPending", false);
    });
  }
};

export default {
  state,
  mutations,
  actions
};

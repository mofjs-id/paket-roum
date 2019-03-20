const state = {
  isPending: false
};

const mutations = {
  setPending(state, isPending) {
    state.isPending = isPending;
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

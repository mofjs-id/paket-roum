import firebase, { auth } from "../../plugins/firebase";

const state = {
  user: {},
  phoneNumber: null,
  verificationId: null
};

const mutations = {
  setUser(state, user) {
    state.user.id = user.id;
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  setVerificationId(state, verificationId) {
    state.verificationId = verificationId;
  }
};

const actions = {
  sendVerificationCode({ state, commit, dispatch }, captchaVerifier) {
    return dispatch(
      "pendingPromise",
      auth.signInWithPhoneNumber(state.phoneNumber, captchaVerifier)
    ).then(confirmationResult => {
      commit("setVerificationId", confirmationResult.verificationId);
    });
  },
  signInWithCode({ state, commit, dispatch }, code) {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      state.verificationId,
      code
    );
    return dispatch(
      "pendingPromise",
      auth.signInAndRetrieveDataWithCredential(credential)
    ).then(userCredential => {
      commit("setUser", userCredential);
    });
  }
};

export default {
  state,
  mutations,
  actions
};

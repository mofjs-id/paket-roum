import firebase from "../../plugins/firebase";

const state = {
  user: {
    uid: null,
    displayName: null,
    phoneNumber: null,
    photoURL: null
  },
  phoneNumber: null,
  verificationId: null
};

const getters = {
  isLoggedIn: state => !!state.user.uid,
  isCodeSend: state => !!state.phoneNumber && !!state.verificationId
};

const mutations = {
  setUser(state, user) {
    state.user.uid = user.uid;
    state.user.displayName = user.displayName;
    state.user.phoneNumber = user.phoneNumber;
    state.user.photoURL = user.photoURL;
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber;
  },
  setVerificationId(state, verificationId) {
    state.verificationId = verificationId;
  }
};

const actions = {
  sendVerificationCode({ state, commit }, captchaVerifier) {
    return firebase
      .auth()
      .signInWithPhoneNumber("+62" + state.phoneNumber, captchaVerifier)
      .then(confirmationResult => {
        commit("setVerificationId", confirmationResult.verificationId);
      });
  },
  signInWithCode({ state, commit }, code) {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      state.verificationId,
      code
    );
    return firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(userCredential => {
        commit("setUser", userCredential.user);
        commit("setVerificationId", null);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

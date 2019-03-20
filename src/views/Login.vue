<template>
  <v-container fluid style="background-color: #464d5c; height: 100vh ">
    <v-layout column text-xs-center fill-height>
      <v-spacer />
      <v-flex xs4>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <v-layout justify-center>
          <v-flex xs12 sm10 md8 lg6 xl4>
            <v-card>
              <v-card-title>
                <span class="title font-weight-light">
                  Masuk dengan nomor handphone anda.
                </span>
              </v-card-title>
              <v-card-text>
                <v-form v-if="isCodeSend">
                  <v-text-field
                    label="Kode Verifikasi"
                    outline
                    v-model="verificationCode"
                    :rules="[v => (v && v.length === 6) || 'Kode harus diisi']"
                    mask="# - # - # - # - # - #"
                  />
                  <v-btn
                    block
                    class="mt-3"
                    color="primary"
                    :disabled="isPending"
                    @click.prevent="signInWithCode"
                  >
                    Masuk
                  </v-btn>
                </v-form>
                <v-form v-model="validInput" v-else>
                  <v-text-field
                    label="Nomor handphone"
                    v-model="phoneNumber"
                    type="tel"
                    mask="###-####-#####"
                    :rules="[v => (v && v.length > 9) || 'Nomor tidak lengkap']"
                    prefix="(+62)"
                  />
                  <div id="recaptcha-container"></div>
                  <v-btn
                    block
                    class="mt-3"
                    :disabled="!validInput || isPending || !captchaSolved"
                    @click.prevent="sendVerificationCode"
                  >
                    Lanjut
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  data: () => ({
    validInput: false,
    captchaSolved: false,
    verificationCode: ""
  }),
  computed: {
    isPending() {
      return this.$store.state.app.isPending;
    },
    isCodeSend() {
      return this.$store.getters.isCodeSend;
    },
    phoneNumber: {
      get() {
        return this.$store.state.auth.phoneNumber;
      },
      set(phoneNumber) {
        this.$store.commit("setPhoneNumber", phoneNumber);
      }
    }
  },
  methods: {
    sendVerificationCode() {
      this.$store.dispatch("sendVerificationCode", this.recaptcha);
      this.captchaSolved = false;
    },
    signInWithCode() {
      this.$store.dispatch("signInWithCode", this.verificationCode);
    }
  },
  mounted() {
    this.recaptcha = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        callback: () => {
          this.captchaSolved = true;
        },
        "expired-callback": () => {
          this.captchaSolved = false;
        }
      }
    );
    this.recaptcha.render();
  }
};
</script>

<template>
  <v-container fluid style="background-color: #464d5c; height: 100vh ">
    <v-layout column text-xs-center fill-height>
      <v-spacer/>
      <v-flex xs4>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
      </v-flex>
      <v-flex xs6>
        <v-layout justify-center>
          <v-flex xs12 md8>
            <v-card>
              <v-card-title>
                <span class="title font-weight-light">Masuk dengan nomor handphone anda.</span>
              </v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field label="Nomor handphone" v-model="phoneNumber"></v-text-field>
                  <div id="recaptcha-container"></div>
                  <v-btn primary @click.prevent="sendVerificationCode">Lanjut</v-btn>
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
    verificationCode: ""
  }),
  computed: {
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
    },
    signInWithCode() {
      this.$store.dispatch("signInWithCode", this.verificationCode);
    }
  },
  mounted() {
    this.recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    this.recaptcha.render();
  }
};
</script>


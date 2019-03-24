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
                <form-code
                  v-if="isCodeSend"
                  :pending="isPending"
                  @submit="signInWithCode"
                />
                <form-phone
                  v-else
                  v-model="phoneNumber"
                  :pending="isPending"
                  @submit="sendVerificationCode"
                />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FormPhone from "@/components/LoginFormPhone.vue";
import FormCode from "@/components/LoginFormCode.vue";

export default {
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
    sendVerificationCode(recaptcha) {
      this.$store.dispatch("sendVerificationCode", recaptcha);
    },
    signInWithCode(code) {
      this.$store.dispatch("signInWithCode", code);
    }
  },
  components: {
    FormPhone,
    FormCode
  }
};
</script>

<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <v-text-field
      label="Nomor handphone"
      :value="value"
      @input="$emit('input', $event)"
      type="tel"
      mask="###-####-#####"
      :rules="rules"
      prefix="(+62)"
      :disabled="pending"
      :loading="pending"
    />
    <v-input
      :rules="[v => captchaSolved || 'Captcha belum diselesaikan.']"
      class="mt-3"
    >
      <div id="recaptcha-container"></div>
    </v-input>
    <v-alert color="error" icon="warning" :value="errorMessage">
      {{ errorMessage }}
    </v-alert>
    <v-btn
      block
      class="mt-3"
      :disabled="pending"
      :loading="pending"
      type="submit"
    >
      Lanjut
    </v-btn>
  </v-form>
</template>

<script>
import firebase from "firebase/app";

export default {
  data: () => ({
    rules: [
      v => !!v || "Nomor harus diisi.",
      v => (v && v.length > 9) || "Nomor tidak lengkap."
    ],
    captchaSolved: false,
    pending: false,
    errorMessage: ""
  }),
  props: {
    value: String
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.pending = true;
        this.captchaSolved = false;
        this.errorMessage = "";
        this.$emit("submit", this.recaptcha, message => {
          if (message) this.errorMessage = message;
          this.pending = false;
        });
      }
    }
  },
  mounted() {
    this.recaptcha = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        callback: () => {
          this.captchaSolved = true;
          this.$refs.form.validate();
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

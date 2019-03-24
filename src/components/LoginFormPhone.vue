<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      label="Nomor handphone"
      :value="value"
      @input="$emit('input', $event)"
      type="tel"
      mask="###-####-#####"
      :rules="rules"
      prefix="(+62)"
      :disabled="pending"
    />
    <v-input
      :error-messages="captchaSolved ? [] : 'Captcha belum diselesaikan.'"
    >
      <div id="recaptcha-container"></div>
    </v-input>
    <v-btn block class="mt-3" :disabled="pending" @click.prevent="onSubmit">
      Lanjut
    </v-btn>
  </v-form>
</template>

<script>
import firebase from "firebase/app";

export default {
  data: () => ({
    valid: false,
    rules: [
      v => !!v || "Nomor harus diisi",
      v => (v && v.length > 9) || "Nomor tidak lengkap"
    ],
    captchaSolved: false
  }),
  props: {
    value: String,
    pending: Boolean
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate() && this.captchaSolved) {
        this.$emit("submit", this.recaptcha);
        this.captchaSolved = false;
      }
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

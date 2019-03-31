<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <p>
      Pesan singkat berisi kode telah dikirim ke nomor : +62{{ phone }}.<br />
      Masukkan kode tersebut pada form di bawah ini. |
      <a href="" @click.prevent="$emit('reset')">Kirim ulang.</a>
    </p>
    <v-text-field
      label="Kode Verifikasi"
      outline
      v-model="code"
      :rules="rules"
      mask="# - # - # - # - # - #"
      :loading="pending"
      :disabled="pending"
    />
    <v-alert color="error" icon="warning" :value="errorMessage">
      {{ errorMessage }}
    </v-alert>
    <v-btn
      block
      type="submit"
      class="mt-3"
      color="primary"
      :loading="pending"
      :disabled="pending"
    >
      Masuk
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    code: "",
    rules: [
      v => !!v || "Kode harus diisi",
      v => (v && v.length === 6) || "Kode tidak lengkap"
    ],
    pending: false,
    errorMessage: ""
  }),
  props: ["phone"],
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.pending = true;
        this.$emit("submit", this.code, message => {
          if (message) this.errorMessage = message;
          this.pending = false;
        });
      }
    }
  }
};
</script>

<style scoped>
.v-text-field >>> input {
  text-align: center;
  font-size: xx-large;
}
</style>

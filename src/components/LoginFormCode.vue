<template>
  <v-form v-model="valid" ref="form">
    <v-text-field
      label="Kode Verifikasi"
      outline
      v-model="code"
      :rules="rules"
      mask="# - # - # - # - # - #"
    />
    <v-btn
      block
      class="mt-3"
      color="primary"
      :disabled="pending"
      @click.prevent="onSubmit"
    >
      Masuk
    </v-btn>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    code: "",
    rules: [
      v => !!v || "Kode harus diisi",
      v => (v && v.length === 6) || "Kode tidak lengkap"
    ]
  }),
  props: ["pending"],
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.$emit("submit", this.code);
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

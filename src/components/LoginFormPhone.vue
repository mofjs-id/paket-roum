<template>
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
</template>

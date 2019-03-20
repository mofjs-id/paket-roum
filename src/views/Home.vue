<template>
  <v-container fluid style="background-color: #464d5c; height: 100vh ">
    <v-layout column text-xs-center fill-height>
      <v-spacer/>
      <v-flex xs6>
        <v-img :src="require('../assets/logo.png')" class="my-3" contain height="200"></v-img>
        <h1 class="mb-3 white--text">Paket Biro Umum</h1>
        <p class="subheading white--text">
          Untuk mengecek paket yang sudah diterima di loket
          penerimaan barang Biro Umum.
        </p>
      </v-flex>
      <v-flex xs4>
        <v-btn large round to="/login">Masuk</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<template>
  <v-container
    fluid
    fill-height
    text-xs-center
    style="background-color: #464d5c;"
  >
    <v-layout row wrap align-center>
      <v-flex xs8 offset-xs2 sm6 offset-sm3>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-2"
          contain
          height="200"
        />
        <span class="white--text">Menyiapkan aplikasi.</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Paket Baru</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex text-xs-center v-if="loading">
        <v-progress-circular
          size="50"
          width="7"
          indeterminate
          class="ma-5"
        ></v-progress-circular>
      </v-flex>
      <template v-else-if="pakets.length">
        <v-flex xs12 sm6 md3 v-for="(paket, index) in pakets" :key="index">
          <v-card>
            <v-img :src="paket.photoUrl"></v-img>
            <v-card-text>{{ paket.namaPenerima }}</v-card-text>
          </v-card>
        </v-flex>
      </template>
      <v-flex text-xs-center ma-2 v-else>
        <span class="title">Tidak ada paket baru.</span>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: {
    pakets: Array,
    loading: Boolean
  }
};
</script>

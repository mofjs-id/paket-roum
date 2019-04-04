<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 md6 pa-2>
        <card-paket :pakets="newPakets" :loading="paketLoading"></card-paket>
      </v-flex>
      <v-flex xs12 md6 pa-2>
        <card-news></card-news>
      </v-flex>
      <v-flex xs12 md6 pa-2>
        <card-history></card-history>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardPaket from "@/components/DashboardCardPaket.vue";
import CardNews from "@/components/DashboardCardNews.vue";
import CardHistory from "@/components/DashboardCardHistory.vue";

export default {
  computed: {
    newPakets() {
      return this.$store.getters.newPakets;
    },
    oldPakets() {
      return this.$store.getters.oldPakets;
    },
    paketLoading() {
      return this.$store.state.paket.isUpdating;
    }
  },
  components: { CardPaket, CardNews, CardHistory },
  mounted() {
    this.$store.dispatch("cekPaket");
  }
};
</script>

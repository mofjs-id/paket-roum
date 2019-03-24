<template>
  <v-app>
    <v-toolbar app v-if="$route.meta && $route.meta.requiresAuth">
      <v-toolbar-title class="headline text-uppercase">
        <span>PAKET BIRO UMUM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <loading-dialog :value="isPending" />
  </v-app>
</template>

<script>
import LoadingDialog from "@/components/LoadingDialog.vue";

export default {
  name: "App",
  computed: {
    isPending() {
      return this.$store.state.app.isPending;
    }
  },
  components: { LoadingDialog }
};
</script>

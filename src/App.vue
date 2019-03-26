<template>
  <v-app>
    <splash-screen v-if="!isReady" />
    <template v-else>
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
    </template>
  </v-app>
</template>

<script>
import SplashScreen from "@/components/SplashScreen.vue";
import LoadingDialog from "@/components/LoadingDialog.vue";

export default {
  name: "App",
  computed: {
    isPending() {
      return this.$store.state.app.isPending;
    },
    isReady() {
      return this.$store.state.app.isReady;
    }
  },
  components: { LoadingDialog, SplashScreen }
};
</script>

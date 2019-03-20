<template>
  <v-app>
    <v-toolbar app v-if="$route.meta && $route.meta.showToolbar">
      <v-toolbar-title class="headline text-uppercase">
        <span>PAKET BIRO UMUM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

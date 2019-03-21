<template>
  <v-dialog :value="value" persistent width="300">
    <v-card color="gray" dark>
      <v-card-text>
        Mohon tunggu!
        <v-progress-linear indeterminate color="white" class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  }
};
</script>

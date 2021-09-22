<template>
  <v-card :color="color" class="white--text">
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-icon color="white" large>{{ icon }}</v-icon>
    </v-card-title>
    <v-card-title class="white--text mt-n6 d-flex">
      {{ stat }}
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-actions>
      <v-btn color="white" outlined block>Plus d'info</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title", "color", "stat", "icon", "action"],
});
</script>

<style>
</style>
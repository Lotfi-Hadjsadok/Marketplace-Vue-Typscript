<template>
  <div>
    <v-app-bar app class="primary" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Raysel Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div style="cursor: pointer">
          <v-badge color="black" right inline content="1">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
        </div>
      </div>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer">
      <v-row justify="center" class="my-5">
        <v-icon>mdi-account</v-icon>
      </v-row>

      <v-list nav dense>
        <v-list-item-group>
          <v-list-item>
            <v-icon left>mdi-home</v-icon>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon left>mdi-view-dashboard</v-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="subtitle-2">
              <v-icon left>mdi-exit-to-app</v-icon>
              Déconnexion
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    drawer: false as boolean,
  }),
  methods: {},
});
</script>
<style>
</style>
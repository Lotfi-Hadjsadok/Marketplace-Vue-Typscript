<template>
  <div>
    <v-navigation-drawer :permanent="!mobile" v-model="drawer" width="230" app>
      <v-list>
        <v-list-item class="px-2 d-flex justify-center">
          <v-list-item-avatar class="primary">
            <v-icon color="white">mdi-account</v-icon>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6" align="center">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle align="center">{{
              user.email
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Mes produits</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-cart-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Ajout produits</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Se déconnecter</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-btn color="success" absolute @click="drawer = !drawer">text</v-btn>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapGetters(["user"]),
    mobile() {
      return this.$vuetify.breakpoint.mobile;
    },
  },
});
</script>

<style>
</style>
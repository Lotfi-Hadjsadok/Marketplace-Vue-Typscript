<template>
  <div>
    <v-app-bar app class="primary" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Raysel Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div style="cursor: pointer" @click="cartDrawer = !cartDrawer">
          <v-badge
            color="black"
            right
            inline
            :content="cart.length ? cartCount : '0'"
          >
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
            <v-list-item-title @click="logout" class="subtitle-2">
              <v-icon left>mdi-exit-to-app</v-icon>
              Déconnexion
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- CART DRAWER -->
    <v-navigation-drawer
      fixed
      mobile-breakpoint="2000"
      style="z-index: 10"
      v-model="cartDrawer"
    >
      <v-list class="pl-3 pr-4" dense>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn @click="cartDrawer = false" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-for="(item, index) in cart" :key="index">
          <v-row dense class="mt-5" align="center">
            <v-col class="white" cols="2">
              <v-img :src="item.product.image"></v-img>
            </v-col>
            <v-col cols="5" class="text-subtitle-2">{{
              item.product.title
            }}</v-col>
            <v-col cols="4" class="text-subtitle-2"
              >{{ item.product.price }} x {{ item.quantity }}</v-col
            >
            <v-col cols="1">
              <v-btn @click="removeCartItem(item)" align="left" x-small icon>
                <v-icon>mdi-close</v-icon>
              </v-btn></v-col
            >
          </v-row>
          <v-row>
            <v-divider></v-divider>
          </v-row>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  data: () => ({
    drawer: false as boolean,
    cartDrawer: false as boolean,
  }),
  computed: {
    ...mapGetters(["cart"]),
    cartCount() {
      let quantity = 0;
      this.cart.forEach((item: any) => {
        quantity = quantity + item.quantity;
      });
      return quantity;
    },
  },
  methods: {
    ...mapActions(["logoutUser", "removeCartItem"]),
    logout() {
      this.logoutUser();
    },
  },
});
</script>
<style>
</style>
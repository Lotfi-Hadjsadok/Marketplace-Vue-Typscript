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
        <div v-if="!cart.length">Aucun produit</div>
        <div v-for="(item, index) in cart" :key="index">
          <v-row dense class="mt-5" align="center">
            <v-col class="white" cols="2">
              <v-img :src="item.image"></v-img>
            </v-col>
            <v-col cols="5" class="text-subtitle-2">{{ item.title }}</v-col>
            <v-col cols="4" class="text-subtitle-2"
              >{{ item.price }} x {{ item.quantity }}</v-col
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
        <v-row class="mt-5" v-if="cart.length > 0">
          <v-col>
            <v-btn block @click="initOrder" color="primary"
              >Valider vos achats</v-btn
            >
          </v-col>
        </v-row>
      </v-list>
    </v-navigation-drawer>

    <!-- Order Popup -->

    <div class="text-center">
      <v-dialog v-model="orderPopup" max-width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Validation de la commande
          </v-card-title>

          <v-card-text class="mt-4">
            <v-container>
              <v-row>
                <v-col cols="6" sm="6">
                  <v-text-field
                    append-icon="mdi-account"
                    label="Nom"
                    v-model="name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    append-icon="mdi-account"
                    label="Prénom"
                    v-model="name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Numéro de téléphone"
                    v-model="phone"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Wilaya"
                    v-model="state"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="city"
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Commune"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Adresse compléte"
                    v-model="full"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text :loading="orderLoader" @click="Order">
              Commander
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { db } from "@/firebase";
import Vue from "vue";
import { orderType } from "../globalTypes/Order";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  data: () => ({
    orderLoader: false as boolean,
    name: "" as string,
    full: "" as string,
    city: "" as string,
    state: "" as string,
    phone: "" as string,
    order: null as orderType,
    drawer: false as boolean,
    cartDrawer: false as boolean,
    orderPopup: false,
  }),
  mounted() {
    console.log(this.cart);
  },
  computed: {
    ...mapGetters(["cart", "user"]),
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
    Order() {
      this.orderLoader = true;
      db.collection("orders")
        .add({
          uid: this.user.uid,
          name: this.user.name,
          surname: this.user.name,
          email: this.user.email,
          adresse: {
            state: this.state,
            city: this.city,
            full: this.full,
          },
          phone: this.phone,
          products: this.cart,
        })
        .then(() => {
          this.orderPopup = false;
          this.$store.commit("SET_CART_ITEMS", []);
          this.orderLoader = false;
        });
    },
    initOrder() {
      this.cartDrawer = false;
      this.orderPopup = true;
    },
  },
});
</script>
<style>
</style>
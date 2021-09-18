<template>
  <div>
    <v-card align="center">
      <router-link
        :to="
          user.role == 'client'
            ? {
                name: 'product',
                params: { id: product.id, title: titleToRoute },
              }
            : {
                name: 'product-employee',
                params: {
                  uid: user.uid,
                  id: product.id,
                  title: titleToRoute,
                },
              }
        "
      >
        <v-img :src="product.image"></v-img>
      </router-link>
      <router-link
        class="text-decoration-none"
        :to="
          user.role == 'client'
            ? {
                name: 'product',
                params: { id: product.id, title: titleToRoute },
              }
            : {
                name: 'product-employee',
                params: {
                  uid: user.uid,
                  id: product.id,
                  title: titleToRoute,
                },
              }
        "
      >
        <v-card-text>
          <h1 class="title primary--text">{{ product.title }}</h1>
        </v-card-text>
      </router-link>
      <v-card-text>
        <v-row class="mt-n10">
          <v-col>{{ product.category }}</v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col class="primary--text text-h6">{{ product.price }} da</v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="
            addToCart({
              id: product.id,
              store: product.store,
              title: product.title,
              price: product.price,
              image: product.image,
              uid: null,
              quantity: 1,
            })
          "
          color="primary"
          icon
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-card-actions>
      <div v-if="user.role === 'employee'" class="commission_price primary">
        200 DZD
        <v-icon class="ml-1" color="white">mdi-cash-check</v-icon>
      </div>
    </v-card>
    <v-snackbar elevation="0" right color="success" v-model="snackbar">
      <v-icon small>mdi-cart</v-icon>
      Produit(s) Ajouté(s) au Panier

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { cartType } from "@/store/modules/cart/types";
import { productType } from "@/store/modules/products/types";
import Vue, { PropType } from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  data() {
    return {
      snackbar: false,
    };
  },
  props: {
    product: Object as PropType<productType>,
  },
  computed: {
    ...mapGetters(["user"]),
    titleToRoute(): string {
      return this.product.title.replace(/\s/g, "-");
    },
  },
  methods: {
    ...mapActions(["addCartItem", "removeCartItem"]),
    addToCart(payload: cartType) {
      if (this.user.role == "employee") {
        payload.uid = this.user.uid;
      }
      this.addCartItem(payload);

      this.snackbar = true;
    },
  },
});
</script>

<style>
.commission_price {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  padding: 4px;
  margin-top: 10px;

  color: white;
  right: 0;
}
</style>
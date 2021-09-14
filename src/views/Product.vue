<template>
  <div>
    <div v-if="productById">
      <v-container fluid style="max-width: 1000px">
        <v-row>
          <v-col order="2" order-md="2" cols="12" sm="6">
            <v-card flat class="transparent">
              <v-row class="white rounded-b-lg">
                <v-col cols="12" class="title">{{ productById.title }}</v-col>
                <v-col class="title mt-n5">
                  <span class="primary--text"
                    >{{ productById.price }} DZD
                  </span>
                  <span
                    style="opacity: 0.5"
                    class="primary--text text-decoration-line-through"
                    >{{ productById.price }} DZD</span
                  >
                </v-col>
                <v-col v-if="user.role === 'employee'" cols="12" class="mt-n4">
                  <div
                    style="max-width: 200px"
                    class="
                      subtitle-2
                      pa-1
                      primary
                      d-flex
                      align-center
                      white--text
                    "
                  >
                    <v-icon dark small class="mr-2">mdi-cash-check</v-icon>
                    Commission +{{ productById.commission }} DZD
                  </div>
                </v-col>
              </v-row>

              <v-row class="white mt-5">
                <v-col cols="12">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quia, eveniet harum. Totam blanditiis sunt autem ex sint
                  voluptate nostrum perspiciatis porro voluptates corrupti,
                  quaerat, veritatis, deleniti iure vel nisi asperiores.
                </v-col>
                <v-row class="ma-2" align="center">
                  <v-col class="d-flex">
                    <v-card
                      width="120"
                      class="d-flex justify-space-between mr-5"
                    >
                      <v-btn class="mr-2" icon @click="quantity++"
                        ><v-icon color="black" small>mdi-plus</v-icon></v-btn
                      >

                      <input
                        @blur="validate"
                        style="width: 20px !important; margin-left: -5px"
                        type="number"
                        v-model="quantity"
                      />
                      <v-btn @click="quantity--" icon
                        ><v-icon color="black" small>mdi-minus</v-icon></v-btn
                      >
                    </v-card>

                    <v-btn
                      class="text-subtitle-2 mr-2"
                      @click="addToCartEvent(productById, quantity)"
                      color="primary"
                    >
                      <v-icon left>mdi-cart</v-icon>
                      Ajouter Au Panier
                    </v-btn>
                  </v-col>
                </v-row>
              </v-row>
            </v-card>
          </v-col>
          <v-col order="1" order-md="1" cols="12" sm="6">
            <product-images :images="productById.images" />
          </v-col>
        </v-row>
      </v-container>

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
  </div>
</template>
<script lang="ts">
import ProductImages from "@/components/ProductImages.vue";
import store from "@/store";
import { productType } from "@/store/modules/products/types";

import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  components: { ProductImages },
  data() {
    return {
      quantity: 1,
      snackbar: false,
      uid: this.$route.params.uid,
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["addCartItem"]),
    addToCartEvent(product: productType, quantity: number) {
      if (this.uid) {
        this.addCartItem({ product, quantity, uid: this.uid });
      } else {
        this.addCartItem({ product, quantity, uid: null });
      }
      this.quantity = 1;
      this.snackbar = true;
    },
    validate() {
      if (this.quantity < 1) {
        this.quantity = 1;
      }
    },
  },

  watch: {
    quantity() {
      if (this.quantity > 50) {
        this.quantity = 50;
      }
    },
  },
  mounted() {
    console.log(this.cart);
    const productId = this.$route.params.id;
    store.dispatch("getProductById", productId.toString());
  },
  computed: {
    ...mapGetters(["productById", "user", "cart"]),
  },
});
</script>
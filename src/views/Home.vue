<template>
  <div>
    <main-carousal />
    <v-container max-width="1200px">
      <v-row v-if="products">
        <v-col
          cols="6"
          md="4"
          lg="3"
          xl="2"
          v-for="product in products"
          :key="product.id"
        >
          <products-card :product="product" />
        </v-col>
      </v-row>
      <v-row v-if="productsLoader || products.length == 0">
        <v-col v-for="item in left" :key="item" cols="6" xl="2" sm="4" md="3">
          <v-skeleton-loader
            type="image,list-item-two-line,actions"
            :types="{ actions: 'avatar' }"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-btn
        class="mt-5"
        v-if="left && products.length"
        @click="fetchProducts"
        color="primary"
      >
        Voir plus
        <v-icon right>mdi-chevron-right</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>
<script lang="ts">
import MainCarousal from "@/components/MainCarousal.vue";
import ProductsCard from "@/components/ProductsCard.vue";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  components: { MainCarousal, ProductsCard },
  metaInfo() {
    return {
      title: "Accueil",
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  computed: {
    ...mapGetters(["products", "productsCount", "productsLoader"]),
    left() {
      if (!this.products.length) return 12;
      var productLeft: number = this.productsCount - this.products.length;
      if (productLeft > 12) return 12;
      return productLeft;
    },
  },
});
</script>
<style>
</style>
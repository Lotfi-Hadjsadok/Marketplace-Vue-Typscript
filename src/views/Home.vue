<template>
  <div>
    <main-carousal />
    <v-container max-width="1200px">
      <v-row>
        <v-col cols="6" md="4" lg="3" xl="2" v-for="i in 25" :key="i">
          <div>
            <v-card align="center">
              <v-img
                @click="toProduct()"
                src="https://shopping-express.raysel-revolution.com/wp-content/uploads/sites/9/2021/08/3-600x600.jpg"
              ></v-img>

              <v-card-text>
                <h1 class="title primary--text">productTitle</h1>
              </v-card-text>
              <v-card-text>
                <v-row class="mt-n10">
                  <v-col>Category</v-col>
                </v-row>
                <v-row class="mt-n5">
                  <v-col class="primary--text text-h6">3500 da</v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" icon>
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import MainCarousal from "@/components/MainCarousal.vue";
import Vue from "vue";
export default Vue.extend({
  components: { MainCarousal },
  methods: {
    toProduct() {
      this.$router.push("/login");
    },
  },
});
</script>
<style>
</style>
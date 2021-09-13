<template>
  <v-carousel v-model="model" hide-delimiters>
    <v-carousel-item v-for="item in carousalItem" :key="item">
      <v-sheet color="#003939" height="100%" tile>
        <v-row class="fill-height" align="center" justify="center">
          <div class="text-h2 text-center text-h3 text-sm-h2 white--text">
            {{ item }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data: () => ({
    model: 0,
    color: "secondary",
    carousalItem: ["Welcome to Raysel Shop", "Promotion -50% maintenant"],
  }),
  components: {},
});
</script>

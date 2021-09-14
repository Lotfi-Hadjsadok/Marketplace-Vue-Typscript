<template>
  <v-card flat max-width="444" class="mx-auto">
    <v-carousel
      height="auto"
      v-model="imgIndex"
      hide-delimiters
      show-arrows-on-hover
    >
      <v-carousel-item v-for="(image, i) in images" :key="i">
        <v-img :src="image"></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-row dense class="py-2">
      <v-col cols="3" v-for="(image, i) in images" :key="i">
        <v-img @click="slide(i)" :src="image">
          <v-overlay
            v-if="imgIndex != i"
            :absolute="true"
            :opacity="0.7"
            :value="true"
          />
        </v-img>
      </v-col>
    </v-row>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
      props:['images'],
  data() {
    return {
      imgIndex: 0,
    };
  },
  methods: {
    slide(i:any) {
      this.imgIndex = i;
    },
  },
};


})
</script>

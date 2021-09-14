<template>
  <div v-if="userLoading"></div>
  <v-app v-else style="background-color: #f1f1f1">
    <nav-bar
      v-if="this.$route.name != 'login' && this.$route.name != 'register'"
    />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import NavBar from "./components/NavBar.vue";
import store from "./store";

export default Vue.extend({
  components: { NavBar },
  name: "App",
  mounted() {
    store.dispatch("productsStateInit");
  },
  methods: {},
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["user", "userLoading", "userError"]),
  },
});
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]:focus {
  outline: none;
}
</style>

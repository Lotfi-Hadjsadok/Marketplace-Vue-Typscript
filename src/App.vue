<template>
  <div v-if="userLoading"></div>
  <v-app v-else style="background-color: #f1f1f1">
    <nav-bar
      v-if="this.$route.name != 'login' && this.$route.name != 'register'"
    />

    <v-main>
      <router-view />
      <v-btn color="success" @click="getData">more data</v-btn>
      {{ userError ? userError : "no error" }}
      {{ user ? user.email : "no user" }}
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
  methods: {
    getData() {
      store.dispatch("fetchProducts");
    },
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters(["user", "userLoading", "userError"]),
  },
});
</script>

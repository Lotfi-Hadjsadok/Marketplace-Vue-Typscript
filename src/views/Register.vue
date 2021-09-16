<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col colrs="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Se connecter</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="user.name"
                  label="Nom et prénom"
                  type="text"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="user.email"
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  v-model="user.password"
                  label="Mot de passe"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" :to="{ name: 'login' }" text
                >J'ai déja un compte</v-btn
              >
              <v-btn @click="register" color="primary">Valider</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  metaInfo() {
    return {
      title: "Inscription",
    };
  },
  data: () => ({
    user: {
      name: "" as string,
      password: "" as string,
      email: "" as string,
    },
  }),
  methods: {
    register() {
      this.$store.dispatch("registerUser", this.user);
    },
  },
});
</script>

<style></style>

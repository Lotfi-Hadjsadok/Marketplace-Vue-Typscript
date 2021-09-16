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
              {{ userError }}
              <v-spacer></v-spacer>
              <v-btn color="primary" :to="{ name: 'register' }" text
                >pas de compte ?</v-btn
              >
              <v-btn color="primary" @click="login">Valider</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default Vue.extend({
  metaInfo() {
    return {
      title: "Connexion",
    };
  },
  data: () => ({
    user: {
      email: "" as string,
      password: "" as string,
    },
  }),

  computed: {
    ...mapGetters(["userError"]),
  },
  methods: {
    ...mapActions(["loginUser"]),
    login() {
      this.loginUser(this.user);
    },
  },
});
</script>

<style></style>

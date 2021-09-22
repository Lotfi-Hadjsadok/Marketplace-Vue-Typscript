<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <stats-card
            :title="'Nombres de Commandes'"
            :color="'blue darken-3'"
            :stat="'200'"
            :icon="'mdi-cart'"
            :action="'plus d\'info'"
          />
        </v-col>
        <v-col cols="3">
          <stats-card
            :title="'Nombres de Commandes'"
            :color="'blue darken-3'"
            :stat="'200'"
            :icon="'mdi-cart'"
            :action="'plus d\'info'"
          />
        </v-col>
        <v-col cols="3">
          <stats-card
            :title="'Nombres de Commandes'"
            :color="'blue darken-3'"
            :stat="'200'"
            :icon="'mdi-cart'"
            :action="'plus d\'info'"
          />
        </v-col>
        <v-col cols="3">
          <stats-card
            :title="'Nombres de Commandes'"
            :color="'blue darken-3'"
            :stat="'200'"
            :icon="'mdi-cart'"
            :action="'plus d\'info'"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import statsCard from "@/components/statsCard.vue";
import Vue from "vue";
export default Vue.extend({
  components: { statsCard },
  metaInfo: () => ({
    title: "Dashboard",
  }),
});
</script>

<style>
</style>
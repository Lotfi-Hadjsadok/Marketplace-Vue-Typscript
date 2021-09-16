<template>
  <div class="not-found">*_- 404 not found</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  metaInfo() {
    return {
      title: "404",
    };
  },
});
</script>

<style>
.not-found {
  display: flex;
  font-size: 40px;
  align-items: center;
  justify-content: center;
  height: 70vh;
}
</style>
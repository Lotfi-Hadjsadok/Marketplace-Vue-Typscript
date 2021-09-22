<template>
  <div>
    <v-container>
      <v-card>
        <v-card-text>
          <h2>Titre</h2>
          <v-text-field />
        </v-card-text>
      </v-card>
      <v-card class="my-7">
        <v-row>
          <v-col cols="12" md="4">
            <v-card-text>
              <h2 class="mb-2">Prix</h2>
              <v-text-field
                outlined
                dense
                type="number"
                v-model="price"
                prepend-inner-icon="mdi-cash"
                suffix="DZD"
              />
            </v-card-text>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" md="4">
            <v-card-text>
              <h2 class="mb-2">Commission Vendeur</h2>
              <v-text-field
                outlined
                type="number"
                color="red"
                dense
                v-model="commission"
                prepend-inner-icon="mdi-cash-minus"
                suffix="DZD"
              />
            </v-card-text>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="12" md="4">
            <v-card-text>
              <h2 class="mb-2">Commission du Site</h2>
              <v-text-field
                outlined
                disabled
                dense
                :value="webCommission"
                prepend-inner-icon="mdi-cash-minus"
                suffix="DZD"
              />
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-card>
        <v-row>
          <v-col>
            <v-card-text>
              <h2 class="mb-5">Image du Produit</h2>
              <input
                type="file"
                accept=".jpg,.jpeg,.webp,.png"
                @change="mainImageSelected"
                ref="productImage"
                hidden
              />
              <v-btn @click="addImage" color="primary">
                Ajouter
                <v-icon right>mdi-image</v-icon>
              </v-btn>
            </v-card-text>
            <v-col>
              <img
                id="preview"
                style="max-width: 250px; max-height: 250px"
                src=""
              />
            </v-col>
          </v-col>
        </v-row>
      </v-card>
      <text-editor class="mt-5" v-on:writing="getHtml($event)" />
      <v-btn
        :loading="loader"
        :disabled="loader"
        @click="addProduct"
        color="primary mb-2"
        >Ajouter un produit</v-btn
      >
    </v-container>
  </div>
</template>

<script lang="ts">
import TextEditor from "@/components/TextEditor.vue";
import app from "@/firebase";
import imageCompression from "browser-image-compression";
import Vue from "vue";
export default Vue.extend({
  components: { TextEditor },
  data: () => ({
    content: "",
    price: 0 as number,
    commission: 0 as number,
    image: "" as any,
    loader: false,
  }),

  computed: {
    webCommission() {
      //change website commission
      const price = (this.price * 5) / 100;
      return price;
    },
  },
  methods: {
    getHtml(data: any) {
      this.content = data;
    },
    addImage() {
      (this.$refs["productImage"] as any).click();
    },
    async addProduct() {
      const storageRef = app.storage().ref(this.image.name).put(this.image);
      storageRef.on("state_changed", (snapshot) => {
        console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 == 100) {
          storageRef.snapshot.ref
            .getDownloadURL()
            .then((url) => console.log(url));
        }
      });
    },
    async mainImageSelected(e: any) {
      const img = document.getElementById("preview") as HTMLImageElement;
      img.src = URL.createObjectURL(e.target.files[0]);

      const imageFile = e.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };
      this.loader = true;
      const compressedFile = await imageCompression(imageFile, options);
      this.image = compressedFile;
      this.loader = false;
    },
  },
});
</script>

<style>
</style>
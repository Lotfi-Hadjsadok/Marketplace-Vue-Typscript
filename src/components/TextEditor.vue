<template>
  <div>
    <v-card min-height="400" class="my-2">
      <v-card-text>
        <v-row>
          <v-col class="d-flex">
            <v-btn @click="editor.chain().focus().toggleBold().run()" icon>
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn @click="editor.chain().focus().toggleItalic().run()" icon>
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn @click="addImage" icon>
              <v-icon>mdi-image</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <editor-content class="mt-2 title" :editor="editor" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default Vue.extend({
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null as any,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Image.configure({ inline: true })],
      content: "",
      onUpdate: () => {
        this.$emit("writing", this.editor.getHTML());
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  methods: {
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
  },
});
</script>

<style lang="scss">
.ProseMirror {
  outline: none;
  img {
    max-width: 300px;
    height: auto;
  }
  &.ProseMirror-selectednode {
    outline: 3px solid #68cef8;
  }
}
</style>
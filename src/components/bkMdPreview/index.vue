<template>
  <div style="height: 100%; width: 100%; background-color: #fff; overflow: auto">
    <v-md-preview :text="code" height="100%" />
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import "@kangc/v-md-editor/lib/style/base-editor.css"
// @ts-ignore
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"
// @ts-ignore
import Prism from "prismjs"
import { ref } from "vue"
// @ts-ignore
import VMdPreview from "@kangc/v-md-editor/lib/preview"
import "@kangc/v-md-editor/lib/style/preview.css"
// @ts-ignore
import "@kangc/v-md-editor/lib/theme/style/github.css"
// @ts-ignore
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index"
// @ts-ignore
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index"
// @ts-ignore
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css"

VMdPreview.use(vuepressTheme, {
  Prism
}).use(createLineNumbertPlugin())
VMdPreview.use(createCopyCodePlugin())

const props = defineProps({
  content: {
    type: String
  }
})

const code = ref(
  props.content ||
    `\`\`\`js
      import Vue from 'vue';
      import VueMarkdownEditor from '@kangc/v-md-editor';
      import '@kangc/v-md-editor/lib/style/base-editor.css';
      import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

      VueMarkdownEditor.use(vuepressTheme);

      Vue.use(VueMarkdownEditor);`
)
</script>

<style scoped lang="scss">
.bk-md-editor {
  border: 1px solid #f2f2f2;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 10px 20px 10px 20px;
}

.article {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 20px;
  .setting {
    width: 100%;
  }
  .submit {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

/* 滚动条宽高，横向滚动条的高，纵向滚动条的宽 */
::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}

/* 滚动轨道 */
::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  background: #cccccc;
  border-radius: 5px;
}
</style>

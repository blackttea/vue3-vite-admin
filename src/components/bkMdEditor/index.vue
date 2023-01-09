<template>
  <div class="bk-md-editor">
    <vue-markdown-editor
      v-model="code"
      :include-level="[3, 4]"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    />
    <div class="article">
      <a-form
        :model="formState"
        name="time_related_controls"
        style="display: flex; flex-wrap: wrap"
        :label-col="{ style: { width: '80px' } }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="Abstract" v-bind="config" class="setting" label="摘&#12288;&#12288;要">
          <a-textarea v-model:value="formState['Abstract']" placeholder="输入摘要" :rows="2" style="width: 60%" />
        </a-form-item>
        <a-form-item name="label" label="文章标签" v-bind="config" class="setting">
          <a-cascader
            v-model:value="formState['label']"
            style="width: 60%"
            multiple
            max-tag-count="responsive"
            :options="labelOptions"
            placeholder="Please select"
          />
        </a-form-item>
        <a-form-item name="classify" label="分类专栏" v-bind="config" class="setting">
          <a-select
            v-model:value="formState['classify']"
            mode="tags"
            :maxTagCount="5"
            style="width: 60%"
            placeholder="选择分类专栏"
            :options="options"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item name="column" label="文章类型" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['column']">
            <a-radio :value="'1'">原创</a-radio>
            <a-radio :value="'2'">转载</a-radio>
            <a-radio :value="'3'">翻译</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="form" label="发布形式" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['form']">
            <a-radio :value="'1'">全部可见</a-radio>
            <a-radio :value="'2'">仅我可见</a-radio>
            <a-radio :value="'3'">粉丝可见</a-radio>
            <a-radio :value="'4'">VIP可见</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item name="level" label="内容等级" v-bind="config" class="setting">
          <a-radio-group v-model:value="formState['level']">
            <a-radio :value="'1'">初级</a-radio>
            <a-radio :value="'2'">中级</a-radio>
            <a-radio :value="'3'">高级</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item class="setting">
          <div class="submit">
            <a-button shape="round" style="background-color: #fc5531; color: #fff" @click="handleChange">发布</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VueMarkdownEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"
import Prism from "prismjs"
import { reactive, ref } from "vue"
import "@kangc/v-md-editor/lib/theme/style/github.css"
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index"
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index"
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css"

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})
VueMarkdownEditor.use(createCopyCodePlugin())
VueMarkdownEditor.use(createLineNumbertPlugin())

import labelOption from "./setting"
const props = defineProps({
  type: {
    type: String,
    default: "editor"
  }
})

console.log(props)
const code = ref(`\`\`\`js
      import Vue from 'vue';
      import VueMarkdownEditor from '@kangc/v-md-editor';
      import '@kangc/v-md-editor/lib/style/base-editor.css';
      import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

      VueMarkdownEditor.use(vuepressTheme);

      Vue.use(VueMarkdownEditor);`)

const formState = reactive({
  level: "",
  classify: []
})
const config = {
  rules: [{ required: true, message: "请选择" }]
}

const handleUploadImage = (event: any, insertImage: any, files: any) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(files)
  insertImage({
    url: "http://localhost:58515/1661221609154-8.png",
    desc: "七龙珠"
    // width: 'auto',
    // height: 'auto',
  })
}

const onFinish = (values: any) => {
  console.log("Success:", values, formState)
}

const options = reactive([])

const labelOptions = reactive(labelOption)
const handleChange = () => {
  console.log(formState)
}
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}
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
</style>

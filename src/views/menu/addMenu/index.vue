<template>
  <a-button type="primary" size="small" class="bar-btn" @click="showDrawer">
    <template #icon><PlusOutlined /></template>
    新增
  </a-button>
  <a-drawer
    title="新增菜单"
    :width="720"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="名称" name="title">
            <a-input v-model:value="form.title" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="路由路径" name="path">
            <a-input v-model:value="form.path" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="路由名称" name="name">
            <a-input v-model:value="form.name" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="组件路径" name="component">
            <a-input v-model:value="form.component" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="是否隐藏" name="hidden">
            <a-select v-model:value="form.hidden" :options="hiddenOption" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="重定向" name="redirect">
            <a-input v-model:value="form.redirect" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="父级菜单" name="parentId">
            <a-tree-select
              v-model:value="form.parentId"
              show-search
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              allow-clear
              tree-default-expand-all
              :tree-data="permissionStore.parentList"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="顺序" name="seq">
            <a-input v-model:value="form.seq" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="菜单图标" name="svgIcon">
            <a-textarea v-model:value="form.svgIcon" :rows="4" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onOk">确认</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue"
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import { Menu } from "@/type/menu"
import { usePermissionStore } from "@/store/modules/permission"
import { addMenuApi } from "@/api/login"

const form = reactive<Menu>({
  title: "",
  path: "",
  name: "",
  component: "",
  hidden: false,
  redirect: "",
  svgIcon: "",
  seq: undefined,
  parentId: undefined
})

const rules: Record<string, Rule[]> = {
  title: [{ required: true, message: "Please enter user name" }],
  path: [{ required: true, message: "please enter url" }],
  name: [{ required: true, message: "Please select an owner" }],
  component: [{ required: true, message: "Please choose the type" }],
  hidden: [{ required: true, message: "Please choose the approver" }],
  redirect: [{ required: true, message: "Please choose the dateTime", type: "object" }],
  svgIcon: [{ required: true, message: "Please enter url description" }],
  seq: [{ required: true, message: "Please enter url description" }],
  parentId: [{ required: true, message: "Please enter url description" }]
}
const hiddenOption = [
  { label: "是", value: true },
  { label: "否", value: false }
]
const visible = ref<boolean>(false)

const showDrawer = () => {
  visible.value = true
}
const permissionStore = usePermissionStore()
const onClose = () => {
  visible.value = false
}

const onOk = () => {
  addMenuApi([form]).then((res) => {
    console.log(res)
    debugger
  })
}
</script>

<style lang="scss" scoped>
.bar-btn {
  margin-right: 8px;
}
</style>

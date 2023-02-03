<script lang="ts" setup>
import pagePadding from "@/components/pagePadding/index.vue"
import { usePermissionStore } from "@/store/modules/permission"
import { reactive, ref } from "vue"
import { Menu, iconList } from "@/type/menu"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const column = [
  {
    title: "id",
    field: "id"
  },
  {
    title: "名称",
    field: "title"
  },
  {
    title: "路由路径",
    field: "path"
  },
  {
    title: "路由名称",
    field: "name"
  },
  {
    title: "组件路径",
    field: "component"
  },
  {
    title: "是否隐藏",
    field: "hidden"
  },
  {
    title: "重定向",
    field: "redirect"
  },
  {
    title: "父菜单",
    field: "parentId"
  },
  {
    title: "菜单图标",
    field: "svgIcon"
  },
  {
    title: "顺序",
    field: "seq"
  }
]
const permissionStore = usePermissionStore()
const hiddenOption = [
  { label: "是", value: true },
  { label: "否", value: false }
]
const visible = ref(false)
const iconType = ref("svgIcon")
const icon = ref(undefined)
const elIcon = reactive<iconList[]>([])

const editIcon = (row: Menu) => {
  visible.value = true
  console.log(row)
}

const handleOk = () => {}

const getIcon = () => {
  elIcon.length = 0
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    elIcon.push({
      label: key,
      value: key,
      icon: component
    })
  }
}
getIcon()

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
</script>

<template>
  <page-padding>
    <div class="tool-bar">
      <a-button type="primary" size="small" class="bar-btn">保存</a-button>
      <a-button type="primary" size="small" danger class="bar-btn">删除</a-button>
    </div>
    <div class="menu-table">
      <vxe-table
        :column-config="{ resizable: true }"
        :data="permissionStore.menuList"
        :checkbox-config="{ labelField: 'name', highlight: true }"
        :tree-config="{ transform: true }"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        size="mini"
        style="height: 100%"
        border
      >
        <vxe-column type="checkbox" title="名称" width="280" tree-node />
        <vxe-column :field="item.field" :title="item.title" v-for="item in column" :key="item.field" :edit-render="{}">
          <template #default="{ row }" v-if="item.field === 'svgIcon'">
            <div class="icon-edit" @click="editIcon(row)">
              <svg-icon v-if="row['svgIcon']" :name="row['svgIcon']" />
              <component v-else-if="row['elIcon']" :is="row['elIcon']" class="el-icon" />
            </div>
          </template>
          <template #edit="{ row }">
            <vxe-select v-model="row[item.field]" v-if="item.field === 'hidden'" :options="hiddenOption" transfer />
            <div v-else-if="item.field === 'svgIcon'">
              <div class="icon-edit" @click="editIcon(row)">
                <svg-icon v-if="row['svgIcon']" :name="row['svgIcon']" />
                <component v-else-if="row['elIcon']" :is="row['elIcon']" class="el-icon" />
              </div>
            </div>
            <a-input v-else v-model:value="row[item.field]" style="width: 100%" />
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <a-modal v-model:visible="visible" title="图标编辑" @ok="handleOk" @cancel="visible = false">
      <div>
        <div class="icon-set">
          <a-radio-group v-model:value="iconType" @change="icon = undefined" button-style="solid">
            <a-radio-button value="svgIcon">svgIcon</a-radio-button>
            <a-radio-button value="elIcon">elIcon</a-radio-button>
            <a-radio-button value="local">localIcon</a-radio-button>
          </a-radio-group>
        </div>
        <div v-if="iconType === 'svgIcon'">
          <a-textarea v-model:value="icon" placeholder="菜单图标" allow-clear />
        </div>
        <div v-else-if="iconType == 'elIcon'">
          <a-select
            v-model:value="icon"
            style="width: 100%"
            placeholder="菜单图标选择"
            :options="elIcon"
            :filter-option="filterOption"
            show-search
          >
            <template #suffixIcon><component :is="icon" class="el-icon" /></template>
            <template #option="{ value: val, icon }">
              <div class="el-icon-list">
                <component :is="icon" class="el-icon" />
                <span>{{ val }}</span>
              </div>
            </template>
          </a-select>
        </div>
        <div v-else />
      </div>
    </a-modal>
  </page-padding>
</template>

<style lang="scss" scoped>
.tool-bar {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  background-color: #ffffff;
  padding: 8px;
  border: 1px solid #e4e7ed;
  .bar-btn {
    margin-right: 8px;
  }
}

.menu-table {
  width: 100%;
  padding: 8px;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  height: calc(100% - 50px);
  .icon-edit {
    width: 100%;
  }
}
.el-icon-list {
  width: 100%;
  display: flex;
  align-items: center;
  .el-icon {
    margin-right: 20px;
  }
}

.icon-set {
  width: 100%;
  margin-bottom: 20px;
}
</style>

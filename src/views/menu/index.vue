<script lang="ts" setup>
import pagePadding from "@/components/pagePadding/index.vue"
import { usePermissionStore } from "@/store/modules/permission"
import { reactive, ref } from "vue"
import { Menu, iconList } from "@/type/menu"
import { SearchOutlined } from "@ant-design/icons-vue"
import addMenu from "./addMenu/index.vue"
import { deleteMenu, updateMenu } from "@/api/login"
import { message } from "ant-design-vue"

const column = [
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
const loading = ref(false)
const permissionStore = usePermissionStore()
const gridRef = ref()
const hiddenOption = [
  { label: "是", value: true },
  { label: "否", value: false }
]
const visible = ref(false)
const icon = ref(undefined)
const elIcon = reactive<iconList[]>([])

const editIcon = (row: Menu) => {
  visible.value = true
  console.log(row)
}

const handleOk = () => {}

const getIcon = () => {
  elIcon.length = 0
}
getIcon()

const delMenu = () => {
  const id: number[] = []
  for (const item of gridRef.value.getCheckboxRecords() || []) id.push(item.id)
  deleteMenu(id).then((res: any) => {
    if (res.code === 200) {
      message.info(res.message)
    } else {
      message.error(res.message)
    }
  })
}

const search = async () => {
  loading.value = true
  await permissionStore.getMenu()
  loading.value = false
}

const upMenu = () => {
  updateMenu(permissionStore.menuList).then((res: any) => {
    if (res.code === 200) {
      message.info("更新成功!")
    } else {
      message.error(res.message)
    }
  })
}
</script>

<template>
  <page-padding>
    <div class="tool-bar">
      <add-menu class="bar-btn" />
      <a-button type="primary" size="small" class="bar-btn" @click="upMenu">保存</a-button>
      <a-button type="primary" size="small" danger class="bar-btn" @click="delMenu">删除</a-button>
      <a-button type="primary" size="small" class="bar-btn" @click="search">
        <template #icon>
          <search-outlined />
        </template>
        搜索
      </a-button>
    </div>
    <div class="menu-table">
      <vxe-table
        ref="gridRef"
        :column-config="{ resizable: true }"
        :data="permissionStore.menuList"
        :checkbox-config="{ labelField: 'name', highlight: true }"
        :tree-config="{ transform: true, rowField: 'id', parentField: 'parentId' }"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        size="mini"
        header-align="left"
        align="left"
        style="height: 100%"
        :loading="loading"
        border
      >
        <vxe-column type="checkbox" title="名称" tree-node />
        <vxe-column field="id" title="ID" />
        <vxe-column :field="item.field" :title="item.title" v-for="item in column" :key="item.field" :edit-render="{}">
          <template #default="{ row }" v-if="item.field === 'svgIcon'">
            <div class="icon-edit" @click="editIcon(row)">
              <svg-icon v-if="row['svgIcon']" :name="row['svgIcon']" />
              <component v-else-if="row['elIcon']" :is="row['elIcon']" class="el-icon" />
            </div>
          </template>
          <template #edit="{ row }" v-if="!['id'].includes(item.field)">
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
        <a-textarea v-model:value="icon" placeholder="菜单图标" allow-clear />
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

:deep(.vxe-header--row) {
  th {
    background-color: #ffffff !important;
  }
}
</style>

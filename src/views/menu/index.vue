<script lang="ts" setup>
import { reactive } from "vue"
import pagePadding from "@/components/pagePadding/index.vue"

const column = [
  {
    title: "name",
    field: "name"
  },
  {
    title: "type",
    field: "type"
  },
  {
    title: "size",
    field: "size"
  },
  {
    title: "date",
    field: "date"
  }
]

const menu = reactive({
  tableData: [
    { id: 10000, parentId: null, name: "test abc1", type: "mp3", size: 1024, date: "2020-08-01" },
    { id: 10050, parentId: null, name: "Test2", type: "mp4", size: null, date: "2021-04-01" },
    { id: 24300, parentId: 10050, name: "Test3", type: "avi", size: 1024, date: "2020-03-01" },
    { id: 20045, parentId: 24300, name: "test abc4", type: "html", size: 600, date: "2021-04-01" },
    { id: 10053, parentId: 24300, name: "test abc96", type: "avi", size: null, date: "2021-04-01" },
    { id: 24330, parentId: 10053, name: "test abc5", type: "txt", size: 25, date: "2021-10-01" },
    { id: 21011, parentId: 10053, name: "Test6", type: "pdf", size: 512, date: "2020-01-01" },
    { id: 22200, parentId: 10053, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23666, parentId: null, name: "Test8", type: "xlsx", size: 2048, date: "2020-11-01" },
    { id: 23677, parentId: 23666, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23671, parentId: 23677, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23672, parentId: 23677, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23688, parentId: 23666, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23681, parentId: 23688, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 23682, parentId: 23688, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 24555, parentId: null, name: "test abc9", type: "avi", size: 224, date: "2020-10-01" },
    { id: 24566, parentId: 24555, name: "Test7", type: "js", size: 1024, date: "2021-06-01" },
    { id: 24577, parentId: 24555, name: "Test7", type: "js", size: 1024, date: "2021-06-01" }
  ]
})
</script>

<template>
  <page-padding>
    <div class="tool-bar">
      <a-button type="primary" size="small" class="bar-btn">保存</a-button>
      <a-button type="primary" size="small" danger class="bar-btn">删除</a-button>
    </div>
    <vxe-table
      :column-config="{ resizable: true }"
      :data="menu.tableData"
      :checkbox-config="{ labelField: 'name', highlight: true }"
      :tree-config="{ transform: true }"
      :edit-config="{ trigger: 'click', mode: 'row' }"
      size="mini"
      border
    >
      <vxe-column type="checkbox" title="名称" width="280" tree-node />
      <vxe-column :field="item.field" :title="item.title" v-for="item in column" :key="item.field" :edit-render="{}">
        <template #edit="{ row }">
          <a-input v-model:value="row[item.field]" style="width: 150px" />
        </template>
      </vxe-column>
    </vxe-table>
  </page-padding>
</template>

<style lang="scss" scoped>
.tool-bar {
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  .bar-btn {
    margin-right: 8px;
  }
}
</style>

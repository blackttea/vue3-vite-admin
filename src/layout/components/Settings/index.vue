<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings"
import { reactive } from "vue"
import layoutSettings, { tagOption } from "@/config/layout"
import useDataType from "@/hooks/useDataType"

console.log(layoutSettings)
const settingsStore = useSettingsStore()
const drawerList = reactive([])
console.log(drawerList)
for (const l in layoutSettings) {
  if (useDataType(layoutSettings[l], "boolean")) {
    drawerList.push({
      label: tagOption[l].name,
      name: l
    })
  }
}
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item" v-for="item in drawerList" :key="item.name">
        <span>{{ item.label }}</span>
        <el-switch v-model="settingsStore[item.name]" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    padding-bottom: 8px;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    font-family: cursive;
    border-bottom: 1px solid #f3f3f3;
  }
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>

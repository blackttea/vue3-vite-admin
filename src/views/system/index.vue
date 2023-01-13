<script setup lang="ts">
import pagePadding from "@/components/pagePadding/index.vue"
import { reactive } from "vue"
import { setting } from "../../type/system"
import { useSettingsStore } from "@/store/modules/settings"
import layoutSettings, { tagOption } from "@/config/layout"

const settingsStore = useSettingsStore()
const settingList = reactive<setting[]>([])
for (const item in layoutSettings) {
  settingList.push({
    label: tagOption[item]["name"],
    name: item,
    tag: tagOption[item]["tag"],
    option: tagOption[item]["option"] || []
  })
}

const onFinish = (values: any) => {
  console.log("Success:", values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}

const modeChange = () => {
  const hiddenList: string[] = ["showTagsView", "fixedHeader", "showNotify", "navigation"]
  for (const hd of hiddenList) {
    settingsStore[hd] = settingsStore.mode === "vertical"
  }
}
const selectChange = (name: string) => {
  const _selectFun: any = {
    mode: modeChange
  }
  _selectFun[name]()
}
</script>

<template>
  <pagePadding>
    <div class="sys-setting">
      <div class="setting-main">
        <a-form
          :model="settingsStore"
          name="basic"
          layout="vertical"
          :label-col="{ style: { fontWeight: 500 } }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
          class="setting"
        >
          <a-form-item
            class="setting-item"
            :label="item.label"
            :name="item.name"
            v-for="item in settingList"
            :key="item.name"
          >
            <a-input v-if="item.tag === 'input'" v-model:value="settingsStore[item.name]" />
            <a-radio-group
              v-else-if="item.tag === 'radio'"
              v-model:value="settingsStore[item.name]"
              button-style="solid"
            >
              <a-radio-button :value="true">true</a-radio-button>
              <a-radio-button :value="false">false</a-radio-button>
            </a-radio-group>
            <a-select
              @change="selectChange(item.name)"
              v-else
              v-model:value="settingsStore[item.name]"
              :options="item.option"
            />
          </a-form-item>
          <div style="display: flex; width: 100%; padding: 8px">
            <a-button style="margin-left: auto" type="primary">保 存</a-button>
          </div>
        </a-form>
      </div>
    </div>
  </pagePadding>
</template>

<style scoped lang="scss">
.sys-setting {
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  .setting-main {
    width: 70%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    padding: 0 50px 0 50px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    .setting {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      .setting-item {
        width: calc(25% - 20px);
        margin: 10px;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        display: flex;
        align-items: center;
        padding: 8px 8px 16px 8px;
      }
    }
  }
}
</style>

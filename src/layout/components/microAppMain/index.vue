<template>
  <div style="height: 100%">
    <micro-app
      :name="name"
      :url="url"
      :data="microAppData"
      @created="handleCreate"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmount"
      @error="handleError"
      @datachange="handleDataChange"
      style="height: 100%"
      inline
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const url = ref(process.env.NODE_ENV === "development" ? "http://localhost:3002/app-one" : "通过配置获取线上地址")
const name = ref("app-one")
const microAppData = ref({ msg: "来自基座的数据" })

const handleCreate = (): void => {
  console.log("child-vue3 创建了")
}

const handleBeforeMount = (): void => {
  console.log("child-vue3 即将被渲染")
}
const handleMount = (): void => {
  console.log("child-vue3 已经渲染完成")

  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    microAppData.value = { msg: "来自基座的新数据" }
  }, 2000)
}

const handleUnmount = (): void => {
  console.log("child-vue3 卸载了")
}

const handleError = (): void => {
  console.log("child-vue3 加载出错了")
}

const handleDataChange = (e: CustomEvent): void => {
  console.log("来自子应用 child-vue3 的数据:", e.detail.data)
}
</script>

<style></style>

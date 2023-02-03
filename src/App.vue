<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
// import zhCn from "element-plus/lib/locale/lang/zh-cn"

import enUS from "ant-design-vue/es/locale/en_US"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"

dayjs.locale("en")

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
/** 将 Element Plus 的语言设置为中文 */
// const locale = zhCn
const locale = "zh"
</script>

<template>
  <a-config-provider :locale="locale === 'en' ? enUS : zhCN">
    <router-view />
  </a-config-provider>
</template>

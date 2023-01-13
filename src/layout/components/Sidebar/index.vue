<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"
import SidebarItem from "./SidebarItem.vue"
import SidebarLogo from "./SidebarLogo.vue"
import { getCssVariableValue } from "@/utils"
import { useTagsViewStore } from "@/store/modules/tags-view"
import { message } from "ant-design-vue"

const v3SidebarMenuBgColor = getCssVariableValue("--v3-sidebar-menu-bg-color")
const v3SidebarMenuTextColor = getCssVariableValue("--v3-sidebar-menu-text-color")
const v3SidebarMenuActiveTextColor = getCssVariableValue("--v3-sidebar-menu-active-text-color")

const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()
const tagsViewStore = useTagsViewStore()
const router = useRouter()

const { showSidebarLogo } = storeToRefs(settingsStore)

const activeMenu = ref<string>()

const isCollapse = computed(() => {
  return settingsStore.mode === "vertical" ? !appStore.sidebar.opened : false
})

const selectMenu = (menu: string) => {
  const pathId = parseInt(menu)
  let path = ""
  const pm = permissionStore.menuList
  const resolvePath = (id: number): any => {
    const index = pm.findIndex((m) => {
      return m.id === id
    })
    path = path ? `${pm[index].path}/${path}` : `${pm[index].path}`
    if (!pm[index].parentId) return
    else {
      const indexParent = pm.findIndex((m) => {
        return m.id === pm[index].parentId
      })
      return resolvePath(pm[indexParent].id)
    }
  }
  resolvePath(pathId)
  if (tagsViewStore.visitedViews.length >= settingsStore.tagNum) {
    console.log(tagsViewStore.visitedViews)
    const isActive = tagsViewStore.visitedViews.findIndex((r) => {
      return (r.path || "") === path
    })
    if (isActive < 0) {
      message.error("tag数量超过限制!")
      return
    }
  }
  activeMenu.value = `${menu}`
  router.push(path)
}
</script>

<template>
  <div :class="{ 'has-logo': showSidebarLogo, 'menu-hor': settingsStore.mode === 'horizontal' }">
    <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper" :class="{ menuHorizontal: settingsStore.mode === 'horizontal' }">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :unique-opened="true"
        @select="selectMenu"
        :collapse-transition="false"
        :mode="settingsStore.mode"
      >
        <SidebarItem
          v-for="route in permissionStore.menu"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
  display: flex !important;
}

:deep(.el-sub-menu__title) {
  display: flex !important;
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--v3-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}

.menuHorizontal {
  width: calc(100% - 200px);
  height: var(--v3-header-height) !important;
  :deep(.first-level) {
    display: flex;
    align-items: center;
  }
}
.menu-hor {
  display: flex;
}
</style>

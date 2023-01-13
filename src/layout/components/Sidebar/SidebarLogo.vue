<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings"

const settingsStore = useSettingsStore()
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: props.collapse, logoHorizontal: settingsStore.mode === 'horizontal' }"
  >
    <transition name="sidebar-logo-fade">
      <img v-if="props.collapse" :src="settingsStore.logoNotFold" class="sidebar-logo" />
      <img v-else :src="settingsStore.logoFold" class="sidebar-logo-text" />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: var(--v3-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    display: none;
  }
  .sidebar-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.collapse {
  .sidebar-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .sidebar-logo-text {
    display: none;
  }
}

.logoHorizontal {
  width: 200px !important;
}
</style>

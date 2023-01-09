<script setup>
import bkMdPreview from "@/components/bkMdPreview/index.vue"
import bkMdEditor from "@/components/bkMdEditor/index.vue"
</script>

<template>
  <div class="app-container center">
    <bk-md-editor />
    <bk-md-preview />
  </div>
</template>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  overflow: auto;
}
</style>

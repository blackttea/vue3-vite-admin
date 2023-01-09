<script lang="ts" setup></script>

<template>
  <div class="page-padding" v-bind="{ ...$attrs }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.page-padding {
  width: 100%;
  height: 100%;
  padding: 8px;
  background-color: #ffffff;
}
</style>

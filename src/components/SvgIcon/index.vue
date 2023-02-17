<script lang="ts" setup>
import { computed, ref } from "vue"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: () => {
      return 18
    }
  },
  height: {
    type: Number,
    default: () => {
      return 18
    }
  },
  color: {
    type: String,
    default: () => {
      return "#c0c4cc"
    }
  }
})
const svgIcon = ref<string>("")
if (props.name.length > 15) {
  const w_icon = props.name.replace(/width="\d+"/g, `width="${props.width}"`)
  svgIcon.value = w_icon.replace(/height="\d+"/g, `width="${props.height}"`)
  svgIcon.value = svgIcon.value.replaceAll(/fill="[\s\S]+"/g, `fill="${props.color}"`)
}
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgStyle = ref({ width: `${props.width}px`, height: `${props.height}px`, fill: props.color })
</script>

<template>
  <svg v-if="props.name.length <= 15" :style="svgStyle" class="svg-con svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
  <span v-else v-html="svgIcon" class="w-svg-icon" :style="{ fill: color }" />
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}
.w-svg-icon {
  margin-right: 12px;
}
.svg-con {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
}
</style>

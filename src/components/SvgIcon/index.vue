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
      return "#ffffff"
    }
  }
})
const svgIcon = ref<string>("")
console.log(props.name)
if (props.name.length > 15) {
  const w_icon = props.name.replace(/width="\d+"/g, `width="${props.width}"`)
  svgIcon.value = w_icon.replace(/height="\d+"/g, `width="${props.height}"`)
  svgIcon.value = svgIcon.value.replaceAll(/fill="[\s\S]+"/g, `fill="${props.color}"`)
}
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgStyle = ref({ width: `${props.width}px`, height: `${props.height}px` })
</script>

<template>
  <div v-if="props.name.length <= 15" :style="svgStyle" class="svg-con">
    <svg class="svg-icon" aria-hidden="true">
      <use :href="symbolId" />
    </svg>
  </div>
  <span v-else v-html="svgIcon" class="w-svg-icon" />
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

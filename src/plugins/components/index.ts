import { type App } from "vue"
import pagePadding from "@/components/pagePadding/index.vue"
import SvgIcon from "@/components/SvgIcon/index.vue"

export function loadComponent(app: App) {
  /** Element Plus 组件完整引入 */
  const componentList = [pagePadding, SvgIcon]
  const nameList = ["padding", "svg-icon"]
  for (const n in nameList) app.component(nameList[n], componentList[n])
}

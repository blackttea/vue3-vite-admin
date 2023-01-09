import { type App } from "vue"
import Antd from "ant-design-vue"

export function loadAntd(app: App) {
  /** antDesign vue 组件完整引入 */
  app.use(Antd)
}

import { type App } from "vue"
import { loadElementPlus } from "./element-pus"
import { loadElementPlusIcon } from "./element-pus-icon"
import { loadVxeTable } from "./vxe-table"
import { loadAntd } from "./antd"
import { loadComponent } from "./components"

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
  loadVxeTable(app)
  loadAntd(app)
  loadComponent(app)
}

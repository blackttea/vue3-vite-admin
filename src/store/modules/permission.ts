import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { Menu } from "@/type/menu"
import useFormatTree from "@/hooks/useFormatTree"
const view = import.meta.glob("../../**/**/**.vue")
const _menuPrefix = "../../views"

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const menu = ref<RouteRecordRaw[]>([])
  const menuList = ref<Array<Menu>>([])
  const getMenu = () => {
    const m: Menu[] = [
      {
        title: "首页",
        name: "Dashboard",
        path: "/dashboard",
        component: `${_menuPrefix}/dashboard/index.vue`,
        hidden: false,
        redirect: "",
        id: 0,
        parentId: null,
        svgIcon: "dashboard",
        seq: 0
      },
      {
        title: "表格",
        path: "/table",
        name: "Table",
        component: null,
        hidden: false,
        redirect: "",
        id: 1,
        parentId: null,
        svgIcon: "lock",
        seq: 1
      },
      {
        title: "微前端",
        path: "/micro/Login",
        name: "Map",
        component: "../../layout/components/microAppMain/index.vue",
        hidden: false,
        redirect: "",
        id: 111,
        parentId: null,
        svgIcon: "lock",
        seq: 111
      },
      {
        title: "权限",
        name: "Permission",
        path: "/permission",
        component: null,
        hidden: false,
        redirect: "",
        id: 2,
        parentId: null,
        svgIcon: "lock",
        seq: 2
      },
      {
        title: "antd-table",
        path: "antd",
        name: "Antd",
        component: `${_menuPrefix}/table/element-plus/index.vue`,
        hidden: false,
        redirect: "",
        id: 3,
        parentId: 1,
        svgIcon: "",
        seq: 3
      },
      {
        title: "vxe-table",
        path: "vxe",
        name: "Vxe",
        component: `${_menuPrefix}/table/vxe-table/index.vue`,
        hidden: false,
        redirect: "",
        id: 4,
        parentId: 1,
        svgIcon: "",
        seq: 4
      },
      {
        title: "页面权限",
        name: "Page",
        path: "page",
        component: `${_menuPrefix}/permission/page.vue`,
        hidden: false,
        redirect: "",
        id: 5,
        parentId: 2,
        svgIcon: "",
        seq: 5
      },
      {
        title: "按钮权限",
        path: "directive",
        name: "Directive",
        component: `${_menuPrefix}/permission/directive.vue`,
        hidden: false,
        redirect: "",
        id: 6,
        parentId: 2,
        svgIcon: "",
        seq: 6
      }
    ]
    const reFormData = (data: any): void => {
      if (!data["component"] || data["component"] === "../layout/index.vue") data["children"] = []
      data["component"] = view[data["component"]] || data["component"]
      data["meta"] = {}
      const showList = ["hidden", "title", "svgIcon"]
      for (const item of showList) if (data[item] !== undefined) data["meta"][item] = data[item]
    }

    menu.value.length = 0
    menuList.value.length = 0
    const menuRoute = useFormatTree(m, "id", "parentId", "children", reFormData, undefined)
    for (const item of menuRoute) menu.value.push(item)
    for (const n of m) menuList.value.push(n)
  }
  getMenu()
  const setRoutes = (roles: string[]) => {
    let accessedRoutes
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = constantRoutes[4]?.children || []
    dynamicRoutes.value = accessedRoutes
  }

  return { routes, dynamicRoutes, setRoutes, menu, menuList }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}

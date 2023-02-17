import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { type RouteRecordRaw } from "vue-router"
import { constantRoutes, asyncRoutes } from "@/router"
import { Menu } from "@/type/menu"
import useFormatTree from "@/hooks/useFormatTree"
import useDeepClone from "@/hooks/useDeepClone"
import { getMenuApi } from "@/api/login"
import { message } from "ant-design-vue"
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
  const parentList = ref<Array<Menu>>([])

  let m: Menu[] = []
  const getMenu = async () => {
    await getMenuApi().then((res: any) => {
      if (res.code == "200") {
        m = res.data
      } else {
        message.error(res.message)
      }
    })

    const reFormData = (data: any): void => {
      if (!data["component"] || data["component"] === "../layout/index.vue") data["children"] = []
      data["component"] = view[data["component"]] || data["component"]
      data["meta"] = {}
      const showList = ["hidden", "title", "svgIcon", "elIcon"]
      for (const item of showList) if (data[item] !== undefined) data["meta"][item] = data[item]
    }

    menu.value.length = 0
    menuList.value.length = 0
    parentList.value.length = 0
    const mCopy = useDeepClone(m)
    const mCopy1 = useDeepClone(m)
    for (const n of mCopy) menuList.value.push(n)
    const menuRoute = useFormatTree(m, "id", "parentId", "children", reFormData, undefined)
    for (const item of menuRoute) menu.value.push(item)

    const reFormData1 = (data: any): void => {
      data["value"] = data["id"]
    }
    const menuRoute1 = useFormatTree(mCopy1, "id", "parentId", "children", reFormData1, undefined)
    for (const item of menuRoute1) parentList.value.push(item)
  }

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

  return { routes, dynamicRoutes, setRoutes, menu, menuList, getMenu, parentList }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}

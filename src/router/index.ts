import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"
import { Menu } from "../type/menu"
const view = import.meta.glob("../**/**/**.vue")
const layout = import.meta.glob("../layout/**/**.vue")
let r: any = []
console.log(view, layout)

const Layout = layout["../layout/index.vue"]
console.log(Layout)

const menuList: Menu[] = [
  {
    title: "首页",
    name: "Dashboard",
    path: "/dashboard",
    component: "../views/dashboard/index.vue",
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
    component: null,
    hidden: false,
    redirect: "",
    id: 3,
    parentId: 1,
    svgIcon: "",
    seq: 3
  },
  {
    title: "antd-table",
    path: "antd",
    name: "Antd",
    component: "../views/table/element-plus/index.vue",
    hidden: false,
    redirect: "",
    id: 10,
    parentId: 3,
    svgIcon: "",
    seq: 10
  },
  {
    title: "vxe-table",
    path: "vxe",
    name: "Vxe",
    component: "../views/table/vxe-table/index.vue",
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
    component: "../views/permission/page.vue",
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
    component: "../views/permission/directive.vue",
    hidden: false,
    redirect: "",
    id: 5,
    parentId: 2,
    svgIcon: "",
    seq: 5
  }
]
console.log(menuList)

const formatTree = (data: any, id: string, parentId: string, childName: string, reForm: any) => {
  const result: any = []
  const map: any = {}
  if (!Array.isArray(data)) {
    return []
  }
  data.forEach((item: any) => {
    map[item[id]] = item
  })
  data.forEach((item: any) => {
    const parent = map[item[parentId]]
    if (Object.prototype.toString.call(reForm) === "[object Function]") reForm(item)
    if (parent) {
      if (!parent[childName]) parent[childName] = []
      parent[childName].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

const formatMenu = (menuList: Menu[]) => {
  const reFormData = (data: any) => {
    if (!data["component"] || data["component"] === "../layout/index.vue") data["children"] = []
    data["component"] = view[data["component"]]
    data["meta"] = {}
    const showList = ["hidden", "title", "svgIcon"]
    for (const item of showList) if (data[item] !== undefined) data["meta"][item] = data[item]
  }
  r = formatTree(menuList, "id", "parentId", "children", reFormData)
}

formatMenu(menuList)

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    children: [...r]
  },
  {
    path: "/menu",
    component: view["../views/menu/index.vue"],
    name: "Menu",
    meta: {
      title: "多级菜单",
      svgIcon: "menu",
      hidden: true
    }
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  // {
  //   path: "/permission",
  //   component: Layout,
  //   redirect: "/permission/page",
  //   name: "Permission",
  //   meta: {
  //     title: "权限管理",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "page",
  //       component: () => import("@/views/permission/page.vue"),
  //       name: "PagePermission",
  //       meta: {
  //         title: "页面权限",
  //         roles: ["admin"] // 或者在子导航中设置角色
  //       }
  //     },
  //     {
  //       path: "directive",
  //       component: () => import("@/views/permission/directive.vue"),
  //       name: "DirectivePermission",
  //       meta: {
  //         title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
  //       }
  //     }
  //   ]
  // },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router

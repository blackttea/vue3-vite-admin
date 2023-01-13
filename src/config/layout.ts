import useRequireImg from "@/hooks/useRequireImg"
import { typeCast } from "../type/general"

/** 布局配置 */
interface ILayoutSettings {
  /** 是否显示 Settings Panel */
  showSettings: boolean
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示侧边栏 Logo */
  showSidebarLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示消息通知 */
  showNotify: boolean
  /** 是否显示切换主题按钮 */
  showThemeSwitch: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
  /** 系统主题颜色 */
  systemColor: string
  /** 登录页背景图片 */
  loginBackImg: string
  /** 展开logo */
  logoNotFold: string
  /** 折叠logo */
  logoFold: string
  /** 路由tag最大数量 */
  tagNum: number
  /** menuModel */
  mode: string
  /** 展示navigation */
  navigation: boolean
}

interface setTag {
  tag: string
  name: string
  option?: Array<any>
}

/**
 * Construct a type with a set of properties K of type T
 */

const tagOption: typeCast<ILayoutSettings, setTag> = {
  showSettings: {
    tag: "radio",
    name: "显示侧边设置"
  },
  showTagsView: {
    tag: "radio",
    name: "显示标签栏"
  },
  fixedHeader: {
    tag: "radio",
    name: "固定 Header"
  },
  showSidebarLogo: {
    tag: "radio",
    name: "显示侧边栏 Logo"
  },
  showNotify: {
    tag: "radio",
    name: "显示消息通知"
  },
  showThemeSwitch: {
    tag: "radio",
    name: "显示切换主题按钮"
  },
  showScreenfull: {
    tag: "radio",
    name: "显示全屏按钮"
  },
  navigation: {
    tag: "radio",
    name: "显示导航栏"
  },
  showGreyMode: {
    tag: "radio",
    name: "显示灰色模式"
  },
  showColorWeakness: {
    tag: "radio",
    name: "显示色弱模式"
  },
  systemColor: {
    tag: "select",
    name: "系统风格",
    option: [
      {
        label: "默认",
        value: "normal"
      },
      {
        label: "黑暗",
        value: "dark"
      },
      {
        label: "深蓝",
        value: "dark-blue"
      }
    ]
  },
  loginBackImg: {
    tag: "input",
    name: "登录页背景图片"
  },
  logoNotFold: {
    tag: "input",
    name: "侧边栏 Logo"
  },
  logoFold: {
    tag: "input",
    name: "折叠侧边栏 Logo"
  },
  tagNum: {
    tag: "input",
    name: "标签上限个数"
  },
  mode: {
    tag: "select",
    name: "菜单模式",
    option: [
      {
        label: "horizontal",
        value: "horizontal"
      },
      {
        label: "vertical",
        value: "vertical"
      }
    ]
  }
}

const layoutSettings: ILayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: true,
  showSidebarLogo: true,
  showNotify: true,
  showThemeSwitch: true,
  showScreenfull: true,
  showGreyMode: false,
  showColorWeakness: false,
  navigation: true,
  systemColor: "normal",
  loginBackImg: useRequireImg("../assets/login/loginBack1.png"),
  logoNotFold: useRequireImg("../assets/layout/logo-text-1.png"),
  logoFold: useRequireImg("../assets/layout/logo.png"),
  tagNum: 10,
  mode: "vertical"
}

export default layoutSettings
export { tagOption }

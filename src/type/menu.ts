export declare interface Menu {
  title: string
  path: string
  name: string
  component: string | null
  hidden: boolean
  redirect: string
  id?: number
  svgIcon?: string
  elIcon?: string
  seq: number | undefined
  parentId: number | null | undefined
  children?: Array<object>
}

export declare interface iconList {
  label: string
  value: string
  icon: any
}

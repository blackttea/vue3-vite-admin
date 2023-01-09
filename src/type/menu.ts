export declare interface Menu {
  title: string
  path: string
  name: string
  component: string | null
  hidden: boolean
  redirect: string
  id: number
  svgIcon: string
  seq: number
  parentId: number | null
  children?: Array<object>
}

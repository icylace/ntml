import type { PropList, VDOM, VNode } from "hyperapp"

export type Content = number | string | VNode
export type Contents = Content | readonly Content[]

const NO_PROPS = {}
const NO_CHILDREN: never[] = []
const TEXT_NODE = 3

const text = (value: number | string): VDOM => ({
  type: String (value),
  props: NO_PROPS,
  children: NO_CHILDREN,
  node: undefined,
  key: null,
  tag: TEXT_NODE,
})

const textual = (x: Content): VNode =>
  typeof x === "number" || typeof x === "string" ? text (x) : x

const stuff = (x: Contents): VNode[] =>
  Array.isArray (x) ? x.map (textual) : [textual (x as Content)]

const n = (type: string) => (x: Contents | PropList, y?: Contents): VDOM => {
  if (Array.isArray (x) || typeof x !== "object" || (x && "node" in x)) {
    return {
      type,
      props: NO_PROPS,
      children: stuff (x as Content),
      node: undefined,
      key: undefined,
      tag: undefined,
    }
  }
  const props = x as PropList
  return {
    type,
    props: props,
    children: stuff (y as Content),
    node: undefined,
    key: props.key,
    tag: undefined,
  }
}

export const a = n ("a")
export const b = n ("b")
export const i = n ("i")
export const p = n ("p")
export const q = n ("q")
export const s = n ("s")
export const br = n ("br")
export const dd = n ("dd")
export const dl = n ("dl")
export const dt = n ("dt")
export const em = n ("em")
export const h1 = n ("h1")
export const h2 = n ("h2")
export const h3 = n ("h3")
export const h4 = n ("h4")
export const h5 = n ("h5")
export const h6 = n ("h6")
export const hr = n ("hr")
export const li = n ("li")
export const ol = n ("ol")
export const rp = n ("rp")
export const rt = n ("rt")
export const td = n ("td")
export const th = n ("th")
export const tr = n ("tr")
export const ul = n ("ul")
export const bdi = n ("bdi")
export const bdo = n ("bdo")
export const col = n ("col")
export const del = n ("del")
export const dfn = n ("dfn")
export const div = n ("div")
export const img = n ("img")
export const ins = n ("ins")
export const kbd = n ("kbd")
export const map = n ("map")
export const nav = n ("nav")
export const pre = n ("pre")
export const rtc = n ("rtc")
export const sub = n ("sub")
export const sup = n ("sup")
export const svg = n ("svg")
export const wbr = n ("wbr")
export const abbr = n ("abbr")
export const area = n ("area")
export const cite = n ("cite")
export const code = n ("code")
export const data = n ("data")
export const form = n ("form")
export const main = n ("main")
export const mark = n ("mark")
export const ruby = n ("ruby")
export const samp = n ("samp")
export const span = n ("span")
export const time = n ("time")
export const aside = n ("aside")
export const audio = n ("audio")
export const input = n ("input")
export const label = n ("label")
export const meter = n ("meter")
export const param = n ("param")
export const small = n ("small")
export const table = n ("table")
export const tbody = n ("tbody")
export const tfoot = n ("tfoot")
export const thead = n ("thead")
export const track = n ("track")
export const video = n ("video")
export const button = n ("button")
export const canvas = n ("canvas")
export const dialog = n ("dialog")
export const figure = n ("figure")
export const footer = n ("footer")
export const header = n ("header")
export const iframe = n ("iframe")
export const legend = n ("legend")
export const object = n ("object")
export const option = n ("option")
export const output = n ("output")
export const select = n ("select")
export const source = n ("source")
export const strong = n ("strong")
export const address = n ("address")
export const article = n ("article")
export const caption = n ("caption")
export const details = n ("details")
export const section = n ("section")
export const summary = n ("summary")
export const picture = n ("picture")
export const colgroup = n ("colgroup")
export const datalist = n ("datalist")
export const fieldset = n ("fieldset")
export const menuitem = n ("menuitem")
export const optgroup = n ("optgroup")
export const progress = n ("progress")
export const textarea = n ("textarea")
export const blockquote = n ("blockquote")
export const figcaption = n ("figcaption")

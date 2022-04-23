import type { CustomPayloads, MaybeVNode, Props, VNode } from "hyperapp"
import { h, text } from "hyperapp"

export type { Content, Stuff, ValidatedPropList }
export { isContent, isStuff, isVDOM, n, typedN }
export {
  a, b, i, p, q, s, br, dd, dl, dt, em, h1, h2, h3, h4, h5, h6, hr, li, ol, rp,
  rt, td, th, tr, ul, bdi, bdo, col, del, dfn, div, img, ins, kbd, map, nav,
  pre, rtc, sub, sup, svg, wbr, abbr, area, cite, code, data, form, main, mark,
  ruby, samp, span, time, aside, audio, input, label, meter, param, small,
  table, tbody, tfoot, thead, track, video, button, canvas, dialog, figure,
  footer, header, iframe, legend, object, option, output, select, source,
  strong, address, article, caption, details, section, summary, picture,
  colgroup, datalist, fieldset, menuitem, optgroup, progress, textarea,
  blockquote, figcaption
}

// -----------------------------------------------------------------------------

type Stuff<S> = number | string | MaybeVNode<S> | ((..._: any[]) => VNode<S>)
type Content<S> = Stuff<S> | Stuff<S>[]
type ValidatedPropList<S, C> = CustomPayloads<S, C> & Props<S>

const stuff = <S>(x: Stuff<S>): MaybeVNode<S> =>
  typeof x === "number" || typeof x === "string" ? text(x)
  : typeof x === "function" ? x()
  : x

const group = <S>(x: Content<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  Array.isArray(x) ? x.map(a => stuff(a)) : stuff<S>(x)

const givenPropList = <S>(x: Content<S> | Props<S>): x is Props<S> =>
  typeof x === "object" && x != null && !Array.isArray(x) && !("node" in x)

const n = <C = unknown>(tag: string) => {
  function node<S>(x: Content<S>): VNode<S>
  function node<S>(x: ValidatedPropList<S, C>, children?: Content<S>): VNode<S>
  function node<S>(x: ValidatedPropList<S, C> | Content<S>, children?: Content<S>): VNode<S> {
    return givenPropList<S>(x)
      ? h<S>(tag, x, group(children))
      : h<S>(tag, {}, group(x))
  }
  return node
}

const typedN = <S>() => <C = unknown>(tag: string) => {
  function node(x: Content<S>): VNode<S>
  function node(x: ValidatedPropList<S, C>, children?: Content<S>): VNode<S>
  function node(x: ValidatedPropList<S, C> | Content<S>, children?: Content<S>): VNode<S> {
    return givenPropList<S>(x)
      ? h<S>(tag, x, group(children))
      : h<S>(tag, {}, group(x))
  }
  return node
}

const a = n("a")
const b = n("b")
const i = n("i")
const p = n("p")
const q = n("q")
const s = n("s")
const br = n("br")
const dd = n("dd")
const dl = n("dl")
const dt = n("dt")
const em = n("em")
const h1 = n("h1")
const h2 = n("h2")
const h3 = n("h3")
const h4 = n("h4")
const h5 = n("h5")
const h6 = n("h6")
const hr = n("hr")
const li = n("li")
const ol = n("ol")
const rp = n("rp")
const rt = n("rt")
const td = n("td")
const th = n("th")
const tr = n("tr")
const ul = n("ul")
const bdi = n("bdi")
const bdo = n("bdo")
const col = n("col")
const del = n("del")
const dfn = n("dfn")
const div = n("div")
const img = n("img")
const ins = n("ins")
const kbd = n("kbd")
const map = n("map")
const nav = n("nav")
const pre = n("pre")
const rtc = n("rtc")
const sub = n("sub")
const sup = n("sup")
const svg = n("svg")
const wbr = n("wbr")
const abbr = n("abbr")
const area = n("area")
const cite = n("cite")
const code = n("code")
const data = n("data")
const form = n("form")
const main = n("main")
const mark = n("mark")
const ruby = n("ruby")
const samp = n("samp")
const span = n("span")
const time = n("time")
const aside = n("aside")
const audio = n("audio")
const input = n("input")
const label = n("label")
const meter = n("meter")
const param = n("param")
const small = n("small")
const table = n("table")
const tbody = n("tbody")
const tfoot = n("tfoot")
const thead = n("thead")
const track = n("track")
const video = n("video")
const button = n("button")
const canvas = n("canvas")
const dialog = n("dialog")
const figure = n("figure")
const footer = n("footer")
const header = n("header")
const iframe = n("iframe")
const legend = n("legend")
const object = n("object")
const option = n("option")
const output = n("output")
const select = n("select")
const source = n("source")
const strong = n("strong")
const address = n("address")
const article = n("article")
const caption = n("caption")
const details = n("details")
const section = n("section")
const summary = n("summary")
const picture = n("picture")
const colgroup = n("colgroup")
const datalist = n("datalist")
const fieldset = n("fieldset")
const menuitem = n("menuitem")
const optgroup = n("optgroup")
const progress = n("progress")
const textarea = n("textarea")
const blockquote = n("blockquote")
const figcaption = n("figcaption")

const isContent = <S>(x: any): x is Content<S> =>
  Array.isArray(x) ? x.every(isStuff) : isStuff(x)

const isStuff = <S>(x: any): x is Stuff<S> =>
  x == null
    || typeof x === "boolean"
    || typeof x === "function"
    || typeof x === "number"
    || typeof x === "string"
    || isVDOM(x)

const isVDOM = <S>(x: any): x is VNode<S> =>
  typeof x === "object" && "node" in x

// TODO:
// // Tests.
// let _
// _ = <S>(): VDOM<S> => div("foo")
// _ = <S>(): VDOM<S> => div(["foo"])
// _ = <S>(): VDOM<S> => div(div("foo"))
// _ = <S>(): VDOM<S> => div(div(["foo"]))
// _ = <S>(): VDOM<S> => div([div("foo")])
// _ = <S>(): VDOM<S> => div([div(["foo"])])
// _ = <S>(): VDOM<S> => div<S>([div(["foo"])])
// _ = <S>(): VDOM<S> => div([div<S>(["foo"])])
// _ = <S>(): VDOM<S> => div({ class: "bar" }, "foo")
// _ = <S>(): VDOM<S> => div({ class: "bar" }, ["foo"])
// _ = <S>(): VDOM<S> => div({ class: "bar" }, div("foo"))
// _ = <S>(): VDOM<S> => div({ class: "bar" }, div(["foo"]))
// _ = <S>(): VDOM<S> => div({ class: "bar" }, [div("foo")])
// _ = <S>(): VDOM<S> => div({ class: "bar" }, [div(["foo"])])
// _

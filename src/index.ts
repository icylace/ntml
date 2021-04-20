import type { MaybeVDOM, PropList, VDOM, ValidateCustomPayloads } from "hyperapp"

import { h, text } from "hyperapp"

export type Stuff<S> = number | string | MaybeVDOM<S> | ((..._: any[]) => VDOM<S>)
export type Content<S> = Stuff<S> | Stuff<S>[]
export type ValidatedPropList<S, C> = ValidateCustomPayloads<S, C> & PropList<S>

const stuff = <S>(x: Stuff<S>): MaybeVDOM<S> =>
  typeof x === "number" || typeof x === "string" ? text(x)
  : typeof x === "function" ? x()
  : x

const group = <S>(x: Content<S>): MaybeVDOM<S> | readonly MaybeVDOM<S>[] =>
  Array.isArray(x) ? x.map(a => stuff(a)) : stuff<S>(x)

const givenPropList = <S>(x: Content<S> | PropList<S>): x is PropList<S> =>
  typeof x === "object" && x != null && !Array.isArray(x) && !("node" in x)

export const n = <T = never, C = unknown>(tag: string) => {
  function node<S>(x: Content<T | S>): VDOM<T | S>
  function node<S>(x: ValidatedPropList<T | S, C>, children?: Content<T | S>): VDOM<T | S>
  function node<S>(x: ValidatedPropList<T | S, C> | Content<T | S>, children?: Content<T | S>): VDOM<T | S> {
    return givenPropList<T | S>(x)
      ? h<T | S>(tag, x, group(children))
      : h<T | S>(tag, {}, group(x))
  }
  return node
}

export const typedN = <S>() => <C = unknown>(tag: string) => {
  function node(x: Content<S>): VDOM<S>
  function node(x: ValidatedPropList<S, C>, children?: Content<S>): VDOM<S>
  function node(x: ValidatedPropList<S, C> | Content<S>, children?: Content<S>): VDOM<S> {
    return givenPropList<S>(x)
      ? h<S>(tag, x, group(children))
      : h<S>(tag, {}, group(x))
  }
  return node
}

export const a = n("a")
export const b = n("b")
export const i = n("i")
export const p = n("p")
export const q = n("q")
export const s = n("s")
export const br = n("br")
export const dd = n("dd")
export const dl = n("dl")
export const dt = n("dt")
export const em = n("em")
export const h1 = n("h1")
export const h2 = n("h2")
export const h3 = n("h3")
export const h4 = n("h4")
export const h5 = n("h5")
export const h6 = n("h6")
export const hr = n("hr")
export const li = n("li")
export const ol = n("ol")
export const rp = n("rp")
export const rt = n("rt")
export const td = n("td")
export const th = n("th")
export const tr = n("tr")
export const ul = n("ul")
export const bdi = n("bdi")
export const bdo = n("bdo")
export const col = n("col")
export const del = n("del")
export const dfn = n("dfn")
export const div = n("div")
export const img = n("img")
export const ins = n("ins")
export const kbd = n("kbd")
export const map = n("map")
export const nav = n("nav")
export const pre = n("pre")
export const rtc = n("rtc")
export const sub = n("sub")
export const sup = n("sup")
export const svg = n("svg")
export const wbr = n("wbr")
export const abbr = n("abbr")
export const area = n("area")
export const cite = n("cite")
export const code = n("code")
export const data = n("data")
export const form = n("form")
export const main = n("main")
export const mark = n("mark")
export const ruby = n("ruby")
export const samp = n("samp")
export const span = n("span")
export const time = n("time")
export const aside = n("aside")
export const audio = n("audio")
export const input = n("input")
export const label = n("label")
export const meter = n("meter")
export const param = n("param")
export const small = n("small")
export const table = n("table")
export const tbody = n("tbody")
export const tfoot = n("tfoot")
export const thead = n("thead")
export const track = n("track")
export const video = n("video")
export const button = n("button")
export const canvas = n("canvas")
export const dialog = n("dialog")
export const figure = n("figure")
export const footer = n("footer")
export const header = n("header")
export const iframe = n("iframe")
export const legend = n("legend")
export const object = n("object")
export const option = n("option")
export const output = n("output")
export const select = n("select")
export const source = n("source")
export const strong = n("strong")
export const address = n("address")
export const article = n("article")
export const caption = n("caption")
export const details = n("details")
export const section = n("section")
export const summary = n("summary")
export const picture = n("picture")
export const colgroup = n("colgroup")
export const datalist = n("datalist")
export const fieldset = n("fieldset")
export const menuitem = n("menuitem")
export const optgroup = n("optgroup")
export const progress = n("progress")
export const textarea = n("textarea")
export const blockquote = n("blockquote")
export const figcaption = n("figcaption")

export const isContent = <S>(x: any): x is Content<S> =>
  Array.isArray(x) ? x.every(isStuff) : isStuff(x)

export const isStuff = <S>(x: any): x is Stuff<S> =>
  x == null
    || typeof x === "boolean"
    || typeof x === "function"
    || typeof x === "number"
    || typeof x === "string"
    || isVDOM(x)

export const isVDOM = <S>(x: any): x is VDOM<S> =>
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

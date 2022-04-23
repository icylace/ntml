import type { VDOM } from "hyperapp"

import { expectType } from "tsd"
import { n, typedN } from "../src/index"

type State = { foo: number }

const myN = typedN<State>()

const a = myN("a")
expectType<VDOM<State>>(a("hi"))

const b = n("b")
expectType<VDOM<unknown>>(b("hjgkjhg"))
expectType<VDOM<State>>(b<State>("hjgkjhg"))

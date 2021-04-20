import type { VDOM } from "hyperapp"

import { expectType, expectError } from "tsd"
import { n, typedN } from "../src/index"

type State = { foo: number }

const myN = typedN<State>()

const a = myN("a")
expectType<VDOM<State>>(a("hi"))
// expectError(a<State>("hi"))    // Intentionally errors.

const b = n("b")
expectType<VDOM<State>>(b("hjgkjhg"))
expectType<VDOM<State>>(b<State>("hjgkjhg"))

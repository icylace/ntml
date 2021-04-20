import type { VDOM } from "hyperapp"

import { n, typedN } from "../src/index"

type State = { foo: number }

const myN = typedN<State>()

const a = myN("a")
const x0 = a("hi")
// const x1 = a<State>("hi")    // Intentionally errors.
const x2: VDOM<State> = a("hi")
// const x3: VDOM<State> = a<State>("hi")    // Intentionally errors.

const b = n("b")
const x4 = b("hjgkjhg")
const x5 = b<State>("hjgkjhg")
const x6: VDOM<State> = b("hjgkjhg")
const x7: VDOM<State> = b<State>("hjgkjhg")

// Minimum TypeScript Version: 3.7

declare module "hyperapp" {
  // A Hyperapp application instance has an initial state and a base view.
  // It must also be mounted over an available DOM element.
  type App<S> = Readonly<{
    init: Transition<S> | Action<S>
    view: View<S>
    node: Node
    subscriptions?: Subscription<S>
    middleware?: Middleware<S>
  }>

  // A transition is a state transformation with any effects to run.
  type Transition<S> = State<S> | StateWithEffects<S>

  // Application state is accessible in every view, action, and subscription.
  type State<S> = S

  // Transformed state can be paired with a list of effects to run.
  type StateWithEffects<S> = [State<S>, ...EffectDescriptor<S>[]]

  // A view builds a virtual DOM node representation of the application state.
  type View<S> = (state: State<S>) => VDOM<S>

  // A subscription is a set of recurring effects.
  type Subscription<S> = (state: State<S>) => Subscriber<S>[]

  // A subscriber reacts to subscription updates.
  type Subscriber<S> = boolean | undefined | Effect<S> | Unsubscribe

  // A subscriber ideally provides a function that cancels itself properly.
  type Unsubscribe = () => void

  // Middleware allows for custom processing during dispatching.
  type Middleware<S> = (dispatch: Dispatch<S>) => Dispatch<S>

  // ---------------------------------------------------------------------------

  // A dispatched action handles an event in the context of the current state.
  type Dispatch<S, P = unknown> = (action: Action<S>, props?: Payload<P>) => void

  // An action transforms existing state and can be wrapped by another action.
  type Action<S, P = unknown>
    = [Action<S>, Payload<P>]
    | ((state: State<S>, props?: Payload<P>) => Transition<S> | Action<S>)

  // A payload is data external to state that is given to a dispatched action.
  type Payload<P> = P

  // An effect descriptor describes how an effect should be invoked.
  // A function that creates this is called an effect constructor.
  type EffectDescriptor<S, D = unknown> = [Effect<S>, EffectData<D>]

  // An effect is where side effects and any additional dispatching occur.
  // An effect used in a subscription should be able to unsubscribe.
  type Effect<S, D = unknown> = (dispatch: Dispatch<S>, props?: EffectData<D>) =>
    void | Unsubscribe | Promise<undefined | Unsubscribe>

  // An effect is generally given additional data.
  type EffectData<D> = D

  // ---------------------------------------------------------------------------

  // A virtual DOM node represents an actual DOM element.
  type VDOM<S> = {
    readonly type: string
    readonly props: PropList<S>
    readonly children: VNode<S>[]
    node: MaybeNode
    readonly tag?: Tag<S>
    readonly key: Key
    memo?: PropList<S>
  }

  // Virtual DOM properties will often correspond to HTML attributes.
  type PropList<S> = Readonly<ElementCreationOptions & EventActions<S> & {
    [_: string]: unknown
    class?: ClassProp
    key?: Key
    style?: StyleProp
  }>

  // Actions are used as event handlers.
  type EventActions<S> = { [K in keyof EventsMap]?: Action<S, EventsMap[K]> }
  type EventsMap = OnHTMLElementEventMap & OnWindowEventMap & { onsearch: Event }

  // A key can uniquely associate a virtual DOM node with a certain DOM element.
  type Key = string | null | undefined

  // The `class` property represents an HTML class attribute string.
  type ClassProp = false | string | Record<string, boolean> | ClassProp[]

  // The `style` property represents inline CSS.
  type StyleProp = Record<string, number | string | null>

  // A virtual node is a convenience layer over a virtual DOM node.
  type VNode<S> = false | null | undefined | VDOM<S>

  // Actual DOM nodes will be manipulated depending on how property patching goes.
  type MaybeNode = null | undefined | Node

  // A virtual DOM node's tag has metadata relevant to it. Virtual DOM nodes are
  // tagged by their type to assist rendering.
  type Tag<S> = VDOMNodeType | View<S>

  // These are based on actual DOM node types:
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  const enum VDOMNodeType { SSR = 1, Text = 3 }

  // ---------------------------------------------------------------------------

  // The `app` function initiates a Hyperapp application. `app` along with effects
  // should be the only places you need to worry about side effects.
  function app<S>(props: App<S>): Dispatch<S>

  // The `h` function builds a virtual DOM node.
  function h<S>(type: string, props: PropList<S>, children?: VNode<S> | readonly VNode<S>[]): VDOM<S>

  // The `memo` function stores a view along with properties for it.
  function memo<S>(view: View<S>, props: PropList<S>): Partial<VDOM<S>>

  // The `text` function creates a virtual DOM node representing plain text.
  function text<S>(value: number | string, node?: Node): VDOM<S>

  // ---------------------------------------------------------------------------

  // Due to current limitations with TypeScript (which should get resolved in
  // the future: https://github.com/microsoft/TypeScript/pull/40336), here is
  // a collection of modified copies of relevant event maps from TypeScript's
  // "lib.dom.d.ts" definition file to assist with defining `EventActions`:

  type OnElementEventMap = {
    "onfullscreenchange": Event
    "onfullscreenerror": Event
  }

  type OnGlobalEventHandlersEventMap = {
    "onabort": UIEvent
    "onanimationcancel": AnimationEvent
    "onanimationend": AnimationEvent
    "onanimationiteration": AnimationEvent
    "onanimationstart": AnimationEvent
    "onauxclick": MouseEvent
    "onblur": FocusEvent
    "oncancel": Event
    "oncanplay": Event
    "oncanplaythrough": Event
    "onchange": Event
    "onclick": MouseEvent
    "onclose": Event
    "oncontextmenu": MouseEvent
    "oncuechange": Event
    "ondblclick": MouseEvent
    "ondrag": DragEvent
    "ondragend": DragEvent
    "ondragenter": DragEvent
    "ondragexit": Event
    "ondragleave": DragEvent
    "ondragover": DragEvent
    "ondragstart": DragEvent
    "ondrop": DragEvent
    "ondurationchange": Event
    "onemptied": Event
    "onended": Event
    "onerror": ErrorEvent
    "onfocus": FocusEvent
    "onfocusin": FocusEvent
    "onfocusout": FocusEvent
    "ongotpointercapture": PointerEvent
    "oninput": Event
    "oninvalid": Event
    "onkeydown": KeyboardEvent
    "onkeypress": KeyboardEvent
    "onkeyup": KeyboardEvent
    "onload": Event
    "onloadeddata": Event
    "onloadedmetadata": Event
    "onloadstart": Event
    "onlostpointercapture": PointerEvent
    "onmousedown": MouseEvent
    "onmouseenter": MouseEvent
    "onmouseleave": MouseEvent
    "onmousemove": MouseEvent
    "onmouseout": MouseEvent
    "onmouseover": MouseEvent
    "onmouseup": MouseEvent
    "onpause": Event
    "onplay": Event
    "onplaying": Event
    "onpointercancel": PointerEvent
    "onpointerdown": PointerEvent
    "onpointerenter": PointerEvent
    "onpointerleave": PointerEvent
    "onpointermove": PointerEvent
    "onpointerout": PointerEvent
    "onpointerover": PointerEvent
    "onpointerup": PointerEvent
    "onprogress": ProgressEvent
    "onratechange": Event
    "onreset": Event
    "onresize": UIEvent
    "onscroll": Event
    "onsecuritypolicyviolation": SecurityPolicyViolationEvent
    "onseeked": Event
    "onseeking": Event
    "onselect": Event
    "onselectionchange": Event
    "onselectstart": Event
    "onstalled": Event
    "onsubmit": Event
    "onsuspend": Event
    "ontimeupdate": Event
    "ontoggle": Event
    "ontouchcancel": TouchEvent
    "ontouchend": TouchEvent
    "ontouchmove": TouchEvent
    "ontouchstart": TouchEvent
    "ontransitioncancel": TransitionEvent
    "ontransitionend": TransitionEvent
    "ontransitionrun": TransitionEvent
    "ontransitionstart": TransitionEvent
    "onvolumechange": Event
    "onwaiting": Event
    "onwheel": WheelEvent
  }

  type OnDocumentAndElementEventHandlersEventMap = {
    "oncopy": ClipboardEvent
    "oncut": ClipboardEvent
    "onpaste": ClipboardEvent
  }

  type OnHTMLElementEventMap = OnElementEventMap & OnGlobalEventHandlersEventMap & OnDocumentAndElementEventHandlersEventMap

  type OnWindowEventHandlersEventMap = {
    "onafterprint": Event
    "onbeforeprint": Event
    "onbeforeunload": BeforeUnloadEvent
    "onhashchange": HashChangeEvent
    "onlanguagechange": Event
    "onmessage": MessageEvent
    "onmessageerror": MessageEvent
    "onoffline": Event
    "ononline": Event
    "onpagehide": PageTransitionEvent
    "onpageshow": PageTransitionEvent
    "onpopstate": PopStateEvent
    "onrejectionhandled": PromiseRejectionEvent
    "onstorage": StorageEvent
    "onunhandledrejection": PromiseRejectionEvent
    "onunload": Event
  }

  type OnWindowEventMap = OnGlobalEventHandlersEventMap & OnWindowEventHandlersEventMap & {
    "onabort": UIEvent
    "onafterprint": Event
    "onbeforeprint": Event
    "onbeforeunload": BeforeUnloadEvent
    "onblur": FocusEvent
    "oncanplay": Event
    "oncanplaythrough": Event
    "onchange": Event
    "onclick": MouseEvent
    "oncompassneedscalibration": Event
    "oncontextmenu": MouseEvent
    "ondblclick": MouseEvent
    "ondevicelight": DeviceLightEvent
    "ondevicemotion": DeviceMotionEvent
    "ondeviceorientation": DeviceOrientationEvent
    "ondeviceorientationabsolute": DeviceOrientationEvent
    "ondrag": DragEvent
    "ondragend": DragEvent
    "ondragenter": DragEvent
    "ondragleave": DragEvent
    "ondragover": DragEvent
    "ondragstart": DragEvent
    "ondrop": DragEvent
    "ondurationchange": Event
    "onemptied": Event
    "onended": Event
    "onerror": ErrorEvent
    "onfocus": FocusEvent
    "onhashchange": HashChangeEvent
    "oninput": Event
    "oninvalid": Event
    "onkeydown": KeyboardEvent
    "onkeypress": KeyboardEvent
    "onkeyup": KeyboardEvent
    "onload": Event
    "onloadeddata": Event
    "onloadedmetadata": Event
    "onloadstart": Event
    "onmessage": MessageEvent
    "onmousedown": MouseEvent
    "onmouseenter": MouseEvent
    "onmouseleave": MouseEvent
    "onmousemove": MouseEvent
    "onmouseout": MouseEvent
    "onmouseover": MouseEvent
    "onmouseup": MouseEvent
    "onmousewheel": Event
    "onMSGestureChange": Event
    "onMSGestureDoubleTap": Event
    "onMSGestureEnd": Event
    "onMSGestureHold": Event
    "onMSGestureStart": Event
    "onMSGestureTap": Event
    "onMSInertiaStart": Event
    "onMSPointerCancel": Event
    "onMSPointerDown": Event
    "onMSPointerEnter": Event
    "onMSPointerLeave": Event
    "onMSPointerMove": Event
    "onMSPointerOut": Event
    "onMSPointerOver": Event
    "onMSPointerUp": Event
    "onoffline": Event
    "ononline": Event
    "onorientationchange": Event
    "onpagehide": PageTransitionEvent
    "onpageshow": PageTransitionEvent
    "onpause": Event
    "onplay": Event
    "onplaying": Event
    "onpopstate": PopStateEvent
    "onprogress": ProgressEvent<Window>
    "onratechange": Event
    "onreadystatechange": ProgressEvent<Window>
    "onreset": Event
    "onresize": UIEvent
    "onscroll": Event
    "onseeked": Event
    "onseeking": Event
    "onselect": Event
    "onstalled": Event
    "onstorage": StorageEvent
    "onsubmit": Event
    "onsuspend": Event
    "ontimeupdate": Event
    "onunload": Event
    "onvolumechange": Event
    "onvrdisplayactivate": Event
    "onvrdisplayblur": Event
    "onvrdisplayconnect": Event
    "onvrdisplaydeactivate": Event
    "onvrdisplaydisconnect": Event
    "onvrdisplayfocus": Event
    "onvrdisplaypointerrestricted": Event
    "onvrdisplaypointerunrestricted": Event
    "onvrdisplaypresentchange": Event
    "onwaiting": Event
  }
}
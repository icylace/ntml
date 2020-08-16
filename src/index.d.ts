declare module "ntml" {
  // Borrowed from:
  // https://github.com/jorgebucaran/hyperapp/pull/969

  // A virtual DOM node represents an actual DOM element.
  type VDOM = {
    readonly type: string;
    readonly props: PropList;
    readonly children: VNode[];
    node: MaybeNode;
    readonly tag?: Tag;
    readonly key: Key;
    memo?: PropList;
  };

  // Virtual DOM properties will often correspond to HTML attributes.
  type Prop =
    | bigint
    | boolean
    | null
    | number
    | string
    | symbol
    | undefined
    | Function
    | ClassProp
    | StyleProp;
  type PropList = Readonly<
    ElementCreationOptions & {
      [k: string]: Prop;
      class?: ClassProp;
      key?: Key;
      style?: StyleProp;
    }
  >;

  // A key can uniquely associate a virtual DOM node with a certain DOM element.
  type Key = null | string | undefined;

  // The `class` property represents an HTML class attribute string.
  type ClassProp = string | Record<string, boolean> | ClassProp[];

  // The `style` property represents inline CSS.
  type StyleProp = Record<string, null | number | string>;

  // A virtual node is a convenience layer over a virtual DOM node.
  type VNode = null | undefined | VDOM;

  // Actual DOM nodes will be manipulated depending on how property patching goes.
  type MaybeNode = null | undefined | Node;

  // A virtual DOM node's tag has metadata relevant to it. Virtual DOM nodes are
  // tagged by their type to assist rendering.
  type Tag = VDOMNodeType | View;

  // These are based on actual DOM node types:
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  const enum VDOMNodeType {
    SSR = 1,
    Text = 3,
  }

  // A view builds a virtual DOM node representation of the application state.
  type View = <S>(state: State<S>) => VDOM;

  // Application state is accessible in every view, action, and subscription.
  type State<S> = S;

  // ---------------------------------------------------------------------------

  type VDOMElement = (...args: readonly any[]) => VDOM;

  const a: VDOMElement;
  const b: VDOMElement;
  const i: VDOMElement;
  const p: VDOMElement;
  const q: VDOMElement;
  const s: VDOMElement;
  const br: VDOMElement;
  const dd: VDOMElement;
  const dl: VDOMElement;
  const dt: VDOMElement;
  const em: VDOMElement;
  const h1: VDOMElement;
  const h2: VDOMElement;
  const h3: VDOMElement;
  const h4: VDOMElement;
  const h5: VDOMElement;
  const h6: VDOMElement;
  const hr: VDOMElement;
  const li: VDOMElement;
  const ol: VDOMElement;
  const rp: VDOMElement;
  const rt: VDOMElement;
  const td: VDOMElement;
  const th: VDOMElement;
  const tr: VDOMElement;
  const ul: VDOMElement;
  const bdi: VDOMElement;
  const bdo: VDOMElement;
  const col: VDOMElement;
  const del: VDOMElement;
  const dfn: VDOMElement;
  const div: VDOMElement;
  const img: VDOMElement;
  const ins: VDOMElement;
  const kbd: VDOMElement;
  const map: VDOMElement;
  const nav: VDOMElement;
  const pre: VDOMElement;
  const rtc: VDOMElement;
  const sub: VDOMElement;
  const sup: VDOMElement;
  const svg: VDOMElement;
  const wbr: VDOMElement;
  const abbr: VDOMElement;
  const area: VDOMElement;
  const cite: VDOMElement;
  const code: VDOMElement;
  const data: VDOMElement;
  const form: VDOMElement;
  const main: VDOMElement;
  const mark: VDOMElement;
  const ruby: VDOMElement;
  const samp: VDOMElement;
  const span: VDOMElement;
  const time: VDOMElement;
  const aside: VDOMElement;
  const audio: VDOMElement;
  const input: VDOMElement;
  const label: VDOMElement;
  const meter: VDOMElement;
  const param: VDOMElement;
  const small: VDOMElement;
  const table: VDOMElement;
  const tbody: VDOMElement;
  const tfoot: VDOMElement;
  const thead: VDOMElement;
  const track: VDOMElement;
  const video: VDOMElement;
  const button: VDOMElement;
  const canvas: VDOMElement;
  const dialog: VDOMElement;
  const figure: VDOMElement;
  const footer: VDOMElement;
  const header: VDOMElement;
  const iframe: VDOMElement;
  const legend: VDOMElement;
  const object: VDOMElement;
  const option: VDOMElement;
  const output: VDOMElement;
  const select: VDOMElement;
  const source: VDOMElement;
  const strong: VDOMElement;
  const address: VDOMElement;
  const article: VDOMElement;
  const caption: VDOMElement;
  const details: VDOMElement;
  const section: VDOMElement;
  const summary: VDOMElement;
  const picture: VDOMElement;
  const colgroup: VDOMElement;
  const datalist: VDOMElement;
  const fieldset: VDOMElement;
  const menuitem: VDOMElement;
  const optgroup: VDOMElement;
  const progress: VDOMElement;
  const textarea: VDOMElement;
  const blockquote: VDOMElement;
  const figcaption: VDOMElement;
}

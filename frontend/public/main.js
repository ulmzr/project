(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // <define:process>
  var init_define_process = __esm({
    "<define:process>"() {
    }
  });

  // node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  var init_utils = __esm({
    "node_modules/svelte/src/runtime/internal/utils.js"() {
      init_define_process();
    }
  });

  // node_modules/svelte/src/runtime/internal/environment.js
  var init_environment = __esm({
    "node_modules/svelte/src/runtime/internal/environment.js"() {
      init_define_process();
      init_utils();
    }
  });

  // node_modules/svelte/src/runtime/internal/loop.js
  var init_loop = __esm({
    "node_modules/svelte/src/runtime/internal/loop.js"() {
      init_define_process();
      init_environment();
    }
  });

  // node_modules/svelte/src/runtime/internal/globals.js
  var globals;
  var init_globals = __esm({
    "node_modules/svelte/src/runtime/internal/globals.js"() {
      init_define_process();
      globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
        // @ts-ignore Node typings have this
        global
      );
    }
  });

  // node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton;
  var init_ResizeObserverSingleton = __esm({
    "node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js"() {
      init_define_process();
      init_globals();
      ResizeObserverSingleton = class _ResizeObserverSingleton {
        /**
         * @private
         * @readonly
         * @type {WeakMap<Element, import('./private.js').Listener>}
         */
        _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
        /**
         * @private
         * @type {ResizeObserver}
         */
        _observer = void 0;
        /** @type {ResizeObserverOptions} */
        options;
        /** @param {ResizeObserverOptions} options */
        constructor(options) {
          this.options = options;
        }
        /**
         * @param {Element} element
         * @param {import('./private.js').Listener} listener
         * @returns {() => void}
         */
        observe(element2, listener) {
          this._listeners.set(element2, listener);
          this._getObserver().observe(element2, this.options);
          return () => {
            this._listeners.delete(element2);
            this._observer.unobserve(element2);
          };
        }
        /**
         * @private
         */
        _getObserver() {
          return this._observer ?? (this._observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
              _ResizeObserverSingleton.entries.set(entry.target, entry);
              this._listeners.get(entry.target)?.(entry);
            }
          }));
        }
      };
      ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    }
  });

  // node_modules/svelte/src/runtime/internal/dom.js
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function toggle_class(element2, name, toggle) {
    element2.classList.toggle(name, !!toggle);
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }
  function construct_svelte_component(component, props) {
    return new component(props);
  }
  var is_hydrating;
  var init_dom = __esm({
    "node_modules/svelte/src/runtime/internal/dom.js"() {
      init_define_process();
      init_utils();
      init_ResizeObserverSingleton();
      is_hydrating = false;
    }
  });

  // node_modules/svelte/src/runtime/internal/style_manager.js
  var init_style_manager = __esm({
    "node_modules/svelte/src/runtime/internal/style_manager.js"() {
      init_define_process();
      init_dom();
      init_environment();
    }
  });

  // node_modules/svelte/src/runtime/internal/animations.js
  var init_animations = __esm({
    "node_modules/svelte/src/runtime/internal/animations.js"() {
      init_define_process();
      init_utils();
      init_environment();
      init_loop();
      init_style_manager();
    }
  });

  // node_modules/svelte/src/runtime/internal/lifecycle.js
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  var current_component;
  var init_lifecycle = __esm({
    "node_modules/svelte/src/runtime/internal/lifecycle.js"() {
      init_define_process();
      init_dom();
    }
  });

  // node_modules/svelte/src/runtime/internal/scheduler.js
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  var dirty_components, binding_callbacks, render_callbacks, flush_callbacks, resolved_promise, update_scheduled, seen_callbacks, flushidx;
  var init_scheduler = __esm({
    "node_modules/svelte/src/runtime/internal/scheduler.js"() {
      init_define_process();
      init_utils();
      init_lifecycle();
      dirty_components = [];
      binding_callbacks = [];
      render_callbacks = [];
      flush_callbacks = [];
      resolved_promise = /* @__PURE__ */ Promise.resolve();
      update_scheduled = false;
      seen_callbacks = /* @__PURE__ */ new Set();
      flushidx = 0;
    }
  });

  // node_modules/svelte/src/runtime/internal/transitions.js
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  var outroing, outros;
  var init_transitions = __esm({
    "node_modules/svelte/src/runtime/internal/transitions.js"() {
      init_define_process();
      init_utils();
      init_environment();
      init_loop();
      init_style_manager();
      init_dom();
      init_scheduler();
      outroing = /* @__PURE__ */ new Set();
    }
  });

  // node_modules/svelte/src/runtime/internal/await_block.js
  var init_await_block = __esm({
    "node_modules/svelte/src/runtime/internal/await_block.js"() {
      init_define_process();
      init_utils();
      init_transitions();
      init_scheduler();
      init_lifecycle();
    }
  });

  // node_modules/svelte/src/runtime/internal/each.js
  var init_each = __esm({
    "node_modules/svelte/src/runtime/internal/each.js"() {
      init_define_process();
      init_transitions();
      init_utils();
    }
  });

  // node_modules/svelte/src/runtime/internal/spread.js
  var init_spread = __esm({
    "node_modules/svelte/src/runtime/internal/spread.js"() {
      init_define_process();
    }
  });

  // node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes, boolean_attributes;
  var init_boolean_attributes = __esm({
    "node_modules/svelte/src/shared/boolean_attributes.js"() {
      init_define_process();
      _boolean_attributes = /** @type {const} */
      [
        "allowfullscreen",
        "allowpaymentrequest",
        "async",
        "autofocus",
        "autoplay",
        "checked",
        "controls",
        "default",
        "defer",
        "disabled",
        "formnovalidate",
        "hidden",
        "inert",
        "ismap",
        "loop",
        "multiple",
        "muted",
        "nomodule",
        "novalidate",
        "open",
        "playsinline",
        "readonly",
        "required",
        "reversed",
        "selected"
      ];
      boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);
    }
  });

  // node_modules/svelte/src/shared/utils/names.js
  var init_names = __esm({
    "node_modules/svelte/src/shared/utils/names.js"() {
      init_define_process();
    }
  });

  // node_modules/svelte/src/runtime/internal/ssr.js
  var init_ssr = __esm({
    "node_modules/svelte/src/runtime/internal/ssr.js"() {
      init_define_process();
      init_lifecycle();
      init_utils();
      init_boolean_attributes();
      init_each();
      init_names();
    }
  });

  // node_modules/svelte/src/runtime/internal/Component.js
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance4, create_fragment8, not_equal, props, append_styles = null, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance4 ? instance4(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment8 ? create_fragment8($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteElement, SvelteComponent;
  var init_Component = __esm({
    "node_modules/svelte/src/runtime/internal/Component.js"() {
      init_define_process();
      init_scheduler();
      init_lifecycle();
      init_utils();
      init_dom();
      init_transitions();
      if (typeof HTMLElement === "function") {
        SvelteElement = class extends HTMLElement {
          /** The Svelte component constructor */
          $$ctor;
          /** Slots */
          $$s;
          /** The Svelte component instance */
          $$c;
          /** Whether or not the custom element is connected */
          $$cn = false;
          /** Component props data */
          $$d = {};
          /** `true` if currently in the process of reflecting component props back to attributes */
          $$r = false;
          /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
          $$p_d = {};
          /** @type {Record<string, Function[]>} Event listeners */
          $$l = {};
          /** @type {Map<Function, Function>} Event listener unsubscribe functions */
          $$l_u = /* @__PURE__ */ new Map();
          constructor($$componentCtor, $$slots, use_shadow_dom) {
            super();
            this.$$ctor = $$componentCtor;
            this.$$s = $$slots;
            if (use_shadow_dom) {
              this.attachShadow({ mode: "open" });
            }
          }
          addEventListener(type, listener, options) {
            this.$$l[type] = this.$$l[type] || [];
            this.$$l[type].push(listener);
            if (this.$$c) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
            super.addEventListener(type, listener, options);
          }
          removeEventListener(type, listener, options) {
            super.removeEventListener(type, listener, options);
            if (this.$$c) {
              const unsub = this.$$l_u.get(listener);
              if (unsub) {
                unsub();
                this.$$l_u.delete(listener);
              }
            }
          }
          async connectedCallback() {
            this.$$cn = true;
            if (!this.$$c) {
              let create_slot = function(name) {
                return () => {
                  let node;
                  const obj = {
                    c: function create() {
                      node = element("slot");
                      if (name !== "default") {
                        attr(node, "name", name);
                      }
                    },
                    /**
                     * @param {HTMLElement} target
                     * @param {HTMLElement} [anchor]
                     */
                    m: function mount(target, anchor) {
                      insert(target, node, anchor);
                    },
                    d: function destroy(detaching) {
                      if (detaching) {
                        detach(node);
                      }
                    }
                  };
                  return obj;
                };
              };
              await Promise.resolve();
              if (!this.$$cn || this.$$c) {
                return;
              }
              const $$slots = {};
              const existing_slots = get_custom_elements_slots(this);
              for (const name of this.$$s) {
                if (name in existing_slots) {
                  $$slots[name] = [create_slot(name)];
                }
              }
              for (const attribute of this.attributes) {
                const name = this.$$g_p(attribute.name);
                if (!(name in this.$$d)) {
                  this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
                }
              }
              for (const key in this.$$p_d) {
                if (!(key in this.$$d) && this[key] !== void 0) {
                  this.$$d[key] = this[key];
                  delete this[key];
                }
              }
              this.$$c = new this.$$ctor({
                target: this.shadowRoot || this,
                props: {
                  ...this.$$d,
                  $$slots,
                  $$scope: {
                    ctx: []
                  }
                }
              });
              const reflect_attributes = () => {
                this.$$r = true;
                for (const key in this.$$p_d) {
                  this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
                  if (this.$$p_d[key].reflect) {
                    const attribute_value = get_custom_element_value(
                      key,
                      this.$$d[key],
                      this.$$p_d,
                      "toAttribute"
                    );
                    if (attribute_value == null) {
                      this.removeAttribute(this.$$p_d[key].attribute || key);
                    } else {
                      this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                    }
                  }
                }
                this.$$r = false;
              };
              this.$$c.$$.after_update.push(reflect_attributes);
              reflect_attributes();
              for (const type in this.$$l) {
                for (const listener of this.$$l[type]) {
                  const unsub = this.$$c.$on(type, listener);
                  this.$$l_u.set(listener, unsub);
                }
              }
              this.$$l = {};
            }
          }
          // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
          // and setting attributes through setAttribute etc, this is helpful
          attributeChangedCallback(attr2, _oldValue, newValue) {
            if (this.$$r)
              return;
            attr2 = this.$$g_p(attr2);
            this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
            this.$$c?.$set({ [attr2]: this.$$d[attr2] });
          }
          disconnectedCallback() {
            this.$$cn = false;
            Promise.resolve().then(() => {
              if (!this.$$cn) {
                this.$$c.$destroy();
                this.$$c = void 0;
              }
            });
          }
          $$g_p(attribute_name) {
            return Object.keys(this.$$p_d).find(
              (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
            ) || attribute_name;
          }
        };
      }
      SvelteComponent = class {
        /**
         * ### PRIVATE API
         *
         * Do not use, may change at any time
         *
         * @type {any}
         */
        $$ = void 0;
        /**
         * ### PRIVATE API
         *
         * Do not use, may change at any time
         *
         * @type {any}
         */
        $$set = void 0;
        /** @returns {void} */
        $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
        }
        /**
         * @template {Extract<keyof Events, string>} K
         * @param {K} type
         * @param {((e: Events[K]) => void) | null | undefined} callback
         * @returns {() => void}
         */
        $on(type, callback) {
          if (!is_function(callback)) {
            return noop;
          }
          const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
          callbacks.push(callback);
          return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
              callbacks.splice(index, 1);
          };
        }
        /**
         * @param {Partial<Props>} props
         * @returns {void}
         */
        $set(props) {
          if (this.$$set && !is_empty(props)) {
            this.$$.skip_bound = true;
            this.$$set(props);
            this.$$.skip_bound = false;
          }
        }
      };
    }
  });

  // node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION;
  var init_version = __esm({
    "node_modules/svelte/src/shared/version.js"() {
      init_define_process();
      PUBLIC_VERSION = "4";
    }
  });

  // node_modules/svelte/src/runtime/internal/dev.js
  var init_dev = __esm({
    "node_modules/svelte/src/runtime/internal/dev.js"() {
      init_define_process();
      init_dom();
      init_Component();
      init_names();
      init_version();
      init_utils();
      init_each();
    }
  });

  // node_modules/svelte/src/runtime/internal/index.js
  var init_internal = __esm({
    "node_modules/svelte/src/runtime/internal/index.js"() {
      init_define_process();
      init_animations();
      init_await_block();
      init_dom();
      init_environment();
      init_globals();
      init_each();
      init_lifecycle();
      init_loop();
      init_scheduler();
      init_spread();
      init_ssr();
      init_transitions();
      init_utils();
      init_Component();
      init_dev();
    }
  });

  // node_modules/svelte/src/runtime/internal/disclose-version/index.js
  var init_disclose_version = __esm({
    "node_modules/svelte/src/runtime/internal/disclose-version/index.js"() {
      init_define_process();
      init_version();
      if (typeof window !== "undefined")
        (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
    }
  });

  // src/pages/About.svelte
  var About_exports = {};
  __export(About_exports, {
    default: () => About_default
  });
  function create_fragment(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "About";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
        }
      }
    };
  }
  var About, About_default;
  var init_About = __esm({
    "src/pages/About.svelte"() {
      init_define_process();
      init_internal();
      init_disclose_version();
      About = class extends SvelteComponent {
        constructor(options) {
          super();
          init(this, options, null, create_fragment, safe_not_equal, {});
        }
      };
      About_default = About;
    }
  });

  // src/pages/login/pageIndex.svelte
  var pageIndex_exports = {};
  __export(pageIndex_exports, {
    default: () => pageIndex_default
  });
  function create_fragment2(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Login";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
        }
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    const params = {};
    const query = {};
    return [params, query];
  }
  var PageIndex, pageIndex_default;
  var init_pageIndex = __esm({
    "src/pages/login/pageIndex.svelte"() {
      init_define_process();
      init_internal();
      init_disclose_version();
      PageIndex = class extends SvelteComponent {
        constructor(options) {
          super();
          init(this, options, instance, create_fragment2, safe_not_equal, { params: 0, query: 1 });
        }
        get params() {
          return this.$$.ctx[0];
        }
        get query() {
          return this.$$.ctx[1];
        }
      };
      pageIndex_default = PageIndex;
    }
  });

  // src/pages/pageIndex.svelte
  var pageIndex_exports2 = {};
  __export(pageIndex_exports2, {
    default: () => pageIndex_default2
  });
  function create_fragment3(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Home";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
        }
      }
    };
  }
  var PageIndex2, pageIndex_default2;
  var init_pageIndex2 = __esm({
    "src/pages/pageIndex.svelte"() {
      init_define_process();
      init_internal();
      init_disclose_version();
      PageIndex2 = class extends SvelteComponent {
        constructor(options) {
          super();
          init(this, options, null, create_fragment3, safe_not_equal, {});
        }
      };
      pageIndex_default2 = PageIndex2;
    }
  });

  // src/pages/register/pageIndex.svelte
  var pageIndex_exports3 = {};
  __export(pageIndex_exports3, {
    default: () => pageIndex_default3
  });
  function create_fragment4(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Register";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
        }
      }
    };
  }
  var PageIndex3, pageIndex_default3;
  var init_pageIndex3 = __esm({
    "src/pages/register/pageIndex.svelte"() {
      init_define_process();
      init_internal();
      init_disclose_version();
      PageIndex3 = class extends SvelteComponent {
        constructor(options) {
          super();
          init(this, options, null, create_fragment4, safe_not_equal, {});
        }
      };
      pageIndex_default3 = PageIndex3;
    }
  });

  // src/main.js
  init_define_process();

  // src/App.svelte
  init_define_process();
  init_internal();
  init_disclose_version();

  // node_modules/svelte/src/runtime/index.js
  init_define_process();
  init_internal();

  // node_modules/svelte-devserver/router.js
  init_define_process();
  function Router() {
    let routes = arguments[0], e404, callback, cmp, params, query;
    if (arguments.length === 2) {
      callback = arguments[1];
      e404 = null;
    } else if (arguments.length === 3) {
      callback = arguments[2];
      e404 = arguments[1];
    }
    addEventListener("click", route);
    addEventListener("replacestate", route);
    addEventListener("popstate", route);
    addEventListener("pushstate", route);
    addEventListener("DOMContentLoaded", () => {
      let links = document.querySelectorAll("a[href]");
      if (links) {
        Array.from(links).map((link) => {
          link.onclick = function(ev) {
            let href = ev.target.getAttribute("href");
            ev.preventDefault();
            route(href);
            try {
              history.pushState("", "", href);
            } catch (error) {
              if (href.startsWith("http")) {
                open(href, "_blank");
              } else {
                console.log(error);
              }
            }
          };
        });
      }
    });
    async function route(pathname = location.pathname + location.search) {
      if (typeof pathname === "object")
        pathname = location.pathname + location.search;
      params = {};
      query = pathname.includes("?") || {};
      if (query) {
        query = pathname.replace(/.*\?/, "").replace(/\=\=/g, "=").replace(/\&\&/g, "&").split("&");
        query.map((q) => {
          params[q.split("=")[0]] = q.split("=")[1];
        });
        query = params;
        pathname = pathname.replace(location.search, "");
      }
      let match = routes.filter((route2) => pathname.match(/\/[^\/]*/)[0] === route2.path);
      if (match[0]) {
        let route2 = match[0];
        if (typeof route2.page === "function")
          cmp = route2.page;
        else
          cmp = (await route2.page).default;
        params = pathname.split("?")[0].slice(1).split("/");
        if (pathname.includes("?")) {
          pathname.split("?")[1].replace(/\&/g, ",").replace(/\=/g, ":").split(",").map((prop) => {
            let tup = prop.split(":");
            query[tup[0]] = !isNaN(tup[1]) ? Number(tup[1]) : `${tup[1]}`;
          });
        }
      } else {
        cmp = e404;
      }
      callback({
        cmp,
        params,
        query
      });
    }
    return {
      route
    };
  }
  var router_default = Router;

  // src/routes.js
  init_define_process();
  var routes_default = [{ path: "/about", page: Promise.resolve().then(() => (init_About(), About_exports)) }, { path: "/login", page: Promise.resolve().then(() => (init_pageIndex(), pageIndex_exports)) }, { path: "/", page: Promise.resolve().then(() => (init_pageIndex2(), pageIndex_exports2)) }, { path: "/register", page: Promise.resolve().then(() => (init_pageIndex3(), pageIndex_exports3)) }];

  // src/cmp/E404.svelte
  init_define_process();
  init_internal();
  init_disclose_version();
  function create_fragment5(ctx) {
    let h1;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "E404";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
        }
      }
    };
  }
  var E404 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment5, safe_not_equal, {});
    }
  };
  var E404_default = E404;

  // src/cmp/Sidebar.svelte
  init_define_process();
  init_internal();
  init_disclose_version();
  function create_fragment6(ctx) {
    let aside;
    let ul;
    let li0;
    let a0;
    let t1;
    let li1;
    let a1;
    let t3;
    let li2;
    let a2;
    let t5;
    let li3;
    let a3;
    return {
      c() {
        aside = element("aside");
        ul = element("ul");
        li0 = element("li");
        a0 = element("a");
        a0.textContent = "Home";
        t1 = space();
        li1 = element("li");
        a1 = element("a");
        a1.textContent = "Login";
        t3 = space();
        li2 = element("li");
        a2 = element("a");
        a2.textContent = "Register";
        t5 = space();
        li3 = element("li");
        a3 = element("a");
        a3.textContent = "About";
        attr(a0, "href", "/");
        attr(a0, "class", "svelte-nidq6d");
        toggle_class(
          a0,
          "active",
          /*active*/
          ctx[0] === ""
        );
        attr(a1, "href", "/login?q=test");
        attr(a1, "class", "svelte-nidq6d");
        toggle_class(
          a1,
          "active",
          /*active*/
          ctx[0] === "login"
        );
        attr(a2, "href", "/register");
        attr(a2, "class", "svelte-nidq6d");
        toggle_class(
          a2,
          "active",
          /*active*/
          ctx[0] === "register"
        );
        attr(a3, "href", "/about");
        attr(a3, "class", "svelte-nidq6d");
        toggle_class(
          a3,
          "active",
          /*active*/
          ctx[0] === "about"
        );
        attr(aside, "class", "svelte-nidq6d");
      },
      m(target, anchor) {
        insert(target, aside, anchor);
        append(aside, ul);
        append(ul, li0);
        append(li0, a0);
        append(ul, t1);
        append(ul, li1);
        append(li1, a1);
        append(ul, t3);
        append(ul, li2);
        append(li2, a2);
        append(ul, t5);
        append(ul, li3);
        append(li3, a3);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*active*/
        1) {
          toggle_class(
            a0,
            "active",
            /*active*/
            ctx2[0] === ""
          );
        }
        if (dirty & /*active*/
        1) {
          toggle_class(
            a1,
            "active",
            /*active*/
            ctx2[0] === "login"
          );
        }
        if (dirty & /*active*/
        1) {
          toggle_class(
            a2,
            "active",
            /*active*/
            ctx2[0] === "register"
          );
        }
        if (dirty & /*active*/
        1) {
          toggle_class(
            a3,
            "active",
            /*active*/
            ctx2[0] === "about"
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(aside);
        }
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { active } = $$props;
    $$self.$$set = ($$props2) => {
      if ("active" in $$props2)
        $$invalidate(0, active = $$props2.active);
    };
    return [active];
  }
  var Sidebar = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment6, safe_not_equal, { active: 0 });
    }
  };
  var Sidebar_default = Sidebar;

  // src/App.svelte
  function create_if_block(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[0]
    );
    function switch_props(ctx2, dirty) {
      return {
        props: {
          params: (
            /*params*/
            ctx2[1]
          ),
          query: (
            /*query*/
            ctx2[2]
          )
        }
      };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        1 && switch_value !== (switch_value = /*cmp*/
        ctx2[0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          2)
            switch_instance_changes.params = /*params*/
            ctx2[1];
          if (dirty & /*query*/
          4)
            switch_instance_changes.query = /*query*/
            ctx2[2];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment7(ctx) {
    let sidebar;
    let t;
    let main;
    let current;
    sidebar = new Sidebar_default({ props: { params: (
      /*params*/
      ctx[1][0]
    ) } });
    let if_block = (
      /*cmp*/
      ctx[0] && create_if_block(ctx)
    );
    return {
      c() {
        create_component(sidebar.$$.fragment);
        t = space();
        main = element("main");
        if (if_block)
          if_block.c();
        attr(main, "class", "svelte-jw2lnq");
      },
      m(target, anchor) {
        mount_component(sidebar, target, anchor);
        insert(target, t, anchor);
        insert(target, main, anchor);
        if (if_block)
          if_block.m(main, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        const sidebar_changes = {};
        if (dirty & /*params*/
        2)
          sidebar_changes.params = /*params*/
          ctx2[1][0];
        sidebar.$set(sidebar_changes);
        if (
          /*cmp*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*cmp*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(main, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(sidebar.$$.fragment, local);
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(sidebar.$$.fragment, local);
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
          detach(main);
        }
        destroy_component(sidebar, detaching);
        if (if_block)
          if_block.d();
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let cmp, params = {}, query = {};
    const router = router_default(routes_default, E404_default, (route) => {
      $$invalidate(0, cmp = route.cmp);
      $$invalidate(1, params = route.params);
      $$invalidate(2, query = route.query);
      scrollTo(0, 0);
    });
    onMount(() => {
      router.route();
    });
    return [cmp, params, query];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance3, create_fragment7, safe_not_equal, {});
    }
  };
  var App_default = App;

  // src/main.js
  var app = new App_default({
    target: document.body
  });
})();

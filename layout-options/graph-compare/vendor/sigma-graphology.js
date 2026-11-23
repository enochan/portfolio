var GraphSigmaBundle = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/events/events.js
  var require_events = __commonJS({
    "node_modules/events/events.js"(exports, module) {
      "use strict";
      var R = typeof Reflect === "object" ? Reflect : null;
      var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
      };
      var ReflectOwnKeys;
      if (R && typeof R.ownKeys === "function") {
        ReflectOwnKeys = R.ownKeys;
      } else if (Object.getOwnPropertySymbols) {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
        };
      } else {
        ReflectOwnKeys = function ReflectOwnKeys2(target) {
          return Object.getOwnPropertyNames(target);
        };
      }
      function ProcessEmitWarning(warning) {
        if (console && console.warn) console.warn(warning);
      }
      var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
        return value !== value;
      };
      function EventEmitter4() {
        EventEmitter4.init.call(this);
      }
      module.exports = EventEmitter4;
      module.exports.once = once;
      EventEmitter4.EventEmitter = EventEmitter4;
      EventEmitter4.prototype._events = void 0;
      EventEmitter4.prototype._eventsCount = 0;
      EventEmitter4.prototype._maxListeners = void 0;
      var defaultMaxListeners = 10;
      function checkListener(listener) {
        if (typeof listener !== "function") {
          throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
        }
      }
      Object.defineProperty(EventEmitter4, "defaultMaxListeners", {
        enumerable: true,
        get: function() {
          return defaultMaxListeners;
        },
        set: function(arg) {
          if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
          }
          defaultMaxListeners = arg;
        }
      });
      EventEmitter4.init = function() {
        if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        }
        this._maxListeners = this._maxListeners || void 0;
      };
      EventEmitter4.prototype.setMaxListeners = function setMaxListeners(n) {
        if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
        }
        this._maxListeners = n;
        return this;
      };
      function _getMaxListeners(that) {
        if (that._maxListeners === void 0)
          return EventEmitter4.defaultMaxListeners;
        return that._maxListeners;
      }
      EventEmitter4.prototype.getMaxListeners = function getMaxListeners() {
        return _getMaxListeners(this);
      };
      EventEmitter4.prototype.emit = function emit(type) {
        var args = [];
        for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
        var doError = type === "error";
        var events = this._events;
        if (events !== void 0)
          doError = doError && events.error === void 0;
        else if (!doError)
          return false;
        if (doError) {
          var er;
          if (args.length > 0)
            er = args[0];
          if (er instanceof Error) {
            throw er;
          }
          var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
          err.context = er;
          throw err;
        }
        var handler = events[type];
        if (handler === void 0)
          return false;
        if (typeof handler === "function") {
          ReflectApply(handler, this, args);
        } else {
          var len = handler.length;
          var listeners = arrayClone(handler, len);
          for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
        }
        return true;
      };
      function _addListener(target, type, listener, prepend) {
        var m;
        var events;
        var existing;
        checkListener(listener);
        events = target._events;
        if (events === void 0) {
          events = target._events = /* @__PURE__ */ Object.create(null);
          target._eventsCount = 0;
        } else {
          if (events.newListener !== void 0) {
            target.emit(
              "newListener",
              type,
              listener.listener ? listener.listener : listener
            );
            events = target._events;
          }
          existing = events[type];
        }
        if (existing === void 0) {
          existing = events[type] = listener;
          ++target._eventsCount;
        } else {
          if (typeof existing === "function") {
            existing = events[type] = prepend ? [listener, existing] : [existing, listener];
          } else if (prepend) {
            existing.unshift(listener);
          } else {
            existing.push(listener);
          }
          m = _getMaxListeners(target);
          if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
          }
        }
        return target;
      }
      EventEmitter4.prototype.addListener = function addListener(type, listener) {
        return _addListener(this, type, listener, false);
      };
      EventEmitter4.prototype.on = EventEmitter4.prototype.addListener;
      EventEmitter4.prototype.prependListener = function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };
      function onceWrapper() {
        if (!this.fired) {
          this.target.removeListener(this.type, this.wrapFn);
          this.fired = true;
          if (arguments.length === 0)
            return this.listener.call(this.target);
          return this.listener.apply(this.target, arguments);
        }
      }
      function _onceWrap(target, type, listener) {
        var state = { fired: false, wrapFn: void 0, target, type, listener };
        var wrapped = onceWrapper.bind(state);
        wrapped.listener = listener;
        state.wrapFn = wrapped;
        return wrapped;
      }
      EventEmitter4.prototype.once = function once2(type, listener) {
        checkListener(listener);
        this.on(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter4.prototype.prependOnceListener = function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };
      EventEmitter4.prototype.removeListener = function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === void 0)
          return this;
        list = events[type];
        if (list === void 0)
          return this;
        if (list === listener || list.listener === listener) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else {
            delete events[type];
            if (events.removeListener)
              this.emit("removeListener", type, list.listener || listener);
          }
        } else if (typeof list !== "function") {
          position = -1;
          for (i = list.length - 1; i >= 0; i--) {
            if (list[i] === listener || list[i].listener === listener) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }
          if (position < 0)
            return this;
          if (position === 0)
            list.shift();
          else {
            spliceOne(list, position);
          }
          if (list.length === 1)
            events[type] = list[0];
          if (events.removeListener !== void 0)
            this.emit("removeListener", type, originalListener || listener);
        }
        return this;
      };
      EventEmitter4.prototype.off = EventEmitter4.prototype.removeListener;
      EventEmitter4.prototype.removeAllListeners = function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === void 0)
          return this;
        if (events.removeListener === void 0) {
          if (arguments.length === 0) {
            this._events = /* @__PURE__ */ Object.create(null);
            this._eventsCount = 0;
          } else if (events[type] !== void 0) {
            if (--this._eventsCount === 0)
              this._events = /* @__PURE__ */ Object.create(null);
            else
              delete events[type];
          }
          return this;
        }
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          var key;
          for (i = 0; i < keys.length; ++i) {
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners("removeListener");
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
          return this;
        }
        listeners = events[type];
        if (typeof listeners === "function") {
          this.removeListener(type, listeners);
        } else if (listeners !== void 0) {
          for (i = listeners.length - 1; i >= 0; i--) {
            this.removeListener(type, listeners[i]);
          }
        }
        return this;
      };
      function _listeners(target, type, unwrap) {
        var events = target._events;
        if (events === void 0)
          return [];
        var evlistener = events[type];
        if (evlistener === void 0)
          return [];
        if (typeof evlistener === "function")
          return unwrap ? [evlistener.listener || evlistener] : [evlistener];
        return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
      }
      EventEmitter4.prototype.listeners = function listeners(type) {
        return _listeners(this, type, true);
      };
      EventEmitter4.prototype.rawListeners = function rawListeners(type) {
        return _listeners(this, type, false);
      };
      EventEmitter4.listenerCount = function(emitter, type) {
        if (typeof emitter.listenerCount === "function") {
          return emitter.listenerCount(type);
        } else {
          return listenerCount.call(emitter, type);
        }
      };
      EventEmitter4.prototype.listenerCount = listenerCount;
      function listenerCount(type) {
        var events = this._events;
        if (events !== void 0) {
          var evlistener = events[type];
          if (typeof evlistener === "function") {
            return 1;
          } else if (evlistener !== void 0) {
            return evlistener.length;
          }
        }
        return 0;
      }
      EventEmitter4.prototype.eventNames = function eventNames() {
        return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
      };
      function arrayClone(arr, n) {
        var copy = new Array(n);
        for (var i = 0; i < n; ++i)
          copy[i] = arr[i];
        return copy;
      }
      function spliceOne(list, index) {
        for (; index + 1 < list.length; index++)
          list[index] = list[index + 1];
        list.pop();
      }
      function unwrapListeners(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < ret.length; ++i) {
          ret[i] = arr[i].listener || arr[i];
        }
        return ret;
      }
      function once(emitter, name) {
        return new Promise(function(resolve, reject) {
          function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
          }
          function resolver() {
            if (typeof emitter.removeListener === "function") {
              emitter.removeListener("error", errorListener);
            }
            resolve([].slice.call(arguments));
          }
          ;
          eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
          if (name !== "error") {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
          }
        });
      }
      function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
        if (typeof emitter.on === "function") {
          eventTargetAgnosticAddListener(emitter, "error", handler, flags);
        }
      }
      function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
        if (typeof emitter.on === "function") {
          if (flags.once) {
            emitter.once(name, listener);
          } else {
            emitter.on(name, listener);
          }
        } else if (typeof emitter.addEventListener === "function") {
          emitter.addEventListener(name, function wrapListener(arg) {
            if (flags.once) {
              emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
          });
        } else {
          throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
        }
      }
    }
  });

  // node_modules/graphology-utils/is-graph.js
  var require_is_graph = __commonJS({
    "node_modules/graphology-utils/is-graph.js"(exports, module) {
      module.exports = function isGraph2(value) {
        return value !== null && typeof value === "object" && typeof value.addUndirectedEdgeWithKey === "function" && typeof value.dropNode === "function" && typeof value.multi === "boolean";
      };
    }
  });

  // node_modules/graphology-utils/getters.js
  var require_getters = __commonJS({
    "node_modules/graphology-utils/getters.js"(exports) {
      function coerceWeight(value) {
        if (typeof value !== "number" || isNaN(value)) return 1;
        return value;
      }
      function createNodeValueGetter(nameOrFunction, defaultValue) {
        var getter = {};
        var coerceToDefault = function(v) {
          if (typeof v === "undefined") return defaultValue;
          return v;
        };
        if (typeof defaultValue === "function") coerceToDefault = defaultValue;
        var get = function(attributes) {
          return coerceToDefault(attributes[nameOrFunction]);
        };
        var returnDefault = function() {
          return coerceToDefault(void 0);
        };
        if (typeof nameOrFunction === "string") {
          getter.fromAttributes = get;
          getter.fromGraph = function(graph, node) {
            return get(graph.getNodeAttributes(node));
          };
          getter.fromEntry = function(node, attributes) {
            return get(attributes);
          };
        } else if (typeof nameOrFunction === "function") {
          getter.fromAttributes = function() {
            throw new Error(
              "graphology-utils/getters/createNodeValueGetter: irrelevant usage."
            );
          };
          getter.fromGraph = function(graph, node) {
            return coerceToDefault(
              nameOrFunction(node, graph.getNodeAttributes(node))
            );
          };
          getter.fromEntry = function(node, attributes) {
            return coerceToDefault(nameOrFunction(node, attributes));
          };
        } else {
          getter.fromAttributes = returnDefault;
          getter.fromGraph = returnDefault;
          getter.fromEntry = returnDefault;
        }
        return getter;
      }
      function createEdgeValueGetter(nameOrFunction, defaultValue) {
        var getter = {};
        var coerceToDefault = function(v) {
          if (typeof v === "undefined") return defaultValue;
          return v;
        };
        if (typeof defaultValue === "function") coerceToDefault = defaultValue;
        var get = function(attributes) {
          return coerceToDefault(attributes[nameOrFunction]);
        };
        var returnDefault = function() {
          return coerceToDefault(void 0);
        };
        if (typeof nameOrFunction === "string") {
          getter.fromAttributes = get;
          getter.fromGraph = function(graph, edge) {
            return get(graph.getEdgeAttributes(edge));
          };
          getter.fromEntry = function(edge, attributes) {
            return get(attributes);
          };
          getter.fromPartialEntry = getter.fromEntry;
          getter.fromMinimalEntry = getter.fromEntry;
        } else if (typeof nameOrFunction === "function") {
          getter.fromAttributes = function() {
            throw new Error(
              "graphology-utils/getters/createEdgeValueGetter: irrelevant usage."
            );
          };
          getter.fromGraph = function(graph, edge) {
            var extremities = graph.extremities(edge);
            return coerceToDefault(
              nameOrFunction(
                edge,
                graph.getEdgeAttributes(edge),
                extremities[0],
                extremities[1],
                graph.getNodeAttributes(extremities[0]),
                graph.getNodeAttributes(extremities[1]),
                graph.isUndirected(edge)
              )
            );
          };
          getter.fromEntry = function(e, a, s, t, sa, ta, u) {
            return coerceToDefault(nameOrFunction(e, a, s, t, sa, ta, u));
          };
          getter.fromPartialEntry = function(e, a, s, t) {
            return coerceToDefault(nameOrFunction(e, a, s, t));
          };
          getter.fromMinimalEntry = function(e, a) {
            return coerceToDefault(nameOrFunction(e, a));
          };
        } else {
          getter.fromAttributes = returnDefault;
          getter.fromGraph = returnDefault;
          getter.fromEntry = returnDefault;
          getter.fromMinimalEntry = returnDefault;
        }
        return getter;
      }
      exports.createNodeValueGetter = createNodeValueGetter;
      exports.createEdgeValueGetter = createEdgeValueGetter;
      exports.createEdgeWeightGetter = function(name) {
        return createEdgeValueGetter(name, coerceWeight);
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/iterate.js
  var require_iterate = __commonJS({
    "node_modules/graphology-layout-forceatlas2/iterate.js"(exports, module) {
      var NODE_X = 0;
      var NODE_Y = 1;
      var NODE_DX = 2;
      var NODE_DY = 3;
      var NODE_OLD_DX = 4;
      var NODE_OLD_DY = 5;
      var NODE_MASS = 6;
      var NODE_CONVERGENCE = 7;
      var NODE_SIZE = 8;
      var NODE_FIXED = 9;
      var EDGE_SOURCE = 0;
      var EDGE_TARGET = 1;
      var EDGE_WEIGHT = 2;
      var REGION_NODE = 0;
      var REGION_CENTER_X = 1;
      var REGION_CENTER_Y = 2;
      var REGION_SIZE = 3;
      var REGION_NEXT_SIBLING = 4;
      var REGION_FIRST_CHILD = 5;
      var REGION_MASS = 6;
      var REGION_MASS_CENTER_X = 7;
      var REGION_MASS_CENTER_Y = 8;
      var SUBDIVISION_ATTEMPTS = 3;
      var PPN = 10;
      var PPE = 3;
      var PPR = 9;
      var MAX_FORCE = 10;
      module.exports = function iterate(options, NodeMatrix, EdgeMatrix) {
        var l, r, n, n1, n2, rn, e, w, g, s;
        var order = NodeMatrix.length, size = EdgeMatrix.length;
        var adjustSizes = options.adjustSizes;
        var thetaSquared = options.barnesHutTheta * options.barnesHutTheta;
        var outboundAttCompensation, coefficient, xDist, yDist, ewc, distance, factor;
        var RegionMatrix = [];
        for (n = 0; n < order; n += PPN) {
          NodeMatrix[n + NODE_OLD_DX] = NodeMatrix[n + NODE_DX];
          NodeMatrix[n + NODE_OLD_DY] = NodeMatrix[n + NODE_DY];
          NodeMatrix[n + NODE_DX] = 0;
          NodeMatrix[n + NODE_DY] = 0;
        }
        if (options.outboundAttractionDistribution) {
          outboundAttCompensation = 0;
          for (n = 0; n < order; n += PPN) {
            outboundAttCompensation += NodeMatrix[n + NODE_MASS];
          }
          outboundAttCompensation /= order / PPN;
        }
        if (options.barnesHutOptimize) {
          var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, q, q2, subdivisionAttempts;
          for (n = 0; n < order; n += PPN) {
            minX = Math.min(minX, NodeMatrix[n + NODE_X]);
            maxX = Math.max(maxX, NodeMatrix[n + NODE_X]);
            minY = Math.min(minY, NodeMatrix[n + NODE_Y]);
            maxY = Math.max(maxY, NodeMatrix[n + NODE_Y]);
          }
          var dx = maxX - minX, dy = maxY - minY;
          if (dx > dy) {
            minY -= (dx - dy) / 2;
            maxY = minY + dx;
          } else {
            minX -= (dy - dx) / 2;
            maxX = minX + dy;
          }
          RegionMatrix[0 + REGION_NODE] = -1;
          RegionMatrix[0 + REGION_CENTER_X] = (minX + maxX) / 2;
          RegionMatrix[0 + REGION_CENTER_Y] = (minY + maxY) / 2;
          RegionMatrix[0 + REGION_SIZE] = Math.max(maxX - minX, maxY - minY);
          RegionMatrix[0 + REGION_NEXT_SIBLING] = -1;
          RegionMatrix[0 + REGION_FIRST_CHILD] = -1;
          RegionMatrix[0 + REGION_MASS] = 0;
          RegionMatrix[0 + REGION_MASS_CENTER_X] = 0;
          RegionMatrix[0 + REGION_MASS_CENTER_Y] = 0;
          l = 1;
          for (n = 0; n < order; n += PPN) {
            r = 0;
            subdivisionAttempts = SUBDIVISION_ATTEMPTS;
            while (true) {
              if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {
                if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                  if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                    q = RegionMatrix[r + REGION_FIRST_CHILD];
                  } else {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                  }
                } else {
                  if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                  } else {
                    q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                  }
                }
                RegionMatrix[r + REGION_MASS_CENTER_X] = (RegionMatrix[r + REGION_MASS_CENTER_X] * RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_X] * NodeMatrix[n + NODE_MASS]) / (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);
                RegionMatrix[r + REGION_MASS_CENTER_Y] = (RegionMatrix[r + REGION_MASS_CENTER_Y] * RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_Y] * NodeMatrix[n + NODE_MASS]) / (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);
                RegionMatrix[r + REGION_MASS] += NodeMatrix[n + NODE_MASS];
                r = q;
                continue;
              } else {
                if (RegionMatrix[r + REGION_NODE] < 0) {
                  RegionMatrix[r + REGION_NODE] = n;
                  break;
                } else {
                  RegionMatrix[r + REGION_FIRST_CHILD] = l * PPR;
                  w = RegionMatrix[r + REGION_SIZE] / 2;
                  g = RegionMatrix[r + REGION_FIRST_CHILD];
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  g += PPR;
                  RegionMatrix[g + REGION_NODE] = -1;
                  RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
                  RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
                  RegionMatrix[g + REGION_SIZE] = w;
                  RegionMatrix[g + REGION_NEXT_SIBLING] = RegionMatrix[r + REGION_NEXT_SIBLING];
                  RegionMatrix[g + REGION_FIRST_CHILD] = -1;
                  RegionMatrix[g + REGION_MASS] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
                  RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;
                  l += 4;
                  if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                    if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q = RegionMatrix[r + REGION_FIRST_CHILD];
                    } else {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                    }
                  } else {
                    if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                    } else {
                      q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                    }
                  }
                  RegionMatrix[r + REGION_MASS] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_MASS];
                  RegionMatrix[r + REGION_MASS_CENTER_X] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X];
                  RegionMatrix[r + REGION_MASS_CENTER_Y] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y];
                  RegionMatrix[q + REGION_NODE] = RegionMatrix[r + REGION_NODE];
                  RegionMatrix[r + REGION_NODE] = -1;
                  if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
                    if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD];
                    } else {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
                    }
                  } else {
                    if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
                    } else {
                      q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
                    }
                  }
                  if (q === q2) {
                    if (subdivisionAttempts--) {
                      r = q;
                      continue;
                    } else {
                      subdivisionAttempts = SUBDIVISION_ATTEMPTS;
                      break;
                    }
                  }
                  RegionMatrix[q2 + REGION_NODE] = n;
                  break;
                }
              }
            }
          }
        }
        if (options.barnesHutOptimize) {
          coefficient = options.scalingRatio;
          for (n = 0; n < order; n += PPN) {
            r = 0;
            while (true) {
              if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {
                distance = Math.pow(
                  NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X],
                  2
                ) + Math.pow(
                  NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y],
                  2
                );
                s = RegionMatrix[r + REGION_SIZE];
                if (4 * s * s / distance < thetaSquared) {
                  xDist = NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X];
                  yDist = NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y];
                  if (adjustSizes === true) {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    } else if (distance < 0) {
                      factor = -coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / Math.sqrt(distance);
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  } else {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * RegionMatrix[r + REGION_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  }
                  r = RegionMatrix[r + REGION_NEXT_SIBLING];
                  if (r < 0) break;
                  continue;
                } else {
                  r = RegionMatrix[r + REGION_FIRST_CHILD];
                  continue;
                }
              } else {
                rn = RegionMatrix[r + REGION_NODE];
                if (rn >= 0 && rn !== n) {
                  xDist = NodeMatrix[n + NODE_X] - NodeMatrix[rn + NODE_X];
                  yDist = NodeMatrix[n + NODE_Y] - NodeMatrix[rn + NODE_Y];
                  distance = xDist * xDist + yDist * yDist;
                  if (adjustSizes === true) {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    } else if (distance < 0) {
                      factor = -coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / Math.sqrt(distance);
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  } else {
                    if (distance > 0) {
                      factor = coefficient * NodeMatrix[n + NODE_MASS] * NodeMatrix[rn + NODE_MASS] / distance;
                      NodeMatrix[n + NODE_DX] += xDist * factor;
                      NodeMatrix[n + NODE_DY] += yDist * factor;
                    }
                  }
                }
                r = RegionMatrix[r + REGION_NEXT_SIBLING];
                if (r < 0) break;
                continue;
              }
            }
          }
        } else {
          coefficient = options.scalingRatio;
          for (n1 = 0; n1 < order; n1 += PPN) {
            for (n2 = 0; n2 < n1; n2 += PPN) {
              xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
              yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];
              if (adjustSizes === true) {
                distance = Math.sqrt(xDist * xDist + yDist * yDist) - NodeMatrix[n1 + NODE_SIZE] - NodeMatrix[n2 + NODE_SIZE];
                if (distance > 0) {
                  factor = coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS] / distance / distance;
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] -= xDist * factor;
                  NodeMatrix[n2 + NODE_DY] -= yDist * factor;
                } else if (distance < 0) {
                  factor = 100 * coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS];
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] -= xDist * factor;
                  NodeMatrix[n2 + NODE_DY] -= yDist * factor;
                }
              } else {
                distance = Math.sqrt(xDist * xDist + yDist * yDist);
                if (distance > 0) {
                  factor = coefficient * NodeMatrix[n1 + NODE_MASS] * NodeMatrix[n2 + NODE_MASS] / distance / distance;
                  NodeMatrix[n1 + NODE_DX] += xDist * factor;
                  NodeMatrix[n1 + NODE_DY] += yDist * factor;
                  NodeMatrix[n2 + NODE_DX] -= xDist * factor;
                  NodeMatrix[n2 + NODE_DY] -= yDist * factor;
                }
              }
            }
          }
        }
        g = options.gravity / options.scalingRatio;
        coefficient = options.scalingRatio;
        for (n = 0; n < order; n += PPN) {
          factor = 0;
          xDist = NodeMatrix[n + NODE_X];
          yDist = NodeMatrix[n + NODE_Y];
          distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
          if (options.strongGravityMode) {
            if (distance > 0) factor = coefficient * NodeMatrix[n + NODE_MASS] * g;
          } else {
            if (distance > 0)
              factor = coefficient * NodeMatrix[n + NODE_MASS] * g / distance;
          }
          NodeMatrix[n + NODE_DX] -= xDist * factor;
          NodeMatrix[n + NODE_DY] -= yDist * factor;
        }
        coefficient = 1 * (options.outboundAttractionDistribution ? outboundAttCompensation : 1);
        for (e = 0; e < size; e += PPE) {
          n1 = EdgeMatrix[e + EDGE_SOURCE];
          n2 = EdgeMatrix[e + EDGE_TARGET];
          w = EdgeMatrix[e + EDGE_WEIGHT];
          ewc = Math.pow(w, options.edgeWeightInfluence);
          xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
          yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];
          if (adjustSizes === true) {
            distance = Math.sqrt(xDist * xDist + yDist * yDist) - NodeMatrix[n1 + NODE_SIZE] - NodeMatrix[n2 + NODE_SIZE];
            if (options.linLogMode) {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance;
                }
              }
            } else {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0) {
                  factor = -coefficient * ewc;
                }
              }
            }
          } else {
            distance = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
            if (options.linLogMode) {
              if (options.outboundAttractionDistribution) {
                if (distance > 0) {
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance / NodeMatrix[n1 + NODE_MASS];
                }
              } else {
                if (distance > 0)
                  factor = -coefficient * ewc * Math.log(1 + distance) / distance;
              }
            } else {
              if (options.outboundAttractionDistribution) {
                distance = 1;
                factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
              } else {
                distance = 1;
                factor = -coefficient * ewc;
              }
            }
          }
          if (distance > 0) {
            NodeMatrix[n1 + NODE_DX] += xDist * factor;
            NodeMatrix[n1 + NODE_DY] += yDist * factor;
            NodeMatrix[n2 + NODE_DX] -= xDist * factor;
            NodeMatrix[n2 + NODE_DY] -= yDist * factor;
          }
        }
        var force, swinging, traction, nodespeed, newX, newY;
        if (adjustSizes === true) {
          for (n = 0; n < order; n += PPN) {
            if (NodeMatrix[n + NODE_FIXED] !== 1) {
              force = Math.sqrt(
                Math.pow(NodeMatrix[n + NODE_DX], 2) + Math.pow(NodeMatrix[n + NODE_DY], 2)
              );
              if (force > MAX_FORCE) {
                NodeMatrix[n + NODE_DX] = NodeMatrix[n + NODE_DX] * MAX_FORCE / force;
                NodeMatrix[n + NODE_DY] = NodeMatrix[n + NODE_DY] * MAX_FORCE / force;
              }
              swinging = NodeMatrix[n + NODE_MASS] * Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
              );
              traction = Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
              ) / 2;
              nodespeed = 0.1 * Math.log(1 + traction) / (1 + Math.sqrt(swinging));
              newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_X] = newX;
              newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_Y] = newY;
            }
          }
        } else {
          for (n = 0; n < order; n += PPN) {
            if (NodeMatrix[n + NODE_FIXED] !== 1) {
              swinging = NodeMatrix[n + NODE_MASS] * Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
              );
              traction = Math.sqrt(
                (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) * (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) + (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) * (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
              ) / 2;
              nodespeed = NodeMatrix[n + NODE_CONVERGENCE] * Math.log(1 + traction) / (1 + Math.sqrt(swinging));
              NodeMatrix[n + NODE_CONVERGENCE] = Math.min(
                1,
                Math.sqrt(
                  nodespeed * (Math.pow(NodeMatrix[n + NODE_DX], 2) + Math.pow(NodeMatrix[n + NODE_DY], 2)) / (1 + Math.sqrt(swinging))
                )
              );
              newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_X] = newX;
              newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] * (nodespeed / options.slowDown);
              NodeMatrix[n + NODE_Y] = newY;
            }
          }
        }
        return {};
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/helpers.js
  var require_helpers = __commonJS({
    "node_modules/graphology-layout-forceatlas2/helpers.js"(exports) {
      var PPN = 10;
      var PPE = 3;
      exports.assign = function(target) {
        target = target || {};
        var objects = Array.prototype.slice.call(arguments).slice(1), i, k, l;
        for (i = 0, l = objects.length; i < l; i++) {
          if (!objects[i]) continue;
          for (k in objects[i]) target[k] = objects[i][k];
        }
        return target;
      };
      exports.validateSettings = function(settings) {
        if ("linLogMode" in settings && typeof settings.linLogMode !== "boolean")
          return { message: "the `linLogMode` setting should be a boolean." };
        if ("outboundAttractionDistribution" in settings && typeof settings.outboundAttractionDistribution !== "boolean")
          return {
            message: "the `outboundAttractionDistribution` setting should be a boolean."
          };
        if ("adjustSizes" in settings && typeof settings.adjustSizes !== "boolean")
          return { message: "the `adjustSizes` setting should be a boolean." };
        if ("edgeWeightInfluence" in settings && typeof settings.edgeWeightInfluence !== "number")
          return {
            message: "the `edgeWeightInfluence` setting should be a number."
          };
        if ("scalingRatio" in settings && !(typeof settings.scalingRatio === "number" && settings.scalingRatio >= 0))
          return { message: "the `scalingRatio` setting should be a number >= 0." };
        if ("strongGravityMode" in settings && typeof settings.strongGravityMode !== "boolean")
          return { message: "the `strongGravityMode` setting should be a boolean." };
        if ("gravity" in settings && !(typeof settings.gravity === "number" && settings.gravity >= 0))
          return { message: "the `gravity` setting should be a number >= 0." };
        if ("slowDown" in settings && !(typeof settings.slowDown === "number" || settings.slowDown >= 0))
          return { message: "the `slowDown` setting should be a number >= 0." };
        if ("barnesHutOptimize" in settings && typeof settings.barnesHutOptimize !== "boolean")
          return { message: "the `barnesHutOptimize` setting should be a boolean." };
        if ("barnesHutTheta" in settings && !(typeof settings.barnesHutTheta === "number" && settings.barnesHutTheta >= 0))
          return { message: "the `barnesHutTheta` setting should be a number >= 0." };
        return null;
      };
      exports.graphToByteArrays = function(graph, getEdgeWeight) {
        var order = graph.order;
        var size = graph.size;
        var index = {};
        var j;
        var NodeMatrix = new Float32Array(order * PPN);
        var EdgeMatrix = new Float32Array(size * PPE);
        j = 0;
        graph.forEachNode(function(node, attr) {
          index[node] = j;
          NodeMatrix[j] = attr.x;
          NodeMatrix[j + 1] = attr.y;
          NodeMatrix[j + 2] = 0;
          NodeMatrix[j + 3] = 0;
          NodeMatrix[j + 4] = 0;
          NodeMatrix[j + 5] = 0;
          NodeMatrix[j + 6] = 1;
          NodeMatrix[j + 7] = 1;
          NodeMatrix[j + 8] = attr.size || 1;
          NodeMatrix[j + 9] = attr.fixed ? 1 : 0;
          j += PPN;
        });
        j = 0;
        graph.forEachEdge(function(edge, attr, source, target, sa, ta, u) {
          var sj = index[source];
          var tj = index[target];
          var weight = getEdgeWeight(edge, attr, source, target, sa, ta, u);
          NodeMatrix[sj + 6] += weight;
          NodeMatrix[tj + 6] += weight;
          EdgeMatrix[j] = sj;
          EdgeMatrix[j + 1] = tj;
          EdgeMatrix[j + 2] = weight;
          j += PPE;
        });
        return {
          nodes: NodeMatrix,
          edges: EdgeMatrix
        };
      };
      exports.assignLayoutChanges = function(graph, NodeMatrix, outputReducer) {
        var i = 0;
        graph.updateEachNodeAttributes(function(node, attr) {
          attr.x = NodeMatrix[i];
          attr.y = NodeMatrix[i + 1];
          i += PPN;
          return outputReducer ? outputReducer(node, attr) : attr;
        });
      };
      exports.readGraphPositions = function(graph, NodeMatrix) {
        var i = 0;
        graph.forEachNode(function(node, attr) {
          NodeMatrix[i] = attr.x;
          NodeMatrix[i + 1] = attr.y;
          i += PPN;
        });
      };
      exports.collectLayoutChanges = function(graph, NodeMatrix, outputReducer) {
        var nodes = graph.nodes(), positions = {};
        for (var i = 0, j = 0, l = NodeMatrix.length; i < l; i += PPN) {
          if (outputReducer) {
            var newAttr = Object.assign({}, graph.getNodeAttributes(nodes[j]));
            newAttr.x = NodeMatrix[i];
            newAttr.y = NodeMatrix[i + 1];
            newAttr = outputReducer(nodes[j], newAttr);
            positions[nodes[j]] = {
              x: newAttr.x,
              y: newAttr.y
            };
          } else {
            positions[nodes[j]] = {
              x: NodeMatrix[i],
              y: NodeMatrix[i + 1]
            };
          }
          j++;
        }
        return positions;
      };
      exports.createWorker = function createWorker(fn) {
        var xURL = window.URL || window.webkitURL;
        var code = fn.toString();
        var objectUrl = xURL.createObjectURL(
          new Blob(["(" + code + ").call(this);"], { type: "text/javascript" })
        );
        var worker = new Worker(objectUrl);
        xURL.revokeObjectURL(objectUrl);
        return worker;
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/defaults.js
  var require_defaults = __commonJS({
    "node_modules/graphology-layout-forceatlas2/defaults.js"(exports, module) {
      module.exports = {
        linLogMode: false,
        outboundAttractionDistribution: false,
        adjustSizes: false,
        edgeWeightInfluence: 1,
        scalingRatio: 1,
        strongGravityMode: false,
        gravity: 1,
        slowDown: 1,
        barnesHutOptimize: false,
        barnesHutTheta: 0.5
      };
    }
  });

  // node_modules/graphology-layout-forceatlas2/index.js
  var require_graphology_layout_forceatlas2 = __commonJS({
    "node_modules/graphology-layout-forceatlas2/index.js"(exports, module) {
      var isGraph2 = require_is_graph();
      var createEdgeWeightGetter = require_getters().createEdgeWeightGetter;
      var iterate = require_iterate();
      var helpers = require_helpers();
      var DEFAULT_SETTINGS2 = require_defaults();
      function abstractSynchronousLayout(assign3, graph, params) {
        if (!isGraph2(graph))
          throw new Error(
            "graphology-layout-forceatlas2: the given graph is not a valid graphology instance."
          );
        if (typeof params === "number") params = { iterations: params };
        var iterations = params.iterations;
        if (typeof iterations !== "number")
          throw new Error(
            "graphology-layout-forceatlas2: invalid number of iterations."
          );
        if (iterations <= 0)
          throw new Error(
            "graphology-layout-forceatlas2: you should provide a positive number of iterations."
          );
        var getEdgeWeight = createEdgeWeightGetter(
          "getEdgeWeight" in params ? params.getEdgeWeight : "weight"
        ).fromEntry;
        var outputReducer = typeof params.outputReducer === "function" ? params.outputReducer : null;
        var settings = helpers.assign({}, DEFAULT_SETTINGS2, params.settings);
        var validationError = helpers.validateSettings(settings);
        if (validationError)
          throw new Error(
            "graphology-layout-forceatlas2: " + validationError.message
          );
        var matrices = helpers.graphToByteArrays(graph, getEdgeWeight);
        var i;
        for (i = 0; i < iterations; i++)
          iterate(settings, matrices.nodes, matrices.edges);
        if (assign3) {
          helpers.assignLayoutChanges(graph, matrices.nodes, outputReducer);
          return;
        }
        return helpers.collectLayoutChanges(graph, matrices.nodes);
      }
      function inferSettings(graph) {
        var order = typeof graph === "number" ? graph : graph.order;
        return {
          barnesHutOptimize: order > 2e3,
          strongGravityMode: true,
          gravity: 0.05,
          scalingRatio: 10,
          slowDown: 1 + Math.log(order)
        };
      }
      var synchronousLayout = abstractSynchronousLayout.bind(null, false);
      synchronousLayout.assign = abstractSynchronousLayout.bind(null, true);
      synchronousLayout.inferSettings = inferSettings;
      module.exports = synchronousLayout;
    }
  });

  // entry.mjs
  var entry_exports = {};
  __export(entry_exports, {
    DEFAULT_PRIMITIVES: () => DEFAULT_PRIMITIVES,
    DEFAULT_STYLES: () => DEFAULT_STYLES$1,
    Graph: () => Graph,
    Sigma: () => Sigma,
    forceAtlas2: () => import_graphology_layout_forceatlas2.default,
    layerDashed: () => layerDashed,
    sdfCircle: () => sdfCircle,
    sdfDiamond: () => sdfDiamond,
    sdfRectangle: () => sdfRectangle,
    sdfSquare: () => sdfSquare,
    sdfTriangle: () => sdfTriangle
  });

  // node_modules/graphology/dist/graphology.mjs
  var import_events = __toESM(require_events(), 1);
  function assignPolyfill() {
    const target = arguments[0];
    for (let i = 1, l = arguments.length; i < l; i++) {
      if (!arguments[i]) continue;
      for (const k in arguments[i]) target[k] = arguments[i][k];
    }
    return target;
  }
  var assign = assignPolyfill;
  if (typeof Object.assign === "function") assign = Object.assign;
  function getMatchingEdge(graph, source, target, type) {
    const sourceData = graph._nodes.get(source);
    let edge = null;
    if (!sourceData) return edge;
    if (type === "mixed") {
      edge = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target];
    } else if (type === "directed") {
      edge = sourceData.out && sourceData.out[target];
    } else {
      edge = sourceData.undirected && sourceData.undirected[target];
    }
    return edge;
  }
  function isPlainObject(value) {
    return typeof value === "object" && value !== null;
  }
  function isEmpty(o) {
    let k;
    for (k in o) return false;
    return true;
  }
  function privateProperty(target, name, value) {
    Object.defineProperty(target, name, {
      enumerable: false,
      configurable: false,
      writable: true,
      value
    });
  }
  function readOnlyProperty(target, name, value) {
    const descriptor = {
      enumerable: true,
      configurable: true
    };
    if (typeof value === "function") {
      descriptor.get = value;
    } else {
      descriptor.value = value;
      descriptor.writable = false;
    }
    Object.defineProperty(target, name, descriptor);
  }
  function validateHints(hints) {
    if (!isPlainObject(hints)) return false;
    if (hints.attributes && !Array.isArray(hints.attributes)) return false;
    return true;
  }
  function incrementalIdStartingFromRandomByte() {
    let i = Math.floor(Math.random() * 256) & 255;
    return () => {
      return i++;
    };
  }
  function chain() {
    const iterables = arguments;
    let current = null;
    let i = -1;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let step = null;
        do {
          if (current === null) {
            i++;
            if (i >= iterables.length) return { done: true };
            current = iterables[i][Symbol.iterator]();
          }
          step = current.next();
          if (step.done) {
            current = null;
            continue;
          }
          break;
        } while (true);
        return step;
      }
    };
  }
  function emptyIterator() {
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        return { done: true };
      }
    };
  }
  var GraphError = class extends Error {
    constructor(message) {
      super();
      this.name = "GraphError";
      this.message = message;
    }
  };
  var InvalidArgumentsGraphError = class _InvalidArgumentsGraphError extends GraphError {
    constructor(message) {
      super(message);
      this.name = "InvalidArgumentsGraphError";
      if (typeof Error.captureStackTrace === "function")
        Error.captureStackTrace(
          this,
          _InvalidArgumentsGraphError.prototype.constructor
        );
    }
  };
  var NotFoundGraphError = class _NotFoundGraphError extends GraphError {
    constructor(message) {
      super(message);
      this.name = "NotFoundGraphError";
      if (typeof Error.captureStackTrace === "function")
        Error.captureStackTrace(this, _NotFoundGraphError.prototype.constructor);
    }
  };
  var UsageGraphError = class _UsageGraphError extends GraphError {
    constructor(message) {
      super(message);
      this.name = "UsageGraphError";
      if (typeof Error.captureStackTrace === "function")
        Error.captureStackTrace(this, _UsageGraphError.prototype.constructor);
    }
  };
  function MixedNodeData(key, attributes) {
    this.key = key;
    this.attributes = attributes;
    this.clear();
  }
  MixedNodeData.prototype.clear = function() {
    this.inDegree = 0;
    this.outDegree = 0;
    this.undirectedDegree = 0;
    this.undirectedLoops = 0;
    this.directedLoops = 0;
    this.in = {};
    this.out = {};
    this.undirected = {};
  };
  function DirectedNodeData(key, attributes) {
    this.key = key;
    this.attributes = attributes;
    this.clear();
  }
  DirectedNodeData.prototype.clear = function() {
    this.inDegree = 0;
    this.outDegree = 0;
    this.directedLoops = 0;
    this.in = {};
    this.out = {};
  };
  function UndirectedNodeData(key, attributes) {
    this.key = key;
    this.attributes = attributes;
    this.clear();
  }
  UndirectedNodeData.prototype.clear = function() {
    this.undirectedDegree = 0;
    this.undirectedLoops = 0;
    this.undirected = {};
  };
  function EdgeData(undirected, key, source, target, attributes) {
    this.key = key;
    this.attributes = attributes;
    this.undirected = undirected;
    this.source = source;
    this.target = target;
  }
  EdgeData.prototype.attach = function() {
    let outKey = "out";
    let inKey = "in";
    if (this.undirected) outKey = inKey = "undirected";
    const source = this.source.key;
    const target = this.target.key;
    this.source[outKey][target] = this;
    if (this.undirected && source === target) return;
    this.target[inKey][source] = this;
  };
  EdgeData.prototype.attachMulti = function() {
    let outKey = "out";
    let inKey = "in";
    const source = this.source.key;
    const target = this.target.key;
    if (this.undirected) outKey = inKey = "undirected";
    const adj = this.source[outKey];
    const head = adj[target];
    if (typeof head === "undefined") {
      adj[target] = this;
      if (!(this.undirected && source === target)) {
        this.target[inKey][source] = this;
      }
      return;
    }
    head.previous = this;
    this.next = head;
    adj[target] = this;
    this.target[inKey][source] = this;
  };
  EdgeData.prototype.detach = function() {
    const source = this.source.key;
    const target = this.target.key;
    let outKey = "out";
    let inKey = "in";
    if (this.undirected) outKey = inKey = "undirected";
    delete this.source[outKey][target];
    delete this.target[inKey][source];
  };
  EdgeData.prototype.detachMulti = function() {
    const source = this.source.key;
    const target = this.target.key;
    let outKey = "out";
    let inKey = "in";
    if (this.undirected) outKey = inKey = "undirected";
    if (this.previous === void 0) {
      if (this.next === void 0) {
        delete this.source[outKey][target];
        delete this.target[inKey][source];
      } else {
        this.next.previous = void 0;
        this.source[outKey][target] = this.next;
        this.target[inKey][source] = this.next;
      }
    } else {
      this.previous.next = this.next;
      if (this.next !== void 0) {
        this.next.previous = this.previous;
      }
    }
  };
  var NODE = 0;
  var SOURCE = 1;
  var TARGET = 2;
  var OPPOSITE = 3;
  function findRelevantNodeData(graph, method, mode, nodeOrEdge, nameOrEdge, add1, add2) {
    let nodeData, edgeData, arg1, arg2;
    nodeOrEdge = "" + nodeOrEdge;
    if (mode === NODE) {
      nodeData = graph._nodes.get(nodeOrEdge);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${nodeOrEdge}" node in the graph.`
        );
      arg1 = nameOrEdge;
      arg2 = add1;
    } else if (mode === OPPOSITE) {
      nameOrEdge = "" + nameOrEdge;
      edgeData = graph._edges.get(nameOrEdge);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${nameOrEdge}" edge in the graph.`
        );
      const source = edgeData.source.key;
      const target = edgeData.target.key;
      if (nodeOrEdge === source) {
        nodeData = edgeData.target;
      } else if (nodeOrEdge === target) {
        nodeData = edgeData.source;
      } else {
        throw new NotFoundGraphError(
          `Graph.${method}: the "${nodeOrEdge}" node is not attached to the "${nameOrEdge}" edge (${source}, ${target}).`
        );
      }
      arg1 = add1;
      arg2 = add2;
    } else {
      edgeData = graph._edges.get(nodeOrEdge);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.${method}: could not find the "${nodeOrEdge}" edge in the graph.`
        );
      if (mode === SOURCE) {
        nodeData = edgeData.source;
      } else {
        nodeData = edgeData.target;
      }
      arg1 = nameOrEdge;
      arg2 = add1;
    }
    return [nodeData, arg1, arg2];
  }
  function attachNodeAttributeGetter(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, name] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      return data.attributes[name];
    };
  }
  function attachNodeAttributesGetter(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge) {
      const [data] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge
      );
      return data.attributes;
    };
  }
  function attachNodeAttributeChecker(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, name] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      return data.attributes.hasOwnProperty(name);
    };
  }
  function attachNodeAttributeSetter(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
      const [data, name, value] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1,
        add2
      );
      data.attributes[name] = value;
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "set",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachNodeAttributeUpdater(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1, add2) {
      const [data, name, updater] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1,
        add2
      );
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: updater should be a function.`
        );
      const attributes = data.attributes;
      const value = updater(attributes[name]);
      attributes[name] = value;
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "set",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachNodeAttributeRemover(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, name] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      delete data.attributes[name];
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "remove",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachNodeAttributesReplacer(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, attributes] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided attributes are not a plain object.`
        );
      data.attributes = attributes;
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "replace",
        attributes: data.attributes
      });
      return this;
    };
  }
  function attachNodeAttributesMerger(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, attributes] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided attributes are not a plain object.`
        );
      assign(data.attributes, attributes);
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "merge",
        attributes: data.attributes,
        data: attributes
      });
      return this;
    };
  }
  function attachNodeAttributesUpdater(Class, method, mode) {
    Class.prototype[method] = function(nodeOrEdge, nameOrEdge, add1) {
      const [data, updater] = findRelevantNodeData(
        this,
        method,
        mode,
        nodeOrEdge,
        nameOrEdge,
        add1
      );
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided updater is not a function.`
        );
      data.attributes = updater(data.attributes);
      this.emit("nodeAttributesUpdated", {
        key: data.key,
        type: "update",
        attributes: data.attributes
      });
      return this;
    };
  }
  var NODE_ATTRIBUTES_METHODS = [
    {
      name: (element) => `get${element}Attribute`,
      attacher: attachNodeAttributeGetter
    },
    {
      name: (element) => `get${element}Attributes`,
      attacher: attachNodeAttributesGetter
    },
    {
      name: (element) => `has${element}Attribute`,
      attacher: attachNodeAttributeChecker
    },
    {
      name: (element) => `set${element}Attribute`,
      attacher: attachNodeAttributeSetter
    },
    {
      name: (element) => `update${element}Attribute`,
      attacher: attachNodeAttributeUpdater
    },
    {
      name: (element) => `remove${element}Attribute`,
      attacher: attachNodeAttributeRemover
    },
    {
      name: (element) => `replace${element}Attributes`,
      attacher: attachNodeAttributesReplacer
    },
    {
      name: (element) => `merge${element}Attributes`,
      attacher: attachNodeAttributesMerger
    },
    {
      name: (element) => `update${element}Attributes`,
      attacher: attachNodeAttributesUpdater
    }
  ];
  function attachNodeAttributesMethods(Graph2) {
    NODE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
      attacher(Graph2, name("Node"), NODE);
      attacher(Graph2, name("Source"), SOURCE);
      attacher(Graph2, name("Target"), TARGET);
      attacher(Graph2, name("Opposite"), OPPOSITE);
    });
  }
  function attachEdgeAttributeGetter(Class, method, type) {
    Class.prototype[method] = function(element, name) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element;
        const target = "" + name;
        name = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      return data.attributes[name];
    };
  }
  function attachEdgeAttributesGetter(Class, method, type) {
    Class.prototype[method] = function(element) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 1) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element, target = "" + arguments[1];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      return data.attributes;
    };
  }
  function attachEdgeAttributeChecker(Class, method, type) {
    Class.prototype[method] = function(element, name) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element;
        const target = "" + name;
        name = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      return data.attributes.hasOwnProperty(name);
    };
  }
  function attachEdgeAttributeSetter(Class, method, type) {
    Class.prototype[method] = function(element, name, value) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 3) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element;
        const target = "" + name;
        name = arguments[2];
        value = arguments[3];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      data.attributes[name] = value;
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "set",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachEdgeAttributeUpdater(Class, method, type) {
    Class.prototype[method] = function(element, name, updater) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 3) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element;
        const target = "" + name;
        name = arguments[2];
        updater = arguments[3];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: updater should be a function.`
        );
      data.attributes[name] = updater(data.attributes[name]);
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "set",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachEdgeAttributeRemover(Class, method, type) {
    Class.prototype[method] = function(element, name) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element;
        const target = "" + name;
        name = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      delete data.attributes[name];
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "remove",
        attributes: data.attributes,
        name
      });
      return this;
    };
  }
  function attachEdgeAttributesReplacer(Class, method, type) {
    Class.prototype[method] = function(element, attributes) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element, target = "" + attributes;
        attributes = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided attributes are not a plain object.`
        );
      data.attributes = attributes;
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "replace",
        attributes: data.attributes
      });
      return this;
    };
  }
  function attachEdgeAttributesMerger(Class, method, type) {
    Class.prototype[method] = function(element, attributes) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element, target = "" + attributes;
        attributes = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided attributes are not a plain object.`
        );
      assign(data.attributes, attributes);
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "merge",
        attributes: data.attributes,
        data: attributes
      });
      return this;
    };
  }
  function attachEdgeAttributesUpdater(Class, method, type) {
    Class.prototype[method] = function(element, updater) {
      let data;
      if (this.type !== "mixed" && type !== "mixed" && type !== this.type)
        throw new UsageGraphError(
          `Graph.${method}: cannot find this type of edges in your ${this.type} graph.`
        );
      if (arguments.length > 2) {
        if (this.multi)
          throw new UsageGraphError(
            `Graph.${method}: cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about.`
          );
        const source = "" + element, target = "" + updater;
        updater = arguments[2];
        data = getMatchingEdge(this, source, target, type);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find an edge for the given path ("${source}" - "${target}").`
          );
      } else {
        if (type !== "mixed")
          throw new UsageGraphError(
            `Graph.${method}: calling this method with only a key (vs. a source and target) does not make sense since an edge with this key could have the other type.`
          );
        element = "" + element;
        data = this._edges.get(element);
        if (!data)
          throw new NotFoundGraphError(
            `Graph.${method}: could not find the "${element}" edge in the graph.`
          );
      }
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.${method}: provided updater is not a function.`
        );
      data.attributes = updater(data.attributes);
      this.emit("edgeAttributesUpdated", {
        key: data.key,
        type: "update",
        attributes: data.attributes
      });
      return this;
    };
  }
  var EDGE_ATTRIBUTES_METHODS = [
    {
      name: (element) => `get${element}Attribute`,
      attacher: attachEdgeAttributeGetter
    },
    {
      name: (element) => `get${element}Attributes`,
      attacher: attachEdgeAttributesGetter
    },
    {
      name: (element) => `has${element}Attribute`,
      attacher: attachEdgeAttributeChecker
    },
    {
      name: (element) => `set${element}Attribute`,
      attacher: attachEdgeAttributeSetter
    },
    {
      name: (element) => `update${element}Attribute`,
      attacher: attachEdgeAttributeUpdater
    },
    {
      name: (element) => `remove${element}Attribute`,
      attacher: attachEdgeAttributeRemover
    },
    {
      name: (element) => `replace${element}Attributes`,
      attacher: attachEdgeAttributesReplacer
    },
    {
      name: (element) => `merge${element}Attributes`,
      attacher: attachEdgeAttributesMerger
    },
    {
      name: (element) => `update${element}Attributes`,
      attacher: attachEdgeAttributesUpdater
    }
  ];
  function attachEdgeAttributesMethods(Graph2) {
    EDGE_ATTRIBUTES_METHODS.forEach(function({ name, attacher }) {
      attacher(Graph2, name("Edge"), "mixed");
      attacher(Graph2, name("DirectedEdge"), "directed");
      attacher(Graph2, name("UndirectedEdge"), "undirected");
    });
  }
  var EDGES_ITERATION = [
    {
      name: "edges",
      type: "mixed"
    },
    {
      name: "inEdges",
      type: "directed",
      direction: "in"
    },
    {
      name: "outEdges",
      type: "directed",
      direction: "out"
    },
    {
      name: "inboundEdges",
      type: "mixed",
      direction: "in"
    },
    {
      name: "outboundEdges",
      type: "mixed",
      direction: "out"
    },
    {
      name: "directedEdges",
      type: "directed"
    },
    {
      name: "undirectedEdges",
      type: "undirected"
    }
  ];
  function forEachSimple(breakable, object, callback, avoid) {
    let shouldBreak = false;
    for (const k in object) {
      if (k === avoid) continue;
      const edgeData = object[k];
      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        edgeData.source.key,
        edgeData.target.key,
        edgeData.source.attributes,
        edgeData.target.attributes,
        edgeData.undirected
      );
      if (breakable && shouldBreak) return edgeData.key;
    }
    return;
  }
  function forEachMulti(breakable, object, callback, avoid) {
    let edgeData, source, target;
    let shouldBreak = false;
    for (const k in object) {
      if (k === avoid) continue;
      edgeData = object[k];
      do {
        source = edgeData.source;
        target = edgeData.target;
        shouldBreak = callback(
          edgeData.key,
          edgeData.attributes,
          source.key,
          target.key,
          source.attributes,
          target.attributes,
          edgeData.undirected
        );
        if (breakable && shouldBreak) return edgeData.key;
        edgeData = edgeData.next;
      } while (edgeData !== void 0);
    }
    return;
  }
  function createIterator(object, avoid) {
    const keys = Object.keys(object);
    const l = keys.length;
    let edgeData;
    let i = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        do {
          if (!edgeData) {
            if (i >= l) return { done: true };
            const k = keys[i++];
            if (k === avoid) {
              edgeData = void 0;
              continue;
            }
            edgeData = object[k];
          } else {
            edgeData = edgeData.next;
          }
        } while (!edgeData);
        return {
          done: false,
          value: {
            edge: edgeData.key,
            attributes: edgeData.attributes,
            source: edgeData.source.key,
            target: edgeData.target.key,
            sourceAttributes: edgeData.source.attributes,
            targetAttributes: edgeData.target.attributes,
            undirected: edgeData.undirected
          }
        };
      }
    };
  }
  function forEachForKeySimple(breakable, object, k, callback) {
    const edgeData = object[k];
    if (!edgeData) return;
    const sourceData = edgeData.source;
    const targetData = edgeData.target;
    if (callback(
      edgeData.key,
      edgeData.attributes,
      sourceData.key,
      targetData.key,
      sourceData.attributes,
      targetData.attributes,
      edgeData.undirected
    ) && breakable)
      return edgeData.key;
  }
  function forEachForKeyMulti(breakable, object, k, callback) {
    let edgeData = object[k];
    if (!edgeData) return;
    let shouldBreak = false;
    do {
      shouldBreak = callback(
        edgeData.key,
        edgeData.attributes,
        edgeData.source.key,
        edgeData.target.key,
        edgeData.source.attributes,
        edgeData.target.attributes,
        edgeData.undirected
      );
      if (breakable && shouldBreak) return edgeData.key;
      edgeData = edgeData.next;
    } while (edgeData !== void 0);
    return;
  }
  function createIteratorForKey(object, k) {
    let edgeData = object[k];
    if (edgeData.next !== void 0) {
      return {
        [Symbol.iterator]() {
          return this;
        },
        next() {
          if (!edgeData) return { done: true };
          const value = {
            edge: edgeData.key,
            attributes: edgeData.attributes,
            source: edgeData.source.key,
            target: edgeData.target.key,
            sourceAttributes: edgeData.source.attributes,
            targetAttributes: edgeData.target.attributes,
            undirected: edgeData.undirected
          };
          edgeData = edgeData.next;
          return {
            done: false,
            value
          };
        }
      };
    }
    let done = false;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (done === true) return { done: true };
        done = true;
        return {
          done: false,
          value: {
            edge: edgeData.key,
            attributes: edgeData.attributes,
            source: edgeData.source.key,
            target: edgeData.target.key,
            sourceAttributes: edgeData.source.attributes,
            targetAttributes: edgeData.target.attributes,
            undirected: edgeData.undirected
          }
        };
      }
    };
  }
  function createEdgeArray(graph, type) {
    if (graph.size === 0) return [];
    if (type === "mixed" || type === graph.type) {
      return Array.from(graph._edges.keys());
    }
    const size = type === "undirected" ? graph.undirectedSize : graph.directedSize;
    const list = new Array(size), mask = type === "undirected";
    const iterator = graph._edges.values();
    let i = 0;
    let step, data;
    while (step = iterator.next(), step.done !== true) {
      data = step.value;
      if (data.undirected === mask) list[i++] = data.key;
    }
    return list;
  }
  function forEachEdge(breakable, graph, type, callback) {
    if (graph.size === 0) return;
    const shouldFilter = type !== "mixed" && type !== graph.type;
    const mask = type === "undirected";
    let step, data;
    let shouldBreak = false;
    const iterator = graph._edges.values();
    while (step = iterator.next(), step.done !== true) {
      data = step.value;
      if (shouldFilter && data.undirected !== mask) continue;
      const { key, attributes, source, target } = data;
      shouldBreak = callback(
        key,
        attributes,
        source.key,
        target.key,
        source.attributes,
        target.attributes,
        data.undirected
      );
      if (breakable && shouldBreak) return key;
    }
    return;
  }
  function createEdgeIterator(graph, type) {
    if (graph.size === 0) return emptyIterator();
    const shouldFilter = type !== "mixed" && type !== graph.type;
    const mask = type === "undirected";
    const iterator = graph._edges.values();
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let step, data;
        while (true) {
          step = iterator.next();
          if (step.done) return step;
          data = step.value;
          if (shouldFilter && data.undirected !== mask) continue;
          break;
        }
        const value = {
          edge: data.key,
          attributes: data.attributes,
          source: data.source.key,
          target: data.target.key,
          sourceAttributes: data.source.attributes,
          targetAttributes: data.target.attributes,
          undirected: data.undirected
        };
        return { value, done: false };
      }
    };
  }
  function forEachEdgeForNode(breakable, multi, type, direction, nodeData, callback) {
    const fn = multi ? forEachMulti : forEachSimple;
    let found;
    if (type !== "undirected") {
      if (direction !== "out") {
        found = fn(breakable, nodeData.in, callback);
        if (breakable && found) return found;
      }
      if (direction !== "in") {
        found = fn(
          breakable,
          nodeData.out,
          callback,
          !direction ? nodeData.key : void 0
        );
        if (breakable && found) return found;
      }
    }
    if (type !== "directed") {
      found = fn(breakable, nodeData.undirected, callback);
      if (breakable && found) return found;
    }
    return;
  }
  function createEdgeArrayForNode(multi, type, direction, nodeData) {
    const edges = [];
    forEachEdgeForNode(false, multi, type, direction, nodeData, function(key) {
      edges.push(key);
    });
    return edges;
  }
  function createEdgeIteratorForNode(type, direction, nodeData) {
    let iterator = emptyIterator();
    if (type !== "undirected") {
      if (direction !== "out" && typeof nodeData.in !== "undefined")
        iterator = chain(iterator, createIterator(nodeData.in));
      if (direction !== "in" && typeof nodeData.out !== "undefined")
        iterator = chain(
          iterator,
          createIterator(nodeData.out, !direction ? nodeData.key : void 0)
        );
    }
    if (type !== "directed" && typeof nodeData.undirected !== "undefined") {
      iterator = chain(iterator, createIterator(nodeData.undirected));
    }
    return iterator;
  }
  function forEachEdgeForPath(breakable, type, multi, direction, sourceData, target, callback) {
    const fn = multi ? forEachForKeyMulti : forEachForKeySimple;
    let found;
    if (type !== "undirected") {
      if (typeof sourceData.in !== "undefined" && direction !== "out") {
        found = fn(breakable, sourceData.in, target, callback);
        if (breakable && found) return found;
      }
      if (typeof sourceData.out !== "undefined" && direction !== "in" && (direction || sourceData.key !== target)) {
        found = fn(breakable, sourceData.out, target, callback);
        if (breakable && found) return found;
      }
    }
    if (type !== "directed") {
      if (typeof sourceData.undirected !== "undefined") {
        found = fn(breakable, sourceData.undirected, target, callback);
        if (breakable && found) return found;
      }
    }
    return;
  }
  function createEdgeArrayForPath(type, multi, direction, sourceData, target) {
    const edges = [];
    forEachEdgeForPath(
      false,
      type,
      multi,
      direction,
      sourceData,
      target,
      function(key) {
        edges.push(key);
      }
    );
    return edges;
  }
  function createEdgeIteratorForPath(type, direction, sourceData, target) {
    let iterator = emptyIterator();
    if (type !== "undirected") {
      if (typeof sourceData.in !== "undefined" && direction !== "out" && target in sourceData.in)
        iterator = chain(iterator, createIteratorForKey(sourceData.in, target));
      if (typeof sourceData.out !== "undefined" && direction !== "in" && target in sourceData.out && (direction || sourceData.key !== target))
        iterator = chain(iterator, createIteratorForKey(sourceData.out, target));
    }
    if (type !== "directed") {
      if (typeof sourceData.undirected !== "undefined" && target in sourceData.undirected)
        iterator = chain(
          iterator,
          createIteratorForKey(sourceData.undirected, target)
        );
    }
    return iterator;
  }
  function attachEdgeArrayCreator(Class, description) {
    const { name, type, direction } = description;
    Class.prototype[name] = function(source, target) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
        return [];
      if (!arguments.length) return createEdgeArray(this, type);
      if (arguments.length === 1) {
        source = "" + source;
        const nodeData = this._nodes.get(source);
        if (typeof nodeData === "undefined")
          throw new NotFoundGraphError(
            `Graph.${name}: could not find the "${source}" node in the graph.`
          );
        return createEdgeArrayForNode(
          this.multi,
          type === "mixed" ? this.type : type,
          direction,
          nodeData
        );
      }
      if (arguments.length === 2) {
        source = "" + source;
        target = "" + target;
        const sourceData = this._nodes.get(source);
        if (!sourceData)
          throw new NotFoundGraphError(
            `Graph.${name}:  could not find the "${source}" source node in the graph.`
          );
        if (!this._nodes.has(target))
          throw new NotFoundGraphError(
            `Graph.${name}:  could not find the "${target}" target node in the graph.`
          );
        return createEdgeArrayForPath(
          type,
          this.multi,
          direction,
          sourceData,
          target
        );
      }
      throw new InvalidArgumentsGraphError(
        `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
      );
    };
  }
  function attachForEachEdge(Class, description) {
    const { name, type, direction } = description;
    const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
    Class.prototype[forEachName] = function(source, target, callback) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
      if (arguments.length === 1) {
        callback = source;
        return forEachEdge(false, this, type, callback);
      }
      if (arguments.length === 2) {
        source = "" + source;
        callback = target;
        const nodeData = this._nodes.get(source);
        if (typeof nodeData === "undefined")
          throw new NotFoundGraphError(
            `Graph.${forEachName}: could not find the "${source}" node in the graph.`
          );
        return forEachEdgeForNode(
          false,
          this.multi,
          type === "mixed" ? this.type : type,
          direction,
          nodeData,
          callback
        );
      }
      if (arguments.length === 3) {
        source = "" + source;
        target = "" + target;
        const sourceData = this._nodes.get(source);
        if (!sourceData)
          throw new NotFoundGraphError(
            `Graph.${forEachName}:  could not find the "${source}" source node in the graph.`
          );
        if (!this._nodes.has(target))
          throw new NotFoundGraphError(
            `Graph.${forEachName}:  could not find the "${target}" target node in the graph.`
          );
        return forEachEdgeForPath(
          false,
          type,
          this.multi,
          direction,
          sourceData,
          target,
          callback
        );
      }
      throw new InvalidArgumentsGraphError(
        `Graph.${forEachName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
      );
    };
    const mapName = "map" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[mapName] = function() {
      const args = Array.prototype.slice.call(arguments);
      const callback = args.pop();
      let result;
      if (args.length === 0) {
        let length = 0;
        if (type !== "directed") length += this.undirectedSize;
        if (type !== "undirected") length += this.directedSize;
        result = new Array(length);
        let i = 0;
        args.push((e, ea, s, t, sa, ta, u) => {
          result[i++] = callback(e, ea, s, t, sa, ta, u);
        });
      } else {
        result = [];
        args.push((e, ea, s, t, sa, ta, u) => {
          result.push(callback(e, ea, s, t, sa, ta, u));
        });
      }
      this[forEachName].apply(this, args);
      return result;
    };
    const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[filterName] = function() {
      const args = Array.prototype.slice.call(arguments);
      const callback = args.pop();
      const result = [];
      args.push((e, ea, s, t, sa, ta, u) => {
        if (callback(e, ea, s, t, sa, ta, u)) result.push(e);
      });
      this[forEachName].apply(this, args);
      return result;
    };
    const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[reduceName] = function() {
      let args = Array.prototype.slice.call(arguments);
      if (args.length < 2 || args.length > 4) {
        throw new InvalidArgumentsGraphError(
          `Graph.${reduceName}: invalid number of arguments (expecting 2, 3 or 4 and got ${args.length}).`
        );
      }
      if (typeof args[args.length - 1] === "function" && typeof args[args.length - 2] !== "function") {
        throw new InvalidArgumentsGraphError(
          `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
        );
      }
      let callback;
      let initialValue;
      if (args.length === 2) {
        callback = args[0];
        initialValue = args[1];
        args = [];
      } else if (args.length === 3) {
        callback = args[1];
        initialValue = args[2];
        args = [args[0]];
      } else if (args.length === 4) {
        callback = args[2];
        initialValue = args[3];
        args = [args[0], args[1]];
      }
      let accumulator = initialValue;
      args.push((e, ea, s, t, sa, ta, u) => {
        accumulator = callback(accumulator, e, ea, s, t, sa, ta, u);
      });
      this[forEachName].apply(this, args);
      return accumulator;
    };
  }
  function attachFindEdge(Class, description) {
    const { name, type, direction } = description;
    const findEdgeName = "find" + name[0].toUpperCase() + name.slice(1, -1);
    Class.prototype[findEdgeName] = function(source, target, callback) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
        return false;
      if (arguments.length === 1) {
        callback = source;
        return forEachEdge(true, this, type, callback);
      }
      if (arguments.length === 2) {
        source = "" + source;
        callback = target;
        const nodeData = this._nodes.get(source);
        if (typeof nodeData === "undefined")
          throw new NotFoundGraphError(
            `Graph.${findEdgeName}: could not find the "${source}" node in the graph.`
          );
        return forEachEdgeForNode(
          true,
          this.multi,
          type === "mixed" ? this.type : type,
          direction,
          nodeData,
          callback
        );
      }
      if (arguments.length === 3) {
        source = "" + source;
        target = "" + target;
        const sourceData = this._nodes.get(source);
        if (!sourceData)
          throw new NotFoundGraphError(
            `Graph.${findEdgeName}:  could not find the "${source}" source node in the graph.`
          );
        if (!this._nodes.has(target))
          throw new NotFoundGraphError(
            `Graph.${findEdgeName}:  could not find the "${target}" target node in the graph.`
          );
        return forEachEdgeForPath(
          true,
          type,
          this.multi,
          direction,
          sourceData,
          target,
          callback
        );
      }
      throw new InvalidArgumentsGraphError(
        `Graph.${findEdgeName}: too many arguments (expecting 1, 2 or 3 and got ${arguments.length}).`
      );
    };
    const someName = "some" + name[0].toUpperCase() + name.slice(1, -1);
    Class.prototype[someName] = function() {
      const args = Array.prototype.slice.call(arguments);
      const callback = args.pop();
      args.push((e, ea, s, t, sa, ta, u) => {
        return callback(e, ea, s, t, sa, ta, u);
      });
      const found = this[findEdgeName].apply(this, args);
      if (found) return true;
      return false;
    };
    const everyName = "every" + name[0].toUpperCase() + name.slice(1, -1);
    Class.prototype[everyName] = function() {
      const args = Array.prototype.slice.call(arguments);
      const callback = args.pop();
      args.push((e, ea, s, t, sa, ta, u) => {
        return !callback(e, ea, s, t, sa, ta, u);
      });
      const found = this[findEdgeName].apply(this, args);
      if (found) return false;
      return true;
    };
  }
  function attachEdgeIteratorCreator(Class, description) {
    const { name: originalName, type, direction } = description;
    const name = originalName.slice(0, -1) + "Entries";
    Class.prototype[name] = function(source, target) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
        return emptyIterator();
      if (!arguments.length) return createEdgeIterator(this, type);
      if (arguments.length === 1) {
        source = "" + source;
        const sourceData = this._nodes.get(source);
        if (!sourceData)
          throw new NotFoundGraphError(
            `Graph.${name}: could not find the "${source}" node in the graph.`
          );
        return createEdgeIteratorForNode(type, direction, sourceData);
      }
      if (arguments.length === 2) {
        source = "" + source;
        target = "" + target;
        const sourceData = this._nodes.get(source);
        if (!sourceData)
          throw new NotFoundGraphError(
            `Graph.${name}:  could not find the "${source}" source node in the graph.`
          );
        if (!this._nodes.has(target))
          throw new NotFoundGraphError(
            `Graph.${name}:  could not find the "${target}" target node in the graph.`
          );
        return createEdgeIteratorForPath(type, direction, sourceData, target);
      }
      throw new InvalidArgumentsGraphError(
        `Graph.${name}: too many arguments (expecting 0, 1 or 2 and got ${arguments.length}).`
      );
    };
  }
  function attachEdgeIterationMethods(Graph2) {
    EDGES_ITERATION.forEach((description) => {
      attachEdgeArrayCreator(Graph2, description);
      attachForEachEdge(Graph2, description);
      attachFindEdge(Graph2, description);
      attachEdgeIteratorCreator(Graph2, description);
    });
  }
  var NEIGHBORS_ITERATION = [
    {
      name: "neighbors",
      type: "mixed"
    },
    {
      name: "inNeighbors",
      type: "directed",
      direction: "in"
    },
    {
      name: "outNeighbors",
      type: "directed",
      direction: "out"
    },
    {
      name: "inboundNeighbors",
      type: "mixed",
      direction: "in"
    },
    {
      name: "outboundNeighbors",
      type: "mixed",
      direction: "out"
    },
    {
      name: "directedNeighbors",
      type: "directed"
    },
    {
      name: "undirectedNeighbors",
      type: "undirected"
    }
  ];
  function CompositeSetWrapper() {
    this.A = null;
    this.B = null;
  }
  CompositeSetWrapper.prototype.wrap = function(set) {
    if (this.A === null) this.A = set;
    else if (this.B === null) this.B = set;
  };
  CompositeSetWrapper.prototype.has = function(key) {
    if (this.A !== null && key in this.A) return true;
    if (this.B !== null && key in this.B) return true;
    return false;
  };
  function forEachInObjectOnce(breakable, visited, nodeData, object, callback) {
    for (const k in object) {
      const edgeData = object[k];
      const sourceData = edgeData.source;
      const targetData = edgeData.target;
      const neighborData = sourceData === nodeData ? targetData : sourceData;
      if (visited && visited.has(neighborData.key)) continue;
      const shouldBreak = callback(neighborData.key, neighborData.attributes);
      if (breakable && shouldBreak) return neighborData.key;
    }
    return;
  }
  function forEachNeighbor(breakable, type, direction, nodeData, callback) {
    if (type !== "mixed") {
      if (type === "undirected")
        return forEachInObjectOnce(
          breakable,
          null,
          nodeData,
          nodeData.undirected,
          callback
        );
      if (typeof direction === "string")
        return forEachInObjectOnce(
          breakable,
          null,
          nodeData,
          nodeData[direction],
          callback
        );
    }
    const visited = new CompositeSetWrapper();
    let found;
    if (type !== "undirected") {
      if (direction !== "out") {
        found = forEachInObjectOnce(
          breakable,
          null,
          nodeData,
          nodeData.in,
          callback
        );
        if (breakable && found) return found;
        visited.wrap(nodeData.in);
      }
      if (direction !== "in") {
        found = forEachInObjectOnce(
          breakable,
          visited,
          nodeData,
          nodeData.out,
          callback
        );
        if (breakable && found) return found;
        visited.wrap(nodeData.out);
      }
    }
    if (type !== "directed") {
      found = forEachInObjectOnce(
        breakable,
        visited,
        nodeData,
        nodeData.undirected,
        callback
      );
      if (breakable && found) return found;
    }
    return;
  }
  function createNeighborArrayForNode(type, direction, nodeData) {
    if (type !== "mixed") {
      if (type === "undirected") return Object.keys(nodeData.undirected);
      if (typeof direction === "string") return Object.keys(nodeData[direction]);
    }
    const neighbors = [];
    forEachNeighbor(false, type, direction, nodeData, function(key) {
      neighbors.push(key);
    });
    return neighbors;
  }
  function createDedupedObjectIterator(visited, nodeData, object) {
    const keys = Object.keys(object);
    const l = keys.length;
    let i = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        let neighborData = null;
        do {
          if (i >= l) {
            if (visited) visited.wrap(object);
            return { done: true };
          }
          const edgeData = object[keys[i++]];
          const sourceData = edgeData.source;
          const targetData = edgeData.target;
          neighborData = sourceData === nodeData ? targetData : sourceData;
          if (visited && visited.has(neighborData.key)) {
            neighborData = null;
            continue;
          }
        } while (neighborData === null);
        return {
          done: false,
          value: { neighbor: neighborData.key, attributes: neighborData.attributes }
        };
      }
    };
  }
  function createNeighborIterator(type, direction, nodeData) {
    if (type !== "mixed") {
      if (type === "undirected")
        return createDedupedObjectIterator(null, nodeData, nodeData.undirected);
      if (typeof direction === "string")
        return createDedupedObjectIterator(null, nodeData, nodeData[direction]);
    }
    let iterator = emptyIterator();
    const visited = new CompositeSetWrapper();
    if (type !== "undirected") {
      if (direction !== "out") {
        iterator = chain(
          iterator,
          createDedupedObjectIterator(visited, nodeData, nodeData.in)
        );
      }
      if (direction !== "in") {
        iterator = chain(
          iterator,
          createDedupedObjectIterator(visited, nodeData, nodeData.out)
        );
      }
    }
    if (type !== "directed") {
      iterator = chain(
        iterator,
        createDedupedObjectIterator(visited, nodeData, nodeData.undirected)
      );
    }
    return iterator;
  }
  function attachNeighborArrayCreator(Class, description) {
    const { name, type, direction } = description;
    Class.prototype[name] = function(node) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
        return [];
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${name}: could not find the "${node}" node in the graph.`
        );
      return createNeighborArrayForNode(
        type === "mixed" ? this.type : type,
        direction,
        nodeData
      );
    };
  }
  function attachForEachNeighbor(Class, description) {
    const { name, type, direction } = description;
    const forEachName = "forEach" + name[0].toUpperCase() + name.slice(1, -1);
    Class.prototype[forEachName] = function(node, callback) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${forEachName}: could not find the "${node}" node in the graph.`
        );
      forEachNeighbor(
        false,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    };
    const mapName = "map" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[mapName] = function(node, callback) {
      const result = [];
      this[forEachName](node, (n, a) => {
        result.push(callback(n, a));
      });
      return result;
    };
    const filterName = "filter" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[filterName] = function(node, callback) {
      const result = [];
      this[forEachName](node, (n, a) => {
        if (callback(n, a)) result.push(n);
      });
      return result;
    };
    const reduceName = "reduce" + name[0].toUpperCase() + name.slice(1);
    Class.prototype[reduceName] = function(node, callback, initialValue) {
      if (arguments.length < 3)
        throw new InvalidArgumentsGraphError(
          `Graph.${reduceName}: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array.`
        );
      let accumulator = initialValue;
      this[forEachName](node, (n, a) => {
        accumulator = callback(accumulator, n, a);
      });
      return accumulator;
    };
  }
  function attachFindNeighbor(Class, description) {
    const { name, type, direction } = description;
    const capitalizedSingular = name[0].toUpperCase() + name.slice(1, -1);
    const findName = "find" + capitalizedSingular;
    Class.prototype[findName] = function(node, callback) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type) return;
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${findName}: could not find the "${node}" node in the graph.`
        );
      return forEachNeighbor(
        true,
        type === "mixed" ? this.type : type,
        direction,
        nodeData,
        callback
      );
    };
    const someName = "some" + capitalizedSingular;
    Class.prototype[someName] = function(node, callback) {
      const found = this[findName](node, callback);
      if (found) return true;
      return false;
    };
    const everyName = "every" + capitalizedSingular;
    Class.prototype[everyName] = function(node, callback) {
      const found = this[findName](node, (n, a) => {
        return !callback(n, a);
      });
      if (found) return false;
      return true;
    };
  }
  function attachNeighborIteratorCreator(Class, description) {
    const { name, type, direction } = description;
    const iteratorName = name.slice(0, -1) + "Entries";
    Class.prototype[iteratorName] = function(node) {
      if (type !== "mixed" && this.type !== "mixed" && type !== this.type)
        return emptyIterator();
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (typeof nodeData === "undefined")
        throw new NotFoundGraphError(
          `Graph.${iteratorName}: could not find the "${node}" node in the graph.`
        );
      return createNeighborIterator(
        type === "mixed" ? this.type : type,
        direction,
        nodeData
      );
    };
  }
  function attachNeighborIterationMethods(Graph2) {
    NEIGHBORS_ITERATION.forEach((description) => {
      attachNeighborArrayCreator(Graph2, description);
      attachForEachNeighbor(Graph2, description);
      attachFindNeighbor(Graph2, description);
      attachNeighborIteratorCreator(Graph2, description);
    });
  }
  function forEachAdjacency(breakable, assymetric, disconnectedNodes, graph, callback) {
    const iterator = graph._nodes.values();
    const type = graph.type;
    let step, sourceData, neighbor, adj, edgeData, targetData, shouldBreak;
    while (step = iterator.next(), step.done !== true) {
      let hasEdges = false;
      sourceData = step.value;
      if (type !== "undirected") {
        adj = sourceData.out;
        for (neighbor in adj) {
          edgeData = adj[neighbor];
          do {
            targetData = edgeData.target;
            hasEdges = true;
            shouldBreak = callback(
              sourceData.key,
              targetData.key,
              sourceData.attributes,
              targetData.attributes,
              edgeData.key,
              edgeData.attributes,
              edgeData.undirected
            );
            if (breakable && shouldBreak) return edgeData;
            edgeData = edgeData.next;
          } while (edgeData);
        }
      }
      if (type !== "directed") {
        adj = sourceData.undirected;
        for (neighbor in adj) {
          if (assymetric && sourceData.key > neighbor) continue;
          edgeData = adj[neighbor];
          do {
            targetData = edgeData.target;
            if (targetData.key !== neighbor) targetData = edgeData.source;
            hasEdges = true;
            shouldBreak = callback(
              sourceData.key,
              targetData.key,
              sourceData.attributes,
              targetData.attributes,
              edgeData.key,
              edgeData.attributes,
              edgeData.undirected
            );
            if (breakable && shouldBreak) return edgeData;
            edgeData = edgeData.next;
          } while (edgeData);
        }
      }
      if (disconnectedNodes && !hasEdges) {
        shouldBreak = callback(
          sourceData.key,
          null,
          sourceData.attributes,
          null,
          null,
          null,
          null
        );
        if (breakable && shouldBreak) return null;
      }
    }
    return;
  }
  function serializeNode(key, data) {
    const serialized = { key };
    if (!isEmpty(data.attributes))
      serialized.attributes = assign({}, data.attributes);
    return serialized;
  }
  function serializeEdge(type, key, data) {
    const serialized = {
      key,
      source: data.source.key,
      target: data.target.key
    };
    if (!isEmpty(data.attributes))
      serialized.attributes = assign({}, data.attributes);
    if (type === "mixed" && data.undirected) serialized.undirected = true;
    return serialized;
  }
  function validateSerializedNode(value) {
    if (!isPlainObject(value))
      throw new InvalidArgumentsGraphError(
        'Graph.import: invalid serialized node. A serialized node should be a plain object with at least a "key" property.'
      );
    if (!("key" in value))
      throw new InvalidArgumentsGraphError(
        "Graph.import: serialized node is missing its key."
      );
    if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
      throw new InvalidArgumentsGraphError(
        "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
      );
  }
  function validateSerializedEdge(value) {
    if (!isPlainObject(value))
      throw new InvalidArgumentsGraphError(
        'Graph.import: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.'
      );
    if (!("source" in value))
      throw new InvalidArgumentsGraphError(
        "Graph.import: serialized edge is missing its source."
      );
    if (!("target" in value))
      throw new InvalidArgumentsGraphError(
        "Graph.import: serialized edge is missing its target."
      );
    if ("attributes" in value && (!isPlainObject(value.attributes) || value.attributes === null))
      throw new InvalidArgumentsGraphError(
        "Graph.import: invalid attributes. Attributes should be a plain object, null or omitted."
      );
    if ("undirected" in value && typeof value.undirected !== "boolean")
      throw new InvalidArgumentsGraphError(
        "Graph.import: invalid undirectedness information. Undirected should be boolean or omitted."
      );
  }
  var INSTANCE_ID = incrementalIdStartingFromRandomByte();
  var TYPES = /* @__PURE__ */ new Set(["directed", "undirected", "mixed"]);
  var EMITTER_PROPS = /* @__PURE__ */ new Set([
    "domain",
    "_events",
    "_eventsCount",
    "_maxListeners"
  ]);
  var EDGE_ADD_METHODS = [
    {
      name: (verb) => `${verb}Edge`,
      generateKey: true
    },
    {
      name: (verb) => `${verb}DirectedEdge`,
      generateKey: true,
      type: "directed"
    },
    {
      name: (verb) => `${verb}UndirectedEdge`,
      generateKey: true,
      type: "undirected"
    },
    {
      name: (verb) => `${verb}EdgeWithKey`
    },
    {
      name: (verb) => `${verb}DirectedEdgeWithKey`,
      type: "directed"
    },
    {
      name: (verb) => `${verb}UndirectedEdgeWithKey`,
      type: "undirected"
    }
  ];
  var DEFAULTS = {
    allowSelfLoops: true,
    multi: false,
    type: "mixed"
  };
  function addNode(graph, node, attributes) {
    if (attributes && !isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.addNode: invalid attributes. Expecting an object but got "${attributes}"`
      );
    node = "" + node;
    attributes = attributes || {};
    if (graph._nodes.has(node))
      throw new UsageGraphError(
        `Graph.addNode: the "${node}" node already exist in the graph.`
      );
    const data = new graph.NodeDataClass(node, attributes);
    graph._nodes.set(node, data);
    graph.emit("nodeAdded", {
      key: node,
      attributes
    });
    return data;
  }
  function unsafeAddNode(graph, node, attributes) {
    const data = new graph.NodeDataClass(node, attributes);
    graph._nodes.set(node, data);
    graph.emit("nodeAdded", {
      key: node,
      attributes
    });
    return data;
  }
  function addEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes) {
    if (!undirected && graph.type === "undirected")
      throw new UsageGraphError(
        `Graph.${name}: you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead.`
      );
    if (undirected && graph.type === "directed")
      throw new UsageGraphError(
        `Graph.${name}: you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead.`
      );
    if (attributes && !isPlainObject(attributes))
      throw new InvalidArgumentsGraphError(
        `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
      );
    source = "" + source;
    target = "" + target;
    attributes = attributes || {};
    if (!graph.allowSelfLoops && source === target)
      throw new UsageGraphError(
        `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
      );
    const sourceData = graph._nodes.get(source), targetData = graph._nodes.get(target);
    if (!sourceData)
      throw new NotFoundGraphError(
        `Graph.${name}: source node "${source}" not found.`
      );
    if (!targetData)
      throw new NotFoundGraphError(
        `Graph.${name}: target node "${target}" not found.`
      );
    const eventData = {
      key: null,
      undirected,
      source,
      target,
      attributes
    };
    if (mustGenerateKey) {
      edge = graph._edgeKeyGenerator();
    } else {
      edge = "" + edge;
      if (graph._edges.has(edge))
        throw new UsageGraphError(
          `Graph.${name}: the "${edge}" edge already exists in the graph.`
        );
    }
    if (!graph.multi && (undirected ? typeof sourceData.undirected[target] !== "undefined" : typeof sourceData.out[target] !== "undefined")) {
      throw new UsageGraphError(
        `Graph.${name}: an edge linking "${source}" to "${target}" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option.`
      );
    }
    const edgeData = new EdgeData(
      undirected,
      edge,
      sourceData,
      targetData,
      attributes
    );
    graph._edges.set(edge, edgeData);
    const isSelfLoop = source === target;
    if (undirected) {
      sourceData.undirectedDegree++;
      targetData.undirectedDegree++;
      if (isSelfLoop) {
        sourceData.undirectedLoops++;
        graph._undirectedSelfLoopCount++;
      }
    } else {
      sourceData.outDegree++;
      targetData.inDegree++;
      if (isSelfLoop) {
        sourceData.directedLoops++;
        graph._directedSelfLoopCount++;
      }
    }
    if (graph.multi) edgeData.attachMulti();
    else edgeData.attach();
    if (undirected) graph._undirectedSize++;
    else graph._directedSize++;
    eventData.key = edge;
    graph.emit("edgeAdded", eventData);
    return edge;
  }
  function mergeEdge(graph, name, mustGenerateKey, undirected, edge, source, target, attributes, asUpdater) {
    if (!undirected && graph.type === "undirected")
      throw new UsageGraphError(
        `Graph.${name}: you cannot merge/update a directed edge to an undirected graph. Use the #.mergeEdge/#.updateEdge or #.addUndirectedEdge instead.`
      );
    if (undirected && graph.type === "directed")
      throw new UsageGraphError(
        `Graph.${name}: you cannot merge/update an undirected edge to a directed graph. Use the #.mergeEdge/#.updateEdge or #.addDirectedEdge instead.`
      );
    if (attributes) {
      if (asUpdater) {
        if (typeof attributes !== "function")
          throw new InvalidArgumentsGraphError(
            `Graph.${name}: invalid updater function. Expecting a function but got "${attributes}"`
          );
      } else {
        if (!isPlainObject(attributes))
          throw new InvalidArgumentsGraphError(
            `Graph.${name}: invalid attributes. Expecting an object but got "${attributes}"`
          );
      }
    }
    source = "" + source;
    target = "" + target;
    let updater;
    if (asUpdater) {
      updater = attributes;
      attributes = void 0;
    }
    if (!graph.allowSelfLoops && source === target)
      throw new UsageGraphError(
        `Graph.${name}: source & target are the same ("${source}"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false.`
      );
    let sourceData = graph._nodes.get(source);
    let targetData = graph._nodes.get(target);
    let edgeData;
    let alreadyExistingEdgeData;
    if (!mustGenerateKey) {
      edgeData = graph._edges.get(edge);
      if (edgeData) {
        if (edgeData.source.key !== source || edgeData.target.key !== target) {
          if (!undirected || edgeData.source.key !== target || edgeData.target.key !== source) {
            throw new UsageGraphError(
              `Graph.${name}: inconsistency detected when attempting to merge the "${edge}" edge with "${source}" source & "${target}" target vs. ("${edgeData.source.key}", "${edgeData.target.key}").`
            );
          }
        }
        alreadyExistingEdgeData = edgeData;
      }
    }
    if (!alreadyExistingEdgeData && !graph.multi && sourceData) {
      alreadyExistingEdgeData = undirected ? sourceData.undirected[target] : sourceData.out[target];
    }
    if (alreadyExistingEdgeData) {
      const info = [alreadyExistingEdgeData.key, false, false, false];
      if (asUpdater ? !updater : !attributes) return info;
      if (asUpdater) {
        const oldAttributes = alreadyExistingEdgeData.attributes;
        alreadyExistingEdgeData.attributes = updater(oldAttributes);
        graph.emit("edgeAttributesUpdated", {
          type: "replace",
          key: alreadyExistingEdgeData.key,
          attributes: alreadyExistingEdgeData.attributes
        });
      } else {
        assign(alreadyExistingEdgeData.attributes, attributes);
        graph.emit("edgeAttributesUpdated", {
          type: "merge",
          key: alreadyExistingEdgeData.key,
          attributes: alreadyExistingEdgeData.attributes,
          data: attributes
        });
      }
      return info;
    }
    attributes = attributes || {};
    if (asUpdater && updater) attributes = updater(attributes);
    const eventData = {
      key: null,
      undirected,
      source,
      target,
      attributes
    };
    if (mustGenerateKey) {
      edge = graph._edgeKeyGenerator();
    } else {
      edge = "" + edge;
      if (graph._edges.has(edge))
        throw new UsageGraphError(
          `Graph.${name}: the "${edge}" edge already exists in the graph.`
        );
    }
    let sourceWasAdded = false;
    let targetWasAdded = false;
    if (!sourceData) {
      sourceData = unsafeAddNode(graph, source, {});
      sourceWasAdded = true;
      if (source === target) {
        targetData = sourceData;
        targetWasAdded = true;
      }
    }
    if (!targetData) {
      targetData = unsafeAddNode(graph, target, {});
      targetWasAdded = true;
    }
    edgeData = new EdgeData(undirected, edge, sourceData, targetData, attributes);
    graph._edges.set(edge, edgeData);
    const isSelfLoop = source === target;
    if (undirected) {
      sourceData.undirectedDegree++;
      targetData.undirectedDegree++;
      if (isSelfLoop) {
        sourceData.undirectedLoops++;
        graph._undirectedSelfLoopCount++;
      }
    } else {
      sourceData.outDegree++;
      targetData.inDegree++;
      if (isSelfLoop) {
        sourceData.directedLoops++;
        graph._directedSelfLoopCount++;
      }
    }
    if (graph.multi) edgeData.attachMulti();
    else edgeData.attach();
    if (undirected) graph._undirectedSize++;
    else graph._directedSize++;
    eventData.key = edge;
    graph.emit("edgeAdded", eventData);
    return [edge, true, sourceWasAdded, targetWasAdded];
  }
  function dropEdgeFromData(graph, edgeData) {
    graph._edges.delete(edgeData.key);
    const { source: sourceData, target: targetData, attributes } = edgeData;
    const undirected = edgeData.undirected;
    const isSelfLoop = sourceData === targetData;
    if (undirected) {
      sourceData.undirectedDegree--;
      targetData.undirectedDegree--;
      if (isSelfLoop) {
        sourceData.undirectedLoops--;
        graph._undirectedSelfLoopCount--;
      }
    } else {
      sourceData.outDegree--;
      targetData.inDegree--;
      if (isSelfLoop) {
        sourceData.directedLoops--;
        graph._directedSelfLoopCount--;
      }
    }
    if (graph.multi) edgeData.detachMulti();
    else edgeData.detach();
    if (undirected) graph._undirectedSize--;
    else graph._directedSize--;
    graph.emit("edgeDropped", {
      key: edgeData.key,
      attributes,
      source: sourceData.key,
      target: targetData.key,
      undirected
    });
  }
  var Graph = class _Graph extends import_events.EventEmitter {
    constructor(options) {
      super();
      options = assign({}, DEFAULTS, options);
      if (typeof options.multi !== "boolean")
        throw new InvalidArgumentsGraphError(
          `Graph.constructor: invalid 'multi' option. Expecting a boolean but got "${options.multi}".`
        );
      if (!TYPES.has(options.type))
        throw new InvalidArgumentsGraphError(
          `Graph.constructor: invalid 'type' option. Should be one of "mixed", "directed" or "undirected" but got "${options.type}".`
        );
      if (typeof options.allowSelfLoops !== "boolean")
        throw new InvalidArgumentsGraphError(
          `Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got "${options.allowSelfLoops}".`
        );
      const NodeDataClass = options.type === "mixed" ? MixedNodeData : options.type === "directed" ? DirectedNodeData : UndirectedNodeData;
      privateProperty(this, "NodeDataClass", NodeDataClass);
      const instancePrefix = "geid_" + INSTANCE_ID() + "_";
      let edgeId = 0;
      const edgeKeyGenerator = () => {
        let availableEdgeKey;
        do {
          availableEdgeKey = instancePrefix + edgeId++;
        } while (this._edges.has(availableEdgeKey));
        return availableEdgeKey;
      };
      privateProperty(this, "_attributes", {});
      privateProperty(this, "_nodes", /* @__PURE__ */ new Map());
      privateProperty(this, "_edges", /* @__PURE__ */ new Map());
      privateProperty(this, "_directedSize", 0);
      privateProperty(this, "_undirectedSize", 0);
      privateProperty(this, "_directedSelfLoopCount", 0);
      privateProperty(this, "_undirectedSelfLoopCount", 0);
      privateProperty(this, "_edgeKeyGenerator", edgeKeyGenerator);
      privateProperty(this, "_options", options);
      EMITTER_PROPS.forEach((prop) => privateProperty(this, prop, this[prop]));
      readOnlyProperty(this, "order", () => this._nodes.size);
      readOnlyProperty(this, "size", () => this._edges.size);
      readOnlyProperty(this, "directedSize", () => this._directedSize);
      readOnlyProperty(this, "undirectedSize", () => this._undirectedSize);
      readOnlyProperty(
        this,
        "selfLoopCount",
        () => this._directedSelfLoopCount + this._undirectedSelfLoopCount
      );
      readOnlyProperty(
        this,
        "directedSelfLoopCount",
        () => this._directedSelfLoopCount
      );
      readOnlyProperty(
        this,
        "undirectedSelfLoopCount",
        () => this._undirectedSelfLoopCount
      );
      readOnlyProperty(this, "multi", this._options.multi);
      readOnlyProperty(this, "type", this._options.type);
      readOnlyProperty(this, "allowSelfLoops", this._options.allowSelfLoops);
      readOnlyProperty(this, "implementation", () => "graphology");
    }
    _resetInstanceCounters() {
      this._directedSize = 0;
      this._undirectedSize = 0;
      this._directedSelfLoopCount = 0;
      this._undirectedSelfLoopCount = 0;
    }
    /**---------------------------------------------------------------------------
     * Read
     **---------------------------------------------------------------------------
     */
    /**
     * Method returning whether the given node is found in the graph.
     *
     * @param  {any}     node - The node.
     * @return {boolean}
     */
    hasNode(node) {
      return this._nodes.has("" + node);
    }
    /**
     * Method returning whether the given directed edge is found in the graph.
     *
     * Arity 1:
     * @param  {any}     edge - The edge's key.
     *
     * Arity 2:
     * @param  {any}     source - The edge's source.
     * @param  {any}     target - The edge's target.
     *
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the arguments are invalid.
     */
    hasDirectedEdge(source, target) {
      if (this.type === "undirected") return false;
      if (arguments.length === 1) {
        const edge = "" + source;
        const edgeData = this._edges.get(edge);
        return !!edgeData && !edgeData.undirected;
      } else if (arguments.length === 2) {
        source = "" + source;
        target = "" + target;
        const nodeData = this._nodes.get(source);
        if (!nodeData) return false;
        return nodeData.out.hasOwnProperty(target);
      }
      throw new InvalidArgumentsGraphError(
        `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
      );
    }
    /**
     * Method returning whether the given undirected edge is found in the graph.
     *
     * Arity 1:
     * @param  {any}     edge - The edge's key.
     *
     * Arity 2:
     * @param  {any}     source - The edge's source.
     * @param  {any}     target - The edge's target.
     *
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the arguments are invalid.
     */
    hasUndirectedEdge(source, target) {
      if (this.type === "directed") return false;
      if (arguments.length === 1) {
        const edge = "" + source;
        const edgeData = this._edges.get(edge);
        return !!edgeData && edgeData.undirected;
      } else if (arguments.length === 2) {
        source = "" + source;
        target = "" + target;
        const nodeData = this._nodes.get(source);
        if (!nodeData) return false;
        return nodeData.undirected.hasOwnProperty(target);
      }
      throw new InvalidArgumentsGraphError(
        `Graph.hasDirectedEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
      );
    }
    /**
     * Method returning whether the given edge is found in the graph.
     *
     * Arity 1:
     * @param  {any}     edge - The edge's key.
     *
     * Arity 2:
     * @param  {any}     source - The edge's source.
     * @param  {any}     target - The edge's target.
     *
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the arguments are invalid.
     */
    hasEdge(source, target) {
      if (arguments.length === 1) {
        const edge = "" + source;
        return this._edges.has(edge);
      } else if (arguments.length === 2) {
        source = "" + source;
        target = "" + target;
        const nodeData = this._nodes.get(source);
        if (!nodeData) return false;
        return typeof nodeData.out !== "undefined" && nodeData.out.hasOwnProperty(target) || typeof nodeData.undirected !== "undefined" && nodeData.undirected.hasOwnProperty(target);
      }
      throw new InvalidArgumentsGraphError(
        `Graph.hasEdge: invalid arity (${arguments.length}, instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target.`
      );
    }
    /**
     * Method returning the edge matching source & target in a directed fashion.
     *
     * @param  {any} source - The edge's source.
     * @param  {any} target - The edge's target.
     *
     * @return {any|undefined}
     *
     * @throws {Error} - Will throw if the graph is multi.
     * @throws {Error} - Will throw if source or target doesn't exist.
     */
    directedEdge(source, target) {
      if (this.type === "undirected") return;
      source = "" + source;
      target = "" + target;
      if (this.multi)
        throw new UsageGraphError(
          "Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead."
        );
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.directedEdge: could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.directedEdge: could not find the "${target}" target node in the graph.`
        );
      const edgeData = sourceData.out && sourceData.out[target] || void 0;
      if (edgeData) return edgeData.key;
    }
    /**
     * Method returning the edge matching source & target in a undirected fashion.
     *
     * @param  {any} source - The edge's source.
     * @param  {any} target - The edge's target.
     *
     * @return {any|undefined}
     *
     * @throws {Error} - Will throw if the graph is multi.
     * @throws {Error} - Will throw if source or target doesn't exist.
     */
    undirectedEdge(source, target) {
      if (this.type === "directed") return;
      source = "" + source;
      target = "" + target;
      if (this.multi)
        throw new UsageGraphError(
          "Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead."
        );
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.undirectedEdge: could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.undirectedEdge: could not find the "${target}" target node in the graph.`
        );
      const edgeData = sourceData.undirected && sourceData.undirected[target] || void 0;
      if (edgeData) return edgeData.key;
    }
    /**
     * Method returning the edge matching source & target in a mixed fashion.
     *
     * @param  {any} source - The edge's source.
     * @param  {any} target - The edge's target.
     *
     * @return {any|undefined}
     *
     * @throws {Error} - Will throw if the graph is multi.
     * @throws {Error} - Will throw if source or target doesn't exist.
     */
    edge(source, target) {
      if (this.multi)
        throw new UsageGraphError(
          "Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead."
        );
      source = "" + source;
      target = "" + target;
      const sourceData = this._nodes.get(source);
      if (!sourceData)
        throw new NotFoundGraphError(
          `Graph.edge: could not find the "${source}" source node in the graph.`
        );
      if (!this._nodes.has(target))
        throw new NotFoundGraphError(
          `Graph.edge: could not find the "${target}" target node in the graph.`
        );
      const edgeData = sourceData.out && sourceData.out[target] || sourceData.undirected && sourceData.undirected[target] || void 0;
      if (edgeData) return edgeData.key;
    }
    /**
     * Method returning whether two nodes are directed neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areDirectedNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areDirectedNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return false;
      return neighbor in nodeData.in || neighbor in nodeData.out;
    }
    /**
     * Method returning whether two nodes are out neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areOutNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areOutNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return false;
      return neighbor in nodeData.out;
    }
    /**
     * Method returning whether two nodes are in neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areInNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areInNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return false;
      return neighbor in nodeData.in;
    }
    /**
     * Method returning whether two nodes are undirected neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areUndirectedNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areUndirectedNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type === "directed") return false;
      return neighbor in nodeData.undirected;
    }
    /**
     * Method returning whether two nodes are neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type !== "undirected") {
        if (neighbor in nodeData.in || neighbor in nodeData.out) return true;
      }
      if (this.type !== "directed") {
        if (neighbor in nodeData.undirected) return true;
      }
      return false;
    }
    /**
     * Method returning whether two nodes are inbound neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areInboundNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areInboundNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type !== "undirected") {
        if (neighbor in nodeData.in) return true;
      }
      if (this.type !== "directed") {
        if (neighbor in nodeData.undirected) return true;
      }
      return false;
    }
    /**
     * Method returning whether two nodes are outbound neighbors.
     *
     * @param  {any}     node     - The node's key.
     * @param  {any}     neighbor - The neighbor's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    areOutboundNeighbors(node, neighbor) {
      node = "" + node;
      neighbor = "" + neighbor;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.areOutboundNeighbors: could not find the "${node}" node in the graph.`
        );
      if (this.type !== "undirected") {
        if (neighbor in nodeData.out) return true;
      }
      if (this.type !== "directed") {
        if (neighbor in nodeData.undirected) return true;
      }
      return false;
    }
    /**
     * Method returning the given node's in degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    inDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.inDegree: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.inDegree;
    }
    /**
     * Method returning the given node's out degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    outDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.outDegree: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.outDegree;
    }
    /**
     * Method returning the given node's directed degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    directedDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.directedDegree: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.inDegree + nodeData.outDegree;
    }
    /**
     * Method returning the given node's undirected degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    undirectedDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.undirectedDegree: could not find the "${node}" node in the graph.`
        );
      if (this.type === "directed") return 0;
      return nodeData.undirectedDegree;
    }
    /**
     * Method returning the given node's inbound degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's inbound degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    inboundDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.inboundDegree: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
      }
      if (this.type !== "undirected") {
        degree += nodeData.inDegree;
      }
      return degree;
    }
    /**
     * Method returning the given node's outbound degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's outbound degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    outboundDegree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.outboundDegree: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
      }
      if (this.type !== "undirected") {
        degree += nodeData.outDegree;
      }
      return degree;
    }
    /**
     * Method returning the given node's directed degree.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    degree(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.degree: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
      }
      if (this.type !== "undirected") {
        degree += nodeData.inDegree + nodeData.outDegree;
      }
      return degree;
    }
    /**
     * Method returning the given node's in degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    inDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.inDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.inDegree - nodeData.directedLoops;
    }
    /**
     * Method returning the given node's out degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    outDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.outDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.outDegree - nodeData.directedLoops;
    }
    /**
     * Method returning the given node's directed degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    directedDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.directedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      if (this.type === "undirected") return 0;
      return nodeData.inDegree + nodeData.outDegree - nodeData.directedLoops * 2;
    }
    /**
     * Method returning the given node's undirected degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's in degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    undirectedDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.undirectedDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      if (this.type === "directed") return 0;
      return nodeData.undirectedDegree - nodeData.undirectedLoops * 2;
    }
    /**
     * Method returning the given node's inbound degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's inbound degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    inboundDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.inboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      let loops = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
        loops += nodeData.undirectedLoops * 2;
      }
      if (this.type !== "undirected") {
        degree += nodeData.inDegree;
        loops += nodeData.directedLoops;
      }
      return degree - loops;
    }
    /**
     * Method returning the given node's outbound degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's outbound degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    outboundDegreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.outboundDegreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      let loops = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
        loops += nodeData.undirectedLoops * 2;
      }
      if (this.type !== "undirected") {
        degree += nodeData.outDegree;
        loops += nodeData.directedLoops;
      }
      return degree - loops;
    }
    /**
     * Method returning the given node's directed degree without considering self loops.
     *
     * @param  {any}     node - The node's key.
     * @return {number}       - The node's degree.
     *
     * @throws {Error} - Will throw if the node isn't in the graph.
     */
    degreeWithoutSelfLoops(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.degreeWithoutSelfLoops: could not find the "${node}" node in the graph.`
        );
      let degree = 0;
      let loops = 0;
      if (this.type !== "directed") {
        degree += nodeData.undirectedDegree;
        loops += nodeData.undirectedLoops * 2;
      }
      if (this.type !== "undirected") {
        degree += nodeData.inDegree + nodeData.outDegree;
        loops += nodeData.directedLoops * 2;
      }
      return degree - loops;
    }
    /**
     * Method returning the given edge's source.
     *
     * @param  {any} edge - The edge's key.
     * @return {any}      - The edge's source.
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    source(edge) {
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.source: could not find the "${edge}" edge in the graph.`
        );
      return data.source.key;
    }
    /**
     * Method returning the given edge's target.
     *
     * @param  {any} edge - The edge's key.
     * @return {any}      - The edge's target.
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    target(edge) {
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.target: could not find the "${edge}" edge in the graph.`
        );
      return data.target.key;
    }
    /**
     * Method returning the given edge's extremities.
     *
     * @param  {any}   edge - The edge's key.
     * @return {array}      - The edge's extremities.
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    extremities(edge) {
      edge = "" + edge;
      const edgeData = this._edges.get(edge);
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.extremities: could not find the "${edge}" edge in the graph.`
        );
      return [edgeData.source.key, edgeData.target.key];
    }
    /**
     * Given a node & an edge, returns the other extremity of the edge.
     *
     * @param  {any}   node - The node's key.
     * @param  {any}   edge - The edge's key.
     * @return {any}        - The related node.
     *
     * @throws {Error} - Will throw if the edge isn't in the graph or if the
     *                   edge & node are not related.
     */
    opposite(node, edge) {
      node = "" + node;
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.opposite: could not find the "${edge}" edge in the graph.`
        );
      const source = data.source.key;
      const target = data.target.key;
      if (node === source) return target;
      if (node === target) return source;
      throw new NotFoundGraphError(
        `Graph.opposite: the "${node}" node is not attached to the "${edge}" edge (${source}, ${target}).`
      );
    }
    /**
     * Returns whether the given edge has the given node as extremity.
     *
     * @param  {any}     edge - The edge's key.
     * @param  {any}     node - The node's key.
     * @return {boolean}      - The related node.
     *
     * @throws {Error} - Will throw if either the node or the edge isn't in the graph.
     */
    hasExtremity(edge, node) {
      edge = "" + edge;
      node = "" + node;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.hasExtremity: could not find the "${edge}" edge in the graph.`
        );
      return data.source.key === node || data.target.key === node;
    }
    /**
     * Method returning whether the given edge is undirected.
     *
     * @param  {any}     edge - The edge's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    isUndirected(edge) {
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.isUndirected: could not find the "${edge}" edge in the graph.`
        );
      return data.undirected;
    }
    /**
     * Method returning whether the given edge is directed.
     *
     * @param  {any}     edge - The edge's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    isDirected(edge) {
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.isDirected: could not find the "${edge}" edge in the graph.`
        );
      return !data.undirected;
    }
    /**
     * Method returning whether the given edge is a self loop.
     *
     * @param  {any}     edge - The edge's key.
     * @return {boolean}
     *
     * @throws {Error} - Will throw if the edge isn't in the graph.
     */
    isSelfLoop(edge) {
      edge = "" + edge;
      const data = this._edges.get(edge);
      if (!data)
        throw new NotFoundGraphError(
          `Graph.isSelfLoop: could not find the "${edge}" edge in the graph.`
        );
      return data.source === data.target;
    }
    /**---------------------------------------------------------------------------
     * Mutation
     **---------------------------------------------------------------------------
     */
    /**
     * Method used to add a node to the graph.
     *
     * @param  {any}    node         - The node.
     * @param  {object} [attributes] - Optional attributes.
     * @return {any}                 - The node.
     *
     * @throws {Error} - Will throw if the given node already exist.
     * @throws {Error} - Will throw if the given attributes are not an object.
     */
    addNode(node, attributes) {
      const nodeData = addNode(this, node, attributes);
      return nodeData.key;
    }
    /**
     * Method used to merge a node into the graph.
     *
     * @param  {any}    node         - The node.
     * @param  {object} [attributes] - Optional attributes.
     * @return {any}                 - The node.
     */
    mergeNode(node, attributes) {
      if (attributes && !isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          `Graph.mergeNode: invalid attributes. Expecting an object but got "${attributes}"`
        );
      node = "" + node;
      attributes = attributes || {};
      let data = this._nodes.get(node);
      if (data) {
        if (attributes) {
          assign(data.attributes, attributes);
          this.emit("nodeAttributesUpdated", {
            type: "merge",
            key: node,
            attributes: data.attributes,
            data: attributes
          });
        }
        return [node, false];
      }
      data = new this.NodeDataClass(node, attributes);
      this._nodes.set(node, data);
      this.emit("nodeAdded", {
        key: node,
        attributes
      });
      return [node, true];
    }
    /**
     * Method used to add a node if it does not exist in the graph or else to
     * update its attributes using a function.
     *
     * @param  {any}      node      - The node.
     * @param  {function} [updater] - Optional updater function.
     * @return {any}                - The node.
     */
    updateNode(node, updater) {
      if (updater && typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          `Graph.updateNode: invalid updater function. Expecting a function but got "${updater}"`
        );
      node = "" + node;
      let data = this._nodes.get(node);
      if (data) {
        if (updater) {
          const oldAttributes = data.attributes;
          data.attributes = updater(oldAttributes);
          this.emit("nodeAttributesUpdated", {
            type: "replace",
            key: node,
            attributes: data.attributes
          });
        }
        return [node, false];
      }
      const attributes = updater ? updater({}) : {};
      data = new this.NodeDataClass(node, attributes);
      this._nodes.set(node, data);
      this.emit("nodeAdded", {
        key: node,
        attributes
      });
      return [node, true];
    }
    /**
     * Method used to drop a single node & all its attached edges from the graph.
     *
     * @param  {any}    node - The node.
     * @return {Graph}
     *
     * @throws {Error} - Will throw if the node doesn't exist.
     */
    dropNode(node) {
      node = "" + node;
      const nodeData = this._nodes.get(node);
      if (!nodeData)
        throw new NotFoundGraphError(
          `Graph.dropNode: could not find the "${node}" node in the graph.`
        );
      let edgeData;
      if (this.type !== "undirected") {
        for (const neighbor in nodeData.out) {
          edgeData = nodeData.out[neighbor];
          do {
            dropEdgeFromData(this, edgeData);
            edgeData = edgeData.next;
          } while (edgeData);
        }
        for (const neighbor in nodeData.in) {
          edgeData = nodeData.in[neighbor];
          do {
            dropEdgeFromData(this, edgeData);
            edgeData = edgeData.next;
          } while (edgeData);
        }
      }
      if (this.type !== "directed") {
        for (const neighbor in nodeData.undirected) {
          edgeData = nodeData.undirected[neighbor];
          do {
            dropEdgeFromData(this, edgeData);
            edgeData = edgeData.next;
          } while (edgeData);
        }
      }
      this._nodes.delete(node);
      this.emit("nodeDropped", {
        key: node,
        attributes: nodeData.attributes
      });
    }
    /**
     * Method used to drop a single edge from the graph.
     *
     * Arity 1:
     * @param  {any}    edge - The edge.
     *
     * Arity 2:
     * @param  {any}    source - Source node.
     * @param  {any}    target - Target node.
     *
     * @return {Graph}
     *
     * @throws {Error} - Will throw if the edge doesn't exist.
     */
    dropEdge(edge) {
      let edgeData;
      if (arguments.length > 1) {
        const source = "" + arguments[0];
        const target = "" + arguments[1];
        edgeData = getMatchingEdge(this, source, target, this.type);
        if (!edgeData)
          throw new NotFoundGraphError(
            `Graph.dropEdge: could not find the "${source}" -> "${target}" edge in the graph.`
          );
      } else {
        edge = "" + edge;
        edgeData = this._edges.get(edge);
        if (!edgeData)
          throw new NotFoundGraphError(
            `Graph.dropEdge: could not find the "${edge}" edge in the graph.`
          );
      }
      dropEdgeFromData(this, edgeData);
      return this;
    }
    /**
     * Method used to drop a single directed edge from the graph.
     *
     * @param  {any}    source - Source node.
     * @param  {any}    target - Target node.
     *
     * @return {Graph}
     *
     * @throws {Error} - Will throw if the edge doesn't exist.
     */
    dropDirectedEdge(source, target) {
      if (arguments.length < 2)
        throw new UsageGraphError(
          "Graph.dropDirectedEdge: it does not make sense to try and drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
        );
      if (this.multi)
        throw new UsageGraphError(
          "Graph.dropDirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
        );
      source = "" + source;
      target = "" + target;
      const edgeData = getMatchingEdge(this, source, target, "directed");
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropDirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
        );
      dropEdgeFromData(this, edgeData);
      return this;
    }
    /**
     * Method used to drop a single undirected edge from the graph.
     *
     * @param  {any}    source - Source node.
     * @param  {any}    target - Target node.
     *
     * @return {Graph}
     *
     * @throws {Error} - Will throw if the edge doesn't exist.
     */
    dropUndirectedEdge(source, target) {
      if (arguments.length < 2)
        throw new UsageGraphError(
          "Graph.dropUndirectedEdge: it does not make sense to drop a directed edge by key. What if the edge with this key is undirected? Use #.dropEdge for this purpose instead."
        );
      if (this.multi)
        throw new UsageGraphError(
          "Graph.dropUndirectedEdge: cannot use a {source,target} combo when dropping an edge in a MultiGraph since we cannot infer the one you want to delete as there could be multiple ones."
        );
      const edgeData = getMatchingEdge(this, source, target, "undirected");
      if (!edgeData)
        throw new NotFoundGraphError(
          `Graph.dropUndirectedEdge: could not find a "${source}" -> "${target}" edge in the graph.`
        );
      dropEdgeFromData(this, edgeData);
      return this;
    }
    /**
     * Method used to remove every edge & every node from the graph.
     *
     * @return {Graph}
     */
    clear() {
      this._edges.clear();
      this._nodes.clear();
      this._resetInstanceCounters();
      this.emit("cleared");
    }
    /**
     * Method used to remove every edge from the graph.
     *
     * @return {Graph}
     */
    clearEdges() {
      const iterator = this._nodes.values();
      let step;
      while (step = iterator.next(), step.done !== true) {
        step.value.clear();
      }
      this._edges.clear();
      this._resetInstanceCounters();
      this.emit("edgesCleared");
    }
    /**---------------------------------------------------------------------------
     * Attributes-related methods
     **---------------------------------------------------------------------------
     */
    /**
     * Method returning the desired graph's attribute.
     *
     * @param  {string} name - Name of the attribute.
     * @return {any}
     */
    getAttribute(name) {
      return this._attributes[name];
    }
    /**
     * Method returning the graph's attributes.
     *
     * @return {object}
     */
    getAttributes() {
      return this._attributes;
    }
    /**
     * Method returning whether the graph has the desired attribute.
     *
     * @param  {string}  name - Name of the attribute.
     * @return {boolean}
     */
    hasAttribute(name) {
      return this._attributes.hasOwnProperty(name);
    }
    /**
     * Method setting a value for the desired graph's attribute.
     *
     * @param  {string}  name  - Name of the attribute.
     * @param  {any}     value - Value for the attribute.
     * @return {Graph}
     */
    setAttribute(name, value) {
      this._attributes[name] = value;
      this.emit("attributesUpdated", {
        type: "set",
        attributes: this._attributes,
        name
      });
      return this;
    }
    /**
     * Method using a function to update the desired graph's attribute's value.
     *
     * @param  {string}   name    - Name of the attribute.
     * @param  {function} updater - Function use to update the attribute's value.
     * @return {Graph}
     */
    updateAttribute(name, updater) {
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.updateAttribute: updater should be a function."
        );
      const value = this._attributes[name];
      this._attributes[name] = updater(value);
      this.emit("attributesUpdated", {
        type: "set",
        attributes: this._attributes,
        name
      });
      return this;
    }
    /**
     * Method removing the desired graph's attribute.
     *
     * @param  {string} name  - Name of the attribute.
     * @return {Graph}
     */
    removeAttribute(name) {
      delete this._attributes[name];
      this.emit("attributesUpdated", {
        type: "remove",
        attributes: this._attributes,
        name
      });
      return this;
    }
    /**
     * Method replacing the graph's attributes.
     *
     * @param  {object} attributes - New attributes.
     * @return {Graph}
     *
     * @throws {Error} - Will throw if given attributes are not a plain object.
     */
    replaceAttributes(attributes) {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          "Graph.replaceAttributes: provided attributes are not a plain object."
        );
      this._attributes = attributes;
      this.emit("attributesUpdated", {
        type: "replace",
        attributes: this._attributes
      });
      return this;
    }
    /**
     * Method merging the graph's attributes.
     *
     * @param  {object} attributes - Attributes to merge.
     * @return {Graph}
     *
     * @throws {Error} - Will throw if given attributes are not a plain object.
     */
    mergeAttributes(attributes) {
      if (!isPlainObject(attributes))
        throw new InvalidArgumentsGraphError(
          "Graph.mergeAttributes: provided attributes are not a plain object."
        );
      assign(this._attributes, attributes);
      this.emit("attributesUpdated", {
        type: "merge",
        attributes: this._attributes,
        data: attributes
      });
      return this;
    }
    /**
     * Method updating the graph's attributes.
     *
     * @param  {function} updater - Function used to update the attributes.
     * @return {Graph}
     *
     * @throws {Error} - Will throw if given updater is not a function.
     */
    updateAttributes(updater) {
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.updateAttributes: provided updater is not a function."
        );
      this._attributes = updater(this._attributes);
      this.emit("attributesUpdated", {
        type: "update",
        attributes: this._attributes
      });
      return this;
    }
    /**
     * Method used to update each node's attributes using the given function.
     *
     * @param {function}  updater - Updater function to use.
     * @param {object}    [hints] - Optional hints.
     */
    updateEachNodeAttributes(updater, hints) {
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.updateEachNodeAttributes: expecting an updater function."
        );
      if (hints && !validateHints(hints))
        throw new InvalidArgumentsGraphError(
          "Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        nodeData.attributes = updater(nodeData.key, nodeData.attributes);
      }
      this.emit("eachNodeAttributesUpdated", {
        hints: hints ? hints : null
      });
    }
    /**
     * Method used to update each edge's attributes using the given function.
     *
     * @param {function}  updater - Updater function to use.
     * @param {object}    [hints] - Optional hints.
     */
    updateEachEdgeAttributes(updater, hints) {
      if (typeof updater !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.updateEachEdgeAttributes: expecting an updater function."
        );
      if (hints && !validateHints(hints))
        throw new InvalidArgumentsGraphError(
          "Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}"
        );
      const iterator = this._edges.values();
      let step, edgeData, sourceData, targetData;
      while (step = iterator.next(), step.done !== true) {
        edgeData = step.value;
        sourceData = edgeData.source;
        targetData = edgeData.target;
        edgeData.attributes = updater(
          edgeData.key,
          edgeData.attributes,
          sourceData.key,
          targetData.key,
          sourceData.attributes,
          targetData.attributes,
          edgeData.undirected
        );
      }
      this.emit("eachEdgeAttributesUpdated", {
        hints: hints ? hints : null
      });
    }
    /**---------------------------------------------------------------------------
     * Iteration-related methods
     **---------------------------------------------------------------------------
     */
    /**
     * Method iterating over the graph's adjacency using the given callback.
     *
     * @param  {function}  callback - Callback to use.
     */
    forEachAdjacencyEntry(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.forEachAdjacencyEntry: expecting a callback."
        );
      forEachAdjacency(false, false, false, this, callback);
    }
    forEachAdjacencyEntryWithOrphans(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.forEachAdjacencyEntryWithOrphans: expecting a callback."
        );
      forEachAdjacency(false, false, true, this, callback);
    }
    /**
     * Method iterating over the graph's assymetric adjacency using the given callback.
     *
     * @param  {function}  callback - Callback to use.
     */
    forEachAssymetricAdjacencyEntry(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.forEachAssymetricAdjacencyEntry: expecting a callback."
        );
      forEachAdjacency(false, true, false, this, callback);
    }
    forEachAssymetricAdjacencyEntryWithOrphans(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.forEachAssymetricAdjacencyEntryWithOrphans: expecting a callback."
        );
      forEachAdjacency(false, true, true, this, callback);
    }
    /**
     * Method returning the list of the graph's nodes.
     *
     * @return {array} - The nodes.
     */
    nodes() {
      return Array.from(this._nodes.keys());
    }
    /**
     * Method iterating over the graph's nodes using the given callback.
     *
     * @param  {function}  callback - Callback (key, attributes, index).
     */
    forEachNode(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.forEachNode: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        callback(nodeData.key, nodeData.attributes);
      }
    }
    /**
     * Method iterating attempting to find a node matching the given predicate
     * function.
     *
     * @param  {function}  callback - Callback (key, attributes).
     */
    findNode(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.findNode: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        if (callback(nodeData.key, nodeData.attributes)) return nodeData.key;
      }
      return;
    }
    /**
     * Method mapping nodes.
     *
     * @param  {function}  callback - Callback (key, attributes).
     */
    mapNodes(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.mapNode: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      const result = new Array(this.order);
      let i = 0;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        result[i++] = callback(nodeData.key, nodeData.attributes);
      }
      return result;
    }
    /**
     * Method returning whether some node verify the given predicate.
     *
     * @param  {function}  callback - Callback (key, attributes).
     */
    someNode(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.someNode: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        if (callback(nodeData.key, nodeData.attributes)) return true;
      }
      return false;
    }
    /**
     * Method returning whether all node verify the given predicate.
     *
     * @param  {function}  callback - Callback (key, attributes).
     */
    everyNode(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.everyNode: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        if (!callback(nodeData.key, nodeData.attributes)) return false;
      }
      return true;
    }
    /**
     * Method filtering nodes.
     *
     * @param  {function}  callback - Callback (key, attributes).
     */
    filterNodes(callback) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.filterNodes: expecting a callback."
        );
      const iterator = this._nodes.values();
      let step, nodeData;
      const result = [];
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        if (callback(nodeData.key, nodeData.attributes))
          result.push(nodeData.key);
      }
      return result;
    }
    /**
     * Method reducing nodes.
     *
     * @param  {function}  callback - Callback (accumulator, key, attributes).
     */
    reduceNodes(callback, initialValue) {
      if (typeof callback !== "function")
        throw new InvalidArgumentsGraphError(
          "Graph.reduceNodes: expecting a callback."
        );
      if (arguments.length < 2)
        throw new InvalidArgumentsGraphError(
          "Graph.reduceNodes: missing initial value. You must provide it because the callback takes more than one argument and we cannot infer the initial value from the first iteration, as you could with a simple array."
        );
      let accumulator = initialValue;
      const iterator = this._nodes.values();
      let step, nodeData;
      while (step = iterator.next(), step.done !== true) {
        nodeData = step.value;
        accumulator = callback(accumulator, nodeData.key, nodeData.attributes);
      }
      return accumulator;
    }
    /**
     * Method returning an iterator over the graph's node entries.
     *
     * @return {Iterator}
     */
    nodeEntries() {
      const iterator = this._nodes.values();
      return {
        [Symbol.iterator]() {
          return this;
        },
        next() {
          const step = iterator.next();
          if (step.done) return step;
          const data = step.value;
          return {
            value: { node: data.key, attributes: data.attributes },
            done: false
          };
        }
      };
    }
    /**---------------------------------------------------------------------------
     * Serialization
     **---------------------------------------------------------------------------
     */
    /**
     * Method used to export the whole graph.
     *
     * @return {object} - The serialized graph.
     */
    export() {
      const nodes = new Array(this._nodes.size);
      let i = 0;
      this._nodes.forEach((data, key) => {
        nodes[i++] = serializeNode(key, data);
      });
      const edges = new Array(this._edges.size);
      i = 0;
      this._edges.forEach((data, key) => {
        edges[i++] = serializeEdge(this.type, key, data);
      });
      return {
        options: {
          type: this.type,
          multi: this.multi,
          allowSelfLoops: this.allowSelfLoops
        },
        attributes: this.getAttributes(),
        nodes,
        edges
      };
    }
    /**
     * Method used to import a serialized graph.
     *
     * @param  {object|Graph} data  - The serialized graph.
     * @param  {boolean}      merge - Whether to merge data.
     * @return {Graph}              - Returns itself for chaining.
     */
    import(data, merge = false) {
      if (data instanceof _Graph) {
        data.forEachNode((n, a) => {
          if (merge) this.mergeNode(n, a);
          else this.addNode(n, a);
        });
        data.forEachEdge((e, a, s, t, _sa, _ta, u) => {
          if (merge) {
            if (u) this.mergeUndirectedEdgeWithKey(e, s, t, a);
            else this.mergeDirectedEdgeWithKey(e, s, t, a);
          } else {
            if (u) this.addUndirectedEdgeWithKey(e, s, t, a);
            else this.addDirectedEdgeWithKey(e, s, t, a);
          }
        });
        return this;
      }
      if (!isPlainObject(data))
        throw new InvalidArgumentsGraphError(
          "Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance."
        );
      if (data.attributes) {
        if (!isPlainObject(data.attributes))
          throw new InvalidArgumentsGraphError(
            "Graph.import: invalid attributes. Expecting a plain object."
          );
        if (merge) this.mergeAttributes(data.attributes);
        else this.replaceAttributes(data.attributes);
      }
      let i, l, list, node, edge;
      if (data.nodes) {
        list = data.nodes;
        if (!Array.isArray(list))
          throw new InvalidArgumentsGraphError(
            "Graph.import: invalid nodes. Expecting an array."
          );
        for (i = 0, l = list.length; i < l; i++) {
          node = list[i];
          validateSerializedNode(node);
          const { key, attributes } = node;
          if (merge) this.mergeNode(key, attributes);
          else this.addNode(key, attributes);
        }
      }
      if (data.edges) {
        let undirectedByDefault = false;
        if (this.type === "undirected") {
          undirectedByDefault = true;
        }
        list = data.edges;
        if (!Array.isArray(list))
          throw new InvalidArgumentsGraphError(
            "Graph.import: invalid edges. Expecting an array."
          );
        for (i = 0, l = list.length; i < l; i++) {
          edge = list[i];
          validateSerializedEdge(edge);
          const {
            source,
            target,
            attributes,
            undirected = undirectedByDefault
          } = edge;
          let method;
          if ("key" in edge) {
            method = merge ? undirected ? this.mergeUndirectedEdgeWithKey : this.mergeDirectedEdgeWithKey : undirected ? this.addUndirectedEdgeWithKey : this.addDirectedEdgeWithKey;
            method.call(this, edge.key, source, target, attributes);
          } else {
            method = merge ? undirected ? this.mergeUndirectedEdge : this.mergeDirectedEdge : undirected ? this.addUndirectedEdge : this.addDirectedEdge;
            method.call(this, source, target, attributes);
          }
        }
      }
      return this;
    }
    /**---------------------------------------------------------------------------
     * Utils
     **---------------------------------------------------------------------------
     */
    /**
     * Method returning a null copy of the graph, i.e. a graph without nodes
     * & edges but with the exact same options.
     *
     * @param  {object} options - Options to merge with the current ones.
     * @return {Graph}          - The null copy.
     */
    nullCopy(options) {
      const graph = new _Graph(assign({}, this._options, options));
      graph.replaceAttributes(assign({}, this.getAttributes()));
      return graph;
    }
    /**
     * Method returning an empty copy of the graph, i.e. a graph without edges but
     * with the exact same options.
     *
     * @param  {object} options - Options to merge with the current ones.
     * @return {Graph}          - The empty copy.
     */
    emptyCopy(options) {
      const graph = this.nullCopy(options);
      this._nodes.forEach((nodeData, key) => {
        const attributes = assign({}, nodeData.attributes);
        nodeData = new graph.NodeDataClass(key, attributes);
        graph._nodes.set(key, nodeData);
      });
      return graph;
    }
    /**
     * Method returning an exact copy of the graph.
     *
     * @param  {object} options - Upgrade options.
     * @return {Graph}          - The copy.
     */
    copy(options) {
      options = options || {};
      if (typeof options.type === "string" && options.type !== this.type && options.type !== "mixed")
        throw new UsageGraphError(
          `Graph.copy: cannot create an incompatible copy from "${this.type}" type to "${options.type}" because this would mean losing information about the current graph.`
        );
      if (typeof options.multi === "boolean" && options.multi !== this.multi && options.multi !== true)
        throw new UsageGraphError(
          "Graph.copy: cannot create an incompatible copy by downgrading a multi graph to a simple one because this would mean losing information about the current graph."
        );
      if (typeof options.allowSelfLoops === "boolean" && options.allowSelfLoops !== this.allowSelfLoops && options.allowSelfLoops !== true)
        throw new UsageGraphError(
          "Graph.copy: cannot create an incompatible copy from a graph allowing self loops to one that does not because this would mean losing information about the current graph."
        );
      const graph = this.emptyCopy(options);
      const iterator = this._edges.values();
      let step, edgeData;
      while (step = iterator.next(), step.done !== true) {
        edgeData = step.value;
        addEdge(
          graph,
          "copy",
          false,
          edgeData.undirected,
          edgeData.key,
          edgeData.source.key,
          edgeData.target.key,
          assign({}, edgeData.attributes)
        );
      }
      return graph;
    }
    /**---------------------------------------------------------------------------
     * Known methods
     **---------------------------------------------------------------------------
     */
    /**
     * Method used by JavaScript to perform JSON serialization.
     *
     * @return {object} - The serialized graph.
     */
    toJSON() {
      return this.export();
    }
    /**
     * Method returning [object Graph].
     */
    toString() {
      return "[object Graph]";
    }
    /**
     * Method used internally by node's console to display a custom object.
     *
     * @return {object} - Formatted object representation of the graph.
     */
    inspect() {
      const nodes = {};
      this._nodes.forEach((data, key) => {
        nodes[key] = data.attributes;
      });
      const edges = {}, multiIndex = {};
      this._edges.forEach((data, key) => {
        const direction = data.undirected ? "--" : "->";
        let label = "";
        let source = data.source.key;
        let target = data.target.key;
        let tmp;
        if (data.undirected && source > target) {
          tmp = source;
          source = target;
          target = tmp;
        }
        const desc = `(${source})${direction}(${target})`;
        if (!key.startsWith("geid_")) {
          label += `[${key}]: `;
        } else if (this.multi) {
          if (typeof multiIndex[desc] === "undefined") {
            multiIndex[desc] = 0;
          } else {
            multiIndex[desc]++;
          }
          label += `${multiIndex[desc]}. `;
        }
        label += desc;
        edges[label] = data.attributes;
      });
      const dummy = {};
      for (const k in this) {
        if (this.hasOwnProperty(k) && !EMITTER_PROPS.has(k) && typeof this[k] !== "function" && typeof k !== "symbol")
          dummy[k] = this[k];
      }
      dummy.attributes = this._attributes;
      dummy.nodes = nodes;
      dummy.edges = edges;
      privateProperty(dummy, "constructor", this.constructor);
      return dummy;
    }
  };
  if (typeof Symbol !== "undefined")
    Graph.prototype[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = Graph.prototype.inspect;
  EDGE_ADD_METHODS.forEach((method) => {
    ["add", "merge", "update"].forEach((verb) => {
      const name = method.name(verb);
      const fn = verb === "add" ? addEdge : mergeEdge;
      if (method.generateKey) {
        Graph.prototype[name] = function(source, target, attributes) {
          return fn(
            this,
            name,
            true,
            (method.type || this.type) === "undirected",
            null,
            source,
            target,
            attributes,
            verb === "update"
          );
        };
      } else {
        Graph.prototype[name] = function(edge, source, target, attributes) {
          return fn(
            this,
            name,
            false,
            (method.type || this.type) === "undirected",
            edge,
            source,
            target,
            attributes,
            verb === "update"
          );
        };
      }
    });
  });
  attachNodeAttributesMethods(Graph);
  attachEdgeAttributesMethods(Graph);
  attachEdgeIterationMethods(Graph);
  attachNeighborIterationMethods(Graph);
  var DirectedGraph = class extends Graph {
    constructor(options) {
      const finalOptions = assign({ type: "directed" }, options);
      if ("multi" in finalOptions && finalOptions.multi !== false)
        throw new InvalidArgumentsGraphError(
          "DirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
        );
      if (finalOptions.type !== "directed")
        throw new InvalidArgumentsGraphError(
          'DirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
        );
      super(finalOptions);
    }
  };
  var UndirectedGraph = class extends Graph {
    constructor(options) {
      const finalOptions = assign({ type: "undirected" }, options);
      if ("multi" in finalOptions && finalOptions.multi !== false)
        throw new InvalidArgumentsGraphError(
          "UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!"
        );
      if (finalOptions.type !== "undirected")
        throw new InvalidArgumentsGraphError(
          'UndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
        );
      super(finalOptions);
    }
  };
  var MultiGraph = class extends Graph {
    constructor(options) {
      const finalOptions = assign({ multi: true }, options);
      if ("multi" in finalOptions && finalOptions.multi !== true)
        throw new InvalidArgumentsGraphError(
          "MultiGraph.from: inconsistent indication that the graph should be simple in given options!"
        );
      super(finalOptions);
    }
  };
  var MultiDirectedGraph = class extends Graph {
    constructor(options) {
      const finalOptions = assign({ type: "directed", multi: true }, options);
      if ("multi" in finalOptions && finalOptions.multi !== true)
        throw new InvalidArgumentsGraphError(
          "MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
        );
      if (finalOptions.type !== "directed")
        throw new InvalidArgumentsGraphError(
          'MultiDirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
        );
      super(finalOptions);
    }
  };
  var MultiUndirectedGraph = class extends Graph {
    constructor(options) {
      const finalOptions = assign({ type: "undirected", multi: true }, options);
      if ("multi" in finalOptions && finalOptions.multi !== true)
        throw new InvalidArgumentsGraphError(
          "MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!"
        );
      if (finalOptions.type !== "undirected")
        throw new InvalidArgumentsGraphError(
          'MultiUndirectedGraph.from: inconsistent "' + finalOptions.type + '" type in given options!'
        );
      super(finalOptions);
    }
  };
  function attachStaticFromMethod(Class) {
    Class.from = function(data, options) {
      const finalOptions = assign({}, data.options, options);
      const instance = new Class(finalOptions);
      instance.import(data);
      return instance;
    };
  }
  attachStaticFromMethod(Graph);
  attachStaticFromMethod(DirectedGraph);
  attachStaticFromMethod(UndirectedGraph);
  attachStaticFromMethod(MultiGraph);
  attachStaticFromMethod(MultiDirectedGraph);
  attachStaticFromMethod(MultiUndirectedGraph);
  Graph.Graph = Graph;
  Graph.DirectedGraph = DirectedGraph;
  Graph.UndirectedGraph = UndirectedGraph;
  Graph.MultiGraph = MultiGraph;
  Graph.MultiDirectedGraph = MultiDirectedGraph;
  Graph.MultiUndirectedGraph = MultiUndirectedGraph;
  Graph.InvalidArgumentsGraphError = InvalidArgumentsGraphError;
  Graph.NotFoundGraphError = NotFoundGraphError;
  Graph.UsageGraphError = UsageGraphError;

  // node_modules/sigma/dist/colors-3de957ad.esm.js
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e, n, i, u, a = [], f = true, o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = false;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
      } catch (r2) {
        o = true, n = r2;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0, F = function() {
        };
        return {
          s: F,
          n: function() {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function(r2) {
            throw r2;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = true, u = false;
    return {
      s: function() {
        t = t.call(r);
      },
      n: function() {
        var r2 = t.next();
        return a = r2.done, r2;
      },
      e: function(r2) {
        u = true, o = r2;
      },
      f: function() {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function identity() {
    return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
  }
  function scale(m, x, y) {
    m[0] = x;
    m[4] = typeof y === "number" ? y : x;
    return m;
  }
  function rotate(m, r) {
    var s = Math.sin(r), c = Math.cos(r);
    m[0] = c;
    m[1] = s;
    m[3] = -s;
    m[4] = c;
    return m;
  }
  function translate(m, x, y) {
    m[6] = x;
    m[7] = y;
    return m;
  }
  function multiply(a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    a[0] = b00 * a00 + b01 * a10 + b02 * a20;
    a[1] = b00 * a01 + b01 * a11 + b02 * a21;
    a[2] = b00 * a02 + b01 * a12 + b02 * a22;
    a[3] = b10 * a00 + b11 * a10 + b12 * a20;
    a[4] = b10 * a01 + b11 * a11 + b12 * a21;
    a[5] = b10 * a02 + b11 * a12 + b12 * a22;
    a[6] = b20 * a00 + b21 * a10 + b22 * a20;
    a[7] = b20 * a01 + b21 * a11 + b22 * a21;
    a[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return a;
  }
  function rotateVec2(p, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return {
      x: c * p.x + s * p.y,
      y: -s * p.x + c * p.y
    };
  }
  function multiplyVec2(a, b) {
    var z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var a00 = a[0];
    var a01 = a[1];
    var a10 = a[3];
    var a11 = a[4];
    var a20 = a[6];
    var a21 = a[7];
    var b0 = b.x;
    var b1 = b.y;
    return {
      x: b0 * a00 + b1 * a10 + a20 * z,
      y: b0 * a01 + b1 * a11 + a21 * z
    };
  }
  function getCorrectionRatio(viewportDimensions, graphDimensions) {
    var viewportRatio = viewportDimensions.height / viewportDimensions.width;
    var graphRatio = graphDimensions.height / graphDimensions.width;
    if (viewportRatio < 1 && graphRatio > 1 || viewportRatio > 1 && graphRatio < 1) {
      return 1;
    }
    return Math.min(Math.max(graphRatio, 1 / graphRatio), Math.max(1 / viewportRatio, viewportRatio));
  }
  function matrixFromCamera(state, viewportDimensions, graphDimensions, padding, inverse) {
    var angle = state.angle, ratio = state.ratio, x = state.x, y = state.y;
    var width = viewportDimensions.width, height = viewportDimensions.height;
    var matrix = identity();
    var smallestDimension = Math.min(width, height) - 2 * padding;
    var correctionRatio = getCorrectionRatio(viewportDimensions, graphDimensions);
    if (!inverse) {
      multiply(matrix, scale(identity(), 2 * (smallestDimension / width) * correctionRatio, 2 * (smallestDimension / height) * correctionRatio));
      multiply(matrix, rotate(identity(), -angle));
      multiply(matrix, scale(identity(), 1 / ratio));
      multiply(matrix, translate(identity(), -x, -y));
    } else {
      multiply(matrix, translate(identity(), x, y));
      multiply(matrix, scale(identity(), ratio));
      multiply(matrix, rotate(identity(), angle));
      multiply(matrix, scale(identity(), width / smallestDimension / 2 / correctionRatio, height / smallestDimension / 2 / correctionRatio));
    }
    return matrix;
  }
  function getMatrixImpact(matrix, cameraState, viewportDimensions) {
    var _multiplyVec = multiplyVec2(matrix, {
      x: Math.cos(cameraState.angle),
      y: Math.sin(cameraState.angle)
    }, 0), x = _multiplyVec.x, y = _multiplyVec.y;
    return 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / viewportDimensions.width;
  }
  function pickingPixelCoords(gl, x, y, pixelRatio, downSizingRatio) {
    var bufferX = Math.floor(x / downSizingRatio * pixelRatio);
    var bufferY = Math.floor(gl.drawingBufferHeight / downSizingRatio - y / downSizingRatio * pixelRatio);
    return [bufferX, bufferY];
  }
  var HTML_COLORS = {
    black: "#000000",
    silver: "#C0C0C0",
    gray: "#808080",
    grey: "#808080",
    white: "#FFFFFF",
    maroon: "#800000",
    red: "#FF0000",
    purple: "#800080",
    fuchsia: "#FF00FF",
    green: "#008000",
    lime: "#00FF00",
    olive: "#808000",
    yellow: "#FFFF00",
    navy: "#000080",
    blue: "#0000FF",
    teal: "#008080",
    aqua: "#00FFFF",
    darkblue: "#00008B",
    mediumblue: "#0000CD",
    darkgreen: "#006400",
    darkcyan: "#008B8B",
    deepskyblue: "#00BFFF",
    darkturquoise: "#00CED1",
    mediumspringgreen: "#00FA9A",
    springgreen: "#00FF7F",
    cyan: "#00FFFF",
    midnightblue: "#191970",
    dodgerblue: "#1E90FF",
    lightseagreen: "#20B2AA",
    forestgreen: "#228B22",
    seagreen: "#2E8B57",
    darkslategray: "#2F4F4F",
    darkslategrey: "#2F4F4F",
    limegreen: "#32CD32",
    mediumseagreen: "#3CB371",
    turquoise: "#40E0D0",
    royalblue: "#4169E1",
    steelblue: "#4682B4",
    darkslateblue: "#483D8B",
    mediumturquoise: "#48D1CC",
    indigo: "#4B0082",
    darkolivegreen: "#556B2F",
    cadetblue: "#5F9EA0",
    cornflowerblue: "#6495ED",
    rebeccapurple: "#663399",
    mediumaquamarine: "#66CDAA",
    dimgray: "#696969",
    dimgrey: "#696969",
    slateblue: "#6A5ACD",
    olivedrab: "#6B8E23",
    slategray: "#708090",
    slategrey: "#708090",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    mediumslateblue: "#7B68EE",
    lawngreen: "#7CFC00",
    chartreuse: "#7FFF00",
    aquamarine: "#7FFFD4",
    skyblue: "#87CEEB",
    lightskyblue: "#87CEFA",
    blueviolet: "#8A2BE2",
    darkred: "#8B0000",
    darkmagenta: "#8B008B",
    saddlebrown: "#8B4513",
    darkseagreen: "#8FBC8F",
    lightgreen: "#90EE90",
    mediumpurple: "#9370DB",
    darkviolet: "#9400D3",
    palegreen: "#98FB98",
    darkorchid: "#9932CC",
    yellowgreen: "#9ACD32",
    sienna: "#A0522D",
    brown: "#A52A2A",
    darkgray: "#A9A9A9",
    darkgrey: "#A9A9A9",
    lightblue: "#ADD8E6",
    greenyellow: "#ADFF2F",
    paleturquoise: "#AFEEEE",
    lightsteelblue: "#B0C4DE",
    powderblue: "#B0E0E6",
    firebrick: "#B22222",
    darkgoldenrod: "#B8860B",
    mediumorchid: "#BA55D3",
    rosybrown: "#BC8F8F",
    darkkhaki: "#BDB76B",
    mediumvioletred: "#C71585",
    indianred: "#CD5C5C",
    peru: "#CD853F",
    chocolate: "#D2691E",
    tan: "#D2B48C",
    lightgray: "#D3D3D3",
    lightgrey: "#D3D3D3",
    thistle: "#D8BFD8",
    orchid: "#DA70D6",
    goldenrod: "#DAA520",
    palevioletred: "#DB7093",
    crimson: "#DC143C",
    gainsboro: "#DCDCDC",
    plum: "#DDA0DD",
    burlywood: "#DEB887",
    lightcyan: "#E0FFFF",
    lavender: "#E6E6FA",
    darksalmon: "#E9967A",
    violet: "#EE82EE",
    palegoldenrod: "#EEE8AA",
    lightcoral: "#F08080",
    khaki: "#F0E68C",
    aliceblue: "#F0F8FF",
    honeydew: "#F0FFF0",
    azure: "#F0FFFF",
    sandybrown: "#F4A460",
    wheat: "#F5DEB3",
    beige: "#F5F5DC",
    whitesmoke: "#F5F5F5",
    mintcream: "#F5FFFA",
    ghostwhite: "#F8F8FF",
    salmon: "#FA8072",
    antiquewhite: "#FAEBD7",
    linen: "#FAF0E6",
    lightgoldenrodyellow: "#FAFAD2",
    oldlace: "#FDF5E6",
    magenta: "#FF00FF",
    deeppink: "#FF1493",
    orangered: "#FF4500",
    tomato: "#FF6347",
    hotpink: "#FF69B4",
    coral: "#FF7F50",
    darkorange: "#FF8C00",
    lightsalmon: "#FFA07A",
    orange: "#FFA500",
    lightpink: "#FFB6C1",
    pink: "#FFC0CB",
    gold: "#FFD700",
    peachpuff: "#FFDAB9",
    navajowhite: "#FFDEAD",
    moccasin: "#FFE4B5",
    bisque: "#FFE4C4",
    mistyrose: "#FFE4E1",
    blanchedalmond: "#FFEBCD",
    papayawhip: "#FFEFD5",
    lavenderblush: "#FFF0F5",
    seashell: "#FFF5EE",
    cornsilk: "#FFF8DC",
    lemonchiffon: "#FFFACD",
    floralwhite: "#FFFAF0",
    snow: "#FFFAFA",
    lightyellow: "#FFFFE0",
    ivory: "#FFFFF0"
  };
  var INT8 = new Int8Array(4);
  var INT32 = new Int32Array(INT8.buffer, 0, 1);
  var FLOAT32 = new Float32Array(INT8.buffer, 0, 1);
  var RGBA_TEST_REGEX = /^\s*rgba?\s*\(/;
  var RGBA_EXTRACT_REGEX = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
  function parseColor(val) {
    var r = 0;
    var g = 0;
    var b = 0;
    var a = 1;
    var lowerVal = val.toLowerCase();
    if (lowerVal === "transparent") {
      return {
        r: 0,
        g: 0,
        b: 0,
        a: 0
      };
    }
    if (lowerVal in HTML_COLORS) {
      return parseColor(HTML_COLORS[lowerVal]);
    }
    if (val[0] === "#") {
      if (val.length === 4) {
        r = parseInt(val.charAt(1) + val.charAt(1), 16);
        g = parseInt(val.charAt(2) + val.charAt(2), 16);
        b = parseInt(val.charAt(3) + val.charAt(3), 16);
      } else {
        r = parseInt(val.charAt(1) + val.charAt(2), 16);
        g = parseInt(val.charAt(3) + val.charAt(4), 16);
        b = parseInt(val.charAt(5) + val.charAt(6), 16);
      }
      if (val.length === 9) {
        a = parseInt(val.charAt(7) + val.charAt(8), 16) / 255;
      }
    } else if (RGBA_TEST_REGEX.test(val)) {
      var match = val.match(RGBA_EXTRACT_REGEX);
      if (match) {
        r = +match[1];
        g = +match[2];
        b = +match[3];
        if (match[4]) a = +match[4];
      }
    }
    return {
      r,
      g,
      b,
      a
    };
  }
  function colorToVec4(val) {
    var premultipliedAlpha = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var _parseColor = parseColor(val), r = _parseColor.r, g = _parseColor.g, b = _parseColor.b, a = _parseColor.a;
    if (premultipliedAlpha) return [r / 255 * a, g / 255 * a, b / 255 * a, a];
    return [r / 255, g / 255, b / 255, a];
  }
  var FLOAT_COLOR_CACHE = {};
  for (htmlColor in HTML_COLORS) {
    FLOAT_COLOR_CACHE[htmlColor] = floatColor(HTML_COLORS[htmlColor]);
    FLOAT_COLOR_CACHE[HTML_COLORS[htmlColor]] = FLOAT_COLOR_CACHE[htmlColor];
  }
  var htmlColor;
  function rgbaToFloat(r, g, b, a, masking) {
    INT32[0] = a << 24 | b << 16 | g << 8 | r;
    if (masking) INT32[0] = INT32[0] & 4278190079;
    return FLOAT32[0];
  }
  function floatColor(val) {
    val = val.toLowerCase();
    if (typeof FLOAT_COLOR_CACHE[val] !== "undefined") return FLOAT_COLOR_CACHE[val];
    var parsed = parseColor(val);
    var r = parsed.r, g = parsed.g, b = parsed.b;
    var a = parsed.a;
    a = a * 255 | 0;
    var color = rgbaToFloat(r, g, b, a, true);
    FLOAT_COLOR_CACHE[val] = color;
    return color;
  }
  function colorToArray(val, masking) {
    FLOAT32[0] = floatColor(val);
    var intValue = INT32[0];
    if (masking) {
      intValue = intValue | 16777216;
    }
    var r = intValue & 255;
    var g = intValue >> 8 & 255;
    var b = intValue >> 16 & 255;
    var a = intValue >> 24 & 255;
    return [r, g, b, a];
  }
  function indexToColor(index) {
    var r = index >>> 8 & 255;
    var g = index >>> 16 & 255;
    var b = index >>> 24 & 255;
    var a = index & 255;
    return (a << 24 | b << 16 | g << 8 | r) >>> 0;
  }
  function colorToIndex(r, g, b, a) {
    return (b << 24 | g << 16 | r << 8 | a) >>> 0;
  }
  function getPixelColor(gl, frameBuffer, x, y, pixelRatio, downSizingRatio) {
    var _pickingPixelCoords = pickingPixelCoords(gl, x, y, pixelRatio, downSizingRatio), _pickingPixelCoords2 = _slicedToArray(_pickingPixelCoords, 2), bufferX = _pickingPixelCoords2[0], bufferY = _pickingPixelCoords2[1];
    var pixel = new Uint8Array(4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
    gl.readPixels(bufferX, bufferY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    var _pixel = _slicedToArray(pixel, 4), r = _pixel[0], g = _pixel[1], b = _pixel[2], a = _pixel[3];
    return [r, g, b, a];
  }
  function colorToGLSLString(val) {
    var _parseColor2 = parseColor(val), r = _parseColor2.r, g = _parseColor2.g, b = _parseColor2.b, a = _parseColor2.a;
    var rFloat = (r / 255).toFixed(6);
    var gFloat = (g / 255).toFixed(6);
    var bFloat = (b / 255).toFixed(6);
    var aFloat = a.toFixed(6);
    return "vec4(".concat(rFloat, ", ").concat(gFloat, ", ").concat(bFloat, ", ").concat(aFloat, ")");
  }

  // node_modules/sigma/dist/loop-25649538.esm.js
  function _toPrimitive(t, e) {
    if ("object" != typeof t || !t) return t;
    var r;
    if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) {
      var i = r.call(t, e || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === e ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
      return t2.__proto__ || Object.getPrototypeOf(t2);
    }, _getPrototypeOf(t);
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t2) {
    }
    return (_isNativeReflectConstruct = function() {
      return !!t;
    })();
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
      return t2.__proto__ = e2, t2;
    }, _setPrototypeOf(t, e);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  function isAttributeSource(source) {
    return _typeof(source) === "object" && source !== null && "attribute" in source;
  }
  function sdfCircle() {
    var glsl = (
      /*glsl*/
      "\nfloat sdf_circle(vec2 uv, float size) {\n  return length(uv) - size;\n}\n"
    );
    return {
      name: "circle",
      glsl,
      uniforms: []
    };
  }
  function layerFill(options) {
    var _options$color;
    var _WebGL2RenderingConte2 = WebGL2RenderingContext, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE;
    var colorSource = (_options$color = options === null || options === void 0 ? void 0 : options.color) !== null && _options$color !== void 0 ? _options$color : {
      attribute: "color"
    };
    if (!isAttributeSource(colorSource)) {
      var colorString = colorSource;
      var _glsl = "\nvec4 layer_fill() {\n  return ".concat(colorToGLSLString(colorString), ";\n}\n");
      return {
        name: "fill",
        uniforms: [],
        attributes: [],
        glsl: _glsl
      };
    }
    var source = colorSource.attribute;
    var glsl = "\nvec4 layer_fill(vec4 v_fillColor) {\n  return v_fillColor;\n}\n";
    return {
      name: "fill",
      uniforms: [],
      attributes: [{
        name: "fillColor",
        size: 4,
        type: UNSIGNED_BYTE2,
        normalized: true,
        source
      }],
      glsl
    };
  }
  function resolveEdgeColorValue(value, attributeName) {
    if (typeof value === "string") {
      var _colorToVec4$map = colorToVec4(value).map(function(n) {
        return n.toFixed(6);
      }), _colorToVec4$map2 = _slicedToArray(_colorToVec4$map, 4), r = _colorToVec4$map2[0], g = _colorToVec4$map2[1], b = _colorToVec4$map2[2], a = _colorToVec4$map2[3];
      return {
        glsl: "vec4(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")"),
        attributes: [],
        needsNodeColors: false
      };
    }
    if ("node" in value && value.node) {
      return {
        glsl: value.node === "source" ? "v_sourceColor" : "v_targetColor",
        attributes: [],
        needsNodeColors: true
      };
    }
    var attr = value;
    return {
      glsl: "v_".concat(attributeName),
      attributes: [{
        name: "a_".concat(attributeName),
        size: 4,
        type: WebGL2RenderingContext.UNSIGNED_BYTE,
        normalized: true,
        source: attr.attribute,
        defaultValue: attr["default"]
      }],
      needsNodeColors: false
    };
  }
  function layerPlain(options) {
    var color = options === null || options === void 0 ? void 0 : options.color;
    if (color === void 0) {
      var _glsl = (
        /*glsl*/
        "\n// Plain solid color layer\nvec4 layer_plain(EdgeContext ctx) {\n  return v_color;\n}\n"
      );
      return {
        name: "plain",
        glsl: _glsl,
        uniforms: [],
        attributes: []
      };
    }
    var resolved = resolveEdgeColorValue(color, "plainColor");
    var glsl = (
      /*glsl*/
      "\n// Plain solid color layer\nvec4 layer_plain(EdgeContext ctx) {\n  return ".concat(resolved.glsl, ";\n}\n")
    );
    return {
      name: "plain",
      glsl,
      uniforms: [],
      attributes: resolved.attributes,
      needsNodeColors: resolved.needsNodeColors
    };
  }
  function pathLine() {
    var glsl = (
      /*glsl*/
      "\n// Position at parameter t \u2208 [0, 1]\nvec2 path_straight_position(float t, vec2 source, vec2 target) {\n  return mix(source, target, t);\n}\n\n// Total length of the path (analytical - more efficient than sampling)\nfloat path_straight_length(vec2 source, vec2 target) {\n  return length(target - source);\n}\n"
    );
    return {
      name: "straight",
      segments: 1,
      // Simple quad
      minBodyLengthRatio: 0,
      // No minimum for straight edges
      linearParameterization: true,
      // t maps directly to arc distance
      glsl,
      uniforms: [],
      attributes: []
    };
  }
  function pathLoop(options) {
    var _ref = options !== null && options !== void 0 ? options : {}, _ref$segments = _ref.segments, segments = _ref$segments === void 0 ? 32 : _ref$segments;
    var glsl = (
      /*glsl*/
      "\nconst float LOOP_PI = 3.141592653589793;\n\nfloat loopWorldRadius() {\n  float nodeWorldRadius = v_sourceNodeSize * u_correctionRatio / u_sizeRatio;\n  return max(v_loopRadius * nodeWorldRadius, 0.001);\n}\n\n// Cubic B\xE9zier with P0 = P3 = source.\n// Control points extend outward orthogonal to the node surface at exit/entry angles.\nvec2 path_loop_position(float t, vec2 source, vec2 target) {\n  float R = loopWorldRadius();\n  float angle = v_loopAngle + (v_loopFixedOrientation > 0.5 ? u_cameraAngle : 0.0);\n  float halfSpread = v_loopSpread * 0.5;\n\n  float exitAngle = angle - halfSpread;\n  float entryAngle = angle + halfSpread;\n\n  // Control point distance: at t=0.5 the B\xE9zier reaches 0.75 * cpDist * cos(halfSpread)\n  // from source. Solve for cpDist so the loop tip reaches exactly R.\n  float cpDist = R / (0.75 * cos(halfSpread));\n\n  vec2 cp1 = source + cpDist * vec2(cos(exitAngle), sin(exitAngle));\n  vec2 cp2 = source + cpDist * vec2(cos(entryAngle), sin(entryAngle));\n\n  float u = 1.0 - t;\n  vec2 d1 = cp1 - source;\n  vec2 d2 = cp2 - source;\n  return source + 3.0 * t * u * (u * d1 + t * d2);\n}\n\n// Approximate arc length via chord sampling\nfloat path_loop_length(vec2 source, vec2 target) {\n  float len = 0.0;\n  vec2 prev = path_loop_position(0.0, source, target);\n  const int STEPS = 16;\n  for (int i = 1; i <= STEPS; i++) {\n    float t = float(i) / float(STEPS);\n    vec2 cur = path_loop_position(t, source, target);\n    len += length(cur - prev);\n    prev = cur;\n  }\n  return len;\n}\n"
    );
    return {
      name: "loop",
      segments,
      glsl,
      needsNodeSize: true,
      uniforms: [],
      attributes: [{
        name: "loopRadius",
        size: 1,
        type: WebGL2RenderingContext.FLOAT
      }, {
        name: "loopAngle",
        size: 1,
        type: WebGL2RenderingContext.FLOAT
      }, {
        name: "loopSpread",
        size: 1,
        type: WebGL2RenderingContext.FLOAT
      }, {
        name: "loopFixedOrientation",
        size: 1,
        type: WebGL2RenderingContext.FLOAT
      }],
      variables: {
        loopRadius: {
          type: "number",
          "default": 4
        },
        loopAngle: {
          type: "number",
          "default": Math.PI / 4
        },
        loopSpread: {
          type: "number",
          "default": 80 * Math.PI / 180
        },
        loopFixedOrientation: {
          type: "number",
          "default": 0
        }
      },
      // Stack parallel self-loops concentrically: each gets a larger radius
      spread: {
        variable: "loopRadius",
        compute: function compute(index) {
          return index + 4;
        }
      }
    };
  }

  // node_modules/sigma/dist/types-6c7d477b.esm.js
  var import_events2 = __toESM(require_events());

  // node_modules/sigma/dist/types-d9c8ea2c.esm.js
  function isCustomNodeLayer(spec) {
    return _typeof(spec) === "object" && "glsl" in spec && !("attributes" in spec);
  }
  function isCustomEdgeLayer(spec) {
    return _typeof(spec) === "object" && "glsl" in spec && !("attributes" in spec);
  }
  var DEFAULT_NODE_PRIMITIVES = {
    shapes: [sdfCircle()],
    variables: {},
    layers: [layerFill()],
    label: {},
    backdrop: {},
    labelAttachments: {}
  };
  var DEFAULT_EDGE_PRIMITIVES = {
    paths: [pathLine(), pathLoop()],
    extremities: [],
    variables: {},
    layers: [layerPlain()],
    defaultHead: "none",
    defaultTail: "none",
    label: {}
  };
  var DEFAULT_NODE_DEPTH_LAYERS = ["nodes", "topNodes"];
  var DEFAULT_EDGE_DEPTH_LAYERS = ["edges", "topEdges"];
  var DEFAULT_DEPTH_LAYERS = [].concat(DEFAULT_EDGE_DEPTH_LAYERS, DEFAULT_NODE_DEPTH_LAYERS);
  var DEFAULT_PRIMITIVES = {
    nodes: DEFAULT_NODE_PRIMITIVES,
    edges: DEFAULT_EDGE_PRIMITIVES,
    depthLayers: _toConsumableArray(DEFAULT_DEPTH_LAYERS)
  };

  // node_modules/sigma/dist/easings-65f8fcb8.esm.js
  var linear = function linear2(k) {
    return k;
  };
  var quadraticIn = function quadraticIn2(k) {
    return k * k;
  };
  var quadraticOut = function quadraticOut2(k) {
    return k * (2 - k);
  };
  var quadraticInOut = function quadraticInOut2(k) {
    if ((k *= 2) < 1) return 0.5 * k * k;
    return -0.5 * (--k * (k - 2) - 1);
  };
  var cubicIn = function cubicIn2(k) {
    return k * k * k;
  };
  var cubicOut = function cubicOut2(k) {
    return --k * k * k + 1;
  };
  var cubicInOut = function cubicInOut2(k) {
    if ((k *= 2) < 1) return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
  };
  var exponentialIn = function exponentialIn2(k) {
    return k === 0 ? 0 : Math.pow(2, 10 * (k - 1));
  };
  var exponentialOut = function exponentialOut2(k) {
    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
  };
  var exponentialInOut = function exponentialInOut2(k) {
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (k < 0.5) return Math.pow(2, 10 * (2 * k - 1)) / 2;
    return (2 - Math.pow(2, -10 * (2 * k - 1))) / 2;
  };
  var easings = {
    linear,
    quadraticIn,
    quadraticOut,
    quadraticInOut,
    cubicIn,
    cubicOut,
    cubicInOut,
    exponentialIn,
    exponentialOut,
    exponentialInOut
  };
  function resolveEasing(easing) {
    if (!easing) return easings.linear;
    if (typeof easing === "function") return easing;
    return easings[easing];
  }

  // node_modules/sigma/dist/types-6c7d477b.esm.js
  function isAttributeBinding(value) {
    return _typeof(value) === "object" && value !== null && "attribute" in value;
  }
  function isValueFunction(value) {
    return typeof value === "function";
  }
  function isInlineFunctionConditional(value) {
    return _typeof(value) === "object" && value !== null && "when" in value && typeof value.when === "function" && "then" in value;
  }
  function isInlineStateConditional(value) {
    return _typeof(value) === "object" && value !== null && "whenState" in value && "then" in value;
  }
  function isInlineDataConditional(value) {
    return _typeof(value) === "object" && value !== null && "whenData" in value && "then" in value;
  }
  var DEFAULT_NODE_STATE = {
    isHovered: false,
    isLabelHovered: false,
    isHidden: false,
    isHighlighted: false,
    isDragged: false
  };
  var DEFAULT_EDGE_STATE = {
    isHovered: false,
    isLabelHovered: false,
    isHidden: false,
    isHighlighted: false,
    parallelIndex: 0,
    parallelCount: 1
  };
  var DEFAULT_GRAPH_STATE = {
    isIdle: true,
    isPanning: false,
    isZooming: false,
    isDragging: false,
    hasHovered: false,
    hasHighlighted: false
  };
  function createNodeState(defaults) {
    return _objectSpread2(_objectSpread2({}, DEFAULT_NODE_STATE), defaults);
  }
  function createEdgeState(defaults) {
    return _objectSpread2(_objectSpread2({}, DEFAULT_EDGE_STATE), defaults);
  }
  function createGraphState(defaults) {
    return _objectSpread2(_objectSpread2({}, DEFAULT_GRAPH_STATE), defaults);
  }
  var baseNodeStyle = {
    x: {
      attribute: "x"
    },
    y: {
      attribute: "y"
    },
    size: {
      whenState: "isHovered",
      then: {
        attribute: "size",
        defaultValue: 12
      },
      "else": {
        attribute: "size",
        defaultValue: 10
      }
    },
    color: {
      attribute: "color",
      defaultValue: "#666"
    },
    label: {
      attribute: "label"
    },
    visibility: {
      whenState: "isHidden",
      then: "hidden",
      "else": "visible"
    },
    labelVisibility: {
      whenState: "isHovered",
      then: "visible",
      "else": "auto"
    },
    backdropVisibility: {
      whenState: "isHovered",
      then: "visible",
      "else": "hidden"
    },
    backdropColor: "#ffffff",
    backdropShadowColor: "rgba(0, 0, 0, 0.5)",
    backdropShadowBlur: 12,
    backdropPadding: 6
  };
  var baseEdgeStyle = {
    size: {
      attribute: "size",
      defaultValue: 1
    },
    color: {
      attribute: "color",
      defaultValue: "#ccc"
    },
    label: {
      attribute: "label"
    },
    visibility: {
      whenState: "isHidden",
      then: "hidden",
      "else": "visible"
    }
  };
  var DEFAULT_STYLES$1 = {
    nodes: _objectSpread2(_objectSpread2({}, baseNodeStyle), {}, {
      depth: {
        whenState: "isHovered",
        then: "topNodes",
        "else": "nodes"
      }
    }),
    edges: _objectSpread2(_objectSpread2({}, baseEdgeStyle), {}, {
      depth: {
        whenState: ["isHighlighted", "isHovered"],
        then: "topEdges",
        "else": "edges"
      }
    })
  };
  function isNumericalBinding(binding) {
    return "min" in binding || "max" in binding || "minValue" in binding || "maxValue" in binding || "easing" in binding;
  }
  function isCategoricalBinding(binding) {
    return "dict" in binding;
  }
  function evaluateStatePredicate(predicate, state) {
    if (typeof predicate === "string") {
      return state[predicate] === true;
    }
    if (Array.isArray(predicate)) {
      return predicate.every(function(flag) {
        return state[flag] === true;
      });
    }
    if (_typeof(predicate) === "object" && predicate !== null) {
      return Object.entries(predicate).every(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
        return state[key] === value;
      });
    }
    return false;
  }
  function resolveDirectBinding(binding, attributes) {
    var value = attributes[binding.attribute];
    if (value === void 0) {
      return binding.defaultValue;
    }
    return value;
  }
  function resolveNumericalBinding(binding, attributes, _graph) {
    var _binding$minValue, _binding$maxValue, _binding$min2, _binding$max;
    var rawValue = attributes[binding.attribute];
    if (rawValue === void 0) {
      return binding.defaultValue;
    }
    var value = Number(rawValue);
    if (isNaN(value)) {
      return binding.defaultValue;
    }
    if (binding.min === void 0 && binding.max === void 0) {
      return value;
    }
    var minValue = (_binding$minValue = binding.minValue) !== null && _binding$minValue !== void 0 ? _binding$minValue : value;
    var maxValue = (_binding$maxValue = binding.maxValue) !== null && _binding$maxValue !== void 0 ? _binding$maxValue : value;
    if (maxValue === minValue) {
      var _binding$min;
      return (_binding$min = binding.min) !== null && _binding$min !== void 0 ? _binding$min : value;
    }
    var t = (value - minValue) / (maxValue - minValue);
    t = Math.max(0, Math.min(1, t));
    var easingFn = resolveEasing(binding.easing);
    t = easingFn(t);
    var min = (_binding$min2 = binding.min) !== null && _binding$min2 !== void 0 ? _binding$min2 : 0;
    var max = (_binding$max = binding.max) !== null && _binding$max !== void 0 ? _binding$max : 1;
    return min + t * (max - min);
  }
  function resolveCategoricalBinding(binding, attributes) {
    var value = attributes[binding.attribute];
    if (value === void 0) {
      return binding.defaultValue;
    }
    var key = String(value);
    if (key in binding.dict) {
      return binding.dict[key];
    }
    return binding.defaultValue;
  }
  function resolveAttributeBinding(binding, attributes, graph) {
    if (isCategoricalBinding(binding)) {
      return resolveCategoricalBinding(binding, attributes);
    }
    if (isNumericalBinding(binding)) {
      return resolveNumericalBinding(binding, attributes);
    }
    return resolveDirectBinding(binding, attributes);
  }
  function evaluateDataPredicate(predicate, attributes) {
    if (typeof predicate === "string") return !!attributes[predicate];
    if (Array.isArray(predicate)) return predicate.every(function(key) {
      return !!attributes[key];
    });
    if (_typeof(predicate) === "object" && predicate !== null) {
      return Object.entries(predicate).every(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0], value = _ref4[1];
        return attributes[key] === value;
      });
    }
    return false;
  }
  function resolveGraphicValue(value, attributes, state, graphState, graph, defaultValue) {
    if (value === null || value === void 0) return defaultValue;
    if (_typeof(value) !== "object" && typeof value !== "function") return value;
    if (isInlineFunctionConditional(value)) {
      var branch = value.when(attributes, state, graphState, graph) ? value.then : value["else"];
      if (branch === void 0) return defaultValue;
      return resolveGraphicValue(branch, attributes, state, graphState, graph, defaultValue);
    }
    if (isInlineStateConditional(value)) {
      var _branch = evaluateStatePredicate(value.whenState, state) ? value.then : value["else"];
      if (_branch === void 0) return defaultValue;
      return resolveGraphicValue(_branch, attributes, state, graphState, graph, defaultValue);
    }
    if (isInlineDataConditional(value)) {
      var _branch2 = evaluateDataPredicate(value.whenData, attributes) ? value.then : value["else"];
      if (_branch2 === void 0) return defaultValue;
      return resolveGraphicValue(_branch2, attributes, state, graphState, graph, defaultValue);
    }
    if (isValueFunction(value)) {
      var result = value(attributes, state, graphState, graph);
      return result !== null && result !== void 0 ? result : defaultValue;
    }
    if (isAttributeBinding(value)) {
      var _result = resolveAttributeBinding(value, attributes);
      return _result !== null && _result !== void 0 ? _result : defaultValue;
    }
    return value;
  }
  function classifyValue(value) {
    if (value === null || value === void 0) return "static";
    if (isInlineFunctionConditional(value)) return "graph-state";
    if (isInlineStateConditional(value)) {
      var thenDep = classifyValue(value.then);
      var elseDep = value["else"] !== void 0 ? classifyValue(value["else"]) : "static";
      return worstDependency("item-state", worstDependency(thenDep, elseDep));
    }
    if (isInlineDataConditional(value)) {
      var _thenDep = classifyValue(value.then);
      var _elseDep = value["else"] !== void 0 ? classifyValue(value["else"]) : "static";
      return worstDependency(_thenDep, _elseDep);
    }
    if (isValueFunction(value)) return "graph-state";
    if (isAttributeBinding(value)) return "static";
    return "static";
  }
  function worstDependency(a, b) {
    if (a === "graph-state" || b === "graph-state") return "graph-state";
    if (a === "item-state" || b === "item-state") return "item-state";
    return "static";
  }
  function analyzeStyleDeclaration(styleDeclaration) {
    if (!styleDeclaration) return {
      dependency: "static",
      xAttribute: null,
      yAttribute: null
    };
    var rules = Array.isArray(styleDeclaration) ? styleDeclaration : [styleDeclaration];
    var dependency = "static";
    var xAttribute = null;
    var yAttribute = null;
    var _iterator = _createForOfIteratorHelper(rules), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var rule = _step.value;
        if ("matchData" in rule && "cases" in rule) {
          var cases = rule.cases;
          for (var _i = 0, _Object$values = Object.values(cases); _i < _Object$values.length; _i++) {
            var branch = _Object$values[_i];
            for (var _i2 = 0, _Object$values2 = Object.values(branch); _i2 < _Object$values2.length; _i2++) {
              var value = _Object$values2[_i2];
              dependency = worstDependency(dependency, classifyValue(value));
            }
          }
        } else if ("matchState" in rule && "cases" in rule) {
          dependency = worstDependency(dependency, "item-state");
          var _cases = rule.cases;
          for (var _i3 = 0, _Object$values3 = Object.values(_cases); _i3 < _Object$values3.length; _i3++) {
            var _branch3 = _Object$values3[_i3];
            for (var _i4 = 0, _Object$values4 = Object.values(_branch3); _i4 < _Object$values4.length; _i4++) {
              var _value = _Object$values4[_i4];
              dependency = worstDependency(dependency, classifyValue(_value));
            }
          }
        } else if ("when" in rule && "then" in rule) {
          dependency = "graph-state";
        } else if ("whenState" in rule) {
          dependency = worstDependency(dependency, "item-state");
          var thenObj = rule.then;
          if (thenObj && _typeof(thenObj) === "object") {
            for (var _i5 = 0, _Object$values5 = Object.values(thenObj); _i5 < _Object$values5.length; _i5++) {
              var _value2 = _Object$values5[_i5];
              dependency = worstDependency(dependency, classifyValue(_value2));
            }
          }
          var elseObj = rule["else"];
          if (elseObj && _typeof(elseObj) === "object") {
            for (var _i6 = 0, _Object$values6 = Object.values(elseObj); _i6 < _Object$values6.length; _i6++) {
              var _value3 = _Object$values6[_i6];
              dependency = worstDependency(dependency, classifyValue(_value3));
            }
          }
        } else if ("whenData" in rule) {
          var _thenObj = rule.then;
          if (_thenObj && _typeof(_thenObj) === "object") {
            for (var _i7 = 0, _Object$values7 = Object.values(_thenObj); _i7 < _Object$values7.length; _i7++) {
              var _value4 = _Object$values7[_i7];
              dependency = worstDependency(dependency, classifyValue(_value4));
            }
          }
          var _elseObj = rule["else"];
          if (_elseObj && _typeof(_elseObj) === "object") {
            for (var _i8 = 0, _Object$values8 = Object.values(_elseObj); _i8 < _Object$values8.length; _i8++) {
              var _value5 = _Object$values8[_i8];
              dependency = worstDependency(dependency, classifyValue(_value5));
            }
          }
        } else {
          for (var _i9 = 0, _Object$entries = Object.entries(rule); _i9 < _Object$entries.length; _i9++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i9], 2), key = _Object$entries$_i[0], _value6 = _Object$entries$_i[1];
            if (RULE_CONTROL_KEYS.has(key)) continue;
            dependency = worstDependency(dependency, classifyValue(_value6));
            if ((key === "x" || key === "y") && isAttributeBinding(_value6)) {
              var attr = _value6.attribute;
              if (key === "x" && !xAttribute) xAttribute = attr;
              if (key === "y" && !yAttribute) yAttribute = attr;
            }
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      dependency,
      xAttribute,
      yAttribute
    };
  }
  var DEFAULT_NODE_DISPLAY_DATA = {
    size: 10,
    color: "#666",
    opacity: 1,
    shape: "circle",
    rotationAlignment: "viewport",
    labelRotationAlignment: "viewport",
    visibility: "visible",
    depth: "nodes",
    zIndex: 0,
    label: "",
    labelColor: "#000",
    labelSize: 12,
    labelFont: "sans-serif",
    labelVisibility: "auto",
    labelPosition: "right",
    labelAngle: 0,
    labelDepth: "nodes",
    backdropVisibility: "hidden",
    backdropColor: "transparent",
    backdropShadowColor: "transparent",
    backdropShadowBlur: 0,
    backdropPadding: 0,
    backdropBorderColor: "transparent",
    backdropBorderWidth: 0,
    backdropCornerRadius: 0,
    backdropLabelPadding: -1,
    backdropArea: "both",
    labelAttachment: null,
    labelAttachmentPlacement: "below"
  };
  var DEFAULT_EDGE_DISPLAY_DATA = {
    size: 1,
    color: "#ccc",
    opacity: 1,
    path: "straight",
    selfLoopPath: "loop",
    parallelSpread: 0.25,
    tail: "none",
    head: "none",
    visibility: "visible",
    depth: "edges",
    zIndex: 0,
    label: "",
    labelColor: "#666",
    labelVisibility: "auto",
    labelDepth: "edges"
  };
  var RULE_CONTROL_KEYS = /* @__PURE__ */ new Set(["when", "whenState", "whenData", "then", "else"]);
  var NODE_DEFAULT_KEYS = Object.keys(DEFAULT_NODE_DISPLAY_DATA);
  var NODE_DEFAULT_VALUES = Object.values(DEFAULT_NODE_DISPLAY_DATA);
  var EDGE_DEFAULT_KEYS = Object.keys(DEFAULT_EDGE_DISPLAY_DATA);
  var EDGE_DEFAULT_VALUES = Object.values(DEFAULT_EDGE_DISPLAY_DATA);
  function applyStyleRule(result, rule, attributes, state, graphState, graph, staticDefaults) {
    for (var key in rule) {
      var _result$key;
      if (RULE_CONTROL_KEYS.has(key)) continue;
      var defaultValue = (_result$key = result[key]) !== null && _result$key !== void 0 ? _result$key : staticDefaults[key];
      result[key] = resolveGraphicValue(rule[key], attributes, state, graphState, graph, defaultValue);
    }
    if ("depth" in rule && !("labelDepth" in rule)) {
      result.labelDepth = result.depth;
    }
  }
  function applyStyleRules(result, rules, attributes, state, graphState, graph, staticDefaults) {
    var _iterator2 = _createForOfIteratorHelper(rules), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var rule = _step2.value;
        if ("matchData" in rule && "cases" in rule) {
          var _attributes;
          var key = String((_attributes = attributes[rule.matchData]) !== null && _attributes !== void 0 ? _attributes : "");
          var cases = rule.cases;
          if (key in cases) applyStyleRule(result, cases[key], attributes, state, graphState, graph, staticDefaults);
        } else if ("matchState" in rule && "cases" in rule) {
          var _state;
          var _key = String((_state = state[rule.matchState]) !== null && _state !== void 0 ? _state : "");
          var _cases2 = rule.cases;
          if (_key in _cases2) applyStyleRule(result, _cases2[_key], attributes, state, graphState, graph, staticDefaults);
        } else if ("when" in rule && "then" in rule) {
          var whenFn = rule.when;
          if (!whenFn(attributes, state, graphState, graph)) continue;
          applyStyleRule(result, rule.then, attributes, state, graphState, graph, staticDefaults);
        } else if ("whenState" in rule && "then" in rule) {
          if (!evaluateStatePredicate(rule.whenState, state)) continue;
          applyStyleRule(result, rule.then, attributes, state, graphState, graph, staticDefaults);
        } else if ("whenData" in rule && "then" in rule) {
          if (!evaluateDataPredicate(rule.whenData, attributes)) continue;
          applyStyleRule(result, rule.then, attributes, state, graphState, graph, staticDefaults);
        } else {
          applyStyleRule(result, rule, attributes, state, graphState, graph, staticDefaults);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
  function evaluateNodeStyle(styleDeclaration, attributes, state, graphState, graph, target) {
    var result = target || {};
    var r = result;
    for (var i = 0, l = NODE_DEFAULT_KEYS.length; i < l; i++) {
      r[NODE_DEFAULT_KEYS[i]] = NODE_DEFAULT_VALUES[i];
    }
    r.x = void 0;
    r.y = void 0;
    r.labelBackgroundColor = void 0;
    r.labelBackgroundPadding = void 0;
    r.labelCursor = void 0;
    if (!styleDeclaration) {
      var _ref5, _ref6, _ref7, _ref8, _ref9;
      r.x = (_ref5 = attributes.x) !== null && _ref5 !== void 0 ? _ref5 : 0;
      r.y = (_ref6 = attributes.y) !== null && _ref6 !== void 0 ? _ref6 : 0;
      result.size = (_ref7 = attributes.size) !== null && _ref7 !== void 0 ? _ref7 : 10;
      result.color = (_ref8 = attributes.color) !== null && _ref8 !== void 0 ? _ref8 : "#666";
      result.label = (_ref9 = attributes.label) !== null && _ref9 !== void 0 ? _ref9 : "";
      return result;
    }
    var rules = Array.isArray(styleDeclaration) ? styleDeclaration : [styleDeclaration];
    applyStyleRules(r, rules, attributes, state, graphState, graph, DEFAULT_NODE_DISPLAY_DATA);
    return result;
  }
  function evaluateEdgeStyle(styleDeclaration, attributes, state, graphState, graph, target) {
    var result = target || {};
    var r = result;
    for (var i = 0, l = EDGE_DEFAULT_KEYS.length; i < l; i++) {
      r[EDGE_DEFAULT_KEYS[i]] = EDGE_DEFAULT_VALUES[i];
    }
    if (!styleDeclaration) {
      var _ref0, _ref1, _ref10;
      result.size = (_ref0 = attributes.size) !== null && _ref0 !== void 0 ? _ref0 : 1;
      result.color = (_ref1 = attributes.color) !== null && _ref1 !== void 0 ? _ref1 : "#ccc";
      result.label = (_ref10 = attributes.label) !== null && _ref10 !== void 0 ? _ref10 : "";
      return result;
    }
    var rules = Array.isArray(styleDeclaration) ? styleDeclaration : [styleDeclaration];
    applyStyleRules(r, rules, attributes, state, graphState, graph, DEFAULT_EDGE_DISPLAY_DATA);
    if (typeof r.labelPosition === "number") r.labelPosition = void 0;
    return result;
  }
  function resolveStageStyleValue(value, graphState, defaultValue) {
    var _ref11, _ref14;
    if (value === void 0 || value === null) return defaultValue;
    if (typeof value === "function") return (_ref11 = value(graphState)) !== null && _ref11 !== void 0 ? _ref11 : defaultValue;
    if (_typeof(value) === "object" && "when" in value) {
      var _ref12;
      var cond = value;
      var matches = cond.when(graphState);
      var branch = matches ? cond.then : cond["else"];
      if (branch === void 0) return defaultValue;
      if (typeof branch === "function") return (_ref12 = branch(graphState)) !== null && _ref12 !== void 0 ? _ref12 : defaultValue;
      return branch !== null && branch !== void 0 ? branch : defaultValue;
    }
    if (_typeof(value) === "object" && "whenState" in value) {
      var _ref13;
      var _cond = value;
      var _matches = evaluateStatePredicate(_cond.whenState, graphState);
      var _branch4 = _matches ? _cond.then : _cond["else"];
      if (_branch4 === void 0) return defaultValue;
      if (typeof _branch4 === "function") return (_ref13 = _branch4(graphState)) !== null && _ref13 !== void 0 ? _ref13 : defaultValue;
      return _branch4 !== null && _branch4 !== void 0 ? _branch4 : defaultValue;
    }
    return (_ref14 = value) !== null && _ref14 !== void 0 ? _ref14 : defaultValue;
  }
  function evaluateStageStyle(styleDeclaration, graphState) {
    var result = {};
    if (!styleDeclaration) return result;
    var rules = Array.isArray(styleDeclaration) ? styleDeclaration : [styleDeclaration];
    var _iterator3 = _createForOfIteratorHelper(rules), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var rule = _step3.value;
        if ("when" in rule && "then" in rule) {
          var matches = rule.when(graphState);
          var branch = matches ? rule.then : rule["else"];
          if (branch && _typeof(branch) === "object") {
            applyStageStyleRule(result, branch, graphState);
          }
        } else if ("whenState" in rule && "then" in rule) {
          var _matches2 = evaluateStatePredicate(rule.whenState, graphState);
          var _branch5 = _matches2 ? rule.then : rule["else"];
          if (_branch5 && _typeof(_branch5) === "object") {
            applyStageStyleRule(result, _branch5, graphState);
          }
        } else {
          applyStageStyleRule(result, rule, graphState);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return result;
  }
  function applyStageStyleRule(result, rule, graphState) {
    for (var _i0 = 0, _Object$entries2 = Object.entries(rule); _i0 < _Object$entries2.length; _i0++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i0], 2), key = _Object$entries2$_i[0], value = _Object$entries2$_i[1];
      if (RULE_CONTROL_KEYS.has(key)) continue;
      result[key] = resolveStageStyleValue(value, graphState);
    }
  }
  var TypedEventEmitter = /* @__PURE__ */ (function(_ref) {
    function TypedEventEmitter2() {
      var _this;
      _classCallCheck(this, TypedEventEmitter2);
      _this = _callSuper(this, TypedEventEmitter2);
      _this.rawEmitter = _this;
      return _this;
    }
    _inherits(TypedEventEmitter2, _ref);
    return _createClass(TypedEventEmitter2);
  })(import_events2.EventEmitter);
  var DEFAULT_PRIMITIVES2 = DEFAULT_PRIMITIVES;

  // node_modules/sigma/dist/data-733c2ee0.esm.js
  function extend(array, values) {
    var l2 = values.size;
    if (l2 === 0) return;
    var l1 = array.length;
    array.length += l2;
    var i = 0;
    values.forEach(function(value) {
      array[l1 + i] = value;
      i++;
    });
  }
  function assign2(target) {
    target = target || {};
    for (var i = 0, l = arguments.length <= 1 ? 0 : arguments.length - 1; i < l; i++) {
      var o = i + 1 < 1 || arguments.length <= i + 1 ? void 0 : arguments[i + 1];
      if (!o) continue;
      Object.assign(target, o);
    }
    return target;
  }
  function hasNewPartialProps(current, partial) {
    for (var k in partial) {
      if (!Object.prototype.hasOwnProperty.call(partial, k)) continue;
      if (partial[k] !== current[k]) return true;
    }
    return false;
  }
  function shallowEqual(a, b) {
    var aProps = a;
    var bProps = b;
    for (var k in aProps) {
      if (!Object.prototype.hasOwnProperty.call(aProps, k)) continue;
      if (aProps[k] !== bProps[k]) return false;
    }
    for (var _k in bProps) {
      if (!Object.prototype.hasOwnProperty.call(bProps, _k)) continue;
      if (bProps[_k] !== aProps[_k]) return false;
    }
    return true;
  }
  function setMembership(set, key, present) {
    if (present) set.add(key);
    else set["delete"](key);
  }

  // node_modules/sigma/dist/normalization-4a46e800.esm.js
  var import_is_graph = __toESM(require_is_graph());
  var ANIMATE_DEFAULTS = {
    easing: "quadraticInOut",
    duration: 150
  };
  function hasForcedLabel(data) {
    return data.labelVisibility === "visible" && data.visibility !== "hidden";
  }
  function hasBackdrop(data) {
    return data.backdropVisibility === "visible" && data.visibility !== "hidden";
  }
  function nodeRotationFlags(data) {
    return [data.rotationAlignment === "graph" ? 1 : 0, data.labelRotationAlignment === "graph" ? 1 : 0];
  }
  function removePositionFromDepthRanges(ranges, depth, position) {
    var fragments = ranges[depth];
    if (!fragments) return;
    for (var i = 0; i < fragments.length; i++) {
      var f = fragments[i];
      if (position < f.offset || position >= f.offset + f.count) continue;
      if (f.count === 1) {
        fragments.splice(i, 1);
      } else if (position === f.offset) {
        f.offset++;
        f.count--;
      } else if (position === f.offset + f.count - 1) {
        f.count--;
      } else {
        var secondOffset = position + 1;
        var secondCount = f.offset + f.count - secondOffset;
        f.count = position - f.offset;
        fragments.splice(i + 1, 0, {
          offset: secondOffset,
          count: secondCount
        });
      }
      return;
    }
  }
  function addPositionToDepthRanges(ranges, depth, position) {
    if (!ranges[depth]) {
      ranges[depth] = [{
        offset: position,
        count: 1
      }];
      return;
    }
    var fragments = ranges[depth];
    var insertIdx = fragments.length;
    for (var i = 0; i < fragments.length; i++) {
      if (position < fragments[i].offset) {
        insertIdx = i;
        break;
      }
    }
    var prev = insertIdx > 0 ? fragments[insertIdx - 1] : null;
    var next = insertIdx < fragments.length ? fragments[insertIdx] : null;
    var mergeWithPrev = prev && prev.offset + prev.count === position;
    var mergeWithNext = next && position + 1 === next.offset;
    if (mergeWithPrev && mergeWithNext) {
      prev.count += 1 + next.count;
      fragments.splice(insertIdx, 1);
    } else if (mergeWithPrev) {
      prev.count++;
    } else if (mergeWithNext) {
      next.offset--;
      next.count++;
    } else {
      fragments.splice(insertIdx, 0, {
        offset: position,
        count: 1
      });
    }
  }
  function validateGraph(graph) {
    if (!(0, import_is_graph.default)(graph)) throw new Error("Sigma: invalid graph instance.");
  }
  function createNormalizationFunction(extent) {
    var _extent$x = _slicedToArray(extent.x, 2), minX = _extent$x[0], maxX = _extent$x[1], _extent$y = _slicedToArray(extent.y, 2), minY = _extent$y[0], maxY = _extent$y[1];
    var ratio = Math.max(maxX - minX, maxY - minY), dX = (maxX + minX) / 2, dY = (maxY + minY) / 2;
    if (ratio === 0 || Math.abs(ratio) === Infinity || isNaN(ratio)) ratio = 1;
    if (isNaN(dX)) dX = 0;
    if (isNaN(dY)) dY = 0;
    var fn = function fn2(data) {
      return {
        x: 0.5 + (data.x - dX) / ratio,
        y: 0.5 + (data.y - dY) / ratio
      };
    };
    fn.applyTo = function(data) {
      data.x = 0.5 + (data.x - dX) / ratio;
      data.y = 0.5 + (data.y - dY) / ratio;
    };
    fn.inverse = function(data) {
      return {
        x: dX + ratio * (data.x - 0.5),
        y: dY + ratio * (data.y - 0.5)
      };
    };
    fn.ratio = ratio;
    return fn;
  }

  // node_modules/sigma/settings/dist/sigma-settings.esm.js
  var DEFAULT_SETTINGS = {
    // Performance
    hideEdgesOnMove: false,
    hideLabelsOnMove: false,
    renderLabels: true,
    renderEdgeLabels: false,
    edgeLabelAnchors: "nodeLabels",
    enableEdgeEvents: false,
    nodeLabelEvents: false,
    edgeLabelEvents: false,
    pickingDownSizingRatio: 2,
    nodePickingPadding: 0,
    edgePickingPadding: 4,
    labelPickingPadding: 10,
    stagePadding: 30,
    minEdgeThickness: 1.7,
    antiAliasingFeather: 1,
    antialiasEdges: true,
    antialiasNodes: true,
    // Mouse and touch settings
    dragTimeout: 100,
    draggedEventsTolerance: 3,
    inertiaDuration: 200,
    inertiaRatio: 3,
    zoomDuration: 250,
    zoomingRatio: 1.7,
    doubleClickTimeout: 300,
    doubleClickZoomingRatio: 2.2,
    doubleClickZoomingDuration: 200,
    tapMoveTolerance: 10,
    // Size and scaling
    zoomToSizeRatioFunction: Math.sqrt,
    itemSizesReference: "positions",
    autoRescale: true,
    autoRescaleContent: "positions",
    // Node drag
    enableNodeDrag: false,
    getDraggedNodes: function getDraggedNodes(node) {
      return [node];
    },
    dragPositionToAttributes: null,
    // Label rendering optimization
    labelDensity: 1,
    labelGridCellSize: 100,
    labelRenderedSizeThreshold: 6,
    labelPixelSnapping: true,
    // Camera and features
    minCameraRatio: null,
    maxCameraRatio: null,
    enableCameraZooming: true,
    enableCameraPanning: true,
    enableCameraRotation: true,
    enableCameraMouseRotation: true,
    cameraPanBoundaries: null,
    gestureTarget: "graph",
    sharedGestureWheelMessage: "Use Ctrl + scroll to zoom the graph",
    sharedGestureAppleWheelMessage: "Use \u2318 + scroll to zoom the graph",
    sharedGestureTouchMessage: "Use two fingers to move the graph",
    // Lifecycle
    allowInvalidContainer: false,
    // Debug
    DEBUG_displayPickingLayer: false,
    DEBUG_logShaders: false,
    DEBUG_logRenderStats: false,
    DEBUG_gpuTimerQueries: false
  };
  function validateSettings(settings) {
    if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
      throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
    }
    var minCameraRatio = settings.minCameraRatio, maxCameraRatio = settings.maxCameraRatio;
    if (typeof minCameraRatio === "number" && typeof maxCameraRatio === "number" && maxCameraRatio < minCameraRatio) {
      throw new Error("Settings: invalid camera ratio boundaries. Expecting `maxCameraRatio` to be greater than `minCameraRatio`.");
    }
  }
  function resolveSettings(settings) {
    return assign2({}, DEFAULT_SETTINGS, settings);
  }

  // node_modules/sigma/dist/misc-0e506b5b.esm.js
  var FONT_STYLE_KEYWORDS = /* @__PURE__ */ new Set(["italic", "oblique"]);
  var FONT_WEIGHT_KEYWORDS = /* @__PURE__ */ new Set(["bold", "bolder", "lighter"]);
  function parseFontString(font) {
    var weight = "normal";
    var style = "normal";
    var trimmed = font.trim();
    var parts = trimmed.split(/\s+/);
    var familyStart = 0;
    for (var i = 0; i < parts.length; i++) {
      var lower = parts[i].toLowerCase();
      if (FONT_STYLE_KEYWORDS.has(lower)) {
        style = lower;
        familyStart = i + 1;
      } else if (FONT_WEIGHT_KEYWORDS.has(lower) || /^\d{3}$/.test(lower)) {
        weight = lower;
        familyStart = i + 1;
      } else if (lower === "normal") {
        familyStart = i + 1;
      } else {
        break;
      }
    }
    var family = parts.slice(familyStart).join(" ");
    return {
      family: family || trimmed,
      weight,
      style
    };
  }
  function createElement(tag, style, attributes) {
    var element = document.createElement(tag);
    if (style) {
      for (var k in style) {
        element.style[k] = style[k];
      }
    }
    if (attributes) {
      for (var _k in attributes) {
        element.setAttribute(_k, attributes[_k]);
      }
    }
    return element;
  }
  function getPixelRatio() {
    if (typeof window.devicePixelRatio !== "undefined") return window.devicePixelRatio;
    return 1;
  }

  // node_modules/sigma/dist/factory-63e3ce33.esm.js
  var import_events3 = __toESM(require_events());
  function getAttributeItemsCount(attr) {
    var isFloat = attr.type === WebGL2RenderingContext.FLOAT && !attr.normalized;
    var isPackedBytes = attr.type === WebGL2RenderingContext.UNSIGNED_BYTE && attr.size === 4 && attr.normalized;
    if (!isFloat && !isPackedBytes) throw new Error('Attribute "'.concat(attr.name, '" is invalid: only non-normalized FLOAT and normalized UNSIGNED_BYTE with size 4 are supported.'));
    return attr.normalized ? 1 : attr.size;
  }
  function getAttributesItemsCount(attrs) {
    var res = 0;
    attrs.forEach(function(attr) {
      return res += getAttributeItemsCount(attr);
    });
    return res;
  }
  function loadShader(type, gl, source) {
    var glType = type === "VERTEX" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    var shader = gl.createShader(glType);
    if (shader === null) {
      throw new Error("loadShader: error while creating the shader");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var successfullyCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!successfullyCompiled) {
      var infoLog = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("loadShader: error while compiling the shader:\n".concat(infoLog, "\n").concat(source));
    }
    return shader;
  }
  function loadVertexShader(gl, source) {
    return loadShader("VERTEX", gl, source);
  }
  function loadFragmentShader(gl, source) {
    return loadShader("FRAGMENT", gl, source);
  }
  function loadProgram(gl, shaders) {
    var program = gl.createProgram();
    if (program === null) {
      throw new Error("loadProgram: error while creating the program.");
    }
    var i, l;
    for (i = 0, l = shaders.length; i < l; i++) gl.attachShader(program, shaders[i]);
    gl.linkProgram(program);
    var successfullyLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!successfullyLinked) {
      var info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error("loadProgram: error while linking the program: ".concat(info));
    }
    return program;
  }
  function killProgram(_ref) {
    var gl = _ref.gl, buffer = _ref.buffer, program = _ref.program, vertexShader = _ref.vertexShader, fragmentShader = _ref.fragmentShader;
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
  }
  function numberToGLSLFloat(n) {
    return n % 1 === 0 ? n.toFixed(1) : n.toString();
  }
  var shapeInstanceRegistry = /* @__PURE__ */ new Map();
  var shapeIdMap = /* @__PURE__ */ new Map();
  var nextShapeId = 0;
  function getStaticAttributeDefault(shape, attr) {
    var _shape$variables;
    var declaredDefault = (_shape$variables = shape.variables) === null || _shape$variables === void 0 || (_shape$variables = _shape$variables[attr.source || attr.name.replace(/^a_/, "")]) === null || _shape$variables === void 0 ? void 0 : _shape$variables["default"];
    var value = typeof declaredDefault === "number" ? declaredDefault : typeof attr.defaultValue === "number" ? attr.defaultValue : 0;
    return numberToGLSLFloat(value);
  }
  function generateSDFCall(shape, uv, size) {
    var _shape$attributes;
    var attributeExpr = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : function(attr) {
      return "v_".concat(attr.name.replace(/^a_/, ""));
    };
    var params = [uv, size].concat(_toConsumableArray(shape.uniforms.filter(function(u) {
      return u.type === "float";
    }).map(function(u) {
      var _ref;
      return numberToGLSLFloat((_ref = u.value) !== null && _ref !== void 0 ? _ref : 0);
    })), _toConsumableArray(((_shape$attributes = shape.attributes) !== null && _shape$attributes !== void 0 ? _shape$attributes : []).map(attributeExpr)));
    return "sdf_".concat(shape.name, "(").concat(params.join(", "), ")");
  }
  function generateShapeSlug(shape) {
    var _shape$attributes2;
    var slug = shape.name;
    var nonZeroParams = shape.uniforms.filter(function(u) {
      return u.type === "float" && u.value !== void 0 && u.value !== 0;
    }).map(function(u) {
      return "".concat(u.name.replace("u_", ""), "=").concat(u.value);
    }).sort();
    var attributeParams = ((_shape$attributes2 = shape.attributes) !== null && _shape$attributes2 !== void 0 ? _shape$attributes2 : []).map(function(a) {
      var _a$source;
      return "".concat(a.name, "@").concat((_a$source = a.source) !== null && _a$source !== void 0 ? _a$source : "", "=").concat(getStaticAttributeDefault(shape, a));
    });
    var params = [].concat(_toConsumableArray(nonZeroParams), _toConsumableArray(attributeParams));
    if (params.length > 0) slug += "#" + params.join("#");
    return slug;
  }
  function registerShapeInstance(shape) {
    var slug = generateShapeSlug(shape);
    if (!shapeInstanceRegistry.has(slug)) {
      var uniformValues = {};
      var _iterator = _createForOfIteratorHelper(shape.uniforms), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var u = _step.value;
          if (u.type === "float" && u.value !== void 0) uniformValues[u.name] = u.value;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      shapeInstanceRegistry.set(slug, {
        shape,
        uniformValues,
        slug
      });
      shapeIdMap.set(slug, nextShapeId++);
    }
    return slug;
  }
  function getShapeId(slug) {
    var _shapeIdMap$get;
    return (_shapeIdMap$get = shapeIdMap.get(slug)) !== null && _shapeIdMap$get !== void 0 ? _shapeIdMap$get : -1;
  }
  function deduplicateShapeGLSL(shapes) {
    var glslParts = [];
    var seenHelpers = /* @__PURE__ */ new Set();
    var seenShapes = /* @__PURE__ */ new Set();
    var rotate2DPattern = /mat2 rotate2D\(float angle\)\s*\{[^}]+\}/;
    var _iterator2 = _createForOfIteratorHelper(shapes), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var shape = _step2.value;
        if (seenShapes.has(shape.name)) continue;
        seenShapes.add(shape.name);
        var glsl = shape.glsl;
        if (rotate2DPattern.test(glsl)) {
          if (seenHelpers.has("rotate2D")) glsl = glsl.replace(rotate2DPattern, "");
          else seenHelpers.add("rotate2D");
        }
        glslParts.push(glsl);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return glslParts.join("\n");
  }
  function getAllShapeGLSL() {
    return deduplicateShapeGLSL(Array.from(shapeInstanceRegistry.values()).map(function(r) {
      return r.shape;
    }));
  }
  function generateShapeSelectorGLSL(dynamicAttributeNames) {
    var shapes = Array.from(shapeInstanceRegistry.entries());
    if (shapes.length === 0) {
      return (
        /*glsl*/
        "\nfloat querySDF(int shapeId, vec2 uv, float size) {\n  return length(uv) - size;\n}\n"
      );
    }
    var cases = shapes.map(function(_ref2, index) {
      var _ref3 = _slicedToArray(_ref2, 2), slug = _ref3[0], shape = _ref3[1].shape;
      var sdfCall = generateSDFCall(shape, "uv", "size", function(a) {
        var name = a.name.replace(/^a_/, "");
        return dynamicAttributeNames !== null && dynamicAttributeNames !== void 0 && dynamicAttributeNames.has(name) ? "g_".concat(name) : getStaticAttributeDefault(shape, a);
      });
      return "    case ".concat(index, ": return ").concat(sdfCall, "; // ").concat(slug);
    }).join("\n");
    return (
      /*glsl*/
      "\nfloat querySDF(int shapeId, vec2 uv, float size) {\n  switch (shapeId) {\n".concat(cases, "\n    default: return length(uv) - size;\n  }\n}\n")
    );
  }
  function getShapeGLSLForShapes(shapes) {
    return deduplicateShapeGLSL(shapes);
  }
  function dedupeShapeUniforms(shapes) {
    return _toConsumableArray(new Map(shapes.flatMap(function(s) {
      return s.uniforms;
    }).map(function(u) {
      return [u.name, u];
    })).values());
  }
  function generateNodeShapeSelectorGLSL(shapes, shapeGlobalIds) {
    if (shapes.length === 0) {
      return (
        /*glsl*/
        "\nvoid queryNodeSDF(int shapeId, vec2 uv, float size) {\n  context.sdf = length(uv) - size;\n  context.inradiusFactor = 1.0;\n}\n"
      );
    }
    var getSdfCall = function getSdfCall2(shape2) {
      return generateSDFCall(shape2, "uv", "size");
    };
    var getInradiusFactor = function getInradiusFactor2(shape2) {
      var _shape$inradiusFactor, _shape$inradiusFactor2;
      return (_shape$inradiusFactor = shape2.inradiusFactorGLSL) !== null && _shape$inradiusFactor !== void 0 ? _shape$inradiusFactor : numberToGLSLFloat((_shape$inradiusFactor2 = shape2.inradiusFactor) !== null && _shape$inradiusFactor2 !== void 0 ? _shape$inradiusFactor2 : 1);
    };
    if (shapes.length === 1) {
      var shape = shapes[0];
      return (
        /*glsl*/
        "\nvoid queryNodeSDF(int shapeId, vec2 uv, float size) {\n  context.sdf = ".concat(getSdfCall(shape), ";\n  context.inradiusFactor = ").concat(getInradiusFactor(shape), ";\n}\n")
      );
    }
    var cases = shapes.map(function(shape2, index) {
      return "    case ".concat(index, ": // ").concat(shape2.name, "\n      context.sdf = ").concat(getSdfCall(shape2), ";\n      context.inradiusFactor = ").concat(getInradiusFactor(shape2), ";\n      break;");
    }).join("\n");
    var defaultShape = shapes[0];
    var globalToLocalFunction = "";
    var shapeIdExpr = "shapeId";
    if (shapeGlobalIds && shapeGlobalIds.length > 1) {
      var conversionCases = shapeGlobalIds.map(function(globalId, localIndex) {
        return "    case ".concat(globalId, ": return ").concat(localIndex, "; // ").concat(shapes[localIndex].name);
      }).join("\n");
      globalToLocalFunction = /*glsl*/
      "\nint globalToLocalShapeId(int globalId) {\n  switch (globalId) {\n".concat(conversionCases, "\n    default: return 0;\n  }\n}\n");
      shapeIdExpr = "globalToLocalShapeId(shapeId)";
    }
    return (
      /*glsl*/
      "".concat(globalToLocalFunction, "\nvoid queryNodeSDF(int shapeId, vec2 uv, float size) {\n  switch (").concat(shapeIdExpr, ") {\n").concat(cases, "\n    default:\n      context.sdf = ").concat(getSdfCall(defaultShape), ";\n      context.inradiusFactor = ").concat(getInradiusFactor(defaultShape), ";\n  }\n}\n")
    );
  }
  var POSITION_MODE_MAP = {
    right: 0,
    left: 1,
    above: 2,
    below: 3,
    over: 4
  };
  var DEFAULT_LABEL_MARGIN = 5;
  var DEFAULT_LABEL_BACKGROUND_PADDING = 3;
  var GLSL_NODE_SIZE_TO_PIXELS = (
    /*glsl*/
    "\nfloat matrixScaleX = length(vec2(u_matrix[0][0], u_matrix[1][0]));\nfloat nodeRadiusGraphSpace = nodeSize * u_correctionRatio / u_sizeRatio * 2.0;\nfloat nodeRadiusNDC = nodeRadiusGraphSpace * matrixScaleX;\nfloat nodeRadiusPixels = nodeRadiusNDC * u_resolution.x / 2.0;\n"
  );
  var GLSL_ROTATE_2D = (
    /*glsl*/
    "\nmat2 rotate2D(float angle) {\n  float c = cos(angle);\n  float s = sin(angle);\n  return mat2(c, -s, s, c);\n}\n"
  );
  var GLSL_GET_LABEL_DIRECTION = (
    /*glsl*/
    "\nvec2 getLabelDirection(float positionMode) {\n  if (positionMode < 0.5) return vec2(1.0, 0.0);   // Right\n  if (positionMode < 1.5) return vec2(-1.0, 0.0);  // Left\n  if (positionMode < 2.5) return vec2(0.0, -1.0);  // Above\n  if (positionMode < 3.5) return vec2(0.0, 1.0);   // Below\n  return vec2(0.0);                                 // Over (centered)\n}\n"
  );
  var GLSL_SDF_BOX = (
    /*glsl*/
    "\nfloat sdfBox(vec2 p, vec2 halfSize) {\n  vec2 d = abs(p) - halfSize;\n  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);\n}\n"
  );
  var GLSL_SDF_ROTATED_BOX = (
    /*glsl*/
    "\nfloat sdfRotatedBox(vec2 p, vec2 halfSize, float angle) {\n  float c = cos(-angle);\n  float s = sin(-angle);\n  vec2 rotatedP = mat2(c, -s, s, c) * p;\n  return sdfBox(rotatedP, halfSize);\n}\n"
  );
  var GLSL_SDF_ROUNDED_BOX = (
    /*glsl*/
    "\nfloat sdfRoundedBox(vec2 p, vec2 halfSize, float radius) {\n  vec2 d = abs(p) - halfSize + radius;\n  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;\n}\n"
  );
  var GLSL_SDF_ROUNDED_ROTATED_BOX = (
    /*glsl*/
    "\nfloat sdfRoundedRotatedBox(vec2 p, vec2 halfSize, float angle, float radius) {\n  float c = cos(-angle);\n  float s = sin(-angle);\n  vec2 rotatedP = mat2(c, -s, s, c) * p;\n  return sdfRoundedBox(rotatedP, halfSize, radius);\n}\n"
  );
  var GLSL_LABEL_BOX_CENTER = (
    /*glsl*/
    "\nvec2 labelBoxCenter(float positionMode, float labelStart, vec2 halfSize, float textHalfY) {\n  if (positionMode < 0.5) return vec2(labelStart + halfSize.x, 0.0);    // right\n  if (positionMode < 1.5) return vec2(-(labelStart + halfSize.x), 0.0); // left\n  if (positionMode < 2.5) return vec2(0.0, -(labelStart + textHalfY));  // above\n  if (positionMode < 3.5) return vec2(0.0, labelStart + textHalfY);     // below\n  return vec2(0.0);                                                     // over\n}\n"
  );
  var NODE_DATA_TEXELS_PER_NODE = 2;
  var GLSL_READ_NODE_DATA = (
    /*glsl*/
    "\nvec4 readNodeData(sampler2D nodeDataTexture, int nodeDataTextureWidth, int nodeIndex) {\n  int t = nodeIndex * ".concat(NODE_DATA_TEXELS_PER_NODE, ";\n  ivec2 coord = ivec2(t % nodeDataTextureWidth, t / nodeDataTextureWidth);\n  return texelFetch(nodeDataTexture, coord, 0);\n}\n")
  );
  var GLSL_READ_NODE_FLAGS = (
    /*glsl*/
    "\nvec4 readNodeFlags(sampler2D nodeDataTexture, int nodeDataTextureWidth, int nodeIndex) {\n  int t = nodeIndex * ".concat(NODE_DATA_TEXELS_PER_NODE, " + 1;\n  ivec2 coord = ivec2(t % nodeDataTextureWidth, t / nodeDataTextureWidth);\n  return texelFetch(nodeDataTexture, coord, 0);\n}\n")
  );
  var GLSL_READ_NODE_COLOR = (
    /*glsl*/
    "\nvec4 readNodeColor(sampler2D nodeDataTexture, int nodeDataTextureWidth, int nodeIndex) {\n  int t = nodeIndex * ".concat(NODE_DATA_TEXELS_PER_NODE, " + 1;\n  ivec2 coord = ivec2(t % nodeDataTextureWidth, t / nodeDataTextureWidth);\n  vec4 texel = texelFetch(nodeDataTexture, coord, 0);\n  float r = floor(texel.b / 65536.0);\n  float g = floor(mod(texel.b, 65536.0) / 256.0);\n  float b = mod(texel.b, 256.0);\n  return vec4(r / 255.0, g / 255.0, b / 255.0, texel.a);\n}\n")
  );
  var GLSL_READ_FRAME_TEXEL = (
    /*glsl*/
    "\nvec4 readFrameTexel(sampler2D frameTexture, int frameTextureWidth, int index) {\n  ivec2 coord = ivec2(index % frameTextureWidth, index / frameTextureWidth);\n  return texelFetch(frameTexture, coord, 0);\n}\n"
  );
  function generateFindEdgeDistanceForShapes(shapes, shapeGlobalIds) {
    var sdfCall = function sdfCall2(shape) {
      return generateSDFCall(shape, "uv", "size");
    };
    if (shapes.length === 1) {
      return {
        code: findEdgeDistanceLoop(sdfCall(shapes[0])),
        multiShape: false
      };
    }
    var cases = shapes.map(function(shape, index) {
      return "    case ".concat(shapeGlobalIds ? shapeGlobalIds[index] : index, ": return ").concat(sdfCall(shape), ";");
    }).join("\n");
    var code = (
      /*glsl*/
      "\nfloat queryShapeSDF(int shapeId, vec2 uv, float size) {\n  switch (shapeId) {\n".concat(cases, "\n    default: return ").concat(sdfCall(shapes[0]), ";\n  }\n}\nint g_shapeId;\n").concat(findEdgeDistanceLoop("queryShapeSDF(g_shapeId, uv, size)"), "\n")
    );
    return {
      code,
      multiShape: true
    };
  }
  function findEdgeDistanceLoop(sdfExpr) {
    return (
      /*glsl*/
      "\nfloat findEdgeDistance(vec2 direction, float size) {\n  float lo = 0.0, hi = 2.0;\n  for (int i = 0; i < 8; i++) {\n    float mid = (lo + hi) * 0.5;\n    vec2 uv = direction * mid;\n    if (".concat(sdfExpr, " < 0.0) lo = mid; else hi = mid;\n  }\n  return (lo + hi) * 0.5;\n}\n")
    );
  }
  function _superPropBase(t, o) {
    for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)); ) ;
    return t;
  }
  function _get() {
    return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
      var p = _superPropBase(e, t);
      if (p) {
        var n = Object.getOwnPropertyDescriptor(p, t);
        return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
      }
    }, _get.apply(null, arguments);
  }
  function _superPropGet(t, o, e, r) {
    var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e);
    return 2 & r && "function" == typeof p ? function(t2) {
      return p.apply(e, t2);
    } : p;
  }
  var INITIAL_CAPACITY = 1024;
  var GROWTH_FACTOR = 1.5;
  var HIDDEN_ITEM_INDEX = -1;
  var DataTexture = /* @__PURE__ */ (function() {
    function DataTexture2(gl, texelsPerItem) {
      var initialCapacity = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : INITIAL_CAPACITY;
      _classCallCheck(this, DataTexture2);
      _defineProperty(this, "texture", null);
      _defineProperty(this, "dirty", false);
      _defineProperty(this, "dirtyRangeStart", Infinity);
      _defineProperty(this, "dirtyRangeEnd", -1);
      _defineProperty(this, "indexMap", /* @__PURE__ */ new Map());
      _defineProperty(this, "freeIndices", []);
      _defineProperty(this, "nextIndex", 0);
      this.gl = gl;
      this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      this.TEXELS_PER_ITEM = texelsPerItem;
      this.capacity = this.roundUpToPowerOfTwo(initialCapacity);
      var dims = this.computeTextureDimensions(this.capacity);
      this.textureWidth = dims.width;
      this.textureHeight = dims.height;
      this.data = new Float32Array(this.textureWidth * this.textureHeight * 4);
      this.createTexture();
    }
    return _createClass(DataTexture2, [{
      key: "computeTextureDimensions",
      value: function computeTextureDimensions(itemCapacity) {
        var totalTexels = itemCapacity * this.TEXELS_PER_ITEM;
        var width = Math.min(totalTexels, this.maxTextureSize);
        var height = Math.ceil(totalTexels / width);
        return {
          width,
          height
        };
      }
      /**
       * Rounds up to next power of two for efficient WebGL texture sizing.
       */
    }, {
      key: "roundUpToPowerOfTwo",
      value: function roundUpToPowerOfTwo(n) {
        return Math.pow(2, Math.ceil(Math.log2(Math.max(1, n))));
      }
      /**
       * Creates the WebGL texture with appropriate format and filtering.
       */
    }, {
      key: "createTexture",
      value: function createTexture() {
        var gl = this.gl;
        this.texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureWidth, this.textureHeight, 0, gl.RGBA, gl.FLOAT, this.data);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
      }
      /**
       * Resizes the texture to accommodate more items.
       */
    }, {
      key: "resize",
      value: function resize(newCapacity) {
        if (newCapacity <= this.capacity) return;
        var targetCapacity = this.roundUpToPowerOfTwo(Math.ceil(newCapacity * GROWTH_FACTOR));
        var gl = this.gl;
        var newDims = this.computeTextureDimensions(targetCapacity);
        var newData = new Float32Array(newDims.width * newDims.height * 4);
        newData.set(this.data);
        if (this.texture) {
          gl.deleteTexture(this.texture);
        }
        this.data = newData;
        this.capacity = targetCapacity;
        this.textureWidth = newDims.width;
        this.textureHeight = newDims.height;
        this.createTexture();
        this.dirty = true;
        this.dirtyRangeStart = 0;
        this.dirtyRangeEnd = this.nextIndex;
      }
      /**
       * Allocates a texture index for an item.
       * Returns existing index if item already allocated.
       */
    }, {
      key: "allocate",
      value: function allocate(key) {
        var existing = this.indexMap.get(key);
        if (existing !== void 0) {
          return existing;
        }
        var index;
        if (this.freeIndices.length > 0) {
          index = this.freeIndices.pop();
        } else {
          index = this.nextIndex++;
          if (index >= this.capacity) {
            this.resize(index + 1);
          }
        }
        this.indexMap.set(key, index);
        return index;
      }
      /**
       * Frees an item's texture index for reuse.
       */
    }, {
      key: "free",
      value: function free(key) {
        var index = this.indexMap.get(key);
        if (index === void 0) return;
        this.indexMap["delete"](key);
        this.freeIndices.push(index);
        var texelBase = index * this.TEXELS_PER_ITEM * 4;
        for (var i = 0; i < this.TEXELS_PER_ITEM * 4; i++) {
          this.data[texelBase + i] = 0;
        }
        this.markDirty(index);
      }
      /**
       * Gets the texture index for an item.
       * Returns -1 if item not found.
       */
    }, {
      key: "getIndex",
      value: function getIndex(key) {
        var _this$indexMap$get;
        return (_this$indexMap$get = this.indexMap.get(key)) !== null && _this$indexMap$get !== void 0 ? _this$indexMap$get : -1;
      }
      /**
       * Checks if an item has been allocated.
       */
    }, {
      key: "has",
      value: function has(key) {
        return this.indexMap.has(key);
      }
      /**
       * Marks an item index as dirty for upload.
       */
    }, {
      key: "markDirty",
      value: function markDirty(index) {
        this.dirty = true;
        this.dirtyRangeStart = Math.min(this.dirtyRangeStart, index);
        this.dirtyRangeEnd = Math.max(this.dirtyRangeEnd, index + 1);
      }
      /**
       * Uploads dirty data to the GPU texture.
       * With 2D layout and multiple texels per item, uploads affected rows.
       */
    }, {
      key: "upload",
      value: function upload() {
        if (!this.dirty || !this.texture) return;
        var gl = this.gl, textureWidth = this.textureWidth;
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        var startTexel = this.dirtyRangeStart * this.TEXELS_PER_ITEM;
        var endTexel = Math.min(this.dirtyRangeEnd * this.TEXELS_PER_ITEM, this.capacity * this.TEXELS_PER_ITEM);
        if (startTexel < endTexel) {
          var startRow = Math.floor(startTexel / textureWidth);
          var endRow = Math.floor((endTexel - 1) / textureWidth);
          for (var row = startRow; row <= endRow; row++) {
            var rowStart = row * textureWidth;
            var rowEnd = Math.min(rowStart + textureWidth, this.capacity * this.TEXELS_PER_ITEM);
            var uploadStart = Math.max(startTexel, rowStart);
            var uploadEnd = Math.min(endTexel, rowEnd);
            if (uploadStart < uploadEnd) {
              var xOffset = uploadStart - rowStart;
              var width = uploadEnd - uploadStart;
              var subData = this.data.subarray(uploadStart * 4, uploadEnd * 4);
              gl.texSubImage2D(gl.TEXTURE_2D, 0, xOffset, row, width, 1, gl.RGBA, gl.FLOAT, subData);
            }
          }
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        this.dirty = false;
        this.dirtyRangeStart = Infinity;
        this.dirtyRangeEnd = -1;
      }
      /**
       * Binds the texture to a texture unit.
       */
    }, {
      key: "bind",
      value: function bind(textureUnit) {
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
      }
      /**
       * Gets the WebGL texture object.
       */
    }, {
      key: "getTexture",
      value: function getTexture() {
        return this.texture;
      }
      /**
       * Gets the current capacity (max items).
       */
    }, {
      key: "getCapacity",
      value: function getCapacity() {
        return this.capacity;
      }
      /**
       * Gets the texture width (needed for 2D coordinate calculation in shaders).
       */
    }, {
      key: "getTextureWidth",
      value: function getTextureWidth() {
        return this.textureWidth;
      }
      /**
       * Gets the texture height (needed to cover the full texture when rendering
       * into it).
       */
    }, {
      key: "getTextureHeight",
      value: function getTextureHeight() {
        return this.textureHeight;
      }
      /**
       * Gets the number of texels per item.
       */
    }, {
      key: "getTexelsPerItem",
      value: function getTexelsPerItem() {
        return this.TEXELS_PER_ITEM;
      }
      /**
       * Gets the number of allocated items.
       */
    }, {
      key: "getCount",
      value: function getCount() {
        return this.indexMap.size;
      }
      /**
       * Highest index ever allocated + 1. Unlike `getCount`, this spans freed
       * holes, so it bounds every live item's row (what a per-row `gl_VertexID`
       * pass must cover).
       */
    }, {
      key: "getHighWaterMark",
      value: function getHighWaterMark() {
        return this.nextIndex;
      }
      /**
       * Checks if there are pending changes to upload.
       */
    }, {
      key: "isDirty",
      value: function isDirty() {
        return this.dirty;
      }
      /**
       * Clears all item allocations (but keeps the texture).
       */
    }, {
      key: "clear",
      value: function clear() {
        this.indexMap.clear();
        this.freeIndices = [];
        this.nextIndex = 0;
        this.data.fill(0);
        this.dirty = true;
        this.dirtyRangeStart = 0;
        this.dirtyRangeEnd = this.capacity;
      }
      /** Recreates the GPU texture after a context loss, re-uploading the CPU-side data. */
    }, {
      key: "restore",
      value: function restore() {
        this.createTexture();
        this.dirty = false;
        this.dirtyRangeStart = Infinity;
        this.dirtyRangeEnd = -1;
      }
      /**
       * Destroys the texture and clears all data.
       */
    }, {
      key: "kill",
      value: function kill() {
        if (this.texture) {
          this.gl.deleteTexture(this.texture);
          this.texture = null;
        }
        this.indexMap.clear();
        this.freeIndices = [];
      }
    }]);
  })();
  function computeAttributeLayout(sources) {
    var offsets = {};
    var specs = {};
    var offset = 0;
    var _iterator = _createForOfIteratorHelper(sources), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var source = _step.value;
        var _iterator2 = _createForOfIteratorHelper(source.attributes), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var attr = _step2.value;
            var name = attr.name.replace(/^a_/, "");
            if (!(name in offsets)) {
              offsets[name] = offset;
              specs[name] = attr;
              offset += attr.size;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      floatsPerItem: offset,
      texelsPerItem: Math.max(1, Math.ceil(offset / 4)),
      offsets,
      specs
    };
  }
  var ItemAttributeTexture = /* @__PURE__ */ (function(_DataTexture2) {
    function ItemAttributeTexture2(gl, layout, initialCapacity) {
      var _this;
      _classCallCheck(this, ItemAttributeTexture2);
      _this = _callSuper(this, ItemAttributeTexture2, [gl, layout.texelsPerItem, initialCapacity]);
      _this.floatsPerItem = layout.floatsPerItem;
      return _this;
    }
    _inherits(ItemAttributeTexture2, _DataTexture2);
    return _createClass(ItemAttributeTexture2, [{
      key: "updateAllAttributes",
      value: function updateAllAttributes(key, packedData) {
        var index = this.indexMap.get(key);
        if (index === void 0) {
          index = this.allocate(key);
        }
        var baseOffset = index * this.TEXELS_PER_ITEM * 4;
        var length = Math.min(packedData.length, this.floatsPerItem);
        for (var i = 0; i < length; i++) {
          this.data[baseOffset + i] = packedData[i];
        }
        this.markDirty(index);
      }
      /**
       * Writes all attributes at an explicit row, bypassing key allocation.
       * For rows owned by another allocator (e.g. EdgeDataTexture).
       */
    }, {
      key: "updateAllAttributesAtRow",
      value: function updateAllAttributesAtRow(row, packedData) {
        if (row >= this.capacity) this.resize(row + 1);
        var baseOffset = row * this.TEXELS_PER_ITEM * 4;
        var length = Math.min(packedData.length, this.floatsPerItem);
        for (var i = 0; i < length; i++) {
          this.data[baseOffset + i] = packedData[i];
        }
        this.markDirty(row);
      }
    }]);
  })(DataTexture);
  function buildAttrDescriptors(sources, layout, lifecycleMap) {
    var descriptors = [];
    var seen = /* @__PURE__ */ new Set();
    for (var srcIdx = 0; srcIdx < sources.length; srcIdx++) {
      var source = sources[srcIdx];
      var _iterator3 = _createForOfIteratorHelper(source.attributes), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var attr = _step3.value;
          var name = attr.name.replace(/^a_/, "");
          if (seen.has(name)) continue;
          seen.add(name);
          var offset = layout.offsets[name];
          if (offset === void 0) continue;
          var hooks = lifecycleMap === null || lifecycleMap === void 0 ? void 0 : lifecycleMap.get(srcIdx);
          descriptors.push({
            sourceKey: attr.source || name,
            packedOffset: offset,
            size: attr.size,
            isColor: attr.size === 4 && !!attr.normalized,
            defaultNum: typeof attr.defaultValue === "number" ? attr.defaultValue : attr.defaultValue === true ? 1 : 0,
            defaultColor: typeof attr.defaultValue === "string" ? attr.defaultValue : "",
            sourceIndex: srcIdx,
            hasLifecycleHook: !!(hooks !== null && hooks !== void 0 && hooks.getAttributeData)
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return descriptors;
  }
  function packAttributes(descriptors, data, packed, color, lifecycles, lifecycleIndexOffset) {
    packed.fill(0);
    for (var di = 0, dl = descriptors.length; di < dl; di++) {
      var d = descriptors[di];
      var off = d.packedOffset;
      var value = void 0;
      if (d.hasLifecycleHook) {
        var hooks = lifecycles.get(d.sourceIndex - lifecycleIndexOffset);
        value = hooks.getAttributeData(data, d.sourceKey);
        if (value === null) value = data[d.sourceKey];
      } else {
        value = data[d.sourceKey];
      }
      if (d.isColor) {
        var colorStr = typeof value === "string" ? value : d.defaultColor || color;
        var _colorToArray = colorToArray(colorStr), _colorToArray2 = _slicedToArray(_colorToArray, 4), r = _colorToArray2[0], g = _colorToArray2[1], b = _colorToArray2[2], a = _colorToArray2[3];
        packed[off] = r / 255;
        packed[off + 1] = g / 255;
        packed[off + 2] = b / 255;
        packed[off + 3] = a / 255;
      } else if (d.size === 1) {
        packed[off] = typeof value === "number" ? value : typeof value === "boolean" ? value ? 1 : 0 : d.defaultNum;
      } else {
        var arr = Array.isArray(value) ? value : null;
        if (arr) {
          for (var i = 0; i < d.size; i++) {
            var _arr$i;
            packed[off + i] = (_arr$i = arr[i]) !== null && _arr$i !== void 0 ? _arr$i : 0;
          }
        }
      }
    }
  }
  var COMPONENTS = ["r", "g", "b", "a"];
  function generateAttributeTextureFetch(layout, naming) {
    var offsets = layout.offsets, specs = layout.specs, texelsPerItem = layout.texelsPerItem, floatsPerItem = layout.floatsPerItem;
    var attributeNames = Object.keys(offsets);
    if (attributeNames.length === 0 || floatsPerItem === 0) {
      return {
        fetchCode: "",
        varyingAssignments: ""
      };
    }
    var varPrefix = naming.varPrefix, baseTexelExpr = naming.baseTexelExpr, textureWidthUniform = naming.textureWidthUniform, textureSamplerUniform = naming.textureSamplerUniform, _naming$outputPrefix = naming.outputPrefix, outputPrefix = _naming$outputPrefix === void 0 ? "v_" : _naming$outputPrefix;
    var lines = [];
    lines.push("  int ".concat(varPrefix, "BaseTexel = ").concat(baseTexelExpr, ";"));
    lines.push("");
    for (var t = 0; t < texelsPerItem; t++) {
      lines.push("  ivec2 ".concat(varPrefix, "Coord").concat(t, " = ivec2((").concat(varPrefix, "BaseTexel + ").concat(t, ") % ").concat(textureWidthUniform, ", (").concat(varPrefix, "BaseTexel + ").concat(t, ") / ").concat(textureWidthUniform, ");"));
      lines.push("  vec4 ".concat(varPrefix, "Texel").concat(t, " = texelFetch(").concat(textureSamplerUniform, ", ").concat(varPrefix, "Coord").concat(t, ", 0);"));
    }
    lines.push("");
    var varyingLines = [];
    var _loop = function _loop2() {
      var name = _attributeNames[_i];
      var spec = specs[name];
      var offset = offsets[name];
      var texelIndex = Math.floor(offset / 4);
      var component = offset % 4;
      var texel = "".concat(varPrefix, "Texel").concat(texelIndex);
      var nextTexel = "".concat(varPrefix, "Texel").concat(texelIndex + 1);
      var fetchedVar = "".concat(varPrefix, "Fetched_").concat(name);
      if (spec.size === 1) {
        lines.push("  float ".concat(fetchedVar, " = ").concat(texel, ".").concat(COMPONENTS[component], ";"));
      } else if (spec.size === 4 && component === 0) {
        lines.push("  vec4 ".concat(fetchedVar, " = ").concat(texel, ";"));
      } else {
        var endComponent = component + spec.size;
        if (endComponent <= 4) {
          var glslType = "vec".concat(spec.size);
          var swizzle = COMPONENTS.slice(component, endComponent).join("");
          lines.push("  ".concat(glslType, " ").concat(fetchedVar, " = ").concat(texel, ".").concat(swizzle, ";"));
        } else {
          var _glslType = spec.size === 4 ? "vec4" : "vec".concat(spec.size);
          var firstParts = COMPONENTS.slice(component).map(function(c) {
            return "".concat(texel, ".").concat(c);
          });
          var secondParts = COMPONENTS.slice(0, endComponent - 4).map(function(c) {
            return "".concat(nextTexel, ".").concat(c);
          });
          var allParts = [].concat(_toConsumableArray(firstParts), _toConsumableArray(secondParts)).join(", ");
          lines.push("  ".concat(_glslType, " ").concat(fetchedVar, " = ").concat(_glslType, "(").concat(allParts, ");"));
        }
      }
      varyingLines.push("  ".concat(outputPrefix).concat(name, " = ").concat(fetchedVar, ";"));
    };
    for (var _i = 0, _attributeNames = attributeNames; _i < _attributeNames.length; _i++) {
      _loop();
    }
    return {
      fetchCode: lines.join("\n"),
      varyingAssignments: varyingLines.join("\n")
    };
  }
  function setGLSLUniform(gl, location, uniform) {
    if (!location || uniform.type === "sampler2D") return;
    switch (uniform.type) {
      case "float":
        gl.uniform1f(location, uniform.value);
        break;
      case "int":
      case "bool":
        gl.uniform1i(location, uniform.value);
        break;
      case "vec2":
        gl.uniform2fv(location, uniform.value);
        break;
      case "vec3":
        gl.uniform3fv(location, uniform.value);
        break;
      case "vec4":
        gl.uniform4fv(location, uniform.value);
        break;
      case "mat3":
        gl.uniformMatrix3fv(location, false, uniform.value);
        break;
      case "mat4":
        gl.uniformMatrix4fv(location, false, uniform.value);
        break;
    }
  }
  var SIZE_FACTOR_PER_ATTRIBUTE_TYPE = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, WebGL2RenderingContext.BOOL, 1), WebGL2RenderingContext.BYTE, 1), WebGL2RenderingContext.UNSIGNED_BYTE, 1), WebGL2RenderingContext.SHORT, 2), WebGL2RenderingContext.UNSIGNED_SHORT, 2), WebGL2RenderingContext.INT, 4), WebGL2RenderingContext.UNSIGNED_INT, 4), WebGL2RenderingContext.FLOAT, 4);
  function insertPickingModeDefine(shaderSource) {
    var versionMatch = shaderSource.match(/^(#version[^\n]*\n)/);
    if (versionMatch) {
      return versionMatch[1] + "#define PICKING_MODE\n" + shaderSource.slice(versionMatch[1].length);
    }
    return "#define PICKING_MODE\n" + shaderSource;
  }
  var Program = /* @__PURE__ */ (function() {
    function Program2(gl, _pickingBuffer, renderer) {
      _classCallCheck(this, Program2);
      _defineProperty(this, "floats", new Float32Array());
      _defineProperty(this, "ints", new Uint32Array());
      _defineProperty(this, "constantArray", new Float32Array());
      _defineProperty(this, "capacity", 0);
      _defineProperty(this, "verticesCount", 0);
      _defineProperty(this, "bufferGeneration", 0);
      _defineProperty(this, "uploadedGeneration", /* @__PURE__ */ new Map());
      _defineProperty(this, "constantBufferGeneration", 0);
      _defineProperty(this, "uploadedConstantGeneration", /* @__PURE__ */ new Map());
      _defineProperty(this, "renderOffset", 0);
      _defineProperty(this, "renderCount", -1);
      _defineProperty(this, "debugStats", {
        drawCalls: 0,
        verticesDrawn: 0,
        bufferUploadBytes: 0
      });
      _defineProperty(this, "shadersLogged", false);
      _defineProperty(this, "pickProgram", null);
      var def = this.getDefinition();
      this.VERTICES = def.VERTICES;
      this.VERTEX_SHADER_SOURCE = def.VERTEX_SHADER_SOURCE;
      this.FRAGMENT_SHADER_SOURCE = def.FRAGMENT_SHADER_SOURCE;
      this.UNIFORMS = def.UNIFORMS;
      this.ATTRIBUTES = def.ATTRIBUTES;
      this.METHOD = def.METHOD;
      this.CONSTANT_ATTRIBUTES = "CONSTANT_ATTRIBUTES" in def ? def.CONSTANT_ATTRIBUTES : [];
      this.CONSTANT_DATA = "CONSTANT_DATA" in def ? def.CONSTANT_DATA : [];
      this.isInstanced = "CONSTANT_ATTRIBUTES" in def;
      this.ATTRIBUTES_ITEMS_COUNT = getAttributesItemsCount(this.ATTRIBUTES);
      this.STRIDE = this.VERTICES * this.ATTRIBUTES_ITEMS_COUNT;
      this.renderer = renderer;
      this.normalProgram = this.getProgramInfo("normal", gl, def.VERTEX_SHADER_SOURCE, def.FRAGMENT_SHADER_SOURCE, null);
      this.pickProgram = this.getProgramInfo("pick", gl, insertPickingModeDefine(def.VERTEX_SHADER_SOURCE), insertPickingModeDefine(def.FRAGMENT_SHADER_SOURCE), null);
      if (this.isInstanced) {
        var constantAttributesItemsCount = getAttributesItemsCount(this.CONSTANT_ATTRIBUTES);
        if (this.CONSTANT_DATA.length !== this.VERTICES) throw new Error("Program: error while getting constant data (expected ".concat(this.VERTICES, " items, received ").concat(this.CONSTANT_DATA.length, " instead)"));
        this.constantArray = new Float32Array(this.CONSTANT_DATA.length * constantAttributesItemsCount);
        for (var i = 0; i < this.CONSTANT_DATA.length; i++) {
          var vector = this.CONSTANT_DATA[i];
          if (vector.length !== constantAttributesItemsCount) throw new Error("Program: error while getting constant data (one vector has ".concat(vector.length, " items instead of ").concat(constantAttributesItemsCount, ")"));
          for (var j = 0; j < vector.length; j++) this.constantArray[i * constantAttributesItemsCount + j] = vector[j];
        }
        this.STRIDE = this.ATTRIBUTES_ITEMS_COUNT;
      }
    }
    return _createClass(Program2, [{
      key: "kill",
      value: function kill() {
        killProgram(this.normalProgram);
        if (this.pickProgram) killProgram(this.pickProgram);
      }
    }, {
      key: "resetDebugStats",
      value: function resetDebugStats() {
        this.debugStats.drawCalls = 0;
        this.debugStats.verticesDrawn = 0;
        this.debugStats.bufferUploadBytes = 0;
      }
    }, {
      key: "getProgramInfo",
      value: function getProgramInfo(name, gl, vertexShaderSource, fragmentShaderSource, frameBuffer) {
        var buffer = gl.createBuffer();
        if (buffer === null) throw new Error("Program: error while creating the WebGL buffer.");
        var vertexShader = loadVertexShader(gl, vertexShaderSource);
        var fragmentShader = loadFragmentShader(gl, fragmentShaderSource);
        var program = loadProgram(gl, [vertexShader, fragmentShader]);
        var uniformLocations = {};
        this.UNIFORMS.forEach(function(uniformName) {
          var location = gl.getUniformLocation(program, uniformName);
          if (location) uniformLocations[uniformName] = location;
        });
        var attributeLocations = {};
        this.ATTRIBUTES.forEach(function(attr) {
          attributeLocations[attr.name] = gl.getAttribLocation(program, attr.name);
        });
        var constantBuffer;
        if (this.isInstanced) {
          this.CONSTANT_ATTRIBUTES.forEach(function(attr) {
            attributeLocations[attr.name] = gl.getAttribLocation(program, attr.name);
          });
          constantBuffer = gl.createBuffer();
          if (constantBuffer === null) throw new Error("Program: error while creating the WebGL constant buffer.");
        }
        return {
          name,
          program,
          gl,
          frameBuffer,
          buffer,
          constantBuffer: constantBuffer || {},
          uniformLocations,
          attributeLocations,
          isPicking: name === "pick",
          vertexShader,
          fragmentShader
        };
      }
    }, {
      key: "bindProgram",
      value: function bindProgram(program) {
        var _this = this;
        var offset = 0;
        var gl = program.gl, buffer = program.buffer;
        if (!this.isInstanced) {
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          offset = 0;
          this.ATTRIBUTES.forEach(function(attr) {
            return offset += _this.bindAttribute(attr, program, offset);
          });
          if (this.uploadedGeneration.get(buffer) !== this.bufferGeneration) {
            var _this$renderer;
            gl.bufferData(gl.ARRAY_BUFFER, this.floats, gl.DYNAMIC_DRAW);
            this.uploadedGeneration.set(buffer, this.bufferGeneration);
            if ((_this$renderer = this.renderer) !== null && _this$renderer !== void 0 && _this$renderer.getSetting("DEBUG_logRenderStats")) this.debugStats.bufferUploadBytes += this.floats.byteLength;
          }
        } else {
          gl.bindBuffer(gl.ARRAY_BUFFER, program.constantBuffer);
          offset = 0;
          this.CONSTANT_ATTRIBUTES.forEach(function(attr) {
            return offset += _this.bindAttribute(attr, program, offset, false);
          });
          if (this.uploadedConstantGeneration.get(program.constantBuffer) !== this.constantBufferGeneration) {
            var _this$renderer2;
            gl.bufferData(gl.ARRAY_BUFFER, this.constantArray, gl.STATIC_DRAW);
            this.uploadedConstantGeneration.set(program.constantBuffer, this.constantBufferGeneration);
            if ((_this$renderer2 = this.renderer) !== null && _this$renderer2 !== void 0 && _this$renderer2.getSetting("DEBUG_logRenderStats")) this.debugStats.bufferUploadBytes += this.constantArray.byteLength;
          }
          gl.bindBuffer(gl.ARRAY_BUFFER, program.buffer);
          offset = this.renderOffset * this.ATTRIBUTES_ITEMS_COUNT * Float32Array.BYTES_PER_ELEMENT;
          this.ATTRIBUTES.forEach(function(attr) {
            return offset += _this.bindAttribute(attr, program, offset, true);
          });
          if (this.uploadedGeneration.get(buffer) !== this.bufferGeneration) {
            var _this$renderer3;
            gl.bufferData(gl.ARRAY_BUFFER, this.floats, gl.DYNAMIC_DRAW);
            this.uploadedGeneration.set(buffer, this.bufferGeneration);
            if ((_this$renderer3 = this.renderer) !== null && _this$renderer3 !== void 0 && _this$renderer3.getSetting("DEBUG_logRenderStats")) this.debugStats.bufferUploadBytes += this.floats.byteLength;
          }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
      }
    }, {
      key: "unbindProgram",
      value: function unbindProgram(program) {
        var _this2 = this;
        if (!this.isInstanced) {
          this.ATTRIBUTES.forEach(function(attr) {
            return _this2.unbindAttribute(attr, program);
          });
        } else {
          this.CONSTANT_ATTRIBUTES.forEach(function(attr) {
            return _this2.unbindAttribute(attr, program, false);
          });
          this.ATTRIBUTES.forEach(function(attr) {
            return _this2.unbindAttribute(attr, program, true);
          });
        }
      }
    }, {
      key: "bindAttribute",
      value: function bindAttribute(attr, program, offset, setDivisor) {
        var sizeFactor = SIZE_FACTOR_PER_ATTRIBUTE_TYPE[attr.type];
        if (typeof sizeFactor !== "number") throw new Error('Program.bind: yet unsupported attribute type "'.concat(attr.type, '"'));
        var location = program.attributeLocations[attr.name];
        var gl = program.gl;
        if (location !== -1) {
          gl.enableVertexAttribArray(location);
          var stride = !this.isInstanced ? this.ATTRIBUTES_ITEMS_COUNT * Float32Array.BYTES_PER_ELEMENT : (setDivisor ? this.ATTRIBUTES_ITEMS_COUNT : getAttributesItemsCount(this.CONSTANT_ATTRIBUTES)) * Float32Array.BYTES_PER_ELEMENT;
          gl.vertexAttribPointer(location, attr.size, attr.type, attr.normalized || false, stride, offset);
          if (this.isInstanced && setDivisor) {
            gl.vertexAttribDivisor(location, 1);
          }
        }
        return attr.size * sizeFactor;
      }
    }, {
      key: "unbindAttribute",
      value: function unbindAttribute(attr, program, unsetDivisor) {
        var location = program.attributeLocations[attr.name];
        var gl = program.gl;
        if (location !== -1) {
          gl.disableVertexAttribArray(location);
          if (this.isInstanced && unsetDivisor) {
            gl.vertexAttribDivisor(location, 0);
          }
        }
      }
    }, {
      key: "reallocate",
      value: function reallocate(capacity) {
        if (capacity === this.capacity) return;
        this.capacity = capacity;
        this.verticesCount = this.VERTICES * capacity;
        this.floats = new Float32Array(!this.isInstanced ? this.verticesCount * this.ATTRIBUTES_ITEMS_COUNT : this.capacity * this.ATTRIBUTES_ITEMS_COUNT);
        this.ints = new Uint32Array(this.floats.buffer);
        this.invalidateBuffers();
      }
      /**
       * Mark GPU buffers as needing re-upload. Call this after modifying
       * the array data outside of reallocate.
       */
    }, {
      key: "invalidateBuffers",
      value: function invalidateBuffers() {
        this.bufferGeneration++;
        this.constantBufferGeneration++;
      }
    }, {
      key: "hasNothingToRender",
      value: function hasNothingToRender() {
        return this.verticesCount === 0;
      }
    }, {
      key: "setTypedUniform",
      value: function setTypedUniform(uniform, programInfo) {
        var _programInfo$uniformL;
        setGLSLUniform(programInfo.gl, (_programInfo$uniformL = programInfo.uniformLocations[uniform.name]) !== null && _programInfo$uniformL !== void 0 ? _programInfo$uniformL : null, uniform);
      }
    }, {
      key: "renderProgram",
      value: function renderProgram(params, programInfo) {
        var gl = programInfo.gl, program = programInfo.program, isPicking = programInfo.isPicking;
        if (isPicking) {
          gl.disable(gl.BLEND);
        } else {
          gl.enable(gl.BLEND);
        }
        gl.useProgram(program);
        this.setUniforms(params, programInfo);
        this.drawWebGL(this.METHOD, programInfo);
      }
    }, {
      key: "render",
      value: function render(params, offset, count) {
        var _this$renderer4;
        if (!this.shadersLogged && (_this$renderer4 = this.renderer) !== null && _this$renderer4 !== void 0 && _this$renderer4.getSetting("DEBUG_logShaders")) {
          this.shadersLogged = true;
          console.log("[sigma] DEBUG_logShaders: ".concat(this.constructor.name), {
            normal: {
              vertexShaderSource: this.VERTEX_SHADER_SOURCE,
              fragmentShaderSource: this.FRAGMENT_SHADER_SOURCE
            },
            pick: {
              vertexShaderSource: insertPickingModeDefine(this.VERTEX_SHADER_SOURCE),
              fragmentShaderSource: insertPickingModeDefine(this.FRAGMENT_SHADER_SOURCE)
            }
          });
        }
        if (this.hasNothingToRender()) return;
        this.renderOffset = offset !== null && offset !== void 0 ? offset : 0;
        this.renderCount = count !== null && count !== void 0 ? count : -1;
        var gl = this.normalProgram.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, params.width * params.pixelRatio, params.height * params.pixelRatio);
        this.bindProgram(this.normalProgram);
        this.renderProgram(params, this.normalProgram);
        this.unbindProgram(this.normalProgram);
        if (this.pickProgram && params.pickingFrameBuffer) {
          var pickingWidth = Math.ceil(params.width * params.pixelRatio / params.downSizingRatio);
          var pickingHeight = Math.ceil(params.height * params.pixelRatio / params.downSizingRatio);
          gl.bindFramebuffer(gl.FRAMEBUFFER, params.pickingFrameBuffer);
          gl.viewport(0, 0, pickingWidth, pickingHeight);
          this.bindProgram(this.pickProgram);
          this.renderProgram(params, this.pickProgram);
          this.unbindProgram(this.pickProgram);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          gl.viewport(0, 0, params.width * params.pixelRatio, params.height * params.pixelRatio);
        }
      }
    }, {
      key: "drawWebGL",
      value: function drawWebGL(method, _ref) {
        var _this$renderer5;
        var gl = _ref.gl;
        var count = this.renderCount >= 0 ? this.renderCount : this.capacity;
        if ((_this$renderer5 = this.renderer) !== null && _this$renderer5 !== void 0 && _this$renderer5.getSetting("DEBUG_logRenderStats")) {
          this.debugStats.drawCalls++;
          this.debugStats.verticesDrawn += count * this.VERTICES;
        }
        if (!this.isInstanced) {
          gl.drawArrays(method, this.renderOffset * this.VERTICES, count * this.VERTICES);
        } else {
          gl.drawArraysInstanced(method, 0, this.VERTICES, count);
        }
      }
    }]);
  })();
  var ATTACHMENT_GAP = 2;
  var ATTACHMENT_TEXTURE_UNIT = 7;
  var ATTACHMENT_PLACEMENT_MAP = {
    below: 0,
    above: 1,
    left: 2,
    right: 3
  };
  function generateVertexShader$4() {
    var shader = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\nuniform mat3 u_matrix;\nuniform vec2 u_resolution;\nuniform float u_labelPixelSnapping;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform float u_pixelRatio;\nuniform float u_labelMargin;\nuniform float u_zoomLabelSizeRatio;\n\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_nodeFrameTexture;\nuniform int u_nodeFrameTextureWidth;\n\n// Atlas size is fixed at 2048\xD72048 \u2014 matches AttachmentManager.ATLAS_SIZE.\nuniform sampler2D u_atlasTexture;\nconst vec2 u_atlasSize = vec2(2048.0);\n\n// Per-instance\nin float a_nodeIndex;           // node-data texture index\nin vec4 a_atlasRect;            // x, y, width, height in atlas pixels\nin vec2 a_attachmentSize;       // attachment dimensions (CSS px)\nin float a_positionMode;        // label position: 0=right 1=left 2=above 3=below 4=over\nin float a_attachmentPlacement; // 0=below 1=above 2=left 3=right (relative to label)\nin float a_labelWidth;          // label width (CSS px)\nin float a_labelHeight;         // label height: font line box (CSS px)\nin float a_textHeight;          // actual glyph height (CSS px)\nin float a_labelAngle;          // label rotation angle (radians)\n\n// Per-vertex (constant)\nin vec2 a_quadCorner;           // [-1,-1], [1,-1], [-1,1], [1,1]\n\nout vec2 v_texCoord;\n\n".concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n").concat(GLSL_READ_FRAME_TEXEL, "\n").concat(GLSL_LABEL_BOX_CENTER, "\n").concat(GLSL_ROTATE_2D, "\n\nvoid main() {\n  int nodeIdx = int(a_nodeIndex);\n\n  // Node data: (x, y, size, shapeId).\n  vec4 nodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  vec2 nodePos = nodeData.xy;\n  float nodeSize = nodeData.z;\n\n  // Normalized edge distance from the shared frame texture (the frame-pass ran\n  // the SDF search once; we just read the result).\n  float edgeDist = readFrameTexel(u_nodeFrameTexture, u_nodeFrameTextureWidth, nodeIdx).r;\n\n  // Per-node label rotation alignment: 0 = viewport, 1 = label turns with camera.\n  float labelRotation = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx).g;\n\n  vec3 nodeClip = u_matrix * vec3(nodePos, 1.0);\n\n  // Node radius in physical pixels (matches label/background).\n  float matrixScaleX = length(vec2(u_matrix[0][0], u_matrix[1][0]));\n  float nodeRadiusGraphSpace = nodeSize * u_correctionRatio / u_sizeRatio * 2.0;\n  float nodeRadiusPixels = nodeRadiusGraphSpace * matrixScaleX * u_resolution.x / 2.0;\n\n  // CSS-px inputs -> physical px, scaled by the zoom-dependent label ratio, so\n  // the attachment stays glued to the label box exactly as the label scales.\n  float zoomScale = u_zoomLabelSizeRatio;\n  vec2 labelHalf = vec2(a_labelWidth, a_labelHeight) * 0.5 * zoomScale * u_pixelRatio;\n  vec2 attachHalf = a_attachmentSize * 0.5 * zoomScale * u_pixelRatio;\n  float gap = ").concat(ATTACHMENT_GAP.toFixed(1), " * zoomScale * u_pixelRatio;\n  float labelMargin = u_labelMargin * zoomScale * u_pixelRatio;\n\n  // Graph-aligned labels add the camera angle so the attachment orbits with the box.\n  mat2 labelRotMat = rotate2D(a_labelAngle - labelRotation * u_cameraAngle);\n\n  // Label box center relative to the node center (pre-rotation). The shape-aware\n  // edge distance comes from the frame texture, so placement matches the label.\n  vec2 boxCenter = vec2(0.0);\n  if (a_positionMode < 4.0) {\n    float labelStart = nodeRadiusPixels * edgeDist + labelMargin;\n    float textHalf = a_textHeight * 0.5 * zoomScale * u_pixelRatio;\n    boxCenter = labelBoxCenter(a_positionMode, labelStart, labelHalf, textHalf);\n  }\n\n  // Horizontal anchor of below/above attachments tracks the label position, so\n  // the attachment hangs from the label edge nearest the node (or is centered\n  // when the label itself is node-centered): right->left, left->right, else center.\n  float anchorX = 0.0;\n  if (a_positionMode < 0.5) anchorX = -labelHalf.x + attachHalf.x;       // right label\n  else if (a_positionMode < 1.5) anchorX = labelHalf.x - attachHalf.x;   // left label\n\n  // Attachment center relative to the box (pre-rotation, Y-down). This offset\n  // depends only on the box, the gap and the attachment size \u2014 never the shape.\n  vec2 attachCenter;\n  if (a_attachmentPlacement < 0.5) {\n    // below\n    attachCenter = boxCenter + vec2(anchorX, labelHalf.y + gap + attachHalf.y);\n  } else if (a_attachmentPlacement < 1.5) {\n    // above\n    attachCenter = boxCenter + vec2(anchorX, -(labelHalf.y + gap + attachHalf.y));\n  } else if (a_attachmentPlacement < 2.5) {\n    // left, top-aligned\n    attachCenter = boxCenter + vec2(-(labelHalf.x + gap + attachHalf.x), -labelHalf.y + attachHalf.y);\n  } else {\n    // right, top-aligned\n    attachCenter = boxCenter + vec2(labelHalf.x + gap + attachHalf.x, -labelHalf.y + attachHalf.y);\n  }\n\n  // Rotate the whole assembly by the label angle, around the node center.\n  vec2 rotatedCenter = labelRotMat * attachCenter;\n  vec2 cornerOffset = labelRotMat * (a_quadCorner * attachHalf);\n\n  // Node center in screen px (Y-down).\n  vec2 nodeScreen = vec2(\n    (nodeClip.x + 1.0) * u_resolution.x,\n    (1.0 - nodeClip.y) * u_resolution.y\n  ) * 0.5;\n\n  // Snap node center to the pixel grid so label/backdrop/attachment move as one.\n  vec2 snapDelta = (round(nodeScreen) - nodeScreen) * u_labelPixelSnapping;\n\n  // Snap the quad's top-left to integer pixels so atlas texels map 1:1.\n  vec2 centerScreen = nodeScreen + rotatedCenter + snapDelta;\n  vec2 topLeft = centerScreen - attachHalf;\n  topLeft = mix(topLeft, round(topLeft), u_labelPixelSnapping);\n  centerScreen = topLeft + attachHalf;\n\n  vec2 vertexScreen = centerScreen + cornerOffset;\n  gl_Position = vec4(\n    vertexScreen.x * 2.0 / u_resolution.x - 1.0,\n    1.0 - vertexScreen.y * 2.0 / u_resolution.y,\n    0.0, 1.0\n  );\n\n  vec2 texOrigin = a_atlasRect.xy / u_atlasSize;\n  vec2 texSize = a_atlasRect.zw / u_atlasSize;\n  vec2 uv = (a_quadCorner + 1.0) / 2.0;\n  v_texCoord = texOrigin + uv * texSize;\n}\n")
    );
    return shader;
  }
  var FRAGMENT_SHADER$4 = (
    /*glsl*/
    "#version 300 es\nprecision highp float;\n\nuniform sampler2D u_atlasTexture;\n\nin vec2 v_texCoord;\n\nlayout(location = 0) out vec4 fragColor;\n#ifdef PICKING_MODE\nlayout(location = 1) out vec4 pickColor;\n#endif\n\nvoid main() {\n  // Canvas textures are premultiplied; output directly for (ONE, 1-SRC_ALPHA) blending\n  vec4 color = texture(u_atlasTexture, v_texCoord);\n  if (color.a < 0.01) discard;\n  fragColor = color;\n#ifdef PICKING_MODE\n  pickColor = vec4(0.0); // Attachments are not pickable\n#endif\n}\n"
  );
  function createAttachmentProgram(gl, pickingBuffer, renderer, options) {
    var _labelOptions$margin, _labelOptions$zoomToL;
    var _options$label = options.label, labelOptions = _options$label === void 0 ? {} : _options$label;
    var labelMargin = (_labelOptions$margin = labelOptions.margin) !== null && _labelOptions$margin !== void 0 ? _labelOptions$margin : DEFAULT_LABEL_MARGIN;
    var zoomToLabelSizeRatioFunction = (_labelOptions$zoomToL = labelOptions.zoomToLabelSizeRatioFunction) !== null && _labelOptions$zoomToL !== void 0 ? _labelOptions$zoomToL : function() {
      return 1;
    };
    var vertexShader = generateVertexShader$4();
    var fragmentShader = FRAGMENT_SHADER$4;
    var NodeAttachmentProgram = /* @__PURE__ */ (function(_Program) {
      function NodeAttachmentProgram2() {
        var _this;
        _classCallCheck(this, NodeAttachmentProgram2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _callSuper(this, NodeAttachmentProgram2, [].concat(args));
        _defineProperty(_this, "totalCount", 0);
        _defineProperty(_this, "bufferCapacity", 0);
        return _this;
      }
      _inherits(NodeAttachmentProgram2, _Program);
      return _createClass(NodeAttachmentProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          return {
            VERTICES: 4,
            VERTEX_SHADER_SOURCE: vertexShader,
            FRAGMENT_SHADER_SOURCE: fragmentShader,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: ["u_matrix", "u_resolution", "u_labelPixelSnapping", "u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_pixelRatio", "u_labelMargin", "u_zoomLabelSizeRatio", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_nodeFrameTexture", "u_nodeFrameTextureWidth", "u_atlasTexture"],
            ATTRIBUTES: [{
              name: "a_nodeIndex",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_atlasRect",
              size: 4,
              type: FLOAT2
            }, {
              name: "a_attachmentSize",
              size: 2,
              type: FLOAT2
            }, {
              name: "a_positionMode",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_attachmentPlacement",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_labelWidth",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_labelHeight",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_textHeight",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_labelAngle",
              size: 1,
              type: FLOAT2
            }],
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [[-1, -1], [1, -1], [-1, 1], [1, 1]]
          };
        }
      }, {
        key: "processAttachment",
        value: function processAttachment(offset, data) {
          var floats = this.floats;
          var i = offset * this.STRIDE;
          floats[i++] = data.nodeIndex;
          floats[i++] = data.atlasX;
          floats[i++] = data.atlasY;
          floats[i++] = data.atlasW;
          floats[i++] = data.atlasH;
          floats[i++] = data.attachWidth;
          floats[i++] = data.attachHeight;
          floats[i++] = data.positionMode;
          floats[i++] = data.attachmentPlacement;
          floats[i++] = data.labelWidth;
          floats[i++] = data.labelHeight;
          floats[i++] = data.textHeight;
          floats[i++] = data.labelAngle;
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, _ref) {
          var gl2 = _ref.gl, uniformLocations = _ref.uniformLocations;
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform2f(uniformLocations.u_resolution, params.width * params.pixelRatio, params.height * params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_labelPixelSnapping, params.labelPixelSnapping);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_labelMargin, NodeAttachmentProgram2.labelMargin);
          gl2.uniform1f(uniformLocations.u_zoomLabelSizeRatio, 1 / zoomToLabelSizeRatioFunction(params.zoomRatio));
          gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          gl2.uniform1i(uniformLocations.u_nodeFrameTexture, params.nodeFrameTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeFrameTextureWidth, params.nodeFrameTextureWidth);
          gl2.uniform1i(uniformLocations.u_atlasTexture, ATTACHMENT_TEXTURE_UNIT);
        }
      }, {
        key: "reallocateAttachments",
        value: function reallocateAttachments(count) {
          this.totalCount = count;
          if (count > this.bufferCapacity) {
            this.bufferCapacity = Math.max(count, Math.ceil(this.bufferCapacity * 1.5) || 10);
            _superPropGet(NodeAttachmentProgram2, "reallocate", this, 3)([this.bufferCapacity]);
          }
        }
      }, {
        key: "hasNothingToRender",
        value: function hasNothingToRender() {
          return this.totalCount === 0;
        }
      }, {
        key: "drawWebGL",
        value: function drawWebGL(method, _ref2) {
          var gl2 = _ref2.gl;
          if (this.totalCount === 0) return;
          gl2.drawArraysInstanced(method, 0, this.VERTICES, this.totalCount);
        }
      }]);
    })(Program);
    _defineProperty(NodeAttachmentProgram, "labelMargin", labelMargin);
    return new NodeAttachmentProgram(gl, pickingBuffer, renderer);
  }
  var LAYER_ATTRIBUTE_TEXTURE_UNIT = 5;
  function getNodeAttributeSources(shapes, layers) {
    return [].concat(_toConsumableArray(layers), _toConsumableArray(shapes.map(function(shape) {
      var _shape$attributes;
      return {
        attributes: (_shape$attributes = shape.attributes) !== null && _shape$attributes !== void 0 ? _shape$attributes : []
      };
    })));
  }
  function getShapeAttributeLayout(shapes, layers) {
    var layout = computeAttributeLayout(getNodeAttributeSources(shapes, layers));
    var names = new Set(shapes.flatMap(function(shape) {
      var _shape$attributes2;
      return (_shape$attributes2 = shape.attributes) !== null && _shape$attributes2 !== void 0 ? _shape$attributes2 : [];
    }).map(function(a) {
      return a.name.replace(/^a_/, "");
    }));
    var offsets = {};
    var specs = {};
    var _iterator = _createForOfIteratorHelper(names), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var name = _step.value;
        offsets[name] = layout.offsets[name];
        specs[name] = layout.specs[name];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _objectSpread2(_objectSpread2({}, layout), {}, {
      offsets,
      specs
    });
  }
  function generateVertexShader$3(shapes, layers) {
    var standardUniforms = /* @__PURE__ */ new Set(["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_pickingPadding", "u_nodeDataTexture", "u_layerAttributeTexture"]);
    var seenUniforms = /* @__PURE__ */ new Set();
    var shapeUniforms = shapes.flatMap(function(shape) {
      return shape.uniforms;
    }).filter(function(u) {
      if (standardUniforms.has(u.name) || seenUniforms.has(u.name)) return false;
      seenUniforms.add(u.name);
      return true;
    }).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var layerUniforms = layers.flatMap(function(layer) {
      return layer.uniforms;
    }).filter(function(u) {
      if (standardUniforms.has(u.name) || seenUniforms.has(u.name)) return false;
      seenUniforms.add(u.name);
      return true;
    }).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var attributeSources = getNodeAttributeSources(shapes, layers);
    var seenVaryings = /* @__PURE__ */ new Set();
    var layerVaryings = attributeSources.flatMap(function(source) {
      return source.attributes;
    }).filter(function(a) {
      var name = a.name.replace(/^a_/, "");
      if (seenVaryings.has(name)) return false;
      seenVaryings.add(name);
      return true;
    }).map(function(a) {
      var name = a.name.replace(/^a_/, "");
      var glslType = a.size === 1 ? "float" : "vec".concat(a.size);
      return "out ".concat(glslType, " v_").concat(name, ";");
    }).join("\n");
    var _generateAttributeTex = generateAttributeTextureFetch(computeAttributeLayout(attributeSources), {
      varPrefix: "layer",
      baseTexelExpr: "nodeIdx * u_layerAttributeTexelsPerNode",
      textureWidthUniform: "u_layerAttributeTextureWidth",
      textureSamplerUniform: "u_layerAttributeTexture"
    }), fetchCode = _generateAttributeTex.fetchCode, varyingAssignments = _generateAttributeTex.varyingAssignments;
    var glsl = (
      /*glsl*/
      "#version 300 es\n\n// Standard node attributes (per instance) - minimal buffer usage\nin float a_nodeIndex;  // Index into node data texture AND layer attribute texture\nin vec4 a_id;          // Node ID for picking\nin float a_opacity;    // Node opacity, applied once to the final fragment\n\n// Constant attributes (per vertex, same for all instances)\nin vec2 a_quadCorner;  // (-1,-1), (1,-1), (1,1), (-1,1) for quad corners\n\n// Standard uniforms\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\n#ifdef PICKING_MODE\nuniform float u_pickingPadding;\n#endif\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\n\n// Layer attribute texture uniforms\nuniform sampler2D u_layerAttributeTexture;\nuniform int u_layerAttributeTextureWidth;\nuniform int u_layerAttributeTexelsPerNode;\n\n".concat(shapeUniforms, "\n").concat(layerUniforms, "\n\n// Standard varyings\nout vec2 v_uv;                    // Normalized coordinates [-1, 1]\nout vec4 v_id;\nout float v_opacity;\nout float v_antialiasingWidth;    // Width for antialiasing in UV space\nout float v_pixelSize;            // Node size in pixels (for pixel-mode borders)\nout float v_pixelToUV;            // Conversion factor: multiply by this to convert screen pixels to UV units\nout float v_shapeId;              // Shape ID for multi-shape programs\n\n// Layer varyings\n").concat(layerVaryings, "\n\n// Node-data fetch helpers (geometry texel + rotation-flags texel)\n").concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n\nvoid main() {\n  // Fetch node geometry: vec4(x, y, size, shapeId).\n  int nodeIdx = int(a_nodeIndex);\n\n  // Hidden nodes are flagged with a negative row by NodeProgram.process(). Push\n  // the whole quad outside the clip volume: every vertex lands at the same\n  // out-of-range position, so the primitive is fully clipped and rasterizes\n  // nothing \u2014 neither to the frame buffer nor to the picking buffer.\n  if (nodeIdx < 0) {\n    gl_Position = vec4(2.0, 0.0, 0.0, 1.0);\n    v_id = vec4(0.0);\n    return;\n  }\n\n  vec4 nodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  vec2 a_position = nodeData.xy;\n  float a_size = nodeData.z;\n  v_shapeId = nodeData.w;  // Pass shape ID to fragment shader\n\n  // Per-node rotation alignment: 0 = viewport (screen-upright), 1 = graph.\n  float nodeRotation = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx).r;\n\n").concat(fetchCode, "\n\n  // Calculate the actual size in pixels\n  float size = a_size * u_correctionRatio / u_sizeRatio * 2.0;\n\n  // In PICKING_MODE, inflate the quad by nodePickingPadding pixels on each side\n  #ifdef PICKING_MODE\n    float paddedSize = size + u_pickingPadding * u_correctionRatio;\n    vec2 offset = a_quadCorner * paddedSize;\n  #else\n    vec2 offset = a_quadCorner * size;\n  #endif\n  // Counter-rotate the quad offset so viewport-aligned nodes stay upright as the\n  // camera turns. Graph-aligned nodes (nodeRotation=1) skip it and turn with the\n  // camera. The angle scales by (1 - nodeRotation) so both fall out of one path.\n  {\n    float ca = u_cameraAngle * (1.0 - nodeRotation);\n    float c = cos(ca);\n    float s = sin(ca);\n    offset = mat2(c, s, -s, c) * offset;\n  }\n  vec2 position = a_position + offset;\n\n  gl_Position = vec4(\n    (u_matrix * vec3(position, 1)).xy,\n    0,\n    1\n  );\n\n  // In PICKING_MODE, UV is scaled beyond [-1, 1] to match the inflated quad\n  #ifdef PICKING_MODE\n    v_uv = a_quadCorner * (paddedSize / size);\n  #else\n    v_uv = a_quadCorner;\n  #endif\n\n  // Pass ID to fragment shader\n  v_id = a_id;\n  v_opacity = a_opacity;\n\n  // Pass pixel size for layers that need pixel-mode calculations\n  // Multiply by 2 because 'size' is half-width (offset from center), not full diameter\n  v_pixelSize = size * 2.0;\n\n  // Conversion factor from screen pixels to UV units\n  // Same derivation as v_antialiasingWidth which represents ~1 pixel in UV space\n  // P pixels in UV space = P * u_correctionRatio / size\n  v_pixelToUV = u_correctionRatio / size;\n\n  // We use an antialiasing width of 1px (so v_pixelToUV)\n  v_antialiasingWidth = v_pixelToUV;\n\n  // Pass layer attributes to fragment shader (fetched from texture)\n").concat(varyingAssignments, "\n}\n")
    );
    return glsl;
  }
  function generateFragmentShader(shapes, layers, shapeGlobalIds) {
    var antialias = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
    var layerCalls = layers.map(function(layer, index) {
      var layerFunctionName = "layer_".concat(layer.name);
      var layerParams = [].concat(_toConsumableArray(layer.attributes.map(function(a) {
        return "v_".concat(a.name.replace(/^a_/, ""));
      })), _toConsumableArray(layer.uniforms.map(function(u) {
        return u.name;
      }))).join(", ");
      return "  // Layer ".concat(index + 1, ": ").concat(layer.name, "\n  color = blendOver(color, ").concat(layerFunctionName, "(").concat(layerParams, "));");
    }).join("\n\n");
    var standardFragmentUniforms = /* @__PURE__ */ new Set(["u_correctionRatio"]);
    var seenUniforms = /* @__PURE__ */ new Set();
    var shapeUniforms = shapes.flatMap(function(shape) {
      return shape.uniforms;
    }).filter(function(u) {
      if (standardFragmentUniforms.has(u.name) || seenUniforms.has(u.name)) return false;
      seenUniforms.add(u.name);
      return true;
    }).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var layerUniforms = layers.flatMap(function(layer) {
      return layer.uniforms;
    }).filter(function(u) {
      if (standardFragmentUniforms.has(u.name) || seenUniforms.has(u.name)) return false;
      seenUniforms.add(u.name);
      return true;
    }).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var seenVaryings = /* @__PURE__ */ new Set();
    var layerVaryings = getNodeAttributeSources(shapes, layers).flatMap(function(source) {
      return source.attributes;
    }).filter(function(a) {
      var name = a.name.replace(/^a_/, "");
      if (seenVaryings.has(name)) return false;
      seenVaryings.add(name);
      return true;
    }).map(function(a) {
      var name = a.name.replace(/^a_/, "");
      var glslType = a.size === 1 ? "float" : "vec".concat(a.size);
      return "in ".concat(glslType, " v_").concat(name, ";");
    }).join("\n");
    var shapeGLSL = getShapeGLSLForShapes(shapes);
    var shapeSelectorGLSL = generateNodeShapeSelectorGLSL(shapes, shapeGlobalIds);
    var glsl = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\n// Standard varyings\nin vec2 v_uv;\nin vec4 v_id;\nin float v_opacity;\nin float v_antialiasingWidth;\nin float v_pixelSize;\nin float v_pixelToUV;\nin float v_shapeId;  // Shape ID for multi-shape programs\n\n// Standard uniforms (needed for some layer calculations like pixel-mode borders)\nuniform float u_correctionRatio;\n#ifdef PICKING_MODE\nuniform float u_pickingPadding;\n#endif\n\n// Shape uniforms\n".concat(shapeUniforms, "\n\n// Layer uniforms\n").concat(layerUniforms, "\n\n// Layer varyings\n").concat(layerVaryings, '\n\n// Fragment output (single target - picking handled via separate pass)\nout vec4 fragColor;\n\n// LayerContext struct - provides rendering context to all layers\nstruct LayerContext {\n  float sdf;             // Signed distance from shape boundary (negative inside)\n  vec2 uv;               // UV coordinates [-1, 1], center at (0,0)\n  float shapeSize;       // Effective shape size (~diameter) in UV space (1.0 - aaWidth)\n  float shapeHalfSize;   // Effective shape half size (~radius) in UV space\n  float pixelSize;       // Node full size (~diameter) in screen pixels\n  float aaWidth;         // Anti-aliasing width for smooth transitions\n  float correctionRatio; // Scaling factor for consistent rendering across zoom levels\n  float pixelToUV;       // Conversion factor: multiply screen pixels by this to get UV units\n  float inradiusFactor;  // Ratio of inradius to circumradius (shape depth factor)\n};\n\nLayerContext context;  // Global instance, populated before layer calls\n\n// Alpha "over" compositing for layer blending\nvec4 blendOver(vec4 bg, vec4 fg) {\n  float a = fg.a;\n  return vec4(mix(bg.rgb, fg.rgb, a), bg.a + a * (1.0 - bg.a));\n}\n\n// SDF shape functions\n').concat(shapeGLSL, "\n\n// Shape selector function (sets context.sdf and context.inradiusFactor)\n").concat(shapeSelectorGLSL, "\n\n// Layer functions\n").concat(layers.map(function(layer) {
        return layer.glsl;
      }).join("\n\n"), '\n\nvoid main() {\n  // 1. Setup LayerContext (available to all layer functions)\n  context.shapeSize = 1.0 - v_antialiasingWidth;\n  context.shapeHalfSize = context.shapeSize * 0.5;\n  context.pixelSize = v_pixelSize;\n  context.uv = v_uv;\n  context.aaWidth = v_antialiasingWidth;\n  context.correctionRatio = u_correctionRatio;\n  context.pixelToUV = v_pixelToUV;\n\n  // Query shape SDF based on shapeId (sets context.sdf and context.inradiusFactor)\n  queryNodeSDF(int(v_shapeId), v_uv, context.shapeSize);\n\n  // 2. Early discard for pixels fully outside the shape (with AA margin)\n  // In PICKING_MODE, allow extra fragments up to the picking padding distance\n  #ifdef PICKING_MODE\n    if (context.sdf > u_pickingPadding * v_pixelToUV + context.aaWidth) discard;\n  #else\n    if (context.sdf > context.aaWidth) discard;\n  #endif\n\n  // 3. Apply layers sequentially with "over" compositing\n  vec4 color = vec4(0.0);\n\n').concat(layerCalls, "\n\n  #ifdef PICKING_MODE\n    // Picking pass: output node ID for pixels within the picking area.\n    if (context.sdf > u_pickingPadding * v_pixelToUV) discard;\n    fragColor = v_id;\n  #else\n").concat(antialias ? "    // Visual pass: apply antialiasing at shape boundary, node opacity once\n    // smoothstep provides smooth transition from opaque to transparent\n    float alpha = smoothstep(context.aaWidth, -context.aaWidth, context.sdf) * v_opacity;" : "    // Visual pass: hard-edged (no anti-aliasing gradient) shape boundary, node opacity applied once\n    float alpha = (context.sdf < 0.0 ? 1.0 : 0.0) * v_opacity;", "\n    // Mix with transparent to fade both color AND alpha together (avoids bright halo)\n    fragColor = mix(vec4(0.0), color, alpha);\n  #endif\n}\n")
    );
    return glsl;
  }
  function collectUniforms(shapes, layers) {
    var uniformNames = /* @__PURE__ */ new Set();
    uniformNames.add("u_matrix");
    uniformNames.add("u_sizeRatio");
    uniformNames.add("u_correctionRatio");
    uniformNames.add("u_cameraAngle");
    uniformNames.add("u_pickingPadding");
    uniformNames.add("u_nodeDataTexture");
    uniformNames.add("u_nodeDataTextureWidth");
    uniformNames.add("u_layerAttributeTexture");
    uniformNames.add("u_layerAttributeTextureWidth");
    uniformNames.add("u_layerAttributeTexelsPerNode");
    shapes.forEach(function(shape) {
      shape.uniforms.forEach(function(u) {
        return uniformNames.add(u.name);
      });
    });
    layers.forEach(function(layer) {
      layer.uniforms.forEach(function(u) {
        return uniformNames.add(u.name);
      });
    });
    return Array.from(uniformNames);
  }
  function collectAttributes(_layers) {
    var _WebGL2RenderingConte2 = WebGL2RenderingContext, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE, FLOAT2 = _WebGL2RenderingConte2.FLOAT;
    return [{
      name: "a_nodeIndex",
      size: 1,
      type: FLOAT2
    }, {
      name: "a_id",
      size: 4,
      type: UNSIGNED_BYTE2,
      normalized: true
    }, {
      name: "a_opacity",
      size: 1,
      type: FLOAT2
    }];
  }
  function generateShaders(options) {
    var shapes = options.shapes, layers = options.layers, shapeGlobalIds = options.shapeGlobalIds, _options$antialias = options.antialias, antialias = _options$antialias === void 0 ? true : _options$antialias;
    return {
      vertexShader: generateVertexShader$3(shapes, layers),
      fragmentShader: generateFragmentShader(shapes, layers, shapeGlobalIds, antialias),
      uniforms: collectUniforms(shapes, layers),
      attributes: collectAttributes()
    };
  }
  function shapeAttributeVaryings(shapes, layers, qualifier) {
    var _getShapeAttributeLay = getShapeAttributeLayout(shapes, layers), specs = _getShapeAttributeLay.specs;
    return Object.keys(specs).map(function(name) {
      return "flat ".concat(qualifier, " ").concat(specs[name].size === 1 ? "float" : "vec".concat(specs[name].size), " v_").concat(name, ";");
    }).join("\n");
  }
  function generateBackdropVertexShader(options) {
    var _shapes$0$inradiusFac, _shapes$0$inradiusFac2;
    var shapes = options.shapes, layers = options.layers, shapeGlobalIds = options.shapeGlobalIds;
    var attributeFetch = generateAttributeTextureFetch(getShapeAttributeLayout(shapes, layers), {
      varPrefix: "nodeAttr",
      baseTexelExpr: "nodeIdx * u_layerAttributeTexelsPerNode",
      textureWidthUniform: "u_layerAttributeTextureWidth",
      textureSamplerUniform: "u_layerAttributeTexture"
    });
    var inradiusFactorSelector = shapes.length === 1 ? "float inradiusFactor = ".concat(numberToGLSLFloat((_shapes$0$inradiusFac = shapes[0].inradiusFactor) !== null && _shapes$0$inradiusFac !== void 0 ? _shapes$0$inradiusFac : 1), ";") : "float inradiusFactor = ".concat(numberToGLSLFloat((_shapes$0$inradiusFac2 = shapes[0].inradiusFactor) !== null && _shapes$0$inradiusFac2 !== void 0 ? _shapes$0$inradiusFac2 : 1), ";\n  switch (int(shapeId)) {\n").concat(shapes.map(function(shape, index) {
      var _shape$inradiusFactor;
      var caseId = shapeGlobalIds ? shapeGlobalIds[index] : index;
      return "    case ".concat(caseId, ": inradiusFactor = ").concat(numberToGLSLFloat((_shape$inradiusFactor = shape.inradiusFactor) !== null && _shape$inradiusFactor !== void 0 ? _shape$inradiusFactor : 1), "; break;");
    }).join("\n"), "\n    default: break;\n  }");
    var glsl = (
      /*glsl*/
      "#version 300 es\n\nin float a_nodeIndex;\nin float a_labelWidth;\nin float a_labelHeight;\nin float a_textHeight;\nin float a_positionMode;\nin float a_labelAngle;\nin vec4 a_backdropColor;\nin vec4 a_backdropShadowColor;\nin float a_backdropShadowBlur;\nin float a_backdropPadding;\nin vec4 a_backdropBorderColor;\nin vec4 a_backdropExtra; // [borderWidth, cornerRadius, labelPadding, area]\nin vec2 a_labelBoxOffset;\nin vec2 a_quadCorner;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform vec2 u_resolution;\nuniform float u_pixelRatio;\nuniform float u_labelMargin;\nuniform float u_zoomLabelSizeRatio;\nuniform float u_labelPixelSnapping;\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_nodeFrameTexture;\nuniform int u_nodeFrameTextureWidth;\nuniform sampler2D u_layerAttributeTexture;\nuniform int u_layerAttributeTextureWidth;\nuniform int u_layerAttributeTexelsPerNode;\n\nout vec2 v_uv;\nout vec2 v_nodeCenter;\nout float v_nodeRadius;\nout vec2 v_labelCenter;\nout vec2 v_labelHalfSize;\nout float v_aaWidth;\nout float v_shapeId;\nout float v_nodeRotation;\nout float v_labelAngle;\nout vec4 v_backdropColor;\nout vec4 v_backdropShadowColor;\nout float v_backdropShadowBlur;\nout float v_backdropPadding;\nout vec4 v_backdropBorderColor;\nout float v_backdropBorderWidth;\nout float v_backdropCornerRadius;\nout float v_backdropArea;\n".concat(shapeAttributeVaryings(shapes, layers, "out"), "\n\n").concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n").concat(GLSL_READ_FRAME_TEXEL, "\n\nvoid main() {\n  int nodeIdx = int(a_nodeIndex);\n").concat(attributeFetch.fetchCode, "\n").concat(attributeFetch.varyingAssignments, "\n\n  // Node data: (x, y, size, shapeId). shapeId (global) is forwarded to the\n  // fragment shader, which keeps the shape SDF for the outline.\n  vec4 nodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  vec2 nodePosition = nodeData.xy;\n  float nodeSize = nodeData.z;\n  float shapeId = nodeData.w;\n\n  // Per-node rotation alignment (0 = viewport, 1 = graph). nodeRotation drives\n  // the fragment's shape outline; labelRotation turns the label box with camera.\n  vec4 nodeFlags = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  float nodeRotation = nodeFlags.r;\n  float labelRotation = nodeFlags.g;\n  v_nodeRotation = nodeRotation;\n\n  ").concat(GLSL_NODE_SIZE_TO_PIXELS, "\n  // CSS pixel attributes are multiplied by u_pixelRatio to match nodeRadiusPixels,\n  // which is already in physical pixels (nodeRadiusNDC * u_resolution.x / 2.0).\n  float padding = a_backdropPadding * u_pixelRatio;\n  float shadowBlur = a_backdropShadowBlur * u_pixelRatio;\n  // Unpack a_backdropExtra: [borderWidth, cornerRadius, labelPadding, area]\n  float borderWidth = a_backdropExtra.x * u_pixelRatio;\n  float cornerRadius = a_backdropExtra.y * u_pixelRatio;\n  float labelPad = a_backdropExtra.z * u_pixelRatio;\n  float backdropArea = a_backdropExtra.w;\n  // Use 2x shadowBlur so the Gaussian fully decays before the quad edge\n  float totalExpansion = shadowBlur * 2.0 + borderWidth;\n  float enlargedRadius = nodeRadiusPixels + padding;\n\n  // Circumscribed radius for the quad bounds. Non-circular shapes reach past\n  // their inradius out to their circumradius (= enlargedRadius / inradiusFactor),\n  // in any direction once rotated. The axis-aligned quad must contain that, or\n  // the fill/shadow gets clipped (square corners, triangle tip, etc.).\n  ").concat(inradiusFactorSelector, "\n  float boundRadius = enlargedRadius / inradiusFactor;\n\n  // Apply zoom-dependent label size scaling\n  float zoomScale = u_zoomLabelSizeRatio;\n  float labelW = a_labelWidth * zoomScale * u_pixelRatio;\n  float labelH = a_labelHeight * zoomScale * u_pixelRatio;\n  float labelMargin = u_labelMargin * zoomScale * u_pixelRatio;\n\n  // Only apply labelPad when a label is actually present\n  float effectiveLabelPad = labelW > 0.0 ? labelPad : 0.0;\n  vec2 labelHalfSize = vec2(labelW * 0.5 + effectiveLabelPad, labelH * 0.5 + effectiveLabelPad);\n  vec2 labelOffset = vec2(0.0);\n\n  // Effective label angle: intrinsic angle plus the camera angle when the label\n  // is graph-aligned, so the box orbits the node in lockstep with the frame-pass.\n  float labelAngle = a_labelAngle - labelRotation * u_cameraAngle;\n  float la_c = cos(labelAngle);\n  float la_s = sin(labelAngle);\n  mat2 labelRotMat = mat2(la_c, -la_s, la_s, la_c);\n\n  vec3 nodeClip = u_matrix * vec3(nodePosition, 1.0);\n  vec2 snapDelta = vec2(0.0);\n\n  if (labelW > 0.0) {\n    // labelW > 0.0 means this node's label is displayed, so the frame-pass wrote\n    // its edge distance this frame.\n    float edgeDistPixels = nodeRadiusPixels * readFrameTexel(u_nodeFrameTexture, u_nodeFrameTextureWidth, nodeIdx).r;\n    // labelMargin matches the label shader's margin (gap from node edge to text)\n    float labelStart = edgeDistPixels + labelMargin;\n    // Above/below center on the actual glyph height, not the font line box, so\n    // the box stays aligned with the rendered text (matches labelBoxCenter()).\n    float textHalf = a_textHeight * zoomScale * u_pixelRatio * 0.5;\n\n    // Snap node center to pixel grid so label/backdrop/attachment move as a unit\n    vec2 nodeScreen = vec2(\n      (nodeClip.x + 1.0) * u_resolution.x,\n      (1.0 - nodeClip.y) * u_resolution.y\n    ) * 0.5;\n    snapDelta = (round(nodeScreen) - nodeScreen) * u_labelPixelSnapping;\n\n    if (a_positionMode < 0.5) {\n      // Right: box spans from node center to text end + padding\n      float boxRightEdge = labelStart + labelW + labelPad;\n      labelOffset = vec2(boxRightEdge * 0.5, 0.0);\n      labelHalfSize.x = boxRightEdge * 0.5;\n    } else if (a_positionMode < 1.5) {\n      // Left: mirror of right\n      float boxLeftEdge = labelStart + labelW + labelPad;\n      labelOffset = vec2(-boxLeftEdge * 0.5, 0.0);\n      labelHalfSize.x = boxLeftEdge * 0.5;\n    } else if (a_positionMode < 2.5) {\n      // Above: text bottom at labelStart, centered horizontally\n      labelOffset = vec2(0.0, -(labelStart + textHalf));\n    } else if (a_positionMode < 3.5) {\n      // Below: text top at labelStart, centered horizontally\n      labelOffset = vec2(0.0, labelStart + textHalf);\n    }\n    // over (>=4): labelOffset stays (0,0) \u2014 text centered on the node.\n\n    // The attachment-cover shift is in label space (like the attachment itself),\n    // so rotate it together with the position offset \u2014 otherwise the box drifts\n    // off the attachment as the label angle grows.\n    labelOffset = labelRotMat * (labelOffset + a_labelBoxOffset * zoomScale * u_pixelRatio);\n  }\n\n  // For node-only mode, zero out label dimensions\n  if (backdropArea > 0.5 && backdropArea < 1.5) {\n    labelHalfSize = vec2(0.0);\n    labelOffset = vec2(0.0);\n  }\n\n  vec2 minBound, maxBound;\n\n  bool hasLabelBounds = labelW > 0.0 && (backdropArea > 1.5 || backdropArea < 0.5);\n\n  if (hasLabelBounds) {\n    // Union with label bounds (area=both) or label-only bounds (area=label)\n    vec2 labelMin, labelMax;\n\n    if (a_labelAngle != 0.0) {\n      vec2 corner1 = labelOffset + labelRotMat * vec2(-labelHalfSize.x, -labelHalfSize.y);\n      vec2 corner2 = labelOffset + labelRotMat * vec2(labelHalfSize.x, -labelHalfSize.y);\n      vec2 corner3 = labelOffset + labelRotMat * vec2(labelHalfSize.x, labelHalfSize.y);\n      vec2 corner4 = labelOffset + labelRotMat * vec2(-labelHalfSize.x, labelHalfSize.y);\n      labelMin = min(min(corner1, corner2), min(corner3, corner4));\n      labelMax = max(max(corner1, corner2), max(corner3, corner4));\n    } else {\n      labelMin = labelOffset - labelHalfSize;\n      labelMax = labelOffset + labelHalfSize;\n    }\n\n    if (backdropArea > 1.5) {\n      // Label-only: bounds from label rect only\n      minBound = labelMin - totalExpansion;\n      maxBound = labelMax + totalExpansion;\n    } else {\n      // Both: union of node + label\n      minBound = min(-vec2(boundRadius), labelMin) - totalExpansion;\n      maxBound = max(vec2(boundRadius), labelMax) + totalExpansion;\n    }\n  } else {\n    // Node-only or no visible label\n    float totalRadius = boundRadius + totalExpansion;\n    minBound = -vec2(totalRadius);\n    maxBound = vec2(totalRadius);\n  }\n\n  vec2 quadSize = maxBound - minBound;\n  vec2 quadCenter = (minBound + maxBound) * 0.5;\n\n  vec2 localPos = quadCenter + a_quadCorner * quadSize * 0.5 + snapDelta;\n  vec2 ndcOffset = localPos * 2.0 / u_resolution;\n  ndcOffset.y = -ndcOffset.y;\n\n  gl_Position = vec4(nodeClip.xy + ndcOffset, 0.0, 1.0);\n\n  v_uv = localPos;\n  v_nodeCenter = vec2(0.0);\n  v_nodeRadius = nodeRadiusPixels;\n  v_labelCenter = labelOffset;\n  v_labelHalfSize = labelHalfSize;\n  v_aaWidth = 1.0;\n  v_shapeId = shapeId;\n  v_labelAngle = labelAngle;\n  v_backdropColor = a_backdropColor;\n  v_backdropShadowColor = a_backdropShadowColor;\n  v_backdropShadowBlur = a_backdropShadowBlur;\n  v_backdropPadding = a_backdropPadding;\n  v_backdropBorderColor = a_backdropBorderColor;\n  v_backdropBorderWidth = borderWidth;\n  v_backdropCornerRadius = cornerRadius;\n  v_backdropArea = backdropArea;\n}\n")
    );
    return glsl;
  }
  function generateBackdropFragmentShader(options) {
    var shapes = options.shapes, layers = options.layers, shapeGlobalIds = options.shapeGlobalIds;
    var shapeGLSL = getShapeGLSLForShapes(shapes);
    var shapeUniformDeclarations = dedupeShapeUniforms(shapes).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var sdfCallGLSL = function sdfCallGLSL2(shape) {
      return generateSDFCall(shape, "nodeUV", "1.0");
    };
    var shapeCallCode;
    if (shapes.length === 1) {
      shapeCallCode = "float nodeSdfNormalized = ".concat(sdfCallGLSL(shapes[0]), ";");
    } else {
      var cases = shapes.map(function(shape, index) {
        var caseId = shapeGlobalIds ? shapeGlobalIds[index] : index;
        return "    case ".concat(caseId, ": nodeSdfNormalized = ").concat(sdfCallGLSL(shape), "; break;");
      }).join("\n");
      var defaultCall = sdfCallGLSL(shapes[0]);
      shapeCallCode = "float nodeSdfNormalized;\n  int shapeId = int(v_shapeId);\n  switch (shapeId) {\n".concat(cases, "\n    default: nodeSdfNormalized = ").concat(defaultCall, ";\n  }");
    }
    var nodeUVCode = "float effectiveRadius = max(enlargedRadius - cornerRadius, 0.01);\n  float ca = u_cameraAngle * v_nodeRotation;\n  float ca_c = cos(ca);\n  float ca_s = sin(ca);\n  vec2 rotatedScreenUV = mat2(ca_c, -ca_s, ca_s, ca_c) * screenUV;\n  vec2 nodeUV = vec2(rotatedScreenUV.x, -rotatedScreenUV.y) / effectiveRadius;";
    var glsl = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\nin vec2 v_uv;\nin vec2 v_nodeCenter;\nin float v_nodeRadius;\nin vec2 v_labelCenter;\nin vec2 v_labelHalfSize;\nin float v_aaWidth;\nin float v_shapeId;\nin float v_nodeRotation;\nin float v_labelAngle;\nin vec4 v_backdropColor;\nin vec4 v_backdropShadowColor;\nin float v_backdropShadowBlur;\nin float v_backdropPadding;\nin vec4 v_backdropBorderColor;\nin float v_backdropBorderWidth;\nin float v_backdropCornerRadius;\nin float v_backdropArea;\n".concat(shapeAttributeVaryings(shapes, layers, "in"), "\n\nuniform float u_cameraAngle;\n").concat(shapeUniformDeclarations, "\n\nlayout(location = 0) out vec4 fragColor;\nlayout(location = 1) out vec4 fragPicking;\n\n").concat(shapeGLSL, "\n").concat(GLSL_SDF_BOX, "\n").concat(GLSL_SDF_ROTATED_BOX, "\n").concat(GLSL_SDF_ROUNDED_BOX, "\n").concat(GLSL_SDF_ROUNDED_ROTATED_BOX, "\n\nvoid main() {\n  vec4 backdropColor = v_backdropColor;\n  vec4 shadowColor = v_backdropShadowColor;\n  float shadowBlur = v_backdropShadowBlur;\n  float padding = v_backdropPadding;\n  vec4 borderColor = v_backdropBorderColor;\n  float borderWidth = v_backdropBorderWidth;\n  float cornerRadius = v_backdropCornerRadius;\n\n  float enlargedRadius = v_nodeRadius + padding;\n  vec2 screenUV = v_uv - v_nodeCenter;\n  ").concat(nodeUVCode, "\n\n  // Query the correct shape SDF based on shapeId\n  ").concat(shapeCallCode, "\n  float nodeSdfPixels = nodeSdfNormalized * effectiveRadius - cornerRadius;\n\n  // Label SDF with optional corner radius and rotation\n  float labelSdfPixels;\n  if (v_labelHalfSize.x > 0.0) {\n    vec2 labelP = v_uv - v_labelCenter;\n    labelSdfPixels = sdfRoundedRotatedBox(labelP, v_labelHalfSize, v_labelAngle, cornerRadius);\n  } else {\n    labelSdfPixels = 10000.0;\n  }\n\n  // Select area: 0=both, 1=node, 2=label\n  float combinedSdf;\n  if (v_backdropArea > 1.5) {\n    combinedSdf = labelSdfPixels;\n  } else if (v_backdropArea > 0.5) {\n    combinedSdf = nodeSdfPixels;\n  } else {\n    combinedSdf = min(nodeSdfPixels, labelSdfPixels);\n  }\n\n  // Fill + border composite\n  float outerEdge = smoothstep(v_aaWidth, -v_aaWidth, combinedSdf);\n  vec4 background;\n  if (borderWidth > 0.5) {\n    float innerEdge = smoothstep(v_aaWidth, -v_aaWidth, combinedSdf + borderWidth);\n    float fillAlpha = innerEdge * backdropColor.a;\n    vec4 fill = vec4(backdropColor.rgb * fillAlpha, fillAlpha);\n    float borderAlpha = (outerEdge - innerEdge) * borderColor.a;\n    vec4 border = vec4(borderColor.rgb * borderAlpha, borderAlpha);\n    background = fill + border * (1.0 - fill.a);\n  } else {\n    float fillAlpha = outerEdge * backdropColor.a;\n    background = vec4(backdropColor.rgb * fillAlpha, fillAlpha);\n  }\n\n  // Gaussian-like shadow falloff (mimics canvas shadowBlur)\n  vec4 shadow = vec4(0.0);\n  float sigma = shadowBlur / 2.5;\n  if (sigma > 0.001) {\n    float shadowDist = max(0.0, combinedSdf);\n    float shadowAlpha = exp(-(shadowDist * shadowDist) / (2.0 * sigma * sigma)) * shadowColor.a;\n    shadow = vec4(shadowColor.rgb * shadowAlpha, shadowAlpha);\n  }\n\n  fragColor = background + shadow * (1.0 - background.a);\n  fragPicking = vec4(0.0);\n}\n")
    );
    return glsl;
  }
  function collectBackdropUniforms(shapes) {
    var uniforms = ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_resolution", "u_pixelRatio", "u_labelMargin", "u_zoomLabelSizeRatio", "u_labelPixelSnapping", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_nodeFrameTexture", "u_nodeFrameTextureWidth", "u_layerAttributeTexture", "u_layerAttributeTextureWidth", "u_layerAttributeTexelsPerNode"];
    var _iterator = _createForOfIteratorHelper(dedupeShapeUniforms(shapes)), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var uniform = _step.value;
        if (!uniforms.includes(uniform.name)) uniforms.push(uniform.name);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return uniforms;
  }
  function generateBackdropShaders(options) {
    return {
      vertexShader: generateBackdropVertexShader(options),
      fragmentShader: generateBackdropFragmentShader(options),
      uniforms: collectBackdropUniforms(options.shapes)
    };
  }
  function createBackdropProgram(gl, pickingBuffer, renderer, options) {
    var _labelOptions$margin, _labelOptions$zoomToL;
    var _options$label = options.label, labelOptions = _options$label === void 0 ? {} : _options$label, shapes = options.shapes, layers = options.layers, getAttributeTexture = options.getAttributeTexture, shapeGlobalIds = options.shapeGlobalIds;
    if (shapes.length === 0) {
      throw new Error("createBackdropProgram: at least one shape must be provided in 'shapes'");
    }
    var labelMargin = (_labelOptions$margin = labelOptions.margin) !== null && _labelOptions$margin !== void 0 ? _labelOptions$margin : 5;
    var zoomToLabelSizeRatioFunction = (_labelOptions$zoomToL = labelOptions.zoomToLabelSizeRatioFunction) !== null && _labelOptions$zoomToL !== void 0 ? _labelOptions$zoomToL : function() {
      return 1;
    };
    var shaderOptions = {
      shapes,
      layers,
      shapeGlobalIds
    };
    var generatedShaders = generateBackdropShaders(shaderOptions);
    var NodeBackdropProgram = /* @__PURE__ */ (function(_Program) {
      function NodeBackdropProgram2() {
        var _this;
        _classCallCheck(this, NodeBackdropProgram2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _callSuper(this, NodeBackdropProgram2, [].concat(args));
        _defineProperty(_this, "totalBackdropCount", 0);
        _defineProperty(_this, "bufferCapacity", 0);
        return _this;
      }
      _inherits(NodeBackdropProgram2, _Program);
      return _createClass(NodeBackdropProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          return {
            VERTICES: 4,
            VERTEX_SHADER_SOURCE: generatedShaders.vertexShader,
            FRAGMENT_SHADER_SOURCE: generatedShaders.fragmentShader,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: generatedShaders.uniforms,
            ATTRIBUTES: [
              {
                name: "a_nodeIndex",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelWidth",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelHeight",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_textHeight",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_positionMode",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelAngle",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_backdropColor",
                size: 4,
                type: FLOAT2
              },
              {
                name: "a_backdropShadowColor",
                size: 4,
                type: FLOAT2
              },
              {
                name: "a_backdropShadowBlur",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_backdropPadding",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_backdropBorderColor",
                size: 4,
                type: FLOAT2
              },
              // Packed: [borderWidth, cornerRadius, labelPadding, area]
              {
                name: "a_backdropExtra",
                size: 4,
                type: FLOAT2
              },
              {
                name: "a_labelBoxOffset",
                size: 2,
                type: FLOAT2
              }
            ],
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [[-1, -1], [1, -1], [-1, 1], [1, 1]]
          };
        }
      }, {
        key: "processBackdrop",
        value: function processBackdrop(offset, data) {
          var floats = this.floats, STRIDE = this.STRIDE;
          var i = offset * STRIDE;
          floats[i++] = data.nodeIndex;
          floats[i++] = data.labelWidth;
          floats[i++] = data.labelHeight;
          floats[i++] = data.textHeight;
          floats[i++] = POSITION_MODE_MAP[data.position];
          floats[i++] = data.labelAngle;
          floats[i++] = data.backdropColor[0];
          floats[i++] = data.backdropColor[1];
          floats[i++] = data.backdropColor[2];
          floats[i++] = data.backdropColor[3];
          floats[i++] = data.backdropShadowColor[0];
          floats[i++] = data.backdropShadowColor[1];
          floats[i++] = data.backdropShadowColor[2];
          floats[i++] = data.backdropShadowColor[3];
          floats[i++] = data.backdropShadowBlur;
          floats[i++] = data.backdropPadding;
          floats[i++] = data.backdropBorderColor[0];
          floats[i++] = data.backdropBorderColor[1];
          floats[i++] = data.backdropBorderColor[2];
          floats[i++] = data.backdropBorderColor[3];
          floats[i++] = data.backdropBorderWidth;
          floats[i++] = data.backdropCornerRadius;
          floats[i++] = data.backdropLabelPadding;
          floats[i++] = data.backdropArea;
          floats[i++] = data.labelBoxOffset[0];
          floats[i++] = data.labelBoxOffset[1];
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, programInfo) {
          var gl2 = programInfo.gl, uniformLocations = programInfo.uniformLocations;
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform2f(uniformLocations.u_resolution, params.width * params.pixelRatio, params.height * params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_labelMargin, NodeBackdropProgram2.labelMargin);
          gl2.uniform1f(uniformLocations.u_zoomLabelSizeRatio, 1 / zoomToLabelSizeRatioFunction(params.zoomRatio));
          gl2.uniform1f(uniformLocations.u_labelPixelSnapping, params.labelPixelSnapping);
          gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          gl2.uniform1i(uniformLocations.u_nodeFrameTexture, params.nodeFrameTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeFrameTextureWidth, params.nodeFrameTextureWidth);
          var attributeTexture = getAttributeTexture();
          if (uniformLocations.u_layerAttributeTexture && attributeTexture) {
            attributeTexture.bind(LAYER_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_layerAttributeTexture, LAYER_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_layerAttributeTextureWidth, attributeTexture.getTextureWidth());
            gl2.uniform1i(uniformLocations.u_layerAttributeTexelsPerNode, attributeTexture.getTexelsPerItem());
          }
          var _iterator = _createForOfIteratorHelper(dedupeShapeUniforms(shapes)), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var uniform = _step.value;
              this.setTypedUniform(uniform, programInfo);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "hasNothingToRender",
        value: function hasNothingToRender() {
          return this.totalBackdropCount === 0;
        }
      }, {
        key: "drawWebGL",
        value: function drawWebGL(method, _ref) {
          var gl2 = _ref.gl;
          if (this.totalBackdropCount === 0) return;
          if (!this.isInstanced) {
            gl2.drawArrays(method, 0, this.totalBackdropCount * this.VERTICES);
          } else {
            gl2.drawArraysInstanced(method, 0, this.VERTICES, this.totalBackdropCount);
          }
        }
      }, {
        key: "reallocate",
        value: function reallocate(backdropCount) {
          this.totalBackdropCount = backdropCount;
          if (backdropCount > this.bufferCapacity) {
            this.bufferCapacity = Math.max(backdropCount, Math.ceil(this.bufferCapacity * 1.5) || 10);
            _superPropGet(NodeBackdropProgram2, "reallocate", this, 3)([this.bufferCapacity]);
          }
        }
      }]);
    })(Program);
    _defineProperty(NodeBackdropProgram, "labelMargin", labelMargin);
    return new NodeBackdropProgram(gl, pickingBuffer, renderer);
  }
  var LabelProgram = /* @__PURE__ */ (function(_Program) {
    function LabelProgram2() {
      var _this;
      _classCallCheck(this, LabelProgram2);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, LabelProgram2, [].concat(args));
      _defineProperty(_this, "totalCharacterCount", 0);
      _defineProperty(_this, "bufferCapacity", 0);
      return _this;
    }
    _inherits(LabelProgram2, _Program);
    return _createClass(LabelProgram2, [{
      key: "processLabel",
      value: (
        /**
         * Process a label and write its character data to the GPU buffer.
         */
        function processLabel(_labelKey, offset, data) {
          if (data.hidden || !data.text) {
            return 0;
          }
          var text = data.text;
          var charCount = text.length;
          for (var i = 0; i < charCount; i++) {
            var _char = text[i];
            this.processCharacter(offset + i, data, _char, i);
          }
          return charCount;
        }
      )
      /**
       * Process a single character. Override in subclasses.
       *
       * @param index - Character index in the buffer
       * @param labelData - Parent label data
       * @param char - The character to process
       * @param charIndex - Index of character within the label text
       */
    }, {
      key: "hasNothingToRender",
      value: (
        /**
         * Check if there's nothing to render.
         */
        function hasNothingToRender() {
          return this.totalCharacterCount === 0;
        }
      )
      /**
       * Render all characters in the buffer.
       * Since we only process visible labels, all buffered characters should be rendered.
       */
    }, {
      key: "drawWebGL",
      value: function drawWebGL(method, _ref) {
        var gl = _ref.gl;
        if (this.totalCharacterCount === 0) return;
        if (!this.isInstanced) {
          gl.drawArrays(method, 0, this.totalCharacterCount * this.VERTICES);
        } else {
          gl.drawArraysInstanced(method, 0, this.VERTICES, this.totalCharacterCount);
        }
      }
      /**
       * Reallocate buffers if needed and set the character count for this frame.
       * Only reallocates GPU buffers when capacity is exceeded.
       *
       * @param characterCount - Number of characters to render this frame
       */
    }, {
      key: "reallocate",
      value: function reallocate(characterCount) {
        this.totalCharacterCount = characterCount;
        if (characterCount > this.bufferCapacity) {
          this.bufferCapacity = Math.max(characterCount, Math.ceil(this.bufferCapacity * 1.5) || 1e3);
          _superPropGet(LabelProgram2, "reallocate", this, 3)([this.bufferCapacity]);
        }
      }
    }]);
  })(Program);
  function generateVertexShader$2() {
    var shader = (
      /*glsl*/
      "#version 300 es\n\nin float a_nodeIndex;\nin vec4 a_id;\nin vec4 a_color;\nin float a_labelWidth;\nin float a_labelHeight;\nin float a_textHeight;\nin float a_positionMode;\nin float a_labelAngle;\nin float a_padding;\nin vec2 a_quadCorner;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform vec2 u_resolution;\nuniform float u_pixelRatio;\nuniform float u_labelMargin;\nuniform float u_zoomLabelSizeRatio;\nuniform float u_labelPixelSnapping;\nuniform float u_pickingPadding;\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_nodeFrameTexture;\nuniform int u_nodeFrameTextureWidth;\n\nout vec4 v_id;\nout vec4 v_color;\n\n".concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n").concat(GLSL_READ_FRAME_TEXEL, "\n").concat(GLSL_LABEL_BOX_CENTER, "\n\nvoid main() {\n  int nodeIdx = int(a_nodeIndex);\n\n  // Node data: (x, y, size, shapeId).\n  vec4 nodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  vec2 nodePosition = nodeData.xy;\n  float nodeSize = nodeData.z;\n\n  // Shape-aware edge distance, read once from the shared frame texture.\n  float edgeDist = readFrameTexel(u_nodeFrameTexture, u_nodeFrameTextureWidth, nodeIdx).r;\n\n  // Per-node label rotation alignment: 0 = viewport, 1 = label turns with camera.\n  float labelRotation = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx).g;\n\n  ").concat(GLSL_NODE_SIZE_TO_PIXELS, "\n\n  float zoomScale = u_zoomLabelSizeRatio;\n  float labelW = a_labelWidth * zoomScale * u_pixelRatio;\n  float labelH = a_labelHeight * zoomScale * u_pixelRatio;\n  float labelMargin = u_labelMargin * zoomScale * u_pixelRatio;\n#ifdef PICKING_MODE\n  float padding = u_pickingPadding * u_pixelRatio;\n#else\n  float padding = a_padding * u_pixelRatio;\n#endif\n\n  if (labelW <= 0.0) {\n    gl_Position = vec4(2.0, 0.0, 0.0, 1.0);\n    v_id = vec4(0.0);\n    v_color = vec4(0.0);\n    return;\n  }\n\n  vec2 labelHalfSize = vec2(labelW * 0.5 + padding, labelH * 0.5 + padding);\n  vec2 labelOffset = vec2(0.0);\n\n  // Graph-aligned labels add the camera angle so the rect orbits with the text.\n  float labelAngle = a_labelAngle - labelRotation * u_cameraAngle;\n  float la_c = cos(labelAngle);\n  float la_s = sin(labelAngle);\n  mat2 labelRotMat = mat2(la_c, -la_s, la_s, la_c);\n\n  vec3 nodeClip = u_matrix * vec3(nodePosition, 1.0);\n  vec2 nodeScreen = vec2(\n    (nodeClip.x + 1.0) * u_resolution.x,\n    (1.0 - nodeClip.y) * u_resolution.y\n  ) * 0.5;\n  vec2 snapDelta = (round(nodeScreen) - nodeScreen) * u_labelPixelSnapping;\n\n  if (a_positionMode < 4.0) {\n    float labelStart = nodeRadiusPixels * edgeDist + labelMargin;\n    float textHalf = a_textHeight * zoomScale * u_pixelRatio * 0.5;\n    // Box center uses the text half-size; the padding expands the quad below.\n    labelOffset = labelRotMat * labelBoxCenter(a_positionMode, labelStart, vec2(labelW * 0.5, labelH * 0.5), textHalf);\n  }\n\n  // Rotate the rect with the label so it stays aligned with the (rotated) text.\n  vec2 localPos = labelOffset + labelRotMat * (a_quadCorner * labelHalfSize);\n  vec2 ndcOffset = (localPos + snapDelta) * 2.0 / u_resolution;\n  ndcOffset.y = -ndcOffset.y;\n\n  gl_Position = vec4(nodeClip.xy + ndcOffset, 0.0, 1.0);\n  v_id = a_id;\n  v_color = a_color;\n}\n")
    );
    return shader;
  }
  var FRAGMENT_SHADER$3 = (
    /*glsl*/
    "#version 300 es\nprecision highp float;\n\nin vec4 v_id;\nin vec4 v_color;\n\nout vec4 fragColor;\n\nvoid main() {\n  #ifdef PICKING_MODE\n    fragColor = v_id;\n  #else\n    if (v_color.a <= 0.0) discard;\n    // v_color is non-premultiplied RGBA (0-1); convert to premultiplied for blending\n    fragColor = vec4(v_color.rgb * v_color.a, v_color.a);\n  #endif\n}\n"
  );
  function createLabelBackgroundProgram(gl, pickingBuffer, renderer, options) {
    var _labelOptions$margin, _labelOptions$zoomToL;
    var _options$label = options.label, labelOptions = _options$label === void 0 ? {} : _options$label;
    var labelMargin = (_labelOptions$margin = labelOptions.margin) !== null && _labelOptions$margin !== void 0 ? _labelOptions$margin : DEFAULT_LABEL_MARGIN;
    var zoomToLabelSizeRatioFunction = (_labelOptions$zoomToL = labelOptions.zoomToLabelSizeRatioFunction) !== null && _labelOptions$zoomToL !== void 0 ? _labelOptions$zoomToL : function() {
      return 1;
    };
    var vertexShader = generateVertexShader$2();
    var NodeLabelBackgroundProgram = /* @__PURE__ */ (function(_Program) {
      function NodeLabelBackgroundProgram2() {
        var _this;
        _classCallCheck(this, NodeLabelBackgroundProgram2);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _callSuper(this, NodeLabelBackgroundProgram2, [].concat(args));
        _defineProperty(_this, "totalCount", 0);
        _defineProperty(_this, "bufferCapacity", 0);
        return _this;
      }
      _inherits(NodeLabelBackgroundProgram2, _Program);
      return _createClass(NodeLabelBackgroundProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          return {
            VERTICES: 4,
            VERTEX_SHADER_SOURCE: vertexShader,
            FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER$3,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_resolution", "u_pixelRatio", "u_labelMargin", "u_zoomLabelSizeRatio", "u_labelPixelSnapping", "u_pickingPadding", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_nodeFrameTexture", "u_nodeFrameTextureWidth"],
            ATTRIBUTES: [{
              name: "a_nodeIndex",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_id",
              size: 4,
              type: UNSIGNED_BYTE2,
              normalized: true
            }, {
              name: "a_color",
              size: 4,
              type: UNSIGNED_BYTE2,
              normalized: true
            }, {
              name: "a_labelWidth",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_labelHeight",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_textHeight",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_positionMode",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_labelAngle",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_padding",
              size: 1,
              type: FLOAT2
            }],
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [[-1, -1], [1, -1], [-1, 1], [1, 1]]
          };
        }
      }, {
        key: "processLabelBackground",
        value: function processLabelBackground(offset, data) {
          var floats = this.floats, ints = this.ints;
          var i = offset * this.STRIDE;
          floats[i++] = data.nodeIndex;
          ints[i++] = data.id;
          floats[i++] = data.color;
          floats[i++] = data.labelWidth;
          floats[i++] = data.labelHeight;
          floats[i++] = data.textHeight;
          floats[i++] = data.positionMode;
          floats[i++] = data.labelAngle;
          floats[i++] = data.padding;
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, _ref) {
          var gl2 = _ref.gl, uniformLocations = _ref.uniformLocations;
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform2f(uniformLocations.u_resolution, params.width * params.pixelRatio, params.height * params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_labelMargin, NodeLabelBackgroundProgram2.labelMargin);
          gl2.uniform1f(uniformLocations.u_zoomLabelSizeRatio, 1 / zoomToLabelSizeRatioFunction(params.zoomRatio));
          gl2.uniform1f(uniformLocations.u_labelPixelSnapping, params.labelPixelSnapping);
          gl2.uniform1f(uniformLocations.u_pickingPadding, params.labelPickingPadding);
          gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          gl2.uniform1i(uniformLocations.u_nodeFrameTexture, params.nodeFrameTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeFrameTextureWidth, params.nodeFrameTextureWidth);
        }
      }, {
        key: "hasNothingToRender",
        value: function hasNothingToRender() {
          return this.totalCount === 0;
        }
      }, {
        key: "drawWebGL",
        value: function drawWebGL(_method, _ref2) {
          var gl2 = _ref2.gl;
          if (this.totalCount === 0) return;
          gl2.drawArraysInstanced(gl2.TRIANGLE_STRIP, 0, this.VERTICES, this.totalCount);
        }
      }, {
        key: "reallocate",
        value: function reallocate(count) {
          this.totalCount = count;
          if (count > this.bufferCapacity) {
            this.bufferCapacity = Math.max(count, Math.ceil(this.bufferCapacity * 1.5) || 10);
            _superPropGet(NodeLabelBackgroundProgram2, "reallocate", this, 3)([this.bufferCapacity]);
          }
        }
      }]);
    })(Program);
    _defineProperty(NodeLabelBackgroundProgram, "labelMargin", labelMargin);
    return new NodeLabelBackgroundProgram(gl, pickingBuffer, renderer);
  }
  var DEFAULT_SDF_ATLAS_OPTIONS = {
    fontSize: 64,
    buffer: 8,
    radius: 24,
    cutoff: 0.25,
    maxTextureSize: 2048,
    debounceTimeout: 100
  };
  var GLYPH_MARGIN = 2;
  var INF = 1e20;
  function createSDFGenerator(fontSize, fontFamily, fontWeight, fontStyle, buffer) {
    var canvasSize = fontSize + buffer * 4;
    var canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    var ctx = canvas.getContext("2d", {
      willReadFrequently: true
    });
    ctx.font = "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = "black";
    return {
      ctx,
      canvasSize,
      gridOuter: new Float64Array(canvasSize * canvasSize),
      gridInner: new Float64Array(canvasSize * canvasSize),
      f: new Float64Array(canvasSize),
      z: new Float64Array(canvasSize + 1),
      v: new Uint16Array(canvasSize)
    };
  }
  function generateSDFGlyph(gen, _char, buffer, radius, cutoff) {
    var ctx = gen.ctx, canvasSize = gen.canvasSize;
    var metrics = ctx.measureText(_char);
    var glyphAdvance = metrics.width;
    var actualBoundingBoxAscent = metrics.actualBoundingBoxAscent, actualBoundingBoxDescent = metrics.actualBoundingBoxDescent, actualBoundingBoxLeft = metrics.actualBoundingBoxLeft, actualBoundingBoxRight = metrics.actualBoundingBoxRight;
    var glyphTop = Math.ceil(actualBoundingBoxAscent);
    var glyphLeft = Math.ceil(actualBoundingBoxLeft);
    var glyphWidth = Math.max(0, Math.min(canvasSize - buffer, Math.ceil(actualBoundingBoxLeft) + Math.ceil(actualBoundingBoxRight)));
    var glyphHeight = Math.min(canvasSize - buffer, glyphTop + Math.ceil(actualBoundingBoxDescent));
    var width = glyphWidth + 2 * buffer;
    var height = glyphHeight + 2 * buffer;
    var len = Math.max(width * height, 0);
    var data = new Uint8ClampedArray(len);
    var glyph = {
      data,
      width,
      height,
      glyphWidth,
      glyphHeight,
      glyphTop,
      glyphLeft,
      glyphAdvance
    };
    if (glyphWidth === 0 || glyphHeight === 0) return glyph;
    var gridInner = gen.gridInner, gridOuter = gen.gridOuter;
    ctx.clearRect(buffer, buffer, glyphWidth, glyphHeight);
    ctx.fillText(_char, buffer + glyphLeft, buffer + glyphTop);
    var imgData = ctx.getImageData(buffer, buffer, glyphWidth, glyphHeight);
    gridOuter.fill(INF, 0, len);
    gridInner.fill(0, 0, len);
    for (var y = 0; y < glyphHeight; y++) {
      for (var x = 0; x < glyphWidth; x++) {
        var a = imgData.data[4 * (y * glyphWidth + x) + 3] / 255;
        if (a === 0) continue;
        var j = (y + buffer) * width + x + buffer;
        if (a === 1) {
          gridOuter[j] = 0;
          gridInner[j] = INF;
        } else {
          var d = 0.5 - a;
          gridOuter[j] = d > 0 ? d * d : 0;
          gridInner[j] = d < 0 ? d * d : 0;
        }
      }
    }
    edt(gridOuter, 0, 0, width, height, width, gen.f, gen.v, gen.z);
    edt(gridInner, buffer, buffer, glyphWidth, glyphHeight, width, gen.f, gen.v, gen.z);
    for (var i = 0; i < len; i++) {
      var _d = Math.sqrt(gridOuter[i]) - Math.sqrt(gridInner[i]);
      data[i] = Math.round(255 - 255 * (_d / radius + cutoff));
    }
    return glyph;
  }
  function edt(data, x0, y0, width, height, gridSize, f, v, z) {
    for (var x = x0; x < x0 + width; x++) edt1d(data, y0 * gridSize + x, gridSize, height, f, v, z);
    for (var y = y0; y < y0 + height; y++) edt1d(data, y * gridSize + x0, 1, width, f, v, z);
  }
  function edt1d(grid, offset, stride, length, f, v, z) {
    v[0] = 0;
    z[0] = -INF;
    z[1] = INF;
    f[0] = grid[offset];
    for (var q = 1, k = 0, s = 0; q < length; q++) {
      f[q] = grid[offset + q * stride];
      var q2 = q * q;
      do {
        var r = v[k];
        s = (f[q] - f[r] + q2 - r * r) / (q - r) / 2;
      } while (s <= z[k] && --k > -1);
      k++;
      v[k] = q;
      z[k] = s;
      z[k + 1] = INF;
    }
    for (var _q = 0, _k = 0; _q < length; _q++) {
      while (z[_k + 1] < _q) _k++;
      var _r = v[_k];
      var qr = _q - _r;
      grid[offset + _q * stride] = f[_r] + qr * qr;
    }
  }
  var SDFAtlasManager = /* @__PURE__ */ (function(_EventEmitter) {
    function SDFAtlasManager2() {
      var _this;
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, SDFAtlasManager2);
      _this = _callSuper(this, SDFAtlasManager2);
      _defineProperty(_this, "fonts", /* @__PURE__ */ new Map());
      _defineProperty(_this, "textures", []);
      _defineProperty(_this, "cursor", {
        x: 0,
        y: 0,
        rowHeight: 0,
        atlasIndex: 0
      });
      _defineProperty(_this, "pendingGlyphs", []);
      _defineProperty(_this, "debounceTimer", null);
      _this.options = _objectSpread2(_objectSpread2({}, DEFAULT_SDF_ATLAS_OPTIONS), options);
      _this.canvas = document.createElement("canvas");
      _this.canvas.width = _this.options.maxTextureSize;
      _this.canvas.height = _this.options.maxTextureSize;
      _this.ctx = _this.canvas.getContext("2d", {
        willReadFrequently: true
      });
      _this.measureCanvas = document.createElement("canvas");
      _this.measureCtx = _this.measureCanvas.getContext("2d");
      _this.textures.push(_this.ctx.getImageData(0, 0, 1, 1));
      return _this;
    }
    _inherits(SDFAtlasManager2, _EventEmitter);
    return _createClass(SDFAtlasManager2, [{
      key: "getFontKey",
      value: function getFontKey(font) {
        return "".concat(font.family, "-").concat(font.weight, "-").concat(font.style);
      }
      /**
       * Registers a font for SDF generation.
       */
    }, {
      key: "registerFont",
      value: function registerFont(font) {
        var key = this.getFontKey(font);
        if (this.fonts.has(key)) {
          return key;
        }
        var generator = createSDFGenerator(this.options.fontSize, font.family, font.weight, font.style, this.options.buffer);
        this.fonts.set(key, {
          descriptor: font,
          generator,
          glyphs: /* @__PURE__ */ new Map()
        });
        return key;
      }
      /**
       * Ensures all characters in a string have glyphs in the atlas.
       */
    }, {
      key: "ensureGlyphs",
      value: function ensureGlyphs(text, fontKey) {
        var fontState = this.fonts.get(fontKey);
        if (!fontState) {
          throw new Error('Font "'.concat(fontKey, '" is not registered. Call registerFont() first.'));
        }
        var hasNewGlyphs = false;
        var _iterator = _createForOfIteratorHelper(text), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _char2 = _step.value;
            var charCode = _char2.codePointAt(0);
            if (charCode === void 0) continue;
            if (!fontState.glyphs.has(charCode)) {
              this.pendingGlyphs.push({
                fontKey,
                charCode
              });
              hasNewGlyphs = true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (hasNewGlyphs) {
          this.scheduleTextureGeneration();
        }
      }
      /**
       * Measures the width of a text string.
       */
    }, {
      key: "measureText",
      value: function measureText(text, fontKey) {
        var fontState = this.fonts.get(fontKey);
        if (!fontState) {
          throw new Error('Font "'.concat(fontKey, '" is not registered.'));
        }
        var _fontState$descriptor = fontState.descriptor, family = _fontState$descriptor.family, weight = _fontState$descriptor.weight, style = _fontState$descriptor.style;
        this.measureCtx.font = "".concat(style, " ").concat(weight, " ").concat(this.options.fontSize, "px ").concat(family);
        return this.measureCtx.measureText(text).width;
      }
      /**
       * Gets glyph metrics for a character.
       */
    }, {
      key: "getGlyph",
      value: function getGlyph(charCode, fontKey) {
        var fontState = this.fonts.get(fontKey);
        if (!fontState) return void 0;
        return fontState.glyphs.get(charCode);
      }
      /**
       * Gets all atlas textures.
       */
    }, {
      key: "getTextures",
      value: function getTextures() {
        return this.textures;
      }
      /**
       * Gets the number of registered fonts.
       */
    }, {
      key: "getFontCount",
      value: function getFontCount() {
        return this.fonts.size;
      }
      /**
       * Gets the total number of glyphs in the atlas.
       */
    }, {
      key: "getGlyphCount",
      value: function getGlyphCount() {
        var count = 0;
        var _iterator2 = _createForOfIteratorHelper(this.fonts.values()), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var fontState = _step2.value;
            count += fontState.glyphs.size;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return count;
      }
      /**
       * Checks if there are pending glyphs to be rendered.
       */
    }, {
      key: "hasPendingGlyphs",
      value: function hasPendingGlyphs() {
        return this.pendingGlyphs.length > 0;
      }
      /**
       * Forces immediate texture generation (bypasses debounce).
       */
    }, {
      key: "flush",
      value: function flush() {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
          this.debounceTimer = null;
        }
        this.generateTextures();
      }
      /**
       * Destroys the atlas manager and releases resources.
       */
    }, {
      key: "destroy",
      value: function destroy() {
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }
        this.fonts.clear();
        this.textures = [];
        this.pendingGlyphs = [];
        this.removeAllListeners();
      }
      /**
       * Schedules texture generation with debouncing.
       */
    }, {
      key: "scheduleTextureGeneration",
      value: function scheduleTextureGeneration() {
        var _this2 = this;
        if (this.debounceTimer !== null) return;
        if (this.options.debounceTimeout === null) {
          this.generateTextures();
        } else {
          this.debounceTimer = setTimeout(function() {
            _this2.debounceTimer = null;
            _this2.generateTextures();
          }, this.options.debounceTimeout);
        }
      }
      /**
       * Generates textures for all pending glyphs.
       */
    }, {
      key: "generateTextures",
      value: function generateTextures() {
        if (this.pendingGlyphs.length === 0) return;
        var _this$options = this.options, maxTextureSize = _this$options.maxTextureSize, buffer = _this$options.buffer, radius = _this$options.radius, cutoff = _this$options.cutoff;
        var _iterator3 = _createForOfIteratorHelper(this.pendingGlyphs), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var _step3$value = _step3.value, fontKey = _step3$value.fontKey, charCode = _step3$value.charCode;
            var fontState = this.fonts.get(fontKey);
            if (!fontState || fontState.glyphs.has(charCode)) continue;
            var _char3 = String.fromCodePoint(charCode);
            var glyph = generateSDFGlyph(fontState.generator, _char3, buffer, radius, cutoff);
            var glyphWidth = glyph.width;
            var glyphHeight = glyph.height;
            if (this.cursor.x + glyphWidth + GLYPH_MARGIN > maxTextureSize) {
              this.cursor.x = 0;
              this.cursor.y += this.cursor.rowHeight + GLYPH_MARGIN;
              this.cursor.rowHeight = 0;
            }
            if (this.cursor.y + glyphHeight + GLYPH_MARGIN > maxTextureSize) {
              this.finalizeCurrentTexture();
              this.cursor = {
                x: 0,
                y: 0,
                rowHeight: 0,
                atlasIndex: this.cursor.atlasIndex + 1
              };
              this.ctx.clearRect(0, 0, maxTextureSize, maxTextureSize);
            }
            var sdfData = glyph.data;
            var rgbaData = new Uint8ClampedArray(glyphWidth * glyphHeight * 4);
            for (var i = 0; i < sdfData.length; i++) {
              var rgbaIndex = i * 4;
              rgbaData[rgbaIndex] = 255;
              rgbaData[rgbaIndex + 1] = 255;
              rgbaData[rgbaIndex + 2] = 255;
              rgbaData[rgbaIndex + 3] = sdfData[i];
            }
            var imageData = new ImageData(rgbaData, glyphWidth, glyphHeight);
            this.ctx.putImageData(imageData, this.cursor.x, this.cursor.y);
            var metrics = {
              charCode,
              width: glyph.glyphWidth,
              height: glyph.glyphHeight,
              bearingX: -glyph.glyphLeft - buffer,
              bearingY: glyph.glyphTop + buffer,
              advance: glyph.glyphAdvance,
              atlasX: this.cursor.x,
              atlasY: this.cursor.y,
              atlasWidth: glyphWidth,
              atlasHeight: glyphHeight,
              atlasIndex: this.cursor.atlasIndex
            };
            fontState.glyphs.set(charCode, metrics);
            this.cursor.x += glyphWidth + GLYPH_MARGIN;
            this.cursor.rowHeight = Math.max(this.cursor.rowHeight, glyphHeight);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        this.finalizeCurrentTexture();
        this.pendingGlyphs = [];
        this.emit(SDFAtlasManager2.ATLAS_UPDATED_EVENT, {
          textures: this.textures,
          glyphCount: this.getGlyphCount()
        });
      }
      /**
       * Finalizes the current texture by capturing it as ImageData.
       */
    }, {
      key: "finalizeCurrentTexture",
      value: function finalizeCurrentTexture() {
        var maxTextureSize = this.options.maxTextureSize;
        var hasCompletedRow = this.cursor.y > 0 || this.cursor.rowHeight > 0;
        var effectiveWidth = Math.min(maxTextureSize, Math.max(this.cursor.x, hasCompletedRow ? maxTextureSize : 1));
        var effectiveHeight = Math.min(maxTextureSize, this.cursor.y + this.cursor.rowHeight + GLYPH_MARGIN);
        var textureData = this.ctx.getImageData(0, 0, effectiveWidth, effectiveHeight);
        if (this.cursor.atlasIndex >= this.textures.length) {
          this.textures.push(textureData);
        } else {
          this.textures[this.cursor.atlasIndex] = textureData;
        }
      }
    }]);
  })(import_events3.EventEmitter);
  _defineProperty(SDFAtlasManager, "ATLAS_UPDATED_EVENT", "atlasUpdated");
  var ATLAS_FONT_SIZE$2 = DEFAULT_SDF_ATLAS_OPTIONS.fontSize;
  function generateLabelVertexShader() {
    var step3Code = "  // -------------------------------------------------------------------------\n  // Step 3: Calculate position offset from the shared edge distance\n  // -------------------------------------------------------------------------\n  vec2 positionOffset = vec2(0.0);\n\n  if (a_positionMode < 4.0) {\n    vec2 screenDir = getLabelDirection(a_positionMode);\n    float boundaryDistPixels = nodeRadiusPixels * edgeDist;\n    positionOffset = screenDir * (boundaryDistPixels + margin);\n  }";
    var glsl = (
      /*glsl*/
      "#version 300 es\n\n// ============================================================================\n// Attributes\n// ============================================================================\n\n// Per-character (instanced)\nin float a_nodeIndex;        // Index into node data texture\nin vec2 a_charOffset;        // Character offset from label origin (pixels)\nin vec2 a_charSize;          // Character dimensions (pixels)\nin vec4 a_texCoords;         // Atlas coords: (x, y, width, height) in pixels\nin vec4 a_color;             // Text color (RGBA)\nin float a_margin;           // Gap between node edge and label (pixels)\nin float a_positionMode;     // Position: 0=right, 1=left, 2=above, 3=below, 4=over\nin float a_labelWidth;       // Total label width (pixels)\nin float a_labelHeight;      // Label height (pixels)\nin float a_verticalCenter;   // Vertical center offset from baseline (pixels)\nin float a_textHeight;       // Actual text height: maxAscent + maxDescent (pixels)\nin float a_labelAngle;       // Label rotation angle (radians)\n\n// Per-vertex (constant quad corners)\nin vec2 a_quadCorner;        // Quad corner: [-1,-1], [1,-1], [-1,1], [1,1]\n\n// ============================================================================\n// Uniforms\n// ============================================================================\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform vec2 u_resolution;\nuniform vec2 u_atlasSize;\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_nodeFrameTexture;\nuniform int u_nodeFrameTextureWidth;\nuniform float u_zoomLabelSizeRatio;\nuniform float u_labelPixelSnapping;\nuniform float u_pixelRatio;\n\n// ============================================================================\n// Varyings\n// ============================================================================\n\nout vec2 v_texCoord;\nout vec4 v_color;\nout float v_fontScale;\n\n// ============================================================================\n// Constants\n// ============================================================================\n\nconst float bias = 255.0 / 254.0;\nconst float ATLAS_FONT_SIZE = ".concat(numberToGLSLFloat(ATLAS_FONT_SIZE$2), ";\n\n// ============================================================================\n// Helper Functions\n// ============================================================================\n\n").concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n").concat(GLSL_READ_FRAME_TEXEL, "\n").concat(GLSL_GET_LABEL_DIRECTION, "\n\n// ============================================================================\n// Main\n// ============================================================================\n\nvoid main() {\n  // -------------------------------------------------------------------------\n  // Step 0: Fetch node data + shared edge distance from textures\n  // -------------------------------------------------------------------------\n  // Node-data texture format: vec4(x, y, size, shapeId)\n  // 2D texture layout: texCoord = (index % width, index / width)\n  int nodeIdx = int(a_nodeIndex);\n  vec4 nodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);\n  vec2 a_anchorPosition = nodeData.xy;\n  float a_nodeSize = nodeData.z;\n\n  // Normalized edge distance from the shared frame texture (the frame-pass ran\n  // the SDF search once; the label just reads the result).\n  float edgeDist = readFrameTexel(u_nodeFrameTexture, u_nodeFrameTextureWidth, nodeIdx).r;\n\n  // Per-node label rotation alignment: 0 = viewport, 1 = label turns with camera.\n  float labelRotation = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx).g;\n\n  // Apply zoom-dependent label size scaling\n  // Positional values are in CSS pixels; multiply by u_pixelRatio to convert to\n  // physical pixels, which is what the NDC conversion (/ u_resolution) expects.\n  float zoomScale = u_zoomLabelSizeRatio;\n  float margin = a_margin * zoomScale * u_pixelRatio;\n  vec2 charOffset = a_charOffset * zoomScale * u_pixelRatio;\n  vec2 charSize = a_charSize * zoomScale * u_pixelRatio;\n  float labelWidth = a_labelWidth * zoomScale * u_pixelRatio;\n  float labelHeight = a_labelHeight * zoomScale;\n\n  // Font scale: ratio of CSS label size to the base atlas font size.\n  // Divided by u_pixelRatio because the atlas is generated at ATLAS_FONT_SIZE * pixelRatio,\n  // which cancels out the u_pixelRatio in the fragment shader's gamma formula and keeps\n  // the anti-aliasing band width consistent across pixel densities.\n  v_fontScale = a_labelHeight * zoomScale / (ATLAS_FONT_SIZE * u_pixelRatio);\n\n  // -------------------------------------------------------------------------\n  // Step 1: Transform node position to clip space\n  // -------------------------------------------------------------------------\n  vec3 anchorClip = u_matrix * vec3(a_anchorPosition, 1.0);\n\n  // -------------------------------------------------------------------------\n  // Step 2: Convert node size to screen pixels\n  // -------------------------------------------------------------------------\n  float matrixScaleX = length(vec2(u_matrix[0][0], u_matrix[1][0]));\n  float nodeRadiusGraphSpace = a_nodeSize * u_correctionRatio / u_sizeRatio * 2.0;\n  float nodeRadiusNDC = nodeRadiusGraphSpace * matrixScaleX;\n  float nodeRadiusPixels = nodeRadiusNDC * u_resolution.x / 2.0;\n\n").concat(step3Code, "\n\n  // -------------------------------------------------------------------------\n  // Step 4: Calculate final vertex position\n  // -------------------------------------------------------------------------\n  vec2 cornerOffset = (a_quadCorner + 1.0) * 0.5;\n  vec2 charPixelPos = positionOffset + charOffset + cornerOffset * charSize;\n\n  // Apply text alignment based on position mode\n  float verticalCenter = a_verticalCenter * zoomScale * u_pixelRatio;\n  float textHeight = a_textHeight * zoomScale * u_pixelRatio;\n  float baselineToDescent = textHeight / 2.0 - verticalCenter;\n  float baselineToAscent = textHeight / 2.0 + verticalCenter;\n\n  if (a_positionMode < 0.5) {\n    // Right: vertically center\n    charPixelPos.y += verticalCenter;\n  } else if (a_positionMode < 1.5) {\n    // Left: right-align and vertically center\n    charPixelPos.x -= labelWidth;\n    charPixelPos.y += verticalCenter;\n  } else if (a_positionMode < 2.5) {\n    // Above: center horizontally, bottom of text at anchor\n    charPixelPos.x -= labelWidth * 0.5;\n    charPixelPos.y -= baselineToDescent;\n  } else if (a_positionMode < 3.5) {\n    // Below: center horizontally, top of text at anchor\n    charPixelPos.x -= labelWidth * 0.5;\n    charPixelPos.y += baselineToAscent;\n  } else {\n    // Over: center both\n    charPixelPos.x -= labelWidth * 0.5;\n    charPixelPos.y += verticalCenter;\n  }\n\n  // Apply label angle rotation. Graph-aligned labels add the camera angle so the\n  // whole label orbits the node in lockstep with the frame-pass edge distance.\n  float labelAngle = a_labelAngle - labelRotation * u_cameraAngle;\n  float la_c = cos(labelAngle);\n  float la_s = sin(labelAngle);\n  mat2 labelRotMat = mat2(la_c, -la_s, la_s, la_c);\n  charPixelPos = labelRotMat * charPixelPos;\n\n  // Snap node center to pixel grid so label/backdrop/attachment move as a unit\n  vec2 nodeScreen = vec2(\n    (anchorClip.x + 1.0) * u_resolution.x,\n    (1.0 - anchorClip.y) * u_resolution.y\n  ) * 0.5;\n  charPixelPos += (round(nodeScreen) - nodeScreen) * u_labelPixelSnapping;\n\n  // Convert to NDC (flip Y: screen Y-down -> clip Y-up)\n  vec2 ndcOffset = vec2(charPixelPos.x, -charPixelPos.y) * 2.0 / u_resolution;\n  gl_Position = vec4(anchorClip.xy + ndcOffset, 0.0, 1.0);\n\n  // -------------------------------------------------------------------------\n  // Step 5: Texture coordinates\n  // -------------------------------------------------------------------------\n  v_texCoord = (a_texCoords.xy + cornerOffset * a_texCoords.zw) / u_atlasSize;\n\n  // -------------------------------------------------------------------------\n  // Step 6: Pass color\n  // -------------------------------------------------------------------------\n  v_color = a_color;\n  v_color.a *= bias;\n}\n")
    );
    return glsl;
  }
  function generateLabelFragmentShader() {
    var glsl = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\nin vec2 v_texCoord;\nin vec4 v_color;\nin float v_fontScale;\n\nuniform sampler2D u_atlas;\nuniform float u_gamma;\nuniform float u_sdfBuffer;\nuniform float u_pixelRatio;\n\n// Fragment output (single target - picking handled via separate pass)\nout vec4 fragColor;\n\nvoid main() {\n  #ifdef PICKING_MODE\n    // Labels are not pickable - discard all fragments in picking mode\n    fragColor = vec4(0.0);\n    discard;\n  #else\n    // Sample SDF value from atlas (high = inside glyph, low = outside)\n    float sdfValue = texture(u_atlas, v_texCoord).a;\n\n    // Edge threshold: 1.0 - cutoff = 0.75 for default cutoff=0.25\n    // This is where the glyph edge is located in the SDF\n    float edgeThreshold = 1.0 - u_sdfBuffer;\n\n    // Gamma controls the anti-aliasing band width.\n    // Scale inversely with font scale so small labels get a wider AA band\n    // (smoother) and large labels get a tighter band (sharper).\n    float gamma = u_gamma / (u_pixelRatio * v_fontScale);\n\n    // Pure gamma-based anti-aliasing using smoothstep\n    // The AA band extends from (threshold - gamma) to (threshold + gamma)\n    float alpha = smoothstep(edgeThreshold - gamma, edgeThreshold + gamma, sdfValue);\n\n    // Premultiplied alpha output for correct blending\n    float finalAlpha = v_color.a * alpha;\n    fragColor = vec4(v_color.rgb * finalAlpha, finalAlpha);\n  #endif\n}\n"
    );
    return glsl;
  }
  function collectLabelUniforms() {
    return ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_resolution", "u_atlasSize", "u_atlas", "u_gamma", "u_sdfBuffer", "u_pixelRatio", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_nodeFrameTexture", "u_nodeFrameTextureWidth", "u_zoomLabelSizeRatio", "u_labelPixelSnapping"];
  }
  function generateLabelShaders() {
    return {
      vertexShader: generateLabelVertexShader(),
      fragmentShader: generateLabelFragmentShader(),
      uniforms: collectLabelUniforms()
    };
  }
  function createLabelProgram(gl, pickingBuffer, renderer, options) {
    var _labelOptions$margin, _labelOptions$zoomToL;
    var _options$label = options.label, labelOptions = _options$label === void 0 ? {} : _options$label;
    var labelMargin = (_labelOptions$margin = labelOptions.margin) !== null && _labelOptions$margin !== void 0 ? _labelOptions$margin : DEFAULT_LABEL_MARGIN;
    var zoomToLabelSizeRatioFunction = (_labelOptions$zoomToL = labelOptions.zoomToLabelSizeRatioFunction) !== null && _labelOptions$zoomToL !== void 0 ? _labelOptions$zoomToL : function() {
      return 1;
    };
    var generatedShaders = generateLabelShaders();
    var NodeLabelProgram = /* @__PURE__ */ (function(_LabelProgram) {
      function NodeLabelProgram2(gl2, pickingBuffer2, renderer2) {
        var _labelOptions$font, _labelOptions$font2, _labelOptions$font3;
        var _this;
        _classCallCheck(this, NodeLabelProgram2);
        _this = _callSuper(this, NodeLabelProgram2, [gl2, pickingBuffer2, renderer2]);
        _defineProperty(_this, "atlasTexture", null);
        _defineProperty(_this, "atlasNeedsUpdate", false);
        _defineProperty(_this, "labelGlyphCache", /* @__PURE__ */ new Map());
        _this.atlasFontSize = DEFAULT_SDF_ATLAS_OPTIONS.fontSize * getPixelRatio();
        _this.atlasManager = new SDFAtlasManager({
          fontSize: _this.atlasFontSize
        });
        _this.gamma = 0.025;
        _this.sdfBuffer = DEFAULT_SDF_ATLAS_OPTIONS.cutoff;
        _this.atlasTexture = gl2.createTexture();
        if (!_this.atlasTexture) {
          throw new Error("NodeLabelProgram: failed to create atlas texture");
        }
        gl2.bindTexture(gl2.TEXTURE_2D, _this.atlasTexture);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
        gl2.bindTexture(gl2.TEXTURE_2D, null);
        _this.atlasManager.on(SDFAtlasManager.ATLAS_UPDATED_EVENT, function() {
          _this.atlasNeedsUpdate = true;
        });
        var fontConfig = {
          family: ((_labelOptions$font = labelOptions.font) === null || _labelOptions$font === void 0 ? void 0 : _labelOptions$font.family) || "sans-serif",
          weight: ((_labelOptions$font2 = labelOptions.font) === null || _labelOptions$font2 === void 0 ? void 0 : _labelOptions$font2.weight) || "normal",
          style: ((_labelOptions$font3 = labelOptions.font) === null || _labelOptions$font3 === void 0 ? void 0 : _labelOptions$font3.style) || "normal"
        };
        _this.defaultFontKey = _this.atlasManager.registerFont(fontConfig);
        return _this;
      }
      _inherits(NodeLabelProgram2, _LabelProgram);
      return _createClass(NodeLabelProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          return {
            VERTICES: 4,
            // Quad for each character
            VERTEX_SHADER_SOURCE: generatedShaders.vertexShader,
            FRAGMENT_SHADER_SOURCE: generatedShaders.fragmentShader,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: generatedShaders.uniforms,
            ATTRIBUTES: [
              // Per-character instance data
              // Node position and size are fetched from texture via a_nodeIndex
              {
                name: "a_nodeIndex",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_charOffset",
                size: 2,
                type: FLOAT2
              },
              {
                name: "a_charSize",
                size: 2,
                type: FLOAT2
              },
              {
                name: "a_texCoords",
                size: 4,
                type: FLOAT2
              },
              {
                name: "a_color",
                size: 4,
                type: UNSIGNED_BYTE2,
                normalized: true
              },
              {
                name: "a_margin",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_positionMode",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelWidth",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelHeight",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_verticalCenter",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_textHeight",
                size: 1,
                type: FLOAT2
              },
              {
                name: "a_labelAngle",
                size: 1,
                type: FLOAT2
              }
            ],
            // Quad corners (same for all characters)
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [
              [-1, -1],
              // Bottom-left
              [1, -1],
              // Bottom-right
              [-1, 1],
              // Top-left
              [1, 1]
              // Top-right
            ]
          };
        }
        // -----------------------------------------------------------------------
        // Glyph Preparation
        // -----------------------------------------------------------------------
        /**
         * Pre-computes glyph layout data for a label and caches it.
         *
         * This method:
         * 1. Ensures all glyphs are in the atlas
         * 2. Computes cumulative X offsets for each character
         * 3. Caches the data for use during character processing
         *
         * @param labelKey Unique identifier for this label
         * @param data Label display data
         */
      }, {
        key: "prepareLabelGlyphs",
        value: function prepareLabelGlyphs(labelKey, data) {
          if (data.hidden || !data.text) {
            this.labelGlyphCache["delete"](labelKey);
            return;
          }
          var text = data.text;
          var fontKey = data.fontKey || this.defaultFontKey;
          this.atlasManager.ensureGlyphs(text, fontKey);
          var glyphs = [];
          var xOffsets = [];
          var xOffset = 0;
          var maxAscent = 0;
          var maxDescent = 0;
          var _iterator = _createForOfIteratorHelper(text), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var _char2 = _step.value;
              var charCode = _char2.codePointAt(0);
              if (charCode === void 0) {
                glyphs.push(void 0);
                xOffsets.push(xOffset);
                continue;
              }
              var glyph = this.atlasManager.getGlyph(charCode, fontKey);
              glyphs.push(glyph);
              xOffsets.push(xOffset);
              if (glyph) {
                xOffset += glyph.advance;
                maxAscent = Math.max(maxAscent, glyph.bearingY);
                maxDescent = Math.max(maxDescent, glyph.atlasHeight - glyph.bearingY);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          this.labelGlyphCache.set(labelKey, {
            glyphs,
            xOffsets,
            totalWidth: xOffset,
            totalHeight: maxAscent + maxDescent,
            verticalCenterOffset: (maxAscent - maxDescent) / 2
          });
        }
        // -----------------------------------------------------------------------
        // Character Processing
        // -----------------------------------------------------------------------
        /**
         * Processes a single character and writes its vertex data to the buffer.
         *
         * ## Character Positioning
         *
         * Each character's position is computed as:
         * 1. Start from the label's anchor position (node center)
         * 2. Add position offset (computed in shader using shape SDF)
         * 3. Add character offset within the label
         * 4. Add glyph bearing to align properly
         *
         * ## Coordinate System
         *
         * - `charOffsetX/Y`: Offset from label origin to character's top-left corner
         * - Positive X = rightward, Positive Y = downward (screen coordinates)
         * - The shader will convert to clip space and flip Y
         *
         * @param index Buffer index for this character
         * @param labelData Label display data from sigma
         * @param _char The character (unused, we use charIndex)
         * @param charIndex Index of this character within the label text
         */
      }, {
        key: "processCharacter",
        value: function processCharacter(index, labelData, _char, charIndex) {
          var floats = this.floats, STRIDE = this.STRIDE;
          var startIndex = index * STRIDE;
          var cache = this.labelGlyphCache.get(labelData.parentKey);
          if (!cache || !cache.glyphs[charIndex]) {
            for (var _i = 0; _i < STRIDE; _i++) {
              floats[startIndex + _i] = 0;
            }
            return;
          }
          var glyph = cache.glyphs[charIndex];
          var xOffset = cache.xOffsets[charIndex];
          var scale2 = labelData.size / this.atlasFontSize;
          var color = floatColor(labelData.color);
          var i = startIndex;
          floats[i++] = labelData.nodeIndex;
          floats[i++] = (xOffset + glyph.bearingX) * scale2;
          floats[i++] = -glyph.bearingY * scale2;
          floats[i++] = glyph.atlasWidth * scale2;
          floats[i++] = glyph.atlasHeight * scale2;
          floats[i++] = glyph.atlasX;
          floats[i++] = glyph.atlasY;
          floats[i++] = glyph.atlasWidth;
          floats[i++] = glyph.atlasHeight;
          floats[i++] = color;
          floats[i++] = labelData.margin;
          floats[i++] = POSITION_MODE_MAP[labelData.position];
          floats[i++] = cache.totalWidth * scale2;
          floats[i++] = labelData.size;
          floats[i++] = cache.verticalCenterOffset * scale2;
          floats[i++] = cache.totalHeight * scale2;
          floats[i++] = labelData.labelAngle;
        }
        /**
         * Processes a label by first preparing its glyph cache.
         */
      }, {
        key: "processLabel",
        value: function processLabel(labelKey, offset, data) {
          this.prepareLabelGlyphs(labelKey, data);
          return _superPropGet(NodeLabelProgram2, "processLabel", this, 3)([labelKey, offset, data]);
        }
        // -----------------------------------------------------------------------
        // Atlas Texture Management
        // -----------------------------------------------------------------------
        /**
         * Uploads the atlas texture to the GPU if it has changed.
         */
      }, {
        key: "updateAtlasTexture",
        value: function updateAtlasTexture() {
          if (!this.atlasNeedsUpdate) return;
          var gl2 = this.normalProgram.gl;
          var textures = this.atlasManager.getTextures();
          if (textures.length === 0) return;
          var imageData = textures[0];
          gl2.bindTexture(gl2.TEXTURE_2D, this.atlasTexture);
          gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, imageData.width, imageData.height, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, imageData.data);
          gl2.bindTexture(gl2.TEXTURE_2D, null);
          this.atlasNeedsUpdate = false;
        }
        // -----------------------------------------------------------------------
        // Uniform Setting
        // -----------------------------------------------------------------------
        /**
         * Sets all uniforms for the label shader.
         */
      }, {
        key: "setUniforms",
        value: function setUniforms(params, programInfo) {
          var gl2 = programInfo.gl, uniformLocations = programInfo.uniformLocations;
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform2f(uniformLocations.u_resolution, params.width * params.pixelRatio, params.height * params.pixelRatio);
          var textures = this.atlasManager.getTextures();
          if (textures.length > 0) {
            gl2.uniform2f(uniformLocations.u_atlasSize, textures[0].width, textures[0].height);
          } else {
            gl2.uniform2f(uniformLocations.u_atlasSize, 1, 1);
          }
          gl2.activeTexture(gl2.TEXTURE0);
          gl2.bindTexture(gl2.TEXTURE_2D, this.atlasTexture);
          gl2.uniform1i(uniformLocations.u_atlas, 0);
          if (uniformLocations.u_nodeDataTexture !== void 0) {
            gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          }
          if (uniformLocations.u_nodeDataTextureWidth !== void 0) {
            gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          }
          gl2.uniform1i(uniformLocations.u_nodeFrameTexture, params.nodeFrameTextureUnit);
          gl2.uniform1i(uniformLocations.u_nodeFrameTextureWidth, params.nodeFrameTextureWidth);
          gl2.uniform1f(uniformLocations.u_gamma, this.gamma);
          gl2.uniform1f(uniformLocations.u_sdfBuffer, this.sdfBuffer);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_zoomLabelSizeRatio, 1 / NodeLabelProgram2.zoomToLabelSizeRatioFunction(params.zoomRatio));
          gl2.uniform1f(uniformLocations.u_labelPixelSnapping, params.labelPixelSnapping);
        }
        // -----------------------------------------------------------------------
        // Rendering
        // -----------------------------------------------------------------------
      }, {
        key: "renderProgram",
        value: function renderProgram(params, programInfo) {
          this.updateAtlasTexture();
          if (this.atlasManager.hasPendingGlyphs()) {
            this.atlasManager.flush();
            this.updateAtlasTexture();
          }
          _superPropGet(NodeLabelProgram2, "renderProgram", this, 3)([params, programInfo]);
        }
        // -----------------------------------------------------------------------
        // Public API
        // -----------------------------------------------------------------------
        /**
         * Registers a font for use in labels.
         *
         * @param family Font family name (e.g., "Arial", "sans-serif")
         * @param weight Font weight (e.g., "normal", "bold")
         * @param style Font style (e.g., "normal", "italic")
         * @returns Font key for use in label data
         */
      }, {
        key: "registerFont",
        value: function registerFont(family) {
          var weight = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "normal";
          var style = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "normal";
          return this.atlasManager.registerFont({
            family,
            weight,
            style
          });
        }
        /**
         * Returns the SDFAtlasManager for advanced use cases.
         */
      }, {
        key: "getAtlasManager",
        value: function getAtlasManager() {
          return this.atlasManager;
        }
        /**
         * Measures a label using the same glyph advance metrics as rendering.
         */
      }, {
        key: "measureLabel",
        value: function measureLabel(text, fontSize, fontKey) {
          var actualFontKey = fontKey || this.defaultFontKey;
          this.atlasManager.ensureGlyphs(text, actualFontKey);
          if (this.atlasManager.hasPendingGlyphs()) {
            this.atlasManager.flush();
          }
          var totalWidth = 0;
          var maxAscent = 0;
          var maxDescent = 0;
          var _iterator2 = _createForOfIteratorHelper(text), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var _char3 = _step2.value;
              var charCode = _char3.codePointAt(0);
              if (charCode === void 0) continue;
              var glyph = this.atlasManager.getGlyph(charCode, actualFontKey);
              if (glyph) {
                totalWidth += glyph.advance;
                maxAscent = Math.max(maxAscent, glyph.bearingY);
                maxDescent = Math.max(maxDescent, glyph.atlasHeight - glyph.bearingY);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var scale2 = fontSize / this.atlasFontSize;
          return {
            width: totalWidth * scale2,
            height: fontSize,
            textHeight: (maxAscent + maxDescent) * scale2
          };
        }
        /**
         * Pre-generates glyphs for the given texts.
         * Call this before rendering to avoid generation during animation.
         *
         * @param texts Array of text strings to prepare
         * @param fontKey Optional font key (defaults to sans-serif)
         */
      }, {
        key: "ensureGlyphsReady",
        value: function ensureGlyphsReady(texts, fontKey) {
          var actualFontKey = fontKey || this.defaultFontKey;
          var _iterator3 = _createForOfIteratorHelper(texts), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var text = _step3.value;
              this.atlasManager.ensureGlyphs(text, actualFontKey);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          this.atlasManager.flush();
        }
        // -----------------------------------------------------------------------
        // Cleanup
        // -----------------------------------------------------------------------
      }, {
        key: "kill",
        value: function kill() {
          var gl2 = this.normalProgram.gl;
          if (this.atlasTexture) {
            gl2.deleteTexture(this.atlasTexture);
            this.atlasTexture = null;
          }
          this.atlasManager.destroy();
          this.labelGlyphCache.clear();
          _superPropGet(NodeLabelProgram2, "kill", this, 3)([]);
        }
      }]);
    })(LabelProgram);
    _defineProperty(NodeLabelProgram, "labelMargin", labelMargin);
    _defineProperty(NodeLabelProgram, "zoomToLabelSizeRatioFunction", zoomToLabelSizeRatioFunction);
    return new NodeLabelProgram(gl, pickingBuffer, renderer);
  }
  var FRAGMENT_SHADER$2 = (
    /*glsl*/
    "#version 300 es\nprecision highp float;\n\nin float v_edgeDist;\n\n// R32F target: only the .r channel is stored.\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = vec4(v_edgeDist, 0.0, 0.0, 0.0);\n}\n"
  );
  function generateVertexShader$1(shapes, layers, shapeGlobalIds) {
    var shapeGLSL = getShapeGLSLForShapes(shapes);
    var shapeUniformDeclarations = dedupeShapeUniforms(shapes).map(function(u) {
      return "uniform ".concat(u.type, " ").concat(u.name, ";");
    }).join("\n");
    var _generateFindEdgeDist = generateFindEdgeDistanceForShapes(shapes, shapeGlobalIds), findEdgeDistanceCode = _generateFindEdgeDist.code, multiShape = _generateFindEdgeDist.multiShape;
    var attributeLayout = getShapeAttributeLayout(shapes, layers);
    var attributeDeclarations = Object.keys(attributeLayout.specs).map(function(name) {
      return "float v_".concat(name, ";");
    }).join("\n");
    var _generateAttributeTex = generateAttributeTextureFetch(attributeLayout, {
      varPrefix: "nodeAttr",
      baseTexelExpr: "nodeIdx * u_layerAttributeTexelsPerNode",
      textureWidthUniform: "u_layerAttributeTextureWidth",
      textureSamplerUniform: "u_layerAttributeTexture"
    }), fetchCode = _generateAttributeTex.fetchCode, varyingAssignments = _generateAttributeTex.varyingAssignments;
    var shader = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\nuniform float u_cameraAngle;\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform float u_frameTextureWidth;\nuniform float u_frameTextureHeight;\nuniform sampler2D u_layerAttributeTexture;\nuniform int u_layerAttributeTextureWidth;\nuniform int u_layerAttributeTexelsPerNode;\n".concat(shapeUniformDeclarations, "\n\nin float a_nodeIndex;     // node-data texture index (also the target frame texel)\nin float a_positionMode;  // 0=right 1=left 2=above 3=below 4=over\nin float a_labelAngle;    // intrinsic label angle (radians)\n\nout float v_edgeDist;\n\n// Shape attributes (plain globals: this pass is vertex-only)\n").concat(attributeDeclarations, "\n\n").concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n").concat(shapeGLSL, "\n").concat(findEdgeDistanceCode, "\n").concat(GLSL_GET_LABEL_DIRECTION, "\n\nvoid main() {\n  int nodeIdx = int(a_nodeIndex);\n").concat(fetchCode, "\n").concat(varyingAssignments, "\n  ").concat(multiShape ? (
        /*glsl*/
        "// Multi-shape: the shape id lives in the node-data texture's .w channel:\n  g_shapeId = int(readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx).w);"
      ) : "// Single-shape mode, shape id not needed", `

  // Per-node rotation alignment (0 = viewport, 1 = graph).
  vec4 nodeFlags = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, nodeIdx);
  float nodeRotation = nodeFlags.r;
  float labelRotation = nodeFlags.g;

  // Effective angle: intrinsic (style-given) plus the camera angle when the label
  // is graph-aligned. The companions place the box at this same angle.
  float effectiveAngle = a_labelAngle - labelRotation * u_cameraAngle;

  // The "over" mode (4) sits on the node center, so it has no edge distance.
  float edgeDist = 0.0;
  if (a_positionMode < 4.0) {
    vec2 screenDir = getLabelDirection(a_positionMode);
    // Rotate by the effective label angle. Inlined rather than via rotate2D()
    // because the shape SDFs (getShapeGLSLForShapes) already define that helper
    // for multi-shape programs, and redefining it would be a GLSL error.
    float ea_c = cos(effectiveAngle);
    float ea_s = sin(effectiveAngle);
    vec2 rotatedScreenDir = mat2(ea_c, -ea_s, ea_s, ea_c) * screenDir;
    // Screen (Y-down) -> SDF (Y-up).
    vec2 sdfDir = vec2(rotatedScreenDir.x, -rotatedScreenDir.y);
    // Counter-rotate into the shape's local frame for graph-aligned nodes, so the
    // boundary is queried against the shape's actual on-screen orientation.
    float nodeCa = -u_cameraAngle * nodeRotation;
    float nc = cos(nodeCa), ns = sin(nodeCa);
    sdfDir = mat2(nc, -ns, ns, nc) * sdfDir;
    edgeDist = findEdgeDistance(sdfDir, 1.0);
  }
  v_edgeDist = edgeDist;

  // Scatter to this node's texel center in the frame texture.
  float x = mod(a_nodeIndex, u_frameTextureWidth);
  float y = floor(a_nodeIndex / u_frameTextureWidth);
  vec2 ndc = (vec2(x, y) + 0.5) / vec2(u_frameTextureWidth, u_frameTextureHeight) * 2.0 - 1.0;
  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = 1.0;
}
`)
    );
    return shader;
  }
  var NodeLabelFramePass = /* @__PURE__ */ (function() {
    function NodeLabelFramePass2(gl, options) {
      _classCallCheck(this, NodeLabelFramePass2);
      _defineProperty(this, "uniformLocations", {});
      var shapes = options.shapes, layers = options.layers, shapeGlobalIds = options.shapeGlobalIds;
      if (shapes.length === 0) throw new Error("NodeLabelFramePass: at least one shape must be provided");
      this.gl = gl;
      this.shapeUniforms = dedupeShapeUniforms(shapes);
      this.hasAttributeData = Object.keys(getShapeAttributeLayout(shapes, layers).offsets).length > 0;
      this.vertexShader = loadVertexShader(gl, generateVertexShader$1(shapes, layers, shapeGlobalIds));
      this.fragmentShader = loadFragmentShader(gl, FRAGMENT_SHADER$2);
      this.program = loadProgram(gl, [this.vertexShader, this.fragmentShader]);
      var uniformNames = ["u_cameraAngle", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_frameTextureWidth", "u_frameTextureHeight", "u_layerAttributeTexture", "u_layerAttributeTextureWidth", "u_layerAttributeTexelsPerNode"].concat(_toConsumableArray(this.shapeUniforms.map(function(u) {
        return u.name;
      })));
      var _iterator = _createForOfIteratorHelper(uniformNames), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var name = _step.value;
          this.uniformLocations[name] = gl.getUniformLocation(this.program, name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var stride = NodeLabelFramePass2.FLOATS_PER_POINT * 4;
      this.vao = gl.createVertexArray();
      this.buffer = gl.createBuffer();
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      var _iterator2 = _createForOfIteratorHelper([["a_nodeIndex", 0], ["a_positionMode", 4], ["a_labelAngle", 8]]), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var _step2$value = _slicedToArray(_step2.value, 2), _name = _step2$value[0], offset = _step2$value[1];
          var loc = gl.getAttribLocation(this.program, _name);
          if (loc >= 0) {
            gl.enableVertexAttribArray(loc);
            gl.vertexAttribPointer(loc, 1, gl.FLOAT, false, stride, offset);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      gl.bindVertexArray(null);
    }
    return _createClass(NodeLabelFramePass2, [{
      key: "run",
      value: function run(pointData, count, frameTexture, params, attributeTexture) {
        if (count === 0) return;
        var gl = this.gl;
        gl.useProgram(this.program);
        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, pointData.subarray(0, count * NodeLabelFramePass2.FLOATS_PER_POINT), gl.DYNAMIC_DRAW);
        var u = this.uniformLocations;
        gl.uniform1f(u.u_cameraAngle, params.cameraAngle);
        gl.uniform1i(u.u_nodeDataTexture, params.nodeDataTextureUnit);
        gl.uniform1i(u.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
        gl.uniform1f(u.u_frameTextureWidth, frameTexture.getTextureWidth());
        gl.uniform1f(u.u_frameTextureHeight, frameTexture.getTextureHeight());
        if (this.hasAttributeData && attributeTexture) {
          attributeTexture.bind(LAYER_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_layerAttributeTexture) gl.uniform1i(u.u_layerAttributeTexture, LAYER_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_layerAttributeTextureWidth) gl.uniform1i(u.u_layerAttributeTextureWidth, attributeTexture.getTextureWidth());
          if (u.u_layerAttributeTexelsPerNode) gl.uniform1i(u.u_layerAttributeTexelsPerNode, attributeTexture.getTexelsPerItem());
        }
        var _iterator3 = _createForOfIteratorHelper(this.shapeUniforms), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var uniform = _step3.value;
            setGLSLUniform(gl, this.uniformLocations[uniform.name], uniform);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        frameTexture.bindAsRenderTarget();
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.drawArrays(gl.POINTS, 0, count);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindVertexArray(null);
      }
    }, {
      key: "kill",
      value: function kill() {
        var gl = this.gl;
        gl.deleteProgram(this.program);
        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);
        gl.deleteBuffer(this.buffer);
        gl.deleteVertexArray(this.vao);
      }
    }]);
  })();
  _defineProperty(NodeLabelFramePass, "FLOATS_PER_POINT", 3);
  function createNodeProgram(gl, pickingBuffer, renderer, options, antialias) {
    var _Class;
    var _options$label = options.label, labelOptions = _options$label === void 0 ? {} : _options$label, shapes = options.shapes;
    if (shapes.length === 0) {
      throw new Error("createNodeProgram: at least one shape must be provided in 'shapes'");
    }
    var shapeNameToIndex = {};
    var shapeGlobalIds = [];
    var primaryShapeSlug;
    shapes.forEach(function(shape, index) {
      var slug = registerShapeInstance(shape);
      if (index === 0) primaryShapeSlug = slug;
      shapeNameToIndex[shape.name] = index;
      shapeGlobalIds[index] = getShapeId(slug);
    });
    var layers = _toConsumableArray(options.layers);
    var generated = generateShaders({
      shapes,
      layers,
      shapeGlobalIds: shapes.length > 1 ? shapeGlobalIds : void 0,
      antialias
    });
    var labelProgram = createLabelProgram(gl, null, renderer, {
      label: labelOptions
    });
    var backdropProgram = createBackdropProgram(gl, null, renderer, {
      shapes,
      layers,
      getAttributeTexture: function getAttributeTexture() {
        return nodeProgram.getAttributeTexture();
      },
      label: labelOptions,
      shapeGlobalIds: shapes.length > 1 ? shapeGlobalIds : void 0
    });
    var labelBackgroundProgram = createLabelBackgroundProgram(gl, pickingBuffer, renderer, {
      label: labelOptions
    });
    var attachmentProgram = options.labelAttachments && Object.keys(options.labelAttachments).length > 0 ? createAttachmentProgram(gl, null, renderer, {
      label: labelOptions
    }) : null;
    var framePass = new NodeLabelFramePass(gl, {
      shapes,
      layers,
      shapeGlobalIds: shapes.length > 1 ? shapeGlobalIds : void 0
    });
    var nodeAttributeSources = getNodeAttributeSources(shapes, layers);
    var layerAttributeLayout = computeAttributeLayout(nodeAttributeSources);
    var _NodeProgramClass = (_Class = /* @__PURE__ */ (function(_Program) {
      function NodeProgramClass(gl2, pickingBuffer2, renderer2) {
        var _this;
        _classCallCheck(this, NodeProgramClass);
        _this = _callSuper(this, NodeProgramClass, [gl2, pickingBuffer2, renderer2]);
        _defineProperty(_this, "layerLifecycles", /* @__PURE__ */ new Map());
        _defineProperty(_this, "layersNeedingRegeneration", /* @__PURE__ */ new Set());
        _defineProperty(_this, "attrDescriptors", []);
        _this._pickingBuffer = pickingBuffer2;
        var texture = _NodeProgramClass.layerTextures.get(gl2);
        if (!texture) {
          texture = new ItemAttributeTexture(gl2, layerAttributeLayout);
          _NodeProgramClass.layerTextures.set(gl2, texture);
        }
        _this.layerAttributeTexture = texture;
        var refCount = _NodeProgramClass.textureRefCounts.get(gl2) || 0;
        _NodeProgramClass.textureRefCounts.set(gl2, refCount + 1);
        _this.packedAttributeData = new Float32Array(layerAttributeLayout.floatsPerItem);
        layers.forEach(function(layer, index) {
          if (layer.lifecycle) {
            var context = {
              gl: gl2,
              renderer: {
                refresh: function refresh() {
                  return renderer2.refresh();
                }
              },
              getUniformLocation: function getUniformLocation(name) {
                return gl2.getUniformLocation(_this.normalProgram.program, name);
              },
              requestShaderRegeneration: function requestShaderRegeneration() {
                _this.layersNeedingRegeneration.add(index);
              },
              requestRefresh: function requestRefresh() {
                renderer2.refresh();
              }
            };
            var hooks = layer.lifecycle(context);
            _this.layerLifecycles.set(index, hooks);
          }
        });
        _this.layerLifecycles.forEach(function(hooks) {
          var _hooks$init;
          (_hooks$init = hooks.init) === null || _hooks$init === void 0 || _hooks$init.call(hooks);
        });
        var lifecycleMapForDescriptors = /* @__PURE__ */ new Map();
        _this.layerLifecycles.forEach(function(hooks, layerIndex) {
          if (hooks.getAttributeData) {
            lifecycleMapForDescriptors.set(layerIndex, hooks);
          }
        });
        _this.attrDescriptors = buildAttrDescriptors(nodeAttributeSources, layerAttributeLayout, lifecycleMapForDescriptors);
        return _this;
      }
      _inherits(NodeProgramClass, _Program);
      return _createClass(NodeProgramClass, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          return {
            // Instanced rendering: 4 vertices for quad, one instance per node
            VERTICES: 4,
            VERTEX_SHADER_SOURCE: generated.vertexShader,
            FRAGMENT_SHADER_SOURCE: generated.fragmentShader,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: generated.uniforms,
            ATTRIBUTES: generated.attributes,
            // Constant attributes define the quad corners
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [
              [-1, -1],
              // Bottom-left
              [1, -1],
              // Bottom-right
              [-1, 1],
              // Top-left
              [1, 1]
              // Top-right
            ]
          };
        }
        /**
         * Regenerate shaders if any layers requested it.
         * This handles dynamic changes like texture count updates.
         */
      }, {
        key: "maybeRegenerateShaders",
        value: function maybeRegenerateShaders() {
          var _this2 = this;
          if (this.layersNeedingRegeneration.size === 0) return;
          layers = layers.map(function(layer, index) {
            if (_this2.layersNeedingRegeneration.has(index)) {
              var hooks = _this2.layerLifecycles.get(index);
              if (hooks !== null && hooks !== void 0 && hooks.regenerate) {
                var newLayer = hooks.regenerate();
                return _objectSpread2(_objectSpread2({}, newLayer), {}, {
                  lifecycle: layer.lifecycle
                });
              }
            }
            return layer;
          });
          this.layersNeedingRegeneration.clear();
          generated = generateShaders({
            shapes,
            layers,
            shapeGlobalIds: shapes.length > 1 ? shapeGlobalIds : void 0,
            antialias: this.renderer.getSetting("antialiasNodes")
          });
          var gl2 = this.normalProgram.gl;
          var _this$normalProgram = this.normalProgram, program = _this$normalProgram.program, buffer = _this$normalProgram.buffer, vertexShader = _this$normalProgram.vertexShader, fragmentShader = _this$normalProgram.fragmentShader;
          gl2.deleteProgram(program);
          gl2.deleteBuffer(buffer);
          gl2.deleteShader(vertexShader);
          gl2.deleteShader(fragmentShader);
          this.normalProgram = this.getProgramInfo("normal", gl2, generated.vertexShader, generated.fragmentShader, this._pickingBuffer);
        }
      }, {
        key: "getAttributeTexture",
        value: function getAttributeTexture() {
          return this.layerAttributeTexture;
        }
        /**
         * Uploads the layer attribute texture to the GPU.
         */
      }, {
        key: "uploadLayerTexture",
        value: function uploadLayerTexture() {
          this.layerAttributeTexture.upload();
        }
      }, {
        key: "process",
        value: function process(nodeIndex, offset, data, textureIndex) {
          var i = offset * this.STRIDE;
          if (data.visibility === "hidden") {
            for (var l = i + this.STRIDE; i < l; i++) {
              this.floats[i] = 0;
            }
            this.floats[offset * this.STRIDE] = HIDDEN_ITEM_INDEX;
            return;
          }
          this.processVisibleItem(indexToColor(nodeIndex), i, data, textureIndex);
        }
      }, {
        key: "processVisibleItem",
        value: function processVisibleItem(nodeIndex, startIndex, data, textureIndex) {
          var _data$opacity;
          var floats = this.floats, ints = this.ints;
          floats[startIndex++] = textureIndex;
          ints[startIndex++] = nodeIndex;
          floats[startIndex++] = (_data$opacity = data.opacity) !== null && _data$opacity !== void 0 ? _data$opacity : 1;
          if (layerAttributeLayout.floatsPerItem === 0) return;
          var packed = this.packedAttributeData;
          packAttributes(this.attrDescriptors, data, packed, data.color, this.layerLifecycles, 0);
          this.layerAttributeTexture.updateAllAttributesAtRow(textureIndex, packed);
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, programInfo) {
          var _this3 = this;
          var gl2 = programInfo.gl, uniformLocations = programInfo.uniformLocations;
          if (uniformLocations.u_matrix) {
            gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          }
          if (uniformLocations.u_sizeRatio) {
            gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          }
          if (uniformLocations.u_correctionRatio) {
            gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          }
          if (uniformLocations.u_pickingPadding) {
            gl2.uniform1f(uniformLocations.u_pickingPadding, params.nodePickingPadding);
          }
          if (uniformLocations.u_cameraAngle) {
            gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          }
          if (uniformLocations.u_nodeDataTexture) {
            gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          }
          if (uniformLocations.u_nodeDataTextureWidth) {
            gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          }
          if (uniformLocations.u_layerAttributeTexture) {
            this.layerAttributeTexture.bind(LAYER_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_layerAttributeTexture, LAYER_ATTRIBUTE_TEXTURE_UNIT);
          }
          if (uniformLocations.u_layerAttributeTextureWidth) {
            gl2.uniform1i(uniformLocations.u_layerAttributeTextureWidth, this.layerAttributeTexture.getTextureWidth());
          }
          if (uniformLocations.u_layerAttributeTexelsPerNode) {
            gl2.uniform1i(uniformLocations.u_layerAttributeTexelsPerNode, this.layerAttributeTexture.getTexelsPerItem());
          }
          shapes.forEach(function(shape) {
            shape.uniforms.forEach(function(uniform) {
              _this3.setTypedUniform(uniform, programInfo);
            });
          });
          layers.forEach(function(layer) {
            layer.uniforms.forEach(function(uniform) {
              _this3.setTypedUniform(uniform, programInfo);
            });
          });
        }
      }, {
        key: "render",
        value: function render(params, offset, count) {
          this.maybeRegenerateShaders();
          _superPropGet(NodeProgramClass, "render", this, 3)([params, offset, count]);
        }
      }, {
        key: "renderProgram",
        value: function renderProgram(params, programInfo) {
          var gl2 = programInfo.gl, program = programInfo.program;
          gl2.useProgram(program);
          if (programInfo === this.normalProgram) {
            this.layerLifecycles.forEach(function(hooks) {
              var _hooks$beforeRender;
              (_hooks$beforeRender = hooks.beforeRender) === null || _hooks$beforeRender === void 0 || _hooks$beforeRender.call(hooks);
            });
          }
          _superPropGet(NodeProgramClass, "renderProgram", this, 3)([params, programInfo]);
        }
      }, {
        key: "kill",
        value: function kill() {
          this.layerLifecycles.forEach(function(hooks) {
            var _hooks$kill;
            (_hooks$kill = hooks.kill) === null || _hooks$kill === void 0 || _hooks$kill.call(hooks);
          });
          this.layerLifecycles.clear();
          var gl2 = this.normalProgram.gl;
          var refCount = (_NodeProgramClass.textureRefCounts.get(gl2) || 1) - 1;
          if (refCount <= 0) {
            this.layerAttributeTexture.kill();
            _NodeProgramClass.layerTextures["delete"](gl2);
            _NodeProgramClass.textureRefCounts["delete"](gl2);
          } else {
            _NodeProgramClass.textureRefCounts.set(gl2, refCount);
          }
          _superPropGet(NodeProgramClass, "kill", this, 3)([]);
        }
      }]);
    })(Program), _defineProperty(_Class, "layerTextures", /* @__PURE__ */ new WeakMap()), _defineProperty(_Class, "textureRefCounts", /* @__PURE__ */ new WeakMap()), _Class);
    var nodeProgram = new _NodeProgramClass(gl, null, renderer);
    return {
      nodeProgram,
      labelProgram,
      backdropProgram,
      labelBackgroundProgram,
      attachmentProgram,
      framePass,
      // Shape registry metadata (consumed by sigma when the program is multi-shape).
      shapeSlug: primaryShapeSlug,
      shapeNameToIndex: shapes.length > 1 ? shapeNameToIndex : void 0,
      shapeGlobalIds: shapes.length > 1 ? shapeGlobalIds : void 0
    };
  }
  var EDGE_ATTRIBUTE_TEXTURE_UNIT = 6;
  function generateEdgeAttributeTextureFetch(layout) {
    var offsets = layout.offsets, specs = layout.specs, floatsPerItem = layout.floatsPerItem;
    var attributeNames = Object.keys(offsets);
    if (attributeNames.length === 0 || floatsPerItem === 0) {
      return {
        uniformDeclarations: "",
        uniformNames: [],
        vertexVaryingDeclarations: "",
        fragmentVaryingDeclarations: "",
        fetchCode: "",
        varyingAssignments: ""
      };
    }
    var uniformDeclarations = "\nuniform sampler2D u_edgeAttributeTexture;\nuniform int u_edgeAttributeTextureWidth;\nuniform int u_edgeAttributeTexelsPerEdge;";
    var uniformNames = ["u_edgeAttributeTexture", "u_edgeAttributeTextureWidth", "u_edgeAttributeTexelsPerEdge"];
    var varyingLines = attributeNames.map(function(name) {
      var glslType = specs[name].size === 1 ? "float" : "vec".concat(specs[name].size);
      return "".concat(glslType, " v_").concat(name, ";");
    });
    var vertexVaryingDeclarations = varyingLines.map(function(line) {
      return "out ".concat(line);
    }).join("\n");
    var fragmentVaryingDeclarations = varyingLines.map(function(line) {
      return "in ".concat(line);
    }).join("\n");
    var _generateAttributeTex = generateAttributeTextureFetch(layout, {
      varPrefix: "attr",
      baseTexelExpr: "edgeIdx * u_edgeAttributeTexelsPerEdge",
      textureWidthUniform: "u_edgeAttributeTextureWidth",
      textureSamplerUniform: "u_edgeAttributeTexture"
    }), fetchCode = _generateAttributeTex.fetchCode, varyingAssignments = _generateAttributeTex.varyingAssignments;
    return {
      uniformDeclarations,
      uniformNames,
      vertexVaryingDeclarations,
      fragmentVaryingDeclarations,
      fetchCode,
      varyingAssignments
    };
  }
  function generateFindSourceClampT(pathName) {
    return (
      /*glsl*/
      "\nfloat findSourceClampT_".concat(pathName, "(vec2 source, float sourceSize, int sourceShapeId, float sourceRotateAlign, vec2 target, float margin) {\n  float lo = 0.0, hi = 0.5;\n  float nodeExtent = sourceSize * u_correctionRatio / u_sizeRatio * 2.0;\n  float effectiveSize = 1.0 - u_correctionRatio / nodeExtent;\n\n  // Counter-rotate the query point so viewport-aligned nodes (rotateAlign=0) are\n  // clamped against their on-screen orientation; graph-aligned nodes skip it.\n  float ca = u_cameraAngle * (1.0 - sourceRotateAlign);\n  float rc = cos(ca), rs = sin(ca);\n  mat2 rot = mat2(rc, -rs, rs, rc);\n\n  for (int i = 0; i < 12; i++) {\n    float mid = (lo + hi) * 0.5;\n    vec2 pos = path_").concat(pathName, "_position(mid, source, target);\n    vec2 localPos = rot * ((pos - source) / nodeExtent);\n    float sdf = querySDF(sourceShapeId, localPos, effectiveSize);\n    if (sdf < 0.0) lo = mid;\n    else hi = mid;\n  }\n\n  float pathLen = path_").concat(pathName, "_length(source, target);\n  float marginT = (margin * u_correctionRatio / u_sizeRatio) / pathLen;\n  return (lo + hi) * 0.5 + marginT;\n}\n")
    );
  }
  function generateFindTargetClampT(pathName) {
    return (
      /*glsl*/
      "\nfloat findTargetClampT_".concat(pathName, "(vec2 source, vec2 target, float targetSize, int targetShapeId, float targetRotateAlign, float margin) {\n  float lo = 0.5, hi = 1.0;\n  float nodeExtent = targetSize * u_correctionRatio / u_sizeRatio * 2.0;\n  float effectiveSize = 1.0 - u_correctionRatio / nodeExtent;\n\n  // See findSourceClampT_ for the rotation rationale.\n  float ca = u_cameraAngle * (1.0 - targetRotateAlign);\n  float rc = cos(ca), rs = sin(ca);\n  mat2 rot = mat2(rc, -rs, rs, rc);\n\n  for (int i = 0; i < 12; i++) {\n    float mid = (lo + hi) * 0.5;\n    vec2 pos = path_").concat(pathName, "_position(mid, source, target);\n    vec2 localPos = rot * ((pos - target) / nodeExtent);\n    float sdf = querySDF(targetShapeId, localPos, effectiveSize);\n    if (sdf < 0.0) hi = mid;\n    else lo = mid;\n  }\n\n  float pathLen = path_").concat(pathName, "_length(source, target);\n  float marginT = (margin * u_correctionRatio / u_sizeRatio) / pathLen;\n  return (lo + hi) * 0.5 - marginT;\n}\n")
    );
  }
  function generateNumericalTangentNormal(pathName) {
    return "\n// Auto-generated numerical tangent (from position via finite differences)\nvec2 path_".concat(pathName, "_tangent(float t, vec2 source, vec2 target) {\n  float epsilon = 0.001;\n  float t1 = max(0.0, t - epsilon);\n  float t2 = min(1.0, t + epsilon);\n  vec2 p1 = path_").concat(pathName, "_position(t1, source, target);\n  vec2 p2 = path_").concat(pathName, "_position(t2, source, target);\n  return normalize(p2 - p1);\n}\n\n// Auto-generated normal (perpendicular to tangent)\nvec2 path_").concat(pathName, "_normal(float t, vec2 source, vec2 target) {\n  vec2 tangent = path_").concat(pathName, "_tangent(t, source, target);\n  return vec2(-tangent.y, tangent.x);\n}\n");
  }
  function generateAutoLength(pathName) {
    return (
      /*glsl*/
      "\n// Auto-generated path length (samples position 16 times)\nfloat path_".concat(pathName, "_length(vec2 source, vec2 target) {\n  float len = 0.0;\n  vec2 prev = path_").concat(pathName, "_position(0.0, source, target);\n  for (int i = 1; i <= 16; i++) {\n    float t = float(i) / 16.0;\n    vec2 curr = path_").concat(pathName, "_position(t, source, target);\n    len += length(curr - prev);\n    prev = curr;\n  }\n  return len;\n}\n")
    );
  }
  function generateAutoClosestT(pathName) {
    return (
      /*glsl*/
      "\n// Auto-generated closest_t (coarse sample + ternary search)\nfloat path_".concat(pathName, "_closest_t(vec2 p, vec2 source, vec2 target) {\n  // Coarse search: find best among 10 samples\n  float bestT = 0.0;\n  float bestDist = 1e10;\n  for (int i = 0; i <= 10; i++) {\n    float t = float(i) / 10.0;\n    vec2 pos = path_").concat(pathName, "_position(t, source, target);\n    float d = length(p - pos);\n    if (d < bestDist) {\n      bestDist = d;\n      bestT = t;\n    }\n  }\n\n  // Refine with ternary search\n  float lo = max(0.0, bestT - 0.1);\n  float hi = min(1.0, bestT + 0.1);\n  for (int i = 0; i < 10; i++) {\n    float mid1 = lo + (hi - lo) / 3.0;\n    float mid2 = hi - (hi - lo) / 3.0;\n    float d1 = length(p - path_").concat(pathName, "_position(mid1, source, target));\n    float d2 = length(p - path_").concat(pathName, "_position(mid2, source, target));\n    if (d1 < d2) {\n      hi = mid2;\n    } else {\n      lo = mid1;\n    }\n  }\n  return (lo + hi) * 0.5;\n}\n")
    );
  }
  function generateAutoDistance(pathName) {
    return (
      /*glsl*/
      "\n// Auto-generated signed distance (via closest_t + normal)\nfloat path_".concat(pathName, "_distance(vec2 p, vec2 source, vec2 target) {\n  float closestT = path_").concat(pathName, "_closest_t(p, source, target);\n  vec2 closest = path_").concat(pathName, "_position(closestT, source, target);\n  vec2 diff = p - closest;\n  float dist = length(diff);\n  if (dist < 0.0001) return 0.0;\n\n  // Get normal at closest point\n  vec2 normal = path_").concat(pathName, "_normal(closestT, source, target);\n  return dist * sign(dot(diff, normal));\n}\n")
    );
  }
  function generateAutoTAtDistance(pathName) {
    return (
      /*glsl*/
      "\n// Auto-generated t_at_distance (binary search)\nfloat path_".concat(pathName, "_t_at_distance(float targetDist, vec2 source, vec2 target) {\n  if (targetDist <= 0.0) return 0.0;\n\n  float totalLen = path_").concat(pathName, "_length(source, target);\n  if (targetDist >= totalLen) return 1.0;\n\n  // Binary search for t\n  float lo = 0.0, hi = 1.0;\n  for (int i = 0; i < 12; i++) {\n    float mid = (lo + hi) * 0.5;\n\n    // Compute arc length from 0 to mid\n    float arcLen = 0.0;\n    vec2 prev = path_").concat(pathName, "_position(0.0, source, target);\n    for (int j = 1; j <= 8; j++) {\n      float t = mid * float(j) / 8.0;\n      vec2 curr = path_").concat(pathName, "_position(t, source, target);\n      arcLen += length(curr - prev);\n      prev = curr;\n    }\n\n    if (arcLen < targetDist) {\n      lo = mid;\n    } else {\n      hi = mid;\n    }\n  }\n  return (lo + hi) * 0.5;\n}\n")
    );
  }
  function hasGlslFunction(glsl, functionName) {
    var pattern = new RegExp("\\b(float|vec[234]|void|int|bool)\\s+".concat(functionName, "\\s*\\("));
    return pattern.test(glsl);
  }
  function generatePathFallbacks(pathName, pathGlsl) {
    var fallbacks = [];
    if (!hasGlslFunction(pathGlsl, "path_".concat(pathName, "_length"))) {
      fallbacks.push(generateAutoLength(pathName));
    }
    if (!hasGlslFunction(pathGlsl, "path_".concat(pathName, "_closest_t"))) {
      fallbacks.push(generateAutoClosestT(pathName));
    }
    if (!hasGlslFunction(pathGlsl, "path_".concat(pathName, "_distance"))) {
      fallbacks.push(generateAutoDistance(pathName));
    }
    if (!hasGlslFunction(pathGlsl, "path_".concat(pathName, "_t_at_distance"))) {
      fallbacks.push(generateAutoTAtDistance(pathName));
    }
    if (fallbacks.length > 0) {
      return "\n// ============================================================================\n// Auto-generated fallback functions (path only provided position)\n// ============================================================================\n".concat(fallbacks.join("\n"));
    }
    return "";
  }
  function normalizeEdgeProgramOptions(options) {
    var _options$extremities, _options$defaultHead, _options$defaultTail;
    var paths = options.paths, layers = options.layers;
    var extremities = (_options$extremities = options.extremities) !== null && _options$extremities !== void 0 ? _options$extremities : [];
    if (paths.length === 0) throw new Error("At least one path is required in 'paths'");
    if (layers.length === 0) throw new Error("At least one layer is required in 'layers'");
    var defaultHead = (_options$defaultHead = options.defaultHead) !== null && _options$defaultHead !== void 0 ? _options$defaultHead : "none";
    var defaultTail = (_options$defaultTail = options.defaultTail) !== null && _options$defaultTail !== void 0 ? _options$defaultTail : "none";
    return {
      paths,
      extremities,
      layers,
      path: paths[0],
      layer: layers[0],
      defaultHead,
      defaultTail
    };
  }
  var _WebGL2RenderingConte = WebGL2RenderingContext;
  var FLOAT = _WebGL2RenderingConte.FLOAT;
  var UNSIGNED_BYTE = _WebGL2RenderingConte.UNSIGNED_BYTE;
  function collectUniformsMulti(paths, extremities, layers) {
    var standardUniforms = /* @__PURE__ */ new Set([
      "u_matrix",
      "u_sizeRatio",
      "u_correctionRatio",
      "u_zoomRatio",
      "u_pixelRatio",
      "u_cameraAngle",
      "u_minEdgeThickness",
      "u_pickingPadding",
      "u_nodeDataTexture",
      "u_nodeDataTextureWidth",
      "u_edgeDataTexture",
      "u_edgeDataTextureWidth",
      "u_edgeFrameTexture",
      "u_edgeFrameTextureWidth",
      // Edge path attribute texture uniforms
      "u_edgeAttributeTexture",
      "u_edgeAttributeTextureWidth",
      "u_edgeAttributeTexelsPerEdge"
    ]);
    var uniforms = new Set(standardUniforms);
    paths.forEach(function(p) {
      return p.uniforms.forEach(function(u) {
        return uniforms.add(u.name);
      });
    });
    extremities.forEach(function(e) {
      return e.uniforms.forEach(function(u) {
        return uniforms.add(u.name);
      });
    });
    layers.forEach(function(layer) {
      return layer.uniforms.forEach(function(u) {
        return uniforms.add(u.name);
      });
    });
    return Array.from(uniforms);
  }
  function generateAllPathsGLSL(paths) {
    var seen = /* @__PURE__ */ new Set();
    var parts = [];
    var _iterator = _createForOfIteratorHelper(paths), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var path = _step.value;
        if (!seen.has(path.name)) {
          seen.add(path.name);
          parts.push("// Path: ".concat(path.name));
          parts.push(path.glsl);
          parts.push(generateNumericalTangentNormal(path.name));
          parts.push(generatePathFallbacks(path.name, path.glsl));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return parts.join("\n\n");
  }
  function generateAllExtremitiesGLSL(extremities) {
    var parts = [];
    var _iterator2 = _createForOfIteratorHelper(extremities), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var ext = _step2.value;
        parts.push("// Extremity: ".concat(ext.name));
        parts.push(ext.glsl);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return parts.join("\n\n");
  }
  var PATH_SELECTOR_CONFIGS = [{
    queryName: "queryPathPosition",
    pathFunc: "position",
    returnType: "vec2",
    params: "float t, vec2 source, vec2 target",
    args: "t, source, target"
  }, {
    queryName: "queryPathTangent",
    pathFunc: "tangent",
    returnType: "vec2",
    params: "float t, vec2 source, vec2 target",
    args: "t, source, target"
  }, {
    queryName: "queryPathNormal",
    pathFunc: "normal",
    returnType: "vec2",
    params: "float t, vec2 source, vec2 target",
    args: "t, source, target"
  }, {
    queryName: "queryPathLength",
    pathFunc: "length",
    returnType: "float",
    params: "vec2 source, vec2 target",
    args: "source, target"
  }, {
    queryName: "queryPathClosestT",
    pathFunc: "closest_t",
    returnType: "float",
    params: "vec2 p, vec2 source, vec2 target",
    args: "p, source, target"
  }];
  function generatePathSelector$1(paths, config) {
    var queryName = config.queryName, pathFunc = config.pathFunc, returnType = config.returnType, params = config.params, args = config.args;
    if (paths.length === 1) {
      return "".concat(returnType, " ").concat(queryName, "(int pathId, ").concat(params, ") {\n  return path_").concat(paths[0].name, "_").concat(pathFunc, "(").concat(args, ");\n}");
    }
    var cases = paths.map(function(p, i) {
      return "    case ".concat(i, ": return path_").concat(p.name, "_").concat(pathFunc, "(").concat(args, ");");
    }).join("\n");
    return "".concat(returnType, " ").concat(queryName, "(int pathId, ").concat(params, ") {\n  switch (pathId) {\n").concat(cases, "\n    default: return path_").concat(paths[0].name, "_").concat(pathFunc, "(").concat(args, ");\n  }\n}");
  }
  function generateAllPathSelectors(paths) {
    return PATH_SELECTOR_CONFIGS.map(function(config) {
      return generatePathSelector$1(paths, config);
    }).join("\n\n");
  }
  function generateExtremitySdfSelector(extremities) {
    if (extremities.length === 1) {
      return "float queryExtremitySDF(int extremityId, vec2 uv, float lengthRatio, float widthRatio) {\n  return extremity_".concat(extremities[0].name, "(uv, lengthRatio, widthRatio);\n}");
    }
    var cases = extremities.map(function(e, i) {
      return "    case ".concat(i, ": return extremity_").concat(e.name, "(uv, lengthRatio, widthRatio);");
    }).join("\n");
    return "float queryExtremitySDF(int extremityId, vec2 uv, float lengthRatio, float widthRatio) {\n  switch (extremityId) {\n".concat(cases, "\n    default: return extremity_").concat(extremities[0].name, "(uv, lengthRatio, widthRatio);\n  }\n}");
  }
  function generateAllClampFunctions(paths) {
    var parts = [];
    var _iterator3 = _createForOfIteratorHelper(paths), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var path = _step3.value;
        parts.push(generateFindSourceClampT(path.name));
        parts.push(generateFindTargetClampT(path.name));
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (paths.length === 1) {
      parts.push("\nfloat queryFindSourceClampT(int pathId, vec2 source, float sourceSize, int sourceShapeId, float sourceRotateAlign, vec2 target, float margin) {\n  return findSourceClampT_".concat(paths[0].name, "(source, sourceSize, sourceShapeId, sourceRotateAlign, target, margin);\n}\n\nfloat queryFindTargetClampT(int pathId, vec2 source, vec2 target, float targetSize, int targetShapeId, float targetRotateAlign, float margin) {\n  return findTargetClampT_").concat(paths[0].name, "(source, target, targetSize, targetShapeId, targetRotateAlign, margin);\n}"));
    } else {
      var sourceCases = paths.map(function(p, i) {
        return "    case ".concat(i, ": return findSourceClampT_").concat(p.name, "(source, sourceSize, sourceShapeId, sourceRotateAlign, target, margin);");
      }).join("\n");
      var targetCases = paths.map(function(p, i) {
        return "    case ".concat(i, ": return findTargetClampT_").concat(p.name, "(source, target, targetSize, targetShapeId, targetRotateAlign, margin);");
      }).join("\n");
      parts.push("\nfloat queryFindSourceClampT(int pathId, vec2 source, float sourceSize, int sourceShapeId, float sourceRotateAlign, vec2 target, float margin) {\n  switch (pathId) {\n".concat(sourceCases, "\n    default: return findSourceClampT_").concat(paths[0].name, "(source, sourceSize, sourceShapeId, sourceRotateAlign, target, margin);\n  }\n}\n\nfloat queryFindTargetClampT(int pathId, vec2 source, vec2 target, float targetSize, int targetShapeId, float targetRotateAlign, float margin) {\n  switch (pathId) {\n").concat(targetCases, "\n    default: return findTargetClampT_").concat(paths[0].name, "(source, target, targetSize, targetShapeId, targetRotateAlign, margin);\n  }\n}"));
    }
    return parts.join("\n\n");
  }
  function generateEdgeFramePassVertexShader(paths, extremities, layers, nodeShapes, nodeLayers) {
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), _toConsumableArray(layers)));
    var textureFetch = generateEdgeAttributeTextureFetch(attributeLayout);
    var nodeAttributeLayout = getShapeAttributeLayout(nodeShapes, nodeLayers);
    var nodeAttributeNames = Object.keys(nodeAttributeLayout.offsets);
    var glslTypeOf = function glslTypeOf2(name) {
      var size = nodeAttributeLayout.specs[name].size;
      return size === 1 ? "float" : "vec".concat(size);
    };
    var nodeAttributeDeclarations = nodeAttributeNames.map(function(name) {
      return "".concat(glslTypeOf(name), " v_source_").concat(name, ";\n").concat(glslTypeOf(name), " v_target_").concat(name, ";");
    }).join("\n");
    var sourceAttributeFetch = generateAttributeTextureFetch(nodeAttributeLayout, {
      varPrefix: "srcNodeAttr",
      baseTexelExpr: "srcIdx * u_layerAttributeTexelsPerNode",
      textureWidthUniform: "u_layerAttributeTextureWidth",
      textureSamplerUniform: "u_layerAttributeTexture",
      outputPrefix: "v_source_"
    });
    var targetAttributeFetch = generateAttributeTextureFetch(nodeAttributeLayout, {
      varPrefix: "tgtNodeAttr",
      baseTexelExpr: "tgtIdx * u_layerAttributeTexelsPerNode",
      textureWidthUniform: "u_layerAttributeTextureWidth",
      textureSamplerUniform: "u_layerAttributeTexture",
      outputPrefix: "v_target_"
    });
    var dynamicAttributeGlobals = nodeAttributeNames.map(function(name) {
      return "".concat(glslTypeOf(name), " g_").concat(name, ";");
    }).join("\n");
    var setGlobalsFromSource = nodeAttributeNames.map(function(name) {
      return "  g_".concat(name, " = v_source_").concat(name, ";");
    }).join("\n");
    var setGlobalsFromTarget = nodeAttributeNames.map(function(name) {
      return "  g_".concat(name, " = v_target_").concat(name, ";");
    }).join("\n");
    var seenUniforms = /* @__PURE__ */ new Set();
    var customUniforms = [];
    var addUniform = function addUniform2(u) {
      if (!seenUniforms.has(u.name)) {
        seenUniforms.add(u.name);
        customUniforms.push("uniform ".concat(u.type, " ").concat(u.name, ";"));
      }
    };
    paths.forEach(function(p) {
      return p.uniforms.forEach(addUniform);
    });
    extremities.forEach(function(e) {
      return e.uniforms.forEach(addUniform);
    });
    var extremityWidthFactors = extremities.map(function(e) {
      return numberToGLSLFloat(e.widthFactor);
    }).join(", ");
    var maxMinBodyLengthRatio = Math.max.apply(Math, _toConsumableArray(paths.map(function(p) {
      return p.minBodyLengthRatio || 0;
    })));
    var shader = (
      /*glsl*/
      "#version 300 es\n\n// Node and edge data textures\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_edgeDataTexture;\nuniform int u_edgeDataTextureWidth;\n\n// Edge attribute texture (for path-specific attributes like curvature)\n".concat(textureFetch.uniformDeclarations, "\n\n// Node attribute texture (for node shape attributes)\nuniform sampler2D u_layerAttributeTexture;\nuniform int u_layerAttributeTextureWidth;\nuniform int u_layerAttributeTexelsPerNode;\n\n// Render params needed for clamping\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\nuniform float u_minEdgeThickness;\n\n// Edge-frame texture dimensions, for scattering each point to its texel\nuniform float u_frameTextureWidth;\nuniform float u_frameTextureHeight;\n\n// Custom path/extremity uniforms\n").concat(customUniforms.join("\n"), "\n\n// Path attribute varyings \u2014 assigned so path functions can read them as globals\n").concat(textureFetch.vertexVaryingDeclarations, "\n\n// Node size varyings \u2014 read by path functions like loop\nout float v_sourceNodeSize;\nout float v_targetNodeSize;\n\n// Node shape attributes per endpoint, and the ones querySDF reads\n").concat(nodeAttributeDeclarations, "\n").concat(dynamicAttributeGlobals, "\n\n// Scattered output written to the edge-frame texel: [tStart, tEnd, straightenFactor, pathLength]\nout vec4 v_clamp;\n\n// Extremity width factor array (needed for extremityScale computation)\nconst float EXTREMITY_WIDTH_FACTORS[").concat(extremities.length, "] = float[](").concat(extremityWidthFactors, ");\n\n// Node-data fetch helpers (geometry texel + rotation-flags texel)\n").concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_NODE_FLAGS, "\n\n// Shape SDFs for node boundary clamping\n").concat(getAllShapeGLSL(), "\n").concat(generateShapeSelectorGLSL(new Set(nodeAttributeNames)), "\n\n// Path functions\n").concat(generateAllPathsGLSL(paths), "\n").concat(generateAllPathSelectors(paths), "\n").concat(generateAllClampFunctions(paths), "\n\nvoid main() {\n  // One point per edge-data row; the row index is the edge-frame texel target.\n  int edgeIdx = gl_VertexID;\n  int texel0Idx = edgeIdx * 2;\n  int texel1Idx = edgeIdx * 2 + 1;\n  ivec2 edgeTexCoord0 = ivec2(texel0Idx % u_edgeDataTextureWidth, texel0Idx / u_edgeDataTextureWidth);\n  ivec2 edgeTexCoord1 = ivec2(texel1Idx % u_edgeDataTextureWidth, texel1Idx / u_edgeDataTextureWidth);\n  vec4 edgeData0 = texelFetch(u_edgeDataTexture, edgeTexCoord0, 0);\n  vec4 edgeData1 = texelFetch(u_edgeDataTexture, edgeTexCoord1, 0);\n\n  int srcIdx = int(edgeData0.x);\n  int tgtIdx = int(edgeData0.y);\n  float a_thickness = edgeData0.z;\n  float a_headLengthRatio = edgeData1.x;\n  float a_tailLengthRatio = edgeData1.y;\n  int pathId = int(edgeData1.z);\n  int extremityPacked = int(edgeData1.w);\n  int headId = extremityPacked >> 4;\n  int tailId = extremityPacked & 15;\n\n  // Fetch path/layer attributes and assign to path-function globals\n").concat(textureFetch.fetchCode, "\n").concat(textureFetch.varyingAssignments, "\n\n  // Fetch node shape attributes for both endpoints\n").concat(sourceAttributeFetch.fetchCode, "\n").concat(sourceAttributeFetch.varyingAssignments, "\n").concat(targetAttributeFetch.fetchCode, "\n").concat(targetAttributeFetch.varyingAssignments, "\n\n  // Fetch node geometry (texel 0) and rotation flags (texel 1).\n  vec4 srcNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx);\n  vec4 tgtNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx);\n\n  vec2 a_source = srcNodeData.xy;\n  vec2 a_target = tgtNodeData.xy;\n  float a_sourceSize = srcNodeData.z;\n  float a_targetSize = tgtNodeData.z;\n  float a_sourceShapeId = srcNodeData.w;\n  float a_targetShapeId = tgtNodeData.w;\n  // Per-node rotation alignment (0 = viewport, 1 = graph), for boundary clamping.\n  float a_sourceRotateAlign = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx).r;\n  float a_targetRotateAlign = readNodeFlags(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx).r;\n\n  v_sourceNodeSize = a_sourceSize;\n  v_targetNodeSize = a_targetSize;\n\n  float headLengthRatio = a_headLengthRatio;\n  float tailLengthRatio = a_tailLengthRatio;\n  float headWidthFactor = EXTREMITY_WIDTH_FACTORS[headId];\n  float tailWidthFactor = EXTREMITY_WIDTH_FACTORS[tailId];\n  float minBodyLengthRatio = ").concat(numberToGLSLFloat(maxMinBodyLengthRatio), ";\n\n  // Thickness in WebGL units (needed to compute clamping margin and extremity lengths)\n  float pixelsThickness = max(a_thickness, u_minEdgeThickness * u_sizeRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;\n\n  // SDF clamping: find where the edge body meets the node boundaries. Always\n  // searched (ungated) so labels get a true boundary clamp; the body re-applies\n  // its extremity gating in-shader.\n").concat(setGlobalsFromSource, "\n  float tStart = queryFindSourceClampT(pathId, a_source, a_sourceSize, int(a_sourceShapeId), a_sourceRotateAlign, a_target, 0.0);\n").concat(setGlobalsFromTarget, "\n  float tEnd = queryFindTargetClampT(pathId, a_source, a_target, a_targetSize, int(a_targetShapeId), a_targetRotateAlign, 0.0);\n\n  // straightenFactor (frame .z) is consumed only by the body, which runs to the\n  // node center when an extremity is absent. Derive the straightening math from\n  // these gated clamps \u2014 not the ungated boundary ones above \u2014 so it matches the\n  // geometry it drives. The ungated tStart/tEnd remain what labels read.\n  float bodyTStart = tailLengthRatio > 0.0 ? tStart : 0.0;\n  float bodyTEnd = headLengthRatio > 0.0 ? tEnd : 1.0;\n\n  // Path length and zone boundaries (needed for straightening check)\n  float pathLength = queryPathLength(pathId, a_source, a_target);\n  float visibleLength = pathLength * (bodyTEnd - bodyTStart);\n\n  float headLength = headLengthRatio * webGLThickness;\n  float tailLength = tailLengthRatio * webGLThickness;\n  float minBodyLength = minBodyLengthRatio * webGLThickness;\n\n  float totalNeededLength = headLength + tailLength + minBodyLength;\n  float extremityScale = 1.0;\n  if (totalNeededLength > visibleLength && totalNeededLength > 0.0001) {\n    extremityScale = visibleLength / totalNeededLength;\n    headLength *= extremityScale;\n    tailLength *= extremityScale;\n  }\n\n  float headLengthT = pathLength > 0.0001 ? headLength / pathLength : 0.0;\n  float tailLengthT = pathLength > 0.0001 ? tailLength / pathLength : 0.0;\n\n  float tTailEnd = bodyTStart + tailLengthT;\n  float tHeadStart = bodyTEnd - headLengthT;\n  if (tTailEnd > tHeadStart) {\n    float mid = (bodyTStart + bodyTEnd) * 0.5;\n    tTailEnd = mid;\n    tHeadStart = mid;\n  }\n\n  // Straighten factor: blend toward straight line when path twists in extremity zones\n  float straightenFactor = 0.0;\n  {\n    float maxDeviation = 0.0;\n    if (tailLengthT > 0.0001) {\n      vec2 tailTang = queryPathTangent(pathId, tTailEnd, a_source, a_target);\n      vec2 tailChord = queryPathPosition(pathId, bodyTStart, a_source, a_target)\n                     - queryPathPosition(pathId, tTailEnd, a_source, a_target);\n      float tailChordLen = length(tailChord);\n      if (tailChordLen > 0.0001) {\n        maxDeviation = max(maxDeviation, 1.0 - dot(-tailTang, tailChord / tailChordLen));\n      }\n    }\n    if (headLengthT > 0.0001) {\n      vec2 headTang = queryPathTangent(pathId, tHeadStart, a_source, a_target);\n      vec2 headChord = queryPathPosition(pathId, bodyTEnd, a_source, a_target)\n                     - queryPathPosition(pathId, tHeadStart, a_source, a_target);\n      float headChordLen = length(headChord);\n      if (headChordLen > 0.0001) {\n        maxDeviation = max(maxDeviation, 1.0 - dot(headTang, headChord / headChordLen));\n      }\n    }\n    straightenFactor = smoothstep(0.035, 0.5, maxDeviation);\n  }\n\n  // When straightening, blend the ungated tStart/tEnd (the label-facing clamps)\n  // toward straight-line clamp positions.\n  if (straightenFactor > 0.001) {\n    if (tailLengthRatio > 0.0) {\n").concat(setGlobalsFromSource, "\n      float srcExtent = a_sourceSize * u_correctionRatio / u_sizeRatio * 2.0;\n      float srcEffective = 1.0 - u_correctionRatio / srcExtent;\n      float srcCa = u_cameraAngle * (1.0 - a_sourceRotateAlign);\n      mat2 srcRot = mat2(cos(srcCa), -sin(srcCa), sin(srcCa), cos(srcCa));\n      float lo = 0.0, hi = 0.5;\n      for (int i = 0; i < 12; i++) {\n        float mid = (lo + hi) * 0.5;\n        vec2 pos = mix(a_source, a_target, mid);\n        vec2 localPos = srcRot * ((pos - a_source) / srcExtent);\n        float sdf = querySDF(int(a_sourceShapeId), localPos, srcEffective);\n        if (sdf < 0.0) lo = mid; else hi = mid;\n      }\n      tStart = mix(tStart, (lo + hi) * 0.5, straightenFactor);\n    }\n    if (headLengthRatio > 0.0) {\n").concat(setGlobalsFromTarget, "\n      float tgtExtent = a_targetSize * u_correctionRatio / u_sizeRatio * 2.0;\n      float tgtEffective = 1.0 - u_correctionRatio / tgtExtent;\n      float tgtCa = u_cameraAngle * (1.0 - a_targetRotateAlign);\n      mat2 tgtRot = mat2(cos(tgtCa), -sin(tgtCa), sin(tgtCa), cos(tgtCa));\n      float lo = 0.5, hi = 1.0;\n      for (int i = 0; i < 12; i++) {\n        float mid = (lo + hi) * 0.5;\n        vec2 pos = mix(a_source, a_target, mid);\n        vec2 localPos = tgtRot * ((pos - a_target) / tgtExtent);\n        float sdf = querySDF(int(a_targetShapeId), localPos, tgtEffective);\n        if (sdf < 0.0) hi = mid; else lo = mid;\n      }\n      tEnd = mix(tEnd, (lo + hi) * 0.5, straightenFactor);\n    }\n  }\n\n  v_clamp = vec4(tStart, tEnd, straightenFactor, pathLength);\n\n  // Scatter this point to its edge's texel center in the frame texture.\n  float x = mod(float(edgeIdx), u_frameTextureWidth);\n  float y = floor(float(edgeIdx) / u_frameTextureWidth);\n  vec2 ndc = (vec2(x, y) + 0.5) / vec2(u_frameTextureWidth, u_frameTextureHeight) * 2.0 - 1.0;\n  gl_Position = vec4(ndc, 0.0, 1.0);\n  gl_PointSize = 1.0;\n}\n")
    );
    return shader;
  }
  var ZONE_TAIL = 0;
  var ZONE_BODY = 1;
  var ZONE_HEAD = 2;
  function generateZonedConstantData(bodySegments, hasHead, hasTail) {
    var data = [];
    if (hasTail) {
      data.push([ZONE_TAIL, 0, -1], [ZONE_TAIL, 0, 1]);
      data.push([ZONE_TAIL, 1, -1], [ZONE_TAIL, 1, 1]);
    }
    for (var i = 0; i <= bodySegments; i++) {
      var t = i / bodySegments;
      data.push([ZONE_BODY, t, -1], [ZONE_BODY, t, 1]);
    }
    if (hasHead) {
      data.push([ZONE_HEAD, 0, -1], [ZONE_HEAD, 0, 1]);
      data.push([ZONE_HEAD, 1, -1], [ZONE_HEAD, 1, 1]);
    }
    return {
      data,
      attributes: [{
        name: "a_zone",
        size: 1,
        type: FLOAT
      }, {
        name: "a_zoneT",
        size: 1,
        type: FLOAT
      }, {
        name: "a_side",
        size: 1,
        type: FLOAT
      }],
      verticesPerEdge: data.length
    };
  }
  function generateVertexShaderMulti(paths, extremities, layers, constantAttributes) {
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), _toConsumableArray(layers)));
    var textureFetch = generateEdgeAttributeTextureFetch(attributeLayout);
    var standardUniforms = /* @__PURE__ */ new Set(["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_zoomRatio", "u_pixelRatio", "u_cameraAngle", "u_minEdgeThickness", "u_pickingPadding", "u_nodeDataTexture"]);
    var seenUniforms = /* @__PURE__ */ new Set();
    var customUniforms = [];
    var addUniform = function addUniform2(u) {
      if (!standardUniforms.has(u.name) && !seenUniforms.has(u.name)) {
        seenUniforms.add(u.name);
        customUniforms.push("uniform ".concat(u.type, " ").concat(u.name, ";"));
      }
    };
    paths.forEach(function(p) {
      return p.uniforms.forEach(addUniform);
    });
    extremities.forEach(function(e) {
      return e.uniforms.forEach(addUniform);
    });
    layers.forEach(function(layer) {
      return layer.uniforms.forEach(addUniform);
    });
    var constantAttrDeclarations = constantAttributes.map(function(attr) {
      var glslType = attr.size === 1 ? "float" : "vec".concat(attr.size);
      return "in ".concat(glslType, " ").concat(attr.name, ";");
    }).join("\n");
    var extremityWidthFactors = extremities.map(function(e) {
      return numberToGLSLFloat(e.widthFactor);
    }).join(", ");
    var maxMinBodyLengthRatio = Math.max.apply(Math, _toConsumableArray(paths.map(function(p) {
      return p.minBodyLengthRatio || 0;
    })));
    var needsNodeColors = layers.some(function(layer) {
      return layer.needsNodeColors;
    });
    var needsNodeSize = paths.some(function(p) {
      return p.needsNodeSize;
    });
    var glsl = (
      /*glsl*/
      "#version 300 es\n\n// Constant attributes (per vertex)\n".concat(constantAttrDeclarations, "\n\n// Per-edge attributes\n// Edge data (source/target indices, thickness, extremity ratios, path/extremity IDs)\n// is fetched from edge data texture via edge index\nin float a_edgeIndex;   // Index into edge data texture\nin vec4 a_color;        // Edge color\nin vec4 a_id;           // Edge ID for picking\nin float a_opacity;     // Edge opacity\n\n// Standard uniforms\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_zoomRatio;\nuniform float u_pixelRatio;\nuniform float u_cameraAngle;\nuniform float u_minEdgeThickness;\n#ifdef PICKING_MODE\nuniform float u_pickingPadding;\n#endif\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_edgeDataTexture;\nuniform int u_edgeDataTextureWidth;\nuniform sampler2D u_edgeFrameTexture;\nuniform int u_edgeFrameTextureWidth;\n\n// Edge path attribute texture uniforms\n").concat(textureFetch.uniformDeclarations, "\n\n// Custom uniforms\n").concat(customUniforms.join("\n"), "\n\n// Standard varyings\nout vec4 v_color;\nout float v_opacity;\nout vec4 v_id;\nout float v_thickness;       // Edge body thickness (in consistent units)\nout float v_t;\nout float v_tStart;\nout float v_tEnd;\nout float v_side;\nout float v_antialiasingWidth;  // Anti-aliasing width (normalized: u_correctionRatio / thickness)\nout vec2 v_source;\nout vec2 v_target;\nout float v_edgeLength;\n").concat(needsNodeSize ? "\nout float v_sourceNodeSize;  // Source node size (mirrored in labels/generator.ts as plain float)\nout float v_targetNodeSize;  // Target node size (mirrored in labels/generator.ts as plain float)" : "", "\n").concat(needsNodeColors ? "\nout vec4 v_sourceColor;\nout vec4 v_targetColor;" : "", "\n// Zone varyings\nout float v_zone;            // 0=tail, 1=body, 2=head\nout float v_zoneT;           // Position within zone [0,1]\nout float v_headLengthRatio; // Head length as ratio of thickness\nout float v_tailLengthRatio; // Tail length as ratio of thickness\nout float v_headWidthRatio;  // Head width factor\nout float v_tailWidthRatio;  // Tail width factor\n\n// Multi-path/extremity varyings\nflat out int v_pathId;\nflat out int v_headId;\nflat out int v_tailId;\n\n// Path/layer attribute varyings (fetched from edge attribute texture)\n").concat(textureFetch.vertexVaryingDeclarations, "\n\nconst float bias = 255.0 / 254.0;\n\n// Width factor array for extremities (shared pool for head/tail)\nconst float EXTREMITY_WIDTH_FACTORS[").concat(extremities.length, "] = float[](").concat(extremityWidthFactors, ");\n\n// All path functions\n").concat(generateAllPathsGLSL(paths), "\n\n// Path selector functions\n").concat(generateAllPathSelectors(paths), "\n\n// Node-data fetch helper (geometry texel of the two-texel node stride)\n").concat(GLSL_READ_NODE_DATA, "\n").concat(needsNodeColors ? GLSL_READ_NODE_COLOR : "", "\n// Per-edge clamp from the frame-pass (tStart, tEnd, straightenFactor, pathLength)\n").concat(GLSL_READ_FRAME_TEXEL, "\n\nvoid main() {\n  // Fetch edge data from edge texture (2 texels per edge)\n  // Texel 0: sourceNodeIndex, targetNodeIndex, thickness, reserved\n  // Texel 1: headLengthRatio, tailLengthRatio, pathId, (headId << 4) | tailId\n  int edgeIdx = int(a_edgeIndex);\n\n  // Hidden edges are flagged with a negative row by EdgeProgram.process(). Push\n  // the whole primitive outside the clip volume: every vertex lands at the same\n  // out-of-range position, so it is fully clipped and rasterizes nothing \u2014\n  // neither to the frame buffer nor to the picking buffer.\n  if (edgeIdx < 0) {\n    gl_Position = vec4(2.0, 0.0, 0.0, 1.0);\n    v_color = vec4(0.0);\n    v_id = vec4(0.0);\n    return;\n  }\n\n  int texel0Idx = edgeIdx * 2;\n  int texel1Idx = edgeIdx * 2 + 1;\n  ivec2 edgeTexCoord0 = ivec2(texel0Idx % u_edgeDataTextureWidth, texel0Idx / u_edgeDataTextureWidth);\n  ivec2 edgeTexCoord1 = ivec2(texel1Idx % u_edgeDataTextureWidth, texel1Idx / u_edgeDataTextureWidth);\n  vec4 edgeData0 = texelFetch(u_edgeDataTexture, edgeTexCoord0, 0);\n  vec4 edgeData1 = texelFetch(u_edgeDataTexture, edgeTexCoord1, 0);\n\n  // Unpack edge data\n  int srcIdx = int(edgeData0.x);\n  int tgtIdx = int(edgeData0.y);\n  float a_thickness = edgeData0.z;\n  // edgeData0.w is now reserved (curvature moved to path attribute texture)\n  float a_headLengthRatio = edgeData1.x;\n  float a_tailLengthRatio = edgeData1.y;\n  int pathId = int(edgeData1.z);\n  int extremityPacked = int(edgeData1.w);\n  int headId = extremityPacked >> 4;\n  int tailId = extremityPacked & 15;\n\n  // Fetch path/layer attributes from edge attribute texture\n").concat(textureFetch.fetchCode, "\n\n  // Assign path/layer attribute varyings\n").concat(textureFetch.varyingAssignments, "\n\n  // Fetch source and target node geometry (texel 0 of the two-texel node stride)\n  vec4 srcNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx);\n  vec4 tgtNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx);\n\n  vec2 a_source = srcNodeData.xy;\n  vec2 a_target = tgtNodeData.xy;\n").concat(needsNodeSize ? "\n  // Assign node size varyings early (path functions like loops need them during clamping)\n  v_sourceNodeSize = srcNodeData.z;\n  v_targetNodeSize = tgtNodeData.z;" : "", "\n").concat(needsNodeColors ? "\n  v_sourceColor = readNodeColor(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx);\n  v_targetColor = readNodeColor(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx);" : "", "\n\n  // Convert thickness to WebGL units\n  float minThickness = u_minEdgeThickness;\n  float pixelsThickness = max(a_thickness, minThickness * u_sizeRatio);\n  float webGLThickness = pixelsThickness * u_correctionRatio / u_sizeRatio;\n\n  // Extremity parameters from ID lookups (shared pool)\n  float headLengthRatio = a_headLengthRatio;\n  float tailLengthRatio = a_tailLengthRatio;\n  float headWidthFactor = EXTREMITY_WIDTH_FACTORS[headId];\n  float tailWidthFactor = EXTREMITY_WIDTH_FACTORS[tailId];\n  float minBodyLengthRatio = ").concat(numberToGLSLFloat(maxMinBodyLengthRatio), ";\n\n  // Per-edge values from the frame-pass texture (read by edge index).\n  // tStart/tEnd are the ungated boundary clamps: re-apply the body's extremity\n  // gating here (no extremity \u2192 body runs to the node center, 0/1).\n  vec4 frameClamp = readFrameTexel(u_edgeFrameTexture, u_edgeFrameTextureWidth, edgeIdx);\n  float tStart           = a_tailLengthRatio > 0.0 ? frameClamp.x : 0.0;\n  float tEnd             = a_headLengthRatio > 0.0 ? frameClamp.y : 1.0;\n  float straightenFactor = frameClamp.z;\n  float pathLength       = frameClamp.w;\n\n  // Anti-aliasing width (~1 pixel, normalized by thickness)\n  float antialiasingWidth = u_correctionRatio / webGLThickness;\n\n  float visibleLength = pathLength * (tEnd - tStart);\n\n  // Compute extremity lengths in world units\n  float headLength = headLengthRatio * webGLThickness;\n  float tailLength = tailLengthRatio * webGLThickness;\n  float minBodyLength = minBodyLengthRatio * webGLThickness;\n\n  // Handle short edges: scale down extremities if needed\n  float totalNeededLength = headLength + tailLength + minBodyLength;\n  float extremityScale = 1.0;\n  if (totalNeededLength > visibleLength && totalNeededLength > 0.0001) {\n    extremityScale = visibleLength / totalNeededLength;\n    headLength *= extremityScale;\n    tailLength *= extremityScale;\n  }\n\n  // Convert lengths to t-values\n  float headLengthT = pathLength > 0.0001 ? headLength / pathLength : 0.0;\n  float tailLengthT = pathLength > 0.0001 ? tailLength / pathLength : 0.0;\n\n  // Zone boundaries in t-space\n  float tTailEnd = tStart + tailLengthT;\n  float tHeadStart = tEnd - headLengthT;\n\n  // Ensure body has non-negative length\n  if (tTailEnd > tHeadStart) {\n    float mid = (tStart + tEnd) * 0.5;\n    tTailEnd = mid;\n    tHeadStart = mid;\n  }\n\n  // Convert to webGL units for geometry expansion\n  float aaWidthWebGL = antialiasingWidth * webGLThickness;\n\n  // Extra geometry width for picking padding (0 in visual mode)\n  #ifdef PICKING_MODE\n    float pickingPaddingWebGL = u_pickingPadding * u_correctionRatio;\n  #else\n    float pickingPaddingWebGL = 0.0;\n  #endif\n\n  // Straight-line direction and normal (for blending when straightenFactor > 0)\n  vec2 straightDir = length(a_target - a_source) > 0.0001\n    ? normalize(a_target - a_source) : vec2(1.0, 0.0);\n  vec2 straightNormal = vec2(-straightDir.y, straightDir.x);\n\n  // Zone-based vertex processing using path selectors\n  vec2 position;\n  vec2 normal;\n  float t;\n  float zone = a_zone;\n  float zoneT = a_zoneT;\n  float side = a_side;\n\n  // Scaled extremity width factors (geometry must be at least as wide as body)\n  float scaledTailWidth = max(tailWidthFactor * extremityScale, 1.0);\n  float scaledHeadWidth = max(headWidthFactor * extremityScale, 1.0);\n\n  if (zone < 0.5) {\n    // TAIL ZONE: rectangular quad with scaled width\n    vec2 tang = queryPathTangent(pathId, tTailEnd, a_source, a_target);\n    normal = vec2(-tang.y, tang.x);\n    vec2 centerPos = mix(queryPathPosition(pathId, tStart, a_source, a_target),\n                         queryPathPosition(pathId, tTailEnd, a_source, a_target), zoneT);\n    float halfWidth = webGLThickness * scaledTailWidth * 0.5 + aaWidthWebGL + pickingPaddingWebGL;\n    position = centerPos + normal * side * halfWidth;\n    t = mix(tStart, tTailEnd, zoneT);\n\n  } else if (zone < 1.5) {\n    // BODY ZONE: follows path curvature with width = 1.0\n    t = mix(tTailEnd, tHeadStart, zoneT);\n    normal = queryPathNormal(pathId, t, a_source, a_target);\n    float halfWidth = webGLThickness * 0.5 + aaWidthWebGL + pickingPaddingWebGL;\n    position = queryPathPosition(pathId, t, a_source, a_target) + normal * side * halfWidth;\n\n  } else {\n    // HEAD ZONE: rectangular quad with scaled width\n    vec2 tang = queryPathTangent(pathId, tHeadStart, a_source, a_target);\n    normal = vec2(-tang.y, tang.x);\n    vec2 centerPos = mix(queryPathPosition(pathId, tHeadStart, a_source, a_target),\n                         queryPathPosition(pathId, tEnd, a_source, a_target), zoneT);\n    float halfWidth = webGLThickness * scaledHeadWidth * 0.5 + aaWidthWebGL + pickingPaddingWebGL;\n    position = centerPos + normal * side * halfWidth;\n    t = mix(tHeadStart, tEnd, zoneT);\n  }\n\n  // Blend toward straight line based on path twist in extremity zones\n  if (straightenFactor > 0.001) {\n    float zoneWidth = zone < 0.5 ? webGLThickness * scaledTailWidth * 0.5 + aaWidthWebGL + pickingPaddingWebGL :\n                      zone < 1.5 ? webGLThickness * 0.5 + aaWidthWebGL + pickingPaddingWebGL :\n                      webGLThickness * scaledHeadWidth * 0.5 + aaWidthWebGL + pickingPaddingWebGL;\n    vec2 straightPos = mix(a_source, a_target, t) + straightNormal * side * zoneWidth;\n    position = mix(position, straightPos, straightenFactor);\n  }\n\n  gl_Position = vec4((u_matrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n\n  // Pass varyings to fragment shader\n  v_color = a_color;\n  v_color.a *= bias;\n  v_opacity = a_opacity;\n  v_id = a_id;\n  v_thickness = webGLThickness;\n  v_t = t;\n  v_tStart = tStart;\n  v_tEnd = tEnd;\n  v_side = side;\n  v_antialiasingWidth = antialiasingWidth;\n  v_source = a_source;\n  v_target = a_target;\n  v_edgeLength = pathLength;\n\n  // Zone varyings\n  v_zone = zone;\n  v_zoneT = zoneT;\n  v_headLengthRatio = headLengthRatio * extremityScale;\n  v_tailLengthRatio = tailLengthRatio * extremityScale;\n  // Scale extremity width proportionally with length when crushed\n  v_headWidthRatio = headWidthFactor * extremityScale;\n  v_tailWidthRatio = tailWidthFactor * extremityScale;\n\n  // Multi-path varyings\n  v_pathId = pathId;\n  v_headId = headId;\n  v_tailId = tailId;\n}\n")
    );
    return glsl;
  }
  function generateFragmentShaderMulti(paths, extremities, layers, antialias) {
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), _toConsumableArray(layers)));
    var textureFetch = generateEdgeAttributeTextureFetch(attributeLayout);
    var standardUniforms = /* @__PURE__ */ new Set(["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_zoomRatio", "u_pixelRatio", "u_cameraAngle", "u_minEdgeThickness", "u_pickingPadding"]);
    var seenUniforms = /* @__PURE__ */ new Set();
    var customUniforms = [];
    var addUniform = function addUniform2(u) {
      if (!standardUniforms.has(u.name) && !seenUniforms.has(u.name)) {
        seenUniforms.add(u.name);
        customUniforms.push("uniform ".concat(u.type, " ").concat(u.name, ";"));
      }
    };
    paths.forEach(function(p) {
      return p.uniforms.forEach(addUniform);
    });
    extremities.forEach(function(e) {
      return e.uniforms.forEach(addUniform);
    });
    layers.forEach(function(layer) {
      return layer.uniforms.forEach(addUniform);
    });
    var extremityBaseRatios = extremities.map(function(e) {
      var _e$baseRatio;
      return numberToGLSLFloat((_e$baseRatio = e.baseRatio) !== null && _e$baseRatio !== void 0 ? _e$baseRatio : 0.5);
    }).join(", ");
    var baseRatioLookup = function baseRatioLookup2(idVar) {
      var _extremities$0$baseRa, _extremities$;
      return extremities.length > 1 ? "EXTREMITY_BASE_RATIOS[".concat(idVar, "]") : numberToGLSLFloat((_extremities$0$baseRa = (_extremities$ = extremities[0]) === null || _extremities$ === void 0 ? void 0 : _extremities$.baseRatio) !== null && _extremities$0$baseRa !== void 0 ? _extremities$0$baseRa : 0.5);
    };
    var hasAnyExtremityGeometry = extremities.some(function(e) {
      return !isAttributeSource(e.length) ? e.length > 0 : true;
    });
    var needsNodeColors = layers.some(function(layer) {
      return layer.needsNodeColors;
    });
    var needsNodeSize = paths.some(function(p) {
      return p.needsNodeSize;
    });
    var layerCalls = layers.map(function(layer, index) {
      return "  // Layer ".concat(index + 1, ": ").concat(layer.name, "\n  color = blendOver(color, layer_").concat(layer.name, "(context));");
    }).join("\n\n");
    var glsl = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\n// Standard varyings\nin vec4 v_color;\nin float v_opacity;\nin vec4 v_id;\nin float v_thickness;       // Edge body thickness\nin float v_t;\nin float v_tStart;\nin float v_tEnd;\nin float v_side;\nin float v_antialiasingWidth;  // Anti-aliasing width (normalized: u_correctionRatio / thickness)\nin vec2 v_source;\nin vec2 v_target;\nin float v_edgeLength;\n".concat(needsNodeSize ? "\nin float v_sourceNodeSize;   // Source node size (mirrored in labels/generator.ts as plain float)\nin float v_targetNodeSize;   // Target node size (mirrored in labels/generator.ts as plain float)" : "", "\n").concat(needsNodeColors ? "\nin vec4 v_sourceColor;\nin vec4 v_targetColor;" : "", "\n// Zone varyings\nin float v_zone;            // 0=tail, 1=body, 2=head\nin float v_zoneT;           // Position within zone [0,1]\nin float v_headLengthRatio; // Head length as ratio of thickness (scaled for short edges)\nin float v_tailLengthRatio; // Tail length as ratio of thickness (scaled for short edges)\nin float v_headWidthRatio;  // Head width factor\nin float v_tailWidthRatio;  // Tail width factor\n\n// Multi-path/extremity varyings\nflat in int v_pathId;\nflat in int v_headId;\nflat in int v_tailId;\n\n// Path/layer attribute varyings (from vertex shader texture fetch)\n").concat(textureFetch.fragmentVaryingDeclarations, "\n\n// Standard uniforms (needed by some path types)\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_cameraAngle;\n#ifdef PICKING_MODE\nuniform float u_pickingPadding;\n#endif\n\n// Custom uniforms\n").concat(customUniforms.join("\n"), "\n\n// Fragment output (single target - picking handled via separate pass)\nout vec4 fragColor;\n\n").concat(extremities.length > 1 ? "// Base ratio array for extremities (shared pool for head/tail)\nconst float EXTREMITY_BASE_RATIOS[".concat(extremities.length, "] = float[](").concat(extremityBaseRatios, ");") : "", '\n\n// EdgeContext struct\nstruct EdgeContext {\n  float t;                   // Position along path [0, 1]\n  float sdf;                 // Signed distance from centerline\n  vec2 position;             // World position\n  vec2 tangent;              // Path tangent\n  vec2 normal;               // Path normal\n  float thickness;           // Edge thickness\n  float aaWidth;             // Anti-aliasing width\n  float edgeLength;          // Total path length\n  float tStart;              // Clamped start t\n  float tEnd;                // Clamped end t\n  float distanceFromSource;  // Arc distance from source\n  float distanceToTarget;    // Arc distance to target\n};\n\nEdgeContext context;\n\n// Alpha "over" compositing for layer blending\nvec4 blendOver(vec4 bg, vec4 fg) {\n  float a = fg.a;\n  return vec4(mix(bg.rgb, fg.rgb, a), bg.a + a * (1.0 - bg.a));\n}\n\n// All path functions\n').concat(generateAllPathsGLSL(paths), "\n\n// Path selector functions\n").concat(generateAllPathSelectors(paths), "\n\n// All extremity functions\n").concat(generateAllExtremitiesGLSL(extremities), "\n\n// Extremity SDF selector (shared pool for head/tail)\n").concat(generateExtremitySdfSelector(extremities), "\n\n// Layer functions\n").concat(layers.map(function(layer) {
        return layer.glsl;
      }).join("\n\n"), "\n\n// Helper: Compute arc length using path selector\nfloat computeArcLengthMulti(int pathId, float t0, float t1, vec2 source, vec2 target, int samples) {\n  float arcLen = 0.0;\n  vec2 prev = queryPathPosition(pathId, t0, source, target);\n  for (int i = 1; i <= samples; i++) {\n    float t = t0 + (t1 - t0) * float(i) / float(samples);\n    vec2 curr = queryPathPosition(pathId, t, source, target);\n    arcLen += length(curr - prev);\n    prev = curr;\n  }\n  return arcLen;\n}\n\nvoid main() {\n  // Compute normalized t within visible edge (0 = start, 1 = end)\n  float tNorm = (v_t - v_tStart) / max(v_tEnd - v_tStart, 0.0001);\n\n  // Edge body half-thickness\n  float halfThickness = v_thickness * 0.5;\n\n  // Convert normalized AA width to webGL units (~1 pixel)\n  float aaWidthWebGL = v_antialiasingWidth * v_thickness;\n\n  // Distance from centerline based on v_side interpolation\n  float zoneWidthFactor = v_zone < 0.5 ? v_tailWidthRatio :\n                          v_zone < 1.5 ? 1.0 :\n                          v_headWidthRatio;\n  // In PICKING_MODE, inflate halfGeometryWidth to match the inflated vertex geometry\n  #ifdef PICKING_MODE\n    float halfGeometryWidth = halfThickness * zoneWidthFactor + aaWidthWebGL + u_pickingPadding * aaWidthWebGL;\n  #else\n    float halfGeometryWidth = halfThickness * zoneWidthFactor + aaWidthWebGL;\n  #endif\n  float distFromCenter = abs(v_side) * halfGeometryWidth;\n\n  // Populate EdgeContext (for layer functions)\n  context.t = tNorm;\n  context.sdf = distFromCenter - halfThickness;\n  context.position = queryPathPosition(v_pathId, v_t, v_source, v_target);\n  context.tangent = queryPathTangent(v_pathId, v_t, v_source, v_target);\n  context.normal = vec2(-context.tangent.y, context.tangent.x);\n  context.thickness = v_thickness;\n  context.aaWidth = aaWidthWebGL;\n  context.edgeLength = v_edgeLength;\n  context.tStart = v_tStart;\n  context.tEnd = v_tEnd;\n\n  // Compute arc distances\n  float visibleLength = v_edgeLength * (v_tEnd - v_tStart);\n  float pathT = v_t;\n  float pathTNorm = tNorm;\n").concat(paths.every(function(p) {
        return p.linearParameterization;
      }) ? "  // All paths have linear parameterization: t maps directly to arc distance\n  context.distanceFromSource = pathTNorm * visibleLength;\n  context.distanceToTarget = (1.0 - pathTNorm) * visibleLength;" : paths.every(function(p) {
        return !p.linearParameterization;
      }) ? "  // No paths have linear parameterization: use numerical integration\n  context.distanceFromSource = computeArcLengthMulti(v_pathId, v_tStart, pathT, v_source, v_target, 16);\n  context.distanceToTarget = computeArcLengthMulti(v_pathId, pathT, v_tEnd, v_source, v_target, 16);" : "  // Mixed parameterization: use analytical for linear paths, numerical for others\n  if (".concat(paths.filter(function(p) {
        return p.linearParameterization;
      }).map(function(p) {
        return "v_pathId == ".concat(paths.indexOf(p));
      }).join(" || "), ") {\n    context.distanceFromSource = pathTNorm * visibleLength;\n    context.distanceToTarget = (1.0 - pathTNorm) * visibleLength;\n  } else {\n    context.distanceFromSource = computeArcLengthMulti(v_pathId, v_tStart, pathT, v_source, v_target, 16);\n    context.distanceToTarget = computeArcLengthMulti(v_pathId, pathT, v_tEnd, v_source, v_target, 16);\n  }"), "\n\n  // Compute SDF based on zone using extremity selector (shared pool)\n  float bodySDF = distFromCenter - halfThickness;\n  float finalSDF;\n\n").concat(hasAnyExtremityGeometry ? "  // Base ratios, from baseRatioLookup\n  float headBaseRatio = ".concat(baseRatioLookup("v_headId"), ";\n  float tailBaseRatio = ").concat(baseRatioLookup("v_tailId"), ";\n\n  if (v_zone < 0.5) {\n    // TAIL ZONE: v_zoneT goes 0 (tip) to 1 (base)\n    vec2 uv = vec2((1.0 - v_zoneT) * v_tailLengthRatio, v_side * v_tailWidthRatio * 0.5);\n    float tailSDF = queryExtremitySDF(v_tailId, uv, v_tailLengthRatio, v_tailWidthRatio) * v_thickness;\n\n    // Apply union only near base (v_zoneT > 1 - baseRatio)\n    if (v_zoneT > 1.0 - tailBaseRatio) {\n      finalSDF = min(tailSDF, bodySDF);\n    } else {\n      finalSDF = tailSDF;\n    }\n  } else if (v_zone < 1.5) {\n    // BODY ZONE: distance from centerline\n    finalSDF = bodySDF;\n  } else {\n    // HEAD ZONE: v_zoneT goes 0 (base) to 1 (tip)\n    vec2 uv = vec2(v_zoneT * v_headLengthRatio, v_side * v_headWidthRatio * 0.5);\n    float headSDF = queryExtremitySDF(v_headId, uv, v_headLengthRatio, v_headWidthRatio) * v_thickness;\n\n    // Apply union only near base (v_zoneT < baseRatio)\n    if (v_zoneT < headBaseRatio) {\n      finalSDF = min(headSDF, bodySDF);\n    } else {\n      finalSDF = headSDF;\n    }\n  }") : "  // No extremity draws tail/head geometry, so every vertex is body zone.\n  finalSDF = bodySDF;", "\n\n  #ifdef PICKING_MODE\n    // Picking pass: output edge ID for pixels within the picking area\n    if (finalSDF > u_pickingPadding * aaWidthWebGL) discard;\n    fragColor = v_id;\n  #else\n").concat(antialias ? "    // Visual pass: anti-aliased edge with layers, edge opacity applied once\n    float alpha = smoothstep(aaWidthWebGL, -aaWidthWebGL, finalSDF) * v_opacity;" : "    // Visual pass: hard-edged (no anti-aliasing gradient) edge with layers, edge opacity applied once\n    float alpha = (finalSDF < 0.0 ? 1.0 : 0.0) * v_opacity;", '\n    if (alpha < 0.01) discard;\n\n    // Apply layers sequentially with "over" compositing\n    vec4 color = vec4(0.0);\n\n').concat(layerCalls, "\n\n    // Mix with transparent to fade both color AND alpha (pre-multiplied alpha for correct blending)\n    fragColor = mix(vec4(0.0), color, alpha);\n  #endif\n}\n")
    );
    return glsl;
  }
  function getConstantDataForCombination(path, head, tail) {
    var hasHead = !isAttributeSource(head.length) ? head.length > 0 : true;
    var hasTail = !isAttributeSource(tail.length) ? tail.length > 0 : true;
    if (path.generateConstantData) {
      var custom = path.generateConstantData();
      return {
        data: custom.data,
        attributes: custom.attributes,
        verticesPerEdge: custom.verticesPerEdge
      };
    }
    return generateZonedConstantData(path.segments, hasHead, hasTail);
  }
  function generateEdgeShaders(options) {
    var _options$antialias;
    var _normalizeEdgeProgram = normalizeEdgeProgramOptions(options), paths = _normalizeEdgeProgram.paths, extremities = _normalizeEdgeProgram.extremities, layers = _normalizeEdgeProgram.layers;
    var antialias = (_options$antialias = options.antialias) !== null && _options$antialias !== void 0 ? _options$antialias : true;
    var vertexCountsPerCombination = /* @__PURE__ */ new Map();
    var constantDataPerCombination = /* @__PURE__ */ new Map();
    var constantAttributesMap = /* @__PURE__ */ new Map();
    var _iterator4 = _createForOfIteratorHelper(paths), _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
        var p = _step4.value;
        var _iterator6 = _createForOfIteratorHelper(extremities), _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
            var headExt = _step6.value;
            var _iterator7 = _createForOfIteratorHelper(extremities), _step7;
            try {
              for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
                var tailExt = _step7.value;
                var key = "".concat(p.name, ":").concat(headExt.name, ":").concat(tailExt.name);
                var constantData = getConstantDataForCombination(p, headExt, tailExt);
                vertexCountsPerCombination.set(key, constantData.verticesPerEdge);
                constantDataPerCombination.set(key, constantData.data);
                var _iterator8 = _createForOfIteratorHelper(constantData.attributes), _step8;
                try {
                  for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                    var attr = _step8.value;
                    if (!constantAttributesMap.has(attr.name)) {
                      constantAttributesMap.set(attr.name, attr);
                    }
                  }
                } catch (err) {
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
                }
              }
            } catch (err) {
              _iterator7.e(err);
            } finally {
              _iterator7.f();
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    var constantAttributes = Array.from(constantAttributesMap.values());
    var attrNameToIndex = {};
    constantAttributes.forEach(function(attr2, idx) {
      attrNameToIndex[attr2.name] = idx;
    });
    var maxVerticesPerEdge = 0;
    var maxConstantDataKey = "";
    var _iterator5 = _createForOfIteratorHelper(vertexCountsPerCombination), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var _step5$value = _slicedToArray(_step5.value, 2), _key = _step5$value[0], vertexCount = _step5$value[1];
        if (vertexCount > maxVerticesPerEdge) {
          maxVerticesPerEdge = vertexCount;
          maxConstantDataKey = _key;
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var rawConstantData = constantDataPerCombination.get(maxConstantDataKey) || [];
    var _maxConstantDataKey$s = maxConstantDataKey.split(":"), _maxConstantDataKey$s2 = _slicedToArray(_maxConstantDataKey$s, 1), pathName = _maxConstantDataKey$s2[0];
    var path = paths.find(function(p2) {
      return p2.name === pathName;
    });
    var originalAttrs = [];
    if (path !== null && path !== void 0 && path.generateConstantData) {
      originalAttrs = path.generateConstantData().attributes;
    } else {
      originalAttrs = [{
        name: "a_zone"
      }, {
        name: "a_zoneT"
      }, {
        name: "a_side"
      }];
    }
    var maxConstantData = rawConstantData.map(function(vertex) {
      var padded = new Array(constantAttributes.length).fill(0);
      originalAttrs.forEach(function(attr2, i) {
        var targetIdx = attrNameToIndex[attr2.name];
        if (targetIdx !== void 0 && i < vertex.length) {
          padded[targetIdx] = vertex[i];
        }
      });
      return padded;
    });
    return {
      vertexShader: generateVertexShaderMulti(paths, extremities, layers, constantAttributes),
      fragmentShader: generateFragmentShaderMulti(paths, extremities, layers, antialias),
      uniforms: collectUniformsMulti(paths, extremities, layers),
      attributes: collectAttributesMulti(),
      verticesPerEdge: maxVerticesPerEdge,
      constantData: maxConstantData,
      constantAttributes,
      vertexCountsPerCombination,
      constantDataPerCombination
    };
  }
  function collectAttributesMulti(_paths, _extremities, _layers) {
    return [
      // Edge index for texture lookup (used for both edge data and path attribute textures)
      {
        name: "a_edgeIndex",
        size: 1,
        type: FLOAT
      },
      {
        name: "a_color",
        size: 4,
        type: UNSIGNED_BYTE,
        normalized: true
      },
      {
        name: "a_id",
        size: 4,
        type: UNSIGNED_BYTE,
        normalized: true
      },
      {
        name: "a_opacity",
        size: 1,
        type: FLOAT
      }
    ];
  }
  var FRAGMENT_SHADER$1 = (
    /*glsl*/
    "#version 300 es\nprecision highp float;\n\nin vec4 v_clamp;\n\n// RGBA32F target: stores (tStart, tEnd, straightenFactor, pathLength).\nout vec4 fragColor;\n\nvoid main() {\n  fragColor = v_clamp;\n}\n"
  );
  var EdgeFramePass = /* @__PURE__ */ (function() {
    function EdgeFramePass2(gl, options) {
      _classCallCheck(this, EdgeFramePass2);
      _defineProperty(this, "uniformLocations", {});
      var paths = options.paths, extremities = options.extremities, layers = options.layers, nodeShapes = options.nodeShapes, nodeLayers = options.nodeLayers;
      this.gl = gl;
      this.hasAttributeData = computeAttributeLayout([].concat(_toConsumableArray(paths), _toConsumableArray(layers))).floatsPerItem > 0;
      this.hasNodeAttributeData = Object.keys(getShapeAttributeLayout(nodeShapes, nodeLayers).offsets).length > 0;
      this.vertexShader = loadVertexShader(gl, generateEdgeFramePassVertexShader(paths, extremities, layers, nodeShapes, nodeLayers));
      this.fragmentShader = loadFragmentShader(gl, FRAGMENT_SHADER$1);
      this.program = loadProgram(gl, [this.vertexShader, this.fragmentShader]);
      var seen = /* @__PURE__ */ new Set();
      this.customUniforms = [];
      for (var _i = 0, _arr = [].concat(_toConsumableArray(paths), _toConsumableArray(extremities)); _i < _arr.length; _i++) {
        var source = _arr[_i];
        var _iterator = _createForOfIteratorHelper(source.uniforms), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var u = _step.value;
            if (seen.has(u.name)) continue;
            seen.add(u.name);
            this.customUniforms.push(u);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      var uniformNames = ["u_sizeRatio", "u_correctionRatio", "u_cameraAngle", "u_minEdgeThickness", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_edgeDataTexture", "u_edgeDataTextureWidth", "u_edgeAttributeTexture", "u_edgeAttributeTextureWidth", "u_edgeAttributeTexelsPerEdge", "u_layerAttributeTexture", "u_layerAttributeTextureWidth", "u_layerAttributeTexelsPerNode", "u_frameTextureWidth", "u_frameTextureHeight"].concat(_toConsumableArray(this.customUniforms.map(function(u2) {
        return u2.name;
      })));
      var _iterator2 = _createForOfIteratorHelper(uniformNames), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var name = _step2.value;
          this.uniformLocations[name] = gl.getUniformLocation(this.program, name);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.vao = gl.createVertexArray();
    }
    return _createClass(EdgeFramePass2, [{
      key: "run",
      value: function run(params, frameTexture, edgeCount, edgeAttributeTexture, nodeAttributeTexture) {
        if (edgeCount === 0) return;
        var gl = this.gl;
        var u = this.uniformLocations;
        gl.useProgram(this.program);
        gl.bindVertexArray(this.vao);
        if (u.u_sizeRatio) gl.uniform1f(u.u_sizeRatio, params.sizeRatio);
        if (u.u_correctionRatio) gl.uniform1f(u.u_correctionRatio, params.correctionRatio);
        if (u.u_cameraAngle) gl.uniform1f(u.u_cameraAngle, params.cameraAngle);
        if (u.u_minEdgeThickness) gl.uniform1f(u.u_minEdgeThickness, params.minEdgeThickness);
        if (u.u_nodeDataTexture) gl.uniform1i(u.u_nodeDataTexture, params.nodeDataTextureUnit);
        if (u.u_nodeDataTextureWidth) gl.uniform1i(u.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
        if (u.u_edgeDataTexture) gl.uniform1i(u.u_edgeDataTexture, params.edgeDataTextureUnit);
        if (u.u_edgeDataTextureWidth) gl.uniform1i(u.u_edgeDataTextureWidth, params.edgeDataTextureWidth);
        if (u.u_frameTextureWidth) gl.uniform1f(u.u_frameTextureWidth, frameTexture.getTextureWidth());
        if (u.u_frameTextureHeight) gl.uniform1f(u.u_frameTextureHeight, frameTexture.getTextureHeight());
        if (this.hasAttributeData && edgeAttributeTexture) {
          edgeAttributeTexture.bind(EDGE_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_edgeAttributeTexture) gl.uniform1i(u.u_edgeAttributeTexture, EDGE_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_edgeAttributeTextureWidth) gl.uniform1i(u.u_edgeAttributeTextureWidth, edgeAttributeTexture.getTextureWidth());
          if (u.u_edgeAttributeTexelsPerEdge) gl.uniform1i(u.u_edgeAttributeTexelsPerEdge, edgeAttributeTexture.getTexelsPerItem());
        }
        if (this.hasNodeAttributeData && nodeAttributeTexture) {
          nodeAttributeTexture.bind(LAYER_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_layerAttributeTexture) gl.uniform1i(u.u_layerAttributeTexture, LAYER_ATTRIBUTE_TEXTURE_UNIT);
          if (u.u_layerAttributeTextureWidth) gl.uniform1i(u.u_layerAttributeTextureWidth, nodeAttributeTexture.getTextureWidth());
          if (u.u_layerAttributeTexelsPerNode) gl.uniform1i(u.u_layerAttributeTexelsPerNode, nodeAttributeTexture.getTexelsPerItem());
        }
        var _iterator3 = _createForOfIteratorHelper(this.customUniforms), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var uniform = _step3.value;
            setGLSLUniform(gl, this.uniformLocations[uniform.name], uniform);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        frameTexture.bindAsRenderTarget();
        gl.disable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        gl.drawArrays(gl.POINTS, 0, edgeCount);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindVertexArray(null);
      }
    }, {
      key: "kill",
      value: function kill() {
        var gl = this.gl;
        gl.deleteProgram(this.program);
        gl.deleteShader(this.vertexShader);
        gl.deleteShader(this.fragmentShader);
        gl.deleteVertexArray(this.vao);
      }
    }]);
  })();
  function generatePathSelector(paths, queryName, pathFunc, returnType, params, args) {
    if (paths.length === 1) {
      return "".concat(returnType, " ").concat(queryName, "(int pathId, ").concat(params, ") {\n  return path_").concat(paths[0].name, "_").concat(pathFunc, "(").concat(args, ");\n}");
    }
    var cases = paths.map(function(p, i) {
      return "    case ".concat(i, ": return path_").concat(p.name, "_").concat(pathFunc, "(").concat(args, ");");
    }).join("\n");
    return "".concat(returnType, " ").concat(queryName, "(int pathId, ").concat(params, ") {\n  switch (pathId) {\n").concat(cases, "\n    default: return path_").concat(paths[0].name, "_").concat(pathFunc, "(").concat(args, ");\n  }\n}");
  }
  var EDGE_LABEL_BODY_BOUNDS_GLSL = (
    /*glsl*/
    "\nvec3 computeEdgeLabelBodyBounds(\n  float tStart, float tEnd, float pathLength,\n  float webGLThickness, float headLengthRatio, float tailLengthRatio\n) {\n  float visibleLength = pathLength * (tEnd - tStart);\n\n  float headLength = headLengthRatio * webGLThickness;\n  float tailLength = tailLengthRatio * webGLThickness;\n  float totalNeededLength = headLength + tailLength;\n  if (totalNeededLength > visibleLength && totalNeededLength > 0.0001) {\n    float extremityScale = visibleLength / totalNeededLength;\n    headLength *= extremityScale;\n    tailLength *= extremityScale;\n  }\n\n  float bodyStartDist = tStart * pathLength + tailLength;\n  float bodyEndDist = tEnd * pathLength - headLength;\n  return vec3(bodyStartDist, bodyEndDist, max(bodyEndDist - bodyStartDist, 0.0));\n}\n"
  );
  function generateEdgeLabelAlphaGlsl(minVisibilityThreshold, fullVisibilityThreshold) {
    var minVis = numberToGLSLFloat(minVisibilityThreshold);
    var fullVis = numberToGLSLFloat(fullVisibilityThreshold);
    return (
      /*glsl*/
      "\nfloat computeEdgeLabelAlpha(float bodyLength, float textWidthWebGL) {\n  float ratio = textWidthWebGL > 0.0001 ? min(bodyLength / textWidthWebGL, 1.0) : 1.0;\n  if (ratio < ".concat(minVis, ") return 0.0;\n  if (ratio < ").concat(fullVis, ") return (ratio - ").concat(minVis, ") / (").concat(fullVis, " - ").concat(minVis, ");\n  return 1.0;\n}\n")
    );
  }
  var EDGE_LABEL_SCREEN_DIR_GLSL = (
    /*glsl*/
    "\nfloat computeEdgeLabelScreenDir(int pathId, float t, vec2 source, vec2 target, mat3 matrix) {\n  vec2 tangent = queryPathTangent(pathId, t, source, target);\n  return (matrix * vec3(tangent, 0.0)).x < 0.0 ? -1.0 : 1.0;\n}\n"
  );
  var EDGE_LABEL_PERP_OFFSET_GLSL = (
    /*glsl*/
    "\nfloat computeEdgeLabelPerpOffset(\n  float positionMode,\n  float halfThickness, float marginWebGL, float halfTextHeight,\n  float readingSign, float screenDir\n) {\n  float magnitude = halfThickness + marginWebGL + halfTextHeight;\n  if (positionMode == 1.0) return magnitude * readingSign;\n  if (positionMode == 2.0) return -magnitude * readingSign;\n  if (positionMode == 3.0) return magnitude * screenDir;\n  return 0.0;\n}\n"
  );
  function generateEdgeLabelShaderPreamble(options) {
    var paths = options.paths, minVisibilityThreshold = options.minVisibilityThreshold, fullVisibilityThreshold = options.fullVisibilityThreshold;
    var hasAnySharpCorners = paths.some(function(p) {
      return p.hasSharpCorners;
    });
    var pathGlsl = paths.map(function(p) {
      return "// --- Path: ".concat(p.name, " ---\n").concat(p.glsl, "\n\n// Tangent/normal functions: analytical if provided, otherwise numerical\n").concat(p.analyticalTangentGlsl || generateNumericalTangentNormal(p.name), "\n\n// Auto-generated fallbacks for any missing path functions\n").concat(generatePathFallbacks(p.name, p.glsl), "\n\n// Corner skip helpers (for paths with sharp corners like step/taxi)\n").concat(p.cornerSkipGlsl || "", "\n");
    }).join("\n");
    var sharpCornersDispatch = hasAnySharpCorners ? "// Corner function selectors (only some paths have sharp corners)\nvec2 queryGetCornerTs(int pathId, vec2 source, vec2 target) {\n  switch (pathId) {\n".concat(paths.map(function(p, i) {
      return p.hasSharpCorners ? "    case ".concat(i, ": return path_").concat(p.name, "_getCornerTs(source, target);") : "    case ".concat(i, ": return vec2(-1.0, -1.0); // No corners for ").concat(p.name);
    }).join("\n"), "\n    default: return vec2(-1.0, -1.0);\n  }\n}\n\nvec2 queryGetCornerConcavity(int pathId, vec2 source, vec2 target, float perpOffset) {\n  switch (pathId) {\n").concat(paths.map(function(p, i) {
      return p.hasSharpCorners ? "    case ".concat(i, ": return path_").concat(p.name, "_getCornerConcavity(source, target, perpOffset);") : "    case ".concat(i, ": return vec2(0.0, 0.0); // No corners for ").concat(p.name);
    }).join("\n"), "\n    default: return vec2(0.0, 0.0);\n  }\n}") : "";
    return (
      /*glsl*/
      "\n// ============================================================================\n// Node data fetch (geometry texel) and per-edge clamp fetch (edge-frame texture)\n// ============================================================================\n\n".concat(GLSL_READ_NODE_DATA, "\n").concat(GLSL_READ_FRAME_TEXEL, "\n\n// ============================================================================\n// Path Functions (one block per path)\n// ============================================================================\n\n").concat(pathGlsl, "\n\n// ============================================================================\n// Path Query Selectors (dispatch by pathId)\n// ============================================================================\n\n").concat(generatePathSelector(paths, "queryPathPosition", "position", "vec2", "float t, vec2 source, vec2 target", "t, source, target"), "\n\n").concat(generatePathSelector(paths, "queryPathTangent", "tangent", "vec2", "float t, vec2 source, vec2 target", "t, source, target"), "\n\n").concat(generatePathSelector(paths, "queryPathNormal", "normal", "vec2", "float t, vec2 source, vec2 target", "t, source, target"), "\n\n").concat(generatePathSelector(paths, "queryPathLength", "length", "float", "vec2 source, vec2 target", "source, target"), "\n\n").concat(generatePathSelector(paths, "queryPathTAtDistance", "t_at_distance", "float", "float dist, vec2 source, vec2 target", "dist, source, target"), "\n\n").concat(sharpCornersDispatch, "\n\n// ============================================================================\n// Shared helpers (body bounds, alpha ramp, screen direction, perpendicular offset)\n// ============================================================================\n\n").concat(EDGE_LABEL_BODY_BOUNDS_GLSL, "\n").concat(generateEdgeLabelAlphaGlsl(minVisibilityThreshold, fullVisibilityThreshold), "\n").concat(EDGE_LABEL_SCREEN_DIR_GLSL, "\n").concat(EDGE_LABEL_PERP_OFFSET_GLSL, "\n")
    );
  }
  var ATLAS_FONT_SIZE$1 = DEFAULT_SDF_ATLAS_OPTIONS.fontSize;
  var NO_LIFECYCLES$1 = /* @__PURE__ */ new Map();
  var RIBBON_SEGMENTS = 24;
  var RIBBON_VERTICES = (RIBBON_SEGMENTS + 1) * 2;
  function generateVertexShader(config) {
    var paths = config.paths, fontSizeMode = config.fontSizeMode, headLengthRatio = config.headLengthRatio, tailLengthRatio = config.tailLengthRatio, minVisibilityThreshold = config.minVisibilityThreshold, fullVisibilityThreshold = config.fullVisibilityThreshold, keepUpright = config.keepUpright;
    var isScaledMode = fontSizeMode === "scaled";
    var layer = layerPlain();
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), [layer]));
    var textureFetch = generateEdgeAttributeTextureFetch(attributeLayout);
    var shader = (
      /*glsl*/
      "#version 300 es\n\n// Per-instance attributes\nin float a_edgeIndex;\nin float a_edgeAttrIndex;\nin float a_baseFontSize;\nin float a_totalTextWidth;\nin float a_positionMode;\nin float a_margin;\nin float a_padding;\nin vec4 a_color;\nin vec4 a_id;\n\n// Per-vertex (constant) attribute: strip vertex index\nin float a_vertexIndex;\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_pixelRatio;\nuniform float u_cameraAngle;\nuniform vec2 u_resolution;\nuniform sampler2D u_nodeDataTexture;\nuniform int u_nodeDataTextureWidth;\nuniform sampler2D u_edgeDataTexture;\nuniform int u_edgeDataTextureWidth;\nuniform sampler2D u_edgeFrameTexture; // Per-edge clamp (tStart, tEnd, straightenFactor, pathLength)\nuniform int u_edgeFrameTextureWidth;\n".concat(isScaledMode ? "uniform float u_zoomSizeRatio;" : "", "\n\n").concat(textureFetch.uniformDeclarations, "\n\nout vec4 v_color;\nout vec4 v_id;\nout float v_alphaModifier;\n\nconst float ATLAS_FONT_SIZE = ").concat(numberToGLSLFloat(ATLAS_FONT_SIZE$1), ";\nconst float HEAD_RATIO = ").concat(numberToGLSLFloat(headLengthRatio), ";\nconst float TAIL_RATIO = ").concat(numberToGLSLFloat(tailLengthRatio), ";\nconst int RIBBON_SEGMENTS = ").concat(RIBBON_SEGMENTS, ";\n\n// Path attribute varyings (declared as plain locals since this shader has no FS inputs for them)\n").concat(textureFetch.vertexVaryingDeclarations.replace(/out /g, ""), "\n\n// Node size variables used by some path functions (self-loops, etc.)\nfloat v_sourceNodeSize;\nfloat v_targetNodeSize;\n\n// Shared preamble: shape SDFs, path functions + selectors, clamp, helpers.\n").concat(generateEdgeLabelShaderPreamble({
        paths,
        minVisibilityThreshold,
        fullVisibilityThreshold
      }), "\n\nvoid main() {\n  int vIdx = int(a_vertexIndex);\n  int pairIdx = vIdx / 2;\n  int side = vIdx - pairIdx * 2; // 0 = left/bottom, 1 = right/top\n\n  // --- Fetch edge data (2 texels per edge) ---\n  int edgeIdx = int(a_edgeIndex);\n  int texel0Idx = edgeIdx * 2;\n  int texel1Idx = edgeIdx * 2 + 1;\n  ivec2 e0 = ivec2(texel0Idx % u_edgeDataTextureWidth, texel0Idx / u_edgeDataTextureWidth);\n  ivec2 e1 = ivec2(texel1Idx % u_edgeDataTextureWidth, texel1Idx / u_edgeDataTextureWidth);\n  vec4 edgeData0 = texelFetch(u_edgeDataTexture, e0, 0);\n  vec4 edgeData1 = texelFetch(u_edgeDataTexture, e1, 0);\n\n  int srcIdx = int(edgeData0.x);\n  int tgtIdx = int(edgeData0.y);\n  float thickness = edgeData0.z;\n  int pathId = int(edgeData1.z);\n\n  // --- Fetch path attributes (curvature, etc.) ---\n  {\n    int edgeIdx = int(a_edgeAttrIndex);\n").concat(textureFetch.fetchCode, "\n").concat(textureFetch.varyingAssignments, "\n  }\n\n  // --- Fetch node data: geometry (texel 0) + rotation flags (texel 1) ---\n  vec4 srcN = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx);\n  vec4 tgtN = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx);\n\n  vec2 source = srcN.xy;\n  vec2 target = tgtN.xy;\n  float sourceSize = srcN.z;\n  float targetSize = tgtN.z;\n  v_sourceNodeSize = sourceSize;\n  v_targetNodeSize = targetSize;\n\n  // --- Pixel-to-graph conversion (fixed font mode) ---\n  float matrixScaleX = length(vec2(u_matrix[0][0], u_matrix[1][0]));\n  float pixelToGraph = 2.0 / (matrixScaleX * u_resolution.x);\n\n  float webGLThickness = thickness * u_correctionRatio / u_sizeRatio;\n\n  // --- Body bounds (shared with edge label shader) ---\n  vec4 edgeClamp = readFrameTexel(u_edgeFrameTexture, u_edgeFrameTextureWidth, edgeIdx);\n  vec3 bodyBounds = computeEdgeLabelBodyBounds(\n    edgeClamp.x, edgeClamp.y, edgeClamp.w,\n    webGLThickness, HEAD_RATIO, TAIL_RATIO\n  );\n  float bodyStartDist = bodyBounds.x;\n  float bodyEndDist = bodyBounds.y;\n  float bodyLength = bodyBounds.z;\n\n  // --- Text dimensions ---\n  float baseFontSize = a_baseFontSize;\n  ").concat(isScaledMode ? "float fontScale = baseFontSize / ATLAS_FONT_SIZE * u_zoomSizeRatio;\n  float textWidthWebGL = a_totalTextWidth * fontScale * u_correctionRatio / u_sizeRatio;\n  float halfTextHeight = baseFontSize * 0.35 * u_zoomSizeRatio * u_correctionRatio / u_sizeRatio;\n  float marginWebGL = a_margin * u_zoomSizeRatio * u_correctionRatio / u_sizeRatio;" : "float fontScale = baseFontSize / ATLAS_FONT_SIZE;\n  float textWidthWebGL = a_totalTextWidth * fontScale * pixelToGraph;\n  float halfTextHeight = baseFontSize * 0.35 * pixelToGraph;\n  float marginWebGL = a_margin * pixelToGraph;", "\n  float paddingWebGL = a_padding * pixelToGraph;\n\n  // --- Alpha modifier (shared with edge label shader) ---\n  float alphaModifier = computeEdgeLabelAlpha(bodyLength, textWidthWebGL);\n  if (alphaModifier <= 0.0 || textWidthWebGL <= 0.0) {\n    gl_Position = vec4(2.0, 0.0, 0.0, 1.0);\n    v_color = vec4(0.0);\n    v_id = vec4(0.0);\n    v_alphaModifier = 0.0;\n    return;\n  }\n\n  // --- Perpendicular offset (shared with edge label shader) ---\n  float bodyCenterDist = (bodyStartDist + bodyEndDist) * 0.5;\n  float centerT = queryPathTAtDistance(pathId, bodyCenterDist, source, target);\n  float screenDir = computeEdgeLabelScreenDir(pathId, centerT, source, target, u_matrix);\n  float readingSign = ").concat(keepUpright ? "screenDir" : "1.0", ";\n  float halfThickness = webGLThickness * 0.5;\n  float perpOffset = computeEdgeLabelPerpOffset(\n    a_positionMode, halfThickness, marginWebGL, halfTextHeight, readingSign, screenDir\n  );\n\n  // --- Ribbon span (clipped to body) ---\n  float halfTextWebGL = textWidthWebGL * 0.5;\n  float labelStartDist = max(bodyCenterDist - halfTextWebGL, bodyStartDist);\n  float labelEndDist = min(bodyCenterDist + halfTextWebGL, bodyEndDist);\n\n  // Sample centerline at this pair, then apply perpendicular offset.\n  // The ribbon follows the centerline path (simple & robust); for curved edges\n  // this closely matches the offset path the characters sit on.\n  float u = float(pairIdx) / float(RIBBON_SEGMENTS);\n  float arcDist = mix(labelStartDist, labelEndDist, u);\n  float t = queryPathTAtDistance(pathId, arcDist, source, target);\n  vec2 pos = queryPathPosition(pathId, t, source, target);\n  vec2 tan = queryPathTangent(pathId, t, source, target);\n  vec2 perp = vec2(-tan.y, tan.x);\n\n  vec2 centerPos = pos + perp * perpOffset;\n\n  float halfRibbon = halfTextHeight + paddingWebGL;\n  float sideSign = side == 0 ? -1.0 : 1.0;\n  vec2 ribbonPos = centerPos + perp * (sideSign * halfRibbon);\n\n  vec3 clipPos = u_matrix * vec3(ribbonPos, 1.0);\n  gl_Position = vec4(clipPos.xy, 0.0, 1.0);\n\n  v_color = a_color;\n  v_id = a_id;\n  v_alphaModifier = alphaModifier;\n}\n")
    );
    return shader;
  }
  var FRAGMENT_SHADER = (
    /*glsl*/
    "#version 300 es\nprecision highp float;\n\nin vec4 v_color;\nin vec4 v_id;\nin float v_alphaModifier;\n\nout vec4 fragColor;\n\nvoid main() {\n#ifdef PICKING_MODE\n  if (v_alphaModifier <= 0.0) discard;\n  fragColor = v_id;\n#else\n  float alpha = v_color.a * v_alphaModifier;\n  if (alpha <= 0.0) discard;\n  fragColor = vec4(v_color.rgb * alpha, alpha);\n#endif\n}\n"
  );
  function createEdgeLabelBackgroundProgram(gl, pickingBuffer, renderer, options) {
    var shaderConfig = options.shaderConfig;
    var paths = shaderConfig.paths, fontSizeMode = shaderConfig.fontSizeMode;
    if (paths.length === 0) {
      throw new Error("createEdgeLabelBackgroundProgram: shaderConfig must declare at least one path");
    }
    var labelLayer = layerPlain();
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), [labelLayer]));
    var attrDescriptors = buildAttrDescriptors([].concat(_toConsumableArray(paths), [labelLayer]), attributeLayout);
    var vertexShader = generateVertexShader(shaderConfig);
    var GeneratedEdgeLabelBackgroundProgram = /* @__PURE__ */ (function(_Program) {
      function GeneratedEdgeLabelBackgroundProgram2(gl2, pickingBuffer2, renderer2) {
        var _this;
        _classCallCheck(this, GeneratedEdgeLabelBackgroundProgram2);
        _this = _callSuper(this, GeneratedEdgeLabelBackgroundProgram2, [gl2, pickingBuffer2, renderer2]);
        _defineProperty(_this, "totalCount", 0);
        _defineProperty(_this, "bufferCapacity", 0);
        _defineProperty(_this, "edgeAttributeTexture", null);
        _this.edgeAttributeTexture = new ItemAttributeTexture(gl2, attributeLayout);
        _this.packedAttributeData = new Float32Array(attributeLayout.floatsPerItem);
        return _this;
      }
      _inherits(GeneratedEdgeLabelBackgroundProgram2, _Program);
      return _createClass(GeneratedEdgeLabelBackgroundProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          var constantData = [];
          for (var i = 0; i < RIBBON_VERTICES; i++) constantData.push([i]);
          var uniforms = ["u_matrix", "u_sizeRatio", "u_correctionRatio", "u_pixelRatio", "u_cameraAngle", "u_resolution", "u_nodeDataTexture", "u_nodeDataTextureWidth", "u_edgeDataTexture", "u_edgeDataTextureWidth", "u_edgeFrameTexture", "u_edgeFrameTextureWidth"];
          if (fontSizeMode === "scaled") uniforms.push("u_zoomSizeRatio");
          if (attributeLayout.floatsPerItem > 0) {
            uniforms.push("u_edgeAttributeTexture", "u_edgeAttributeTextureWidth", "u_edgeAttributeTexelsPerEdge");
          }
          return {
            VERTICES: RIBBON_VERTICES,
            VERTEX_SHADER_SOURCE: vertexShader,
            FRAGMENT_SHADER_SOURCE: FRAGMENT_SHADER,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: uniforms,
            ATTRIBUTES: [{
              name: "a_edgeIndex",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_edgeAttrIndex",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_baseFontSize",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_totalTextWidth",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_positionMode",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_margin",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_padding",
              size: 1,
              type: FLOAT2
            }, {
              name: "a_color",
              size: 4,
              type: UNSIGNED_BYTE2,
              normalized: true
            }, {
              name: "a_id",
              size: 4,
              type: UNSIGNED_BYTE2,
              normalized: true
            }],
            CONSTANT_ATTRIBUTES: [{
              name: "a_vertexIndex",
              size: 1,
              type: FLOAT2
            }],
            CONSTANT_DATA: constantData
          };
        }
      }, {
        key: "processEdgeLabelBackground",
        value: function processEdgeLabelBackground(offset, labelKey, data) {
          var attrIndex = 0;
          if (this.edgeAttributeTexture && attributeLayout.floatsPerItem > 0) {
            attrIndex = this.edgeAttributeTexture.allocate(labelKey);
            var packed = this.packedAttributeData;
            packAttributes(attrDescriptors, data.edgeAttributes, packed, "", NO_LIFECYCLES$1, 0);
            this.edgeAttributeTexture.updateAllAttributes(labelKey, packed);
          }
          var floats = this.floats, ints = this.ints;
          var i = offset * this.STRIDE;
          floats[i++] = data.edgeIndex;
          floats[i++] = attrIndex;
          floats[i++] = data.baseFontSize;
          floats[i++] = data.totalTextWidth;
          floats[i++] = data.positionMode;
          floats[i++] = data.margin;
          floats[i++] = data.padding;
          floats[i++] = data.color;
          ints[i++] = data.id;
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, _ref) {
          var gl2 = _ref.gl, uniformLocations = _ref.uniformLocations;
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform2f(uniformLocations.u_resolution, params.width, params.height);
          if (uniformLocations.u_nodeDataTexture !== void 0) gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          if (uniformLocations.u_nodeDataTextureWidth !== void 0) gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          if (uniformLocations.u_edgeDataTexture !== void 0) gl2.uniform1i(uniformLocations.u_edgeDataTexture, params.edgeDataTextureUnit);
          if (uniformLocations.u_edgeDataTextureWidth !== void 0) gl2.uniform1i(uniformLocations.u_edgeDataTextureWidth, params.edgeDataTextureWidth);
          if (uniformLocations.u_edgeFrameTexture !== void 0) gl2.uniform1i(uniformLocations.u_edgeFrameTexture, params.edgeFrameTextureUnit);
          if (uniformLocations.u_edgeFrameTextureWidth !== void 0) gl2.uniform1i(uniformLocations.u_edgeFrameTextureWidth, params.edgeFrameTextureWidth);
          if (fontSizeMode === "scaled" && uniformLocations.u_zoomSizeRatio !== void 0) {
            var zoomToSizeRatioFunction = this.renderer.getSetting("zoomToSizeRatioFunction");
            gl2.uniform1f(uniformLocations.u_zoomSizeRatio, 1 / zoomToSizeRatioFunction(params.zoomRatio));
          }
          if (this.edgeAttributeTexture && attributeLayout.floatsPerItem > 0 && uniformLocations.u_edgeAttributeTexture !== void 0) {
            this.edgeAttributeTexture.bind(EDGE_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_edgeAttributeTexture, EDGE_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_edgeAttributeTextureWidth, this.edgeAttributeTexture.getTextureWidth());
            gl2.uniform1i(uniformLocations.u_edgeAttributeTexelsPerEdge, this.edgeAttributeTexture.getTexelsPerItem());
          }
        }
      }, {
        key: "renderProgram",
        value: function renderProgram(params, programInfo) {
          if (this.edgeAttributeTexture && attributeLayout.floatsPerItem > 0) {
            this.edgeAttributeTexture.upload();
          }
          _superPropGet(GeneratedEdgeLabelBackgroundProgram2, "renderProgram", this, 3)([params, programInfo]);
        }
      }, {
        key: "kill",
        value: function kill() {
          if (this.edgeAttributeTexture) {
            this.edgeAttributeTexture.kill();
            this.edgeAttributeTexture = null;
          }
          _superPropGet(GeneratedEdgeLabelBackgroundProgram2, "kill", this, 3)([]);
        }
      }, {
        key: "drawWebGL",
        value: function drawWebGL(_method, _ref2) {
          var gl2 = _ref2.gl;
          if (this.totalCount === 0) return;
          gl2.drawArraysInstanced(gl2.TRIANGLE_STRIP, 0, this.VERTICES, this.totalCount);
        }
      }, {
        key: "reallocate",
        value: function reallocate(count) {
          this.totalCount = count;
          if (count > this.bufferCapacity) {
            this.bufferCapacity = Math.max(count, Math.ceil(this.bufferCapacity * 1.5) || 10);
            _superPropGet(GeneratedEdgeLabelBackgroundProgram2, "reallocate", this, 3)([this.bufferCapacity]);
          }
        }
      }]);
    })(Program);
    return new GeneratedEdgeLabelBackgroundProgram(gl, pickingBuffer, renderer);
  }
  function resolveEdgeLabelShaderConfig(options) {
    var _options$headLengthRa, _options$tailLengthRa, _options$fontSizeMode, _options$minVisibilit, _options$fullVisibili, _options$keepUpright;
    return {
      paths: options.paths,
      headLengthRatio: (_options$headLengthRa = options.headLengthRatio) !== null && _options$headLengthRa !== void 0 ? _options$headLengthRa : 0,
      tailLengthRatio: (_options$tailLengthRa = options.tailLengthRatio) !== null && _options$tailLengthRa !== void 0 ? _options$tailLengthRa : 0,
      fontSizeMode: (_options$fontSizeMode = options.fontSizeMode) !== null && _options$fontSizeMode !== void 0 ? _options$fontSizeMode : "fixed",
      minVisibilityThreshold: (_options$minVisibilit = options.minVisibilityThreshold) !== null && _options$minVisibilit !== void 0 ? _options$minVisibilit : 0.7,
      fullVisibilityThreshold: (_options$fullVisibili = options.fullVisibilityThreshold) !== null && _options$fullVisibili !== void 0 ? _options$fullVisibili : 0.8,
      keepUpright: (_options$keepUpright = options.keepUpright) !== null && _options$keepUpright !== void 0 ? _options$keepUpright : true
    };
  }
  var ATLAS_FONT_SIZE = DEFAULT_SDF_ATLAS_OPTIONS.fontSize;
  var VERTICAL_CENTER_RATIO = 17 / 64;
  function generateEdgeLabelVertexShader(options) {
    var paths = options.paths, _options$hasBorder = options.hasBorder, hasBorder = _options$hasBorder === void 0 ? false : _options$hasBorder, _options$fontSizeMode = options.fontSizeMode, fontSizeMode = _options$fontSizeMode === void 0 ? "fixed" : _options$fontSizeMode, _options$minVisibilit = options.minVisibilityThreshold, minVisibilityThreshold = _options$minVisibilit === void 0 ? 0.5 : _options$minVisibilit, _options$fullVisibili = options.fullVisibilityThreshold, fullVisibilityThreshold = _options$fullVisibili === void 0 ? 0.6 : _options$fullVisibili, _options$keepUpright = options.keepUpright, keepUpright = _options$keepUpright === void 0 ? true : _options$keepUpright;
    var isScaledMode = fontSizeMode === "scaled";
    var hasAnySharpCorners = paths.some(function(p) {
      return p.hasSharpCorners;
    });
    var layer = layerPlain();
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), [layer]));
    var textureFetch = generateEdgeAttributeTextureFetch(attributeLayout);
    var glsl = (
      /*glsl*/
      "#version 300 es\n\n// ============================================================================\n// Attributes - Per Character (Instanced)\n// ============================================================================\n\n// Edge geometry: indices for texture lookup\n// Edge data (source/target node indices, thickness, head/tail ratios) is fetched from edge data texture\n// Edge path attributes (curvature, etc.) are fetched from edge attribute texture\nin float a_edgeIndex;       // Index into edge data texture\nin float a_edgeAttrIndex;   // Index into edge attribute texture (for curvature, etc.)\nin float a_baseFontSize;    // Base font size in pixels (per-label)\n\n// Character metrics (in glyph units = atlas font size pixels)\nin vec4 a_charMetrics;      // (charTextOffset, charAdvance, totalTextWidth, positionMode)\nin vec4 a_charDims;         // (charSize.x, charSize.y, charOffset.x, charOffset.y)\n\n// Atlas texture coordinates\nin vec4 a_texCoords;        // (x, y, width, height) in atlas pixels\n\n// Label parameters\nin vec2 a_labelParams;      // (margin, unused)\n\n// Appearance\nin vec4 a_color;            // Character color (RGBA, normalized)\n".concat(hasBorder ? "in vec4 a_borderColor;      // Border color (RGBA, normalized)" : "", "\n\n// ============================================================================\n// Attributes - Per Vertex (Constant)\n// ============================================================================\n\nin vec2 a_quadCorner;       // Quad corner: (0,0), (1,0), (0,1), (1,1)\n\n// ============================================================================\n// Uniforms\n// ============================================================================\n\nuniform mat3 u_matrix;\nuniform float u_sizeRatio;\nuniform float u_correctionRatio;\nuniform float u_pixelRatio;\nuniform float u_cameraAngle;    // Required by node shape SDFs\n// u_sdfBufferPixels kept for ABI compatibility but unused in shader\nuniform float u_sdfBufferPixels;\nuniform vec2 u_resolution;\nuniform vec2 u_atlasSize;\nuniform sampler2D u_nodeDataTexture; // Shared texture with node position/size/shape data\nuniform int u_nodeDataTextureWidth;  // Width of 2D node data texture for coordinate calculation\nuniform sampler2D u_edgeDataTexture; // Shared texture with edge data\nuniform int u_edgeDataTextureWidth;  // Width of 2D edge data texture for coordinate calculation\nuniform sampler2D u_edgeFrameTexture; // Per-edge clamp (tStart, tEnd, straightenFactor, pathLength)\nuniform int u_edgeFrameTextureWidth;\n").concat(isScaledMode ? "uniform float u_zoomSizeRatio;  // Zoom-based size ratio from zoomToSizeRatioFunction" : "", "\n\n// Edge path attribute texture uniforms (for curvature and other path attributes)\n").concat(textureFetch.uniformDeclarations, "\n\n// ============================================================================\n// Varyings\n// ============================================================================\n\nout vec2 v_texCoord;\nout vec4 v_color;\n").concat(hasBorder ? "out vec4 v_borderColor;" : "", "\nout float v_edgeFade;  // 0 = fully visible, 1 = fully faded (outside body)\nout float v_alphaModifier;  // 0-1 based on label visibility ratio\nout float v_fontScale;  // Ratio of rendered font size to atlas font size\n").concat(hasBorder ? "out float v_positionMode;  // Position mode for conditional border (0=over needs border)" : "", "\n\n// ============================================================================\n// Constants\n// ============================================================================\n\nconst float bias = 255.0 / 254.0;\nconst float FADE_WIDTH_PIXELS = 15.0;  // Width of fade gradient in pixels\nconst float ATLAS_FONT_SIZE = ").concat(numberToGLSLFloat(ATLAS_FONT_SIZE), ";  // Base font size used in SDF atlas\nconst float VERTICAL_CENTER_RATIO = ").concat(numberToGLSLFloat(VERTICAL_CENTER_RATIO), ";  // Baseline to visual center ratio\n\n// ============================================================================\n// Path Attribute Variables (set in main, used by path functions)\n// ============================================================================\n// Path attributes are fetched from the edge attribute texture and stored in\n// variables with v_ prefix (e.g., v_curvature) for path functions to access.\n").concat(textureFetch.vertexVaryingDeclarations.replace(/out /g, ""), "\n\n// Node size variables (set in main, used by some path functions like loops).\n// These mirror the v_sourceNodeSize / v_targetNodeSize varyings in generator.ts,\n// but are plain floats here since the label shader is vertex-only.\nfloat v_sourceNodeSize;\nfloat v_targetNodeSize;\n\n// Shared preamble: shape SDFs, path functions + selectors, clamp, helpers.\n").concat(generateEdgeLabelShaderPreamble({
        paths,
        minVisibilityThreshold,
        fullVisibilityThreshold
      }), "\n\n// ============================================================================\n// Main\n// ============================================================================\n\nvoid main() {\n  // -------------------------------------------------------------------------\n  // Fetch edge data from edge texture (2 texels per edge)\n  // -------------------------------------------------------------------------\n  // Texel 0: sourceNodeIndex, targetNodeIndex, thickness, reserved\n  // Texel 1: headLengthRatio, tailLengthRatio, pathId, extremityIds\n  int edgeIdx = int(a_edgeIndex);\n  int texel0Idx = edgeIdx * 2;\n  int texel1Idx = edgeIdx * 2 + 1;\n  ivec2 edgeTexCoord0 = ivec2(texel0Idx % u_edgeDataTextureWidth, texel0Idx / u_edgeDataTextureWidth);\n  ivec2 edgeTexCoord1 = ivec2(texel1Idx % u_edgeDataTextureWidth, texel1Idx / u_edgeDataTextureWidth);\n  vec4 edgeData0 = texelFetch(u_edgeDataTexture, edgeTexCoord0, 0);\n  vec4 edgeData1 = texelFetch(u_edgeDataTexture, edgeTexCoord1, 0);\n\n  // Unpack edge data\n  int srcIdx = int(edgeData0.x);\n  int tgtIdx = int(edgeData0.y);\n  float thickness = edgeData0.z;\n  // edgeData0.w is reserved\n  float headLengthRatio = edgeData1.x;\n  float tailLengthRatio = edgeData1.y;\n  int pathId = int(edgeData1.z);  // Path type for multi-path support\n  float baseFontSize = a_baseFontSize;\n\n  // -------------------------------------------------------------------------\n  // Fetch path attributes from edge attribute texture\n  // -------------------------------------------------------------------------\n  // Note: The fetch code uses 'edgeIdx' variable, so we set it to the attribute texture index\n  {\n    int edgeIdx = int(a_edgeAttrIndex);  // Use attribute texture index for path attributes\n").concat(textureFetch.fetchCode, "\n").concat(textureFetch.varyingAssignments, '\n  }\n\n  // -------------------------------------------------------------------------\n  // Fetch node data from node texture (geometry texel + rotation-flags texel)\n  // -------------------------------------------------------------------------\n  vec4 srcNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, srcIdx);\n  vec4 tgtNodeData = readNodeData(u_nodeDataTexture, u_nodeDataTextureWidth, tgtIdx);\n\n  vec2 source = srcNodeData.xy;\n  vec2 target = tgtNodeData.xy;\n  float sourceSize = srcNodeData.z;\n  float targetSize = tgtNodeData.z;\n  v_sourceNodeSize = sourceSize;\n  v_targetNodeSize = targetSize;\n  float charTextOffset = a_charMetrics.x;\n  float charAdvance = a_charMetrics.y;\n  float totalTextWidth = a_charMetrics.z;\n  float positionMode = a_charMetrics.w;\n  vec2 charSize = a_charDims.xy;\n  vec2 charOffset = a_charDims.zw;\n  float margin = a_labelParams.x;\n\n  // -------------------------------------------------------------------------\n  // Compute pixel-to-graph conversion (for fixed font size mode)\n  // -------------------------------------------------------------------------\n  // This converts screen pixels to graph units such that N pixels on screen\n  // becomes N pixels regardless of zoom level.\n  // matrixScaleX is how much the matrix scales graph units to clip space\n  float matrixScaleX = length(vec2(u_matrix[0][0], u_matrix[1][0]));\n  float pixelToGraph = 2.0 / (matrixScaleX * u_resolution.x);\n\n  // -------------------------------------------------------------------------\n  // Step 1: Convert thickness to WebGL units\n  // -------------------------------------------------------------------------\n  float webGLThickness = thickness * u_correctionRatio / u_sizeRatio;\n\n  // -------------------------------------------------------------------------\n  // Step 2: Compute body bounds (truncated at node boundaries + extremities)\n  // -------------------------------------------------------------------------\n  vec4 edgeClamp = readFrameTexel(u_edgeFrameTexture, u_edgeFrameTextureWidth, edgeIdx);\n  vec3 bodyBounds = computeEdgeLabelBodyBounds(\n    edgeClamp.x, edgeClamp.y, edgeClamp.w,\n    webGLThickness, headLengthRatio, tailLengthRatio\n  );\n  float bodyStartDist = bodyBounds.x;\n  float bodyEndDist = bodyBounds.y;\n  float bodyLength = bodyBounds.z;\n\n  // -------------------------------------------------------------------------\n  // Step 3: Compute font scale and text dimensions\n  // -------------------------------------------------------------------------\n  // Font size modes:\n  // - "fixed": Constant pixel size regardless of zoom, using pixelToGraph conversion\n  // - "scaled": Scales with zoom using zoomToSizeRatioFunction\n  ').concat(isScaledMode ? "// Scaled mode: font scales with zoom\n  float fontScale = baseFontSize / ATLAS_FONT_SIZE * u_zoomSizeRatio;\n  // Convert glyph-unit metrics to WebGL units (scales with zoom)\n  float textWidthWebGL = totalTextWidth * fontScale * u_correctionRatio / u_sizeRatio;\n  float charOffsetWebGL = charTextOffset * fontScale * u_correctionRatio / u_sizeRatio;\n  float charAdvanceWebGL = charAdvance * fontScale * u_correctionRatio / u_sizeRatio;" : "// Fixed mode: font stays constant in screen pixels\n  float fontScale = baseFontSize / ATLAS_FONT_SIZE;\n  // Convert glyph-unit metrics to graph units using pixelToGraph (zoom-independent)\n  float textWidthWebGL = totalTextWidth * fontScale * pixelToGraph;\n  float charOffsetWebGL = charTextOffset * fontScale * pixelToGraph;\n  float charAdvanceWebGL = charAdvance * fontScale * pixelToGraph;", "\n\n  // Font scale varying for fragment shader gamma scaling.\n  // Ratio of rendered font size to atlas font size \u2014 used to tighten the\n  // anti-aliasing band for large labels so they stay sharp.\n  v_fontScale = fontScale;\n\n  // -------------------------------------------------------------------------\n  // Step 4: Alpha modifier from how much of the label fits in the body\n  // -------------------------------------------------------------------------\n  float alphaModifier = computeEdgeLabelAlpha(bodyLength, textWidthWebGL);\n\n  // -------------------------------------------------------------------------\n  // Step 5: Compute character center offset (truncation check moved to after curvature adjustment)\n  // -------------------------------------------------------------------------\n  // Body center in arc distance\n  float bodyCenterDist = (bodyStartDist + bodyEndDist) * 0.5;\n\n  float centerT = queryPathTAtDistance(pathId, bodyCenterDist, source, target);\n  float screenDir = computeEdgeLabelScreenDir(pathId, centerT, source, target, u_matrix);\n\n  // Reversed labels lay their characters out from target to source\n  float readingSign = ").concat(keepUpright ? "screenDir" : "1.0", ";\n\n  // Character center position relative to label center (on centerline, before curvature adjustment)\n  float charCenterOffset = readingSign * (charOffsetWebGL + charAdvanceWebGL * 0.5 - textWidthWebGL * 0.5);\n\n  // -------------------------------------------------------------------------\n  // Step 6: Compute perpendicular offset based on position mode\n  // -------------------------------------------------------------------------\n  // Position modes: 0=over, 1=above, 2=below, 3=auto\n  // Needed early for curvature-adaptive character spacing in Step 7\n  float halfThickness = webGLThickness * 0.5;\n  ").concat(isScaledMode ? "// Scaled mode: margin and text height scale with zoom (same factor as font)\n  float marginWebGL = margin * u_zoomSizeRatio * u_correctionRatio / u_sizeRatio;\n  float halfTextHeight = baseFontSize * 0.35 * u_zoomSizeRatio * u_correctionRatio / u_sizeRatio;" : "// Fixed mode: margin and text height stay constant in screen pixels\n  float marginWebGL = margin * pixelToGraph;\n  float halfTextHeight = baseFontSize * 0.35 * pixelToGraph;", '\n  float perpOffset = computeEdgeLabelPerpOffset(\n    positionMode, halfThickness, marginWebGL, halfTextHeight, readingSign, screenDir\n  );\n\n  // -------------------------------------------------------------------------\n  // Step 7: Position character on path using offset path traversal\n  // -------------------------------------------------------------------------\n  // For "over" mode (perpOffset = 0), use simple centerline placement\n  // For above/below modes, walk along the offset path to find correct position\n  float charT;\n\n  if (perpOffset == 0.0) {\n    // Simple case: place on centerline\n    float charArcDist = bodyCenterDist + charCenterOffset;\n    charT = queryPathTAtDistance(pathId, charArcDist, source, target);\n  } else {\n    // Offset path traversal: walk along the offset curve to find character position\n    // This ensures even character spacing regardless of curvature\n\n    ').concat(hasAnySharpCorners ? "// -----------------------------------------------------------------------\n    // Corner skip setup for step/taxi edges with above/below labels\n    // -----------------------------------------------------------------------\n    // At concave corners (inner side of the bend), characters would bunch up\n    // because the offset path has near-zero arc length. We detect corner\n    // crossings during the offset path traversal and add skip distance.\n\n    // Get corner t values and concavity\n    vec2 cornerTs = queryGetCornerTs(pathId, source, target);\n    vec2 concavity = queryGetCornerConcavity(pathId, source, target, perpOffset);\n\n    // Skip distance in graph units, proportional to on-screen font size\n    // For fixed mode: use pixelToGraph so gap stays constant regardless of zoom\n    // For scaled mode: use the same conversion as text width\n    ".concat(isScaledMode ? "float skipDistGraph = STEP_INNER_CORNER_SKIP_FACTOR * baseFontSize * u_zoomSizeRatio * u_correctionRatio / u_sizeRatio;" : "float skipDistGraph = STEP_INNER_CORNER_SKIP_FACTOR * baseFontSize * pixelToGraph;", "\n\n    // Corner t values for detecting crossings during traversal\n    float corner1T = cornerTs.x;\n    float corner2T = cornerTs.y;\n    bool corner1IsConcave = concavity.x > 0.5;\n    bool corner2IsConcave = concavity.y > 0.5;") : "", "\n\n    // Target distance along offset path from center\n    float targetOffsetDist = abs(charCenterOffset);\n\n    // Handle center character (charCenterOffset \u2248 0) - no search needed\n    if (targetOffsetDist < 0.0001) {\n      charT = centerT;\n    } else {\n      vec2 centerPos = queryPathPosition(pathId, centerT, source, target);\n      vec2 centerNormal = queryPathNormal(pathId, centerT, source, target);\n      vec2 offsetCenter = centerPos + centerNormal * perpOffset;\n\n      float searchDir = charCenterOffset > 0.0 ? 1.0 : -1.0;\n\n      // Search bounds (t values for body start and end)\n      float tBodyStart = queryPathTAtDistance(pathId, bodyStartDist, source, target);\n      float tBodyEnd = queryPathTAtDistance(pathId, bodyEndDist, source, target);\n\n      // Walk along offset path to find character position\n      float accumDist = 0.0;\n      vec2 prevOffsetPos = offsetCenter;\n      float prevT = centerT;\n      float foundT = centerT;\n\n      // Search range depends on direction\n      float tSearchEnd = searchDir > 0.0 ? tBodyEnd : tBodyStart;\n\n      ").concat(hasAnySharpCorners ? "// Track which concave corners we've crossed to add skip distance\n      bool crossedCorner1 = false;\n      bool crossedCorner2 = false;\n      float effectiveTargetDist = targetOffsetDist;" : "", "\n\n      const int STEPS = 32;\n      for (int i = 1; i <= STEPS; i++) {\n        // Step along centerline t, from center toward target\n        float stepT = centerT + searchDir * float(i) * abs(tSearchEnd - centerT) / float(STEPS);\n\n        ").concat(hasAnySharpCorners ? "// Check for concave corner crossings and add skip distance\n        // Corner 1 crossing check\n        if (corner1IsConcave && !crossedCorner1) {\n          bool crossingCorner1 = (searchDir > 0.0)\n            ? (prevT < corner1T && stepT >= corner1T)\n            : (prevT > corner1T && stepT <= corner1T);\n          if (crossingCorner1) {\n            crossedCorner1 = true;\n            effectiveTargetDist += skipDistGraph;\n          }\n        }\n\n        // Corner 2 crossing check\n        if (corner2IsConcave && !crossedCorner2) {\n          bool crossingCorner2 = (searchDir > 0.0)\n            ? (prevT < corner2T && stepT >= corner2T)\n            : (prevT > corner2T && stepT <= corner2T);\n          if (crossingCorner2) {\n            crossedCorner2 = true;\n            effectiveTargetDist += skipDistGraph;\n          }\n        }" : "", "\n\n        // Compute offset position at this t\n        vec2 stepPos = queryPathPosition(pathId, stepT, source, target);\n        vec2 stepNormal = queryPathNormal(pathId, stepT, source, target);\n        vec2 offsetPos = stepPos + stepNormal * perpOffset;\n\n        // Distance along offset path\n        float segDist = length(offsetPos - prevOffsetPos);\n\n        ").concat(hasAnySharpCorners ? "if (accumDist + segDist >= effectiveTargetDist) {\n          // Interpolate within segment to find exact t\n          float remaining = effectiveTargetDist - accumDist;\n          float segT = remaining / max(segDist, 0.0001);\n          foundT = mix(prevT, stepT, segT);\n          break;\n        }" : "if (accumDist + segDist >= targetOffsetDist) {\n          // Interpolate within segment to find exact t\n          float remaining = targetOffsetDist - accumDist;\n          float segT = remaining / max(segDist, 0.0001);\n          foundT = mix(prevT, stepT, segT);\n          break;\n        }", "\n\n        accumDist += segDist;\n        prevOffsetPos = offsetPos;\n        prevT = stepT;\n        // Update foundT to last valid position in case loop exhausts without finding target\n        foundT = stepT;\n      }\n\n      charT = foundT;\n    }\n  }\n\n  // Get position and tangent at final character position\n  vec2 pathPos = queryPathPosition(pathId, charT, source, target);\n  vec2 tangent = queryPathTangent(pathId, charT, source, target);\n\n  // Compute perpendicular direction (90 degrees from tangent)\n  vec2 perpDir = vec2(-tangent.y, tangent.x);\n\n  // Apply perpendicular offset to path position\n  vec2 offsetPathPos = pathPos + perpDir * perpOffset;\n\n  // -------------------------------------------------------------------------\n  // Step 8: Build character quad\n  // -------------------------------------------------------------------------\n  // Character size in screen pixels\n  vec2 charSizePixels = charSize * fontScale;\n\n  // Character offset from origin to the atlas region's top-left corner.\n  // bearingX/bearingY already include the SDF buffer.\n  vec2 charOffsetPixels = charOffset * fontScale;\n\n  // The character's local X offset from pathPos (which is at character center)\n  float charLocalX = -charAdvance * 0.5 * fontScale;\n\n  // Build quad position:\n  // - Start at character origin (charLocalX on X axis, 0 on Y axis = baseline)\n  // - Add bearing offset to get to atlas region corner\n  // - Add quad corner * size to get vertex position\n  vec2 quadPos;\n  quadPos.x = charLocalX + charOffsetPixels.x + a_quadCorner.x * charSizePixels.x;\n  // charOffset.y = -bearingY (negated), so -charOffsetPixels.y = bearingY * fontScale\n  // (distance from baseline to atlas region top, positive = upward)\n  // Quad corner (0,0) = bottom-left, (1,1) = top-right\n  quadPos.y = -charOffsetPixels.y - charSizePixels.y * (1.0 - a_quadCorner.y);\n\n  // Center vertically on the path by offsetting by half the visual text height\n  // VERTICAL_CENTER_RATIO is the distance from baseline to visual center as a ratio of atlas font size\n  float verticalCenterOffset = VERTICAL_CENTER_RATIO * ATLAS_FONT_SIZE * fontScale;\n  quadPos.y -= verticalCenterOffset;\n\n  // -------------------------------------------------------------------------\n  // Step 9: Rotate quad to align with tangent\n  // -------------------------------------------------------------------------\n  // Rotation matrix from the reading direction\n  // readingDir = (cos(angle), sin(angle)), so we can build rotation directly\n  vec2 readingDir = tangent * readingSign;\n  mat2 rotation = mat2(readingDir.x, readingDir.y, -readingDir.y, readingDir.x);\n\n  // Convert pixel offset to WebGL units for rotation\n  ").concat(isScaledMode ? "vec2 quadPosWebGL = quadPos * u_correctionRatio / u_sizeRatio; // Scaled mode" : "vec2 quadPosWebGL = quadPos * pixelToGraph; // Fixed mode: use pixelToGraph for zoom-independent size", "\n\n  // Rotate around character center on path\n  vec2 rotatedOffset = rotation * quadPosWebGL;\n\n  // Final position in graph space (using offset path position for above/below modes)\n  vec2 worldPos = offsetPathPos + rotatedOffset;\n\n  // -------------------------------------------------------------------------\n  // Step 10: Transform to clip space\n  // -------------------------------------------------------------------------\n  vec3 clipPos = u_matrix * vec3(worldPos, 1.0);\n  gl_Position = vec4(clipPos.xy, 0.0, 1.0);\n\n  // -------------------------------------------------------------------------\n  // Step 11: Texture coordinates\n  // -------------------------------------------------------------------------\n  // Flip Y for texture coordinates (texture Y goes down, quad Y goes up)\n  vec2 texCorner = vec2(a_quadCorner.x, 1.0 - a_quadCorner.y);\n  v_texCoord = (a_texCoords.xy + texCorner * a_texCoords.zw) / u_atlasSize;\n\n  // -------------------------------------------------------------------------\n  // Step 12: Pass color, border color, and alpha modifier\n  // -------------------------------------------------------------------------\n  v_color = a_color;\n  v_color.a *= bias;\n").concat(hasBorder ? "  v_borderColor = a_borderColor;\n  v_borderColor.a *= bias;\n  v_positionMode = positionMode;" : "", "\n  v_alphaModifier = alphaModifier;\n\n  // -------------------------------------------------------------------------\n  // Step 13: Compute edge fade for soft truncation\n  // -------------------------------------------------------------------------\n  // Convert fade width from pixels to WebGL units\n  ").concat(isScaledMode ? "float fadeWidthWebGL = FADE_WIDTH_PIXELS * u_correctionRatio / u_sizeRatio;" : "float fadeWidthWebGL = FADE_WIDTH_PIXELS * pixelToGraph;", "\n\n  // Compute the arc position of THIS VERTEX (not just character center)\n  // The quad extends from charCenter - advance/2 to charCenter + advance/2\n  // a_quadCorner.x is 0 for left edge, 1 for right edge\n  float vertexLocalOffset = readingSign * (a_quadCorner.x - 0.5) * charAdvanceWebGL;\n  float vertexArcOffset = charCenterOffset + vertexLocalOffset;\n\n  // Compute distance from body edges (positive = inside body, negative = outside)\n  float halfBody = bodyLength * 0.5;\n  float distFromStart = vertexArcOffset + halfBody;  // Distance from body start edge\n  float distFromEnd = halfBody - vertexArcOffset;    // Distance from body end edge\n  float distFromEdge = min(distFromStart, distFromEnd);\n\n  // Compute fade: 0 = fully visible (deep inside body), 1 = fully faded (at body edge)\n  // Fade goes from 0 (at 2*fadeWidth inside) to 1 (at body edge)\n  // This ensures text is fully transparent before reaching extremities\n  v_edgeFade = 1.0 - smoothstep(0.0, fadeWidthWebGL * 2.0, distFromEdge);\n}\n")
    );
    return glsl;
  }
  function generateEdgeLabelFragmentShader() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var _options$hasBorder2 = options.hasBorder, hasBorder = _options$hasBorder2 === void 0 ? false : _options$hasBorder2;
    var glsl = (
      /*glsl*/
      "#version 300 es\nprecision highp float;\n\nin vec2 v_texCoord;\nin vec4 v_color;\n".concat(hasBorder ? "in vec4 v_borderColor;" : "", "\nin float v_edgeFade;  // 0 = fully visible, 1 = fully faded\nin float v_alphaModifier;  // 0-1 based on label visibility ratio\nin float v_fontScale;  // Ratio of rendered font size to atlas font size\n").concat(hasBorder ? "in float v_positionMode;  // Position mode (0=over, 1=above, 2=below, 3=auto)" : "", "\n\nuniform sampler2D u_atlas;\nuniform float u_gamma;\nuniform float u_sdfBuffer;\nuniform float u_pixelRatio;\n").concat(hasBorder ? "uniform float u_borderWidth;  // Border width in SDF units (normalized)" : "", "\n\n// Fragment output (single target - picking handled via separate pass)\nout vec4 fragColor;\n\nvoid main() {\n  #ifdef PICKING_MODE\n    // Edge labels are not pickable - discard all fragments in picking mode\n    fragColor = vec4(0.0);\n    discard;\n  #else\n  // SDF stores normalized distance: 0.5 = on edge, >0.5 = inside glyph\n  float sdfValue = texture(u_atlas, v_texCoord).a;\n\n  // Edge threshold accounting for SDF buffer padding\n  float edge = 1.0 - u_sdfBuffer;\n\n  // Scale gamma inversely with font scale so small labels get a wider AA band\n  // (smoother) and large labels get a tighter band (sharper).\n  float aaWidth = u_gamma / (u_pixelRatio * v_fontScale);\n\n  // Apply edge fade for soft truncation at body boundaries\n  // Also apply visibility-based alpha modifier for short edge labels\n  float edgeAlpha = (1.0 - v_edgeFade) * v_alphaModifier;\n\n").concat(hasBorder ? `  // Fill alpha: fully opaque inside the glyph
  float fillAlpha = smoothstep(edge - aaWidth, edge + aaWidth, sdfValue);

  // Only apply border for "over" position mode (v_positionMode == 0.0)
  // Labels positioned above/below/auto don't overlap the edge line and don't need borders
  if (v_positionMode < 0.5) {
    // Border rendering: compute alpha for both fill and border regions
    // Border extends from (edge - borderWidth) to edge
    float borderEdge = edge - u_borderWidth;

    // Border alpha: opaque in the border region (between borderEdge and edge)
    float borderAlpha = smoothstep(borderEdge - aaWidth, borderEdge + aaWidth, sdfValue);

    // Composite: fill on top of border
    // Border is visible where borderAlpha > 0 but fillAlpha < 1
    vec3 borderColorPremult = v_borderColor.rgb * v_borderColor.a * borderAlpha * edgeAlpha;
    vec3 fillColorPremult = v_color.rgb * v_color.a * fillAlpha * edgeAlpha;

    // Blend fill over border (fill replaces border where fill is opaque)
    float finalBorderAlpha = borderAlpha * (1.0 - fillAlpha);
    vec3 finalColor = fillColorPremult + v_borderColor.rgb * v_borderColor.a * finalBorderAlpha * edgeAlpha;
    float finalAlpha = (v_color.a * fillAlpha + v_borderColor.a * finalBorderAlpha) * edgeAlpha;

    fragColor = vec4(finalColor, finalAlpha);
  } else {
    // No border for above/below/auto positions - simple text rendering
    float finalAlpha = v_color.a * fillAlpha * edgeAlpha;
    fragColor = vec4(v_color.rgb * finalAlpha, finalAlpha);
  }` : "  // Smooth transition from transparent to opaque at glyph edge\n  float alpha = smoothstep(edge - aaWidth, edge + aaWidth, sdfValue);\n\n  // Premultiplied alpha output\n  float finalAlpha = v_color.a * alpha * edgeAlpha;\n  fragColor = vec4(v_color.rgb * finalAlpha, finalAlpha);", "\n  #endif\n}\n")
    );
    return glsl;
  }
  function collectEdgeLabelUniforms(paths) {
    var hasBorder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var fontSizeMode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "fixed";
    var uniforms = [
      "u_matrix",
      "u_sizeRatio",
      "u_correctionRatio",
      "u_pixelRatio",
      "u_cameraAngle",
      "u_sdfBufferPixels",
      "u_resolution",
      "u_atlasSize",
      "u_atlas",
      "u_gamma",
      "u_sdfBuffer",
      "u_nodeDataTexture",
      "u_nodeDataTextureWidth",
      "u_edgeDataTexture",
      "u_edgeDataTextureWidth",
      "u_edgeFrameTexture",
      "u_edgeFrameTextureWidth",
      // Edge path attribute texture uniforms
      "u_edgeAttributeTexture",
      "u_edgeAttributeTextureWidth",
      "u_edgeAttributeTexelsPerEdge"
    ];
    if (fontSizeMode === "scaled") {
      uniforms.push("u_zoomSizeRatio");
    }
    if (hasBorder) {
      uniforms.push("u_borderWidth");
    }
    var _iterator = _createForOfIteratorHelper(paths), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var path = _step.value;
        var _iterator2 = _createForOfIteratorHelper(path.uniforms), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var uniform = _step2.value;
            if (!uniforms.includes(uniform.name)) {
              uniforms.push(uniform.name);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return uniforms;
  }
  function generateEdgeLabelShaders(options) {
    var _options$hasBorder3 = options.hasBorder, hasBorder = _options$hasBorder3 === void 0 ? false : _options$hasBorder3, _options$fontSizeMode2 = options.fontSizeMode, fontSizeMode = _options$fontSizeMode2 === void 0 ? "fixed" : _options$fontSizeMode2;
    return {
      vertexShader: generateEdgeLabelVertexShader(options),
      fragmentShader: generateEdgeLabelFragmentShader({
        hasBorder
      }),
      uniforms: collectEdgeLabelUniforms(options.paths, hasBorder, fontSizeMode)
    };
  }
  var NO_LIFECYCLES = /* @__PURE__ */ new Map();
  function positionToMode(position) {
    switch (position) {
      case "over":
        return 0;
      case "above":
        return 1;
      case "below":
        return 2;
      case "auto":
        return 3;
      default:
        return 0;
    }
  }
  function createEdgeLabelProgram(gl, pickingBuffer, renderer, options) {
    var labelColor = options.color, labelMargin = options.margin, textBorder = options.textBorder;
    var labelShaderConfig = resolveEdgeLabelShaderConfig(options);
    var paths = labelShaderConfig.paths, fontSizeMode = labelShaderConfig.fontSizeMode, minVisibilityThreshold = labelShaderConfig.minVisibilityThreshold, fullVisibilityThreshold = labelShaderConfig.fullVisibilityThreshold, keepUpright = labelShaderConfig.keepUpright;
    var hasBorder = !!textBorder;
    var generated = generateEdgeLabelShaders({
      paths,
      hasBorder,
      fontSizeMode,
      minVisibilityThreshold,
      fullVisibilityThreshold,
      keepUpright
    });
    var GeneratedEdgeLabelProgram = /* @__PURE__ */ (function(_LabelProgram) {
      function GeneratedEdgeLabelProgram2(gl2, pickingBuffer2, renderer2) {
        var _this;
        _classCallCheck(this, GeneratedEdgeLabelProgram2);
        _this = _callSuper(this, GeneratedEdgeLabelProgram2, [gl2, pickingBuffer2, renderer2]);
        _defineProperty(_this, "atlasTexture", null);
        _defineProperty(_this, "atlasNeedsUpdate", false);
        _defineProperty(_this, "refreshTimeout", null);
        _defineProperty(_this, "labelGlyphCache", /* @__PURE__ */ new Map());
        _defineProperty(_this, "edgeAttributeTexture", null);
        var layer = layerPlain();
        _this.attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), [layer]));
        _this.attrDescriptors = buildAttrDescriptors([].concat(_toConsumableArray(paths), [layer]), _this.attributeLayout);
        _this.edgeAttributeTexture = new ItemAttributeTexture(gl2, _this.attributeLayout);
        _this.packedAttributeData = new Float32Array(_this.attributeLayout.floatsPerItem);
        _this.atlasManager = new SDFAtlasManager();
        _this.gamma = 0.025;
        _this.sdfBuffer = DEFAULT_SDF_ATLAS_OPTIONS.cutoff;
        _this.atlasTexture = gl2.createTexture();
        if (!_this.atlasTexture) {
          throw new Error("EdgeLabelProgram: failed to create atlas texture");
        }
        gl2.bindTexture(gl2.TEXTURE_2D, _this.atlasTexture);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_S, gl2.CLAMP_TO_EDGE);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_WRAP_T, gl2.CLAMP_TO_EDGE);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MIN_FILTER, gl2.LINEAR);
        gl2.texParameteri(gl2.TEXTURE_2D, gl2.TEXTURE_MAG_FILTER, gl2.LINEAR);
        gl2.bindTexture(gl2.TEXTURE_2D, null);
        _this.atlasManager.on(SDFAtlasManager.ATLAS_UPDATED_EVENT, function() {
          _this.atlasNeedsUpdate = true;
          if (_this.refreshTimeout !== null) clearTimeout(_this.refreshTimeout);
          _this.refreshTimeout = setTimeout(function() {
            _this.refreshTimeout = null;
            _this.renderer.refresh();
          }, 0);
        });
        var fontConfig = {
          family: "sans-serif",
          weight: "normal",
          style: "normal"
        };
        _this.defaultFontKey = _this.atlasManager.registerFont(fontConfig);
        return _this;
      }
      _inherits(GeneratedEdgeLabelProgram2, _LabelProgram);
      return _createClass(GeneratedEdgeLabelProgram2, [{
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, FLOAT2 = _WebGL2RenderingConte2.FLOAT, UNSIGNED_BYTE2 = _WebGL2RenderingConte2.UNSIGNED_BYTE, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          var seenAttributes = /* @__PURE__ */ new Set();
          var pathAttributes = [];
          var _iterator = _createForOfIteratorHelper(paths), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var p = _step.value;
              var _iterator2 = _createForOfIteratorHelper(p.attributes), _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var attr = _step2.value;
                  var name = attr.name.startsWith("a_") ? attr.name : "a_".concat(attr.name);
                  if (!seenAttributes.has(name)) {
                    seenAttributes.add(name);
                    pathAttributes.push({
                      name,
                      size: attr.size,
                      type: attr.type
                    });
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return {
            VERTICES: 4,
            // Quad for each character
            VERTEX_SHADER_SOURCE: generated.vertexShader,
            FRAGMENT_SHADER_SOURCE: generated.fragmentShader,
            METHOD: TRIANGLE_STRIP,
            UNIFORMS: generated.uniforms,
            ATTRIBUTES: [
              // Edge indices for texture lookup
              {
                name: "a_edgeIndex",
                size: 1,
                type: FLOAT2
              },
              // Index into edge data texture (node positions, thickness, etc.)
              {
                name: "a_edgeAttrIndex",
                size: 1,
                type: FLOAT2
              },
              // Index into edge attribute texture (curvature, etc.)
              {
                name: "a_baseFontSize",
                size: 1,
                type: FLOAT2
              },
              // Base font size in pixels (per-label)
              // Character metrics (packed)
              {
                name: "a_charMetrics",
                size: 4,
                type: FLOAT2
              },
              // (charTextOffset, charAdvance, totalTextWidth, positionMode)
              {
                name: "a_charDims",
                size: 4,
                type: FLOAT2
              },
              // (charSize.x, charSize.y, charOffset.x, charOffset.y)
              // Atlas texture coordinates and margin
              {
                name: "a_texCoords",
                size: 4,
                type: FLOAT2
              },
              // (x, y, width, height)
              {
                name: "a_labelParams",
                size: 2,
                type: FLOAT2
              },
              // (margin, unused)
              // Appearance
              {
                name: "a_color",
                size: 4,
                type: UNSIGNED_BYTE2,
                normalized: true
              }
            ].concat(_toConsumableArray(hasBorder ? [{
              name: "a_borderColor",
              size: 4,
              type: UNSIGNED_BYTE2,
              normalized: true
            }] : []), _toConsumableArray(pathAttributes.filter(function(attr2) {
              return !["a_curvature", "curvature"].includes(attr2.name);
            }))),
            // Quad corners (same for all characters)
            CONSTANT_ATTRIBUTES: [{
              name: "a_quadCorner",
              size: 2,
              type: FLOAT2
            }],
            CONSTANT_DATA: [
              [0, 0],
              // Bottom-left
              [1, 0],
              // Bottom-right
              [0, 1],
              // Top-left
              [1, 1]
              // Top-right
            ]
          };
        }
        // -----------------------------------------------------------------------
        // Glyph Preparation
        // -----------------------------------------------------------------------
        /**
         * Pre-computes glyph layout data for a label and caches it.
         */
      }, {
        key: "prepareLabelGlyphs",
        value: function prepareLabelGlyphs(labelKey, data) {
          if (data.hidden || !data.text) {
            this.labelGlyphCache["delete"](labelKey);
            return;
          }
          var text = data.text;
          var fontKey = data.fontKey || this.defaultFontKey;
          this.atlasManager.ensureGlyphs(text, fontKey);
          var glyphs = [];
          var xOffsets = [];
          var xOffset = 0;
          var _iterator3 = _createForOfIteratorHelper(text), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var _char2 = _step3.value;
              var charCode = _char2.codePointAt(0);
              if (charCode === void 0) {
                glyphs.push(void 0);
                xOffsets.push(xOffset);
                continue;
              }
              var glyph = this.atlasManager.getGlyph(charCode, fontKey);
              glyphs.push(glyph);
              xOffsets.push(xOffset);
              if (glyph) {
                xOffset += glyph.advance;
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          this.labelGlyphCache.set(labelKey, {
            glyphs,
            xOffsets,
            totalWidth: xOffset
          });
        }
        // -----------------------------------------------------------------------
        // Character Processing
        // -----------------------------------------------------------------------
        /**
         * Processes a single character and writes its vertex data to the buffer.
         *
         * ## Attribute Layout (must match getDefinition)
         *
         * Edge geometry (fetched from textures via indices):
         * - a_edgeIndex (1): Index into edge data texture (node positions, thickness, etc.)
         * - a_edgeAttrIndex (1): Index into edge attribute texture (curvature, etc.)
         * - a_baseFontSize (1): Base font size in pixels
         *
         * Character metrics:
         * - a_charMetrics (4): Text offset, advance, total width, position mode
         * - a_charDims (4): Character size and offset
         *
         * Atlas:
         * - a_texCoords (4): Texture coordinates
         * - a_labelParams (2): Margin, unused
         *
         * Appearance:
         * - a_color (1): Packed RGBA color
         */
      }, {
        key: "processCharacter",
        value: function processCharacter(index, labelData, _char, charIndex) {
          var _this$edgeAttributeTe, _this$edgeAttributeTe2, _GeneratedEdgeLabelPr;
          var floats = this.floats;
          var stride = this.STRIDE;
          var startIndex = index * stride;
          var cache = this.labelGlyphCache.get(labelData.parentKey);
          if (!cache || !cache.glyphs[charIndex]) {
            for (var _i = 0; _i < stride; _i++) {
              floats[startIndex + _i] = 0;
            }
            return;
          }
          var glyph = cache.glyphs[charIndex];
          var xOffset = cache.xOffsets[charIndex];
          var programColor = GeneratedEdgeLabelProgram2.labelColor;
          var effectiveColor = programColor && _typeof(programColor) === "object" && "color" in programColor && programColor.color ? programColor.color : labelData.color;
          var color = floatColor(effectiveColor);
          var i = startIndex;
          floats[i++] = labelData.edgeIndex;
          floats[i++] = (_this$edgeAttributeTe = (_this$edgeAttributeTe2 = this.edgeAttributeTexture) === null || _this$edgeAttributeTe2 === void 0 ? void 0 : _this$edgeAttributeTe2.getIndex(labelData.parentKey)) !== null && _this$edgeAttributeTe !== void 0 ? _this$edgeAttributeTe : 0;
          floats[i++] = labelData.size;
          floats[i++] = xOffset;
          floats[i++] = glyph.advance;
          floats[i++] = cache.totalWidth;
          floats[i++] = positionToMode(labelData.position);
          floats[i++] = glyph.atlasWidth;
          floats[i++] = glyph.atlasHeight;
          floats[i++] = glyph.bearingX;
          floats[i++] = -glyph.bearingY;
          floats[i++] = glyph.atlasX;
          floats[i++] = glyph.atlasY;
          floats[i++] = glyph.atlasWidth;
          floats[i++] = glyph.atlasHeight;
          var effectiveMargin = (_GeneratedEdgeLabelPr = GeneratedEdgeLabelProgram2.labelMargin) !== null && _GeneratedEdgeLabelPr !== void 0 ? _GeneratedEdgeLabelPr : labelData.margin;
          floats[i++] = effectiveMargin;
          floats[i++] = 0;
          floats[i++] = color;
          if (hasBorder && textBorder) {
            var borderColorValue;
            if (typeof textBorder.color === "string") {
              borderColorValue = textBorder.color;
            } else {
              borderColorValue = textBorder.color.color || "#ffffff";
            }
            floats[i++] = floatColor(borderColorValue);
          }
          var seenAttrs = /* @__PURE__ */ new Set();
          var _iterator4 = _createForOfIteratorHelper(paths), _step4;
          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
              var p = _step4.value;
              var _iterator5 = _createForOfIteratorHelper(p.attributes), _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                  var attr = _step5.value;
                  var attrName = attr.name.startsWith("a_") ? attr.name.slice(2) : attr.name;
                  if (attrName === "curvature") {
                    continue;
                  }
                  if (!seenAttrs.has(attrName)) {
                    seenAttrs.add(attrName);
                    for (var j = 0; j < attr.size; j++) {
                      floats[i++] = 0;
                    }
                  }
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
        /**
         * Processes an edge label by first preparing its glyph cache
         * and updating the edge attribute texture with path-specific data.
         */
      }, {
        key: "processEdgeLabel",
        value: function processEdgeLabel(labelKey, offset, data) {
          this.prepareLabelGlyphs(labelKey, data);
          if (this.edgeAttributeTexture && !data.hidden && data.text) {
            this.edgeAttributeTexture.allocate(labelKey);
            var packed = this.packedAttributeData;
            packAttributes(this.attrDescriptors, data.edgeAttributes, packed, "", NO_LIFECYCLES, 0);
            this.edgeAttributeTexture.updateAllAttributes(labelKey, packed);
          }
          return _superPropGet(GeneratedEdgeLabelProgram2, "processLabel", this, 3)([labelKey, offset, data]);
        }
        // -----------------------------------------------------------------------
        // Atlas Texture Management
        // -----------------------------------------------------------------------
        /**
         * Uploads the atlas texture to the GPU if it has changed.
         */
      }, {
        key: "updateAtlasTexture",
        value: function updateAtlasTexture() {
          if (!this.atlasNeedsUpdate) return;
          var gl2 = this.normalProgram.gl;
          var textures = this.atlasManager.getTextures();
          if (textures.length === 0) return;
          var imageData = textures[0];
          gl2.bindTexture(gl2.TEXTURE_2D, this.atlasTexture);
          gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, imageData.width, imageData.height, 0, gl2.RGBA, gl2.UNSIGNED_BYTE, imageData.data);
          gl2.bindTexture(gl2.TEXTURE_2D, null);
          this.atlasNeedsUpdate = false;
        }
        // -----------------------------------------------------------------------
        // Uniform Setting
        // -----------------------------------------------------------------------
        /**
         * Sets all uniforms for the edge label shader.
         */
      }, {
        key: "setUniforms",
        value: function setUniforms(params, programInfo) {
          var gl2 = programInfo.gl, uniformLocations = programInfo.uniformLocations;
          var textures = this.atlasManager.getTextures();
          var atlasSize = textures.length > 0 ? [textures[0].width, textures[0].height] : [1, 1];
          gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          gl2.uniform1f(uniformLocations.u_sdfBufferPixels, DEFAULT_SDF_ATLAS_OPTIONS.buffer);
          gl2.uniform2f(uniformLocations.u_resolution, params.width, params.height);
          gl2.uniform2f(uniformLocations.u_atlasSize, atlasSize[0], atlasSize[1]);
          gl2.uniform1f(uniformLocations.u_gamma, this.gamma);
          gl2.uniform1f(uniformLocations.u_sdfBuffer, this.sdfBuffer);
          gl2.activeTexture(gl2.TEXTURE0);
          gl2.bindTexture(gl2.TEXTURE_2D, this.atlasTexture);
          gl2.uniform1i(uniformLocations.u_atlas, 0);
          if (uniformLocations.u_nodeDataTexture !== void 0) {
            gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          }
          if (uniformLocations.u_nodeDataTextureWidth !== void 0) {
            gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          }
          if (uniformLocations.u_edgeDataTexture !== void 0) {
            gl2.uniform1i(uniformLocations.u_edgeDataTexture, params.edgeDataTextureUnit);
          }
          if (uniformLocations.u_edgeDataTextureWidth !== void 0) {
            gl2.uniform1i(uniformLocations.u_edgeDataTextureWidth, params.edgeDataTextureWidth);
          }
          if (uniformLocations.u_edgeFrameTexture !== void 0) {
            gl2.uniform1i(uniformLocations.u_edgeFrameTexture, params.edgeFrameTextureUnit);
          }
          if (uniformLocations.u_edgeFrameTextureWidth !== void 0) {
            gl2.uniform1i(uniformLocations.u_edgeFrameTextureWidth, params.edgeFrameTextureWidth);
          }
          if (hasBorder && textBorder && uniformLocations.u_borderWidth !== void 0) {
            var borderWidthNormalized = textBorder.width / DEFAULT_SDF_ATLAS_OPTIONS.buffer * this.sdfBuffer;
            gl2.uniform1f(uniformLocations.u_borderWidth, borderWidthNormalized);
          }
          if (this.edgeAttributeTexture && uniformLocations.u_edgeAttributeTexture !== void 0) {
            this.edgeAttributeTexture.bind(EDGE_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_edgeAttributeTexture, EDGE_ATTRIBUTE_TEXTURE_UNIT);
            gl2.uniform1i(uniformLocations.u_edgeAttributeTextureWidth, this.edgeAttributeTexture.getTextureWidth());
            gl2.uniform1i(uniformLocations.u_edgeAttributeTexelsPerEdge, this.edgeAttributeTexture.getTexelsPerItem());
          }
          if (fontSizeMode === "scaled" && uniformLocations.u_zoomSizeRatio !== void 0) {
            var zoomToSizeRatioFunction = this.renderer.getSetting("zoomToSizeRatioFunction");
            var zoomSizeRatio = 1 / zoomToSizeRatioFunction(params.zoomRatio);
            gl2.uniform1f(uniformLocations.u_zoomSizeRatio, zoomSizeRatio);
          }
        }
        // -----------------------------------------------------------------------
        // Rendering
        // -----------------------------------------------------------------------
      }, {
        key: "renderProgram",
        value: function renderProgram(params, programInfo) {
          this.updateAtlasTexture();
          if (this.atlasManager.hasPendingGlyphs()) {
            this.atlasManager.flush();
            this.updateAtlasTexture();
          }
          if (this.edgeAttributeTexture) {
            this.edgeAttributeTexture.upload();
          }
          _superPropGet(GeneratedEdgeLabelProgram2, "renderProgram", this, 3)([params, programInfo]);
        }
        // -----------------------------------------------------------------------
        // Public API
        // -----------------------------------------------------------------------
        /**
         * Registers a font for use in edge labels.
         */
      }, {
        key: "registerFont",
        value: function registerFont(family) {
          var weight = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "normal";
          var style = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "normal";
          return this.atlasManager.registerFont({
            family,
            weight,
            style
          });
        }
        /**
         * Returns the SDFAtlasManager for advanced use cases.
         */
      }, {
        key: "getAtlasManager",
        value: function getAtlasManager() {
          return this.atlasManager;
        }
        /**
         * Pre-generates glyphs for the given texts.
         */
      }, {
        key: "ensureGlyphsReady",
        value: function ensureGlyphsReady(texts, fontKey) {
          var actualFontKey = fontKey || this.defaultFontKey;
          var _iterator6 = _createForOfIteratorHelper(texts), _step6;
          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
              var _text = _step6.value;
              this.atlasManager.ensureGlyphs(_text, actualFontKey);
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
          this.atlasManager.flush();
        }
        /**
         * Measures a label's width in atlas (glyph) units — the unit consumed by
         * the edge label and background shaders for `a_totalTextWidth`.
         */
      }, {
        key: "measureLabelAtlasWidth",
        value: function measureLabelAtlasWidth(text, fontKey) {
          var actualFontKey = fontKey || this.defaultFontKey;
          this.atlasManager.ensureGlyphs(text, actualFontKey);
          if (this.atlasManager.hasPendingGlyphs()) this.atlasManager.flush();
          var width = 0;
          var _iterator7 = _createForOfIteratorHelper(text), _step7;
          try {
            for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
              var _char3 = _step7.value;
              var cp = _char3.codePointAt(0);
              if (cp === void 0) continue;
              var glyph = this.atlasManager.getGlyph(cp, actualFontKey);
              if (glyph) width += glyph.advance;
            }
          } catch (err) {
            _iterator7.e(err);
          } finally {
            _iterator7.f();
          }
          return width;
        }
        /**
         * CSS-pixel measurement, derived from the atlas measurement. The label
         * grid never measures edge labels (only node labels), so this exists
         * mainly to satisfy the `LabelProgram` contract.
         */
      }, {
        key: "measureLabel",
        value: function measureLabel(text, fontSize, fontKey) {
          var atlasWidth = this.measureLabelAtlasWidth(text, fontKey);
          var scale2 = fontSize / DEFAULT_SDF_ATLAS_OPTIONS.fontSize;
          return {
            width: atlasWidth * scale2,
            height: fontSize,
            textHeight: fontSize
          };
        }
        // -----------------------------------------------------------------------
        // Cleanup
        // -----------------------------------------------------------------------
      }, {
        key: "kill",
        value: function kill() {
          var gl2 = this.normalProgram.gl;
          if (this.refreshTimeout !== null) {
            clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null;
          }
          if (this.atlasTexture) {
            gl2.deleteTexture(this.atlasTexture);
            this.atlasTexture = null;
          }
          if (this.edgeAttributeTexture) {
            this.edgeAttributeTexture.kill();
            this.edgeAttributeTexture = null;
          }
          this.atlasManager.destroy();
          this.labelGlyphCache.clear();
          _superPropGet(GeneratedEdgeLabelProgram2, "kill", this, 3)([]);
        }
      }]);
    })(LabelProgram);
    _defineProperty(GeneratedEdgeLabelProgram, "labelColor", labelColor);
    _defineProperty(GeneratedEdgeLabelProgram, "labelMargin", labelMargin);
    return new GeneratedEdgeLabelProgram(gl, pickingBuffer, renderer);
  }
  function extremityNone() {
    var glsl = (
      /*glsl*/
      "\n// No extremity - always returns positive (outside)\nfloat extremity_none(vec2 uv, float lengthRatio, float widthRatio) {\n  return 1.0;\n}\n"
    );
    return {
      name: "none",
      glsl,
      length: 0,
      widthFactor: 1,
      margin: 0,
      uniforms: [],
      attributes: []
    };
  }
  function createEdgeProgram(gl, pickingBuffer, renderer, options, antialias, nodeShapes, nodeLayers) {
    var _extremityNameToIndex, _extremityNameToIndex2;
    var normalized = normalizeEdgeProgramOptions(options);
    var paths = normalized.paths, layers = normalized.layers, defaultHead = normalized.defaultHead, defaultTail = normalized.defaultTail;
    var extremities = [extremityNone()].concat(_toConsumableArray(normalized.extremities));
    var pathNameToIndex = {};
    var extremityNameToIndex = {};
    paths.forEach(function(p, i) {
      return pathNameToIndex[p.name] = i;
    });
    extremities.forEach(function(e, i) {
      return extremityNameToIndex[e.name] = i;
    });
    var defaultHeadIndex = (_extremityNameToIndex = extremityNameToIndex[defaultHead]) !== null && _extremityNameToIndex !== void 0 ? _extremityNameToIndex : 0;
    var defaultTailIndex = (_extremityNameToIndex2 = extremityNameToIndex[defaultTail]) !== null && _extremityNameToIndex2 !== void 0 ? _extremityNameToIndex2 : 0;
    var generated = null;
    var attributeLayout = computeAttributeLayout([].concat(_toConsumableArray(paths), _toConsumableArray(layers)));
    var EdgeProgramClass = /* @__PURE__ */ (function(_Program) {
      function EdgeProgramClass2(gl2, pickingBuffer2, renderer2) {
        var _this;
        _classCallCheck(this, EdgeProgramClass2);
        if (!generated) {
          generated = generateEdgeShaders({
            paths,
            extremities,
            layers,
            antialias
          });
        }
        _this = _callSuper(this, EdgeProgramClass2, [gl2, pickingBuffer2, renderer2]);
        _defineProperty(_this, "layerLifecycles", /* @__PURE__ */ new Map());
        _defineProperty(_this, "needsShaderRegeneration", false);
        _defineProperty(_this, "edgeAttributeTexture", null);
        _defineProperty(_this, "layout", attributeLayout);
        _defineProperty(_this, "attrDescriptors", []);
        _defineProperty(_this, "lifecycleIndexOffset", paths.length);
        _this._pickingBuffer = pickingBuffer2;
        _this.edgeAttributeTexture = new ItemAttributeTexture(gl2, _this.layout);
        _this.packedAttributeData = new Float32Array(_this.layout.floatsPerItem);
        layers.forEach(function(layer, index) {
          if (layer.lifecycle) {
            var context = {
              gl: gl2,
              renderer: {
                refresh: function refresh() {
                  return renderer2.refresh();
                }
              },
              getUniformLocation: function getUniformLocation(name) {
                return gl2.getUniformLocation(_this.normalProgram.program, name);
              },
              requestShaderRegeneration: function requestShaderRegeneration() {
                _this.needsShaderRegeneration = true;
              },
              requestRefresh: function requestRefresh() {
                renderer2.refresh();
              }
            };
            _this.layerLifecycles.set(index, layer.lifecycle(context));
          }
        });
        _this.layerLifecycles.forEach(function(hooks) {
          var _hooks$init;
          return (_hooks$init = hooks.init) === null || _hooks$init === void 0 ? void 0 : _hooks$init.call(hooks);
        });
        var lifecycleMapForDescriptors = /* @__PURE__ */ new Map();
        _this.layerLifecycles.forEach(function(hooks, layerIndex) {
          if (hooks.getAttributeData) {
            lifecycleMapForDescriptors.set(paths.length + layerIndex, hooks);
          }
        });
        _this.attrDescriptors = buildAttrDescriptors([].concat(_toConsumableArray(paths), _toConsumableArray(layers)), _this.layout, lifecycleMapForDescriptors);
        return _this;
      }
      _inherits(EdgeProgramClass2, _Program);
      return _createClass(EdgeProgramClass2, [{
        key: "getAttributeTexture",
        value: function getAttributeTexture() {
          return this.edgeAttributeTexture;
        }
      }, {
        key: "resolveEdgeIds",
        value: function resolveEdgeIds(data, isSelfLoop, isParallel) {
          var edgeData = data;
          var pathId = 0;
          var headId = defaultHeadIndex;
          var tailId = defaultTailIndex;
          var pathName = isSelfLoop ? edgeData.selfLoopPath : isParallel && edgeData.parallelPath ? edgeData.parallelPath : edgeData.path;
          if (pathName && pathNameToIndex[pathName] !== void 0) {
            pathId = pathNameToIndex[pathName];
          }
          if (edgeData.head && edgeData.head !== "none" && extremityNameToIndex[edgeData.head] !== void 0) {
            headId = extremityNameToIndex[edgeData.head];
          }
          if (edgeData.tail && edgeData.tail !== "none" && extremityNameToIndex[edgeData.tail] !== void 0) {
            tailId = extremityNameToIndex[edgeData.tail];
          }
          var headExt = extremities[headId];
          var tailExt = extremities[tailId];
          return {
            pathId,
            headId,
            tailId,
            headLengthRatio: !isAttributeSource(headExt.length) ? headExt.length : 0,
            tailLengthRatio: !isAttributeSource(tailExt.length) ? tailExt.length : 0
          };
        }
      }, {
        key: "getDefinition",
        value: function getDefinition() {
          var _WebGL2RenderingConte2 = WebGL2RenderingContext, TRIANGLE_STRIP = _WebGL2RenderingConte2.TRIANGLE_STRIP;
          var method = TRIANGLE_STRIP;
          var shaders = generated;
          return {
            VERTICES: shaders.verticesPerEdge,
            VERTEX_SHADER_SOURCE: shaders.vertexShader,
            FRAGMENT_SHADER_SOURCE: shaders.fragmentShader,
            METHOD: method,
            UNIFORMS: shaders.uniforms,
            ATTRIBUTES: shaders.attributes,
            CONSTANT_ATTRIBUTES: shaders.constantAttributes,
            CONSTANT_DATA: shaders.constantData
          };
        }
        /**
         * Regenerate shaders if any layer requested it.
         */
      }, {
        key: "maybeRegenerateShaders",
        value: function maybeRegenerateShaders() {
          var _this2 = this;
          if (!this.needsShaderRegeneration) return;
          this.needsShaderRegeneration = false;
          var newLayers = layers.map(function(layer, index) {
            var hooks = _this2.layerLifecycles.get(index);
            if (hooks !== null && hooks !== void 0 && hooks.regenerate) {
              return hooks.regenerate();
            }
            return layer;
          });
          generated = generateEdgeShaders({
            paths,
            extremities,
            layers: newLayers,
            antialias: this.renderer.getSetting("antialiasEdges")
          });
          var gl2 = this.normalProgram.gl;
          var _this$normalProgram = this.normalProgram, program = _this$normalProgram.program, buffer = _this$normalProgram.buffer, vertexShader = _this$normalProgram.vertexShader, fragmentShader = _this$normalProgram.fragmentShader;
          gl2.deleteProgram(program);
          gl2.deleteBuffer(buffer);
          gl2.deleteShader(vertexShader);
          gl2.deleteShader(fragmentShader);
          this.normalProgram = this.getProgramInfo("normal", gl2, generated.vertexShader, generated.fragmentShader, this._pickingBuffer);
        }
      }, {
        key: "process",
        value: function process(edgeIndex, offset, sourceData, targetData, data, edgeTextureIndex) {
          var i = offset * this.STRIDE;
          if (data.visibility === "hidden" || sourceData.visibility === "hidden" || targetData.visibility === "hidden") {
            for (var l = i + this.STRIDE; i < l; i++) {
              this.floats[i] = 0;
            }
            this.floats[offset * this.STRIDE] = HIDDEN_ITEM_INDEX;
            return;
          }
          this.processVisibleItem(indexToColor(edgeIndex), i, sourceData, targetData, data, edgeTextureIndex);
        }
      }, {
        key: "processVisibleItem",
        value: function processVisibleItem(edgeIndex, startIndex, _sourceData, _targetData, data, edgeTextureIndex) {
          var _data$opacity;
          var floats = this.floats, ints = this.ints;
          floats[startIndex++] = edgeTextureIndex;
          floats[startIndex++] = floatColor(data.color);
          ints[startIndex++] = edgeIndex;
          floats[startIndex++] = (_data$opacity = data.opacity) !== null && _data$opacity !== void 0 ? _data$opacity : 1;
          var packed = this.packedAttributeData;
          packAttributes(this.attrDescriptors, data, packed, data.color, this.layerLifecycles, this.lifecycleIndexOffset);
          this.edgeAttributeTexture.updateAllAttributesAtRow(edgeTextureIndex, packed);
        }
      }, {
        key: "setUniforms",
        value: function setUniforms(params, programInfo) {
          var _this3 = this;
          var gl2 = programInfo.gl, uniformLocations = programInfo.uniformLocations;
          if (uniformLocations.u_matrix) {
            gl2.uniformMatrix3fv(uniformLocations.u_matrix, false, params.matrix);
          }
          if (uniformLocations.u_sizeRatio) {
            gl2.uniform1f(uniformLocations.u_sizeRatio, params.sizeRatio);
          }
          if (uniformLocations.u_correctionRatio) {
            gl2.uniform1f(uniformLocations.u_correctionRatio, params.correctionRatio);
          }
          if (uniformLocations.u_zoomRatio) {
            gl2.uniform1f(uniformLocations.u_zoomRatio, params.zoomRatio);
          }
          if (uniformLocations.u_pixelRatio) {
            gl2.uniform1f(uniformLocations.u_pixelRatio, params.pixelRatio);
          }
          if (uniformLocations.u_cameraAngle) {
            gl2.uniform1f(uniformLocations.u_cameraAngle, params.cameraAngle);
          }
          if (uniformLocations.u_feather) {
            gl2.uniform1f(uniformLocations.u_feather, params.antiAliasingFeather);
          }
          if (uniformLocations.u_minEdgeThickness) {
            gl2.uniform1f(uniformLocations.u_minEdgeThickness, params.minEdgeThickness);
          }
          if (uniformLocations.u_pickingPadding) {
            gl2.uniform1f(uniformLocations.u_pickingPadding, params.edgePickingPadding);
          }
          if (uniformLocations.u_nodeDataTexture) {
            gl2.uniform1i(uniformLocations.u_nodeDataTexture, params.nodeDataTextureUnit);
          }
          if (uniformLocations.u_nodeDataTextureWidth) {
            gl2.uniform1i(uniformLocations.u_nodeDataTextureWidth, params.nodeDataTextureWidth);
          }
          if (uniformLocations.u_edgeDataTexture) {
            gl2.uniform1i(uniformLocations.u_edgeDataTexture, params.edgeDataTextureUnit);
          }
          if (uniformLocations.u_edgeDataTextureWidth) {
            gl2.uniform1i(uniformLocations.u_edgeDataTextureWidth, params.edgeDataTextureWidth);
          }
          if (uniformLocations.u_edgeFrameTexture) {
            gl2.uniform1i(uniformLocations.u_edgeFrameTexture, params.edgeFrameTextureUnit);
          }
          if (uniformLocations.u_edgeFrameTextureWidth) {
            gl2.uniform1i(uniformLocations.u_edgeFrameTextureWidth, params.edgeFrameTextureWidth);
          }
          if (this.edgeAttributeTexture && this.layout.floatsPerItem > 0) {
            this.edgeAttributeTexture.bind(EDGE_ATTRIBUTE_TEXTURE_UNIT);
            if (uniformLocations.u_edgeAttributeTexture) {
              gl2.uniform1i(uniformLocations.u_edgeAttributeTexture, EDGE_ATTRIBUTE_TEXTURE_UNIT);
            }
            if (uniformLocations.u_edgeAttributeTextureWidth) {
              gl2.uniform1i(uniformLocations.u_edgeAttributeTextureWidth, this.edgeAttributeTexture.getTextureWidth());
            }
            if (uniformLocations.u_edgeAttributeTexelsPerEdge) {
              gl2.uniform1i(uniformLocations.u_edgeAttributeTexelsPerEdge, this.edgeAttributeTexture.getTexelsPerItem());
            }
          }
          var processedUniforms = /* @__PURE__ */ new Set();
          paths.forEach(function(p) {
            p.uniforms.forEach(function(uniform) {
              if (processedUniforms.has(uniform.name)) return;
              processedUniforms.add(uniform.name);
              _this3.setTypedUniform(uniform, programInfo);
            });
          });
          extremities.forEach(function(ext) {
            ext.uniforms.forEach(function(uniform) {
              if (processedUniforms.has(uniform.name)) return;
              processedUniforms.add(uniform.name);
              _this3.setTypedUniform(uniform, programInfo);
            });
          });
          layers.forEach(function(layer) {
            layer.uniforms.forEach(function(uniform) {
              if (processedUniforms.has(uniform.name)) return;
              processedUniforms.add(uniform.name);
              _this3.setTypedUniform(uniform, programInfo);
            });
          });
        }
      }, {
        key: "render",
        value: function render(params, offset, count) {
          this.maybeRegenerateShaders();
          _superPropGet(EdgeProgramClass2, "render", this, 3)([params, offset, count]);
        }
      }, {
        key: "renderProgram",
        value: function renderProgram(params, programInfo) {
          this.layerLifecycles.forEach(function(hooks) {
            var _hooks$beforeRender;
            return (_hooks$beforeRender = hooks.beforeRender) === null || _hooks$beforeRender === void 0 ? void 0 : _hooks$beforeRender.call(hooks);
          });
          _superPropGet(EdgeProgramClass2, "renderProgram", this, 3)([params, programInfo]);
        }
        /**
         * Uploads the edge path attribute texture to the GPU.
         * Called by sigma before rendering to ensure texture data is current.
         */
      }, {
        key: "uploadAttributeTexture",
        value: function uploadAttributeTexture() {
          if (this.edgeAttributeTexture && this.layout.floatsPerItem > 0) {
            this.edgeAttributeTexture.upload();
          }
        }
      }, {
        key: "kill",
        value: function kill() {
          this.layerLifecycles.forEach(function(hooks) {
            var _hooks$kill;
            return (_hooks$kill = hooks.kill) === null || _hooks$kill === void 0 ? void 0 : _hooks$kill.call(hooks);
          });
          if (this.edgeAttributeTexture) {
            this.edgeAttributeTexture.kill();
            this.edgeAttributeTexture = null;
          }
          _superPropGet(EdgeProgramClass2, "kill", this, 3)([]);
        }
      }]);
    })(Program);
    var defaultHeadExtremity = extremities[defaultHeadIndex];
    var defaultTailExtremity = extremities[defaultTailIndex];
    var labelFactoryOptions = _objectSpread2({
      paths,
      headLengthRatio: !isAttributeSource(defaultHeadExtremity.length) ? defaultHeadExtremity.length : 0,
      tailLengthRatio: !isAttributeSource(defaultTailExtremity.length) ? defaultTailExtremity.length : 0
    }, options.label);
    var labelShaderConfig = resolveEdgeLabelShaderConfig(labelFactoryOptions);
    var createLabelPrograms = function createLabelPrograms2() {
      return {
        labelProgram: createEdgeLabelProgram(gl, null, renderer, labelFactoryOptions),
        labelBackgroundProgram: createEdgeLabelBackgroundProgram(gl, pickingBuffer, renderer, {
          shaderConfig: labelShaderConfig
        })
      };
    };
    var framePass = new EdgeFramePass(gl, {
      paths,
      extremities,
      layers,
      nodeShapes,
      nodeLayers
    });
    return {
      edgeProgram: new EdgeProgramClass(gl, null, renderer),
      createLabelPrograms,
      framePass
    };
  }

  // node_modules/sigma/dist/parser-fb271470.esm.js
  function isSDFShape(spec) {
    return _typeof(spec) === "object" && "uniforms" in spec && Array.isArray(spec.uniforms);
  }
  function isFragmentLayer(spec) {
    return _typeof(spec) === "object" && "uniforms" in spec && "attributes" in spec && "glsl" in spec;
  }
  function isEdgePath(spec) {
    return _typeof(spec) === "object" && "uniforms" in spec && "attributes" in spec && "segments" in spec;
  }
  function isEdgeExtremity(spec) {
    return _typeof(spec) === "object" && "uniforms" in spec && "attributes" in spec && "length" in spec;
  }
  function isEdgeLayer(spec) {
    return _typeof(spec) === "object" && "uniforms" in spec && "attributes" in spec && "glsl" in spec;
  }
  function isCustomNodeShape(spec) {
    return _typeof(spec) === "object" && "glsl" in spec && "name" in spec && !("uniforms" in spec);
  }
  function isCustomEdgePath(spec) {
    return _typeof(spec) === "object" && "glsl" in spec && "name" in spec && !("uniforms" in spec);
  }
  function isCustomEdgeExtremity(spec) {
    return _typeof(spec) === "object" && "glsl" in spec && "name" in spec && !("uniforms" in spec);
  }
  function parseNodeShape(spec) {
    if (isSDFShape(spec)) {
      return spec;
    }
    if (isCustomNodeShape(spec)) {
      return {
        name: spec.name,
        glsl: spec.glsl,
        inradiusFactor: spec.inradiusFactor,
        uniforms: []
      };
    }
    throw new Error("Invalid node shape specification: ".concat(JSON.stringify(spec)));
  }
  function parseNodeLayer(spec) {
    if (isFragmentLayer(spec)) {
      return spec;
    }
    if (isCustomNodeLayer(spec)) {
      return {
        name: spec.name,
        glsl: spec.glsl,
        uniforms: [],
        attributes: []
      };
    }
    throw new Error("Invalid node layer specification: ".concat(JSON.stringify(spec)));
  }
  function parseEdgePath(spec) {
    if (isEdgePath(spec)) {
      return spec;
    }
    if (isCustomEdgePath(spec)) {
      return {
        name: spec.name,
        glsl: spec.glsl,
        segments: spec.segments,
        uniforms: [],
        attributes: []
      };
    }
    throw new Error("Invalid edge path specification: ".concat(JSON.stringify(spec)));
  }
  function parseEdgeLayer(spec) {
    if (isEdgeLayer(spec)) {
      return spec;
    }
    if (isCustomEdgeLayer(spec)) {
      return {
        name: spec.name,
        glsl: spec.glsl,
        uniforms: [],
        attributes: []
      };
    }
    throw new Error("Invalid edge layer specification: ".concat(JSON.stringify(spec)));
  }
  function parseEdgeExtremity(spec) {
    if (isEdgeExtremity(spec)) {
      return spec;
    }
    if (isCustomEdgeExtremity(spec)) {
      return {
        name: spec.name,
        glsl: spec.glsl,
        length: spec.length,
        widthFactor: spec.widthFactor,
        margin: 0,
        uniforms: [],
        attributes: []
      };
    }
    throw new Error("Invalid edge extremity specification: ".concat(JSON.stringify(spec)));
  }
  function parseNodePrimitives(nodePrimitives) {
    var _nodePrimitives$shape, _nodePrimitives$layer;
    var shapesSpecs = (_nodePrimitives$shape = nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.shapes) !== null && _nodePrimitives$shape !== void 0 ? _nodePrimitives$shape : DEFAULT_NODE_PRIMITIVES.shapes;
    var layersSpecs = (_nodePrimitives$layer = nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.layers) !== null && _nodePrimitives$layer !== void 0 ? _nodePrimitives$layer : DEFAULT_NODE_PRIMITIVES.layers;
    var shapes = shapesSpecs.map(parseNodeShape);
    var layers = layersSpecs.map(parseNodeLayer);
    if (shapes.length === 0) {
      throw new Error("At least one node shape must be specified.");
    }
    if (layers.length === 0) {
      throw new Error("At least one node layer must be specified.");
    }
    return {
      shapes,
      layers
    };
  }
  function parseEdgePrimitives(edgePrimitives) {
    var _edgePrimitives$paths, _edgePrimitives$extre, _edgePrimitives$layer;
    var pathsSpecs = (_edgePrimitives$paths = edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.paths) !== null && _edgePrimitives$paths !== void 0 ? _edgePrimitives$paths : DEFAULT_EDGE_PRIMITIVES.paths;
    var extremitiesSpecs = (_edgePrimitives$extre = edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.extremities) !== null && _edgePrimitives$extre !== void 0 ? _edgePrimitives$extre : DEFAULT_EDGE_PRIMITIVES.extremities;
    var layersSpecs = (_edgePrimitives$layer = edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.layers) !== null && _edgePrimitives$layer !== void 0 ? _edgePrimitives$layer : DEFAULT_EDGE_PRIMITIVES.layers;
    var paths = pathsSpecs.map(parseEdgePath);
    var extremities = extremitiesSpecs.map(parseEdgeExtremity).filter(function(e) {
      return e !== null;
    });
    var layers = layersSpecs.map(parseEdgeLayer);
    if (paths.length === 0) {
      throw new Error("At least one edge path must be specified.");
    }
    if (layers.length === 0) {
      throw new Error("At least one edge layer must be specified.");
    }
    return {
      paths,
      extremities,
      layers
    };
  }
  function mergeDeclaredVariables(items, extra) {
    var variables = {};
    var _iterator = _createForOfIteratorHelper(items), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        if (item.variables) Object.assign(variables, item.variables);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    Object.assign(variables, extra || {});
    return variables;
  }
  function generateNodeProgram(gl, pickingBuffer, renderer, nodePrimitives, antialias) {
    var _parseNodePrimitives = parseNodePrimitives(nodePrimitives), shapes = _parseNodePrimitives.shapes, layers = _parseNodePrimitives.layers;
    var variables = mergeDeclaredVariables(shapes, nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.variables);
    var bundle = createNodeProgram(gl, pickingBuffer, renderer, {
      shapes,
      layers,
      label: nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.label,
      backdrop: nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.backdrop,
      labelAttachments: nodePrimitives === null || nodePrimitives === void 0 ? void 0 : nodePrimitives.labelAttachments
    }, antialias);
    return _objectSpread2(_objectSpread2({}, bundle), {}, {
      variables
    });
  }
  function generateEdgeProgram(gl, pickingBuffer, renderer, edgePrimitives, antialias, nodePrimitives) {
    var _parseEdgePrimitives = parseEdgePrimitives(edgePrimitives), paths = _parseEdgePrimitives.paths, extremities = _parseEdgePrimitives.extremities, layers = _parseEdgePrimitives.layers;
    var _parseNodePrimitives2 = parseNodePrimitives(nodePrimitives), nodeShapes = _parseNodePrimitives2.shapes, nodeLayers = _parseNodePrimitives2.layers;
    var variables = mergeDeclaredVariables(paths, edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.variables);
    var bundle = createEdgeProgram(gl, pickingBuffer, renderer, {
      paths,
      extremities,
      layers,
      defaultHead: edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.defaultHead,
      defaultTail: edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.defaultTail,
      label: edgePrimitives === null || edgePrimitives === void 0 ? void 0 : edgePrimitives.label
    }, antialias, nodeShapes, nodeLayers);
    return _objectSpread2(_objectSpread2({}, bundle), {}, {
      variables,
      paths
    });
  }

  // node_modules/sigma/dist/shelf-atlas-9d18a043.esm.js
  var MARGIN = 2;
  function packItemsOnPage(items, ctx, cursor) {
    var margin = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : MARGIN;
    var _ctx$canvas = ctx.canvas, canvasW = _ctx$canvas.width, canvasH = _ctx$canvas.height;
    var x = cursor.x, y = cursor.y, rowHeight = cursor.rowHeight, maxRowWidth = cursor.maxRowWidth;
    var atlas = {};
    var remaining = [];
    var _iterator = _createForOfIteratorHelper(items), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        var w = item.width + margin;
        var h = item.height + margin;
        if (w > canvasW || h > canvasH || x + w > canvasW && y + rowHeight + h > canvasH) {
          remaining.push(item);
          continue;
        }
        if (x + w > canvasW) {
          maxRowWidth = Math.max(maxRowWidth, x);
          x = 0;
          y += rowHeight;
          rowHeight = h;
        }
        item.draw(ctx, x, y);
        atlas[item.key] = {
          x,
          y,
          width: item.width,
          height: item.height
        };
        x += w;
        rowHeight = Math.max(rowHeight, h);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    maxRowWidth = Math.max(maxRowWidth, x);
    return {
      atlas,
      cursor: {
        x,
        y,
        rowHeight,
        maxRowWidth
      },
      remaining
    };
  }

  // node_modules/sigma/dist/edge-data-texture-0ba3f15f.esm.js
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e2) {
      i = 0;
    }
    _regeneratorDefine = function(e2, r2, n2, t2) {
      function o(r3, n3) {
        _regeneratorDefine(e2, r3, function(e3) {
          return this._invoke(r3, n3, e3);
        });
      }
      r2 ? i ? i(e2, r2, {
        value: n2,
        enumerable: !t2,
        configurable: !t2,
        writable: !t2
      }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _regenerator() {
    var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
    function i(r2, n2, o2, i2) {
      var c2 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c2.prototype);
      return _regeneratorDefine(u2, "_invoke", (function(r3, n3, o3) {
        var i3, c3, u3, f2 = 0, p = o3 || [], y = false, G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function(t2, r4) {
            return i3 = t2, c3 = 0, u3 = e, G.n = r4, a;
          }
        };
        function d(r4, n4) {
          for (c3 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
            var o4, i4 = p[t], d2 = G.p, l = i4[2];
            r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c3 = i4[4]) ? 5 : (c3 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c3 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c3 = 0));
          }
          if (o4 || r4 > 1) return a;
          throw y = true, n4;
        }
        return function(o4, p2, l) {
          if (f2 > 1) throw TypeError("Generator is already running");
          for (y && 1 === p2 && d(p2, l), c3 = p2, u3 = l; (t = c3 < 2 ? e : u3) || !y; ) {
            i3 || (c3 ? c3 < 3 ? (c3 > 1 && (G.n = -1), d(c3, u3)) : G.n = u3 : G.v = u3);
            try {
              if (f2 = 2, i3) {
                if (c3 || (o4 = "next"), t = i3[o4]) {
                  if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u3 = t.value, c3 < 2 && (c3 = 0);
                } else 1 === c3 && (t = i3.return) && t.call(i3), c3 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c3 = 1);
                i3 = e;
              } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
            } catch (t2) {
              i3 = e, c3 = 1, u3 = t2;
            } finally {
              f2 = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      })(r2, o2, i2), true), u2;
    }
    var a = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function() {
      return this;
    }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e2) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function() {
      return this;
    }), _regeneratorDefine(u, "toString", function() {
      return "[object Generator]";
    }), (_regenerator = function() {
      return {
        w: i,
        m: f
      };
    })();
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c), u = i.value;
    } catch (n2) {
      return void e(n2);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function() {
      var t = this, e = arguments;
      return new Promise(function(r, o) {
        var a = n.apply(t, e);
        function _next(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
        }
        function _throw(n2) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
        }
        _next(void 0);
      });
    };
  }
  var fetchCache = /* @__PURE__ */ new Map();
  var taintWarned = false;
  function blobToDataUrl(blob) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function() {
        return resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  function fetchAsDataUrl(url) {
    if (!fetchCache.has(url)) {
      var promise = fetch(url).then(function(r) {
        return r.blob();
      }).then(blobToDataUrl)["catch"](function() {
        fetchCache["delete"](url);
        return null;
      });
      fetchCache.set(url, promise);
    }
    return fetchCache.get(url);
  }
  function inlineImages(_x) {
    return _inlineImages.apply(this, arguments);
  }
  function _inlineImages() {
    _inlineImages = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee2(html) {
      var div, imgs, toInline;
      return _regenerator().w(function(_context2) {
        while (1) switch (_context2.n) {
          case 0:
            div = document.createElement("div");
            div.innerHTML = html;
            imgs = Array.from(div.querySelectorAll("img[src]"));
            toInline = imgs.filter(function(img) {
              return !img.getAttribute("src").startsWith("data:");
            });
            _context2.n = 1;
            return Promise.all(toInline.map(/* @__PURE__ */ (function() {
              var _ref = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee(img) {
                var dataUrl;
                return _regenerator().w(function(_context) {
                  while (1) switch (_context.n) {
                    case 0:
                      _context.n = 1;
                      return fetchAsDataUrl(img.getAttribute("src"));
                    case 1:
                      dataUrl = _context.v;
                      if (dataUrl) img.setAttribute("src", dataUrl);
                    case 2:
                      return _context.a(2);
                  }
                }, _callee);
              }));
              return function(_x8) {
                return _ref.apply(this, arguments);
              };
            })()));
          case 1:
            return _context2.a(2, div.innerHTML);
        }
      }, _callee2);
    }));
    return _inlineImages.apply(this, arguments);
  }
  function svgToCanvas(_x2) {
    return _svgToCanvas.apply(this, arguments);
  }
  function _svgToCanvas() {
    _svgToCanvas = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee3(svg) {
      var pixelRatio, svgString, parser, doc, svgEl, width, height, viewBox, parts, physW, physH, blob, url, _args3 = arguments;
      return _regenerator().w(function(_context3) {
        while (1) switch (_context3.n) {
          case 0:
            pixelRatio = _args3.length > 1 && _args3[1] !== void 0 ? _args3[1] : 1;
            svgString = svg instanceof SVGElement ? new XMLSerializer().serializeToString(svg) : svg;
            parser = new DOMParser();
            doc = parser.parseFromString(svgString, "image/svg+xml");
            svgEl = doc.querySelector("svg");
            if (svgEl) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, null);
          case 1:
            width = parseFloat(svgEl.getAttribute("width") || "");
            height = parseFloat(svgEl.getAttribute("height") || "");
            if (!(width > 0) || !(height > 0)) {
              viewBox = svgEl.getAttribute("viewBox");
              if (viewBox) {
                parts = viewBox.trim().split(/[\s,]+/);
                width = parseFloat(parts[2]);
                height = parseFloat(parts[3]);
              }
            }
            if (!(!(width > 0) || !(height > 0))) {
              _context3.n = 2;
              break;
            }
            console.warn("Sigma: SVG label attachment has no parseable dimensions \u2014 skipped.");
            return _context3.a(2, null);
          case 2:
            physW = Math.ceil(width * pixelRatio);
            physH = Math.ceil(height * pixelRatio);
            blob = new Blob([svgString], {
              type: "image/svg+xml"
            });
            url = URL.createObjectURL(blob);
            return _context3.a(2, new Promise(function(resolve) {
              var img = new Image();
              img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = physW;
                canvas.height = physH;
                canvas.getContext("2d").drawImage(img, 0, 0, physW, physH);
                URL.revokeObjectURL(url);
                try {
                  canvas.getContext("2d").getImageData(0, 0, 1, 1);
                } catch (e) {
                  if (e instanceof DOMException && e.name === "SecurityError") {
                    if (!taintWarned) {
                      taintWarned = true;
                      console.warn('Sigma: A label attachment was skipped because the rendered canvas is tainted. SVG with <foreignObject> (used by the "html" attachment type) is blocked in Chromium and Safari. Use type: "canvas" with Canvas 2D rendering instead.');
                    }
                    resolve(null);
                    return;
                  }
                  throw e;
                }
                resolve(canvas);
              };
              img.onerror = function() {
                URL.revokeObjectURL(url);
                resolve(null);
              };
              img.src = url;
            }));
        }
      }, _callee3);
    }));
    return _svgToCanvas.apply(this, arguments);
  }
  function measureHtmlContent(html, css) {
    var el = document.createElement("div");
    el.style.cssText = "position:fixed;left:-99999px;top:0;visibility:hidden;width:max-content;height:max-content";
    el.innerHTML = (css ? "<style>".concat(css, "</style>") : "") + html;
    document.body.appendChild(el);
    var _el$getBoundingClient = el.getBoundingClientRect(), width = _el$getBoundingClient.width, height = _el$getBoundingClient.height;
    document.body.removeChild(el);
    return {
      width: Math.ceil(width),
      height: Math.ceil(height)
    };
  }
  function htmlToCanvas(_x3, _x4, _x5, _x6) {
    return _htmlToCanvas.apply(this, arguments);
  }
  function _htmlToCanvas() {
    _htmlToCanvas = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee4(html, css, width, height) {
      var pixelRatio, htmlString, inlined, measured, physW, physH, styleBlock, svgString, _args4 = arguments;
      return _regenerator().w(function(_context4) {
        while (1) switch (_context4.n) {
          case 0:
            pixelRatio = _args4.length > 4 && _args4[4] !== void 0 ? _args4[4] : 1;
            htmlString = html instanceof HTMLElement ? html.outerHTML : html;
            _context4.n = 1;
            return inlineImages(htmlString);
          case 1:
            inlined = _context4.v;
            if (width == null || height == null) {
              measured = measureHtmlContent(inlined, css);
              width = width !== null && width !== void 0 ? width : measured.width;
              height = height !== null && height !== void 0 ? height : measured.height;
            }
            physW = Math.ceil(width * pixelRatio);
            physH = Math.ceil(height * pixelRatio);
            styleBlock = css ? "<style>".concat(css, "</style>") : "";
            svgString = '<svg xmlns="http://www.w3.org/2000/svg" ' + 'width="'.concat(physW, '" height="').concat(physH, '" viewBox="0 0 ').concat(width, " ").concat(height, '">') + '<foreignObject width="'.concat(width, '" height="').concat(height, '">') + '<body xmlns="http://www.w3.org/1999/xhtml" style="margin:0;padding:0">'.concat(styleBlock).concat(inlined, "</body>") + "</foreignObject></svg>";
            return _context4.a(2, svgToCanvas(svgString, 1));
        }
      }, _callee4);
    }));
    return _htmlToCanvas.apply(this, arguments);
  }
  function contentToCanvas(_x7) {
    return _contentToCanvas.apply(this, arguments);
  }
  function _contentToCanvas() {
    _contentToCanvas = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee5(content) {
      var pixelRatio, _args5 = arguments, _t;
      return _regenerator().w(function(_context5) {
        while (1) switch (_context5.n) {
          case 0:
            pixelRatio = _args5.length > 1 && _args5[1] !== void 0 ? _args5[1] : 1;
            _t = content.type;
            _context5.n = _t === "canvas" ? 1 : _t === "svg" ? 2 : _t === "html" ? 3 : 4;
            break;
          case 1:
            return _context5.a(2, content.canvas);
          case 2:
            return _context5.a(2, svgToCanvas(content.svg, pixelRatio));
          case 3:
            return _context5.a(2, htmlToCanvas(content.html, content.css, content.width, content.height, pixelRatio));
          case 4:
            return _context5.a(2);
        }
      }, _callee5);
    }));
    return _contentToCanvas.apply(this, arguments);
  }
  var ATLAS_SIZE = 2048;
  var AttachmentManager = /* @__PURE__ */ (function() {
    function AttachmentManager2(gl, renderers, scheduleRender) {
      _classCallCheck(this, AttachmentManager2);
      _defineProperty(this, "cache", /* @__PURE__ */ new Map());
      _defineProperty(this, "pending", /* @__PURE__ */ new Set());
      _defineProperty(this, "atlas", {});
      _defineProperty(this, "glTexture", null);
      _defineProperty(this, "dirty", true);
      this.gl = gl;
      this.renderers = renderers;
      this.scheduleRender = scheduleRender;
      this.packCanvas = document.createElement("canvas");
      this.packCanvas.width = ATLAS_SIZE;
      this.packCanvas.height = ATLAS_SIZE;
      this.packCtx = this.packCanvas.getContext("2d");
    }
    return _createClass(AttachmentManager2, [{
      key: "renderAttachment",
      value: function renderAttachment(node, attachmentName, context) {
        var _this = this;
        var key = "".concat(node, ":").concat(attachmentName);
        if (this.cache.has(key) || this.pending.has(key)) return;
        var renderer = this.renderers[attachmentName];
        if (!renderer) return;
        var result = renderer(context);
        if (!result) return;
        this.pending.add(key);
        var pixelRatio = context.pixelRatio;
        Promise.resolve(result).then(/* @__PURE__ */ (function() {
          var _ref = _asyncToGenerator(/* @__PURE__ */ _regenerator().m(function _callee(content) {
            var canvas;
            return _regenerator().w(function(_context) {
              while (1) switch (_context.n) {
                case 0:
                  if (_this.pending.has(key)) {
                    _context.n = 1;
                    break;
                  }
                  return _context.a(2);
                case 1:
                  _this.pending["delete"](key);
                  if (content) {
                    _context.n = 2;
                    break;
                  }
                  return _context.a(2);
                case 2:
                  _context.n = 3;
                  return contentToCanvas(content, pixelRatio);
                case 3:
                  canvas = _context.v;
                  if (!(!canvas || canvas.width === 0 || canvas.height === 0)) {
                    _context.n = 4;
                    break;
                  }
                  return _context.a(2);
                case 4:
                  _this.cache.set(key, {
                    image: canvas,
                    width: canvas.width,
                    height: canvas.height
                  });
                  _this.dirty = true;
                  _this.scheduleRender();
                case 5:
                  return _context.a(2);
              }
            }, _callee);
          }));
          return function(_x) {
            return _ref.apply(this, arguments);
          };
        })());
      }
      /**
       * Packs all cached attachments into atlas textures and uploads to GL.
       * Uploads the canvas directly (preserving premultiplied alpha).
       * No-op when nothing has changed since the last call.
       */
    }, {
      key: "regenerateAtlas",
      value: function regenerateAtlas() {
        if (!this.dirty) return;
        this.dirty = false;
        var items = [];
        this.cache.forEach(function(cached, key) {
          items.push({
            key,
            width: cached.width,
            height: cached.height,
            draw: function draw(ctx, destX, destY) {
              ctx.drawImage(cached.image, destX, destY);
            }
          });
        });
        if (items.length === 0) {
          this.atlas = {};
          this.deleteGLTexture();
          return;
        }
        var cursor = {
          x: 0,
          y: 0,
          rowHeight: 0,
          maxRowWidth: 0
        };
        this.packCtx.clearRect(0, 0, ATLAS_SIZE, ATLAS_SIZE);
        var _packItemsOnPage = packItemsOnPage(items, this.packCtx, cursor), atlas = _packItemsOnPage.atlas, remaining = _packItemsOnPage.remaining;
        this.atlas = atlas;
        if (remaining.length > 0) {
          console.warn("Sigma: ".concat(remaining.length, " label attachment(s) could not fit in the ").concat(ATLAS_SIZE, "x").concat(ATLAS_SIZE, " atlas and will not be rendered."));
        }
        this.deleteGLTexture();
        var gl = this.gl;
        var tex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0 + ATTACHMENT_TEXTURE_UNIT);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.packCanvas);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.glTexture = tex;
      }
      /**
       * Binds the atlas texture to the given WebGL texture unit.
       */
    }, {
      key: "bindTexture",
      value: function bindTexture(textureUnit) {
        if (!this.glTexture) return;
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
      }
      /**
       * Returns atlas entry for a cached attachment, or null if not packed yet.
       */
    }, {
      key: "getEntry",
      value: function getEntry(node, attachmentName) {
        var cacheKey = "".concat(node, ":").concat(attachmentName);
        return this.atlas[cacheKey] || null;
      }
      /**
       * Invalidates cached and in-flight attachments for a node (e.g., on state change).
       */
    }, {
      key: "invalidateNode",
      value: function invalidateNode(node) {
        var prefix = "".concat(node, ":");
        var _iterator = _createForOfIteratorHelper(this.cache.keys()), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var key = _step.value;
            if (key.startsWith(prefix)) {
              this.cache["delete"](key);
              this.dirty = true;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var _iterator2 = _createForOfIteratorHelper(this.pending), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var _key = _step2.value;
            if (_key.startsWith(prefix)) this.pending["delete"](_key);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      /** Drops the dead GL texture after a context loss, for the next atlas pass to repack. */
    }, {
      key: "restore",
      value: function restore() {
        this.glTexture = null;
        this.dirty = true;
      }
      /**
       * Clears all cached data and textures.
       */
    }, {
      key: "clear",
      value: function clear() {
        this.cache.clear();
        this.pending.clear();
        this.atlas = {};
        this.dirty = true;
        this.deleteGLTexture();
      }
      /**
       * Full cleanup — releases GL resources and drops references for GC.
       */
    }, {
      key: "kill",
      value: function kill() {
        this.clear();
        this.packCanvas = null;
        this.packCtx = null;
        this.gl = null;
      }
    }, {
      key: "deleteGLTexture",
      value: function deleteGLTexture() {
        if (this.glTexture) {
          this.gl.deleteTexture(this.glTexture);
          this.glTexture = null;
        }
      }
    }]);
  })();
  var DepthBucketCollection = /* @__PURE__ */ (function() {
    function DepthBucketCollection2(depthLayers) {
      _classCallCheck(this, DepthBucketCollection2);
      _defineProperty(this, "buckets", /* @__PURE__ */ new Map());
      _defineProperty(this, "keyDepth", /* @__PURE__ */ new Map());
      var _iterator = _createForOfIteratorHelper(depthLayers), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var layer = _step.value;
          this.buckets.set(layer, /* @__PURE__ */ new Set());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return _createClass(DepthBucketCollection2, [{
      key: "has",
      value: function has(key) {
        return this.keyDepth.has(key);
      }
      /** Returns the keys at a declared depth layer, or undefined for an undeclared one. */
    }, {
      key: "getBucket",
      value: function getBucket(depth) {
        return this.buckets.get(depth);
      }
      /**
       * Places `key` at `depth`, removing it from any previous bucket. Throws when
       * `depth` is not a declared depth layer — no bucket was pre-created for it.
       */
    }, {
      key: "set",
      value: function set(key, depth) {
        var _this$buckets$get;
        var previous = this.keyDepth.get(key);
        if (previous === depth) return;
        var bucket = this.buckets.get(depth);
        if (!bucket) throw new Error('Sigma: "'.concat(depth, '" is not a declared depth layer'));
        if (previous !== void 0) (_this$buckets$get = this.buckets.get(previous)) === null || _this$buckets$get === void 0 || _this$buckets$get["delete"](key);
        bucket.add(key);
        this.keyDepth.set(key, depth);
      }
      /** Removes `key` from whichever bucket holds it. No-op for an unknown key. */
    }, {
      key: "remove",
      value: function remove(key) {
        var depth = this.keyDepth.get(key);
        if (depth === void 0) return;
        this.buckets.get(depth)["delete"](key);
        this.keyDepth["delete"](key);
      }
    }, {
      key: "clearAll",
      value: function clearAll() {
        var _iterator2 = _createForOfIteratorHelper(this.buckets.values()), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var bucket = _step2.value;
            bucket.clear();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        this.keyDepth.clear();
      }
      /**
       * Returns the keys at `depth` sorted ascending by `zIndexOf`. The result is a
       * fresh array; an unknown or empty depth yields `[]`.
       */
    }, {
      key: "getSorted",
      value: function getSorted(depth, zIndexOf) {
        var bucket = this.buckets.get(depth);
        if (!bucket || bucket.size === 0) return [];
        return _toConsumableArray(bucket).sort(function(a, b) {
          return zIndexOf(a) - zIndexOf(b);
        });
      }
    }]);
  })();
  var NodeDataTexture = /* @__PURE__ */ (function(_DataTexture) {
    function NodeDataTexture2(gl, initialCapacity) {
      _classCallCheck(this, NodeDataTexture2);
      return _callSuper(this, NodeDataTexture2, [gl, 2, initialCapacity]);
    }
    _inherits(NodeDataTexture2, _DataTexture);
    return _createClass(NodeDataTexture2, [{
      key: "updateNode",
      value: function updateNode(nodeKey, x, y, size, shapeId, nodeRotation, labelRotation, color) {
        var index = this.indexMap.get(nodeKey);
        if (index === void 0) {
          throw new Error('Node "'.concat(nodeKey, '" not allocated in NodeDataTexture'));
        }
        var _colorToArray = colorToArray(color), _colorToArray2 = _slicedToArray(_colorToArray, 4), r = _colorToArray2[0], g = _colorToArray2[1], b = _colorToArray2[2], a = _colorToArray2[3];
        var offset = index * 2 * 4;
        this.data[offset] = x;
        this.data[offset + 1] = y;
        this.data[offset + 2] = size;
        this.data[offset + 3] = shapeId;
        this.data[offset + 4] = nodeRotation;
        this.data[offset + 5] = labelRotation;
        this.data[offset + 6] = r * 65536 + g * 256 + b;
        this.data[offset + 7] = a / 255;
        this.markDirty(index);
      }
    }]);
  })(DataTexture);
  var INITIAL_CAPACITY2 = 1024;
  var GROWTH_FACTOR2 = 1.5;
  var FrameTexture = /* @__PURE__ */ (function() {
    function FrameTexture2(gl, options) {
      var _options$initialCapac;
      _classCallCheck(this, FrameTexture2);
      _defineProperty(this, "texture", null);
      _defineProperty(this, "framebuffer", null);
      if (!gl.getExtension("EXT_color_buffer_float")) {
        throw new Error("sigma: EXT_color_buffer_float is required for label/edge placement but is unavailable in this WebGL2 context.");
      }
      this.gl = gl;
      this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
      this.channels = options.channels;
      this.capacity = this.roundUpToPowerOfTwo((_options$initialCapac = options.initialCapacity) !== null && _options$initialCapac !== void 0 ? _options$initialCapac : INITIAL_CAPACITY2);
      var dims = this.computeDimensions(this.capacity);
      this.textureWidth = dims.width;
      this.textureHeight = dims.height;
      this.create();
    }
    return _createClass(FrameTexture2, [{
      key: "roundUpToPowerOfTwo",
      value: function roundUpToPowerOfTwo(n) {
        return Math.pow(2, Math.ceil(Math.log2(Math.max(1, n))));
      }
    }, {
      key: "computeDimensions",
      value: function computeDimensions(capacity) {
        var width = Math.min(capacity, this.maxTextureSize);
        var height = Math.ceil(capacity / width);
        return {
          width,
          height
        };
      }
    }, {
      key: "create",
      value: function create() {
        var gl = this.gl;
        var internalFormat = this.channels === 1 ? gl.R32F : gl.RGBA32F;
        var format = this.channels === 1 ? gl.RED : gl.RGBA;
        this.texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, this.textureWidth, this.textureHeight, 0, format, gl.FLOAT, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
          throw new Error("sigma: float framebuffer for frame-pass placement is incomplete.");
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
      }
      /**
       * Grows the texture so `capacity` items are addressable, keeping it sized
       * against the matching data texture. A no-op once large enough.
       */
    }, {
      key: "ensureCapacity",
      value: function ensureCapacity(capacity) {
        if (capacity <= this.capacity) return;
        var gl = this.gl;
        this.capacity = this.roundUpToPowerOfTwo(Math.ceil(capacity * GROWTH_FACTOR2));
        var dims = this.computeDimensions(this.capacity);
        this.textureWidth = dims.width;
        this.textureHeight = dims.height;
        if (this.texture) gl.deleteTexture(this.texture);
        if (this.framebuffer) gl.deleteFramebuffer(this.framebuffer);
        this.create();
      }
      /**
       * Binds the texture as the render target and sets the viewport to its size,
       * ready for the frame-pass to scatter values into it. The caller restores the
       * default framebuffer/viewport afterward.
       */
    }, {
      key: "bindAsRenderTarget",
      value: function bindAsRenderTarget() {
        var gl = this.gl;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.viewport(0, 0, this.textureWidth, this.textureHeight);
      }
      /** Binds the texture to a unit for sampling by consumers. */
    }, {
      key: "bind",
      value: function bind(textureUnit) {
        var gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + textureUnit);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
      }
    }, {
      key: "getTexture",
      value: function getTexture() {
        return this.texture;
      }
    }, {
      key: "getTextureWidth",
      value: function getTextureWidth() {
        return this.textureWidth;
      }
    }, {
      key: "getTextureHeight",
      value: function getTextureHeight() {
        return this.textureHeight;
      }
      /** Recreates texture and framebuffer after a context loss, for the next frame-pass to refill. */
    }, {
      key: "restore",
      value: function restore() {
        this.gl.getExtension("EXT_color_buffer_float");
        this.create();
      }
    }, {
      key: "kill",
      value: function kill() {
        var gl = this.gl;
        if (this.texture) {
          gl.deleteTexture(this.texture);
          this.texture = null;
        }
        if (this.framebuffer) {
          gl.deleteFramebuffer(this.framebuffer);
          this.framebuffer = null;
        }
      }
    }]);
  })();
  var EdgeDataTexture = /* @__PURE__ */ (function(_DataTexture) {
    function EdgeDataTexture2(gl, initialCapacity) {
      _classCallCheck(this, EdgeDataTexture2);
      return _callSuper(this, EdgeDataTexture2, [gl, 2, initialCapacity]);
    }
    _inherits(EdgeDataTexture2, _DataTexture);
    return _createClass(EdgeDataTexture2, [{
      key: "updateEdge",
      value: function updateEdge(edgeKey, sourceNodeIndex, targetNodeIndex, thickness, headLengthRatio, tailLengthRatio) {
        var pathId = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
        var headId = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 0;
        var tailId = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 0;
        var index = this.indexMap.get(edgeKey);
        if (index === void 0) {
          throw new Error('Edge "'.concat(edgeKey, '" not allocated in EdgeDataTexture'));
        }
        var texelBase = index * this.TEXELS_PER_ITEM * 4;
        this.data[texelBase + 0] = sourceNodeIndex;
        this.data[texelBase + 1] = targetNodeIndex;
        this.data[texelBase + 2] = thickness;
        this.data[texelBase + 3] = 0;
        this.data[texelBase + 4] = headLengthRatio;
        this.data[texelBase + 5] = tailLengthRatio;
        this.data[texelBase + 6] = pathId;
        this.data[texelBase + 7] = (headId & 15) << 4 | tailId & 15;
        this.markDirty(index);
      }
    }]);
  })(DataTexture);

  // node_modules/sigma/dist/sigma.esm.js
  var import_events4 = __toESM(require_events());
  var import_is_graph2 = __toESM(require_is_graph());
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  var _excluded = ["factor"];
  var _excluded2 = ["factor"];
  var DEFAULT_ZOOMING_RATIO = 1.5;
  var DEFAULT_CAMERA_STATE = {
    x: 0.5,
    y: 0.5,
    angle: 0,
    ratio: 1
  };
  var Camera = /* @__PURE__ */ (function(_TypedEventEmitter) {
    function Camera2() {
      var _this;
      _classCallCheck(this, Camera2);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, Camera2, [].concat(args));
      _defineProperty(_this, "minRatio", null);
      _defineProperty(_this, "maxRatio", null);
      _defineProperty(_this, "enabled", true);
      _defineProperty(_this, "enabledZooming", true);
      _defineProperty(_this, "enabledPanning", true);
      _defineProperty(_this, "enabledRotation", true);
      _defineProperty(_this, "constrainState", null);
      _defineProperty(_this, "state", _objectSpread2({}, DEFAULT_CAMERA_STATE));
      _defineProperty(_this, "previousState", _objectSpread2({}, DEFAULT_CAMERA_STATE));
      _defineProperty(_this, "nextFrame", null);
      _defineProperty(_this, "currentAnimationFrom", null);
      _defineProperty(_this, "currentAnimationTo", null);
      _defineProperty(_this, "animationCallback", null);
      return _this;
    }
    _inherits(Camera2, _TypedEventEmitter);
    return _createClass(Camera2, [{
      key: "x",
      get: (
        // The state is read-only: it can only be updated through #setState, so that
        // no update escapes validation and the "updated" event.
        function get() {
          return this.state.x;
        }
      )
    }, {
      key: "y",
      get: function get() {
        return this.state.y;
      }
    }, {
      key: "angle",
      get: function get() {
        return this.state.angle;
      }
    }, {
      key: "ratio",
      get: function get() {
        return this.state.ratio;
      }
      /**
       * Static method used to create a Camera object with a given state.
       */
    }, {
      key: "getState",
      value: (
        /**
         * Method used to retrieve the camera's current state.
         */
        function getState() {
          return _objectSpread2({}, this.state);
        }
      )
      /**
       * Method used to retrieve the state the camera had before its last update.
       */
    }, {
      key: "getPreviousState",
      value: function getPreviousState() {
        return _objectSpread2({}, this.previousState);
      }
      /**
       * Method used to check minRatio and maxRatio values.
       */
    }, {
      key: "getBoundedRatio",
      value: function getBoundedRatio(ratio) {
        var r = ratio;
        if (typeof this.minRatio === "number") r = Math.max(r, this.minRatio);
        if (typeof this.maxRatio === "number") r = Math.min(r, this.maxRatio);
        return r;
      }
      /**
       * Method used to merge a state candidate into the current state, dropping
       * whatever the interaction flags forbid, and constraining the rest.
       */
    }, {
      key: "validateState",
      value: function validateState(state) {
        var validatedState = this.getState();
        if (this.enabledPanning && typeof state.x === "number") validatedState.x = state.x;
        if (this.enabledPanning && typeof state.y === "number") validatedState.y = state.y;
        if (this.enabledZooming && typeof state.ratio === "number") validatedState.ratio = this.getBoundedRatio(state.ratio);
        if (this.enabledRotation && typeof state.angle === "number") validatedState.angle = state.angle;
        return this.constrainState ? this.constrainState(validatedState) : validatedState;
      }
      /**
       * Method used to check whether an animation is currently running.
       */
    }, {
      key: "isAnimating",
      value: function isAnimating() {
        return this.nextFrame !== null;
      }
      /**
       * Method used to set the camera's state.
       */
    }, {
      key: "setState",
      value: function setState(state) {
        if (!this.enabled) return this;
        var validState = this.validateState(state);
        if (shallowEqual(this.state, validState)) return this;
        this.previousState = this.state;
        this.state = validState;
        this.emit("updated", this.getState());
        return this;
      }
      /**
       * Method used to update the camera's state using a function.
       */
    }, {
      key: "updateState",
      value: function updateState(updater) {
        this.setState(updater(this.getState()));
        return this;
      }
      /**
       * Animates the camera to the given state.
       *
       * The returned promise resolves when the animation stops, whether it ran to
       * completion or was interrupted by a new animation or by
       * {@link Camera#cancelAnimation}. Read `completed` on the `animationEnd`
       * event to tell those apart. On a disabled camera it resolves right away.
       */
    }, {
      key: "animate",
      value: function animate(state, options) {
        var _this2 = this;
        if (!this.enabled) return Promise.resolve();
        return new Promise(function(resolve) {
          return _this2.runAnimation(state, _objectSpread2(_objectSpread2({}, ANIMATE_DEFAULTS), options), resolve);
        });
      }
      /**
       * Stops the running animation where it is, leaving the camera at its current
       * state. No-op when nothing is running.
       */
    }, {
      key: "cancelAnimation",
      value: function cancelAnimation() {
        if (this.nextFrame !== null) {
          cancelAnimationFrame(this.nextFrame);
          this.nextFrame = null;
        }
        this.resolveAnimation();
        this.emitAnimationEnd(false);
        return this;
      }
      /**
       * Method used to zoom the camera in, by dividing its ratio by `factor`.
       */
    }, {
      key: "zoomIn",
      value: function zoomIn() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$factor = _ref.factor, factor = _ref$factor === void 0 ? DEFAULT_ZOOMING_RATIO : _ref$factor, options = _objectWithoutProperties(_ref, _excluded);
        return this.animate({
          ratio: this.ratio / factor
        }, options);
      }
      /**
       * Method used to zoom the camera out, by multiplying its ratio by `factor`.
       */
    }, {
      key: "zoomOut",
      value: function zoomOut() {
        var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$factor = _ref2.factor, factor = _ref2$factor === void 0 ? DEFAULT_ZOOMING_RATIO : _ref2$factor, options = _objectWithoutProperties(_ref2, _excluded2);
        return this.animate({
          ratio: this.ratio * factor
        }, options);
      }
      /**
       * Method used to animate the camera back to its default state.
       */
    }, {
      key: "reset",
      value: function reset(options) {
        return this.animate(DEFAULT_CAMERA_STATE, options);
      }
      /**
       * Drives the animation frame loop. Interrupts whatever was running first, so
       * a camera never has two animations competing for its state.
       */
    }, {
      key: "runAnimation",
      value: function runAnimation(state, options, callback) {
        var _this3 = this;
        var easing = resolveEasing(options.easing);
        var start = Date.now(), initialState = this.getState(), targetState = this.validateState(state);
        var _fn = function fn() {
          if (!_this3.enabled) {
            _this3.cancelAnimation();
            return;
          }
          var t = options.duration > 0 ? (Date.now() - start) / options.duration : 1;
          if (t >= 1) {
            _this3.nextFrame = null;
            _this3.setState(targetState);
            _this3.resolveAnimation();
            _this3.emitAnimationEnd(true);
            return;
          }
          var coefficient = easing(t);
          _this3.setState({
            x: initialState.x + (targetState.x - initialState.x) * coefficient,
            y: initialState.y + (targetState.y - initialState.y) * coefficient,
            angle: initialState.angle + (targetState.angle - initialState.angle) * coefficient,
            ratio: initialState.ratio + (targetState.ratio - initialState.ratio) * coefficient
          });
          _this3.nextFrame = requestAnimationFrame(_fn);
        };
        this.cancelAnimation();
        this.currentAnimationFrom = initialState;
        this.currentAnimationTo = targetState;
        this.animationCallback = callback;
        this.emit("animationStart", {
          from: initialState,
          to: targetState
        });
        _fn();
      }
      /** Settles the pending `animate` promise, exactly once per animation. */
    }, {
      key: "resolveAnimation",
      value: function resolveAnimation() {
        var callback = this.animationCallback;
        this.animationCallback = null;
        if (callback) callback();
      }
    }, {
      key: "emitAnimationEnd",
      value: function emitAnimationEnd(completed) {
        var from = this.currentAnimationFrom;
        var to = this.currentAnimationTo;
        if (!from || !to) return;
        this.currentAnimationFrom = null;
        this.currentAnimationTo = null;
        this.emit("animationEnd", {
          from,
          to,
          completed
        });
      }
    }], [{
      key: "from",
      value: function from(state) {
        var camera = new Camera2();
        return camera.setState(state);
      }
    }]);
  })(TypedEventEmitter);
  function getPosition(e, dom) {
    var bbox = dom.getBoundingClientRect();
    return {
      x: e.clientX - bbox.left,
      y: e.clientY - bbox.top
    };
  }
  function getMouseCoords(e, dom) {
    var res = _objectSpread2(_objectSpread2({}, getPosition(e, dom)), {}, {
      sigmaDefaultPrevented: false,
      preventSigmaDefault: function preventSigmaDefault() {
        res.sigmaDefaultPrevented = true;
      },
      original: e
    });
    return res;
  }
  function cleanMouseCoords(e) {
    var res = "x" in e ? e : _objectSpread2(_objectSpread2({}, e.touches[0] || e.previousTouches[0]), {}, {
      original: e.original,
      sigmaDefaultPrevented: e.sigmaDefaultPrevented,
      preventSigmaDefault: function preventSigmaDefault() {
        e.sigmaDefaultPrevented = true;
        res.sigmaDefaultPrevented = true;
      }
    });
    return res;
  }
  function getWheelCoords(e, dom) {
    var res = getMouseCoords(e, dom);
    res.delta = getWheelDelta(e);
    return res;
  }
  var MAX_TOUCHES = 2;
  function getTouchesArray(touches) {
    var arr = [];
    for (var i = 0, l = Math.min(touches.length, MAX_TOUCHES); i < l; i++) arr.push(touches[i]);
    return arr;
  }
  function getTouchCoords(e, previousTouches, dom) {
    var res = {
      touches: getTouchesArray(e.touches).map(function(touch) {
        return getPosition(touch, dom);
      }),
      previousTouches: previousTouches.map(function(touch) {
        return getPosition(touch, dom);
      }),
      sigmaDefaultPrevented: false,
      preventSigmaDefault: function preventSigmaDefault() {
        res.sigmaDefaultPrevented = true;
      },
      original: e
    };
    return res;
  }
  function getWheelDelta(e) {
    if (typeof e.deltaY !== "undefined") return e.deltaY * -3 / 360;
    if (typeof e.detail !== "undefined") return e.detail / -9;
    throw new Error("Captor: could not extract delta from event.");
  }
  var Captor = /* @__PURE__ */ (function(_TypedEventEmitter) {
    function Captor2(container, renderer) {
      var _this;
      _classCallCheck(this, Captor2);
      _this = _callSuper(this, Captor2);
      _this.container = container;
      _this.renderer = renderer;
      return _this;
    }
    _inherits(Captor2, _TypedEventEmitter);
    return _createClass(Captor2);
  })(TypedEventEmitter);
  var MOUSE_SETTINGS_KEYS = ["doubleClickTimeout", "doubleClickZoomingDuration", "doubleClickZoomingRatio", "dragTimeout", "draggedEventsTolerance", "enableCameraMouseRotation", "gestureTarget", "inertiaDuration", "inertiaRatio", "zoomDuration", "zoomingRatio"];
  var DEFAULT_MOUSE_SETTINGS = MOUSE_SETTINGS_KEYS.reduce(function(iter, key) {
    return _objectSpread2(_objectSpread2({}, iter), {}, _defineProperty({}, key, DEFAULT_SETTINGS[key]));
  }, {});
  function isTouchPointer(e) {
    return e instanceof PointerEvent && e.pointerType === "touch";
  }
  var MouseCaptor = /* @__PURE__ */ (function(_Captor) {
    function MouseCaptor2(container, renderer) {
      var _this;
      _classCallCheck(this, MouseCaptor2);
      _this = _callSuper(this, MouseCaptor2, [container, renderer]);
      _defineProperty(_this, "enabled", true);
      _defineProperty(_this, "draggedEvents", 0);
      _defineProperty(_this, "downStartTime", null);
      _defineProperty(_this, "lastMouseX", null);
      _defineProperty(_this, "lastMouseY", null);
      _defineProperty(_this, "isMouseDown", false);
      _defineProperty(_this, "isMoving", false);
      _defineProperty(_this, "isPanningStage", false);
      _defineProperty(_this, "movingTimeout", null);
      _defineProperty(_this, "startCameraState", null);
      _defineProperty(_this, "clicks", 0);
      _defineProperty(_this, "doubleClickTimeout", null);
      _defineProperty(_this, "isRightMouseDown", false);
      _defineProperty(_this, "startRotationAngle", null);
      _defineProperty(_this, "startCameraAngle", null);
      _defineProperty(_this, "currentWheelDirection", 0);
      _defineProperty(_this, "lastWheelAnimationId", 0);
      _defineProperty(_this, "settings", DEFAULT_MOUSE_SETTINGS);
      _this.handleRightClick = _this.handleRightClick.bind(_this);
      _this.handleDown = _this.handleDown.bind(_this);
      _this.handleUp = _this.handleUp.bind(_this);
      _this.handleMove = _this.handleMove.bind(_this);
      _this.handleWheel = _this.handleWheel.bind(_this);
      _this.handleLeave = _this.handleLeave.bind(_this);
      _this.handleEnter = _this.handleEnter.bind(_this);
      container.addEventListener("contextmenu", _this.handleRightClick, {
        capture: false
      });
      container.addEventListener("pointerdown", _this.handleDown, {
        capture: false
      });
      container.addEventListener("wheel", _this.handleWheel, {
        capture: false,
        passive: false
      });
      container.addEventListener("pointerleave", _this.handleLeave, {
        capture: false
      });
      container.addEventListener("pointerenter", _this.handleEnter, {
        capture: false
      });
      document.addEventListener("pointermove", _this.handleMove, {
        capture: false
      });
      document.addEventListener("pointerup", _this.handleUp, {
        capture: false
      });
      return _this;
    }
    _inherits(MouseCaptor2, _Captor);
    return _createClass(MouseCaptor2, [{
      key: "kill",
      value: function kill() {
        var container = this.container;
        container.removeEventListener("contextmenu", this.handleRightClick);
        container.removeEventListener("pointerdown", this.handleDown);
        container.removeEventListener("wheel", this.handleWheel);
        container.removeEventListener("pointerleave", this.handleLeave);
        container.removeEventListener("pointerenter", this.handleEnter);
        document.removeEventListener("pointermove", this.handleMove);
        document.removeEventListener("pointerup", this.handleUp);
      }
    }, {
      key: "handleClick",
      value: function handleClick(e) {
        var _this2 = this;
        if (!this.enabled) return;
        this.clicks++;
        if (this.clicks === 2) {
          this.clicks = 0;
          if (typeof this.doubleClickTimeout === "number") {
            clearTimeout(this.doubleClickTimeout);
            this.doubleClickTimeout = null;
          }
          return this.handleDoubleClick(e);
        }
        setTimeout(function() {
          _this2.clicks = 0;
          _this2.doubleClickTimeout = null;
        }, this.settings.doubleClickTimeout);
        if (this.draggedEvents < this.settings.draggedEventsTolerance) this.emit("click", getMouseCoords(e, this.container));
      }
    }, {
      key: "handleRightClick",
      value: function handleRightClick(e) {
        if (!this.enabled) return;
        if (this.settings.enableCameraMouseRotation) {
          e.preventDefault();
        }
        this.emit("rightClick", getMouseCoords(e, this.container));
      }
    }, {
      key: "handleDoubleClick",
      value: function handleDoubleClick(e) {
        if (!this.enabled) return;
        e.preventDefault();
        e.stopPropagation();
        var mouseCoords = getMouseCoords(e, this.container);
        this.emit("doubleClick", mouseCoords);
        if (mouseCoords.sigmaDefaultPrevented) return;
        var camera = this.renderer.getCamera();
        var newRatio = camera.getBoundedRatio(camera.getState().ratio / this.settings.doubleClickZoomingRatio);
        camera.animate(this.renderer.getViewportZoomedState(getPosition(e, this.container), newRatio), {
          easing: "quadraticInOut",
          duration: this.settings.doubleClickZoomingDuration
        });
      }
    }, {
      key: "handleDown",
      value: function handleDown(e) {
        if (!this.enabled || isTouchPointer(e)) return;
        if (e.button === 0) {
          this.startCameraState = this.renderer.getCamera().getState();
          var _getPosition = getPosition(e, this.container), x = _getPosition.x, y = _getPosition.y;
          this.lastMouseX = x;
          this.lastMouseY = y;
          this.draggedEvents = 0;
          this.downStartTime = Date.now();
          this.isMouseDown = true;
        }
        if (e.button === 2 && this.settings.enableCameraMouseRotation) {
          var _getPosition2 = getPosition(e, this.container), _x = _getPosition2.x, _y = _getPosition2.y;
          var centerX = this.container.offsetWidth / 2;
          var centerY = this.container.offsetHeight / 2;
          this.startRotationAngle = Math.atan2(_y - centerY, _x - centerX);
          this.startCameraAngle = this.renderer.getCamera().getState().angle;
          this.isRightMouseDown = true;
        }
        this.emit("mousedown", getMouseCoords(e, this.container));
      }
    }, {
      key: "handleUp",
      value: function handleUp(e) {
        var _this3 = this;
        if (!this.enabled || isTouchPointer(e) || !this.isMouseDown && !this.isRightMouseDown) return;
        if (this.isRightMouseDown) {
          this.isRightMouseDown = false;
          this.startRotationAngle = null;
          this.startCameraAngle = null;
          this.emit("mouseup", getMouseCoords(e, this.container));
          return;
        }
        var camera = this.renderer.getCamera();
        this.isMouseDown = false;
        if (this.isPanningStage) {
          this.isPanningStage = false;
          this.renderer._setPanning(false);
        }
        if (typeof this.movingTimeout === "number") {
          clearTimeout(this.movingTimeout);
          this.movingTimeout = null;
        }
        var _getPosition3 = getPosition(e, this.container), x = _getPosition3.x, y = _getPosition3.y;
        var cameraState = camera.getState(), previousCameraState = camera.getPreviousState();
        if (this.isMoving) {
          camera.animate({
            x: cameraState.x + this.settings.inertiaRatio * (cameraState.x - previousCameraState.x),
            y: cameraState.y + this.settings.inertiaRatio * (cameraState.y - previousCameraState.y)
          }, {
            duration: this.settings.inertiaDuration,
            easing: "quadraticOut"
          });
        } else if (this.lastMouseX !== x || this.lastMouseY !== y) {
          camera.setState({
            x: cameraState.x,
            y: cameraState.y
          });
        }
        this.isMoving = false;
        setTimeout(function() {
          var shouldRefresh = _this3.draggedEvents > 0;
          _this3.draggedEvents = 0;
          var shouldRestoreDeferredRendering = _this3.renderer.getSetting("hideEdgesOnMove") || _this3.renderer.getSetting("hideLabelsOnMove");
          if (shouldRefresh && shouldRestoreDeferredRendering) _this3.renderer.refresh();
        }, 0);
        this.emit("mouseup", getMouseCoords(e, this.container));
        if (e.target === this.container || e.composedPath()[0] === this.container) this.handleClick(e);
      }
    }, {
      key: "handleMove",
      value: function handleMove(e) {
        var _this4 = this;
        if (!this.enabled || isTouchPointer(e)) return;
        var mouseCoords = getMouseCoords(e, this.container);
        this.emit("mousemovebody", mouseCoords);
        if (e.target === this.container || e.composedPath()[0] === this.container) {
          this.emit("mousemove", mouseCoords);
        }
        if (this.isMouseDown) {
          this.draggedEvents++;
        }
        if (mouseCoords.sigmaDefaultPrevented) return;
        if (this.isMouseDown) {
          this.isMoving = true;
          if (typeof this.movingTimeout === "number") {
            clearTimeout(this.movingTimeout);
          }
          this.movingTimeout = window.setTimeout(function() {
            _this4.movingTimeout = null;
            _this4.isMoving = false;
          }, this.settings.dragTimeout);
          var camera = this.renderer.getCamera();
          var _getPosition4 = getPosition(e, this.container), eX = _getPosition4.x, eY = _getPosition4.y;
          var lastMouse = this.renderer.viewportToFramedGraph({
            x: this.lastMouseX,
            y: this.lastMouseY
          });
          var mouse = this.renderer.viewportToFramedGraph({
            x: eX,
            y: eY
          });
          var offsetX = lastMouse.x - mouse.x, offsetY = lastMouse.y - mouse.y;
          var cameraState = camera.getState();
          var x = cameraState.x + offsetX, y = cameraState.y + offsetY;
          if (!this.isPanningStage) {
            this.isPanningStage = true;
            this.renderer._setPanning(true);
          }
          camera.setState({
            x,
            y
          });
          this.lastMouseX = eX;
          this.lastMouseY = eY;
          e.preventDefault();
          e.stopPropagation();
        }
        if (this.isRightMouseDown) {
          var _getPosition5 = getPosition(e, this.container), _eX = _getPosition5.x, _eY = _getPosition5.y;
          var centerX = this.container.offsetWidth / 2;
          var centerY = this.container.offsetHeight / 2;
          var currentAngle = Math.atan2(_eY - centerY, _eX - centerX);
          var angleDiff = currentAngle - this.startRotationAngle;
          var _camera = this.renderer.getCamera();
          _camera.setState({
            angle: this.startCameraAngle + angleDiff
          });
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, {
      key: "handleLeave",
      value: function handleLeave(e) {
        if (isTouchPointer(e)) return;
        this.emit("mouseleave", getMouseCoords(e, this.container));
      }
    }, {
      key: "handleEnter",
      value: function handleEnter(e) {
        if (isTouchPointer(e)) return;
        this.emit("mouseenter", getMouseCoords(e, this.container));
      }
    }, {
      key: "handleWheel",
      value: function handleWheel(e) {
        var _this5 = this;
        var camera = this.renderer.getCamera();
        if (!this.enabled || !camera.enabledZooming) return;
        var wheelCoords = getWheelCoords(e, this.container);
        this.emit("wheel", wheelCoords);
        if (wheelCoords.sigmaDefaultPrevented) return;
        var gestureTarget = this.settings.gestureTarget;
        if (gestureTarget === "page") return;
        if (gestureTarget === "shared" && !e.ctrlKey && !e.metaKey) {
          this.renderer._showGestureHint("wheel");
          return;
        }
        var delta = getWheelDelta(e);
        if (!delta) return;
        e.preventDefault();
        e.stopPropagation();
        var currentRatio = camera.getState().ratio;
        var ratioDiff = delta > 0 ? 1 / this.settings.zoomingRatio : this.settings.zoomingRatio;
        var newRatio = camera.getBoundedRatio(currentRatio * ratioDiff);
        var wheelDirection = delta > 0 ? 1 : -1;
        var now = Date.now();
        if (currentRatio === newRatio) return;
        if (this.currentWheelDirection === wheelDirection && this.lastWheelTriggerTime && now - this.lastWheelTriggerTime < this.settings.zoomDuration / 5) {
          return;
        }
        var animationId = ++this.lastWheelAnimationId;
        camera.animate(this.renderer.getViewportZoomedState(getPosition(e, this.container), newRatio), {
          easing: "quadraticOut",
          duration: this.settings.zoomDuration
        }).then(function() {
          if (_this5.lastWheelAnimationId === animationId) _this5.currentWheelDirection = 0;
        });
        this.currentWheelDirection = wheelDirection;
        this.lastWheelTriggerTime = now;
      }
    }, {
      key: "setSettings",
      value: function setSettings(settings) {
        this.settings = settings;
      }
    }]);
  })(Captor);
  var TOUCH_SETTINGS_KEYS = ["dragTimeout", "gestureTarget", "inertiaDuration", "inertiaRatio", "doubleClickTimeout", "doubleClickZoomingRatio", "doubleClickZoomingDuration", "tapMoveTolerance"];
  var DEFAULT_TOUCH_SETTINGS = TOUCH_SETTINGS_KEYS.reduce(function(iter, key) {
    return _objectSpread2(_objectSpread2({}, iter), {}, _defineProperty({}, key, DEFAULT_SETTINGS[key]));
  }, {});
  var TouchCaptor = /* @__PURE__ */ (function(_Captor) {
    function TouchCaptor2(container, renderer) {
      var _this;
      _classCallCheck(this, TouchCaptor2);
      _this = _callSuper(this, TouchCaptor2, [container, renderer]);
      _defineProperty(_this, "enabled", true);
      _defineProperty(_this, "isMoving", false);
      _defineProperty(_this, "hasMoved", false);
      _defineProperty(_this, "isPanningStage", false);
      _defineProperty(_this, "isZoomingStage", false);
      _defineProperty(_this, "touchMode", 0);
      _defineProperty(_this, "startTouchesPositions", []);
      _defineProperty(_this, "lastTouches", []);
      _defineProperty(_this, "lastTap", null);
      _defineProperty(_this, "settings", DEFAULT_TOUCH_SETTINGS);
      _this.handleStart = _this.handleStart.bind(_this);
      _this.handleLeave = _this.handleLeave.bind(_this);
      _this.handleMove = _this.handleMove.bind(_this);
      container.addEventListener("touchstart", _this.handleStart, {
        capture: false
      });
      container.addEventListener("touchcancel", _this.handleLeave, {
        capture: false
      });
      document.addEventListener("touchend", _this.handleLeave, {
        capture: false,
        passive: false
      });
      document.addEventListener("touchmove", _this.handleMove, {
        capture: false,
        passive: false
      });
      return _this;
    }
    _inherits(TouchCaptor2, _Captor);
    return _createClass(TouchCaptor2, [{
      key: "kill",
      value: function kill() {
        var container = this.container;
        container.removeEventListener("touchstart", this.handleStart);
        container.removeEventListener("touchcancel", this.handleLeave);
        document.removeEventListener("touchend", this.handleLeave);
        document.removeEventListener("touchmove", this.handleMove);
      }
    }, {
      key: "getDimensions",
      value: function getDimensions() {
        return {
          width: this.container.offsetWidth,
          height: this.container.offsetHeight
        };
      }
      // Returns true when the event is captured by the graph in practice, and
      // false else.
    }, {
      key: "doesCapture",
      value: function doesCapture(touchCount) {
        var gestureTarget = this.settings.gestureTarget;
        if (gestureTarget === "graph") return true;
        if (gestureTarget === "page") return false;
        return touchCount >= 2;
      }
      // Syncs isPanning/isZooming graph-state flags from the current gesture.
      // Pinch (touchMode === 2) is a zoom gesture; single-finger drag with actual
      // movement is a pan. Anything else clears both.
    }, {
      key: "syncStageFlags",
      value: function syncStageFlags() {
        var shouldPan = this.touchMode === 1 && this.hasMoved;
        var shouldZoom = this.touchMode === 2;
        if (shouldPan !== this.isPanningStage) {
          this.isPanningStage = shouldPan;
          this.renderer._setPanning(shouldPan);
        }
        if (shouldZoom !== this.isZoomingStage) {
          this.isZoomingStage = shouldZoom;
          this.renderer._setZooming(shouldZoom);
        }
      }
    }, {
      key: "handleStart",
      value: function handleStart(e) {
        var _this2 = this;
        if (!this.enabled) return;
        var touches = getTouchesArray(e.touches);
        this.touchMode = touches.length;
        this.startCameraState = this.renderer.getCamera().getState();
        this.startTouchesPositions = touches.map(function(touch) {
          return getPosition(touch, _this2.container);
        });
        if (this.touchMode === 2) {
          var _this$startTouchesPos = _slicedToArray(this.startTouchesPositions, 2), _this$startTouchesPos2 = _this$startTouchesPos[0], x0 = _this$startTouchesPos2.x, y0 = _this$startTouchesPos2.y, _this$startTouchesPos3 = _this$startTouchesPos[1], x1 = _this$startTouchesPos3.x, y1 = _this$startTouchesPos3.y;
          this.startTouchesAngle = Math.atan2(y1 - y0, x1 - x0);
          this.startTouchesDistance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        }
        this.syncStageFlags();
        this.emit("touchdown", getTouchCoords(e, this.lastTouches, this.container));
        this.lastTouches = touches;
        this.lastTouchesPositions = this.startTouchesPositions;
        if (e.cancelable && (this.doesCapture(e.touches.length) || this.renderer._hasNodeDrag())) e.preventDefault();
      }
    }, {
      key: "handleLeave",
      value: function handleLeave(e) {
        if (!this.enabled || !this.startTouchesPositions.length) return;
        if (e.cancelable && this.doesCapture(this.touchMode)) e.preventDefault();
        if (this.movingTimeout) {
          this.isMoving = false;
          clearTimeout(this.movingTimeout);
        }
        switch (this.touchMode) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          case 2:
            if (e.touches.length === 1) {
              this.handleStart(e);
              break;
            }
          /* falls through */
          case 1:
            if (this.isMoving) {
              var camera = this.renderer.getCamera();
              var cameraState = camera.getState(), previousCameraState = camera.getPreviousState();
              camera.animate({
                x: cameraState.x + this.settings.inertiaRatio * (cameraState.x - previousCameraState.x),
                y: cameraState.y + this.settings.inertiaRatio * (cameraState.y - previousCameraState.y)
              }, {
                duration: this.settings.inertiaDuration,
                easing: "quadraticOut"
              });
            }
            this.hasMoved = false;
            this.isMoving = false;
            this.touchMode = 0;
            break;
        }
        this.syncStageFlags();
        this.emit("touchup", getTouchCoords(e, this.lastTouches, this.container));
        if (!e.touches.length) {
          var position = getPosition(this.lastTouches[0], this.container);
          var downPosition = this.startTouchesPositions[0];
          var dSquare = Math.pow(position.x - downPosition.x, 2) + Math.pow(position.y - downPosition.y, 2);
          if (!e.touches.length && dSquare < Math.pow(this.settings.tapMoveTolerance, 2)) {
            if (this.lastTap && Date.now() - this.lastTap.time < this.settings.doubleClickTimeout) {
              var touchCoords = getTouchCoords(e, this.lastTouches, this.container);
              this.emit("doubletap", touchCoords);
              this.lastTap = null;
              if (!touchCoords.sigmaDefaultPrevented && this.settings.gestureTarget !== "page") {
                var _camera = this.renderer.getCamera();
                var newRatio = _camera.getBoundedRatio(_camera.getState().ratio / this.settings.doubleClickZoomingRatio);
                _camera.animate(this.renderer.getViewportZoomedState(position, newRatio), {
                  easing: "quadraticInOut",
                  duration: this.settings.doubleClickZoomingDuration
                });
              }
            } else {
              var _touchCoords = getTouchCoords(e, this.lastTouches, this.container);
              this.emit("tap", _touchCoords);
              this.lastTap = {
                time: Date.now(),
                position: _touchCoords.touches[0] || _touchCoords.previousTouches[0]
              };
            }
          }
        }
        this.lastTouches = getTouchesArray(e.touches);
        this.startTouchesPositions = [];
      }
    }, {
      key: "handleMove",
      value: function handleMove(e) {
        var _this3 = this;
        if (!this.enabled || !this.startTouchesPositions.length) return;
        var captured = this.doesCapture(e.touches.length);
        if (captured) e.preventDefault();
        var touches = getTouchesArray(e.touches);
        var touchesPositions = touches.map(function(touch) {
          return getPosition(touch, _this3.container);
        });
        var lastTouches = this.lastTouches;
        this.lastTouches = touches;
        this.lastTouchesPositions = touchesPositions;
        var touchCoords = getTouchCoords(e, lastTouches, this.container);
        this.emit("touchmove", touchCoords);
        if (touchCoords.sigmaDefaultPrevented) return;
        this.hasMoved || (this.hasMoved = touchesPositions.some(function(position, idx) {
          var startPosition = _this3.startTouchesPositions[idx];
          return startPosition && (position.x !== startPosition.x || position.y !== startPosition.y);
        }));
        if (!this.hasMoved) {
          return;
        }
        if (!captured) {
          if (this.settings.gestureTarget === "shared") this.renderer._showGestureHint("touch");
          return;
        }
        this.isMoving = true;
        this.syncStageFlags();
        if (this.movingTimeout) clearTimeout(this.movingTimeout);
        this.movingTimeout = window.setTimeout(function() {
          _this3.isMoving = false;
        }, this.settings.dragTimeout);
        var camera = this.renderer.getCamera();
        var startCameraState = this.startCameraState;
        var padding = this.renderer.getSetting("stagePadding");
        switch (this.touchMode) {
          case 1: {
            var _this$renderer$viewpo = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), xStart = _this$renderer$viewpo.x, yStart = _this$renderer$viewpo.y;
            var _this$renderer$viewpo2 = this.renderer.viewportToFramedGraph(touchesPositions[0]), x = _this$renderer$viewpo2.x, y = _this$renderer$viewpo2.y;
            camera.setState({
              x: startCameraState.x + xStart - x,
              y: startCameraState.y + yStart - y
            });
            break;
          }
          case 2: {
            var newCameraState = {
              x: 0.5,
              y: 0.5,
              angle: 0,
              ratio: 1
            };
            var _touchesPositions$ = touchesPositions[0], x0 = _touchesPositions$.x, y0 = _touchesPositions$.y;
            var _touchesPositions$2 = touchesPositions[1], x1 = _touchesPositions$2.x, y1 = _touchesPositions$2.y;
            var angleDiff = Math.atan2(y1 - y0, x1 - x0) - this.startTouchesAngle;
            var ratioDiff = Math.hypot(y1 - y0, x1 - x0) / this.startTouchesDistance;
            var newRatio = camera.getBoundedRatio(startCameraState.ratio / ratioDiff);
            newCameraState.ratio = newRatio;
            newCameraState.angle = startCameraState.angle + angleDiff;
            var dimensions = this.getDimensions();
            var touchGraphPosition = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], {
              cameraState: startCameraState
            });
            var smallestDimension = Math.min(dimensions.width, dimensions.height) - 2 * padding;
            var dx = smallestDimension / dimensions.width;
            var dy = smallestDimension / dimensions.height;
            var ratio = newRatio / smallestDimension;
            var _x = x0 - smallestDimension / 2 / dx;
            var _y = y0 - smallestDimension / 2 / dy;
            var _rotateVec = rotateVec2({
              x: _x,
              y: _y
            }, newCameraState.angle);
            _x = _rotateVec.x;
            _y = _rotateVec.y;
            newCameraState.x = touchGraphPosition.x - _x * ratio;
            newCameraState.y = touchGraphPosition.y + _y * ratio;
            camera.setState(newCameraState);
            break;
          }
        }
      }
    }, {
      key: "setSettings",
      value: function setSettings(settings) {
        this.settings = settings;
      }
    }]);
  })(Captor);
  var DragManager = /* @__PURE__ */ (function() {
    function DragManager2(graph, viewportToGraph, setNodesState, emit) {
      _classCallCheck(this, DragManager2);
      _defineProperty(this, "pendingNode", null);
      _defineProperty(this, "session", null);
      this.graph = graph;
      this.viewportToGraph = viewportToGraph;
      this.setNodesState = setNodesState;
      this.emit = emit;
    }
    return _createClass(DragManager2, [{
      key: "start",
      value: function start(node, event, getDraggedNodes2, xAttr, yAttr) {
        var allNodes = getDraggedNodes2(node);
        var cancelled = false;
        this.emit("nodeDragStart", {
          node,
          allDraggedNodes: allNodes,
          event,
          preventSigmaDefault: function preventSigmaDefault() {
            cancelled = true;
          }
        });
        if (cancelled) return false;
        var startNodePositions = /* @__PURE__ */ new Map();
        var _iterator = _createForOfIteratorHelper(allNodes), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var n = _step.value;
            startNodePositions.set(n, {
              x: this.graph.getNodeAttribute(n, xAttr),
              y: this.graph.getNodeAttribute(n, yAttr)
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.session = {
          node,
          allNodes,
          startPosition: this.viewportToGraph(event),
          startNodePositions,
          xAttr,
          yAttr
        };
        this.setNodesState(allNodes, {
          isDragged: true
        });
        return true;
      }
      /**
       * Apply the current pointer position to all dragged nodes.
       */
    }, {
      key: "applyMove",
      value: function applyMove(event, dragPositionToAttributes) {
        var _ref = this.session, allNodes = _ref.allNodes, startNodePositions = _ref.startNodePositions, startPosition = _ref.startPosition, xAttr = _ref.xAttr, yAttr = _ref.yAttr;
        var currentPosition = this.viewportToGraph(event);
        var totalDelta = {
          x: currentPosition.x - startPosition.x,
          y: currentPosition.y - startPosition.y
        };
        var _iterator2 = _createForOfIteratorHelper(allNodes), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var n = _step2.value;
            var startPos = startNodePositions.get(n);
            if (!startPos || !this.graph.hasNode(n)) continue;
            var newPosition = {
              x: startPos.x + totalDelta.x,
              y: startPos.y + totalDelta.y
            };
            if (dragPositionToAttributes) {
              this.graph.mergeNodeAttributes(n, dragPositionToAttributes(newPosition, n));
            } else {
              this.graph.setNodeAttribute(n, xAttr, newPosition.x);
              this.graph.setNodeAttribute(n, yAttr, newPosition.y);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      /**
       * End the current drag session. Returns the session info for the nodeDragEnd event,
       * or null if there was no active session.
       */
    }, {
      key: "end",
      value: function end() {
        this.pendingNode = null;
        if (!this.session) return null;
        var _this$session = this.session, node = _this$session.node, allNodes = _this$session.allNodes;
        this.setNodesState(allNodes, {
          isDragged: false
        });
        this.session = null;
        return {
          node,
          allNodes
        };
      }
      /**
       * Called when a node is removed from the graph. Ends the session if the removed
       * node is the primary dragged node, or removes it from the drag group otherwise.
       */
    }, {
      key: "removeNode",
      value: function removeNode(key) {
        if (key === this.pendingNode) this.pendingNode = null;
        if (!this.session) return;
        if (this.session.node === key) {
          this.setNodesState(this.session.allNodes, {
            isDragged: false
          });
          this.session = null;
        } else if (this.session.allNodes.includes(key)) {
          this.session.allNodes = this.session.allNodes.filter(function(n) {
            return n !== key;
          });
          this.session.startNodePositions["delete"](key);
        }
      }
      /**
       * Reset all drag state. Called on graph clear.
       */
    }, {
      key: "clear",
      value: function clear() {
        this.pendingNode = null;
        this.session = null;
      }
    }]);
  })();
  function groupKey(source, target) {
    return source < target ? "".concat(source, "\0").concat(target) : "".concat(target, "\0").concat(source);
  }
  var EdgeGroupIndex = /* @__PURE__ */ (function() {
    function EdgeGroupIndex2(graph, onGroupChanged) {
      _classCallCheck(this, EdgeGroupIndex2);
      _defineProperty(this, "groups", /* @__PURE__ */ new Map());
      _defineProperty(this, "edgeToGroupKey", /* @__PURE__ */ new Map());
      this.graph = graph;
      this.onGroupChanged = onGroupChanged;
    }
    return _createClass(EdgeGroupIndex2, [{
      key: "getGroupKey",
      value: function getGroupKey(edge) {
        return groupKey(this.graph.source(edge), this.graph.target(edge));
      }
      // Canonical-source edges sort before reverse-direction ones.
    }, {
      key: "sortGroup",
      value: function sortGroup(group, groupKey2) {
        var _this = this;
        var canonicalSource = groupKey2.split("\0")[0];
        group.sort(function(a, b) {
          var aForward = _this.graph.source(a) === canonicalSource || !_this.graph.isDirected(a) ? 0 : 1;
          var bForward = _this.graph.source(b) === canonicalSource || !_this.graph.isDirected(b) ? 0 : 1;
          return aForward - bForward;
        });
      }
    }, {
      key: "register",
      value: function register(edge) {
        var groupKey2 = this.getGroupKey(edge);
        var group = this.groups.get(groupKey2);
        if (!group) {
          group = [];
          this.groups.set(groupKey2, group);
        }
        if (!group.includes(edge)) group.push(edge);
        this.edgeToGroupKey.set(edge, groupKey2);
        if (group.length > 1) this.sortGroup(group, groupKey2);
        this.onGroupChanged(group, group.length);
      }
    }, {
      key: "unregister",
      value: function unregister(edge) {
        var groupKey2 = this.edgeToGroupKey.get(edge);
        if (!groupKey2) return;
        this.edgeToGroupKey["delete"](edge);
        var group = this.groups.get(groupKey2);
        if (!group) return;
        var idx = group.indexOf(edge);
        if (idx !== -1) group.splice(idx, 1);
        if (group.length === 0) {
          this.groups["delete"](groupKey2);
        } else {
          this.onGroupChanged(group, group.length);
        }
      }
    }, {
      key: "getGroup",
      value: function getGroup(edge) {
        var _this$groups$get;
        var groupKey2 = this.edgeToGroupKey.get(edge);
        if (!groupKey2) return [];
        return (_this$groups$get = this.groups.get(groupKey2)) !== null && _this$groups$get !== void 0 ? _this$groups$get : [];
      }
    }, {
      key: "getSiblings",
      value: function getSiblings(edge) {
        return this.getGroup(edge).filter(function(e) {
          return e !== edge;
        });
      }
    }, {
      key: "rebuild",
      value: function rebuild() {
        var _this2 = this;
        this.groups.clear();
        this.edgeToGroupKey.clear();
        this.graph.forEachEdge(function(edge, _attributes, source, target) {
          var key2 = groupKey(source, target);
          var group2 = _this2.groups.get(key2);
          if (!group2) {
            group2 = [];
            _this2.groups.set(key2, group2);
          }
          group2.push(edge);
          _this2.edgeToGroupKey.set(edge, key2);
        });
        var _iterator = _createForOfIteratorHelper(this.groups), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], group = _step$value[1];
            if (group.length > 1) this.sortGroup(group, key);
            this.onGroupChanged(group, group.length);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.groups.clear();
        this.edgeToGroupKey.clear();
      }
    }]);
  })();
  function resolveLabelMode(setting, interaction) {
    var _setting$default;
    if (setting === false || setting === "extend" || setting === "separate") return setting;
    var explicit = setting[interaction];
    if (explicit !== void 0) return explicit;
    return (_setting$default = setting["default"]) !== null && _setting$default !== void 0 ? _setting$default : false;
  }
  function hasAnyEnabled(setting) {
    if (setting === false) return false;
    if (setting === "extend" || setting === "separate") return true;
    return Object.values(setting).some(function(s) {
      return s === "extend" || s === "separate";
    });
  }
  function hasAnySeparate(setting) {
    if (setting === "separate") return true;
    if (setting === false || setting === "extend") return false;
    if (setting["default"] === "separate") return true;
    return Object.values(setting).includes("separate");
  }
  var KIND_REGISTRY = {
    node: {
      parent: null,
      eventSuffix: "Node",
      payloadKey: "node",
      isEnabled: function isEnabled() {
        return true;
      },
      writesPickingThisFrame: function writesPickingThisFrame() {
        return true;
      },
      setHover: function setHover(i, k, on) {
        return i.setNodeState(k, {
          isHovered: on
        });
      },
      getCursor: function getCursor(i, k) {
        var _i$nodeDataCache$k;
        return (_i$nodeDataCache$k = i.nodeDataCache[k]) === null || _i$nodeDataCache$k === void 0 ? void 0 : _i$nodeDataCache$k.cursor;
      },
      isHitValid: function isHitValid(i, k) {
        var _i$nodeDataCache$k2;
        return ((_i$nodeDataCache$k2 = i.nodeDataCache[k]) === null || _i$nodeDataCache$k2 === void 0 ? void 0 : _i$nodeDataCache$k2.visibility) !== "hidden";
      }
    },
    edge: {
      parent: null,
      eventSuffix: "Edge",
      payloadKey: "edge",
      isEnabled: function isEnabled2(internals) {
        return !!internals.settings.enableEdgeEvents;
      },
      writesPickingThisFrame: function writesPickingThisFrame2(internals) {
        return !!internals.settings.enableEdgeEvents;
      },
      setHover: function setHover2(internals, k, on) {
        return internals.setEdgeState(k, {
          isHovered: on
        });
      },
      getCursor: function getCursor2(internals, k) {
        var _internals$edgeDataCa;
        return (_internals$edgeDataCa = internals.edgeDataCache[k]) === null || _internals$edgeDataCa === void 0 ? void 0 : _internals$edgeDataCa.cursor;
      }
    },
    nodeLabel: {
      parent: "node",
      eventSuffix: "NodeLabel",
      payloadKey: "node",
      isEnabled: function isEnabled3(internals) {
        return hasAnySeparate(internals.settings.nodeLabelEvents);
      },
      writesPickingThisFrame: function writesPickingThisFrame3(internals) {
        return hasAnyEnabled(internals.settings.nodeLabelEvents);
      },
      setHover: function setHover3(internals, k, on) {
        return internals.setNodeState(k, {
          isLabelHovered: on
        });
      },
      getCursor: function getCursor3(internals, k) {
        var _internals$nodeDataCa;
        return (_internals$nodeDataCa = internals.nodeDataCache[k]) === null || _internals$nodeDataCa === void 0 ? void 0 : _internals$nodeDataCa.labelCursor;
      },
      resolveForVerb: function resolveForVerb(hit, verb, internals) {
        var mode = resolveLabelMode(internals.settings.nodeLabelEvents, verb);
        if (mode === false) return null;
        if (mode === "extend") return {
          kind: "node",
          key: hit.key
        };
        return hit;
      }
    },
    edgeLabel: {
      parent: "edge",
      eventSuffix: "EdgeLabel",
      payloadKey: "edge",
      isEnabled: function isEnabled4(internals) {
        return hasAnySeparate(internals.settings.edgeLabelEvents);
      },
      writesPickingThisFrame: function writesPickingThisFrame4(internals) {
        return hasAnyEnabled(internals.settings.edgeLabelEvents);
      },
      setHover: function setHover4(internals, k, on) {
        return internals.setEdgeState(k, {
          isLabelHovered: on
        });
      },
      getCursor: function getCursor4(internals, k) {
        var _internals$edgeDataCa2;
        return (_internals$edgeDataCa2 = internals.edgeDataCache[k]) === null || _internals$edgeDataCa2 === void 0 ? void 0 : _internals$edgeDataCa2.labelCursor;
      },
      resolveForVerb: function resolveForVerb2(hit, verb, internals) {
        var mode = resolveLabelMode(internals.settings.edgeLabelEvents, verb);
        if (mode === false) return null;
        if (mode === "extend") return {
          kind: "edge",
          key: hit.key
        };
        return hit;
      }
    }
  };
  var KIND_NAMES = ["node", "edge", "nodeLabel", "edgeLabel"];
  function createPickingState() {
    return {
      lookup: [null],
      idsByKind: {
        node: /* @__PURE__ */ new Map(),
        edge: /* @__PURE__ */ new Map(),
        nodeLabel: /* @__PURE__ */ new Map(),
        edgeLabel: /* @__PURE__ */ new Map()
      },
      nextId: 1
    };
  }
  function pickingIdOf(state, kind, key) {
    var _state$idsByKind$kind;
    return (_state$idsByKind$kind = state.idsByKind[kind].get(key)) !== null && _state$idsByKind$kind !== void 0 ? _state$idsByKind$kind : 0;
  }
  function resetKind(state, kind) {
    var _iterator = _createForOfIteratorHelper(KIND_NAMES), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var k = _step.value;
        if (k === kind || KIND_REGISTRY[k].parent === kind) {
          var _iterator3 = _createForOfIteratorHelper(state.idsByKind[k].values()), _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var id = _step3.value;
              state.lookup[id] = null;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
          state.idsByKind[k] = /* @__PURE__ */ new Map();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var start = 1;
    var _iterator2 = _createForOfIteratorHelper(KIND_NAMES), _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var _k = _step2.value;
        if (_k === kind) break;
        start += state.idsByKind[_k].size;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    state.nextId = start;
  }
  function registerItem(state, kind, key) {
    var id = state.nextId++;
    state.idsByKind[kind].set(key, id);
    state.lookup[id] = {
      kind,
      key
    };
    return id;
  }
  function unregisterItem(state, kind, key) {
    for (var _i = 0, _kindsDependingOn = kindsDependingOn(kind); _i < _kindsDependingOn.length; _i++) {
      var k = _kindsDependingOn[_i];
      var id = state.idsByKind[k].get(key);
      if (id === void 0) continue;
      state.lookup[id] = null;
      state.idsByKind[k]["delete"](key);
    }
  }
  function allocateLabelIds(state, i) {
    var _iterator4 = _createForOfIteratorHelper(KIND_NAMES), _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
        var name = _step4.value;
        if (KIND_REGISTRY[name].parent === null) continue;
        var _iterator7 = _createForOfIteratorHelper(state.idsByKind[name].values()), _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
            var id = _step7.value;
            state.lookup[id] = null;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        state.idsByKind[name] = /* @__PURE__ */ new Map();
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    state.nextId = 1;
    var _iterator5 = _createForOfIteratorHelper(KIND_NAMES), _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
        var _name = _step5.value;
        if (KIND_REGISTRY[_name].parent !== null) continue;
        var _iterator8 = _createForOfIteratorHelper(state.idsByKind[_name].values()), _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
            var _id = _step8.value;
            if (_id >= state.nextId) state.nextId = _id + 1;
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    var _iterator6 = _createForOfIteratorHelper(KIND_NAMES), _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var _name2 = _step6.value;
        var entry = KIND_REGISTRY[_name2];
        if (entry.parent === null || !entry.isEnabled(i)) continue;
        var _iterator9 = _createForOfIteratorHelper(state.idsByKind[entry.parent].keys()), _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
            var parentKey = _step9.value;
            state.idsByKind[_name2].set(parentKey, state.nextId);
            state.lookup[state.nextId] = {
              kind: _name2,
              key: parentKey
            };
            state.nextId++;
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
  }
  function samePickingAllocation(a, b) {
    var _iterator0 = _createForOfIteratorHelper(KIND_NAMES), _step0;
    try {
      for (_iterator0.s(); !(_step0 = _iterator0.n()).done; ) {
        var kind = _step0.value;
        var mapA = a[kind];
        var mapB = b[kind];
        if (mapA === mapB) continue;
        if (mapA.size !== mapB.size) return false;
        var _iterator1 = _createForOfIteratorHelper(mapA), _step1;
        try {
          for (_iterator1.s(); !(_step1 = _iterator1.n()).done; ) {
            var _step1$value = _slicedToArray(_step1.value, 2), _key = _step1$value[0], id = _step1$value[1];
            if (mapB.get(_key) !== id) return false;
          }
        } catch (err) {
          _iterator1.e(err);
        } finally {
          _iterator1.f();
        }
      }
    } catch (err) {
      _iterator0.e(err);
    } finally {
      _iterator0.f();
    }
    return true;
  }
  function setHover5(i, hit, on) {
    KIND_REGISTRY[hit.kind].setHover(i, hit.key, on);
  }
  function getCursor5(i, hit) {
    return KIND_REGISTRY[hit.kind].getCursor(i, hit.key);
  }
  function eventName(kind, verb) {
    return "".concat(verb).concat(KIND_REGISTRY[kind].eventSuffix);
  }
  function eventPayload(hit, base) {
    return _objectSpread2(_objectSpread2({}, base), {}, _defineProperty({}, KIND_REGISTRY[hit.kind].payloadKey, hit.key));
  }
  function resolveForVerb3(i, hit, verb) {
    var resolver = KIND_REGISTRY[hit.kind].resolveForVerb;
    return resolver ? resolver(hit, verb, i) : hit;
  }
  function isHitValid2(i, hit) {
    var check = KIND_REGISTRY[hit.kind].isHitValid;
    return check ? check(i, hit.key) : true;
  }
  function kindsDependingOn(target) {
    return KIND_NAMES.filter(function(n) {
      return n === target || KIND_REGISTRY[n].parent === target;
    });
  }
  function routeHit(i, hit, verb) {
    if (hit) hit = resolveForVerb3(i, hit, verb);
    if (hit && !isHitValid2(i, hit)) hit = null;
    return hit;
  }
  function resolveEventHit(i, event, verb) {
    var hit = verb === "wheel" ? i.stateManager.hovered : i.getHitAtPosition(event);
    return routeHit(i, hit, verb);
  }
  function sameHit(a, b) {
    if (!a || !b) return a === b;
    return a.kind === b.kind && a.key === b.key;
  }
  function updateHover(i, rawHit, event) {
    var baseEvent = {
      event,
      preventSigmaDefault: function preventSigmaDefault() {
        return event.preventSigmaDefault();
      }
    };
    var session = i.dragManager.session;
    var hit = session ? {
      kind: "node",
      key: session.node
    } : routeHit(i, rawHit, "enter");
    var stateManager = i.stateManager;
    var prev = stateManager.hovered;
    if (sameHit(prev, hit)) return;
    if (prev) {
      setHover5(i, prev, false);
      i.emit(eventName(prev.kind, "leave"), eventPayload(prev, baseEvent));
    }
    stateManager.setHovered(hit);
    if (hit) {
      setHover5(i, hit, true);
      i.emit(eventName(hit.kind, "enter"), eventPayload(hit, baseEvent));
    }
    i.updateContainerCursor();
  }
  function bindInteractionHandlers(internals, mouseCaptor, touchCaptor, activeListeners) {
    activeListeners.handleResize = function() {
      return internals.scheduleRefresh();
    };
    window.addEventListener("resize", activeListeners.handleResize);
    activeListeners.handleMove = function(e) {
      internals.hoverResolver.pointerMoved(cleanMouseCoords(e));
    };
    activeListeners.handleMoveBody = function(e) {
      var event = cleanMouseCoords(e);
      var dragManager = internals.dragManager;
      if (dragManager.pendingNode && !dragManager.session) {
        var _internals$nodeStyleA = internals.nodeStyleAnalysis, xAttribute = _internals$nodeStyleA.xAttribute, yAttribute = _internals$nodeStyleA.yAttribute;
        var settings = internals.settings;
        dragManager.start(dragManager.pendingNode, event, settings.getDraggedNodes, xAttribute || "x", yAttribute || "y");
        dragManager.pendingNode = null;
      }
      if (dragManager.session) {
        dragManager.applyMove(event, internals.settings.dragPositionToAttributes);
        internals.emit("nodeDrag", {
          node: dragManager.session.node,
          allDraggedNodes: dragManager.session.allNodes,
          event
        });
        event.preventSigmaDefault();
      }
      internals.emit("moveBody", {
        event,
        preventSigmaDefault: function preventSigmaDefault() {
          return event.preventSigmaDefault();
        }
      });
    };
    activeListeners.handleLeave = function(e) {
      var event = cleanMouseCoords(e);
      var baseEvent = {
        event,
        preventSigmaDefault: function preventSigmaDefault() {
          return event.preventSigmaDefault();
        }
      };
      internals.hoverResolver.pointerLeft();
      updateHover(internals, null, event);
      internals.emit("leaveStage", baseEvent);
    };
    activeListeners.handleEnter = function(e) {
      var event = cleanMouseCoords(e);
      internals.emit("enterStage", {
        event,
        preventSigmaDefault: function preventSigmaDefault() {
          return event.preventSigmaDefault();
        }
      });
    };
    var createInteractionListener = function createInteractionListener2(verb) {
      return function(e) {
        var event = cleanMouseCoords(e);
        var baseEvent = {
          event,
          preventSigmaDefault: function preventSigmaDefault() {
            return event.preventSigmaDefault();
          }
        };
        var hit = resolveEventHit(internals, event, verb);
        if (hit) {
          internals.emit(eventName(hit.kind, verb), eventPayload(hit, baseEvent));
          return;
        }
        internals.emit("".concat(verb, "Stage"), baseEvent);
      };
    };
    activeListeners.handleClick = createInteractionListener("click");
    activeListeners.handleRightClick = createInteractionListener("rightClick");
    activeListeners.handleDoubleClick = createInteractionListener("doubleClick");
    activeListeners.handleWheel = createInteractionListener("wheel");
    activeListeners.handleDown = function(e) {
      var event = cleanMouseCoords(e);
      var baseEvent = {
        event,
        preventSigmaDefault: function preventSigmaDefault() {
          return event.preventSigmaDefault();
        }
      };
      var hit = resolveEventHit(internals, event, "down");
      if (hit) {
        if (hit.kind === "node" && internals.settings.enableNodeDrag) {
          internals.dragManager.pendingNode = hit.key;
        }
        internals.emit(eventName(hit.kind, "down"), eventPayload(hit, baseEvent));
        return;
      }
      internals.emit("downStage", baseEvent);
    };
    activeListeners.handleUp = function(e) {
      var event = cleanMouseCoords(e);
      var baseEvent = {
        event,
        preventSigmaDefault: function preventSigmaDefault() {
          return event.preventSigmaDefault();
        }
      };
      var dragResult = internals.dragManager.end();
      if (dragResult) {
        internals.emit("nodeDragEnd", _objectSpread2({
          node: dragResult.node,
          allDraggedNodes: dragResult.allNodes
        }, baseEvent));
      }
      var hit = resolveEventHit(internals, event, "up");
      if (hit) {
        internals.emit(eventName(hit.kind, "up"), eventPayload(hit, baseEvent));
        return;
      }
      internals.emit("upStage", baseEvent);
    };
    mouseCaptor.on("mousemove", activeListeners.handleMove);
    mouseCaptor.on("mousemovebody", activeListeners.handleMoveBody);
    mouseCaptor.on("click", activeListeners.handleClick);
    mouseCaptor.on("rightClick", activeListeners.handleRightClick);
    mouseCaptor.on("doubleClick", activeListeners.handleDoubleClick);
    mouseCaptor.on("wheel", activeListeners.handleWheel);
    mouseCaptor.on("mousedown", activeListeners.handleDown);
    mouseCaptor.on("mouseup", activeListeners.handleUp);
    mouseCaptor.on("mouseleave", activeListeners.handleLeave);
    mouseCaptor.on("mouseenter", activeListeners.handleEnter);
    touchCaptor.on("touchdown", activeListeners.handleDown);
    touchCaptor.on("touchdown", activeListeners.handleMove);
    touchCaptor.on("touchup", activeListeners.handleUp);
    touchCaptor.on("touchmove", activeListeners.handleMove);
    touchCaptor.on("tap", activeListeners.handleClick);
    touchCaptor.on("doubletap", activeListeners.handleDoubleClick);
    touchCaptor.on("touchmove", activeListeners.handleMoveBody);
  }
  function bindGraphHandlers(ctx, activeListeners) {
    var graph = ctx.graph;
    var LAYOUT_IMPACTING_FIELDS = /* @__PURE__ */ new Set(["x", "y", "zIndex", "type"]);
    activeListeners.eachNodeAttributesUpdatedGraphUpdate = function(e) {
      var _e$hints;
      var updatedFields = (_e$hints = e.hints) === null || _e$hints === void 0 ? void 0 : _e$hints.attributes;
      var layoutChanged = !updatedFields || updatedFields.some(function(f) {
        return LAYOUT_IMPACTING_FIELDS.has(f);
      });
      ctx.refresh({
        partialGraph: {
          nodes: graph.nodes()
        },
        skipIndexation: !layoutChanged,
        schedule: true
      });
    };
    activeListeners.eachEdgeAttributesUpdatedGraphUpdate = function(e) {
      var _e$hints2;
      var updatedFields = (_e$hints2 = e.hints) === null || _e$hints2 === void 0 ? void 0 : _e$hints2.attributes;
      var layoutChanged = updatedFields && ["zIndex", "type"].some(function(f) {
        return updatedFields === null || updatedFields === void 0 ? void 0 : updatedFields.includes(f);
      });
      ctx.refresh({
        partialGraph: {
          edges: graph.edges()
        },
        skipIndexation: !layoutChanged,
        schedule: true
      });
    };
    activeListeners.addNodeGraphUpdate = function(payload) {
      ctx.refresh({
        partialGraph: {
          nodes: [payload.key]
        },
        skipIndexation: false,
        schedule: true
      });
    };
    activeListeners.updateNodeGraphUpdate = function(payload) {
      ctx.refresh({
        partialGraph: {
          nodes: [payload.key]
        },
        skipIndexation: false,
        schedule: true
      });
    };
    activeListeners.dropNodeGraphUpdate = function(payload) {
      ctx.removeNode(payload.key);
      ctx.scheduleProcess();
    };
    activeListeners.addEdgeGraphUpdate = function(payload) {
      var edge = payload.key;
      ctx.markNodesDirty([payload.source, payload.target]);
      ctx.edgeGroups.register(edge);
      var siblings = ctx.edgeGroups.getSiblings(edge);
      ctx.refresh({
        partialGraph: {
          edges: [edge].concat(_toConsumableArray(siblings))
        },
        schedule: true
      });
    };
    activeListeners.updateEdgeGraphUpdate = function(payload) {
      ctx.refresh({
        partialGraph: {
          edges: [payload.key]
        },
        skipIndexation: false,
        schedule: true
      });
    };
    activeListeners.dropEdgeGraphUpdate = function(payload) {
      var edge = payload.key;
      ctx.markNodesDirty([payload.source, payload.target]);
      var siblings = ctx.edgeGroups.getSiblings(edge);
      ctx.edgeGroups.unregister(edge);
      ctx.removeEdge(edge);
      var _iterator = _createForOfIteratorHelper(siblings), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var sib = _step.value;
          ctx.addEdge(sib);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      ctx.scheduleProcess();
    };
    activeListeners.clearEdgesGraphUpdate = function() {
      ctx.clearEdgeState();
      ctx.clearEdgeIndices();
      ctx.refresh({
        schedule: true
      });
    };
    activeListeners.clearGraphUpdate = function() {
      ctx.clearEdgeState();
      ctx.clearNodeState();
      ctx.clearEdgeIndices();
      ctx.clearNodeIndices();
      ctx.refresh({
        schedule: true
      });
    };
    graph.on("nodeAdded", activeListeners.addNodeGraphUpdate);
    graph.on("nodeDropped", activeListeners.dropNodeGraphUpdate);
    graph.on("nodeAttributesUpdated", activeListeners.updateNodeGraphUpdate);
    graph.on("eachNodeAttributesUpdated", activeListeners.eachNodeAttributesUpdatedGraphUpdate);
    graph.on("edgeAdded", activeListeners.addEdgeGraphUpdate);
    graph.on("edgeDropped", activeListeners.dropEdgeGraphUpdate);
    graph.on("edgeAttributesUpdated", activeListeners.updateEdgeGraphUpdate);
    graph.on("eachEdgeAttributesUpdated", activeListeners.eachEdgeAttributesUpdatedGraphUpdate);
    graph.on("edgesCleared", activeListeners.clearEdgesGraphUpdate);
    graph.on("cleared", activeListeners.clearGraphUpdate);
  }
  function unbindGraphHandlers(graph, activeListeners) {
    graph.removeListener("nodeAdded", activeListeners.addNodeGraphUpdate);
    graph.removeListener("nodeDropped", activeListeners.dropNodeGraphUpdate);
    graph.removeListener("nodeAttributesUpdated", activeListeners.updateNodeGraphUpdate);
    graph.removeListener("eachNodeAttributesUpdated", activeListeners.eachNodeAttributesUpdatedGraphUpdate);
    graph.removeListener("edgeAdded", activeListeners.addEdgeGraphUpdate);
    graph.removeListener("edgeDropped", activeListeners.dropEdgeGraphUpdate);
    graph.removeListener("edgeAttributesUpdated", activeListeners.updateEdgeGraphUpdate);
    graph.removeListener("eachEdgeAttributesUpdated", activeListeners.eachEdgeAttributesUpdatedGraphUpdate);
    graph.removeListener("edgesCleared", activeListeners.clearEdgesGraphUpdate);
    graph.removeListener("cleared", activeListeners.clearGraphUpdate);
  }
  var NULL_CAMERA_STATE = {
    x: 0.5,
    y: 0.5,
    angle: 0,
    ratio: 1
  };
  var MAX_ITERATIONS = 8;
  var CONVERGENCE_RATIO = 1e-3;
  function computeFittedExtent(input) {
    var coords = input.coords, nodeData = input.nodeData, dimensions = input.dimensions, stagePadding = input.stagePadding, zoomToSizeRatioFunction = input.zoomToSizeRatioFunction, itemSizesReference = input.itemSizesReference, fitLabels = input.fitLabels, nodeLabelBox = input.nodeLabelBox;
    var keys = Object.keys(coords);
    if (!keys.length) return input.extent;
    var zoomAtDefault = zoomToSizeRatioFunction(1) || 1;
    var sizeInPositions = itemSizesReference === "positions";
    var width = dimensions.width, height = dimensions.height;
    var extent = input.extent;
    for (var iter = 0; iter < MAX_ITERATIONS; iter++) {
      var normalize = createNormalizationFunction(extent);
      var graphDimensions = {
        width: extent.x[1] - extent.x[0] || 1,
        height: extent.y[1] - extent.y[0] || 1
      };
      var matrix = matrixFromCamera(NULL_CAMERA_STATE, dimensions, graphDimensions, stagePadding);
      var o = framedGraphToViewport(matrix, normalize({
        x: 0,
        y: 0
      }), width, height);
      var u = framedGraphToViewport(matrix, normalize({
        x: 1,
        y: 0
      }), width, height);
      var pixelsPerUnit = Math.hypot(u.x - o.x, u.y - o.y) || 1;
      var xMin = Infinity;
      var xMax = -Infinity;
      var yMin = Infinity;
      var yMax = -Infinity;
      for (var i = 0, l = keys.length; i < l; i++) {
        var node = keys[i];
        var data = nodeData[node];
        var radius = data.size / zoomAtDefault * (sizeInPositions ? pixelsPerUnit : 1);
        var minX = -radius;
        var maxX = radius;
        var minY = -radius;
        var maxY = radius;
        if (fitLabels) {
          var box = nodeLabelBox(data, radius);
          if (box) {
            if (box.minX < minX) minX = box.minX;
            if (box.maxX > maxX) maxX = box.maxX;
            if (box.minY < minY) minY = box.minY;
            if (box.maxY > maxY) maxY = box.maxY;
          }
        }
        var _coords$node = coords[node], x = _coords$node.x, y = _coords$node.y;
        xMin = Math.min(xMin, x + minX / pixelsPerUnit);
        xMax = Math.max(xMax, x + maxX / pixelsPerUnit);
        yMin = Math.min(yMin, y - maxY / pixelsPerUnit);
        yMax = Math.max(yMax, y - minY / pixelsPerUnit);
      }
      var next = {
        x: [xMin, xMax],
        y: [yMin, yMax]
      };
      var span = Math.max(next.x[1] - next.x[0], next.y[1] - next.y[0]) || 1;
      var delta = Math.max(Math.abs(next.x[0] - extent.x[0]), Math.abs(next.x[1] - extent.x[1]), Math.abs(next.y[0] - extent.y[0]), Math.abs(next.y[1] - extent.y[1]));
      extent = next;
      if (delta / span < CONVERGENCE_RATIO) break;
    }
    return extent;
  }
  function framedGraphToViewport(matrix, coords, width, height) {
    var v = multiplyVec2(matrix, coords);
    return {
      x: (1 + v.x) * width / 2,
      y: (1 - v.y) * height / 2
    };
  }
  var IS_APPLE_PLATFORM = typeof navigator !== "undefined" && /Mac|iP(hone|ad|od)/.test(navigator.platform);
  var HIDE_DELAY = 1500;
  var RULES = (
    /*css*/
    ".sigma-gesture-hint {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: 1em;\n  background: #00000066;\n  color: #ffffff;\n  font-size: 1em;\n  pointer-events: none;\n  transition: opacity 0.1s;\n}"
  );
  function cssRuleParses(rule) {
    var _style$sheet$cssRules, _style$sheet;
    var style = createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);
    var parses = ((_style$sheet$cssRules = (_style$sheet = style.sheet) === null || _style$sheet === void 0 ? void 0 : _style$sheet.cssRules.length) !== null && _style$sheet$cssRules !== void 0 ? _style$sheet$cssRules : 0) > 0;
    style.remove();
    return parses;
  }
  var stylesCache = null;
  function getStyles() {
    if (stylesCache === null) {
      stylesCache = RULES;
      if (cssRuleParses("@scope {}")) stylesCache = "@scope {\n".concat(stylesCache, "\n}");
      if (cssRuleParses("@layer sigma-gesture-hint {}")) stylesCache = "@layer sigma-gesture-hint {\n".concat(stylesCache, "\n}");
    }
    return stylesCache;
  }
  var GestureHint = /* @__PURE__ */ (function() {
    function GestureHint2(container) {
      _classCallCheck(this, GestureHint2);
      _defineProperty(this, "hideTimeout", null);
      this.styleElement = createElement("style");
      this.styleElement.textContent = getStyles();
      container.appendChild(this.styleElement);
      this.element = createElement("div", {
        opacity: "0"
      }, {
        "class": "sigma-gesture-hint"
      });
      container.appendChild(this.element);
    }
    return _createClass(GestureHint2, [{
      key: "show",
      value: function show(gesture, messages) {
        var _this = this;
        var message = gesture === "touch" ? messages.sharedGestureTouchMessage : IS_APPLE_PLATFORM ? messages.sharedGestureAppleWheelMessage : messages.sharedGestureWheelMessage;
        if (!message) return;
        this.element.textContent = message;
        this.element.style.opacity = "1";
        if (typeof this.hideTimeout === "number") clearTimeout(this.hideTimeout);
        this.hideTimeout = window.setTimeout(function() {
          _this.hideTimeout = null;
          _this.element.style.opacity = "0";
        }, HIDE_DELAY);
      }
    }, {
      key: "kill",
      value: function kill() {
        if (typeof this.hideTimeout === "number") clearTimeout(this.hideTimeout);
        this.styleElement.remove();
        this.element.remove();
      }
    }]);
  })();
  var HoverResolver = /* @__PURE__ */ (function() {
    function HoverResolver2(options) {
      _classCallCheck(this, HoverResolver2);
      _defineProperty(this, "readBuffer", null);
      _defineProperty(this, "fence", null);
      _defineProperty(this, "result", new Uint8Array(4));
      _defineProperty(this, "generation", 0);
      _defineProperty(this, "readGeneration", 0);
      _defineProperty(this, "lastEvent", null);
      _defineProperty(this, "active", false);
      _defineProperty(this, "dirty", false);
      _defineProperty(this, "rafId", null);
      _defineProperty(this, "killed", false);
      this.options = options;
    }
    return _createClass(HoverResolver2, [{
      key: "pointerMoved",
      value: function pointerMoved(event) {
        this.lastEvent = event;
        this.active = true;
        if (this.options.isRenderPending()) return;
        this.request();
      }
      /** The pointer left the stage: stop resolving until it comes back. */
    }, {
      key: "pointerLeft",
      value: function pointerLeft() {
        this.active = false;
        this.dirty = false;
      }
      /** A frame was rendered: the picking buffer changed, re-resolve. */
    }, {
      key: "frameRendered",
      value: function frameRendered() {
        this.request();
      }
      /** Picking IDs were reallocated: in-flight reads are meaningless. */
    }, {
      key: "invalidate",
      value: function invalidate() {
        this.generation++;
      }
    }, {
      key: "request",
      value: function request() {
        if (this.killed || !this.active || !this.lastEvent) return;
        if (this.fence) {
          this.dirty = true;
          return;
        }
        this.startRead();
      }
    }, {
      key: "startRead",
      value: function startRead() {
        var _this$options = this.options, gl = _this$options.gl, getFrameBuffer = _this$options.getFrameBuffer, getPixelRatio2 = _this$options.getPixelRatio, getDownSizingRatio = _this$options.getDownSizingRatio;
        this.readGeneration = this.generation;
        var event = this.lastEvent;
        var _pickingPixelCoords = pickingPixelCoords(gl, event.x, event.y, getPixelRatio2(), getDownSizingRatio()), _pickingPixelCoords2 = _slicedToArray(_pickingPixelCoords, 2), bufferX = _pickingPixelCoords2[0], bufferY = _pickingPixelCoords2[1];
        if (!this.readBuffer) this.readBuffer = gl.createBuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, getFrameBuffer());
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.readBuffer);
        gl.bufferData(gl.PIXEL_PACK_BUFFER, 4, gl.STREAM_READ);
        gl.readPixels(bufferX, bufferY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, 0);
        gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        this.schedulePoll(event);
      }
    }, {
      key: "schedulePoll",
      value: function schedulePoll(event) {
        var _this = this;
        this.rafId = requestAnimationFrame(function() {
          _this.rafId = null;
          _this.poll(event);
        });
      }
    }, {
      key: "poll",
      value: function poll(event) {
        var _this$options2 = this.options, gl = _this$options2.gl, onIndex = _this$options2.onIndex;
        if (this.killed || !this.fence) return;
        var status = gl.clientWaitSync(this.fence, 0, 0);
        if (status === gl.TIMEOUT_EXPIRED) {
          this.schedulePoll(event);
          return;
        }
        gl.deleteSync(this.fence);
        this.fence = null;
        if (status !== gl.WAIT_FAILED && this.readGeneration === this.generation) {
          gl.bindBuffer(gl.PIXEL_PACK_BUFFER, this.readBuffer);
          gl.getBufferSubData(gl.PIXEL_PACK_BUFFER, 0, this.result);
          gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null);
          var _this$result = _slicedToArray(this.result, 4), r = _this$result[0], g = _this$result[1], b = _this$result[2], a = _this$result[3];
          if (this.active) onIndex(colorToIndex(r, g, b, a), event);
        }
        if (this.dirty) {
          this.dirty = false;
          if (this.active && this.lastEvent && !this.options.isRenderPending()) this.startRead();
        }
      }
      /** Drops in-flight reads and dead GL objects after a context loss. */
    }, {
      key: "reset",
      value: function reset() {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = null;
        this.fence = null;
        this.readBuffer = null;
        this.dirty = false;
      }
    }, {
      key: "kill",
      value: function kill() {
        this.killed = true;
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.rafId = null;
        var gl = this.options.gl;
        if (this.fence) gl.deleteSync(this.fence);
        this.fence = null;
        if (this.readBuffer) gl.deleteBuffer(this.readBuffer);
        this.readBuffer = null;
      }
    }]);
  })();
  var LabelCandidate = /* @__PURE__ */ (function() {
    function LabelCandidate2(key, size) {
      _classCallCheck(this, LabelCandidate2);
      this.key = key;
      this.size = size;
    }
    return _createClass(LabelCandidate2, null, [{
      key: "compare",
      value: function compare(first, second) {
        if (first.size > second.size) return -1;
        if (first.size < second.size) return 1;
        if (first.key > second.key) return 1;
        return -1;
      }
    }]);
  })();
  var LabelGrid = /* @__PURE__ */ (function() {
    function LabelGrid2() {
      _classCallCheck(this, LabelGrid2);
      _defineProperty(this, "width", 0);
      _defineProperty(this, "height", 0);
      _defineProperty(this, "cellSize", 0);
      _defineProperty(this, "columns", 0);
      _defineProperty(this, "rows", 0);
      _defineProperty(this, "cells", {});
    }
    return _createClass(LabelGrid2, [{
      key: "resizeAndClear",
      value: function resizeAndClear(dimensions, cellSize) {
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.cellSize = cellSize;
        this.columns = Math.ceil(dimensions.width / cellSize);
        this.rows = Math.ceil(dimensions.height / cellSize);
        this.cells = {};
      }
    }, {
      key: "getIndex",
      value: function getIndex(pos) {
        var xIndex = Math.floor(pos.x / this.cellSize);
        var yIndex = Math.floor(pos.y / this.cellSize);
        return yIndex * this.columns + xIndex;
      }
    }, {
      key: "add",
      value: function add(key, size, pos) {
        var candidate = new LabelCandidate(key, size);
        var index = this.getIndex(pos);
        var cell = this.cells[index];
        if (!cell) {
          cell = [];
          this.cells[index] = cell;
        }
        cell.push(candidate);
      }
    }, {
      key: "organize",
      value: function organize() {
        for (var k in this.cells) {
          var cell = this.cells[k];
          cell.sort(LabelCandidate.compare);
        }
      }
      /**
       * Get labels to display based on density and optional viewport culling.
       *
       * @param ratio - Camera zoom ratio
       * @param density - Label density setting
       * @param viewport - Optional viewport bounds in grid coordinates (null camera space).
       *                   If provided, only cells intersecting this viewport are queried.
       */
    }, {
      key: "getLabelsToDisplay",
      value: function getLabelsToDisplay(ratio, density, viewport) {
        var cellArea = this.cellSize * this.cellSize;
        var scaledCellArea = cellArea / ratio / ratio;
        var scaledDensity = scaledCellArea * density / cellArea;
        var labelsToDisplayPerCell = Math.ceil(scaledDensity);
        var labels = [];
        if (viewport) {
          var minCol = Math.max(0, Math.floor(viewport.x1 / this.cellSize));
          var maxCol = Math.min(this.columns - 1, Math.floor(viewport.x2 / this.cellSize));
          var minRow = Math.max(0, Math.floor(viewport.y1 / this.cellSize));
          var maxRow = Math.min(this.rows - 1, Math.floor(viewport.y2 / this.cellSize));
          for (var row = minRow; row <= maxRow; row++) {
            for (var col = minCol; col <= maxCol; col++) {
              var index = row * this.columns + col;
              var cell = this.cells[index];
              if (!cell) continue;
              for (var i = 0; i < Math.min(labelsToDisplayPerCell, cell.length); i++) {
                labels.push(cell[i].key);
              }
            }
          }
        } else {
          for (var k in this.cells) {
            var _cell = this.cells[k];
            for (var _i = 0; _i < Math.min(labelsToDisplayPerCell, _cell.length); _i++) {
              labels.push(_cell[_i].key);
            }
          }
        }
        return labels;
      }
    }]);
  })();
  function edgeLabelsToDisplayFromNodes(params) {
    var graph = params.graph, hoveredNode = params.hoveredNode, highlightedNodes = params.highlightedNodes, displayedNodeLabels = params.displayedNodeLabels;
    var relevantEdges = /* @__PURE__ */ new Set();
    var fullyWorthyNodes = new Set(highlightedNodes);
    if (hoveredNode) fullyWorthyNodes.add(hoveredNode);
    var _iterator = _createForOfIteratorHelper(fullyWorthyNodes), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var node = _step.value;
        if (!graph.hasNode(node)) continue;
        graph.forEachEdge(node, function(edge) {
          relevantEdges.add(edge);
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var _iterator2 = _createForOfIteratorHelper(displayedNodeLabels), _step2;
    try {
      var _loop = function _loop2() {
        var node2 = _step2.value;
        if (fullyWorthyNodes.has(node2)) return 1;
        graph.forEachEdge(node2, function(edge, _, source, target) {
          var other = source === node2 ? target : source;
          if (displayedNodeLabels.has(other)) relevantEdges.add(edge);
        });
      };
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        if (_loop()) continue;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return Array.from(relevantEdges);
  }
  var X_LABEL_MARGIN = 150;
  var Y_LABEL_MARGIN = 50;
  var BACKDROP_AREA_MAP = {
    both: 0,
    node: 1,
    label: 2
  };
  var EDGE_POSITION_MODE_MAP = {
    over: 0,
    above: 1,
    below: 2,
    auto: 3
  };
  var DEFAULT_EDGE_LABEL_SIZE = 12;
  var DEFAULT_EDGE_LABEL_PADDING = 3;
  var LabelRenderer = /* @__PURE__ */ (function() {
    function LabelRenderer2(internals) {
      _classCallCheck(this, LabelRenderer2);
      _defineProperty(this, "labelGrid", new LabelGrid());
      _defineProperty(this, "edgeAnchorGrid", new LabelGrid());
      _defineProperty(this, "displayedNodeLabels", /* @__PURE__ */ new Set());
      _defineProperty(this, "displayedEdgeLabels", /* @__PURE__ */ new Set());
      _defineProperty(this, "edgeLabelCandidates", []);
      _defineProperty(this, "renderedNodeLabels", /* @__PURE__ */ new Set());
      _defineProperty(this, "labelSizeCache", /* @__PURE__ */ new Map());
      _defineProperty(this, "framePassPoints", new Float32Array(0));
      _defineProperty(this, "labelsDirty", true);
      this.internals = internals;
    }
    return _createClass(LabelRenderer2, [{
      key: "resetFrame",
      value: function resetFrame() {
        this.displayedNodeLabels = /* @__PURE__ */ new Set();
        this.renderedNodeLabels = /* @__PURE__ */ new Set();
        this.labelSizeCache.clear();
      }
      /** Reset edge label set (called from clearEdgeState). */
    }, {
      key: "clearEdgeLabels",
      value: function clearEdgeLabels() {
        this.displayedEdgeLabels = /* @__PURE__ */ new Set();
      }
      /** Reset the label grids (called from clearNodeIndices). */
    }, {
      key: "resetLabelGrid",
      value: function resetLabelGrid() {
        this.labelGrid = new LabelGrid();
        this.edgeAnchorGrid = new LabelGrid();
      }
      /**
       * Pre-generate glyphs for all node labels.
       * Actual label rendering happens per-frame in renderWebGLLabels.
       */
    }, {
      key: "processWebGLLabels",
      value: function processWebGLLabels(nodes) {
        var _primitives$nodes;
        var _this$internals = this.internals, labelProgram = _this$internals.labelProgram, primitives = _this$internals.primitives, nodeDataCache = _this$internals.nodeDataCache;
        var defaultLabelFont = (primitives === null || primitives === void 0 || (_primitives$nodes = primitives.nodes) === null || _primitives$nodes === void 0 || (_primitives$nodes = _primitives$nodes.label) === null || _primitives$nodes === void 0 || (_primitives$nodes = _primitives$nodes.font) === null || _primitives$nodes === void 0 ? void 0 : _primitives$nodes.family) || "sans-serif";
        var textsByFont = /* @__PURE__ */ new Map();
        for (var i = 0, l = nodes.length; i < l; i++) {
          var node = nodes[i];
          var data = nodeDataCache[node];
          if (data.visibility === "hidden" || !data.label) continue;
          var fontString = data.labelFont || defaultLabelFont;
          var existing = textsByFont.get(fontString);
          if (existing) {
            existing.push(data.label);
          } else {
            textsByFont.set(fontString, [data.label]);
          }
        }
        var _iterator = _createForOfIteratorHelper(textsByFont), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), _fontString = _step$value[0], texts = _step$value[1];
            var _parseFontString = parseFontString(_fontString), family = _parseFontString.family, weight = _parseFontString.weight, style = _parseFontString.style;
            var fontKey = labelProgram.registerFont(family, weight, style);
            labelProgram.ensureGlyphsReady(texts, fontKey);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }, {
      key: "measureNodeLabel",
      value: function measureNodeLabel(data) {
        var _data$labelSize, _primitives$nodes2;
        if (!data.label) return {
          width: 0,
          height: 0,
          textHeight: 0
        };
        var _this$internals2 = this.internals, labelProgram = _this$internals2.labelProgram, primitives = _this$internals2.primitives;
        var labelSize = (_data$labelSize = data.labelSize) !== null && _data$labelSize !== void 0 ? _data$labelSize : 14;
        var fontString = data.labelFont || (primitives === null || primitives === void 0 || (_primitives$nodes2 = primitives.nodes) === null || _primitives$nodes2 === void 0 || (_primitives$nodes2 = _primitives$nodes2.label) === null || _primitives$nodes2 === void 0 || (_primitives$nodes2 = _primitives$nodes2.font) === null || _primitives$nodes2 === void 0 ? void 0 : _primitives$nodes2.family) || "sans-serif";
        var cacheKey = "".concat(data.label, "|").concat(labelSize, "|").concat(fontString);
        if (this.labelSizeCache.has(cacheKey)) return this.labelSizeCache.get(cacheKey);
        var _parseFontString2 = parseFontString(fontString), family = _parseFontString2.family, weight = _parseFontString2.weight, style = _parseFontString2.style;
        var fontKey = labelProgram.registerFont(family, weight, style);
        var result = labelProgram.measureLabel(data.label, labelSize, fontKey);
        this.labelSizeCache.set(cacheKey, result);
        return result;
      }
      /**
       * Axis-aligned bounding box of a node's label in viewport pixels, relative
       * to the node center (y points down). Mirrors the label vertex shader's
       * placement (position, margin, angle) and the symmetric
       * `labelBackgroundPadding` when a background is drawn.
       * It ignores backdrops/shadows, approximates the node shape as a disc, and
       * returns null when the node has no visible label.
       */
    }, {
      key: "nodeLabelBox",
      value: function nodeLabelBox(data, nodeRadius) {
        var _this$internals$primi, _this$internals$primi2, _data$labelBackground, _data$labelPosition, _data$labelAngle;
        if (data.visibility === "hidden" || data.labelVisibility === "hidden") return null;
        var _this$measureNodeLabe = this.measureNodeLabel(data), width = _this$measureNodeLabe.width, height = _this$measureNodeLabe.height, textHeight = _this$measureNodeLabe.textHeight;
        if (!width) return null;
        var margin = (_this$internals$primi = (_this$internals$primi2 = this.internals.primitives) === null || _this$internals$primi2 === void 0 || (_this$internals$primi2 = _this$internals$primi2.nodes) === null || _this$internals$primi2 === void 0 || (_this$internals$primi2 = _this$internals$primi2.label) === null || _this$internals$primi2 === void 0 ? void 0 : _this$internals$primi2.margin) !== null && _this$internals$primi !== void 0 ? _this$internals$primi : DEFAULT_LABEL_MARGIN;
        var start = nodeRadius + margin;
        var pad = data.labelBackgroundColor ? (_data$labelBackground = data.labelBackgroundPadding) !== null && _data$labelBackground !== void 0 ? _data$labelBackground : DEFAULT_LABEL_BACKGROUND_PADDING : 0;
        var thw = width / 2;
        var thh = height / 2;
        var hw = thw + pad;
        var hh = thh + pad;
        var thy = textHeight / 2;
        var cx = 0;
        var cy = 0;
        switch ((_data$labelPosition = data.labelPosition) !== null && _data$labelPosition !== void 0 ? _data$labelPosition : "right") {
          case "left":
            cx = -(start + thw);
            break;
          case "above":
            cy = -(start + thy);
            break;
          case "below":
            cy = start + thy;
            break;
          case "over":
            break;
          default:
            cx = start + thw;
        }
        var angle = (_data$labelAngle = data.labelAngle) !== null && _data$labelAngle !== void 0 ? _data$labelAngle : 0;
        var _rotateVec = rotateVec2({
          x: cx,
          y: cy
        }, angle), rcx = _rotateVec.x, rcy = _rotateVec.y;
        var ax = Math.abs(Math.cos(angle));
        var ay = Math.abs(Math.sin(angle));
        var ex = ax * hw + ay * hh;
        var ey = ay * hw + ax * hh;
        return {
          minX: rcx - ex,
          maxX: rcx + ex,
          minY: rcy - ey,
          maxY: rcy + ey
        };
      }
      /**
       * Determine which node labels will be displayed this frame.
       * Must be called before renderWebGLLabels, renderBackdrops, and cacheAttachments.
       */
    }, {
      key: "computeDisplayedNodeLabels",
      value: function computeDisplayedNodeLabels() {
        var cameraState = this.internals.getCameraState();
        var _this$internals$getDi = this.internals.getDimensions(), width = _this$internals$getDi.width, height = _this$internals$getDi.height;
        var topLeft = this.internals.viewportToFramedGraph({
          x: -X_LABEL_MARGIN,
          y: -Y_LABEL_MARGIN
        });
        var topRight = this.internals.viewportToFramedGraph({
          x: width + X_LABEL_MARGIN,
          y: -Y_LABEL_MARGIN
        });
        var bottomLeft = this.internals.viewportToFramedGraph({
          x: -X_LABEL_MARGIN,
          y: height + Y_LABEL_MARGIN
        });
        var bottomRight = this.internals.viewportToFramedGraph({
          x: width + X_LABEL_MARGIN,
          y: height + Y_LABEL_MARGIN
        });
        var graphMinX = Math.min(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var graphMaxX = Math.max(topLeft.x, topRight.x, bottomLeft.x, bottomRight.x);
        var graphMinY = Math.min(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        var graphMaxY = Math.max(topLeft.y, topRight.y, bottomLeft.y, bottomRight.y);
        var nullCameraMatrix = matrixFromCamera({
          x: 0.5,
          y: 0.5,
          ratio: 1,
          angle: 0
        }, {
          width,
          height
        }, this.internals.getGraphDimensions(), this.internals.getStagePadding());
        var toNullCameraViewport = function toNullCameraViewport2(framedGraphPos) {
          var viewportPos = multiplyVec2(nullCameraMatrix, framedGraphPos);
          return {
            x: (1 + viewportPos.x) * width / 2,
            y: (1 - viewportPos.y) * height / 2
          };
        };
        var nc1 = toNullCameraViewport({
          x: graphMinX,
          y: graphMinY
        });
        var nc2 = toNullCameraViewport({
          x: graphMaxX,
          y: graphMinY
        });
        var nc3 = toNullCameraViewport({
          x: graphMinX,
          y: graphMaxY
        });
        var nc4 = toNullCameraViewport({
          x: graphMaxX,
          y: graphMaxY
        });
        var gridViewport = {
          x1: Math.min(nc1.x, nc2.x, nc3.x, nc4.x),
          y1: Math.min(nc1.y, nc2.y, nc3.y, nc4.y),
          x2: Math.max(nc1.x, nc2.x, nc3.x, nc4.x),
          y2: Math.max(nc1.y, nc2.y, nc3.y, nc4.y)
        };
        var _this$internals3 = this.internals, settings = _this$internals3.settings, nodeDataCache = _this$internals3.nodeDataCache, nodesWithForcedLabels = _this$internals3.nodesWithForcedLabels;
        var labelsToDisplay = this.labelGrid.getLabelsToDisplay(cameraState.ratio, settings.labelDensity, gridViewport);
        extend(labelsToDisplay, nodesWithForcedLabels);
        for (var i = 0, l = labelsToDisplay.length; i < l; i++) {
          var node = labelsToDisplay[i];
          var data = nodeDataCache[node];
          if (this.displayedNodeLabels.has(node)) continue;
          if (data.visibility === "hidden" || data.labelVisibility === "hidden") continue;
          if (!data.label) continue;
          if (data.x < graphMinX || data.x > graphMaxX || data.y < graphMinY || data.y > graphMaxY) continue;
          var _this$internals$frame = this.internals.framedGraphToViewport(data), x = _this$internals$frame.x, y = _this$internals$frame.y;
          var size = this.internals.scaleSize(data.size);
          if (!hasForcedLabel(data) && size < settings.labelRenderedSizeThreshold) continue;
          if (x < -X_LABEL_MARGIN - size || x > width + X_LABEL_MARGIN + size || y < -Y_LABEL_MARGIN - size || y > height + Y_LABEL_MARGIN + size) continue;
          this.displayedNodeLabels.add(node);
        }
      }
      /**
       * Builds the interleaved point buffer the frame-pass scatters over: one
       * `[nodeIndex, positionMode, labelAngle]` triple per displayed label. Run in
       * the pre-pass after computeDisplayedNodeLabels. The frame-pass uses these
       * to compute each label's edge distance; consumers carry the same values as
       * their own attributes (from the same source), so nothing can drift.
       */
    }, {
      key: "buildFramePassPoints",
      value: function buildFramePassPoints() {
        var _this$internals4 = this.internals, nodeDataCache = _this$internals4.nodeDataCache, nodeDataTexture = _this$internals4.nodeDataTexture;
        if (!nodeDataTexture) return {
          data: this.framePassPoints,
          count: 0
        };
        var needed = this.displayedNodeLabels.size * 3;
        if (this.framePassPoints.length < needed) this.framePassPoints = new Float32Array(needed);
        var buf = this.framePassPoints;
        var count = 0;
        var _iterator2 = _createForOfIteratorHelper(this.displayedNodeLabels), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var _POSITION_MODE_MAP, _data$labelAngle2;
            var node = _step2.value;
            var data = nodeDataCache[node];
            if (!data) continue;
            var index = nodeDataTexture.getIndex(node);
            if (index < 0) continue;
            buf[count * 3] = index;
            buf[count * 3 + 1] = (_POSITION_MODE_MAP = POSITION_MODE_MAP[data.labelPosition || DEFAULT_NODE_DISPLAY_DATA.labelPosition]) !== null && _POSITION_MODE_MAP !== void 0 ? _POSITION_MODE_MAP : 0;
            buf[count * 3 + 2] = (_data$labelAngle2 = data.labelAngle) !== null && _data$labelAngle2 !== void 0 ? _data$labelAngle2 : 0;
            count++;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return {
          data: buf,
          count
        };
      }
      /** Render node labels for the given depth layer. */
    }, {
      key: "renderWebGLLabels",
      value: function renderWebGLLabels(params, depth) {
        var _this$internals5 = this.internals, nodeDataCache = _this$internals5.nodeDataCache, labelProgram = _this$internals5.labelProgram, primitives = _this$internals5.primitives, nodeDataTexture = _this$internals5.nodeDataTexture;
        var visibleNodes = [];
        var _iterator3 = _createForOfIteratorHelper(this.displayedNodeLabels), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var _node = _step3.value;
            if (this.renderedNodeLabels.has(_node)) continue;
            var _data2 = nodeDataCache[_node];
            if (depth && _data2.labelDepth !== depth) continue;
            this.renderedNodeLabels.add(_node);
            visibleNodes.push(_node);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (visibleNodes.length === 0) return;
        if (this.labelsDirty) {
          var _primitives$nodes$lab, _primitives$nodes3, _primitives$nodes4;
          var totalCharacters = 0;
          for (var i = 0, l = visibleNodes.length; i < l; i++) {
            var data = nodeDataCache[visibleNodes[i]];
            totalCharacters += data.label.length;
          }
          labelProgram.reallocate(totalCharacters);
          var defaultLabelSize = 14;
          var defaultLabelMargin = (_primitives$nodes$lab = primitives === null || primitives === void 0 || (_primitives$nodes3 = primitives.nodes) === null || _primitives$nodes3 === void 0 || (_primitives$nodes3 = _primitives$nodes3.label) === null || _primitives$nodes3 === void 0 ? void 0 : _primitives$nodes3.margin) !== null && _primitives$nodes$lab !== void 0 ? _primitives$nodes$lab : DEFAULT_LABEL_MARGIN;
          var defaultLabelPosition = DEFAULT_NODE_DISPLAY_DATA.labelPosition;
          var defaultLabelFont = (primitives === null || primitives === void 0 || (_primitives$nodes4 = primitives.nodes) === null || _primitives$nodes4 === void 0 || (_primitives$nodes4 = _primitives$nodes4.label) === null || _primitives$nodes4 === void 0 || (_primitives$nodes4 = _primitives$nodes4.font) === null || _primitives$nodes4 === void 0 ? void 0 : _primitives$nodes4.family) || "sans-serif";
          var fontKeyMap = /* @__PURE__ */ new Map();
          var characterOffset = 0;
          for (var _i = 0, _l = visibleNodes.length; _i < _l; _i++) {
            var _data$labelSize2, _data$labelPosition2, _data$zIndex, _data$labelAngle3;
            var node = visibleNodes[_i];
            var _data = nodeDataCache[node];
            var fontString = _data.labelFont || defaultLabelFont;
            var fontKey = fontKeyMap.get(fontString);
            if (fontKey === void 0) {
              var _parseFontString3 = parseFontString(fontString), family = _parseFontString3.family, weight = _parseFontString3.weight, style = _parseFontString3.style;
              fontKey = labelProgram.registerFont(family, weight, style);
              fontKeyMap.set(fontString, fontKey);
            }
            var labelData = {
              text: _data.label,
              x: _data.x,
              y: _data.y,
              size: (_data$labelSize2 = _data.labelSize) !== null && _data$labelSize2 !== void 0 ? _data$labelSize2 : defaultLabelSize,
              color: _data.labelColor,
              nodeSize: _data.size,
              margin: defaultLabelMargin,
              position: (_data$labelPosition2 = _data.labelPosition) !== null && _data$labelPosition2 !== void 0 ? _data$labelPosition2 : defaultLabelPosition,
              hidden: false,
              forceLabel: hasForcedLabel(_data),
              type: "default",
              zIndex: (_data$zIndex = _data.zIndex) !== null && _data$zIndex !== void 0 ? _data$zIndex : 0,
              parentType: "node",
              parentKey: node,
              fontKey,
              labelAngle: (_data$labelAngle3 = _data.labelAngle) !== null && _data$labelAngle3 !== void 0 ? _data$labelAngle3 : 0,
              nodeIndex: nodeDataTexture.getIndex(node)
            };
            var charsProcessed = labelProgram.processLabel(node, characterOffset, labelData);
            characterOffset += charsProcessed;
          }
          labelProgram.invalidateBuffers();
        }
        labelProgram.render(params);
      }
      /** Render backdrops (background + shadow) behind nodes with labels. */
    }, {
      key: "renderBackdrops",
      value: function renderBackdrops(params, depth) {
        var _this$internals6 = this.internals, backdropProgram = _this$internals6.backdropProgram, nodeDataCache = _this$internals6.nodeDataCache, nodesWithBackdrop = _this$internals6.nodesWithBackdrop, attachmentManager = _this$internals6.attachmentManager, pixelRatio = _this$internals6.pixelRatio, nodeDataTexture = _this$internals6.nodeDataTexture;
        var nodes = [];
        var _iterator4 = _createForOfIteratorHelper(nodesWithBackdrop), _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var _nodeDataTexture$getI;
            var _key = _step4.value;
            var _data3 = nodeDataCache[_key];
            if (!_data3 || _data3.visibility === "hidden") continue;
            if (depth && _data3.depth !== depth) continue;
            var _nodeIndex = (_nodeDataTexture$getI = nodeDataTexture === null || nodeDataTexture === void 0 ? void 0 : nodeDataTexture.getIndex(_key)) !== null && _nodeDataTexture$getI !== void 0 ? _nodeDataTexture$getI : -1;
            if (_nodeIndex < 0) continue;
            nodes.push({
              key: _key,
              nodeIndex: _nodeIndex
            });
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        if (nodes.length === 0) return;
        backdropProgram.reallocate(nodes.length);
        for (var i = 0; i < nodes.length; i++) {
          var _data$backdropShadowB, _data$backdropPadding, _data$backdropBorderW, _data$backdropCornerR, _data$backdropLabelPa, _BACKDROP_AREA_MAP, _data$backdropArea, _data$labelAngle4;
          var _nodes$i = nodes[i], key = _nodes$i.key, nodeIndex = _nodes$i.nodeIndex;
          var data = nodeDataCache[key];
          var labelVisible = this.displayedNodeLabels.has(key);
          var nodeLabelMeasurement = labelVisible ? this.measureNodeLabel(data) : {
            width: 0,
            height: 0,
            textHeight: 0
          };
          var textHeight = nodeLabelMeasurement.textHeight;
          var labelWidth = nodeLabelMeasurement.width;
          var labelHeight = nodeLabelMeasurement.height;
          var labelBoxOffsetX = 0;
          var labelBoxOffsetY = 0;
          if (labelVisible && data.labelAttachment && attachmentManager) {
            var entry = attachmentManager.getEntry(key, data.labelAttachment);
            if (entry) {
              var placement = data.labelAttachmentPlacement || "below";
              if (placement === "below" || placement === "above") {
                var attachH = entry.height / pixelRatio;
                labelHeight += attachH + ATTACHMENT_GAP;
                labelWidth = Math.max(labelWidth, entry.width / pixelRatio);
                labelBoxOffsetY = placement === "below" ? (attachH + ATTACHMENT_GAP) / 2 : -(attachH + ATTACHMENT_GAP) / 2;
              } else {
                var attachW = entry.width / pixelRatio;
                labelWidth += attachW + ATTACHMENT_GAP;
                labelHeight = Math.max(labelHeight, entry.height / pixelRatio);
                labelBoxOffsetX = placement === "right" ? (attachW + ATTACHMENT_GAP) / 2 : -(attachW + ATTACHMENT_GAP) / 2;
              }
            }
          }
          var rawBgColor = data.backdropColor ? colorToArray(data.backdropColor) : [255, 255, 255, 255];
          var rawShadowColor = data.backdropShadowColor ? colorToArray(data.backdropShadowColor) : [0, 0, 0, 128];
          var backdropColor = rawBgColor.map(function(c) {
            return c / 255;
          });
          var backdropShadowColor = rawShadowColor.map(function(c) {
            return c / 255;
          });
          var backdropShadowBlur = (_data$backdropShadowB = data.backdropShadowBlur) !== null && _data$backdropShadowB !== void 0 ? _data$backdropShadowB : 12;
          var backdropPadding = (_data$backdropPadding = data.backdropPadding) !== null && _data$backdropPadding !== void 0 ? _data$backdropPadding : 6;
          var rawBorderColor = data.backdropBorderColor ? colorToArray(data.backdropBorderColor) : [0, 0, 0, 0];
          var backdropBorderColor = rawBorderColor.map(function(c) {
            return c / 255;
          });
          var backdropBorderWidth = (_data$backdropBorderW = data.backdropBorderWidth) !== null && _data$backdropBorderW !== void 0 ? _data$backdropBorderW : 0;
          var backdropCornerRadius = (_data$backdropCornerR = data.backdropCornerRadius) !== null && _data$backdropCornerR !== void 0 ? _data$backdropCornerR : 0;
          var rawLabelPadding = (_data$backdropLabelPa = data.backdropLabelPadding) !== null && _data$backdropLabelPa !== void 0 ? _data$backdropLabelPa : -1;
          var backdropLabelPadding = rawLabelPadding < 0 ? backdropPadding : rawLabelPadding;
          var backdropArea = (_BACKDROP_AREA_MAP = BACKDROP_AREA_MAP[(_data$backdropArea = data.backdropArea) !== null && _data$backdropArea !== void 0 ? _data$backdropArea : "both"]) !== null && _BACKDROP_AREA_MAP !== void 0 ? _BACKDROP_AREA_MAP : 0;
          var backdropData = {
            key,
            nodeIndex,
            label: data.label,
            labelWidth,
            labelHeight,
            textHeight,
            type: "default",
            position: data.labelPosition || DEFAULT_NODE_DISPLAY_DATA.labelPosition,
            labelAngle: (_data$labelAngle4 = data.labelAngle) !== null && _data$labelAngle4 !== void 0 ? _data$labelAngle4 : 0,
            backdropColor,
            backdropShadowColor,
            backdropShadowBlur,
            backdropPadding,
            backdropBorderColor,
            backdropBorderWidth,
            backdropCornerRadius,
            backdropLabelPadding,
            backdropArea,
            labelBoxOffset: [labelBoxOffsetX, labelBoxOffsetY]
          };
          backdropProgram.processBackdrop(i, backdropData);
        }
        backdropProgram.invalidateBuffers();
        backdropProgram.render(params);
      }
      /** Render label background rectangles (picking + optional visual) for displayed node labels. */
    }, {
      key: "renderLabelBackgrounds",
      value: function renderLabelBackgrounds(params, depth) {
        var _this$internals7 = this.internals, labelBackgroundProgram = _this$internals7.labelBackgroundProgram, nodeDataCache = _this$internals7.nodeDataCache, nodeDataTexture = _this$internals7.nodeDataTexture;
        var eventsEnabled = KIND_REGISTRY.nodeLabel.writesPickingThisFrame(this.internals);
        var nodes = [];
        var _iterator5 = _createForOfIteratorHelper(this.displayedNodeLabels), _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
            var _key2 = _step5.value;
            var _data4 = nodeDataCache[_key2];
            if (!_data4 || _data4.visibility === "hidden") continue;
            if (depth && _data4.labelDepth !== depth) continue;
            if (!eventsEnabled && !_data4.labelBackgroundColor) continue;
            nodes.push(_key2);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        if (nodes.length === 0) return;
        labelBackgroundProgram.reallocate(nodes.length);
        for (var i = 0; i < nodes.length; i++) {
          var _nodeDataTexture$getI2, _POSITION_MODE_MAP2, _data$labelAngle5, _data$labelBackground2;
          var key = nodes[i];
          var data = nodeDataCache[key];
          var nodeIndex = (_nodeDataTexture$getI2 = nodeDataTexture === null || nodeDataTexture === void 0 ? void 0 : nodeDataTexture.getIndex(key)) !== null && _nodeDataTexture$getI2 !== void 0 ? _nodeDataTexture$getI2 : -1;
          if (nodeIndex < 0) continue;
          var _this$measureNodeLabe2 = this.measureNodeLabel(data), labelWidth = _this$measureNodeLabe2.width, labelHeight = _this$measureNodeLabe2.height, textHeight = _this$measureNodeLabe2.textHeight;
          var pickingIndex = pickingIdOf(this.internals.pickingState, "nodeLabel", key) || pickingIdOf(this.internals.pickingState, "node", key);
          var bgColor = data.labelBackgroundColor ? floatColor(data.labelBackgroundColor) : floatColor("transparent");
          var bgData = {
            nodeIndex,
            id: indexToColor(pickingIndex),
            color: bgColor,
            labelWidth,
            labelHeight,
            textHeight,
            positionMode: (_POSITION_MODE_MAP2 = POSITION_MODE_MAP[data.labelPosition || DEFAULT_NODE_DISPLAY_DATA.labelPosition]) !== null && _POSITION_MODE_MAP2 !== void 0 ? _POSITION_MODE_MAP2 : 0,
            labelAngle: (_data$labelAngle5 = data.labelAngle) !== null && _data$labelAngle5 !== void 0 ? _data$labelAngle5 : 0,
            padding: (_data$labelBackground2 = data.labelBackgroundPadding) !== null && _data$labelBackground2 !== void 0 ? _data$labelBackground2 : DEFAULT_LABEL_BACKGROUND_PADDING
          };
          labelBackgroundProgram.processLabelBackground(i, bgData);
        }
        labelBackgroundProgram.invalidateBuffers();
        labelBackgroundProgram.render(params);
      }
      /**
       * Cache attachment textures for nodes with visible backdrops.
       * Must be called before renderBackdrops so backdrop sizing includes them.
       */
    }, {
      key: "cacheAttachments",
      value: function cacheAttachments(depth) {
        var _this$internals8 = this.internals, attachmentManager = _this$internals8.attachmentManager, pixelRatio = _this$internals8.pixelRatio, nodeDataCache = _this$internals8.nodeDataCache, nodesWithBackdrop = _this$internals8.nodesWithBackdrop, graph = _this$internals8.graph;
        if (!attachmentManager) return;
        var _iterator6 = _createForOfIteratorHelper(nodesWithBackdrop), _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
            var key = _step6.value;
            if (!this.displayedNodeLabels.has(key)) continue;
            var data = nodeDataCache[key];
            if (!data || data.visibility === "hidden") continue;
            if (depth && data.depth !== depth) continue;
            if (!data.labelAttachment) continue;
            var attrs = graph.getNodeAttributes(key);
            var _this$measureNodeLabe3 = this.measureNodeLabel(data), labelWidth = _this$measureNodeLabe3.width, labelHeight = _this$measureNodeLabe3.height;
            var context = {
              node: key,
              attributes: attrs,
              pixelRatio,
              labelWidth,
              labelHeight
            };
            attachmentManager.renderAttachment(key, data.labelAttachment, context);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        attachmentManager.regenerateAtlas();
      }
      /** Render label attachments (icons, badges, etc.) after nodes but before labels. */
    }, {
      key: "renderAttachments",
      value: function renderAttachments(params, depth) {
        var _this$internals9 = this.internals, attachmentManager = _this$internals9.attachmentManager, attachmentProgram = _this$internals9.attachmentProgram, nodeDataCache = _this$internals9.nodeDataCache, nodesWithBackdrop = _this$internals9.nodesWithBackdrop, pixelRatio = _this$internals9.pixelRatio, nodeDataTexture = _this$internals9.nodeDataTexture;
        if (!attachmentManager || !attachmentProgram) return;
        var validCount = 0;
        attachmentProgram.reallocateAttachments(nodesWithBackdrop.size);
        var _iterator7 = _createForOfIteratorHelper(nodesWithBackdrop), _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
            var _nodeDataTexture$getI3, _ATTACHMENT_PLACEMENT, _POSITION_MODE_MAP3, _data$labelAngle6;
            var key = _step7.value;
            if (!this.displayedNodeLabels.has(key)) continue;
            var data = nodeDataCache[key];
            if (!data || data.visibility === "hidden") continue;
            if (depth && data.labelDepth !== depth) continue;
            if (!data.labelAttachment) continue;
            var entry = attachmentManager.getEntry(key, data.labelAttachment);
            if (!entry) continue;
            var nodeIndex = (_nodeDataTexture$getI3 = nodeDataTexture === null || nodeDataTexture === void 0 ? void 0 : nodeDataTexture.getIndex(key)) !== null && _nodeDataTexture$getI3 !== void 0 ? _nodeDataTexture$getI3 : -1;
            if (nodeIndex < 0) continue;
            var _this$measureNodeLabe4 = this.measureNodeLabel(data), labelWidth = _this$measureNodeLabe4.width, labelHeight = _this$measureNodeLabe4.height, textHeight = _this$measureNodeLabe4.textHeight;
            var attachmentPlacement = (_ATTACHMENT_PLACEMENT = ATTACHMENT_PLACEMENT_MAP[data.labelAttachmentPlacement || "below"]) !== null && _ATTACHMENT_PLACEMENT !== void 0 ? _ATTACHMENT_PLACEMENT : 0;
            attachmentProgram.processAttachment(validCount, {
              nodeIndex,
              atlasX: entry.x,
              atlasY: entry.y,
              atlasW: entry.width,
              atlasH: entry.height,
              attachWidth: entry.width / pixelRatio,
              attachHeight: entry.height / pixelRatio,
              positionMode: (_POSITION_MODE_MAP3 = POSITION_MODE_MAP[data.labelPosition || DEFAULT_NODE_DISPLAY_DATA.labelPosition]) !== null && _POSITION_MODE_MAP3 !== void 0 ? _POSITION_MODE_MAP3 : 0,
              attachmentPlacement,
              labelWidth,
              labelHeight,
              textHeight,
              labelAngle: (_data$labelAngle6 = data.labelAngle) !== null && _data$labelAngle6 !== void 0 ? _data$labelAngle6 : 0
            });
            validCount++;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        if (validCount === 0) return;
        attachmentProgram.reallocateAttachments(validCount);
        attachmentManager.bindTexture(ATTACHMENT_TEXTURE_UNIT);
        attachmentProgram.invalidateBuffers();
        attachmentProgram.render(params);
      }
      /**
       * Compute the per-frame list of edge labels to consider for rendering.
       * Called once before the depth loop; both `renderEdgeLabels` and
       * `renderEdgeLabelBackgrounds` consume it with their own depth filter.
       */
    }, {
      key: "computeDisplayedEdgeLabels",
      value: function computeDisplayedEdgeLabels() {
        var _this$internals0 = this.internals, graph = _this$internals0.graph, stateManager = _this$internals0.stateManager, settings = _this$internals0.settings, edgesWithForcedLabels = _this$internals0.edgesWithForcedLabels;
        var highlightedNodes = stateManager.getHighlightedNodes();
        var anchors = settings.edgeLabelAnchors === "allNodes" ? new Set(this.edgeAnchorGrid.getLabelsToDisplay(this.internals.getCameraState().ratio, settings.labelDensity)) : this.displayedNodeLabels;
        var hovered = stateManager.hovered;
        var list = edgeLabelsToDisplayFromNodes({
          graph,
          hoveredNode: (hovered === null || hovered === void 0 ? void 0 : hovered.kind) === "node" ? hovered.key : null,
          displayedNodeLabels: anchors,
          highlightedNodes
        });
        extend(list, edgesWithForcedLabels);
        this.edgeLabelCandidates = list;
        this.displayedEdgeLabels = /* @__PURE__ */ new Set();
      }
      /**
       * Returns the edge display data for candidates matching this depth that
       * should actually render (visibility checks applied). Shared filter logic
       * used by both the label and background passes.
       */
    }, {
      key: "filterEdgeLabelsForDepth",
      value: function filterEdgeLabelsForDepth(depth) {
        var _this$internals1 = this.internals, graph = _this$internals1.graph, nodeDataCache = _this$internals1.nodeDataCache, edgeDataCache = _this$internals1.edgeDataCache;
        var result = [];
        var seen = /* @__PURE__ */ new Set();
        for (var i = 0, l = this.edgeLabelCandidates.length; i < l; i++) {
          var edge = this.edgeLabelCandidates[i];
          if (seen.has(edge)) continue;
          seen.add(edge);
          var extremities = graph.extremities(edge);
          var sourceData = nodeDataCache[extremities[0]];
          var targetData = nodeDataCache[extremities[1]];
          var edgeData = edgeDataCache[edge];
          if (!edgeData || !sourceData || !targetData) continue;
          if (edgeData.visibility === "hidden" || edgeData.labelVisibility === "hidden" || sourceData.visibility === "hidden" || targetData.visibility === "hidden") continue;
          if (depth && edgeData.labelDepth !== depth) continue;
          if (!edgeData.label) continue;
          result.push(edge);
        }
        return result;
      }
      /** Render edge labels for the given depth layer using WebGL (SDF-based). */
    }, {
      key: "renderEdgeLabels",
      value: function renderEdgeLabels(params, depth) {
        var _this$internals10 = this.internals, graph = _this$internals10.graph, nodeDataCache = _this$internals10.nodeDataCache, edgeDataCache = _this$internals10.edgeDataCache, primitives = _this$internals10.primitives, edgeLabelProgram = _this$internals10.edgeLabelProgram, nodeDataTexture = _this$internals10.nodeDataTexture, edgeDataTexture = _this$internals10.edgeDataTexture;
        if (!edgeLabelProgram) return;
        var edgesToRender = this.filterEdgeLabelsForDepth(depth);
        var _iterator8 = _createForOfIteratorHelper(edgesToRender), _step8;
        try {
          for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
            var _edge2 = _step8.value;
            this.displayedEdgeLabels.add(_edge2);
          }
        } catch (err) {
          _iterator8.e(err);
        } finally {
          _iterator8.f();
        }
        if (edgesToRender.length === 0) return;
        if (this.labelsDirty) {
          var _primitives$edges$lab, _primitives$edges;
          var totalCharacters = 0;
          var _iterator9 = _createForOfIteratorHelper(edgesToRender), _step9;
          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
              var edge = _step9.value;
              totalCharacters += edgeDataCache[edge].label.length;
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }
          edgeLabelProgram.reallocate(totalCharacters);
          var defaultEdgeLabelMargin = (_primitives$edges$lab = primitives === null || primitives === void 0 || (_primitives$edges = primitives.edges) === null || _primitives$edges === void 0 || (_primitives$edges = _primitives$edges.label) === null || _primitives$edges === void 0 ? void 0 : _primitives$edges.margin) !== null && _primitives$edges$lab !== void 0 ? _primitives$edges$lab : 5;
          var defaultEdgeLabelPosition = "over";
          var characterOffset = 0;
          var _iterator0 = _createForOfIteratorHelper(edgesToRender), _step0;
          try {
            for (_iterator0.s(); !(_step0 = _iterator0.n()).done; ) {
              var _edgeData$labelPositi, _edgeData$zIndex;
              var _edge = _step0.value;
              var extremities = graph.extremities(_edge);
              var sourceKey = extremities[0];
              var targetKey = extremities[1];
              var sourceData = nodeDataCache[sourceKey];
              var targetData = nodeDataCache[targetKey];
              var edgeData = edgeDataCache[_edge];
              var sourceNodeIndex = nodeDataTexture.getIndex(sourceKey);
              var targetNodeIndex = nodeDataTexture.getIndex(targetKey);
              var edgeIndex = edgeDataTexture.getIndex(_edge);
              var labelData = {
                text: edgeData.label,
                x: (sourceData.x + targetData.x) / 2,
                y: (sourceData.y + targetData.y) / 2,
                size: DEFAULT_EDGE_LABEL_SIZE,
                color: edgeData.labelColor,
                nodeSize: 0,
                nodeIndex: -1,
                margin: defaultEdgeLabelMargin,
                position: (_edgeData$labelPositi = edgeData.labelPosition) !== null && _edgeData$labelPositi !== void 0 ? _edgeData$labelPositi : defaultEdgeLabelPosition,
                hidden: false,
                forceLabel: hasForcedLabel(edgeData),
                type: "default",
                zIndex: (_edgeData$zIndex = edgeData.zIndex) !== null && _edgeData$zIndex !== void 0 ? _edgeData$zIndex : 0,
                parentType: "edge",
                parentKey: _edge,
                fontKey: "",
                labelAngle: 0,
                sourceX: sourceData.x,
                sourceY: sourceData.y,
                targetX: targetData.x,
                targetY: targetData.y,
                sourceSize: sourceData.size,
                targetSize: targetData.size,
                sourceShape: sourceData.shape || "circle",
                targetShape: targetData.shape || "circle",
                edgeSize: edgeData.size,
                offset: 0,
                edgeAttributes: edgeData,
                sourceNodeIndex,
                targetNodeIndex,
                edgeIndex
              };
              var charsProcessed = edgeLabelProgram.processEdgeLabel(_edge, characterOffset, labelData);
              characterOffset += charsProcessed;
            }
          } catch (err) {
            _iterator0.e(err);
          } finally {
            _iterator0.f();
          }
          edgeLabelProgram.invalidateBuffers();
        }
        edgeLabelProgram.render(params);
      }
      /**
       * Render ribbons behind edge labels: curves along the same offset path the
       * label characters follow. Rendered per-depth, before edge labels so the
       * text paints on top. Renders every candidate when `edgeLabelEvents` is on
       * (so picking covers transparent ribbons too); otherwise only those with a
       * visual background fill. Picking writes are further gated by the caller
       * via `pickingFrameBuffer: null`.
       */
    }, {
      key: "renderEdgeLabelBackgrounds",
      value: function renderEdgeLabelBackgrounds(params, depth) {
        var _primitives$edges$lab2, _primitives$edges2;
        var _this$internals11 = this.internals, edgeLabelBackgroundProgram = _this$internals11.edgeLabelBackgroundProgram, edgeLabelProgram = _this$internals11.edgeLabelProgram, edgeDataCache = _this$internals11.edgeDataCache, primitives = _this$internals11.primitives, edgeDataTexture = _this$internals11.edgeDataTexture;
        if (!edgeDataTexture || !edgeLabelProgram || !edgeLabelBackgroundProgram) return;
        var eventsEnabled = KIND_REGISTRY.edgeLabel.writesPickingThisFrame(this.internals);
        var defaultEdgeLabelMargin = (_primitives$edges$lab2 = primitives === null || primitives === void 0 || (_primitives$edges2 = primitives.edges) === null || _primitives$edges2 === void 0 || (_primitives$edges2 = _primitives$edges2.label) === null || _primitives$edges2 === void 0 ? void 0 : _primitives$edges2.margin) !== null && _primitives$edges$lab2 !== void 0 ? _primitives$edges$lab2 : 5;
        var defaultEdgeLabelPosition = "over";
        var candidates = this.filterEdgeLabelsForDepth(depth);
        var toRender = [];
        var _iterator1 = _createForOfIteratorHelper(candidates), _step1;
        try {
          for (_iterator1.s(); !(_step1 = _iterator1.n()).done; ) {
            var _edge3 = _step1.value;
            if (!eventsEnabled && !edgeDataCache[_edge3].labelBackgroundColor) continue;
            toRender.push(_edge3);
          }
        } catch (err) {
          _iterator1.e(err);
        } finally {
          _iterator1.f();
        }
        if (toRender.length === 0) return;
        edgeLabelBackgroundProgram.reallocate(toRender.length);
        for (var i = 0; i < toRender.length; i++) {
          var _edgeData$labelPositi2, _EDGE_POSITION_MODE_M, _edgeData$labelBackgr;
          var edge = toRender[i];
          var edgeData = edgeDataCache[edge];
          var text = edgeData.label;
          var totalTextWidth = edgeLabelProgram.measureLabelAtlasWidth(text);
          var position = (_edgeData$labelPositi2 = edgeData.labelPosition) !== null && _edgeData$labelPositi2 !== void 0 ? _edgeData$labelPositi2 : defaultEdgeLabelPosition;
          var positionMode = typeof position === "string" ? (_EDGE_POSITION_MODE_M = EDGE_POSITION_MODE_MAP[position]) !== null && _EDGE_POSITION_MODE_M !== void 0 ? _EDGE_POSITION_MODE_M : 0 : 0;
          var pickingIndex = pickingIdOf(this.internals.pickingState, "edgeLabel", edge) || pickingIdOf(this.internals.pickingState, "edge", edge);
          var bgColor = edgeData.labelBackgroundColor ? floatColor(edgeData.labelBackgroundColor) : floatColor("transparent");
          var data = {
            edgeIndex: edgeDataTexture.getIndex(edge),
            baseFontSize: DEFAULT_EDGE_LABEL_SIZE,
            totalTextWidth,
            positionMode,
            margin: defaultEdgeLabelMargin,
            padding: (_edgeData$labelBackgr = edgeData.labelBackgroundPadding) !== null && _edgeData$labelBackgr !== void 0 ? _edgeData$labelBackgr : DEFAULT_EDGE_LABEL_PADDING,
            color: bgColor,
            id: indexToColor(pickingIndex),
            edgeAttributes: edgeData
          };
          edgeLabelBackgroundProgram.processEdgeLabelBackground(i, edge, data);
        }
        edgeLabelBackgroundProgram.invalidateBuffers();
        edgeLabelBackgroundProgram.render(params);
      }
    }]);
  })();
  var StateManager = /* @__PURE__ */ (function() {
    function StateManager2(scheduleRefresh, customNodeStateDefaults, customEdgeStateDefaults, customGraphStateDefaults) {
      _classCallCheck(this, StateManager2);
      _defineProperty(this, "nodeStates", /* @__PURE__ */ new Map());
      _defineProperty(this, "edgeStates", /* @__PURE__ */ new Map());
      _defineProperty(this, "hovered", null);
      _defineProperty(this, "dirtyNodes", /* @__PURE__ */ new Set());
      _defineProperty(this, "dirtyEdges", /* @__PURE__ */ new Set());
      _defineProperty(this, "graphStateChanged", false);
      _defineProperty(this, "graphStateFlagsDirty", false);
      this.scheduleRefresh = scheduleRefresh;
      this.customNodeStateDefaults = customNodeStateDefaults;
      this.customEdgeStateDefaults = customEdgeStateDefaults;
      this.customGraphStateDefaults = customGraphStateDefaults;
      this.graphState = createGraphState(customGraphStateDefaults);
    }
    return _createClass(StateManager2, [{
      key: "getNodeState",
      value: function getNodeState(key) {
        key = "" + key;
        var state = this.nodeStates.get(key);
        if (!state) {
          state = createNodeState(this.customNodeStateDefaults);
          this.nodeStates.set(key, state);
        }
        return state;
      }
    }, {
      key: "getEdgeState",
      value: function getEdgeState(key) {
        key = "" + key;
        var state = this.edgeStates.get(key);
        if (!state) {
          state = createEdgeState(this.customEdgeStateDefaults);
          this.edgeStates.set(key, state);
        }
        return state;
      }
    }, {
      key: "getGraphState",
      value: function getGraphState() {
        this.flushGraphStateFlags();
        return this.graphState;
      }
    }, {
      key: "getHighlightedNodes",
      value: function getHighlightedNodes() {
        var highlighted = /* @__PURE__ */ new Set();
        var _iterator = _createForOfIteratorHelper(this.nodeStates), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], state = _step$value[1];
            if (state.isHighlighted) highlighted.add(key);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return highlighted;
      }
      // State mutations (public API, exposed on Sigma)
    }, {
      key: "setNodeState",
      value: function setNodeState(key, state) {
        key = "" + key;
        var currentState = this.getNodeState(key);
        if (!hasNewPartialProps(currentState, state)) return;
        var newState = _objectSpread2(_objectSpread2({}, currentState), state);
        this.nodeStates.set(key, newState);
        this.dirtyNodes.add(key);
        this.updateHoveredNodeTracking(key, currentState, newState);
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "setEdgeState",
      value: function setEdgeState(key, state) {
        key = "" + key;
        var currentState = this.getEdgeState(key);
        if (!hasNewPartialProps(currentState, state)) return;
        var newState = _objectSpread2(_objectSpread2({}, currentState), state);
        this.edgeStates.set(key, newState);
        this.dirtyEdges.add(key);
        this.updateHoveredEdgeTracking(key, currentState, newState);
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "setGraphState",
      value: function setGraphState(state) {
        if (!hasNewPartialProps(this.graphState, state)) return;
        var merged = _objectSpread2(_objectSpread2({}, this.graphState), state);
        merged.isIdle = !merged.isPanning && !merged.isZooming && !merged.isDragging;
        this.graphState = merged;
        this.graphStateChanged = true;
        this.scheduleRefresh();
      }
    }, {
      key: "setNodesState",
      value: function setNodesState(keys, state) {
        var changed = false;
        var _iterator2 = _createForOfIteratorHelper(keys), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var key = _step2.value;
            key = "" + key;
            var currentState = this.getNodeState(key);
            if (!hasNewPartialProps(currentState, state)) continue;
            var newState = _objectSpread2(_objectSpread2({}, currentState), state);
            this.nodeStates.set(key, newState);
            this.dirtyNodes.add(key);
            this.updateHoveredNodeTracking(key, currentState, newState);
            changed = true;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (changed) {
          this.graphStateFlagsDirty = true;
          this.scheduleRefresh();
        }
      }
    }, {
      key: "setEdgesState",
      value: function setEdgesState(keys, state) {
        var changed = false;
        var _iterator3 = _createForOfIteratorHelper(keys), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var key = _step3.value;
            key = "" + key;
            var currentState = this.getEdgeState(key);
            if (!hasNewPartialProps(currentState, state)) continue;
            var newState = _objectSpread2(_objectSpread2({}, currentState), state);
            this.edgeStates.set(key, newState);
            this.dirtyEdges.add(key);
            this.updateHoveredEdgeTracking(key, currentState, newState);
            changed = true;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (changed) {
          this.graphStateFlagsDirty = true;
          this.scheduleRefresh();
        }
      }
    }, {
      key: "markNodesDirty",
      value: function markNodesDirty(keys) {
        var _iterator4 = _createForOfIteratorHelper(keys), _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var key = _step4.value;
            this.dirtyNodes.add(key);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        this.scheduleRefresh();
      }
      // Lifecycle: when an item is removed, clear hover for that item and any
      // dependent kind (e.g. a node's removal clears both `node` and `nodeLabel`).
      // Graph flags may change too, so they are recomputed on the next refresh.
    }, {
      key: "removeNode",
      value: function removeNode(key) {
        this.nodeStates["delete"](key);
        this.dirtyNodes["delete"](key);
        this.clearHoveredFor("node", key);
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "removeEdge",
      value: function removeEdge(key) {
        this.edgeStates["delete"](key);
        this.dirtyEdges["delete"](key);
        this.clearHoveredFor("edge", key);
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "pruneNodes",
      value: function pruneNodes(keep) {
        var _iterator5 = _createForOfIteratorHelper(this.nodeStates.keys()), _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
            var key = _step5.value;
            if (!keep(key)) this.removeNode(key);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }, {
      key: "pruneEdges",
      value: function pruneEdges(keep) {
        var _iterator6 = _createForOfIteratorHelper(this.edgeStates.keys()), _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
            var key = _step6.value;
            if (!keep(key)) this.removeEdge(key);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    }, {
      key: "clearNodes",
      value: function clearNodes() {
        this.nodeStates.clear();
        this.dirtyNodes.clear();
        this.clearHoveredForKinds(kindsDependingOn("node"));
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "clearEdges",
      value: function clearEdges() {
        this.edgeStates.clear();
        this.dirtyEdges.clear();
        this.clearHoveredForKinds(kindsDependingOn("edge"));
        this.graphStateFlagsDirty = true;
        this.scheduleRefresh();
      }
    }, {
      key: "resetGraphState",
      value: function resetGraphState() {
        this.graphState = createGraphState(this.customGraphStateDefaults);
        this.graphStateChanged = false;
        this.graphStateFlagsDirty = false;
      }
    }, {
      key: "clearDirtyTracking",
      value: function clearDirtyTracking() {
        this.dirtyNodes.clear();
        this.dirtyEdges.clear();
        this.graphStateChanged = false;
      }
    }, {
      key: "setHovered",
      value: function setHovered(hit) {
        this.hovered = hit;
      }
    }, {
      key: "clearHoveredFor",
      value: function clearHoveredFor(target, key) {
        if (this.hovered && this.hovered.key === key && kindsDependingOn(target).includes(this.hovered.kind)) {
          this.hovered = null;
        }
      }
    }, {
      key: "clearHoveredForKinds",
      value: function clearHoveredForKinds(kinds) {
        if (this.hovered && kinds.includes(this.hovered.kind)) this.hovered = null;
      }
      // Graph flag computation
    }, {
      key: "updateGraphStateFromNodes",
      value: function updateGraphStateFromNodes() {
        var _this$hovered;
        var hasHovered = false;
        var hasHighlighted = false;
        var isDragging = false;
        var _iterator7 = _createForOfIteratorHelper(this.nodeStates), _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
            var _step7$value = _slicedToArray(_step7.value, 2), state = _step7$value[1];
            if (state.isHovered) hasHovered = true;
            if (state.isHighlighted) hasHighlighted = true;
            if (state.isDragged) isDragging = true;
            if (hasHovered && hasHighlighted && isDragging) break;
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        if (!hasHovered && ((_this$hovered = this.hovered) === null || _this$hovered === void 0 ? void 0 : _this$hovered.kind) === "edge") hasHovered = true;
        var isIdle = !this.graphState.isPanning && !this.graphState.isZooming && !isDragging;
        if (this.graphState.hasHovered !== hasHovered || this.graphState.hasHighlighted !== hasHighlighted || this.graphState.isDragging !== isDragging || this.graphState.isIdle !== isIdle) {
          this.graphStateChanged = true;
        }
        this.graphState = _objectSpread2(_objectSpread2({}, this.graphState), {}, {
          hasHovered,
          hasHighlighted,
          isDragging,
          isIdle
        });
      }
    }, {
      key: "updateGraphStateFromEdges",
      value: function updateGraphStateFromEdges() {
        var _this$hovered2;
        var hasHovered = ((_this$hovered2 = this.hovered) === null || _this$hovered2 === void 0 ? void 0 : _this$hovered2.kind) === "node";
        if (!hasHovered) {
          var _iterator8 = _createForOfIteratorHelper(this.edgeStates), _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
              var _step8$value = _slicedToArray(_step8.value, 2), state = _step8$value[1];
              if (state.isHovered) {
                hasHovered = true;
                break;
              }
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
        if (this.graphState.hasHovered !== hasHovered) {
          this.graphStateChanged = true;
        }
        this.graphState = _objectSpread2(_objectSpread2({}, this.graphState), {}, {
          hasHovered
        });
      }
    }, {
      key: "flushGraphStateFlags",
      value: function flushGraphStateFlags() {
        if (!this.graphStateFlagsDirty) return;
        this.updateGraphStateFromNodes();
        this.updateGraphStateFromEdges();
        this.graphStateFlagsDirty = false;
      }
      // When `isHovered` flips on a node/edge, keep the top-level `hovered` slot
      // consistent (one body-hovered item at a time).
    }, {
      key: "updateHoveredNodeTracking",
      value: function updateHoveredNodeTracking(key, oldState, newState) {
        var _this$hovered4;
        if (oldState.isHovered === newState.isHovered) return;
        if (newState.isHovered) {
          var _this$hovered3;
          if (((_this$hovered3 = this.hovered) === null || _this$hovered3 === void 0 ? void 0 : _this$hovered3.kind) === "node" && this.hovered.key !== key) {
            var prevKey = this.hovered.key;
            var prevState = this.getNodeState(prevKey);
            this.nodeStates.set(prevKey, _objectSpread2(_objectSpread2({}, prevState), {}, {
              isHovered: false
            }));
            this.dirtyNodes.add(prevKey);
          }
          this.hovered = {
            kind: "node",
            key
          };
        } else if (((_this$hovered4 = this.hovered) === null || _this$hovered4 === void 0 ? void 0 : _this$hovered4.kind) === "node" && this.hovered.key === key) {
          this.hovered = null;
        }
      }
    }, {
      key: "updateHoveredEdgeTracking",
      value: function updateHoveredEdgeTracking(key, oldState, newState) {
        var _this$hovered6;
        if (oldState.isHovered === newState.isHovered) return;
        if (newState.isHovered) {
          var _this$hovered5;
          if (((_this$hovered5 = this.hovered) === null || _this$hovered5 === void 0 ? void 0 : _this$hovered5.kind) === "edge" && this.hovered.key !== key) {
            var prevKey = this.hovered.key;
            var prevState = this.getEdgeState(prevKey);
            this.edgeStates.set(prevKey, _objectSpread2(_objectSpread2({}, prevState), {}, {
              isHovered: false
            }));
            this.dirtyEdges.add(prevKey);
          }
          this.hovered = {
            kind: "edge",
            key
          };
        } else if (((_this$hovered6 = this.hovered) === null || _this$hovered6 === void 0 ? void 0 : _this$hovered6.kind) === "edge" && this.hovered.key === key) {
          this.hovered = null;
        }
      }
    }]);
  })();
  var EDGE_FRAME_TEXTURE_UNIT = 1;
  var NODE_FRAME_TEXTURE_UNIT = 2;
  var NODE_DATA_TEXTURE_UNIT = 3;
  var EDGE_DATA_TEXTURE_UNIT = 4;
  var Sigma$1 = /* @__PURE__ */ (function(_TypedEventEmitter) {
    function Sigma2(graph, container) {
      var _styles$nodes, _styles$edges, _resolvedPrimitives$d, _resolvedPrimitives$n;
      var _this;
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      _classCallCheck(this, Sigma2);
      _this = _callSuper(this, Sigma2);
      _defineProperty(_this, "nodeReducer", null);
      _defineProperty(_this, "edgeReducer", null);
      _defineProperty(_this, "stageCanvas", null);
      _defineProperty(_this, "mouseLayer", null);
      _defineProperty(_this, "gestureHint", null);
      _defineProperty(_this, "extraElements", {});
      _defineProperty(_this, "webGLContext", null);
      _defineProperty(_this, "pickingFrameBuffer", null);
      _defineProperty(_this, "pickingTexture", null);
      _defineProperty(_this, "pickingDepthBuffer", null);
      _defineProperty(_this, "activeListeners", {});
      _defineProperty(_this, "nodeVariableEntries", []);
      _defineProperty(_this, "edgeVariableEntries", []);
      _defineProperty(_this, "edgePathsByName", /* @__PURE__ */ new Map());
      _defineProperty(_this, "nodeProgramIndex", {});
      _defineProperty(_this, "edgeProgramIndex", {});
      _defineProperty(_this, "edgeTextureIndexCache", {});
      _defineProperty(_this, "nodeGraphCoords", {});
      _defineProperty(_this, "nodeExtent", {
        x: [0, 1],
        y: [0, 1]
      });
      _defineProperty(_this, "matrix", identity());
      _defineProperty(_this, "invMatrix", identity());
      _defineProperty(_this, "correctionRatio", 1);
      _defineProperty(_this, "frameId", 0);
      _defineProperty(_this, "customBBox", null);
      _defineProperty(_this, "gpuTimerExt", void 0);
      _defineProperty(_this, "activeGpuTimerQuery", null);
      _defineProperty(_this, "pendingGpuTimerQueries", []);
      _defineProperty(_this, "normalizationFunction", createNormalizationFunction({
        x: [0, 1],
        y: [0, 1]
      }));
      _defineProperty(_this, "graphToViewportRatio", 1);
      _defineProperty(_this, "pickingState", createPickingState());
      _defineProperty(_this, "prevNodeVisibilities", {});
      _defineProperty(_this, "width", 0);
      _defineProperty(_this, "height", 0);
      _defineProperty(_this, "autoRescaleFrozen", false);
      _defineProperty(_this, "stylesDeclaration", null);
      _defineProperty(_this, "resolvedStageStyle", {});
      _defineProperty(_this, "renderFrame", null);
      _defineProperty(_this, "contextLost", false);
      _defineProperty(_this, "pendingProcess", "full");
      _defineProperty(_this, "needToRefreshState", false);
      _defineProperty(_this, "checkEdgesEventsFrame", null);
      _defineProperty(_this, "edgeStyleAnalysis", {
        dependency: "static",
        xAttribute: null,
        yAttribute: null
      });
      _defineProperty(_this, "depthLayers", _toConsumableArray(DEFAULT_DEPTH_LAYERS));
      _defineProperty(_this, "customLayerPrograms", /* @__PURE__ */ new Map());
      _defineProperty(_this, "nodeShapeSlug", null);
      _defineProperty(_this, "sdfAtlas", null);
      _defineProperty(_this, "depthRanges", {
        nodes: {},
        edges: {}
      });
      _defineProperty(_this, "nodeBaseDepth", {});
      _defineProperty(_this, "edgeBaseDepth", {});
      var primitives = options.primitives, styles = options.styles, _options$settings = options.settings, settings = _options$settings === void 0 ? {} : _options$settings, nodeReducer = options.nodeReducer, edgeReducer = options.edgeReducer, customNodeState = options.customNodeState, customEdgeState = options.customEdgeState, customGraphState = options.customGraphState;
      _this.stateManager = new StateManager(function() {
        return _this.scheduleStateRefresh();
      }, customNodeState, customEdgeState, customGraphState);
      var resolvedPrimitives = primitives !== null && primitives !== void 0 ? primitives : DEFAULT_PRIMITIVES2;
      _this.stylesDeclaration = styles ? {
        nodes: (_styles$nodes = styles.nodes) !== null && _styles$nodes !== void 0 ? _styles$nodes : DEFAULT_STYLES$1.nodes,
        edges: (_styles$edges = styles.edges) !== null && _styles$edges !== void 0 ? _styles$edges : DEFAULT_STYLES$1.edges,
        stage: styles.stage
      } : DEFAULT_STYLES$1;
      _this.nodeReducer = nodeReducer !== null && nodeReducer !== void 0 ? nodeReducer : null;
      _this.edgeReducer = edgeReducer !== null && edgeReducer !== void 0 ? edgeReducer : null;
      var nodeStyleAnalysis = analyzeStyleDeclaration(_this.stylesDeclaration.nodes);
      if (_this.nodeReducer) nodeStyleAnalysis.dependency = "graph-state";
      _this.edgeStyleAnalysis = analyzeStyleDeclaration(_this.stylesDeclaration.edges);
      if (_this.edgeReducer) _this.edgeStyleAnalysis.dependency = "graph-state";
      if (_this.stylesDeclaration.stage) {
        _this.resolvedStageStyle = evaluateStageStyle(_this.stylesDeclaration.stage, _this.stateManager.graphState);
      }
      var resolvedSettings = resolveSettings(settings);
      validateSettings(resolvedSettings);
      if (resolvedSettings.enableNodeDrag) {
        var xAttribute = nodeStyleAnalysis.xAttribute, yAttribute = nodeStyleAnalysis.yAttribute;
        if ((!xAttribute || !yAttribute) && !resolvedSettings.dragPositionToAttributes) {
          throw new Error('Sigma: `enableNodeDrag` is true but position attribute names could not be inferred from styles. Either use attribute bindings for x/y in your node styles (e.g. `x: { attribute: "x" }`), or provide a `dragPositionToAttributes` setting.');
        }
      }
      validateGraph(graph);
      if (!(container instanceof HTMLElement)) throw new Error("Sigma: container should be an html element.");
      _this.container = container;
      _this.edgeGroups = new EdgeGroupIndex(graph, function(edges, count) {
        for (var i = 0; i < edges.length; i++) {
          var state = _this.stateManager.getEdgeState(edges[i]);
          state.parallelIndex = i;
          state.parallelCount = count;
        }
      });
      var dragManager = new DragManager(graph, _this.viewportToGraph.bind(_this), _this.setNodesState.bind(_this), function(event, payload) {
        return _this.emit(event, payload);
      });
      _this.depthLayers = (_resolvedPrimitives$d = resolvedPrimitives.depthLayers) !== null && _resolvedPrimitives$d !== void 0 ? _resolvedPrimitives$d : _toConsumableArray(DEFAULT_DEPTH_LAYERS);
      if (!(styles !== null && styles !== void 0 && styles.nodes) && !DEFAULT_NODE_DEPTH_LAYERS.every(function(layer) {
        return _this.depthLayers.includes(layer);
      })) throw new Error("Sigma: depthLayers must include ".concat(DEFAULT_NODE_DEPTH_LAYERS.join(", "), " for the built-in node styles."));
      if (!(styles !== null && styles !== void 0 && styles.edges) && !DEFAULT_EDGE_DEPTH_LAYERS.every(function(layer) {
        return _this.depthLayers.includes(layer);
      })) throw new Error("Sigma: depthLayers must include ".concat(DEFAULT_EDGE_DEPTH_LAYERS.join(", "), " for the built-in edge styles."));
      _this.itemBuckets = {
        nodes: new DepthBucketCollection(_this.depthLayers),
        edges: new DepthBucketCollection(_this.depthLayers)
      };
      _this.initWebGLContext();
      _this.mouseLayer = createElement("div", {
        position: "absolute",
        touchAction: "none",
        userSelect: "none"
      }, {
        "class": "sigma-mouse"
      });
      _this.container.appendChild(_this.mouseLayer);
      if (_this.resolvedStageStyle.background) {
        _this.container.style.backgroundColor = _this.resolvedStageStyle.background;
      }
      if (_this.resolvedStageStyle.cursor) {
        _this.container.style.cursor = _this.resolvedStageStyle.cursor;
      }
      var nodeDataTexture = new NodeDataTexture(_this.webGLContext);
      var nodeFrameTexture = new FrameTexture(_this.webGLContext, {
        channels: 1
      });
      var edgeDataTexture = new EdgeDataTexture(_this.webGLContext);
      var edgeFrameTexture = new FrameTexture(_this.webGLContext, {
        channels: 4
      });
      var gl = _this.webGLContext;
      var hoverResolver = new HoverResolver({
        gl,
        getFrameBuffer: function getFrameBuffer() {
          return _this.pickingFrameBuffer;
        },
        getPixelRatio: function getPixelRatio2() {
          return _this.internals.pixelRatio;
        },
        getDownSizingRatio: function getDownSizingRatio() {
          return _this.internals.settings.pickingDownSizingRatio;
        },
        isRenderPending: function isRenderPending() {
          return _this.renderFrame !== null;
        },
        onIndex: function onIndex(index, event) {
          var _this$pickingState$lo;
          return updateHover(_this.internals, (_this$pickingState$lo = _this.pickingState.lookup[index]) !== null && _this$pickingState$lo !== void 0 ? _this$pickingState$lo : null, event);
        }
      });
      var programs = _this.initPrograms(resolvedPrimitives, resolvedSettings);
      var labelAttachments = resolvedPrimitives === null || resolvedPrimitives === void 0 || (_resolvedPrimitives$n = resolvedPrimitives.nodes) === null || _resolvedPrimitives$n === void 0 ? void 0 : _resolvedPrimitives$n.labelAttachments;
      var attachmentManager = null;
      if (labelAttachments && Object.keys(labelAttachments).length > 0) {
        attachmentManager = new AttachmentManager(gl, labelAttachments, function() {
          return _this.scheduleRender();
        });
      }
      _this.internals = _objectSpread2(_objectSpread2({
        nodeDataCache: {},
        edgeDataCache: {},
        nodesWithForcedLabels: /* @__PURE__ */ new Set(),
        nodesWithBackdrop: /* @__PURE__ */ new Set(),
        edgesWithForcedLabels: /* @__PURE__ */ new Set(),
        settings: resolvedSettings,
        primitives: resolvedPrimitives,
        pixelRatio: getPixelRatio(),
        graph,
        stateManager: _this.stateManager,
        dragManager,
        hoverResolver,
        nodeStyleAnalysis,
        pickingState: _this.pickingState
      }, programs), {}, {
        attachmentManager,
        nodeDataTexture,
        nodeFrameTexture,
        edgeDataTexture,
        edgeFrameTexture,
        getDimensions: function getDimensions() {
          return _this.getDimensions();
        },
        getGraphDimensions: function getGraphDimensions() {
          return _this.getGraphDimensions();
        },
        getStagePadding: function getStagePadding() {
          return _this.getStagePadding();
        },
        getCameraState: function getCameraState() {
          return _this.camera.getState();
        },
        getHitAtPosition: function getHitAtPosition(pos) {
          return _this.getHitAtPosition(pos);
        },
        setNodeState: function setNodeState(key, state) {
          return _this.setNodeState(key, state);
        },
        setEdgeState: function setEdgeState(key, state) {
          return _this.setEdgeState(key, state);
        },
        updateContainerCursor: function updateContainerCursor() {
          return _this.updateContainerCursor();
        },
        scheduleRefresh: function scheduleRefresh() {
          return _this.scheduleRefresh();
        },
        viewportToFramedGraph: function viewportToFramedGraph(coords) {
          return _this.viewportToFramedGraph(coords);
        },
        viewportToGraph: function viewportToGraph(coords) {
          return _this.viewportToGraph(coords);
        },
        framedGraphToViewport: function framedGraphToViewport2(coords) {
          return _this.framedGraphToViewport(coords);
        },
        scaleSize: function scaleSize(size) {
          return _this.scaleSize(size);
        },
        emit: function emit(event, payload) {
          return _this.emit(event, payload);
        }
      });
      _this.labelRenderer = new LabelRenderer(_this.internals);
      _this.resize();
      _this.initializeWebGLLabels();
      _this.camera = new Camera();
      _this.bindCameraHandlers();
      _this.mouseCaptor = new MouseCaptor(_this.mouseLayer, _this);
      _this.mouseCaptor.setSettings(_this.internals.settings);
      _this.touchCaptor = new TouchCaptor(_this.mouseLayer, _this);
      _this.touchCaptor.setSettings(_this.internals.settings);
      _this.bindEventHandlers();
      _this.bindGraphHandlers();
      _this.handleSettingsUpdate();
      _this.refresh();
      return _this;
    }
    _inherits(Sigma2, _TypedEventEmitter);
    return _createClass(Sigma2, [{
      key: "initializeWebGLLabels",
      value: function initializeWebGLLabels() {
        this.sdfAtlas = new SDFAtlasManager();
        this.sdfAtlas.registerFont({
          family: "sans-serif",
          weight: "normal",
          style: "normal"
        });
      }
      /**
       * Method (re)binding WebGL textures and buffers for the picking framebuffer.
       * The picking framebuffer can be at reduced resolution for performance.
       *
       * @return {Sigma}
       */
    }, {
      key: "resetWebGLTexture",
      value: function resetWebGLTexture() {
        var gl = this.webGLContext;
        if (!this.pickingFrameBuffer) return this;
        var pickingWidth = Math.ceil(this.width * this.internals.pixelRatio / this.internals.settings.pickingDownSizingRatio);
        var pickingHeight = Math.ceil(this.height * this.internals.pixelRatio / this.internals.settings.pickingDownSizingRatio);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickingFrameBuffer);
        if (this.pickingTexture) gl.deleteTexture(this.pickingTexture);
        var pickingTexture = gl.createTexture();
        if (pickingTexture) {
          gl.bindTexture(gl.TEXTURE_2D, pickingTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pickingWidth, pickingHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pickingTexture, 0);
          this.pickingTexture = pickingTexture;
        }
        if (this.pickingDepthBuffer) gl.deleteRenderbuffer(this.pickingDepthBuffer);
        var depthBuffer = gl.createRenderbuffer();
        if (depthBuffer) {
          gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
          gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, pickingWidth, pickingHeight);
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
          this.pickingDepthBuffer = depthBuffer;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        return this;
      }
      /**
       * Method binding camera handlers.
       *
       * @return {Sigma}
       */
    }, {
      key: "bindCameraHandlers",
      value: function bindCameraHandlers() {
        var _this2 = this;
        this.activeListeners.camera = function() {
          _this2.refreshMatrices();
          _this2.labelRenderer.labelsDirty = true;
          _this2.scheduleRender();
        };
        this.activeListeners.cameraAnimationStart = function(_ref) {
          var from = _ref.from, to = _ref.to;
          if (from.ratio !== to.ratio) _this2.stateManager.setGraphState({
            isZooming: true
          });
        };
        this.activeListeners.cameraAnimationEnd = function() {
          _this2.stateManager.setGraphState({
            isZooming: false
          });
        };
        this.camera.on("updated", this.activeListeners.camera);
        this.camera.on("animationStart", this.activeListeners.cameraAnimationStart);
        this.camera.on("animationEnd", this.activeListeners.cameraAnimationEnd);
        return this;
      }
      /**
       * Method unbinding camera handlers.
       *
       * @return {Sigma}
       */
    }, {
      key: "unbindCameraHandlers",
      value: function unbindCameraHandlers() {
        this.camera.removeListener("updated", this.activeListeners.camera);
        this.camera.removeListener("animationStart", this.activeListeners.cameraAnimationStart);
        this.camera.removeListener("animationEnd", this.activeListeners.cameraAnimationEnd);
        return this;
      }
      /**
       * Returns the topmost pickable hit at a given viewport position, by reading
       * one pixel of the picking framebuffer and looking it up in the unified
       * picking table. Returns null if the pixel is empty.
       */
    }, {
      key: "getHitAtPosition",
      value: function getHitAtPosition(position) {
        var _this$pickingState$lo2;
        if (this.contextLost) return null;
        var gl = this.webGLContext;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickingFrameBuffer);
        var color = getPixelColor(gl, this.pickingFrameBuffer, position.x, position.y, this.internals.pixelRatio, this.internals.settings.pickingDownSizingRatio);
        var index = colorToIndex.apply(void 0, _toConsumableArray(color));
        return (_this$pickingState$lo2 = this.pickingState.lookup[index]) !== null && _this$pickingState$lo2 !== void 0 ? _this$pickingState$lo2 : null;
      }
    }, {
      key: "bindEventHandlers",
      value: function bindEventHandlers() {
        bindInteractionHandlers(this.internals, this.mouseCaptor, this.touchCaptor, this.activeListeners);
        return this;
      }
      /**
       * Method binding graph handlers
       *
       * @return {Sigma}
       */
    }, {
      key: "bindGraphHandlers",
      value: function bindGraphHandlers$1() {
        var _this3 = this;
        bindGraphHandlers({
          graph: this.internals.graph,
          edgeGroups: this.edgeGroups,
          updateNode: this.updateNode.bind(this),
          removeNode: this.removeNode.bind(this),
          addEdge: this.addEdge.bind(this),
          updateEdge: this.updateEdge.bind(this),
          removeEdge: this.removeEdge.bind(this),
          clearEdgeState: this.clearEdgeState.bind(this),
          clearNodeState: this.clearNodeState.bind(this),
          clearEdgeIndices: this.clearEdgeIndices.bind(this),
          clearNodeIndices: this.clearNodeIndices.bind(this),
          refresh: this.refresh.bind(this),
          scheduleProcess: function scheduleProcess() {
            _this3.pendingProcess = "full";
            _this3.scheduleRender();
          },
          markNodesDirty: function markNodesDirty(nodes) {
            if (_this3.internals.nodeStyleAnalysis.dependency !== "graph-state") return;
            _this3.stateManager.markNodesDirty(nodes);
          }
        }, this.activeListeners);
        return this;
      }
      /**
       * Method used to unbind handlers from the graph.
       *
       * @return {undefined}
       */
    }, {
      key: "unbindGraphHandlers",
      value: function unbindGraphHandlers$1() {
        unbindGraphHandlers(this.internals.graph, this.activeListeners);
      }
    }, {
      key: "getNodeShapeId",
      value: function getNodeShapeId(data) {
        if (this.internals.nodeShapeMap && this.internals.nodeGlobalShapeIds && data.shape && data.shape in this.internals.nodeShapeMap) {
          return this.internals.nodeGlobalShapeIds[this.internals.nodeShapeMap[data.shape]];
        }
        return getShapeId(data.shape || "circle");
      }
      /**
       * Processes all node data: normalizes coordinates, rebuilds the label grid,
       * updates the node data texture and vertex buffer. Returns true if any
       * node's visibility changed since the last process cycle (which means edges
       * must also be reprocessed).
       */
    }, {
      key: "processNodes",
      value: function processNodes() {
        var _this4 = this;
        var graph = this.internals.graph;
        var settings = this.internals.settings;
        var dimensions = this.getDimensions();
        var autoRescale = settings.autoRescale, autoRescaleContent = settings.autoRescaleContent;
        var nodeExtent = this.nodeExtent;
        if (autoRescale === false) {
          var width = dimensions.width, height = dimensions.height;
          nodeExtent = {
            x: [-width / 2, width / 2],
            y: [-height / 2, height / 2]
          };
        } else if (autoRescale !== "once" || !this.autoRescaleFrozen) {
          nodeExtent = this.computeNodeExtent();
          if (autoRescaleContent !== "positions" && !this.customBBox) nodeExtent = computeFittedExtent({
            extent: nodeExtent,
            coords: this.nodeGraphCoords,
            nodeData: this.internals.nodeDataCache,
            dimensions,
            stagePadding: this.getStagePadding(),
            zoomToSizeRatioFunction: settings.zoomToSizeRatioFunction,
            itemSizesReference: settings.itemSizesReference,
            fitLabels: autoRescaleContent === "labels",
            nodeLabelBox: function nodeLabelBox(data2, radius) {
              return _this4.labelRenderer.nodeLabelBox(data2, radius);
            }
          });
          if (autoRescale === "once") this.autoRescaleFrozen = true;
        }
        this.nodeExtent = nodeExtent;
        this.normalizationFunction = createNormalizationFunction(this.customBBox || this.nodeExtent);
        var nullCamera = new Camera();
        var nullCameraMatrix = matrixFromCamera(nullCamera.getState(), dimensions, this.getGraphDimensions(), this.getStagePadding());
        this.labelRenderer.labelGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
        this.labelRenderer.edgeAnchorGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
        var fillEdgeAnchorGrid = settings.renderEdgeLabels && settings.edgeLabelAnchors === "allNodes";
        var visibilityChanged = false;
        resetKind(this.pickingState, "node");
        var nodes = graph.nodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
          var node = nodes[i];
          var data = this.internals.nodeDataCache[node];
          var graphCoords = this.nodeGraphCoords[node];
          data.x = graphCoords.x;
          data.y = graphCoords.y;
          this.normalizationFunction.applyTo(data);
          if (data.visibility !== this.prevNodeVisibilities[node]) visibilityChanged = true;
          if (typeof data.label === "string" && data.visibility !== "hidden" && data.labelVisibility !== "hidden") this.labelRenderer.labelGrid.add(node, data.size, this.framedGraphToViewport(data, {
            matrix: nullCameraMatrix
          }));
          if (fillEdgeAnchorGrid && data.visibility !== "hidden") this.labelRenderer.edgeAnchorGrid.add(node, data.size, this.framedGraphToViewport(data, {
            matrix: nullCameraMatrix
          }));
        }
        this.labelRenderer.labelGrid.organize();
        this.labelRenderer.edgeAnchorGrid.organize();
        this.nodeProgram.reallocate(nodes.length);
        var nodeProcessCount = 0;
        this.depthRanges.nodes = {};
        this.nodeBaseDepth = {};
        var nodeDataCache = this.internals.nodeDataCache;
        var _iterator = _createForOfIteratorHelper(this.depthLayers), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var depth = _step.value;
            var items = this.itemBuckets.nodes.getSorted(depth, function(k) {
              return nodeDataCache[k].zIndex;
            });
            if (items.length === 0) continue;
            this.depthRanges.nodes[depth] = [{
              offset: nodeProcessCount,
              count: items.length
            }];
            var _iterator3 = _createForOfIteratorHelper(items), _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                var _node = _step3.value;
                this.nodeBaseDepth[_node] = depth;
                registerItem(this.pickingState, "node", _node);
                this.addNodeToProgram(_node, nodeProcessCount++);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.nodeProgram.invalidateBuffers();
        for (var _i = 0, _l = nodes.length; _i < _l; _i++) {
          this.prevNodeVisibilities[nodes[_i]] = this.internals.nodeDataCache[nodes[_i]].visibility;
        }
        this.labelRenderer.processWebGLLabels(nodes);
        var _iterator2 = _createForOfIteratorHelper(this.customLayerPrograms.values()), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var program = _step2.value.program;
            if (program.cacheData) program.cacheData();
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return visibilityChanged;
      }
      /**
       * Processes all edge data: updates the edge data texture and vertex buffer.
       * Picking IDs are assigned by the picking allocator, which reserves edges
       * a contiguous range right after the node range.
       * Must be called after processNodes() so node texture indices are available.
       */
    }, {
      key: "processEdges",
      value: function processEdges() {
        var graph = this.internals.graph;
        var edges = graph.edges();
        this.edgeProgram.reallocate(edges.length);
        var edgeProcessCount = 0;
        resetKind(this.pickingState, "edge");
        this.depthRanges.edges = {};
        this.edgeBaseDepth = {};
        var edgeDataCache = this.internals.edgeDataCache;
        var _iterator4 = _createForOfIteratorHelper(this.depthLayers), _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var depth = _step4.value;
            var items = this.itemBuckets.edges.getSorted(depth, function(k) {
              return edgeDataCache[k].zIndex;
            });
            if (items.length === 0) continue;
            this.depthRanges.edges[depth] = [{
              offset: edgeProcessCount,
              count: items.length
            }];
            var _iterator5 = _createForOfIteratorHelper(items), _step5;
            try {
              for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                var edge = _step5.value;
                this.edgeBaseDepth[edge] = depth;
                registerItem(this.pickingState, "edge", edge);
                this.addEdgeToProgram(edge, edgeProcessCount++);
              }
            } catch (err) {
              _iterator5.e(err);
            } finally {
              _iterator5.f();
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        this.edgeProgram.invalidateBuffers();
      }
      /**
       * Update depth ranges when a node moves between depth layers without
       * reprocessing the program array.
       */
    }, {
      key: "updateNodeDepthRanges",
      value: function updateNodeDepthRanges(key, oldDepth, newDepth) {
        var position = this.nodeProgramIndex[key];
        if (position === void 0) return;
        removePositionFromDepthRanges(this.depthRanges.nodes, oldDepth, position);
        addPositionToDepthRanges(this.depthRanges.nodes, newDepth, position);
      }
      /**
       * Update depth ranges when an edge moves between depth layers without
       * reprocessing the program array.
       */
    }, {
      key: "updateEdgeDepthRanges",
      value: function updateEdgeDepthRanges(key, oldDepth, newDepth) {
        var position = this.edgeProgramIndex[key];
        if (position === void 0) return;
        removePositionFromDepthRanges(this.depthRanges.edges, oldDepth, position);
        addPositionToDepthRanges(this.depthRanges.edges, newDepth, position);
      }
      /**
       * Method that backports potential settings updates where it's needed.
       * @private
       */
    }, {
      key: "handleSettingsUpdate",
      value: function handleSettingsUpdate() {
        var _this5 = this;
        var settings = this.internals.settings;
        this.camera.minRatio = settings.minCameraRatio;
        this.camera.maxRatio = settings.maxCameraRatio;
        this.camera.enabledZooming = settings.enableCameraZooming;
        this.camera.enabledPanning = settings.enableCameraPanning;
        this.camera.enabledRotation = settings.enableCameraRotation;
        if (settings.cameraPanBoundaries) {
          this.camera.constrainState = function(state) {
            return _this5.cleanCameraState(state, settings.cameraPanBoundaries && _typeof(settings.cameraPanBoundaries) === "object" ? settings.cameraPanBoundaries : {});
          };
        } else {
          this.camera.constrainState = null;
        }
        this.camera.setState(this.camera.getState());
        this.mouseLayer.style.touchAction = settings.gestureTarget === "graph" ? "none" : settings.gestureTarget === "shared" ? "pan-x pan-y" : "auto";
        if (settings.gestureTarget !== "shared" && this.gestureHint) {
          this.gestureHint.kill();
          this.gestureHint = null;
        }
        this.mouseCaptor.setSettings(this.internals.settings);
        this.touchCaptor.setSettings(this.internals.settings);
        return this;
      }
    }, {
      key: "cleanCameraState",
      value: function cleanCameraState(state) {
        var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$tolerance = _ref2.tolerance, tolerance = _ref2$tolerance === void 0 ? 0 : _ref2$tolerance, boundaries = _ref2.boundaries;
        var newState = _objectSpread2({}, state);
        var _ref3 = boundaries || this.nodeExtent, _ref3$x = _slicedToArray(_ref3.x, 2), xMinGraph = _ref3$x[0], xMaxGraph = _ref3$x[1], _ref3$y = _slicedToArray(_ref3.y, 2), yMinGraph = _ref3$y[0], yMaxGraph = _ref3$y[1];
        var corners = [this.graphToViewport({
          x: xMinGraph,
          y: yMinGraph
        }, {
          cameraState: state
        }), this.graphToViewport({
          x: xMaxGraph,
          y: yMinGraph
        }, {
          cameraState: state
        }), this.graphToViewport({
          x: xMinGraph,
          y: yMaxGraph
        }, {
          cameraState: state
        }), this.graphToViewport({
          x: xMaxGraph,
          y: yMaxGraph
        }, {
          cameraState: state
        })];
        var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
        corners.forEach(function(_ref4) {
          var x = _ref4.x, y = _ref4.y;
          xMin = Math.min(xMin, x);
          xMax = Math.max(xMax, x);
          yMin = Math.min(yMin, y);
          yMax = Math.max(yMax, y);
        });
        var graphWidth = xMax - xMin;
        var graphHeight = yMax - yMin;
        var _this$getDimensions = this.getDimensions(), width = _this$getDimensions.width, height = _this$getDimensions.height;
        var dx = 0;
        var dy = 0;
        if (graphWidth >= width) {
          if (xMax < width - tolerance) dx = xMax - (width - tolerance);
          else if (xMin > tolerance) dx = xMin - tolerance;
        } else {
          if (xMax > width + tolerance) dx = xMax - (width + tolerance);
          else if (xMin < -tolerance) dx = xMin + tolerance;
        }
        if (graphHeight >= height) {
          if (yMax < height - tolerance) dy = yMax - (height - tolerance);
          else if (yMin > tolerance) dy = yMin - tolerance;
        } else {
          if (yMax > height + tolerance) dy = yMax - (height + tolerance);
          else if (yMin < -tolerance) dy = yMin + tolerance;
        }
        if (dx || dy) {
          var origin = this.viewportToFramedGraph({
            x: 0,
            y: 0
          }, {
            cameraState: state
          });
          var delta = this.viewportToFramedGraph({
            x: dx,
            y: dy
          }, {
            cameraState: state
          });
          dx = delta.x - origin.x;
          dy = delta.y - origin.y;
          newState.x += dx;
          newState.y += dy;
        }
        return newState;
      }
      /**
       * Refreshes the cached matrices and their derived ratios from the current camera state, viewport, graph dimensions
       * and stage padding.
       */
    }, {
      key: "refreshMatrices",
      value: function refreshMatrices() {
        var cameraState = this.camera.getState();
        var viewportDimensions = this.getDimensions();
        var graphDimensions = this.getGraphDimensions();
        var padding = this.getStagePadding();
        this.matrix = matrixFromCamera(cameraState, viewportDimensions, graphDimensions, padding);
        this.invMatrix = matrixFromCamera(cameraState, viewportDimensions, graphDimensions, padding, true);
        this.correctionRatio = getMatrixImpact(this.matrix, cameraState, viewportDimensions);
        this.graphToViewportRatio = this.getGraphToViewportRatio();
      }
      /**
       * Rebuilds the node/edge program buffers from the data caches. Runs whenever
       * `pendingProcess` is set: on a structural change, or when refreshState()
       * escalates an in-place refresh that changed an item's render order.
       */
    }, {
      key: "processData",
      value: function processData() {
        var _this$internals$attac;
        this.emit("beforeProcess");
        (_this$internals$attac = this.internals.attachmentManager) === null || _this$internals$attac === void 0 || _this$internals$attac.clear();
        var previousIds = _objectSpread2({}, this.pickingState.idsByKind);
        var visibilityChanged = this.processNodes();
        if (this.pendingProcess === "full" || visibilityChanged) this.processEdges();
        allocateLabelIds(this.pickingState, this.internals);
        if (!samePickingAllocation(previousIds, this.pickingState.idsByKind)) this.internals.hoverResolver.invalidate();
        this.pendingProcess = "none";
        this.emit("afterProcess");
      }
      /**
       * Method used to render.
       *
       * @return {Sigma}
       */
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;
        if (this.contextLost) return this;
        this.emit("beforeRender");
        var exitRender = function exitRender2() {
          _this6.internals.hoverResolver.frameRendered();
          _this6.emit("afterRender");
          return _this6;
        };
        if (this.renderFrame) {
          cancelAnimationFrame(this.renderFrame);
          this.renderFrame = null;
        }
        this.resize();
        if (this.pendingProcess !== "none" || this.needToRefreshState) this.labelRenderer.labelsDirty = true;
        if (this.pendingProcess !== "none") this.processData();
        if (this.needToRefreshState) this.refreshState();
        this.needToRefreshState = false;
        this.stateManager.clearDirtyTracking();
        if (this.pendingProcess !== "none") this.processData();
        this.clear();
        this.resetWebGLTexture();
        if (!this.internals.graph.order) return exitRender();
        var mouseCaptor = this.mouseCaptor;
        var moving = this.camera.isAnimating() || mouseCaptor.isMoving || mouseCaptor.draggedEvents || mouseCaptor.currentWheelDirection;
        this.refreshMatrices();
        this.frameId++;
        if (this.internals.settings.renderEdgeLabels && !this.internals.edgeLabelProgram) {
          var _this$createEdgeLabel = this.createEdgeLabelPrograms(), labelProgram = _this$createEdgeLabel.labelProgram, labelBackgroundProgram = _this$createEdgeLabel.labelBackgroundProgram;
          this.internals.edgeLabelProgram = labelProgram;
          this.internals.edgeLabelBackgroundProgram = labelBackgroundProgram;
        }
        var debugPrograms = this.internals.settings.DEBUG_logRenderStats ? this.getDebugPrograms() : null;
        if (debugPrograms) debugPrograms.forEach(function(program2) {
          return program2.resetDebugStats();
        });
        if (this.internals.settings.DEBUG_gpuTimerQueries) this.beginGpuTimerQuery();
        this.internals.nodeFrameTexture.ensureCapacity(this.internals.nodeDataTexture.getCapacity());
        this.internals.edgeFrameTexture.ensureCapacity(this.internals.edgeDataTexture.getCapacity());
        var params = this.getRenderParams();
        var edgeParams = KIND_REGISTRY.edge.writesPickingThisFrame(this.internals) ? params : _objectSpread2(_objectSpread2({}, params), {}, {
          pickingFrameBuffer: null
        });
        this.labelRenderer.resetFrame();
        var gl = this.webGLContext;
        var pickingWidth = Math.ceil(this.width * this.internals.pixelRatio / this.internals.settings.pickingDownSizingRatio);
        var pickingHeight = Math.ceil(this.height * this.internals.pixelRatio / this.internals.settings.pickingDownSizingRatio);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.pickingFrameBuffer);
        gl.viewport(0, 0, pickingWidth, pickingHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width * this.internals.pixelRatio, this.height * this.internals.pixelRatio);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.internals.nodeDataTexture.upload();
        this.internals.edgeDataTexture.upload();
        this.nodeProgram.uploadLayerTexture();
        this.edgeProgram.uploadAttributeTexture();
        this.emit("afterTexturesUpload");
        this.internals.nodeDataTexture.bind(NODE_DATA_TEXTURE_UNIT);
        this.internals.edgeDataTexture.bind(EDGE_DATA_TEXTURE_UNIT);
        this.edgeFramePass.run(params, this.internals.edgeFrameTexture, this.internals.edgeDataTexture.getHighWaterMark(), this.edgeProgram.getAttributeTexture(), this.nodeProgram.getAttributeTexture());
        this.internals.edgeFrameTexture.bind(EDGE_FRAME_TEXTURE_UNIT);
        if (this.internals.settings.renderLabels) {
          this.labelRenderer.computeDisplayedNodeLabels();
          var _this$labelRenderer$b = this.labelRenderer.buildFramePassPoints(), data = _this$labelRenderer$b.data, count = _this$labelRenderer$b.count;
          this.nodeFramePass.run(data, count, this.internals.nodeFrameTexture, params, this.nodeProgram.getAttributeTexture());
          this.internals.nodeFrameTexture.bind(NODE_FRAME_TEXTURE_UNIT);
        }
        if (this.internals.settings.renderEdgeLabels) {
          this.labelRenderer.computeDisplayedEdgeLabels();
        }
        var _iterator6 = _createForOfIteratorHelper(this.customLayerPrograms.values()), _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
            var program = _step6.value.program;
            if (program.preRender) program.preRender(params);
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.width * this.internals.pixelRatio, this.height * this.internals.pixelRatio);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        var showLabels = !this.internals.settings.hideLabelsOnMove || !moving;
        var _iterator7 = _createForOfIteratorHelper(this.depthLayers), _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
            var depth = _step7.value;
            var _iterator8 = _createForOfIteratorHelper(this.customLayerPrograms.values()), _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                var customLayer = _step8.value;
                if (customLayer.depth === depth) customLayer.program.render(params);
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
            var edgeRanges = this.depthRanges.edges[depth];
            if (edgeRanges && (!this.internals.settings.hideEdgesOnMove || !moving)) {
              var _iterator9 = _createForOfIteratorHelper(edgeRanges), _step9;
              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
                  var _step9$value = _step9.value, offset = _step9$value.offset, _count = _step9$value.count;
                  if (_count > 0) this.edgeProgram.render(edgeParams, offset, _count);
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }
            }
            if (this.internals.settings.renderEdgeLabels && showLabels) {
              this.labelRenderer.renderEdgeLabelBackgrounds(KIND_REGISTRY.edgeLabel.writesPickingThisFrame(this.internals) ? params : _objectSpread2(_objectSpread2({}, params), {}, {
                pickingFrameBuffer: null
              }), depth);
              this.labelRenderer.renderEdgeLabels(params, depth);
            }
            this.labelRenderer.cacheAttachments(depth);
            this.labelRenderer.renderBackdrops(_objectSpread2(_objectSpread2({}, params), {}, {
              pickingFrameBuffer: null
            }), depth);
            var nodeRanges = this.depthRanges.nodes[depth];
            if (nodeRanges) {
              var _iterator0 = _createForOfIteratorHelper(nodeRanges), _step0;
              try {
                for (_iterator0.s(); !(_step0 = _iterator0.n()).done; ) {
                  var _step0$value = _step0.value, _offset = _step0$value.offset, _count2 = _step0$value.count;
                  if (_count2 > 0) this.nodeProgram.render(params, _offset, _count2);
                }
              } catch (err) {
                _iterator0.e(err);
              } finally {
                _iterator0.f();
              }
            }
            if (!showLabels) continue;
            this.labelRenderer.renderAttachments(_objectSpread2(_objectSpread2({}, params), {}, {
              pickingFrameBuffer: null
            }), depth);
            this.labelRenderer.renderLabelBackgrounds(KIND_REGISTRY.nodeLabel.writesPickingThisFrame(this.internals) ? params : _objectSpread2(_objectSpread2({}, params), {}, {
              pickingFrameBuffer: null
            }), depth);
            if (this.internals.settings.renderLabels) {
              this.labelRenderer.renderWebGLLabels(params, depth);
            }
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
        this.labelRenderer.labelsDirty = false;
        if (this.internals.settings.DEBUG_displayPickingLayer) {
          gl.bindFramebuffer(gl.READ_FRAMEBUFFER, this.pickingFrameBuffer);
          gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
          gl.blitFramebuffer(0, 0, pickingWidth, pickingHeight, 0, 0, this.width * this.internals.pixelRatio, this.height * this.internals.pixelRatio, gl.COLOR_BUFFER_BIT, gl.NEAREST);
        }
        if (this.internals.settings.DEBUG_gpuTimerQueries) this.endGpuTimerQuery();
        this.pollGpuTimerQueries();
        if (debugPrograms) this.logRenderStats(debugPrograms);
        return exitRender();
      }
      /** DEBUG_logShaders / DEBUG_logRenderStats: every built-in Program instance sigma owns this frame. */
    }, {
      key: "getDebugPrograms",
      value: function getDebugPrograms() {
        return [this.nodeProgram, this.edgeProgram, this.internals.labelProgram, this.internals.edgeLabelProgram, this.internals.edgeLabelBackgroundProgram, this.internals.backdropProgram, this.internals.labelBackgroundProgram, this.internals.attachmentProgram].filter(function(program) {
          return program !== null;
        });
      }
      /** DEBUG_logRenderStats: logs this frame's counters as a table, keyed by program class name. */
    }, {
      key: "logRenderStats",
      value: function logRenderStats(programs) {
        var rows = {};
        var _iterator1 = _createForOfIteratorHelper(programs), _step1;
        try {
          for (_iterator1.s(); !(_step1 = _iterator1.n()).done; ) {
            var program = _step1.value;
            rows[program.constructor.name] = _objectSpread2({}, program.debugStats);
          }
        } catch (err) {
          _iterator1.e(err);
        } finally {
          _iterator1.f();
        }
        console.log("[sigma] DEBUG_logRenderStats: frame #".concat(this.frameId));
        console.table(rows);
      }
      /**
       * DEBUG_gpuTimerQueries: lazily resolves EXT_disjoint_timer_query_webgl2. Returns
       * null (and warns once) if the browser/driver doesn't support it.
       */
    }, {
      key: "getGpuTimerExtension",
      value: function getGpuTimerExtension() {
        if (this.gpuTimerExt === void 0) {
          this.gpuTimerExt = this.webGLContext.getExtension("EXT_disjoint_timer_query_webgl2");
          if (!this.gpuTimerExt) {
            console.warn("Sigma: DEBUG_gpuTimerQueries is enabled, but this browser/driver doesn't support EXT_disjoint_timer_query_webgl2.");
          }
        }
        return this.gpuTimerExt;
      }
      /** DEBUG_gpuTimerQueries: starts a query wrapping every GL call until `endGpuTimerQuery`. */
    }, {
      key: "beginGpuTimerQuery",
      value: function beginGpuTimerQuery() {
        var ext = this.getGpuTimerExtension();
        if (!ext) return;
        var gl = this.webGLContext;
        var query = gl.createQuery();
        if (!query) return;
        gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
        this.activeGpuTimerQuery = query;
      }
      /** DEBUG_gpuTimerQueries: closes the query started by `beginGpuTimerQuery` and queues it for polling. */
    }, {
      key: "endGpuTimerQuery",
      value: function endGpuTimerQuery() {
        if (!this.gpuTimerExt || !this.activeGpuTimerQuery) return;
        this.webGLContext.endQuery(this.gpuTimerExt.TIME_ELAPSED_EXT);
        this.pendingGpuTimerQueries.push({
          query: this.activeGpuTimerQuery,
          frameId: this.frameId
        });
        this.activeGpuTimerQuery = null;
      }
      /**
       * DEBUG_gpuTimerQueries: results typically aren't ready the same frame they're
       * queried, so this drains whichever queued queries have resolved by now.
       */
    }, {
      key: "pollGpuTimerQueries",
      value: function pollGpuTimerQueries() {
        if (this.pendingGpuTimerQueries.length === 0) return;
        var gl = this.webGLContext;
        var ext = this.gpuTimerExt;
        if (!ext) {
          this.pendingGpuTimerQueries.forEach(function(_ref5) {
            var query = _ref5.query;
            return gl.deleteQuery(query);
          });
          this.pendingGpuTimerQueries = [];
          return;
        }
        var disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);
        var stillPending = [];
        var _iterator10 = _createForOfIteratorHelper(this.pendingGpuTimerQueries), _step10;
        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
            var pending = _step10.value;
            if (!gl.getQueryParameter(pending.query, gl.QUERY_RESULT_AVAILABLE)) {
              stillPending.push(pending);
              continue;
            }
            if (!disjoint) {
              var elapsedNs = gl.getQueryParameter(pending.query, gl.QUERY_RESULT);
              console.log("[sigma] DEBUG_gpuTimerQueries: frame #".concat(pending.frameId, " GPU time = ").concat((elapsedNs / 1e6).toFixed(2), "ms"));
            }
            gl.deleteQuery(pending.query);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
        this.pendingGpuTimerQueries = stillPending;
      }
      /**
       * Applies position fallback and state fields after evaluateNodeStyle.
       * evaluateNodeStyle writes style properties directly into `data`; this patches
       * the remaining fields that come from attributes or state, not from style rules.
       */
    }, {
      key: "postEvaluateNode",
      value: function postEvaluateNode(data, attrs, nodeState) {
        var d = data;
        if (d.x === void 0) d.x = attrs.x;
        if (d.y === void 0) d.y = attrs.y;
        data.highlighted = nodeState.isHighlighted;
        for (var i = 0, l = this.nodeVariableEntries.length; i < l; i++) {
          var _ref6, _d$varName;
          var _this$nodeVariableEnt = _slicedToArray(this.nodeVariableEntries[i], 2), varName = _this$nodeVariableEnt[0], varDef = _this$nodeVariableEnt[1];
          d[varName] = (_ref6 = (_d$varName = d[varName]) !== null && _d$varName !== void 0 ? _d$varName : attrs[varName]) !== null && _ref6 !== void 0 ? _ref6 : varDef["default"];
        }
      }
      /**
       * Add a node in the internal data structures.
       * @private
       * @param key The node's graphology ID
       */
    }, {
      key: "addNode",
      value: function addNode2(key) {
        var attrs = this.internals.graph.getNodeAttributes(key);
        var nodeState = this.stateManager.getNodeState(key);
        var data = this.internals.nodeDataCache[key] || {};
        evaluateNodeStyle(this.stylesDeclaration.nodes, attrs, nodeState, this.stateManager.graphState, this.internals.graph, data);
        this.postEvaluateNode(data, attrs, nodeState);
        if (this.nodeReducer) {
          var reduced = this.nodeReducer(key, data, attrs, nodeState, this.stateManager.graphState, this.internals.graph);
          data = _objectSpread2(_objectSpread2({}, data), reduced);
        }
        if (typeof data.x !== "number" || typeof data.y !== "number") {
          throw new Error('Sigma: could not find a valid position (x, y) for node "'.concat(key, '". ') + "Provide coordinates via node attributes, styles, or a nodeReducer.");
        }
        if (this.internals.nodeShapeMap) {
          if (!data.shape || !(data.shape in this.internals.nodeShapeMap)) {
            data.shape = Object.keys(this.internals.nodeShapeMap)[0];
          }
        } else if (this.nodeShapeSlug) {
          data.shape = this.nodeShapeSlug;
        }
        this.internals.nodeDataCache[key] = data;
        this.nodeGraphCoords[key] = {
          x: data.x,
          y: data.y
        };
        setMembership(this.internals.nodesWithForcedLabels, key, hasForcedLabel(data));
        setMembership(this.internals.nodesWithBackdrop, key, hasBackdrop(data));
        this.itemBuckets.nodes.set(key, data.depth);
      }
      /**
       * Update a node in the internal data structures.
       * @private
       * @param key The node's graphology ID
       */
    }, {
      key: "updateNode",
      value: function updateNode(key) {
        this.addNode(key);
        var data = this.internals.nodeDataCache[key];
        this.normalizationFunction.applyTo(data);
      }
      /**
       * Remove a node from the internal data structures.
       * @private
       * @param key The node's graphology ID
       */
    }, {
      key: "removeNode",
      value: function removeNode(key) {
        unregisterItem(this.pickingState, "node", key);
        this.itemBuckets.nodes.remove(key);
        delete this.internals.nodeDataCache[key];
        delete this.nodeGraphCoords[key];
        delete this.nodeProgramIndex[key];
        this.internals.nodeDataTexture.free(key);
        this.internals.dragManager.removeNode(key);
        this.stateManager.removeNode(key);
        this.internals.nodesWithForcedLabels["delete"](key);
        this.internals.nodesWithBackdrop["delete"](key);
      }
      /**
       * Applies variable fallbacks after evaluateEdgeStyle.
       * evaluateEdgeStyle writes style properties directly into `data`; this patches
       * declared primitive variables with attribute or default fallbacks.
       */
    }, {
      key: "postEvaluateEdge",
      value: function postEvaluateEdge(data, attrs) {
        var d = data;
        for (var i = 0, l = this.edgeVariableEntries.length; i < l; i++) {
          var _ref7, _d$varName2;
          var _this$edgeVariableEnt = _slicedToArray(this.edgeVariableEntries[i], 2), varName = _this$edgeVariableEnt[0], varDef = _this$edgeVariableEnt[1];
          d[varName] = (_ref7 = (_d$varName2 = d[varName]) !== null && _d$varName2 !== void 0 ? _d$varName2 : attrs[varName]) !== null && _ref7 !== void 0 ? _ref7 : varDef["default"];
        }
      }
      /**
       * Computes and injects the spread variable for parallel edges.
       * Must be called after evaluateEdgeStyle since spread is geometry-derived, not styled.
       */
    }, {
      key: "applyEdgeSpread",
      value: function applyEdgeSpread(edge, data, edgeState) {
        var _data$parallelSpread;
        if (edgeState.parallelCount <= 1) return;
        var source = this.internals.graph.source(edge);
        var target = this.internals.graph.target(edge);
        var isSelfLoop = source === target;
        var pathName = isSelfLoop ? data.selfLoopPath || data.path : data.parallelPath || data.path;
        var path = pathName ? this.edgePathsByName.get(pathName) : void 0;
        if (!(path !== null && path !== void 0 && path.spread)) return;
        var spreadFactor = (_data$parallelSpread = data.parallelSpread) !== null && _data$parallelSpread !== void 0 ? _data$parallelSpread : 0.25;
        var spreadValue = path.spread.compute(edgeState.parallelIndex, edgeState.parallelCount, spreadFactor);
        if (!isSelfLoop && this.internals.graph.isDirected(edge) && source > target) {
          spreadValue = -spreadValue;
        }
        data[path.spread.variable] = spreadValue;
      }
      /**
       * Add an edge into the internal data structures.
       * @private
       * @param key The edge's graphology ID
       */
    }, {
      key: "addEdge",
      value: function addEdge2(key) {
        var attrs = this.internals.graph.getEdgeAttributes(key);
        var edgeState = this.stateManager.getEdgeState(key);
        var data = {};
        evaluateEdgeStyle(this.stylesDeclaration.edges, attrs, edgeState, this.stateManager.graphState, this.internals.graph, data);
        this.postEvaluateEdge(data, attrs);
        if (this.edgeReducer) {
          var reduced = this.edgeReducer(key, data, attrs, edgeState, this.stateManager.graphState, this.internals.graph);
          data = _objectSpread2(_objectSpread2({}, data), reduced);
        }
        this.applyEdgeSpread(key, data, edgeState);
        this.internals.edgeDataCache[key] = data;
        setMembership(this.internals.edgesWithForcedLabels, key, hasForcedLabel(data));
        this.itemBuckets.edges.set(key, data.depth);
      }
      /**
       * Update an edge in the internal data structures.
       * @private
       * @param key The edge's graphology ID
       */
    }, {
      key: "updateEdge",
      value: function updateEdge(key) {
        this.addEdge(key);
      }
      /**
       * Remove an edge from the internal data structures.
       * @private
       * @param key The edge's graphology ID
       */
    }, {
      key: "removeEdge",
      value: function removeEdge(key) {
        this.itemBuckets.edges.remove(key);
        delete this.internals.edgeDataCache[key];
        delete this.edgeProgramIndex[key];
        delete this.edgeTextureIndexCache[key];
        this.internals.edgeDataTexture.free(key);
        unregisterItem(this.pickingState, "edge", key);
        this.stateManager.removeEdge(key);
        this.internals.edgesWithForcedLabels["delete"](key);
      }
      /**
       * Clear all indices related to nodes.
       * @private
       */
    }, {
      key: "clearNodeIndices",
      value: function clearNodeIndices() {
        var _this$internals$nodeD;
        this.labelRenderer.resetLabelGrid();
        if (!this.autoRescaleFrozen) this.nodeExtent = {
          x: [0, 1],
          y: [0, 1]
        };
        this.internals.nodeDataCache = {};
        this.nodeGraphCoords = {};
        this.nodeProgramIndex = {};
        (_this$internals$nodeD = this.internals.nodeDataTexture) === null || _this$internals$nodeD === void 0 || _this$internals$nodeD.clear();
        this.internals.nodesWithForcedLabels.clear();
        this.internals.nodesWithBackdrop.clear();
        this.prevNodeVisibilities = {};
        this.itemBuckets.nodes.clearAll();
        this.depthRanges.nodes = {};
        this.nodeBaseDepth = {};
      }
      /**
       * Clear all indices related to edges.
       * @private
       */
    }, {
      key: "clearEdgeIndices",
      value: function clearEdgeIndices() {
        var _this$internals$edgeD;
        this.internals.edgeDataCache = {};
        this.edgeProgramIndex = {};
        this.edgeTextureIndexCache = {};
        (_this$internals$edgeD = this.internals.edgeDataTexture) === null || _this$internals$edgeD === void 0 || _this$internals$edgeD.clear();
        this.internals.edgesWithForcedLabels.clear();
        this.itemBuckets.edges.clearAll();
        this.depthRanges.edges = {};
        this.edgeBaseDepth = {};
        this.edgeGroups.clear();
      }
      /**
       * Clear all indices.
       * @private
       */
    }, {
      key: "clearIndices",
      value: function clearIndices() {
        this.clearEdgeIndices();
        this.clearNodeIndices();
      }
      /**
       * Clear all graph state related to nodes.
       * @private
       */
    }, {
      key: "clearNodeState",
      value: function clearNodeState() {
        this.labelRenderer.resetFrame();
        this.internals.nodesWithBackdrop.clear();
        this.internals.dragManager.clear();
        this.autoRescaleFrozen = false;
        this.stateManager.clearNodes();
        resetKind(this.pickingState, "node");
      }
      /**
       * Clear all graph state related to edges.
       * @private
       */
    }, {
      key: "clearEdgeState",
      value: function clearEdgeState() {
        this.labelRenderer.clearEdgeLabels();
        this.stateManager.clearEdges();
        resetKind(this.pickingState, "edge");
      }
      /**
       * Clear all graph state.
       * @private
       */
    }, {
      key: "clearState",
      value: function clearState() {
        this.clearEdgeState();
        this.clearNodeState();
        this.stateManager.resetGraphState();
      }
      /**
       * Add the node data to its program. The picking ID is looked up from the
       * picking state (callers shouldn't pass it).
       * @private
       * @param node The node's graphology ID
       * @param position The index where to place the node in the program
       */
    }, {
      key: "addNodeToProgram",
      value: function addNodeToProgram(node, position) {
        var _ref8;
        var data = this.internals.nodeDataCache[node];
        this.internals.nodeDataTexture.allocate(node);
        (_ref8 = this.internals.nodeDataTexture).updateNode.apply(_ref8, [node, data.x, data.y, data.size, this.getNodeShapeId(data)].concat(_toConsumableArray(nodeRotationFlags(data)), [data.color]));
        var textureIndex = this.internals.nodeDataTexture.getIndex(node);
        this.nodeProgram.process(pickingIdOf(this.pickingState, "node", node), position, data, textureIndex);
        this.nodeProgramIndex[node] = position;
      }
      /**
       * Add the edge data to its program. The picking ID is looked up from the
       * picking state (callers shouldn't pass it).
       * @private
       * @param edge The edge's graphology ID
       * @param position The index where to place the edge in the program
       */
    }, {
      key: "addEdgeToProgram",
      value: function addEdgeToProgram(edge, position) {
        var _this$stateManager$ge, _this$stateManager$ge2;
        var data = this.internals.edgeDataCache[edge];
        var source = this.internals.graph.source(edge);
        var target = this.internals.graph.target(edge);
        var edgeTextureIndex = this.internals.edgeDataTexture.allocate(edge);
        this.edgeTextureIndexCache[edge] = edgeTextureIndex;
        var isSelfLoop = source === target;
        var isParallel = !isSelfLoop && ((_this$stateManager$ge = (_this$stateManager$ge2 = this.stateManager.getEdgeState(edge)) === null || _this$stateManager$ge2 === void 0 ? void 0 : _this$stateManager$ge2.parallelCount) !== null && _this$stateManager$ge !== void 0 ? _this$stateManager$ge : 1) > 1;
        var _this$edgeProgram$res = this.edgeProgram.resolveEdgeIds(data, isSelfLoop, isParallel), pathId = _this$edgeProgram$res.pathId, headId = _this$edgeProgram$res.headId, tailId = _this$edgeProgram$res.tailId, headLengthRatio = _this$edgeProgram$res.headLengthRatio, tailLengthRatio = _this$edgeProgram$res.tailLengthRatio;
        this.internals.edgeDataTexture.updateEdge(edge, this.internals.nodeDataTexture.getIndex(source), this.internals.nodeDataTexture.getIndex(target), data.size, headLengthRatio, tailLengthRatio, pathId, headId, tailId);
        this.edgeProgram.process(pickingIdOf(this.pickingState, "edge", edge), position, this.internals.nodeDataCache[source], this.internals.nodeDataCache[target], data, edgeTextureIndex);
        this.edgeProgramIndex[edge] = position;
      }
      /**---------------------------------------------------------------------------
       * Public API.
       **---------------------------------------------------------------------------
       */
      /**
       * Function used to get the render params.
       *
       * @return {RenderParams}
       */
    }, {
      key: "getRenderParams",
      value: function getRenderParams() {
        return {
          frameId: this.frameId,
          matrix: this.matrix,
          invMatrix: this.invMatrix,
          width: this.width,
          height: this.height,
          pixelRatio: this.internals.pixelRatio,
          zoomRatio: this.camera.ratio,
          cameraAngle: this.camera.angle,
          sizeRatio: 1 / this.scaleSize(),
          correctionRatio: this.correctionRatio,
          downSizingRatio: this.internals.settings.pickingDownSizingRatio,
          minEdgeThickness: this.internals.settings.minEdgeThickness,
          antiAliasingFeather: this.internals.settings.antiAliasingFeather,
          nodePickingPadding: this.internals.settings.nodePickingPadding,
          edgePickingPadding: this.internals.settings.edgePickingPadding,
          labelPickingPadding: this.internals.settings.labelPickingPadding,
          nodeDataTextureUnit: NODE_DATA_TEXTURE_UNIT,
          nodeDataTextureWidth: this.internals.nodeDataTexture.getTextureWidth(),
          nodeFrameTextureUnit: NODE_FRAME_TEXTURE_UNIT,
          nodeFrameTextureWidth: this.internals.nodeFrameTexture.getTextureWidth(),
          edgeDataTextureUnit: EDGE_DATA_TEXTURE_UNIT,
          edgeDataTextureWidth: this.internals.edgeDataTexture.getTextureWidth(),
          edgeFrameTextureUnit: EDGE_FRAME_TEXTURE_UNIT,
          edgeFrameTextureWidth: this.internals.edgeFrameTexture.getTextureWidth(),
          pickingFrameBuffer: this.pickingFrameBuffer,
          labelPixelSnapping: this.internals.settings.labelPixelSnapping ? 1 : 0
        };
      }
      /**
       * Function used to retrieve the actual stage padding value.
       *
       * @return {number}
       */
    }, {
      key: "getStagePadding",
      value: function getStagePadding() {
        var _this$internals$setti = this.internals.settings, stagePadding = _this$internals$setti.stagePadding, autoRescale = _this$internals$setti.autoRescale;
        return autoRescale ? stagePadding || 0 : 0;
      }
      /**
       * Resolves a layer element by id, checking both built-in layers (stage,
       * mouse) and extra layers added via createLayer.
       */
    }, {
      key: "getLayerElement",
      value: function getLayerElement(id) {
        if (id === "mouse") return this.mouseLayer;
        var element = this.extraElements[id];
        if (!element) throw new Error('Sigma: layer "'.concat(id, '" does not exist'));
        return element;
      }
      /**
       * Initializes the main WebGL 2 context on the stage canvas, with picking
       * framebuffer.
       */
    }, {
      key: "initWebGLContext",
      value: function initWebGLContext() {
        var _this7 = this;
        var gl = this.createWebGLContext("stage");
        this.stageCanvas = this.extraElements.stage;
        this.webGLContext = gl;
        this.stageCanvas.addEventListener("webglcontextlost", function(event) {
          if (!_this7.webGLContext) return;
          event.preventDefault();
          _this7.contextLost = true;
          if (_this7.renderFrame) {
            cancelAnimationFrame(_this7.renderFrame);
            _this7.renderFrame = null;
          }
          _this7.gpuTimerExt = void 0;
          _this7.activeGpuTimerQuery = null;
          _this7.pendingGpuTimerQueries = [];
          _this7.emit("webglContextLost");
        });
        this.stageCanvas.addEventListener("webglcontextrestored", function() {
          requestAnimationFrame(function() {
            if (_this7.webGLContext && !_this7.webGLContext.isContextLost()) _this7.restoreWebGLContext();
          });
        });
        this.initPickingFramebuffer();
      }
      /**
       * (Re)creates the picking framebuffer, at construction and after a context
       * restore. It starts at 1x1, and resetWebGLTexture sizes it on each render.
       */
    }, {
      key: "initPickingFramebuffer",
      value: function initPickingFramebuffer() {
        var gl = this.webGLContext;
        var frameBuffer = gl.createFramebuffer();
        if (!frameBuffer) throw new Error("Sigma: cannot create picking frame buffer");
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        var pickingTexture = gl.createTexture();
        if (!pickingTexture) throw new Error("Sigma: cannot create picking texture");
        gl.bindTexture(gl.TEXTURE_2D, pickingTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, pickingTexture, 0);
        var depthBuffer = gl.createRenderbuffer();
        if (!depthBuffer) throw new Error("Sigma: cannot create picking depth buffer");
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 1, 1);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
          throw new Error("Sigma: picking framebuffer is not complete");
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        this.pickingFrameBuffer = frameBuffer;
        this.pickingTexture = pickingTexture;
        this.pickingDepthBuffer = depthBuffer;
      }
      /**
       * (Re)generates node and edge programs from primitives, at construction and
       * after a context restore. Returns the internals-bound programs.
       */
    }, {
      key: "initPrograms",
      value: function initPrograms(primitives, settings) {
        var sigma = this;
        var gl = this.webGLContext;
        var _generateNodeProgram = generateNodeProgram(gl, this.pickingFrameBuffer, sigma, primitives === null || primitives === void 0 ? void 0 : primitives.nodes, settings.antialiasNodes), nodeProgram = _generateNodeProgram.nodeProgram, labelProgram = _generateNodeProgram.labelProgram, backdropProgram = _generateNodeProgram.backdropProgram, labelBackgroundProgram = _generateNodeProgram.labelBackgroundProgram, attachmentProgram = _generateNodeProgram.attachmentProgram, framePass = _generateNodeProgram.framePass, nodeShapeSlug = _generateNodeProgram.shapeSlug, nodeShapeMap = _generateNodeProgram.shapeNameToIndex, nodeGlobalShapeIds = _generateNodeProgram.shapeGlobalIds, nodeVariables = _generateNodeProgram.variables;
        this.nodeProgram = nodeProgram;
        this.nodeFramePass = framePass;
        this.nodeVariableEntries = Object.entries(nodeVariables);
        if (nodeShapeSlug) this.nodeShapeSlug = nodeShapeSlug;
        var _generateEdgeProgram = generateEdgeProgram(gl, this.pickingFrameBuffer, sigma, primitives === null || primitives === void 0 ? void 0 : primitives.edges, settings.antialiasEdges, primitives === null || primitives === void 0 ? void 0 : primitives.nodes), edgeProgram = _generateEdgeProgram.edgeProgram, createEdgeLabelPrograms = _generateEdgeProgram.createLabelPrograms, edgeFramePass = _generateEdgeProgram.framePass, edgeVariables = _generateEdgeProgram.variables, edgePaths = _generateEdgeProgram.paths;
        this.createEdgeLabelPrograms = createEdgeLabelPrograms;
        this.edgeProgram = edgeProgram;
        this.edgeFramePass = edgeFramePass;
        this.edgeVariableEntries = Object.entries(edgeVariables);
        this.edgePathsByName = new Map(edgePaths.map(function(p) {
          return [p.name, p];
        }));
        return {
          labelProgram,
          edgeLabelProgram: null,
          edgeLabelBackgroundProgram: null,
          backdropProgram,
          labelBackgroundProgram,
          attachmentProgram,
          nodeShapeMap: nodeShapeMap !== null && nodeShapeMap !== void 0 ? nodeShapeMap : null,
          nodeGlobalShapeIds: nodeGlobalShapeIds !== null && nodeGlobalShapeIds !== void 0 ? nodeGlobalShapeIds : null
        };
      }
      /**
       * Rebuilds all GPU resources after a context restore: the context object is
       * valid again, only its resources died.
       */
    }, {
      key: "restoreWebGLContext",
      value: function restoreWebGLContext() {
        var _internals$nodeDataTe, _internals$nodeFrameT, _internals$edgeDataTe, _internals$edgeFrameT, _internals$attachment;
        var internals = this.internals;
        this.initPickingFramebuffer();
        (_internals$nodeDataTe = internals.nodeDataTexture) === null || _internals$nodeDataTe === void 0 || _internals$nodeDataTe.restore();
        (_internals$nodeFrameT = internals.nodeFrameTexture) === null || _internals$nodeFrameT === void 0 || _internals$nodeFrameT.restore();
        (_internals$edgeDataTe = internals.edgeDataTexture) === null || _internals$edgeDataTe === void 0 || _internals$edgeDataTe.restore();
        (_internals$edgeFrameT = internals.edgeFrameTexture) === null || _internals$edgeFrameT === void 0 || _internals$edgeFrameT.restore();
        (_internals$attachment = internals.attachmentManager) === null || _internals$attachment === void 0 || _internals$attachment.restore();
        internals.hoverResolver.reset();
        Object.assign(internals, this.initPrograms(internals.primitives, internals.settings));
        var _iterator11 = _createForOfIteratorHelper(this.customLayerPrograms.values()), _step11;
        try {
          for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
            var entry = _step11.value;
            entry.program.kill();
            entry.program = entry.factory(this.webGLContext);
          }
        } catch (err) {
          _iterator11.e(err);
        } finally {
          _iterator11.f();
        }
        this.contextLost = false;
        this.emit("webglContextRestored");
        this.refresh();
      }
      /**
       * Function used to create a layer element.
       *
       * @param {string} id - Context's id.
       * @param {string} tag - The HTML tag to use.
       * @param options
       * @return {Sigma}
       */
    }, {
      key: "createLayer",
      value: function createLayer(id, tag) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (this.extraElements[id]) throw new Error('Sigma: a layer named "'.concat(id, '" already exists'));
        var element = createElement(tag, {
          position: "absolute"
        }, {
          "class": "sigma-".concat(id)
        });
        if (options.style) Object.assign(element.style, options.style);
        this.extraElements[id] = element;
        if ("beforeLayer" in options && options.beforeLayer) {
          this.getLayerElement(options.beforeLayer).before(element);
        } else if ("afterLayer" in options && options.afterLayer) {
          this.getLayerElement(options.afterLayer).after(element);
        } else {
          this.container.appendChild(element);
        }
        return element;
      }
      /**
       * Function used to create a canvas element.
       *
       * @param {string} id - Context's id.
       * @param options
       * @return {Sigma}
       */
    }, {
      key: "createCanvas",
      value: function createCanvas(id) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.createLayer(id, "canvas", options);
      }
      /**
       * Creates a new canvas layer registered under `id` (killable via
       * `killLayer`) and attaches a WebGL 2 context to it.
       */
    }, {
      key: "createWebGLContext",
      value: function createWebGLContext(id) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var canvas = this.createCanvas(id, options);
        if (options.hidden) canvas.remove();
        var gl = canvas.getContext("webgl2", _objectSpread2({
          preserveDrawingBuffer: false,
          antialias: false,
          depth: true
        }, options));
        if (!gl) {
          throw new Error("Sigma: WebGL 2 is not supported by your browser. Please use a modern browser (Chrome 56+, Firefox 51+, Safari 15+, Edge 79+).");
        }
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        return gl;
      }
      /**
       * Function used to properly kill a layer.
       *
       * @param  {string} id - Layer id.
       * @return {Sigma}
       */
    }, {
      key: "killLayer",
      value: function killLayer(id) {
        if (id === "stage" || id === "mouse") throw new Error('Sigma: cannot kill built-in layer "'.concat(id, '"'));
        var element = this.extraElements[id];
        if (!element) throw new Error("Sigma: cannot kill layer ".concat(id, ", which does not exist"));
        element.remove();
        delete this.extraElements[id];
        return this;
      }
      /**
       * Method returning the main WebGL context used by the renderer.
       */
    }, {
      key: "getWebGLContext",
      value: function getWebGLContext() {
        if (!this.webGLContext) throw new Error("Sigma: WebGL context is not available");
        return this.webGLContext;
      }
      /**
       * Returns the shared node data texture (position, size, shapeId per node).
       * GPU-side position writers can use it to target their writes (see the
       * "afterTexturesUpload" event). The texture object is recreated when its
       * capacity grows, so consumers holding a WebGLTexture handle must re-read it
       * every frame.
       */
    }, {
      key: "getNodeDataTexture",
      value: function getNodeDataTexture() {
        if (!this.internals.nodeDataTexture) throw new Error("Sigma: node data texture is not available");
        return this.internals.nodeDataTexture;
      }
      /**
       * Returns the current normalization function, mapping graph coordinates to
       * the ~[0, 1] framed-graph space stored in the node data texture (and back,
       * through its `inverse` method).
       */
    }, {
      key: "getNormalizationFunction",
      value: function getNormalizationFunction() {
        return this.normalizationFunction;
      }
      /**
       * Registers a custom layer program under a unique `id`, so it can later be
       * removed with {@link Sigma#removeCustomLayerProgram}. It renders at the given
       * `depth`, which must be declared in the primitives depthLayers array; several
       * programs may share a depth and render in registration order. Reusing an `id`
       * disposes the program previously registered under it. The `factory` is
       * re-invoked when a lost WebGL context is restored.
       */
    }, {
      key: "addCustomLayerProgram",
      value: function addCustomLayerProgram(id, depth, factory) {
        var _this$customLayerProg;
        if (!this.depthLayers.includes(depth)) throw new Error('Sigma: cannot add custom layer program at depth "'.concat(depth, '", ') + "it must be declared in primitives.depthLayers. Current layers: ".concat(this.depthLayers.join(", ")));
        (_this$customLayerProg = this.customLayerPrograms.get(id)) === null || _this$customLayerProg === void 0 || _this$customLayerProg.program.kill();
        var program = factory(this.webGLContext);
        this.customLayerPrograms.set(id, {
          depth,
          factory,
          program
        });
        if (program.cacheData) program.cacheData();
        this.scheduleRender();
        return this;
      }
      /**
       * Removes (and disposes) the custom layer program registered under the given id.
       */
    }, {
      key: "removeCustomLayerProgram",
      value: function removeCustomLayerProgram(id) {
        var entry = this.customLayerPrograms.get(id);
        if (entry) {
          entry.program.kill();
          this.customLayerPrograms["delete"](id);
          this.scheduleRender();
        }
        return this;
      }
      /**
       * Method returning the renderer's camera.
       *
       * @return {Camera}
       */
    }, {
      key: "getCamera",
      value: function getCamera() {
        return this.camera;
      }
      /**
       * Method setting the renderer's camera.
       *
       * @param  {Camera} camera - New camera.
       * @return {Sigma}
       */
    }, {
      key: "setCamera",
      value: function setCamera(camera) {
        this.camera.cancelAnimation();
        this.unbindCameraHandlers();
        this.camera = camera;
        this.bindCameraHandlers();
        this.scheduleRender();
        return this;
      }
      /**
       * Method returning the container DOM element.
       *
       * @return {HTMLElement}
       */
    }, {
      key: "getContainer",
      value: function getContainer() {
        return this.container;
      }
      /**
       * Method returning the renderer's graph.
       *
       * @return {Graph}
       */
    }, {
      key: "getGraph",
      value: function getGraph() {
        return this.internals.graph;
      }
      /**
       * Method used to set the renderer's graph.
       *
       * @return {Sigma}
       */
    }, {
      key: "setGraph",
      value: function setGraph(graph) {
        if (graph === this.internals.graph) return this;
        this.stateManager.pruneNodes(function(node) {
          return graph.hasNode(node);
        });
        this.stateManager.pruneEdges(function(edge) {
          return graph.hasEdge(edge);
        });
        this.unbindGraphHandlers();
        if (this.checkEdgesEventsFrame !== null) {
          cancelAnimationFrame(this.checkEdgesEventsFrame);
          this.checkEdgesEventsFrame = null;
        }
        this.internals.graph = graph;
        this.autoRescaleFrozen = false;
        this.bindGraphHandlers();
        this.refresh();
        return this;
      }
      /**
       * Method returning the mouse captor.
       *
       * @return {MouseCaptor}
       */
    }, {
      key: "getMouseCaptor",
      value: function getMouseCaptor() {
        return this.mouseCaptor;
      }
      /**
       * Method returning the touch captor.
       *
       * @return {TouchCaptor}
       */
    }, {
      key: "getTouchCaptor",
      value: function getTouchCaptor() {
        return this.touchCaptor;
      }
      /**
       * Method returning the current renderer's dimensions.
       *
       * @return {Dimensions}
       */
    }, {
      key: "getDimensions",
      value: function getDimensions() {
        return {
          width: this.width,
          height: this.height
        };
      }
      /**
       * Method returning the current graph's dimensions.
       *
       * @return {Dimensions}
       */
    }, {
      key: "getGraphDimensions",
      value: function getGraphDimensions() {
        var extent = this.customBBox || this.nodeExtent;
        return {
          width: extent.x[1] - extent.x[0] || 1,
          height: extent.y[1] - extent.y[0] || 1
        };
      }
      /**
       * Method used to get all the sigma node attributes.
       * It's useful for example to get the position of a node
       * and to get values that are set by the nodeReducer
       *
       * @param  {string} key - The node's key.
       * @return {NodeDisplayData | undefined} A copy of the desired node's attribute or undefined if not found
       */
    }, {
      key: "getNodeDisplayData",
      value: function getNodeDisplayData(key) {
        var node = this.internals.nodeDataCache[key];
        return node ? Object.assign({}, node) : void 0;
      }
      /**
       * Method used to get all the sigma edge attributes.
       * It's useful for example to get values that are set by the edgeReducer.
       *
       * @param  {string} key - The edge's key.
       * @return {EdgeDisplayData | undefined} A copy of the desired edge's attribute or undefined if not found
       */
    }, {
      key: "getEdgeDisplayData",
      value: function getEdgeDisplayData(key) {
        var edge = this.internals.edgeDataCache[key];
        return edge ? Object.assign({}, edge) : void 0;
      }
      /**
       * =========================================================================
       * STATE MANAGEMENT API
       * =========================================================================
       */
      /**
       * Method returning a node's state.
       *
       * @param  {string} key - The node's key.
       * @return {FullNodeState<NS>} The node's state.
       */
    }, {
      key: "getNodeState",
      value: function getNodeState(key) {
        return this.stateManager.getNodeState(key);
      }
      /**
       * Method returning an edge's state.
       *
       * @param  {string} key - The edge's key.
       * @return {FullEdgeState<ES>} The edge's state.
       */
    }, {
      key: "getEdgeState",
      value: function getEdgeState(key) {
        return this.stateManager.getEdgeState(key);
      }
      /**
       * Method returning the graph's state.
       *
       * @return {FullGraphState<GS>} The graph's state.
       */
    }, {
      key: "getGraphState",
      value: function getGraphState() {
        return this.stateManager.getGraphState();
      }
      /**
       * Method to update a node's state.
       *
       * @param  {string} key - The node's key.
       * @param  {Partial<FullNodeState<NS>>} state - Partial state to merge.
       * @return {this}
       */
    }, {
      key: "setNodeState",
      value: function setNodeState(key, state) {
        this.stateManager.setNodeState(key, state);
        return this;
      }
      /**
       * Method to update an edge's state.
       *
       * @param  {string} key - The edge's key.
       * @param  {Partial<FullEdgeState<ES>>} state - Partial state to merge.
       * @return {this}
       */
    }, {
      key: "setEdgeState",
      value: function setEdgeState(key, state) {
        this.stateManager.setEdgeState(key, state);
        return this;
      }
      /**
       * Method to update the graph's state.
       *
       * @param  {Partial<FullGraphState<GS>>} state - Partial state to merge.
       * @return {this}
       */
    }, {
      key: "setGraphState",
      value: function setGraphState(state) {
        this.stateManager.setGraphState(state);
        return this;
      }
      /**
       * Internal: toggle the graph-level `isPanning` flag. Called by captors when
       * the user starts/stops dragging the stage. Not meant for user code, use
       * `setGraphState` for custom flags instead.
       */
    }, {
      key: "_setPanning",
      value: function _setPanning(isPanning) {
        this.stateManager.setGraphState({
          isPanning
        });
      }
      /**
       * Internal: toggle the graph-level `isZooming` flag. Called by captors for
       * non-animated zoom gestures (e.g. pinch), which bypass `camera.animate`.
       * Animated zooms are tracked automatically via camera events.
       */
    }, {
      key: "_setZooming",
      value: function _setZooming(isZooming) {
        this.stateManager.setGraphState({
          isZooming
        });
      }
      /**
       * Internal: whether a node is being dragged.
       */
    }, {
      key: "_hasNodeDrag",
      value: function _hasNodeDrag() {
        var dragManager = this.internals.dragManager;
        return !!(dragManager.pendingNode || dragManager.session);
      }
      /**
       * Internal: display the shared-gestures hint. Called by captors when a plain
       * gesture reaches the stage while `gestureTarget` is "shared".
       */
    }, {
      key: "_showGestureHint",
      value: function _showGestureHint(gesture) {
        var settings = this.internals.settings;
        if (settings.gestureTarget !== "shared") return;
        this.gestureHint = this.gestureHint || new GestureHint(this.container);
        this.gestureHint.show(gesture, settings);
      }
      /**
       * Method to update multiple nodes' states at once.
       *
       * @param  {string[]} keys - The nodes' keys.
       * @param  {Partial<FullNodeState<NS>>} state - Partial state to merge.
       * @return {this}
       */
    }, {
      key: "setNodesState",
      value: function setNodesState(keys, state) {
        this.stateManager.setNodesState(keys, state);
        return this;
      }
      /**
       * Method to update multiple edges' states at once.
       *
       * @param  {string[]} keys - The edges' keys.
       * @param  {Partial<FullEdgeState<ES>>} state - Partial state to merge.
       * @return {this}
       */
    }, {
      key: "setEdgesState",
      value: function setEdgesState(keys, state) {
        this.stateManager.setEdgesState(keys, state);
        return this;
      }
      /**
       * Update the container's CSS cursor based on the currently hovered item,
       * falling back to the stage cursor style. The hovered item's kind owns the
       * cursor lookup (e.g. node labels read `labelCursor` rather than `cursor`).
       */
    }, {
      key: "updateContainerCursor",
      value: function updateContainerCursor() {
        var hit = this.stateManager.hovered;
        var stage = this.resolvedStageStyle.cursor || "";
        this.container.style.cursor = hit ? getCursor5(this.internals, hit) || stage : stage;
      }
      /**
       * Re-evaluate stage styles and apply them to the container.
       */
    }, {
      key: "refreshStageStyle",
      value: function refreshStageStyle() {
        this.resolvedStageStyle = evaluateStageStyle(this.stylesDeclaration.stage, this.stateManager.graphState);
        if (this.resolvedStageStyle.background !== void 0) {
          this.container.style.backgroundColor = this.resolvedStageStyle.background;
        }
        this.updateContainerCursor();
      }
      /**
       * Method used to get the set of currently displayed node labels.
       *
       * @return {Set<string>} A set of node keys whose label is displayed.
       */
    }, {
      key: "getNodeDisplayedLabels",
      value: function getNodeDisplayedLabels() {
        return new Set(this.labelRenderer.displayedNodeLabels);
      }
      /**
       * Method used to get the set of currently displayed edge labels.
       *
       * @return {Set<string>} A set of edge keys whose label is displayed.
       */
    }, {
      key: "getEdgeDisplayedLabels",
      value: function getEdgeDisplayedLabels() {
        return new Set(this.labelRenderer.displayedEdgeLabels);
      }
      /**
       * Method returning a copy of the settings collection.
       *
       * @return {Settings} A copy of the settings collection.
       */
    }, {
      key: "getSettings",
      value: function getSettings() {
        return _objectSpread2({}, this.internals.settings);
      }
      /**
       * Method returning the current value for a given setting key.
       *
       * @param  {string} key - The setting key to get.
       * @return {any} The value attached to this setting key or undefined if not found
       */
    }, {
      key: "getSetting",
      value: function getSetting(key) {
        return this.internals.settings[key];
      }
      /**
       * Method returning a copy of the styles declaration, as resolved at
       * construction (i.e. with the defaults applied when none was given).
       *
       * The copy is shallow: the rules it points to are the renderer's own, and
       * must be treated as read-only. Build new arrays and objects rather than
       * mutating them in place.
       *
       * @return {StylesDeclaration} A copy of the styles declaration.
       */
    }, {
      key: "getStyles",
      value: function getStyles2() {
        return _objectSpread2({}, this.stylesDeclaration);
      }
      /**
       * Method returning a copy of the primitives declaration, as resolved at
       * construction (i.e. with the defaults applied when none was given).
       *
       * The copy is shallow: the rules it points to are the renderer's own, and
       * must be treated as read-only. Build new arrays and objects rather than
       * mutating them in place.
       *
       * @return {PrimitivesDeclaration} A copy of the primitives declaration.
       */
    }, {
      key: "getPrimitives",
      value: function getPrimitives() {
        return _objectSpread2({}, this.internals.primitives);
      }
      /**
       * Method setting the value of a given setting key. Note that this will schedule
       * a new render next frame.
       *
       * @param  {string} key - The setting key to set.
       * @param  {any}    value - The value to set.
       * @return {Sigma}
       */
    }, {
      key: "setSetting",
      value: function setSetting(key, value) {
        this.internals.settings[key] = value;
        validateSettings(this.internals.settings);
        this.handleSettingsUpdate();
        this.scheduleRefresh();
        return this;
      }
      /**
       * Method updating the value of a given setting key using the provided function.
       * Note that this will schedule a new render next frame.
       *
       * @param  {string}   key     - The setting key to set.
       * @param  {function} updater - The update function.
       * @return {Sigma}
       */
    }, {
      key: "updateSetting",
      value: function updateSetting(key, updater) {
        this.setSetting(key, updater(this.internals.settings[key]));
        return this;
      }
      /**
       * Method setting multiple settings at once.
       *
       * @param  {Partial<Settings>} settings - The settings to set.
       * @return {Sigma}
       */
    }, {
      key: "setSettings",
      value: function setSettings(settings) {
        this.internals.settings = _objectSpread2(_objectSpread2({}, this.internals.settings), settings);
        validateSettings(this.internals.settings);
        this.handleSettingsUpdate();
        this.scheduleRefresh();
        return this;
      }
      /**
       * Method used to resize the renderer.
       *
       * @param  {boolean} force - If true, then resize is processed even if size is unchanged (optional).
       * @return {Sigma}
       */
    }, {
      key: "resize",
      value: function resize(force) {
        var previousWidth = this.width, previousHeight = this.height;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.internals.pixelRatio = getPixelRatio();
        if (this.width === 0) {
          if (this.internals.settings.allowInvalidContainer) this.width = 1;
          else throw new Error("Sigma: Container has no width. You can set the allowInvalidContainer setting to true to stop seeing this error.");
        }
        if (this.height === 0) {
          if (this.internals.settings.allowInvalidContainer) this.height = 1;
          else throw new Error("Sigma: Container has no height. You can set the allowInvalidContainer setting to true to stop seeing this error.");
        }
        if (!force && previousWidth === this.width && previousHeight === this.height) return this;
        this.labelRenderer.labelsDirty = true;
        for (var _i2 = 0, _arr = [this.mouseLayer].concat(_toConsumableArray(Object.values(this.extraElements))); _i2 < _arr.length; _i2++) {
          var element = _arr[_i2];
          element.style.width = this.width + "px";
          element.style.height = this.height + "px";
        }
        if (this.webGLContext) {
          this.stageCanvas.setAttribute("width", this.width * this.internals.pixelRatio + "px");
          this.stageCanvas.setAttribute("height", this.height * this.internals.pixelRatio + "px");
          this.webGLContext.viewport(0, 0, this.width * this.internals.pixelRatio, this.height * this.internals.pixelRatio);
        }
        this.emit("resize");
        return this;
      }
      /**
       * Method used to clear all the canvases.
       *
       * @return {Sigma}
       */
    }, {
      key: "clear",
      value: function clear() {
        this.emit("beforeClear");
        this.webGLContext.bindFramebuffer(WebGLRenderingContext.FRAMEBUFFER, null);
        this.webGLContext.clear(WebGLRenderingContext.COLOR_BUFFER_BIT);
        this.emit("afterClear");
        return this;
      }
      /**
       * Schedule a state-only refresh: re-evaluate all styles in-place without
       * rebuilding program arrays. Depth changes are handled via fragmented ranges.
       */
    }, {
      key: "scheduleStateRefresh",
      value: function scheduleStateRefresh() {
        this.needToRefreshState = true;
        this.scheduleRender();
      }
      /**
       * Re-evaluate item styles in-place. Uses dependency classification to skip
       * items whose styles can't have changed.
       */
    }, {
      key: "refreshState",
      value: function refreshState() {
        var _this8 = this, _this$stylesDeclarati;
        this.stateManager.flushGraphStateFlags();
        var needFullNodeRefresh = this.stateManager.graphStateChanged && this.internals.nodeStyleAnalysis.dependency === "graph-state";
        var needFullEdgeRefresh = this.stateManager.graphStateChanged && this.edgeStyleAnalysis.dependency === "graph-state";
        var orderChanged = false;
        if (needFullNodeRefresh) {
          this.internals.graph.forEachNode(function(node2) {
            if (_this8.refreshNodeState(node2)) orderChanged = true;
          });
        } else if (this.internals.nodeStyleAnalysis.dependency !== "static") {
          var _iterator12 = _createForOfIteratorHelper(this.stateManager.dirtyNodes), _step12;
          try {
            for (_iterator12.s(); !(_step12 = _iterator12.n()).done; ) {
              var node = _step12.value;
              if (this.refreshNodeState(node)) orderChanged = true;
            }
          } catch (err) {
            _iterator12.e(err);
          } finally {
            _iterator12.f();
          }
        }
        if (needFullEdgeRefresh) {
          this.internals.graph.forEachEdge(function(edge2) {
            if (_this8.refreshEdgeState(edge2)) orderChanged = true;
          });
        } else if (this.edgeStyleAnalysis.dependency !== "static") {
          var _iterator13 = _createForOfIteratorHelper(this.stateManager.dirtyEdges), _step13;
          try {
            for (_iterator13.s(); !(_step13 = _iterator13.n()).done; ) {
              var edge = _step13.value;
              if (this.refreshEdgeState(edge)) orderChanged = true;
            }
          } catch (err) {
            _iterator13.e(err);
          } finally {
            _iterator13.f();
          }
        }
        if (this.stateManager.graphStateChanged && (_this$stylesDeclarati = this.stylesDeclaration) !== null && _this$stylesDeclarati !== void 0 && _this$stylesDeclarati.stage) {
          this.refreshStageStyle();
        }
        this.stateManager.clearDirtyTracking();
        if (orderChanged) this.pendingProcess = "full";
      }
      /**
       * Re-evaluate a single node's style and rewrite its GPU data.
       * Lean path: patches cache in place, skips unchanged bookkeeping.
       */
    }, {
      key: "refreshNodeState",
      value: function refreshNodeState(node) {
        var data = this.internals.nodeDataCache[node];
        if (!data || this.nodeReducer) {
          var _this$internals$nodeD2, _this$internals$nodeD3, _this$internals$nodeD4, _ref9;
          var _oldDepth = (_this$internals$nodeD2 = this.internals.nodeDataCache[node]) === null || _this$internals$nodeD2 === void 0 ? void 0 : _this$internals$nodeD2.depth;
          var _oldZIndex = (_this$internals$nodeD3 = this.internals.nodeDataCache[node]) === null || _this$internals$nodeD3 === void 0 ? void 0 : _this$internals$nodeD3.zIndex;
          var _oldAttachment = (_this$internals$nodeD4 = this.internals.nodeDataCache[node]) === null || _this$internals$nodeD4 === void 0 ? void 0 : _this$internals$nodeD4.labelAttachment;
          this.updateNode(node);
          var newData = this.internals.nodeDataCache[node];
          if (this.internals.attachmentManager && newData.labelAttachment !== _oldAttachment) {
            this.internals.attachmentManager.invalidateNode(node);
          }
          var shapeId;
          if (this.internals.nodeShapeMap && this.internals.nodeGlobalShapeIds && newData.shape && newData.shape in this.internals.nodeShapeMap) {
            shapeId = this.internals.nodeGlobalShapeIds[this.internals.nodeShapeMap[newData.shape]];
          } else {
            shapeId = getShapeId(newData.shape || "circle");
          }
          (_ref9 = this.internals.nodeDataTexture).updateNode.apply(_ref9, [node, newData.x, newData.y, newData.size, shapeId].concat(_toConsumableArray(nodeRotationFlags(newData)), [newData.color]));
          if (_oldDepth && newData.depth !== _oldDepth) {
            this.updateNodeDepthRanges(node, _oldDepth, newData.depth);
          }
          var _programIndex = this.nodeProgramIndex[node];
          if (_programIndex !== void 0) {
            this.addNodeToProgram(node, _programIndex);
            this.nodeProgram.invalidateBuffers();
          }
          return _oldZIndex !== void 0 && newData.zIndex !== _oldZIndex;
        }
        var attrs = this.internals.graph.getNodeAttributes(node);
        var nodeState = this.stateManager.getNodeState(node);
        var oldSize = data.size;
        var oldShape = data.shape;
        var oldDepth = data.depth;
        var oldZIndex = data.zIndex;
        var oldAttachment = data.labelAttachment;
        var oldRotationAlignment = data.rotationAlignment;
        var oldLabelRotationAlignment = data.labelRotationAlignment;
        var oldColor = data.color;
        evaluateNodeStyle(this.stylesDeclaration.nodes, attrs, nodeState, this.stateManager.graphState, this.internals.graph, data);
        this.postEvaluateNode(data, attrs, nodeState);
        var graphCoords = this.nodeGraphCoords[node];
        var rawPositionChanged = data.x !== graphCoords.x || data.y !== graphCoords.y;
        if (rawPositionChanged) {
          graphCoords.x = data.x;
          graphCoords.y = data.y;
        }
        this.normalizationFunction.applyTo(data);
        if (this.internals.nodeShapeMap) {
          if (!data.shape || !(data.shape in this.internals.nodeShapeMap)) {
            data.shape = Object.keys(this.internals.nodeShapeMap)[0];
          }
        } else if (this.nodeShapeSlug) {
          data.shape = this.nodeShapeSlug;
        }
        if (this.internals.attachmentManager && data.labelAttachment !== oldAttachment) {
          this.internals.attachmentManager.invalidateNode(node);
        }
        setMembership(this.internals.nodesWithForcedLabels, node, hasForcedLabel(data));
        setMembership(this.internals.nodesWithBackdrop, node, hasBackdrop(data));
        if (rawPositionChanged || data.size !== oldSize || data.shape !== oldShape || data.rotationAlignment !== oldRotationAlignment || data.labelRotationAlignment !== oldLabelRotationAlignment || data.color !== oldColor) {
          var _ref0;
          var _shapeId;
          if (this.internals.nodeShapeMap && this.internals.nodeGlobalShapeIds && data.shape && data.shape in this.internals.nodeShapeMap) {
            _shapeId = this.internals.nodeGlobalShapeIds[this.internals.nodeShapeMap[data.shape]];
          } else {
            _shapeId = getShapeId(data.shape || "circle");
          }
          (_ref0 = this.internals.nodeDataTexture).updateNode.apply(_ref0, [node, data.x, data.y, data.size, _shapeId].concat(_toConsumableArray(nodeRotationFlags(data)), [data.color]));
        }
        this.itemBuckets.nodes.set(node, data.depth);
        if (data.depth !== oldDepth) this.updateNodeDepthRanges(node, oldDepth, data.depth);
        var programIndex = this.nodeProgramIndex[node];
        if (programIndex !== void 0) {
          this.addNodeToProgram(node, programIndex);
          this.nodeProgram.invalidateBuffers();
        }
        return data.zIndex !== oldZIndex;
      }
      /**
       * Re-evaluate a single edge's style and rewrite its GPU data.
       * Lean path: re-evaluates style but patches cache in place, skips
       * unchanged bookkeeping, and avoids full addEdgeToProgram overhead.
       */
    }, {
      key: "refreshEdgeState",
      value: function refreshEdgeState(edge) {
        var data = this.internals.edgeDataCache[edge];
        if (!data || this.edgeReducer) {
          var _oldDepth2 = data === null || data === void 0 ? void 0 : data.depth;
          var _oldZIndex2 = data === null || data === void 0 ? void 0 : data.zIndex;
          this.updateEdge(edge);
          var newData = this.internals.edgeDataCache[edge];
          if (_oldDepth2 && newData.depth !== _oldDepth2) {
            this.updateEdgeDepthRanges(edge, _oldDepth2, newData.depth);
          }
          var _programIndex2 = this.edgeProgramIndex[edge];
          if (_programIndex2 !== void 0) {
            this.addEdgeToProgram(edge, _programIndex2);
            this.edgeProgram.invalidateBuffers();
          }
          return _oldZIndex2 !== void 0 && newData.zIndex !== _oldZIndex2;
        }
        var attrs = this.internals.graph.getEdgeAttributes(edge);
        var edgeState = this.stateManager.getEdgeState(edge);
        var oldDepth = data.depth;
        var oldZIndex = data.zIndex;
        var oldSize = data.size;
        var oldPath = data.path;
        var oldSelfLoopPath = data.selfLoopPath;
        var oldParallelPath = data.parallelPath;
        var oldHead = data.head;
        var oldTail = data.tail;
        evaluateEdgeStyle(this.stylesDeclaration.edges, attrs, edgeState, this.stateManager.graphState, this.internals.graph, data);
        this.postEvaluateEdge(data, attrs);
        this.applyEdgeSpread(edge, data, edgeState);
        setMembership(this.internals.edgesWithForcedLabels, edge, hasForcedLabel(data));
        this.itemBuckets.edges.set(edge, data.depth);
        if (data.depth !== oldDepth) this.updateEdgeDepthRanges(edge, oldDepth, data.depth);
        var programIndex = this.edgeProgramIndex[edge];
        if (programIndex !== void 0) {
          var structuralDataChanged = data.size !== oldSize || data.path !== oldPath || data.selfLoopPath !== oldSelfLoopPath || data.parallelPath !== oldParallelPath || data.head !== oldHead || data.tail !== oldTail;
          if (structuralDataChanged) {
            this.addEdgeToProgram(edge, programIndex);
            this.edgeProgram.invalidateBuffers();
          } else {
            var source = this.internals.graph.source(edge);
            var target = this.internals.graph.target(edge);
            var sourceData = this.internals.nodeDataCache[source];
            var targetData = this.internals.nodeDataCache[target];
            var edgeTextureIndex = this.edgeTextureIndexCache[edge];
            this.edgeProgram.process(pickingIdOf(this.pickingState, "edge", edge), programIndex, sourceData, targetData, data, edgeTextureIndex);
            this.edgeProgram.invalidateBuffers();
          }
        }
        return data.zIndex !== oldZIndex;
      }
      /**
       * Method used to refresh, i.e. force the renderer to reprocess graph
       * data and render, but keep the state.
       * - if a partialGraph is provided, we only reprocess those nodes & edges.
       * - if schedule is TRUE, we schedule a render instead of sync render
       * - if skipIndexation is TRUE, then labelGrid & program indexation are skipped (can be used if you haven't modify x, y, zIndex & size)
       *
       * @return {Sigma}
       */
    }, {
      key: "refresh",
      value: function refresh(opts) {
        var _this9 = this;
        var skipIndexation = (opts === null || opts === void 0 ? void 0 : opts.skipIndexation) !== void 0 ? opts === null || opts === void 0 ? void 0 : opts.skipIndexation : false;
        var schedule = (opts === null || opts === void 0 ? void 0 : opts.schedule) !== void 0 ? opts.schedule : false;
        var fullRefresh = !opts || !opts.partialGraph;
        if (fullRefresh) {
          this.clearEdgeIndices();
          this.clearNodeIndices();
          this.internals.graph.forEachNode(function(node2) {
            return _this9.addNode(node2);
          });
          this.edgeGroups.rebuild();
          this.internals.graph.forEachEdge(function(edge2) {
            return _this9.addEdge(edge2);
          });
          this.pendingProcess = "full";
        } else {
          var _opts$partialGraph, _opts$partialGraph2;
          var nodes = ((_opts$partialGraph = opts.partialGraph) === null || _opts$partialGraph === void 0 ? void 0 : _opts$partialGraph.nodes) || [];
          for (var i = 0, l = (nodes === null || nodes === void 0 ? void 0 : nodes.length) || 0; i < l; i++) {
            var _this$internals$nodeD5, _this$internals$nodeD6;
            var node = "" + nodes[i];
            var oldAttachment = (_this$internals$nodeD5 = this.internals.nodeDataCache[node]) === null || _this$internals$nodeD5 === void 0 ? void 0 : _this$internals$nodeD5.labelAttachment;
            this.updateNode(node);
            if (this.internals.attachmentManager && ((_this$internals$nodeD6 = this.internals.nodeDataCache[node]) !== null && _this$internals$nodeD6 !== void 0 && _this$internals$nodeD6.labelAttachment || oldAttachment)) {
              this.internals.attachmentManager.invalidateNode(node);
            }
            if (skipIndexation) {
              var programIndex = this.nodeProgramIndex[node];
              if (programIndex === void 0) throw new Error('Sigma: node "'.concat(node, `" can't be repaint`));
              this.addNodeToProgram(node, programIndex);
            }
          }
          if (skipIndexation && nodes.length > 0) {
            this.nodeProgram.invalidateBuffers();
            this.labelRenderer.labelsDirty = true;
          }
          var edges = (opts === null || opts === void 0 || (_opts$partialGraph2 = opts.partialGraph) === null || _opts$partialGraph2 === void 0 ? void 0 : _opts$partialGraph2.edges) || [];
          for (var _i3 = 0, _l2 = edges.length; _i3 < _l2; _i3++) {
            var edge = "" + edges[_i3];
            this.updateEdge(edge);
            if (skipIndexation) {
              var _programIndex3 = this.edgeProgramIndex[edge];
              if (_programIndex3 === void 0) throw new Error('Sigma: edge "'.concat(edge, `" can't be repaint`));
              this.addEdgeToProgram(edge, _programIndex3);
            }
          }
          if (skipIndexation && edges.length > 0) {
            this.edgeProgram.invalidateBuffers();
            this.labelRenderer.labelsDirty = true;
          }
          if (!skipIndexation && this.pendingProcess !== "full") {
            this.pendingProcess = edges.length > 0 ? "full" : "nodes";
          }
        }
        if (schedule) this.scheduleRender();
        else this.render();
        return this;
      }
      /**
       * Method used to schedule a render at the next available frame.
       * This method can be safely called on a same frame because it basically
       * debounces refresh to the next frame.
       *
       * @return {Sigma}
       */
    }, {
      key: "scheduleRender",
      value: function scheduleRender() {
        var _this0 = this;
        if (!this.renderFrame) {
          this.renderFrame = requestAnimationFrame(function() {
            _this0.render();
          });
        }
        return this;
      }
      /**
       * Method used to schedule a refresh (i.e. fully reprocess graph data and render)
       * at the next available frame.
       * This method can be safely called on a same frame because it basically
       * debounces refresh to the next frame.
       *
       * @return {Sigma}
       */
    }, {
      key: "scheduleRefresh",
      value: function scheduleRefresh(opts) {
        return this.refresh(_objectSpread2(_objectSpread2({}, opts), {}, {
          schedule: true
        }));
      }
      /**
       * Method used to (un)zoom, while preserving the position of a viewport point.
       * Used for instance to zoom "on the mouse cursor".
       *
       * @param viewportTarget
       * @param newRatio
       * @return {CameraState}
       */
    }, {
      key: "getViewportZoomedState",
      value: function getViewportZoomedState(viewportTarget, newRatio) {
        var _this$camera$getState = this.camera.getState(), ratio = _this$camera$getState.ratio, angle = _this$camera$getState.angle, x = _this$camera$getState.x, y = _this$camera$getState.y;
        var _this$internals$setti2 = this.internals.settings, minCameraRatio = _this$internals$setti2.minCameraRatio, maxCameraRatio = _this$internals$setti2.maxCameraRatio;
        if (typeof maxCameraRatio === "number") newRatio = Math.min(newRatio, maxCameraRatio);
        if (typeof minCameraRatio === "number") newRatio = Math.max(newRatio, minCameraRatio);
        var ratioDiff = newRatio / ratio;
        var center = {
          x: this.width / 2,
          y: this.height / 2
        };
        var graphMousePosition = this.viewportToFramedGraph(viewportTarget);
        var graphCenterPosition = this.viewportToFramedGraph(center);
        return {
          angle,
          x: (graphMousePosition.x - graphCenterPosition.x) * (1 - ratioDiff) + x,
          y: (graphMousePosition.y - graphCenterPosition.y) * (1 - ratioDiff) + y,
          ratio: newRatio
        };
      }
      /**
       * Method returning the abstract rectangle containing the graph according
       * to the camera's state.
       *
       * @return {object} - The view's rectangle.
       */
    }, {
      key: "viewRectangle",
      value: function viewRectangle() {
        var p1 = this.viewportToFramedGraph({
          x: 0,
          y: 0
        }), p2 = this.viewportToFramedGraph({
          x: this.width,
          y: 0
        }), h = this.viewportToFramedGraph({
          x: 0,
          y: this.height
        });
        return {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          height: p2.y - h.y
        };
      }
      /**
       * Method returning the coordinates of a point from the framed graph system to the viewport system. It allows
       * overriding anything that is used to get the translation matrix, or even the matrix itself.
       *
       * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
       * of computations.
       */
    }, {
      key: "framedGraphToViewport",
      value: function framedGraphToViewport2(coordinates) {
        var override = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !!override.graphDimensions || !!override.padding;
        var matrix = override.matrix || (recomputeMatrix ? matrixFromCamera(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getStagePadding()) : this.matrix);
        var viewportPos = multiplyVec2(matrix, coordinates);
        return {
          x: (1 + viewportPos.x) * this.width / 2,
          y: (1 - viewportPos.y) * this.height / 2
        };
      }
      /**
       * Method returning the coordinates of a point from the viewport system to the framed graph system. It allows
       * overriding anything that is used to get the translation matrix, or even the matrix itself.
       *
       * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
       * of computations.
       */
    }, {
      key: "viewportToFramedGraph",
      value: function viewportToFramedGraph(coordinates) {
        var override = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !!override.graphDimensions || !!override.padding;
        var invMatrix = override.matrix || (recomputeMatrix ? matrixFromCamera(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getStagePadding(), true) : this.invMatrix);
        var res = multiplyVec2(invMatrix, {
          x: coordinates.x / this.width * 2 - 1,
          y: 1 - coordinates.y / this.height * 2
        });
        if (isNaN(res.x)) res.x = 0;
        if (isNaN(res.y)) res.y = 0;
        return res;
      }
      /**
       * Method used to translate a point's coordinates from the viewport system (pixel distance from the top-left of the
       * stage) to the graph system (the reference system of data as they are in the given graph instance).
       *
       * This method accepts an optional camera which can be useful if you need to translate coordinates
       * based on a different view than the one being currently being displayed on screen.
       *
       * @param {Coordinates}                  coordinates
       * @param {CoordinateConversionOverride} override
       */
    }, {
      key: "viewportToGraph",
      value: function viewportToGraph(coordinates) {
        var override = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.normalizationFunction.inverse(this.viewportToFramedGraph(coordinates, override));
      }
      /**
       * Method used to translate a point's coordinates from the graph system (the reference system of data as they are in
       * the given graph instance) to the viewport system (pixel distance from the top-left of the stage).
       *
       * This method accepts an optional camera which can be useful if you need to translate coordinates
       * based on a different view than the one being currently being displayed on screen.
       *
       * @param {Coordinates}                  coordinates
       * @param {CoordinateConversionOverride} override
       */
    }, {
      key: "graphToViewport",
      value: function graphToViewport(coordinates) {
        var override = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.framedGraphToViewport(this.normalizationFunction(coordinates), override);
      }
      /**
       * Method used to translate a point's coordinates from the graph system to the framed graph system (the normalized
       * ~[0, 1] space used by the camera state).
       */
    }, {
      key: "graphToFramedGraph",
      value: function graphToFramedGraph(coordinates) {
        return this.normalizationFunction(coordinates);
      }
      /**
       * Method used to translate a point's coordinates from the framed graph system (the normalized ~[0, 1] space used by
       * the camera state) to the graph system.
       */
    }, {
      key: "framedGraphToGraph",
      value: function framedGraphToGraph(coordinates) {
        return this.normalizationFunction.inverse(coordinates);
      }
      /**
       * Method returning the distance multiplier between the graph system and the
       * viewport system.
       */
    }, {
      key: "getGraphToViewportRatio",
      value: function getGraphToViewportRatio() {
        var graphP1 = {
          x: 0,
          y: 0
        };
        var graphP2 = {
          x: 1,
          y: 1
        };
        var graphD = Math.sqrt(Math.pow(graphP1.x - graphP2.x, 2) + Math.pow(graphP1.y - graphP2.y, 2));
        var viewportP1 = this.graphToViewport(graphP1);
        var viewportP2 = this.graphToViewport(graphP2);
        var viewportD = Math.sqrt(Math.pow(viewportP1.x - viewportP2.x, 2) + Math.pow(viewportP1.y - viewportP2.y, 2));
        return viewportD / graphD;
      }
      /**
       * Compute node extent from un-normalized graph coordinates,
       * which accounts for coordinate remapping via styles.
       */
    }, {
      key: "computeNodeExtent",
      value: function computeNodeExtent() {
        var coords = this.nodeGraphCoords;
        var keys = Object.keys(coords);
        if (!keys.length) return {
          x: [0, 1],
          y: [0, 1]
        };
        var xMin = Infinity;
        var xMax = -Infinity;
        var yMin = Infinity;
        var yMax = -Infinity;
        for (var i = 0, l = keys.length; i < l; i++) {
          var _coords$keys$i = coords[keys[i]], x = _coords$keys$i.x, y = _coords$keys$i.y;
          if (x < xMin) xMin = x;
          if (x > xMax) xMax = x;
          if (y < yMin) yMin = y;
          if (y > yMax) yMax = y;
        }
        return {
          x: [xMin, xMax],
          y: [yMin, yMax]
        };
      }
      /**
       * Method returning the graph's bounding box.
       *
       * @return {{ x: Extent, y: Extent }}
       */
    }, {
      key: "getBBox",
      value: function getBBox() {
        return this.nodeExtent;
      }
      /**
       * Method returning the graph's custom bounding box, if any.
       *
       * @return {{ x: Extent, y: Extent } | null}
       */
    }, {
      key: "getCustomBBox",
      value: function getCustomBBox() {
        return this.customBBox;
      }
      /**
       * Method used to override the graph's bounding box with a custom one. Give `null` as the argument to stop overriding.
       *
       * @return {Sigma}
       */
    }, {
      key: "setCustomBBox",
      value: function setCustomBBox(customBBox) {
        this.customBBox = customBBox;
        this.scheduleRender();
        return this;
      }
      /**
       * Method used to shut the container & release event listeners.
       *
       * @return {undefined}
       */
    }, {
      key: "kill",
      value: function kill() {
        var _this$internals$edgeL, _this$internals$edgeL2, _this$internals$attac2, _this$internals$attac3, _this$gestureHint;
        this.emit("kill");
        this.removeAllListeners();
        this.camera.cancelAnimation();
        this.unbindCameraHandlers();
        window.removeEventListener("resize", this.activeListeners.handleResize);
        this.mouseCaptor.kill();
        this.touchCaptor.kill();
        this.internals.hoverResolver.kill();
        this.unbindGraphHandlers();
        this.clearIndices();
        this.clearState();
        this.internals.nodeDataCache = {};
        this.internals.edgeDataCache = {};
        if (this.renderFrame) {
          cancelAnimationFrame(this.renderFrame);
          this.renderFrame = null;
        }
        var container = this.container;
        while (container.firstChild) container.removeChild(container.firstChild);
        this.nodeProgram.kill();
        this.nodeFramePass.kill();
        this.edgeProgram.kill();
        this.edgeFramePass.kill();
        this.internals.labelProgram.kill();
        (_this$internals$edgeL = this.internals.edgeLabelProgram) === null || _this$internals$edgeL === void 0 || _this$internals$edgeL.kill();
        (_this$internals$edgeL2 = this.internals.edgeLabelBackgroundProgram) === null || _this$internals$edgeL2 === void 0 || _this$internals$edgeL2.kill();
        this.internals.backdropProgram.kill();
        this.internals.labelBackgroundProgram.kill();
        (_this$internals$attac2 = this.internals.attachmentProgram) === null || _this$internals$attac2 === void 0 || _this$internals$attac2.kill();
        (_this$internals$attac3 = this.internals.attachmentManager) === null || _this$internals$attac3 === void 0 || _this$internals$attac3.kill();
        this.internals.attachmentProgram = null;
        this.internals.attachmentManager = null;
        var _iterator14 = _createForOfIteratorHelper(this.customLayerPrograms.values()), _step14;
        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done; ) {
            var program = _step14.value.program;
            program.kill();
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
        this.customLayerPrograms.clear();
        if (this.sdfAtlas) {
          this.sdfAtlas = null;
        }
        if (this.internals.nodeDataTexture) {
          this.internals.nodeDataTexture.kill();
          this.internals.nodeDataTexture = null;
        }
        if (this.internals.nodeFrameTexture) {
          this.internals.nodeFrameTexture.kill();
          this.internals.nodeFrameTexture = null;
        }
        if (this.internals.edgeDataTexture) {
          this.internals.edgeDataTexture.kill();
          this.internals.edgeDataTexture = null;
        }
        if (this.internals.edgeFrameTexture) {
          this.internals.edgeFrameTexture.kill();
          this.internals.edgeFrameTexture = null;
        }
        if (this.webGLContext) {
          var _this$webGLContext$ge;
          (_this$webGLContext$ge = this.webGLContext.getExtension("WEBGL_lose_context")) === null || _this$webGLContext$ge === void 0 || _this$webGLContext$ge.loseContext();
          this.webGLContext = null;
        }
        (_this$gestureHint = this.gestureHint) === null || _this$gestureHint === void 0 || _this$gestureHint.kill();
        this.gestureHint = null;
        this.mouseLayer.remove();
        for (var id in this.extraElements) {
          this.extraElements[id].remove();
        }
        this.extraElements = {};
      }
      /**
       * Method used to scale the given size according to the camera's ratio, i.e.
       * zooming state.
       *
       * @param  {number?} size -        The size to scale (node size, edge thickness etc.).
       * @param  {number?} cameraRatio - A camera ratio (defaults to the actual camera ratio).
       * @return {number}              - The scaled size.
       */
    }, {
      key: "scaleSize",
      value: function scaleSize() {
        var size = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        var cameraRatio = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.camera.ratio;
        return size / this.internals.settings.zoomToSizeRatioFunction(cameraRatio) * (this.getSetting("itemSizesReference") === "positions" ? cameraRatio * this.graphToViewportRatio : 1);
      }
      /**
       * Method that returns the stage canvas element.
       */
    }, {
      key: "getStageCanvas",
      value: function getStageCanvas() {
        return this.stageCanvas;
      }
      /**
       * Returns the mouse interaction layer element.
       */
    }, {
      key: "getMouseLayer",
      value: function getMouseLayer() {
        return this.mouseLayer;
      }
    }]);
  })(TypedEventEmitter);
  var Sigma = Sigma$1;

  // entry.mjs
  var import_graphology_layout_forceatlas2 = __toESM(require_graphology_layout_forceatlas2(), 1);

  // node_modules/sigma/primitives/dist/sigma-primitives.esm.js
  var import_events5 = __toESM(require_events());

  // node_modules/sigma/rendering/dist/sigma-rendering.esm.js
  var import_events6 = __toESM(require_events());
  function resolveNumber$2(value, defaultValue) {
    if (typeof value === "number") return value;
    if (_typeof(value) === "object" && value !== null && "attribute" in value) return defaultValue;
    return defaultValue;
  }
  function sdfSquare(options) {
    var _ref = options !== null && options !== void 0 ? options : {}, cornerRadius = _ref.cornerRadius, rotation = _ref.rotation;
    var cornerRadiusValue = resolveNumber$2(cornerRadius, 0);
    var rotationValue = resolveNumber$2(rotation, 0);
    var glsl = (
      /*glsl*/
      "\n".concat(GLSL_ROTATE_2D, "\nfloat sdf_square(vec2 uv, float size, float cornerRadius, float rotation) {\n  // Apply rotation if needed\n  vec2 p = uv;\n  if (rotation != 0.0) {\n    p = rotate2D(rotation) * p;\n  }\n\n  // Distance to box with given corner radius\n  // Based on Inigo Quilez's box SDF: https://iquilezles.org/articles/distfunctions2d/\n  vec2 d = abs(p) - vec2(size - cornerRadius);\n  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - cornerRadius;\n}\n")
    );
    return {
      name: "square",
      glsl,
      uniforms: [{
        name: "u_cornerRadius",
        type: "float",
        value: cornerRadiusValue
      }, {
        name: "u_rotation",
        type: "float",
        value: rotationValue
      }],
      // For axis-aligned square: inradius = circumradius * √2/2
      // (the inscribed circle touches the middle of each side, not the corners)
      inradiusFactor: Math.SQRT1_2
    };
  }
  function resolveNumber$1(value, defaultValue) {
    if (typeof value === "number") return value;
    if (_typeof(value) === "object" && value !== null && "attribute" in value) return defaultValue;
    return defaultValue;
  }
  function sdfTriangle(options) {
    var _ref = options !== null && options !== void 0 ? options : {}, cornerRadius = _ref.cornerRadius, rotation = _ref.rotation;
    var cornerRadiusValue = resolveNumber$1(cornerRadius, 0);
    var rotationValue = resolveNumber$1(rotation, 0);
    var glsl = (
      /*glsl*/
      "\n".concat(GLSL_ROTATE_2D, "\nfloat sdf_triangle(vec2 uv, float size, float cornerRadius, float rotation) {\n  // Apply rotation if needed\n  vec2 p = uv;\n  if (rotation != 0.0) {\n    p = rotate2D(rotation) * p;\n  }\n\n  // Equilateral triangle SDF\n  // Based on Inigo Quilez's triangle SDF: https://iquilezles.org/articles/distfunctions2d/\n  //\n  // The IQ formula uses parameter 'r' where the triangle has width = 2r.\n  // For circumradius R (distance from centroid to vertex):\n  //   R = r * 2 / sqrt(3), so r = R * sqrt(3) / 2\n  const float k = sqrt(3.0);\n  float r = size * k / 2.0;\n\n  p.x = abs(p.x) - r;\n  p.y = p.y + r / k;\n  if (p.x + k * p.y > 0.0) {\n    p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;\n  }\n  p.x -= clamp(p.x, -2.0 * r, 0.0);\n  float dist = -length(p) * sign(p.y);\n\n  // Apply corner radius if specified\n  if (cornerRadius > 0.0) {\n    dist = dist + cornerRadius;\n  }\n\n  return dist;\n}\n")
    );
    return {
      name: "triangle",
      glsl,
      uniforms: [{
        name: "u_cornerRadius",
        type: "float",
        value: cornerRadiusValue
      }, {
        name: "u_rotation",
        type: "float",
        value: rotationValue
      }],
      // For equilateral triangle: inradius = circumradius / 2
      inradiusFactor: 0.5
    };
  }
  function resolveNumber(value, defaultValue) {
    if (typeof value === "number") return value;
    if (_typeof(value) === "object" && value !== null && "attribute" in value) return defaultValue;
    return defaultValue;
  }
  function sdfDiamond(options) {
    var _ref = options !== null && options !== void 0 ? options : {}, cornerRadius = _ref.cornerRadius, rotation = _ref.rotation;
    var cornerRadiusValue = resolveNumber(cornerRadius, 0);
    var rotationValue = resolveNumber(rotation, 0);
    var glsl = (
      /*glsl*/
      "\n".concat(GLSL_ROTATE_2D, "\nfloat sdf_diamond(vec2 uv, float size, float cornerRadius, float rotation) {\n  // Apply rotation if needed\n  vec2 p = uv;\n  if (rotation != 0.0) {\n    p = rotate2D(rotation) * p;\n  }\n\n  // Diamond SDF - using rhombus formula from Inigo Quilez\n  // https://iquilezles.org/articles/distfunctions2d/\n  // For a diamond (square rotated 45\xB0), b = (size, size)\n  vec2 b = vec2(size, -size);\n  p = abs(p);\n  float h = clamp((dot(b, p) + b.y * b.y) / dot(b, b), 0.0, 1.0);\n  p -= b * vec2(h, h - 1.0);\n  float d = length(p) * sign(p.x);\n\n  // Apply corner radius if specified\n  if (cornerRadius > 0.0) {\n    d = d + cornerRadius;\n  }\n\n  return d;\n}\n")
    );
    return {
      name: "diamond",
      glsl,
      uniforms: [{
        name: "u_cornerRadius",
        type: "float",
        value: cornerRadiusValue
      }, {
        name: "u_rotation",
        type: "float",
        value: rotationValue
      }],
      // For diamond (square rotated 45°): inradius = circumradius * √2/2
      inradiusFactor: Math.SQRT1_2
    };
  }
  function sdfRectangle(options) {
    var _ref = options !== null && options !== void 0 ? options : {}, _ref$aspectRatio = _ref.aspectRatio, aspectRatio = _ref$aspectRatio === void 0 ? {
      attribute: "aspectRatio"
    } : _ref$aspectRatio, cornerRadius = _ref.cornerRadius, rotation = _ref.rotation;
    var glsl = (
      /*glsl*/
      "\n".concat(GLSL_ROTATE_2D, "\nfloat sdf_rectangle(vec2 uv, float size, float cornerRadius, float rotation, float aspectRatio) {\n  // Apply rotation if needed\n  vec2 p = uv;\n  if (rotation != 0.0) {\n    p = rotate2D(rotation) * p;\n  }\n\n  vec2 halfExtent = aspectRatio >= 1.0 ? vec2(size, size / aspectRatio) : vec2(size * aspectRatio, size);\n  // Keeps thin rectangles from growing past their half extent\n  float radius = min(cornerRadius, min(halfExtent.x, halfExtent.y));\n\n  // Based on Inigo Quilez's box SDF: https://iquilezles.org/articles/distfunctions2d/\n  vec2 d = abs(p) - (halfExtent - radius);\n  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - radius;\n}\n")
    );
    var uniforms = [{
      name: "u_cornerRadius",
      type: "float",
      value: typeof cornerRadius === "number" ? cornerRadius : 0
    }, {
      name: "u_rotation",
      type: "float",
      value: typeof rotation === "number" ? rotation : 0
    }];
    var inradiusFactorGLSL = function inradiusFactorGLSL2(ratio) {
      return "0.70710678 / max(".concat(ratio, ", 1.0 / ").concat(ratio, ")");
    };
    if (!isAttributeSource(aspectRatio)) {
      return {
        name: "rectangle",
        glsl,
        uniforms: [].concat(uniforms, [{
          name: "u_aspectRatio",
          type: "float",
          value: aspectRatio
        }]),
        inradiusFactor: Math.SQRT1_2,
        inradiusFactorGLSL: inradiusFactorGLSL(numberToGLSLFloat(aspectRatio))
      };
    }
    var source = aspectRatio.attribute, _aspectRatio$default = aspectRatio["default"], defaultValue = _aspectRatio$default === void 0 ? 1 : _aspectRatio$default;
    return {
      name: "rectangle",
      glsl,
      uniforms,
      attributes: [{
        name: "aspectRatio",
        size: 1,
        type: WebGL2RenderingContext.FLOAT,
        source
      }],
      variables: _defineProperty({}, source, {
        type: "number",
        "default": defaultValue
      }),
      inradiusFactor: Math.SQRT1_2,
      inradiusFactorGLSL: inradiusFactorGLSL("v_aspectRatio")
    };
  }
  var DEFAULT_DASH_SIZE_MODE = "pixels";
  var DEFAULT_DASH_CAP = "butt";
  function parseSolidExtremities(value) {
    if (value === void 0 || value === false) {
      return {
        tail: false,
        head: false
      };
    }
    if (value === true) {
      return {
        tail: true,
        head: true
      };
    }
    if (value === "head") {
      return {
        tail: false,
        head: true
      };
    }
    return {
      tail: true,
      head: false
    };
  }
  function parseSolidMargin(value) {
    var _value$tail, _value$head;
    if (value === void 0) {
      return {
        tail: 0,
        head: 0
      };
    }
    if (typeof value === "number") {
      return {
        tail: value,
        head: value
      };
    }
    return {
      tail: (_value$tail = value.tail) !== null && _value$tail !== void 0 ? _value$tail : 0,
      head: (_value$head = value.head) !== null && _value$head !== void 0 ? _value$head : 0
    };
  }
  function layerDashed(options) {
    var _opts$dashColor, _opts$gapColor, _opts$dashSize, _opts$gapSize, _opts$dashOffset, _opts$align, _opts$cap;
    var opts = options !== null && options !== void 0 ? options : {};
    var dashColor = (_opts$dashColor = opts.dashColor) !== null && _opts$dashColor !== void 0 ? _opts$dashColor : {
      attribute: "color"
    };
    var gapColor = (_opts$gapColor = opts.gapColor) !== null && _opts$gapColor !== void 0 ? _opts$gapColor : 0;
    var sizes = {
      dashSize: (_opts$dashSize = opts.dashSize) !== null && _opts$dashSize !== void 0 ? _opts$dashSize : {
        value: 10,
        mode: "pixels"
      },
      gapSize: (_opts$gapSize = opts.gapSize) !== null && _opts$gapSize !== void 0 ? _opts$gapSize : {
        value: 10,
        mode: "pixels"
      },
      dashOffset: (_opts$dashOffset = opts.dashOffset) !== null && _opts$dashOffset !== void 0 ? _opts$dashOffset : {
        value: 0,
        mode: "pixels"
      }
    };
    var align = (_opts$align = opts.align) !== null && _opts$align !== void 0 ? _opts$align : 0.5;
    var cap = (_opts$cap = opts.cap) !== null && _opts$cap !== void 0 ? _opts$cap : DEFAULT_DASH_CAP;
    var solidExtremities = parseSolidExtremities(opts.solidExtremities);
    var solidMargin = parseSolidMargin(opts.solidMargin);
    var dashResolved = resolveEdgeColorValue(dashColor, "dashColor");
    var sizeMode = [sizes.dashSize, sizes.gapSize, sizes.dashOffset].map(function(dashSize) {
      var _dashSize$mode;
      return ((_dashSize$mode = dashSize.mode) !== null && _dashSize$mode !== void 0 ? _dashSize$mode : DEFAULT_DASH_SIZE_MODE) === "relative" ? 1 : 0;
    });
    var uniforms = [
      {
        name: "u_sizeMode",
        type: "vec3",
        value: sizeMode
      },
      {
        name: "u_align",
        type: "float",
        value: align
      },
      // Solid extremities: vec2(tail, head) as 0.0 or 1.0
      {
        name: "u_solidExtremities",
        type: "vec2",
        value: [solidExtremities.tail ? 1 : 0, solidExtremities.head ? 1 : 0]
      },
      // Solid margin: vec2(tail margin in pixels, head margin in pixels)
      {
        name: "u_solidMargin",
        type: "vec2",
        value: [solidMargin.tail, solidMargin.head]
      }
    ];
    var attributes = _toConsumableArray(dashResolved.attributes);
    var needsNodeColors = dashResolved.needsNodeColors;
    var gapColorGLSL;
    if (typeof gapColor === "number") {
      gapColorGLSL = "vec4(dashColor.rgb, dashColor.a * ".concat(numberToGLSLFloat(gapColor), ")");
    } else {
      var gapResolved = resolveEdgeColorValue(gapColor, "gapColor");
      gapColorGLSL = gapResolved.glsl;
      attributes.push.apply(attributes, _toConsumableArray(gapResolved.attributes));
      needsNodeColors = needsNodeColors || gapResolved.needsNodeColors;
    }
    var hasDashSizeAttr = !("value" in sizes.dashSize);
    var hasGapSizeAttr = !("value" in sizes.gapSize);
    var hasDashOffsetAttr = !("value" in sizes.dashOffset);
    ["dashSize", "gapSize", "dashOffset"].forEach(function(key) {
      if ("value" in sizes[key]) {
        uniforms.push({
          name: "u_".concat(key),
          type: "float",
          value: sizes[key].value
        });
      } else {
        var _sizes$key$default;
        attributes.push({
          name: "a_".concat(key),
          size: 1,
          type: WebGL2RenderingContext.FLOAT,
          source: sizes[key].attribute
        });
        uniforms.push({
          name: "u_".concat(key),
          type: "float",
          value: (_sizes$key$default = sizes[key]["default"]) !== null && _sizes$key$default !== void 0 ? _sizes$key$default : 0
        });
      }
    });
    var getDashSizeGLSL = function getDashSizeGLSL2(name, hasAttr) {
      return hasAttr ? "(v_".concat(name, " > 0.0 ? v_").concat(name, " : u_").concat(name, ")") : "u_".concat(name);
    };
    var glsl = (
      /*glsl*/
      "\n// Dashed pattern layer with antialiased boundaries\n// Uniforms:\n//   u_dashSize: size of each dash (or default when using attribute)\n//   u_gapSize: size of gaps between dashes (or default when using attribute)\n//   u_dashOffset: offset to shift the pattern (or default when using attribute)\n//   u_sizeMode: vec3 indicating if values are thickness-relative (x=dash, y=gap, z=offset)\n//   u_align: pattern alignment (0=start, 0.5=center, 1=end)\n//   u_solidExtremities: vec2(tail, head) - 1.0 means solid, 0.0 means dashed\n//   u_solidMargin: vec2(tail, head) - extra solid margin in pixels\n".concat(hasDashSizeAttr ? "// Varying: v_dashSize for per-edge dash size" : "", "\n").concat(hasGapSizeAttr ? "// Varying: v_gapSize for per-edge gap size" : "", "\n").concat(hasDashOffsetAttr ? "// Varying: v_dashOffset for per-edge dash offset" : "", "\n\nvec4 layer_dashed(EdgeContext ctx) {\n  // Dash color (straight alpha, matching v_color and blendOver)\n  vec4 dashColor = ").concat(dashResolved.glsl, ";\n\n  // Check for solid zones first (extremities and margins)\n  // v_zone: 0=tail extremity, 1=body, 2=head extremity\n  // v_tailLengthRatio and v_headLengthRatio give extremity lengths as ratio of thickness\n\n  // Tail solid zone check\n  if (u_solidExtremities.x > 0.5 && v_zone < 0.5) {\n    // In tail extremity zone and solidExtremities.tail is enabled\n    return dashColor;\n  }\n  // Head solid zone check\n  if (u_solidExtremities.y > 0.5 && v_zone > 1.5) {\n    // In head extremity zone and solidExtremities.head is enabled\n    return dashColor;\n  }\n\n  // Compute extremity lengths in world units for margin calculation\n  float tailExtremityLength = v_tailLengthRatio * ctx.thickness;\n  float headExtremityLength = v_headLengthRatio * ctx.thickness;\n\n  // Convert pixel margins to world units (same formula as thickness conversion)\n  float tailMarginWorld = u_solidMargin.x * u_correctionRatio / u_sizeRatio;\n  float headMarginWorld = u_solidMargin.y * u_correctionRatio / u_sizeRatio;\n\n  // Tail margin check (margin starts after extremity zone)\n  float tailSolidZone = (u_solidExtremities.x > 0.5 ? tailExtremityLength : 0.0) + tailMarginWorld;\n  if (ctx.distanceFromSource < tailSolidZone) {\n    return dashColor;\n  }\n\n  // Head margin check (margin starts before extremity zone)\n  float headSolidZone = (u_solidExtremities.y > 0.5 ? headExtremityLength : 0.0) + headMarginWorld;\n  if (ctx.distanceToTarget < headSolidZone) {\n    return dashColor;\n  }\n\n  // Get dash size values (from attribute if available, otherwise uniform)\n  float dashSizeValue = ").concat(getDashSizeGLSL("dashSize", hasDashSizeAttr), ";\n  float gapSizeValue = ").concat(getDashSizeGLSL("gapSize", hasGapSizeAttr), ";\n  float dashOffsetValue = ").concat(getDashSizeGLSL("dashOffset", hasDashOffsetAttr), ";\n\n  // Compute actual sizes (either in pixels converted to world units, or relative to thickness)\n  float pixelToWorld = u_correctionRatio / u_sizeRatio;\n  float dashSize = dashSizeValue * (u_sizeMode.x > 0.5 ? ctx.thickness : pixelToWorld);\n  float gapSize = gapSizeValue * (u_sizeMode.y > 0.5 ? ctx.thickness : pixelToWorld);\n  float dashOffset = dashOffsetValue * (u_sizeMode.z > 0.5 ? ctx.thickness : pixelToWorld);\n\n  // Early return when no visible dash pattern:\n  // - dashSize \u2248 0: no dashes to show, return transparent (let plain layer show through)\n  // - gapSize \u2248 0: all dash/no gap, effectively solid, return transparent (let plain layer handle it)\n  // Threshold scales with pixelToWorld so it stays ~0.1px regardless of zoom\n  float dashThreshold = 0.1 * pixelToWorld;\n  if (dashSize < dashThreshold || gapSize < dashThreshold) {\n    return vec4(0.0);\n  }\n\n  // Pattern length is dash + gap\n  float patternLength = dashSize + gapSize;\n\n  // Adjust distances for solid zones (pattern starts after solid zones)\n  float adjustedDistFromSource = ctx.distanceFromSource - tailSolidZone;\n  float adjustedDistToTarget = ctx.distanceToTarget - headSolidZone;\n\n  // Compute alignment anchor point\n  // - align: 0 \u2192 anchor at start, pattern begins with a dash\n  // - align: 1 \u2192 anchor at end, pattern ends with a dash\n  // - align: 0.5 \u2192 anchor at center, pattern is symmetric\n  float dashedLength = adjustedDistFromSource + adjustedDistToTarget;\n  float anchorDist = u_align * dashedLength;\n\n  // Position within the repeating pattern\n  // By subtracting anchorDist, we ensure the anchor point maps to position 0 in the pattern\n  // This avoids the unstable mod(dashedLength, patternLength) operation\n  float posInPattern = mod(adjustedDistFromSource - anchorDist + dashOffset, patternLength);\n\n  // Signed longitudinal distance to the nearest dash center, wrapping across\n  // pattern repetitions so both dash edges antialias correctly\n  float longFromCenter =\n    mod(posInPattern - dashSize * 0.5 + patternLength * 0.5, patternLength) - patternLength * 0.5;\n\n  // Compute signed distance field for the dash\n  // Positive inside dash, negative inside gap\n").concat(cap === "round" ? "  // Capsule SDF: round caps carved inside the dash length, so a dash never\n  // exceeds dashSize. Dashes shorter than the thickness degenerate to circles\n  // (dots) of diameter dashSize.\n  // ctx.sdf is 0 at the stroke boundary, so shift it back to centerline distance\n  float transverse = ctx.sdf + ctx.thickness * 0.5;\n  float capRadius = min(ctx.thickness, dashSize) * 0.5;\n  float halfLength = dashSize * 0.5 - capRadius;\n  vec2 q = vec2(max(abs(longFromCenter) - halfLength, 0.0), transverse);\n  float sdf = capRadius - length(q);" : "  float sdf = dashSize * 0.5 - abs(longFromCenter);", "\n\n  // Apply antialiasing using smoothstep\n  // aaWidth is in world units, same as our distance\n  float dashAlpha = smoothstep(-ctx.aaWidth, ctx.aaWidth, sdf);\n\n  // Gap color (straight alpha, like the dash color)\n  vec4 gapColor = ").concat(gapColorGLSL, ";\n\n  // Blend between gap and dash colors\n  return mix(gapColor, dashColor, dashAlpha);\n}\n")
    );
    return {
      name: "dashed",
      glsl,
      uniforms,
      attributes,
      needsNodeColors
    };
  }
  return __toCommonJS(entry_exports);
})();
/*! Bundled license information:

sigma/dist/edge-data-texture-0ba3f15f.esm.js:
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)
*/

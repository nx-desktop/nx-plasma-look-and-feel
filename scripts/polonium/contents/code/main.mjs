var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/obliterator/support.js
var require_support = __commonJS({
  "node_modules/obliterator/support.js"(exports) {
    exports.ARRAY_BUFFER_SUPPORT = typeof ArrayBuffer !== "undefined";
    exports.SYMBOL_SUPPORT = typeof Symbol !== "undefined";
  }
});

// node_modules/obliterator/foreach.js
var require_foreach = __commonJS({
  "node_modules/obliterator/foreach.js"(exports, module) {
    var support = require_support();
    var ARRAY_BUFFER_SUPPORT = support.ARRAY_BUFFER_SUPPORT;
    var SYMBOL_SUPPORT = support.SYMBOL_SUPPORT;
    module.exports = function forEach(iterable, callback) {
      var iterator, k, i, l, s;
      if (!iterable)
        throw new Error("obliterator/forEach: invalid iterable.");
      if (typeof callback !== "function")
        throw new Error("obliterator/forEach: expecting a callback.");
      if (Array.isArray(iterable) || ARRAY_BUFFER_SUPPORT && ArrayBuffer.isView(iterable) || typeof iterable === "string" || iterable.toString() === "[object Arguments]") {
        for (i = 0, l = iterable.length; i < l; i++)
          callback(iterable[i], i);
        return;
      }
      if (typeof iterable.forEach === "function") {
        iterable.forEach(callback);
        return;
      }
      if (SYMBOL_SUPPORT && Symbol.iterator in iterable && typeof iterable.next !== "function") {
        iterable = iterable[Symbol.iterator]();
      }
      if (typeof iterable.next === "function") {
        iterator = iterable;
        i = 0;
        while (s = iterator.next(), s.done !== true) {
          callback(s.value, i);
          i++;
        }
        return;
      }
      for (k in iterable) {
        if (iterable.hasOwnProperty(k)) {
          callback(iterable[k], k);
        }
      }
      return;
    };
  }
});

// node_modules/mnemonist/utils/comparators.js
var require_comparators = __commonJS({
  "node_modules/mnemonist/utils/comparators.js"(exports) {
    var DEFAULT_COMPARATOR = function(a, b) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    };
    var DEFAULT_REVERSE_COMPARATOR = function(a, b) {
      if (a < b)
        return 1;
      if (a > b)
        return -1;
      return 0;
    };
    function reverseComparator(comparator) {
      return function(a, b) {
        return comparator(b, a);
      };
    }
    function createTupleComparator(size) {
      if (size === 2) {
        return function(a, b) {
          if (a[0] < b[0])
            return -1;
          if (a[0] > b[0])
            return 1;
          if (a[1] < b[1])
            return -1;
          if (a[1] > b[1])
            return 1;
          return 0;
        };
      }
      return function(a, b) {
        var i = 0;
        while (i < size) {
          if (a[i] < b[i])
            return -1;
          if (a[i] > b[i])
            return 1;
          i++;
        }
        return 0;
      };
    }
    exports.DEFAULT_COMPARATOR = DEFAULT_COMPARATOR;
    exports.DEFAULT_REVERSE_COMPARATOR = DEFAULT_REVERSE_COMPARATOR;
    exports.reverseComparator = reverseComparator;
    exports.createTupleComparator = createTupleComparator;
  }
});

// node_modules/mnemonist/utils/typed-arrays.js
var require_typed_arrays = __commonJS({
  "node_modules/mnemonist/utils/typed-arrays.js"(exports) {
    var MAX_8BIT_INTEGER = Math.pow(2, 8) - 1;
    var MAX_16BIT_INTEGER = Math.pow(2, 16) - 1;
    var MAX_32BIT_INTEGER = Math.pow(2, 32) - 1;
    var MAX_SIGNED_8BIT_INTEGER = Math.pow(2, 7) - 1;
    var MAX_SIGNED_16BIT_INTEGER = Math.pow(2, 15) - 1;
    var MAX_SIGNED_32BIT_INTEGER = Math.pow(2, 31) - 1;
    exports.getPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_8BIT_INTEGER)
        return Uint8Array;
      if (maxIndex <= MAX_16BIT_INTEGER)
        return Uint16Array;
      if (maxIndex <= MAX_32BIT_INTEGER)
        return Uint32Array;
      throw new Error("mnemonist: Pointer Array of size > 4294967295 is not supported.");
    };
    exports.getSignedPointerArray = function(size) {
      var maxIndex = size - 1;
      if (maxIndex <= MAX_SIGNED_8BIT_INTEGER)
        return Int8Array;
      if (maxIndex <= MAX_SIGNED_16BIT_INTEGER)
        return Int16Array;
      if (maxIndex <= MAX_SIGNED_32BIT_INTEGER)
        return Int32Array;
      return Float64Array;
    };
    exports.getNumberType = function(value) {
      if (value === (value | 0)) {
        if (Math.sign(value) === -1) {
          if (value <= 127 && value >= -128)
            return Int8Array;
          if (value <= 32767 && value >= -32768)
            return Int16Array;
          return Int32Array;
        } else {
          if (value <= 255)
            return Uint8Array;
          if (value <= 65535)
            return Uint16Array;
          return Uint32Array;
        }
      }
      return Float64Array;
    };
    var TYPE_PRIORITY = {
      Uint8Array: 1,
      Int8Array: 2,
      Uint16Array: 3,
      Int16Array: 4,
      Uint32Array: 5,
      Int32Array: 6,
      Float32Array: 7,
      Float64Array: 8
    };
    exports.getMinimalRepresentation = function(array, getter) {
      var maxType = null, maxPriority = 0, p, t, v, i, l;
      for (i = 0, l = array.length; i < l; i++) {
        v = getter ? getter(array[i]) : array[i];
        t = exports.getNumberType(v);
        p = TYPE_PRIORITY[t.name];
        if (p > maxPriority) {
          maxPriority = p;
          maxType = t;
        }
      }
      return maxType;
    };
    exports.isTypedArray = function(value) {
      return typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(value);
    };
    exports.concat = function() {
      var length = 0, i, o, l;
      for (i = 0, l = arguments.length; i < l; i++)
        length += arguments[i].length;
      var array = new arguments[0].constructor(length);
      for (i = 0, o = 0; i < l; i++) {
        array.set(arguments[i], o);
        o += arguments[i].length;
      }
      return array;
    };
    exports.indices = function(length) {
      var PointerArray = exports.getPointerArray(length);
      var array = new PointerArray(length);
      for (var i = 0; i < length; i++)
        array[i] = i;
      return array;
    };
  }
});

// node_modules/mnemonist/utils/iterables.js
var require_iterables = __commonJS({
  "node_modules/mnemonist/utils/iterables.js"(exports) {
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    function isArrayLike(target) {
      return Array.isArray(target) || typed.isTypedArray(target);
    }
    function guessLength(target) {
      if (typeof target.length === "number")
        return target.length;
      if (typeof target.size === "number")
        return target.size;
      return;
    }
    function toArray(target) {
      var l = guessLength(target);
      var array = typeof l === "number" ? new Array(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i++] = value;
      });
      return array;
    }
    function toArrayWithIndices(target) {
      var l = guessLength(target);
      var IndexArray = typeof l === "number" ? typed.getPointerArray(l) : Array;
      var array = typeof l === "number" ? new Array(l) : [];
      var indices = typeof l === "number" ? new IndexArray(l) : [];
      var i = 0;
      forEach(target, function(value) {
        array[i] = value;
        indices[i] = i++;
      });
      return [array, indices];
    }
    exports.isArrayLike = isArrayLike;
    exports.guessLength = guessLength;
    exports.toArray = toArray;
    exports.toArrayWithIndices = toArrayWithIndices;
  }
});

// node_modules/mnemonist/heap.js
var require_heap = __commonJS({
  "node_modules/mnemonist/heap.js"(exports, module) {
    var forEach = require_foreach();
    var comparators = require_comparators();
    var iterables = require_iterables();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function siftDown(compare, heap, startIndex, i) {
      var item = heap[i], parentIndex, parent;
      while (i > startIndex) {
        parentIndex = i - 1 >> 1;
        parent = heap[parentIndex];
        if (compare(item, parent) < 0) {
          heap[i] = parent;
          i = parentIndex;
          continue;
        }
        break;
      }
      heap[i] = item;
    }
    function siftUp(compare, heap, i) {
      var endIndex = heap.length, startIndex = i, item = heap[i], childIndex = 2 * i + 1, rightIndex;
      while (childIndex < endIndex) {
        rightIndex = childIndex + 1;
        if (rightIndex < endIndex && compare(heap[childIndex], heap[rightIndex]) >= 0) {
          childIndex = rightIndex;
        }
        heap[i] = heap[childIndex];
        i = childIndex;
        childIndex = 2 * i + 1;
      }
      heap[i] = item;
      siftDown(compare, heap, startIndex, i);
    }
    function push(compare, heap, item) {
      heap.push(item);
      siftDown(compare, heap, 0, heap.length - 1);
    }
    function pop(compare, heap) {
      var lastItem = heap.pop();
      if (heap.length !== 0) {
        var item = heap[0];
        heap[0] = lastItem;
        siftUp(compare, heap, 0);
        return item;
      }
      return lastItem;
    }
    function replace(compare, heap, item) {
      if (heap.length === 0)
        throw new Error("mnemonist/heap.replace: cannot pop an empty heap.");
      var popped = heap[0];
      heap[0] = item;
      siftUp(compare, heap, 0);
      return popped;
    }
    function pushpop(compare, heap, item) {
      var tmp;
      if (heap.length !== 0 && compare(heap[0], item) < 0) {
        tmp = heap[0];
        heap[0] = item;
        item = tmp;
        siftUp(compare, heap, 0);
      }
      return item;
    }
    function heapify(compare, array) {
      var n = array.length, l = n >> 1, i = l;
      while (--i >= 0)
        siftUp(compare, array, i);
    }
    function consume(compare, heap) {
      var l = heap.length, i = 0;
      var array = new Array(l);
      while (i < l)
        array[i++] = pop(compare, heap);
      return array;
    }
    function nsmallest(compare, n, iterable) {
      if (arguments.length === 2) {
        iterable = n;
        n = compare;
        compare = DEFAULT_COMPARATOR;
      }
      var reverseCompare = reverseComparator(compare);
      var i, l, v;
      var min = Infinity;
      var result;
      if (n === 1) {
        if (iterables.isArrayLike(iterable)) {
          for (i = 0, l = iterable.length; i < l; i++) {
            v = iterable[i];
            if (min === Infinity || compare(v, min) < 0)
              min = v;
          }
          result = new iterable.constructor(1);
          result[0] = min;
          return result;
        }
        forEach(iterable, function(value) {
          if (min === Infinity || compare(value, min) < 0)
            min = value;
        });
        return [min];
      }
      if (iterables.isArrayLike(iterable)) {
        if (n >= iterable.length)
          return iterable.slice().sort(compare);
        result = iterable.slice(0, n);
        heapify(reverseCompare, result);
        for (i = n, l = iterable.length; i < l; i++)
          if (reverseCompare(iterable[i], result[0]) > 0)
            replace(reverseCompare, result, iterable[i]);
        return result.sort(compare);
      }
      var size = iterables.guessLength(iterable);
      if (size !== null && size < n)
        n = size;
      result = new Array(n);
      i = 0;
      forEach(iterable, function(value) {
        if (i < n) {
          result[i] = value;
        } else {
          if (i === n)
            heapify(reverseCompare, result);
          if (reverseCompare(value, result[0]) > 0)
            replace(reverseCompare, result, value);
        }
        i++;
      });
      if (result.length > i)
        result.length = i;
      return result.sort(compare);
    }
    function nlargest(compare, n, iterable) {
      if (arguments.length === 2) {
        iterable = n;
        n = compare;
        compare = DEFAULT_COMPARATOR;
      }
      var reverseCompare = reverseComparator(compare);
      var i, l, v;
      var max = -Infinity;
      var result;
      if (n === 1) {
        if (iterables.isArrayLike(iterable)) {
          for (i = 0, l = iterable.length; i < l; i++) {
            v = iterable[i];
            if (max === -Infinity || compare(v, max) > 0)
              max = v;
          }
          result = new iterable.constructor(1);
          result[0] = max;
          return result;
        }
        forEach(iterable, function(value) {
          if (max === -Infinity || compare(value, max) > 0)
            max = value;
        });
        return [max];
      }
      if (iterables.isArrayLike(iterable)) {
        if (n >= iterable.length)
          return iterable.slice().sort(reverseCompare);
        result = iterable.slice(0, n);
        heapify(compare, result);
        for (i = n, l = iterable.length; i < l; i++)
          if (compare(iterable[i], result[0]) > 0)
            replace(compare, result, iterable[i]);
        return result.sort(reverseCompare);
      }
      var size = iterables.guessLength(iterable);
      if (size !== null && size < n)
        n = size;
      result = new Array(n);
      i = 0;
      forEach(iterable, function(value) {
        if (i < n) {
          result[i] = value;
        } else {
          if (i === n)
            heapify(compare, result);
          if (compare(value, result[0]) > 0)
            replace(compare, result, value);
        }
        i++;
      });
      if (result.length > i)
        result.length = i;
      return result.sort(reverseCompare);
    }
    function Heap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/Heap.constructor: given comparator should be a function.");
    }
    Heap.prototype.clear = function() {
      this.items = [];
      this.size = 0;
    };
    Heap.prototype.push = function(item) {
      push(this.comparator, this.items, item);
      return ++this.size;
    };
    Heap.prototype.peek = function() {
      return this.items[0];
    };
    Heap.prototype.pop = function() {
      if (this.size !== 0)
        this.size--;
      return pop(this.comparator, this.items);
    };
    Heap.prototype.replace = function(item) {
      return replace(this.comparator, this.items, item);
    };
    Heap.prototype.pushpop = function(item) {
      return pushpop(this.comparator, this.items, item);
    };
    Heap.prototype.consume = function() {
      this.size = 0;
      return consume(this.comparator, this.items);
    };
    Heap.prototype.toArray = function() {
      return consume(this.comparator, this.items.slice());
    };
    Heap.prototype.inspect = function() {
      var proxy = this.toArray();
      Object.defineProperty(proxy, "constructor", {
        value: Heap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Heap.prototype[Symbol.for("nodejs.util.inspect.custom")] = Heap.prototype.inspect;
    function MaxHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/MaxHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    MaxHeap.prototype = Heap.prototype;
    Heap.from = function(iterable, comparator) {
      var heap = new Heap(comparator);
      var items;
      if (iterables.isArrayLike(iterable))
        items = iterable.slice();
      else
        items = iterables.toArray(iterable);
      heapify(heap.comparator, items);
      heap.items = items;
      heap.size = items.length;
      return heap;
    };
    MaxHeap.from = function(iterable, comparator) {
      var heap = new MaxHeap(comparator);
      var items;
      if (iterables.isArrayLike(iterable))
        items = iterable.slice();
      else
        items = iterables.toArray(iterable);
      heapify(heap.comparator, items);
      heap.items = items;
      heap.size = items.length;
      return heap;
    };
    Heap.siftUp = siftUp;
    Heap.siftDown = siftDown;
    Heap.push = push;
    Heap.pop = pop;
    Heap.replace = replace;
    Heap.pushpop = pushpop;
    Heap.heapify = heapify;
    Heap.consume = consume;
    Heap.nsmallest = nsmallest;
    Heap.nlargest = nlargest;
    Heap.MinHeap = Heap;
    Heap.MaxHeap = MaxHeap;
    module.exports = Heap;
  }
});

// node_modules/mnemonist/fibonacci-heap.js
var require_fibonacci_heap = __commonJS({
  "node_modules/mnemonist/fibonacci-heap.js"(exports, module) {
    var comparators = require_comparators();
    var forEach = require_foreach();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function FibonacciHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
    }
    FibonacciHeap.prototype.clear = function() {
      this.root = null;
      this.min = null;
      this.size = 0;
    };
    function createNode(item) {
      return {
        item,
        degree: 0
      };
    }
    function mergeWithRoot(heap, node) {
      if (!heap.root) {
        heap.root = node;
      } else {
        node.right = heap.root.right;
        node.left = heap.root;
        heap.root.right.left = node;
        heap.root.right = node;
      }
    }
    FibonacciHeap.prototype.push = function(item) {
      var node = createNode(item);
      node.left = node;
      node.right = node;
      mergeWithRoot(this, node);
      if (!this.min || this.comparator(node.item, this.min.item) <= 0)
        this.min = node;
      return ++this.size;
    };
    FibonacciHeap.prototype.peek = function() {
      return this.min ? this.min.item : void 0;
    };
    function consumeLinkedList(head) {
      var nodes = [], node = head, flag = false;
      while (true) {
        if (node === head && flag)
          break;
        else if (node === head)
          flag = true;
        nodes.push(node);
        node = node.right;
      }
      return nodes;
    }
    function removeFromRoot(heap, node) {
      if (heap.root === node)
        heap.root = node.right;
      node.left.right = node.right;
      node.right.left = node.left;
    }
    function mergeWithChild(parent, node) {
      if (!parent.child) {
        parent.child = node;
      } else {
        node.right = parent.child.right;
        node.left = parent.child;
        parent.child.right.left = node;
        parent.child.right = node;
      }
    }
    function link(heap, y, x) {
      removeFromRoot(heap, y);
      y.left = y;
      y.right = y;
      mergeWithChild(x, y);
      x.degree++;
      y.parent = x;
    }
    function consolidate(heap) {
      var A = new Array(heap.size), nodes = consumeLinkedList(heap.root), i, l, x, y, d, t;
      for (i = 0, l = nodes.length; i < l; i++) {
        x = nodes[i];
        d = x.degree;
        while (A[d]) {
          y = A[d];
          if (heap.comparator(x.item, y.item) > 0) {
            t = x;
            x = y;
            y = t;
          }
          link(heap, y, x);
          A[d] = null;
          d++;
        }
        A[d] = x;
      }
      for (i = 0; i < heap.size; i++) {
        if (A[i] && heap.comparator(A[i].item, heap.min.item) <= 0)
          heap.min = A[i];
      }
    }
    FibonacciHeap.prototype.pop = function() {
      if (!this.size)
        return void 0;
      var z = this.min;
      if (z.child) {
        var nodes = consumeLinkedList(z.child), node, i, l;
        for (i = 0, l = nodes.length; i < l; i++) {
          node = nodes[i];
          mergeWithRoot(this, node);
          delete node.parent;
        }
      }
      removeFromRoot(this, z);
      if (z === z.right) {
        this.min = null;
        this.root = null;
      } else {
        this.min = z.right;
        consolidate(this);
      }
      this.size--;
      return z.item;
    };
    FibonacciHeap.prototype.inspect = function() {
      var proxy = {
        size: this.size
      };
      if (this.min && "item" in this.min)
        proxy.top = this.min.item;
      Object.defineProperty(proxy, "constructor", {
        value: FibonacciHeap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      FibonacciHeap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FibonacciHeap.prototype.inspect;
    function MaxFibonacciHeap(comparator) {
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FibonacciHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    MaxFibonacciHeap.prototype = FibonacciHeap.prototype;
    FibonacciHeap.from = function(iterable, comparator) {
      var heap = new FibonacciHeap(comparator);
      forEach(iterable, function(value) {
        heap.push(value);
      });
      return heap;
    };
    MaxFibonacciHeap.from = function(iterable, comparator) {
      var heap = new MaxFibonacciHeap(comparator);
      forEach(iterable, function(value) {
        heap.push(value);
      });
      return heap;
    };
    FibonacciHeap.MinFibonacciHeap = FibonacciHeap;
    FibonacciHeap.MaxFibonacciHeap = MaxFibonacciHeap;
    module.exports = FibonacciHeap;
  }
});

// node_modules/mnemonist/suffix-array.js
var require_suffix_array = __commonJS({
  "node_modules/mnemonist/suffix-array.js"(exports, module) {
    var SEPARATOR = "";
    function sort(string, array, offset) {
      var l = array.length, buckets = [], i = l, j = -1, b, d = 0, bits;
      while (i--)
        j = Math.max(string[array[i] + offset], j);
      bits = j >> 24 && 32 || j >> 16 && 24 || j >> 8 && 16 || 8;
      for (; d < bits; d += 4) {
        for (i = 16; i--; )
          buckets[i] = [];
        for (i = l; i--; )
          buckets[string[array[i] + offset] >> d & 15].push(array[i]);
        for (b = 0; b < 16; b++) {
          for (j = buckets[b].length; j--; )
            array[++i] = buckets[b][j];
        }
      }
    }
    function compare(string, lookup, m, n) {
      return string[m] - string[n] || (m % 3 === 2 ? string[m + 1] - string[n + 1] || lookup[m + 2] - lookup[n + 2] : lookup[m + 1] - lookup[n + 1]);
    }
    function build(string, l) {
      var a = [], b = [], al = 2 * l / 3 | 0, bl = l - al, r = al + 1 >> 1, i = al, j = 0, k, lookup = [], result = [];
      if (l === 1)
        return [0];
      while (i--)
        a[i] = (i * 3 >> 1) + 1;
      for (i = 3; i--; )
        sort(string, a, i);
      j = b[(a[0] / 3 | 0) + (a[0] % 3 === 1 ? 0 : r)] = 1;
      for (i = 1; i < al; i++) {
        if (string[a[i]] !== string[a[i - 1]] || string[a[i] + 1] !== string[a[i - 1] + 1] || string[a[i] + 2] !== string[a[i - 1] + 2])
          j++;
        b[(a[i] / 3 | 0) + (a[i] % 3 === 1 ? 0 : r)] = j;
      }
      if (j < al) {
        b = build(b, al);
        for (i = al; i--; )
          a[i] = b[i] < r ? b[i] * 3 + 1 : (b[i] - r) * 3 + 2;
      }
      for (i = al; i--; )
        lookup[a[i]] = i;
      lookup[l] = -1;
      lookup[l + 1] = -2;
      b = l % 3 === 1 ? [l - 1] : [];
      for (i = 0; i < al; i++) {
        if (a[i] % 3 === 1)
          b.push(a[i] - 1);
      }
      sort(string, b, 0);
      for (i = 0, j = 0, k = 0; i < al && j < bl; )
        result[k++] = compare(string, lookup, a[i], b[j]) < 0 ? a[i++] : b[j++];
      while (i < al)
        result[k++] = a[i++];
      while (j < bl)
        result[k++] = b[j++];
      return result;
    }
    function convert(target) {
      var length = target.length, paddingOffset = length % 3, array = new Array(length + paddingOffset), l, i;
      if (typeof target !== "string") {
        var uniqueTokens = /* @__PURE__ */ Object.create(null);
        for (i = 0; i < length; i++) {
          if (!uniqueTokens[target[i]])
            uniqueTokens[target[i]] = true;
        }
        var alphabet = /* @__PURE__ */ Object.create(null), sortedUniqueTokens = Object.keys(uniqueTokens).sort();
        for (i = 0, l = sortedUniqueTokens.length; i < l; i++)
          alphabet[sortedUniqueTokens[i]] = i + 1;
        for (i = 0; i < length; i++) {
          array[i] = alphabet[target[i]];
        }
      } else {
        for (i = 0; i < length; i++)
          array[i] = target.charCodeAt(i);
      }
      for (i = length; i < length + paddingOffset; i++)
        array[i] = 0;
      return array;
    }
    function SuffixArray(string) {
      this.hasArbitrarySequence = typeof string !== "string";
      this.string = string;
      this.length = string.length;
      this.array = build(convert(string), this.length);
    }
    SuffixArray.prototype.toString = function() {
      return this.array.join(",");
    };
    SuffixArray.prototype.toJSON = function() {
      return this.array;
    };
    SuffixArray.prototype.inspect = function() {
      var array = new Array(this.length);
      for (var i = 0; i < this.length; i++)
        array[i] = this.string.slice(this.array[i]);
      Object.defineProperty(array, "constructor", {
        value: SuffixArray,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      SuffixArray.prototype[Symbol.for("nodejs.util.inspect.custom")] = SuffixArray.prototype.inspect;
    function GeneralizedSuffixArray(strings) {
      this.hasArbitrarySequence = typeof strings[0] !== "string";
      this.size = strings.length;
      if (this.hasArbitrarySequence) {
        this.text = [];
        for (var i = 0, l = this.size; i < l; i++) {
          this.text.push.apply(this.text, strings[i]);
          if (i < l - 1)
            this.text.push(SEPARATOR);
        }
      } else {
        this.text = strings.join(SEPARATOR);
      }
      this.firstLength = strings[0].length;
      this.length = this.text.length;
      this.array = build(convert(this.text), this.length);
    }
    GeneralizedSuffixArray.prototype.longestCommonSubsequence = function() {
      var lcs = this.hasArbitrarySequence ? [] : "", lcp, i, j, s, t;
      for (i = 1; i < this.length; i++) {
        s = this.array[i];
        t = this.array[i - 1];
        if (s < this.firstLength && t < this.firstLength)
          continue;
        if (s > this.firstLength && t > this.firstLength)
          continue;
        lcp = Math.min(this.length - s, this.length - t);
        for (j = 0; j < lcp; j++) {
          if (this.text[s + j] !== this.text[t + j]) {
            lcp = j;
            break;
          }
        }
        if (lcp > lcs.length)
          lcs = this.text.slice(s, s + lcp);
      }
      return lcs;
    };
    GeneralizedSuffixArray.prototype.toString = function() {
      return this.array.join(",");
    };
    GeneralizedSuffixArray.prototype.toJSON = function() {
      return this.array;
    };
    GeneralizedSuffixArray.prototype.inspect = function() {
      var array = new Array(this.length);
      for (var i = 0; i < this.length; i++)
        array[i] = this.text.slice(this.array[i]);
      Object.defineProperty(array, "constructor", {
        value: GeneralizedSuffixArray,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      GeneralizedSuffixArray.prototype[Symbol.for("nodejs.util.inspect.custom")] = GeneralizedSuffixArray.prototype.inspect;
    SuffixArray.GeneralizedSuffixArray = GeneralizedSuffixArray;
    module.exports = SuffixArray;
  }
});

// node_modules/mnemonist/bi-map.js
var require_bi_map = __commonJS({
  "node_modules/mnemonist/bi-map.js"(exports, module) {
    var forEach = require_foreach();
    function InverseMap(original) {
      this.size = 0;
      this.items = /* @__PURE__ */ new Map();
      this.inverse = original;
    }
    function BiMap5() {
      this.size = 0;
      this.items = /* @__PURE__ */ new Map();
      this.inverse = new InverseMap(this);
    }
    function clear() {
      this.size = 0;
      this.items.clear();
      this.inverse.items.clear();
    }
    BiMap5.prototype.clear = clear;
    InverseMap.prototype.clear = clear;
    function set(key, value) {
      if (this.items.has(key)) {
        var currentValue = this.items.get(key);
        if (currentValue === value)
          return this;
        else
          this.inverse.items.delete(currentValue);
      }
      if (this.inverse.items.has(value)) {
        var currentKey = this.inverse.items.get(value);
        if (currentKey === key)
          return this;
        else
          this.items.delete(currentKey);
      }
      this.items.set(key, value);
      this.inverse.items.set(value, key);
      this.size = this.items.size;
      this.inverse.size = this.inverse.items.size;
      return this;
    }
    BiMap5.prototype.set = set;
    InverseMap.prototype.set = set;
    function del(key) {
      if (this.items.has(key)) {
        var currentValue = this.items.get(key);
        this.items.delete(key);
        this.inverse.items.delete(currentValue);
        this.size = this.items.size;
        this.inverse.size = this.inverse.items.size;
        return true;
      }
      return false;
    }
    BiMap5.prototype.delete = del;
    InverseMap.prototype.delete = del;
    var METHODS = ["has", "get", "forEach", "keys", "values", "entries"];
    METHODS.forEach(function(name) {
      BiMap5.prototype[name] = InverseMap.prototype[name] = function() {
        return Map.prototype[name].apply(this.items, arguments);
      };
    });
    if (typeof Symbol !== "undefined") {
      BiMap5.prototype[Symbol.iterator] = BiMap5.prototype.entries;
      InverseMap.prototype[Symbol.iterator] = InverseMap.prototype.entries;
    }
    BiMap5.prototype.inspect = function() {
      var dummy = {
        left: this.items,
        right: this.inverse.items
      };
      Object.defineProperty(dummy, "constructor", {
        value: BiMap5,
        enumerable: false
      });
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      BiMap5.prototype[Symbol.for("nodejs.util.inspect.custom")] = BiMap5.prototype.inspect;
    InverseMap.prototype.inspect = function() {
      var dummy = {
        left: this.inverse.items,
        right: this.items
      };
      Object.defineProperty(dummy, "constructor", {
        value: InverseMap,
        enumerable: false
      });
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      InverseMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = InverseMap.prototype.inspect;
    BiMap5.from = function(iterable) {
      var bimap = new BiMap5();
      forEach(iterable, function(value, key) {
        bimap.set(key, value);
      });
      return bimap;
    };
    module.exports = BiMap5;
  }
});

// node_modules/obliterator/iterator.js
var require_iterator = __commonJS({
  "node_modules/obliterator/iterator.js"(exports, module) {
    function Iterator(next) {
      if (typeof next !== "function")
        throw new Error("obliterator/iterator: expecting a function!");
      this.next = next;
    }
    if (typeof Symbol !== "undefined")
      Iterator.prototype[Symbol.iterator] = function() {
        return this;
      };
    Iterator.of = function() {
      var args = arguments, l = args.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: args[i++] };
      });
    };
    Iterator.empty = function() {
      var iterator = new Iterator(function() {
        return { done: true };
      });
      return iterator;
    };
    Iterator.fromSequence = function(sequence) {
      var i = 0, l = sequence.length;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        return { done: false, value: sequence[i++] };
      });
    };
    Iterator.is = function(value) {
      if (value instanceof Iterator)
        return true;
      return typeof value === "object" && value !== null && typeof value.next === "function";
    };
    module.exports = Iterator;
  }
});

// node_modules/mnemonist/utils/bitwise.js
var require_bitwise = __commonJS({
  "node_modules/mnemonist/utils/bitwise.js"(exports) {
    function msb32(x) {
      x |= x >> 1;
      x |= x >> 2;
      x |= x >> 4;
      x |= x >> 8;
      x |= x >> 16;
      return x & ~(x >> 1);
    }
    exports.msb32 = msb32;
    function msb8(x) {
      x |= x >> 1;
      x |= x >> 2;
      x |= x >> 4;
      return x & ~(x >> 1);
    }
    exports.msb8 = msb8;
    exports.test = function(x, pos) {
      return x >> pos & 1;
    };
    exports.criticalBit8 = function(a, b) {
      return msb8(a ^ b);
    };
    exports.criticalBit8Mask = function(a, b) {
      return ~msb8(a ^ b) >>> 0 & 255;
    };
    exports.testCriticalBit8 = function(x, mask) {
      return 1 + (x | mask) >> 8;
    };
    exports.criticalBit32Mask = function(a, b) {
      return ~msb32(a ^ b) >>> 0 & 4294967295;
    };
    exports.popcount = function(x) {
      x -= x >> 1 & 1431655765;
      x = (x & 858993459) + (x >> 2 & 858993459);
      x = x + (x >> 4) & 252645135;
      x += x >> 8;
      x += x >> 16;
      return x & 127;
    };
    var TABLE8 = new Uint8Array(Math.pow(2, 8));
    for (i = 0, l = TABLE8.length; i < l; i++)
      TABLE8[i] = exports.popcount(i);
    var i;
    var l;
    exports.table8Popcount = function(x) {
      return TABLE8[x & 255] + TABLE8[x >> 8 & 255] + TABLE8[x >> 16 & 255] + TABLE8[x >> 24 & 255];
    };
  }
});

// node_modules/mnemonist/bit-set.js
var require_bit_set = __commonJS({
  "node_modules/mnemonist/bit-set.js"(exports, module) {
    var Iterator = require_iterator();
    var bitwise = require_bitwise();
    function BitSet(length) {
      this.length = length;
      this.clear();
    }
    BitSet.prototype.clear = function() {
      this.size = 0;
      this.array = new Uint32Array(Math.ceil(this.length / 32));
    };
    BitSet.prototype.set = function(index2, value) {
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex], newBytes;
      if (value === 0 || value === false)
        newBytes = this.array[byteIndex] &= ~(1 << pos);
      else
        newBytes = this.array[byteIndex] |= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.reset = function(index2) {
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex], newBytes;
      newBytes = this.array[byteIndex] &= ~(1 << pos);
      if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.flip = function(index2) {
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex];
      var newBytes = this.array[byteIndex] ^= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitSet.prototype.get = function(index2) {
      var byteIndex = index2 >> 5, pos = index2 & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitSet.prototype.test = function(index2) {
      return Boolean(this.get(index2));
    };
    BitSet.prototype.rank = function(i) {
      if (this.size === 0)
        return 0;
      var byteIndex = i >> 5, pos = i & 31, r = 0;
      for (var j = 0; j < byteIndex; j++)
        r += bitwise.table8Popcount(this.array[j]);
      var maskedByte = this.array[byteIndex] & (1 << pos) - 1;
      r += bitwise.table8Popcount(maskedByte);
      return r;
    };
    BitSet.prototype.select = function(r) {
      if (this.size === 0)
        return -1;
      if (r >= this.length)
        return -1;
      var byte, b = 32, p = 0, c = 0;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (byte === 0)
          continue;
        if (i === l - 1)
          b = this.length % 32 || 32;
        for (var j = 0; j < b; j++, p++) {
          c += byte >> j & 1;
          if (c === r)
            return p;
        }
      }
    };
    BitSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var length = this.length, byte, bit, b = 32;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (i === l - 1)
          b = length % 32 || 32;
        for (var j = 0; j < b; j++) {
          bit = byte >> j & 1;
          callback.call(scope, bit, i * 32 + j);
        }
      }
    };
    BitSet.prototype.values = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: bit
        };
      });
    };
    BitSet.prototype.entries = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, index2, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        index2 = ~-i * 32 + j;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: [index2, bit]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      BitSet.prototype[Symbol.iterator] = BitSet.prototype.values;
    BitSet.prototype.inspect = function() {
      var proxy = new Uint8Array(this.length);
      this.forEach(function(bit, i) {
        proxy[i] = bit;
      });
      Object.defineProperty(proxy, "constructor", {
        value: BitSet,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      BitSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = BitSet.prototype.inspect;
    BitSet.prototype.toJSON = function() {
      return Array.from(this.array);
    };
    module.exports = BitSet;
  }
});

// node_modules/mnemonist/bit-vector.js
var require_bit_vector = __commonJS({
  "node_modules/mnemonist/bit-vector.js"(exports, module) {
    var Iterator = require_iterator();
    var bitwise = require_bitwise();
    var DEFAULT_GROWING_POLICY = function(capacity) {
      return Math.max(1, Math.ceil(capacity * 1.5));
    };
    function createByteArray(capacity) {
      return new Uint32Array(Math.ceil(capacity / 32));
    }
    function BitVector(initialLengthOrOptions) {
      var initialLength = initialLengthOrOptions || 0, policy = DEFAULT_GROWING_POLICY;
      if (typeof initialLengthOrOptions === "object") {
        initialLength = initialLengthOrOptions.initialLength || initialLengthOrOptions.initialCapacity || 0;
        policy = initialLengthOrOptions.policy || policy;
      }
      this.size = 0;
      this.length = initialLength;
      this.capacity = Math.ceil(this.length / 32) * 32;
      this.policy = policy;
      this.array = createByteArray(this.capacity);
    }
    BitVector.prototype.set = function(index2, value) {
      if (this.length < index2)
        throw new Error("BitVector.set: index out of bounds.");
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex], newBytes;
      if (value === 0 || value === false)
        newBytes = this.array[byteIndex] &= ~(1 << pos);
      else
        newBytes = this.array[byteIndex] |= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.reset = function(index2) {
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex], newBytes;
      newBytes = this.array[byteIndex] &= ~(1 << pos);
      if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.flip = function(index2) {
      var byteIndex = index2 >> 5, pos = index2 & 31, oldBytes = this.array[byteIndex];
      var newBytes = this.array[byteIndex] ^= 1 << pos;
      newBytes = newBytes >>> 0;
      if (newBytes > oldBytes)
        this.size++;
      else if (newBytes < oldBytes)
        this.size--;
      return this;
    };
    BitVector.prototype.applyPolicy = function(override) {
      var newCapacity = this.policy(override || this.capacity);
      if (typeof newCapacity !== "number" || newCapacity < 0)
        throw new Error("mnemonist/bit-vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
      if (newCapacity <= this.capacity)
        throw new Error("mnemonist/bit-vector.applyPolicy: policy returned a less or equal capacity to allocate.");
      return Math.ceil(newCapacity / 32) * 32;
    };
    BitVector.prototype.reallocate = function(capacity) {
      var virtualCapacity = capacity;
      capacity = Math.ceil(capacity / 32) * 32;
      if (virtualCapacity < this.length)
        this.length = virtualCapacity;
      if (capacity === this.capacity)
        return this;
      var oldArray = this.array;
      var storageLength = capacity / 32;
      if (storageLength === this.array.length)
        return this;
      if (storageLength > this.array.length) {
        this.array = new Uint32Array(storageLength);
        this.array.set(oldArray, 0);
      } else {
        this.array = oldArray.slice(0, storageLength);
      }
      this.capacity = capacity;
      return this;
    };
    BitVector.prototype.grow = function(capacity) {
      var newCapacity;
      if (typeof capacity === "number") {
        if (this.capacity >= capacity)
          return this;
        newCapacity = this.capacity;
        while (newCapacity < capacity)
          newCapacity = this.applyPolicy(newCapacity);
        this.reallocate(newCapacity);
        return this;
      }
      newCapacity = this.applyPolicy();
      this.reallocate(newCapacity);
      return this;
    };
    BitVector.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.reallocate(length);
      return this;
    };
    BitVector.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      if (value === 0 || value === false)
        return ++this.length;
      this.size++;
      var index2 = this.length++, byteIndex = index2 >> 5, pos = index2 & 31;
      this.array[byteIndex] |= 1 << pos;
      return this.length;
    };
    BitVector.prototype.pop = function() {
      if (this.length === 0)
        return;
      var index2 = --this.length;
      var byteIndex = index2 >> 5, pos = index2 & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitVector.prototype.get = function(index2) {
      if (this.length < index2)
        return void 0;
      var byteIndex = index2 >> 5, pos = index2 & 31;
      return this.array[byteIndex] >> pos & 1;
    };
    BitVector.prototype.test = function(index2) {
      if (this.length < index2)
        return false;
      return Boolean(this.get(index2));
    };
    BitVector.prototype.rank = function(i) {
      if (this.size === 0)
        return 0;
      var byteIndex = i >> 5, pos = i & 31, r = 0;
      for (var j = 0; j < byteIndex; j++)
        r += bitwise.table8Popcount(this.array[j]);
      var maskedByte = this.array[byteIndex] & (1 << pos) - 1;
      r += bitwise.table8Popcount(maskedByte);
      return r;
    };
    BitVector.prototype.select = function(r) {
      if (this.size === 0)
        return -1;
      if (r >= this.length)
        return -1;
      var byte, b = 32, p = 0, c = 0;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (byte === 0)
          continue;
        if (i === l - 1)
          b = this.length % 32 || 32;
        for (var j = 0; j < b; j++, p++) {
          c += byte >> j & 1;
          if (c === r)
            return p;
        }
      }
    };
    BitVector.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var length = this.length, byte, bit, b = 32;
      for (var i = 0, l = this.array.length; i < l; i++) {
        byte = this.array[i];
        if (i === l - 1)
          b = length % 32 || 32;
        for (var j = 0; j < b; j++) {
          bit = byte >> j & 1;
          callback.call(scope, bit, i * 32 + j);
        }
      }
    };
    BitVector.prototype.values = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: bit
        };
      });
    };
    BitVector.prototype.entries = function() {
      var length = this.length, inner = false, byte, bit, array = this.array, index2, l = array.length, i = 0, j = -1, b = 32;
      return new Iterator(function next() {
        if (!inner) {
          if (i >= l)
            return {
              done: true
            };
          if (i === l - 1)
            b = length % 32 || 32;
          byte = array[i++];
          inner = true;
          j = -1;
        }
        j++;
        index2 = ~-i * 32 + j;
        if (j >= b) {
          inner = false;
          return next();
        }
        bit = byte >> j & 1;
        return {
          value: [index2, bit]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      BitVector.prototype[Symbol.iterator] = BitVector.prototype.values;
    BitVector.prototype.inspect = function() {
      var proxy = new Uint8Array(this.length);
      this.forEach(function(bit, i) {
        proxy[i] = bit;
      });
      Object.defineProperty(proxy, "constructor", {
        value: BitVector,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      BitVector.prototype[Symbol.for("nodejs.util.inspect.custom")] = BitVector.prototype.inspect;
    BitVector.prototype.toJSON = function() {
      return Array.from(this.array.slice(0, (this.length >> 5) + 1));
    };
    module.exports = BitVector;
  }
});

// node_modules/mnemonist/utils/murmurhash3.js
var require_murmurhash3 = __commonJS({
  "node_modules/mnemonist/utils/murmurhash3.js"(exports, module) {
    function mul32(a, b) {
      return (a & 65535) * b + (((a >>> 16) * b & 65535) << 16) & 4294967295;
    }
    function sum32(a, b) {
      return (a & 65535) + (b >>> 16) + (((a >>> 16) + b & 65535) << 16) & 4294967295;
    }
    function rotl32(a, b) {
      return a << b | a >>> 32 - b;
    }
    module.exports = function murmurhash3(seed, data) {
      var c1 = 3432918353, c2 = 461845907, r1 = 15, r2 = 13, m = 5, n = 1801774676;
      var hash = seed, k1, i, l;
      for (i = 0, l = data.length - 4; i <= l; i += 4) {
        k1 = data[i] | data[i + 1] << 8 | data[i + 2] << 16 | data[i + 3] << 24;
        k1 = mul32(k1, c1);
        k1 = rotl32(k1, r1);
        k1 = mul32(k1, c2);
        hash ^= k1;
        hash = rotl32(hash, r2);
        hash = mul32(hash, m);
        hash = sum32(hash, n);
      }
      k1 = 0;
      switch (data.length & 3) {
        case 3:
          k1 ^= data[i + 2] << 16;
        case 2:
          k1 ^= data[i + 1] << 8;
        case 1:
          k1 ^= data[i];
          k1 = mul32(k1, c1);
          k1 = rotl32(k1, r1);
          k1 = mul32(k1, c2);
          hash ^= k1;
        default:
      }
      hash ^= data.length;
      hash ^= hash >>> 16;
      hash = mul32(hash, 2246822507);
      hash ^= hash >>> 13;
      hash = mul32(hash, 3266489909);
      hash ^= hash >>> 16;
      return hash >>> 0;
    };
  }
});

// node_modules/mnemonist/bloom-filter.js
var require_bloom_filter = __commonJS({
  "node_modules/mnemonist/bloom-filter.js"(exports, module) {
    var murmurhash3 = require_murmurhash3();
    var forEach = require_foreach();
    var LN2_SQUARED = Math.LN2 * Math.LN2;
    var DEFAULTS = {
      errorRate: 5e-3
    };
    function stringToByteArray(string) {
      var array = new Uint16Array(string.length), i, l;
      for (i = 0, l = string.length; i < l; i++)
        array[i] = string.charCodeAt(i);
      return array;
    }
    function hashArray(length, seed, array) {
      var hash = murmurhash3(seed * 4221880213 & 4294967295, array);
      return hash % (length * 8);
    }
    function BloomFilter(capacityOrOptions) {
      var options2 = {};
      if (!capacityOrOptions)
        throw new Error("mnemonist/BloomFilter.constructor: a BloomFilter must be created with a capacity.");
      if (typeof capacityOrOptions === "object")
        options2 = capacityOrOptions;
      else
        options2.capacity = capacityOrOptions;
      if (typeof options2.capacity !== "number" || options2.capacity <= 0)
        throw new Error("mnemonist/BloomFilter.constructor: `capacity` option should be a positive integer.");
      this.capacity = options2.capacity;
      this.errorRate = options2.errorRate || DEFAULTS.errorRate;
      if (typeof this.errorRate !== "number" || options2.errorRate <= 0)
        throw new Error("mnemonist/BloomFilter.constructor: `errorRate` option should be a positive float.");
      this.clear();
    }
    BloomFilter.prototype.clear = function() {
      var bits = -1 / LN2_SQUARED * this.capacity * Math.log(this.errorRate), length = bits / 8 | 0;
      this.hashFunctions = length * 8 / this.capacity * Math.LN2 | 0;
      this.data = new Uint8Array(length);
      return;
    };
    BloomFilter.prototype.add = function(string) {
      var array = stringToByteArray(string);
      for (var i = 0, l = this.hashFunctions; i < l; i++) {
        var index2 = hashArray(this.data.length, i, array), position = 1 << (7 & index2);
        this.data[index2 >> 3] |= position;
      }
      return this;
    };
    BloomFilter.prototype.test = function(string) {
      var array = stringToByteArray(string);
      for (var i = 0, l = this.hashFunctions; i < l; i++) {
        var index2 = hashArray(this.data.length, i, array);
        if (!(this.data[index2 >> 3] & 1 << (7 & index2)))
          return false;
      }
      return true;
    };
    BloomFilter.prototype.toJSON = function() {
      return this.data;
    };
    BloomFilter.from = function(iterable, options2) {
      if (!options2) {
        options2 = iterable.length || iterable.size;
        if (typeof options2 !== "number")
          throw new Error("BloomFilter.from: could not infer the filter's capacity. Try passing it as second argument.");
      }
      var filter = new BloomFilter(options2);
      forEach(iterable, function(value) {
        filter.add(value);
      });
      return filter;
    };
    module.exports = BloomFilter;
  }
});

// node_modules/mnemonist/bk-tree.js
var require_bk_tree = __commonJS({
  "node_modules/mnemonist/bk-tree.js"(exports, module) {
    var forEach = require_foreach();
    function BKTree(distance) {
      if (typeof distance !== "function")
        throw new Error("mnemonist/BKTree.constructor: given `distance` should be a function.");
      this.distance = distance;
      this.clear();
    }
    BKTree.prototype.add = function(item) {
      if (!this.root) {
        this.root = {
          item,
          children: {}
        };
        this.size++;
        return this;
      }
      var node = this.root, d;
      while (true) {
        d = this.distance(item, node.item);
        if (!node.children[d])
          break;
        node = node.children[d];
      }
      node.children[d] = {
        item,
        children: {}
      };
      this.size++;
      return this;
    };
    BKTree.prototype.search = function(n, query) {
      if (!this.root)
        return [];
      var found = [], stack = [this.root], node, child, d, i, l;
      while (stack.length) {
        node = stack.pop();
        d = this.distance(query, node.item);
        if (d <= n)
          found.push({ item: node.item, distance: d });
        for (i = d - n, l = d + n + 1; i < l; i++) {
          child = node.children[i];
          if (child)
            stack.push(child);
        }
      }
      return found;
    };
    BKTree.prototype.clear = function() {
      this.size = 0;
      this.root = null;
    };
    BKTree.prototype.toJSON = function() {
      return this.root;
    };
    BKTree.prototype.inspect = function() {
      var array = [], stack = [this.root], node, d;
      while (stack.length) {
        node = stack.pop();
        if (!node)
          continue;
        array.push(node.item);
        for (d in node.children)
          stack.push(node.children[d]);
      }
      Object.defineProperty(array, "constructor", {
        value: BKTree,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      BKTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = BKTree.prototype.inspect;
    BKTree.from = function(iterable, distance) {
      var tree = new BKTree(distance);
      forEach(iterable, function(value) {
        tree.add(value);
      });
      return tree;
    };
    module.exports = BKTree;
  }
});

// node_modules/mnemonist/fixed-deque.js
var require_fixed_deque = __commonJS({
  "node_modules/mnemonist/fixed-deque.js"(exports, module) {
    var iterables = require_iterables();
    var Iterator = require_iterator();
    function FixedDeque(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/fixed-deque: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/fixed-deque: `capacity` should be a positive number.");
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(this.capacity);
      this.clear();
    }
    FixedDeque.prototype.clear = function() {
      this.start = 0;
      this.size = 0;
    };
    FixedDeque.prototype.push = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-deque.push: deque capacity (" + this.capacity + ") exceeded!");
      var index2 = (this.start + this.size) % this.capacity;
      this.items[index2] = item;
      return ++this.size;
    };
    FixedDeque.prototype.unshift = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-deque.unshift: deque capacity (" + this.capacity + ") exceeded!");
      var index2 = this.start - 1;
      if (this.start === 0)
        index2 = this.capacity - 1;
      this.items[index2] = item;
      this.start = index2;
      return ++this.size;
    };
    FixedDeque.prototype.pop = function() {
      if (this.size === 0)
        return;
      const index2 = (this.start + this.size - 1) % this.capacity;
      this.size--;
      return this.items[index2];
    };
    FixedDeque.prototype.shift = function() {
      if (this.size === 0)
        return;
      var index2 = this.start;
      this.size--;
      this.start++;
      if (this.start === this.capacity)
        this.start = 0;
      return this.items[index2];
    };
    FixedDeque.prototype.peekFirst = function() {
      if (this.size === 0)
        return;
      return this.items[this.start];
    };
    FixedDeque.prototype.peekLast = function() {
      if (this.size === 0)
        return;
      var index2 = this.start + this.size - 1;
      if (index2 > this.capacity)
        index2 -= this.capacity;
      return this.items[index2];
    };
    FixedDeque.prototype.get = function(index2) {
      if (this.size === 0)
        return;
      index2 = this.start + index2;
      if (index2 > this.capacity)
        index2 -= this.capacity;
      return this.items[index2];
    };
    FixedDeque.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        callback.call(scope, this.items[i], j, this);
        i++;
        j++;
        if (i === c)
          i = 0;
      }
    };
    FixedDeque.prototype.toArray = function() {
      var offset = this.start + this.size;
      if (offset < this.capacity)
        return this.items.slice(this.start, offset);
      var array = new this.ArrayClass(this.size), c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        array[j] = this.items[i];
        i++;
        j++;
        if (i === c)
          i = 0;
      }
      return array;
    };
    FixedDeque.prototype.values = function() {
      var items = this.items, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        j++;
        if (i === c)
          i = 0;
        return {
          value,
          done: false
        };
      });
    };
    FixedDeque.prototype.entries = function() {
      var items = this.items, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        if (i === c)
          i = 0;
        return {
          value: [j++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      FixedDeque.prototype[Symbol.iterator] = FixedDeque.prototype.values;
    FixedDeque.prototype.inspect = function() {
      var array = this.toArray();
      array.type = this.ArrayClass.name;
      array.capacity = this.capacity;
      Object.defineProperty(array, "constructor", {
        value: FixedDeque,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FixedDeque.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedDeque.prototype.inspect;
    FixedDeque.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/fixed-deque.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var deque = new FixedDeque(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          deque.items[i] = iterable[i];
        deque.size = l;
        return deque;
      }
      iterables.forEach(iterable, function(value) {
        deque.push(value);
      });
      return deque;
    };
    module.exports = FixedDeque;
  }
});

// node_modules/mnemonist/circular-buffer.js
var require_circular_buffer = __commonJS({
  "node_modules/mnemonist/circular-buffer.js"(exports, module) {
    var iterables = require_iterables();
    var FixedDeque = require_fixed_deque();
    function CircularBuffer(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/circular-buffer: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/circular-buffer: `capacity` should be a positive number.");
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(this.capacity);
      this.clear();
    }
    function paste(name) {
      CircularBuffer.prototype[name] = FixedDeque.prototype[name];
    }
    Object.keys(FixedDeque.prototype).forEach(paste);
    if (typeof Symbol !== "undefined")
      Object.getOwnPropertySymbols(FixedDeque.prototype).forEach(paste);
    CircularBuffer.prototype.push = function(item) {
      var index2 = (this.start + this.size) % this.capacity;
      this.items[index2] = item;
      if (this.size === this.capacity) {
        this.start = (index2 + 1) % this.capacity;
        return this.size;
      }
      return ++this.size;
    };
    CircularBuffer.prototype.unshift = function(item) {
      var index2 = this.start - 1;
      if (this.start === 0)
        index2 = this.capacity - 1;
      this.items[index2] = item;
      if (this.size === this.capacity) {
        this.start = index2;
        return this.size;
      }
      this.start = index2;
      return ++this.size;
    };
    CircularBuffer.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/circular-buffer.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var buffer = new CircularBuffer(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          buffer.items[i] = iterable[i];
        buffer.size = l;
        return buffer;
      }
      iterables.forEach(iterable, function(value) {
        buffer.push(value);
      });
      return buffer;
    };
    module.exports = CircularBuffer;
  }
});

// node_modules/mnemonist/default-map.js
var require_default_map = __commonJS({
  "node_modules/mnemonist/default-map.js"(exports, module) {
    function DefaultMap(factory) {
      if (typeof factory !== "function")
        throw new Error("mnemonist/DefaultMap.constructor: expecting a function.");
      this.items = /* @__PURE__ */ new Map();
      this.factory = factory;
      this.size = 0;
    }
    DefaultMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
    };
    DefaultMap.prototype.get = function(key) {
      var value = this.items.get(key);
      if (typeof value === "undefined") {
        value = this.factory(key, this.size);
        this.items.set(key, value);
        this.size++;
      }
      return value;
    };
    DefaultMap.prototype.peek = function(key) {
      return this.items.get(key);
    };
    DefaultMap.prototype.set = function(key, value) {
      this.items.set(key, value);
      this.size = this.items.size;
      return this;
    };
    DefaultMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    DefaultMap.prototype.delete = function(key) {
      var deleted = this.items.delete(key);
      this.size = this.items.size;
      return deleted;
    };
    DefaultMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    DefaultMap.prototype.entries = function() {
      return this.items.entries();
    };
    DefaultMap.prototype.keys = function() {
      return this.items.keys();
    };
    DefaultMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      DefaultMap.prototype[Symbol.iterator] = DefaultMap.prototype.entries;
    DefaultMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      DefaultMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = DefaultMap.prototype.inspect;
    DefaultMap.autoIncrement = function() {
      var i = 0;
      return function() {
        return i++;
      };
    };
    module.exports = DefaultMap;
  }
});

// node_modules/mnemonist/default-weak-map.js
var require_default_weak_map = __commonJS({
  "node_modules/mnemonist/default-weak-map.js"(exports, module) {
    function DefaultWeakMap(factory) {
      if (typeof factory !== "function")
        throw new Error("mnemonist/DefaultWeakMap.constructor: expecting a function.");
      this.items = /* @__PURE__ */ new WeakMap();
      this.factory = factory;
    }
    DefaultWeakMap.prototype.clear = function() {
      this.items = /* @__PURE__ */ new WeakMap();
    };
    DefaultWeakMap.prototype.get = function(key) {
      var value = this.items.get(key);
      if (typeof value === "undefined") {
        value = this.factory(key);
        this.items.set(key, value);
      }
      return value;
    };
    DefaultWeakMap.prototype.peek = function(key) {
      return this.items.get(key);
    };
    DefaultWeakMap.prototype.set = function(key, value) {
      this.items.set(key, value);
      return this;
    };
    DefaultWeakMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    DefaultWeakMap.prototype.delete = function(key) {
      return this.items.delete(key);
    };
    DefaultWeakMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      DefaultWeakMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = DefaultWeakMap.prototype.inspect;
    module.exports = DefaultWeakMap;
  }
});

// node_modules/mnemonist/static-disjoint-set.js
var require_static_disjoint_set = __commonJS({
  "node_modules/mnemonist/static-disjoint-set.js"(exports, module) {
    var helpers = require_typed_arrays();
    function StaticDisjointSet(size) {
      var ParentsTypedArray = helpers.getPointerArray(size), RanksTypedArray = helpers.getPointerArray(Math.log2(size));
      this.size = size;
      this.dimension = size;
      this.parents = new ParentsTypedArray(size);
      this.ranks = new RanksTypedArray(size);
      for (var i = 0; i < size; i++)
        this.parents[i] = i;
    }
    StaticDisjointSet.prototype.find = function(x) {
      var y = x;
      var c, p;
      while (true) {
        c = this.parents[y];
        if (y === c)
          break;
        y = c;
      }
      while (true) {
        p = this.parents[x];
        if (p === y)
          break;
        this.parents[x] = y;
        x = p;
      }
      return y;
    };
    StaticDisjointSet.prototype.union = function(x, y) {
      var xRoot = this.find(x), yRoot = this.find(y);
      if (xRoot === yRoot)
        return this;
      this.dimension--;
      var xRank = this.ranks[x], yRank = this.ranks[y];
      if (xRank < yRank) {
        this.parents[xRoot] = yRoot;
      } else if (xRank > yRank) {
        this.parents[yRoot] = xRoot;
      } else {
        this.parents[yRoot] = xRoot;
        this.ranks[xRoot]++;
      }
      return this;
    };
    StaticDisjointSet.prototype.connected = function(x, y) {
      var xRoot = this.find(x);
      return xRoot === this.find(y);
    };
    StaticDisjointSet.prototype.mapping = function() {
      var MappingClass = helpers.getPointerArray(this.dimension);
      var ids = {}, mapping = new MappingClass(this.size), c = 0;
      var r;
      for (var i = 0, l = this.parents.length; i < l; i++) {
        r = this.find(i);
        if (typeof ids[r] === "undefined") {
          mapping[i] = c;
          ids[r] = c++;
        } else {
          mapping[i] = ids[r];
        }
      }
      return mapping;
    };
    StaticDisjointSet.prototype.compile = function() {
      var ids = {}, result = new Array(this.dimension), c = 0;
      var r;
      for (var i = 0, l = this.parents.length; i < l; i++) {
        r = this.find(i);
        if (typeof ids[r] === "undefined") {
          result[c] = [i];
          ids[r] = c++;
        } else {
          result[ids[r]].push(i);
        }
      }
      return result;
    };
    StaticDisjointSet.prototype.inspect = function() {
      var array = this.compile();
      Object.defineProperty(array, "constructor", {
        value: StaticDisjointSet,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      StaticDisjointSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = StaticDisjointSet.prototype.inspect;
    module.exports = StaticDisjointSet;
  }
});

// node_modules/mnemonist/fixed-reverse-heap.js
var require_fixed_reverse_heap = __commonJS({
  "node_modules/mnemonist/fixed-reverse-heap.js"(exports, module) {
    var comparators = require_comparators();
    var Heap = require_heap();
    var DEFAULT_COMPARATOR = comparators.DEFAULT_COMPARATOR;
    var reverseComparator = comparators.reverseComparator;
    function siftUp(compare, heap, size, i) {
      var endIndex = size, startIndex = i, item = heap[i], childIndex = 2 * i + 1, rightIndex;
      while (childIndex < endIndex) {
        rightIndex = childIndex + 1;
        if (rightIndex < endIndex && compare(heap[childIndex], heap[rightIndex]) >= 0) {
          childIndex = rightIndex;
        }
        heap[i] = heap[childIndex];
        i = childIndex;
        childIndex = 2 * i + 1;
      }
      heap[i] = item;
      Heap.siftDown(compare, heap, startIndex, i);
    }
    function consume(ArrayClass, compare, heap, size) {
      var l = size, i = l;
      var array = new ArrayClass(size), lastItem, item;
      while (i > 0) {
        lastItem = heap[--i];
        if (i !== 0) {
          item = heap[0];
          heap[0] = lastItem;
          siftUp(compare, heap, --size, 0);
          lastItem = item;
        }
        array[i] = lastItem;
      }
      return array;
    }
    function FixedReverseHeap(ArrayClass, comparator, capacity) {
      if (arguments.length === 2) {
        capacity = comparator;
        comparator = null;
      }
      this.ArrayClass = ArrayClass;
      this.capacity = capacity;
      this.items = new ArrayClass(capacity);
      this.clear();
      this.comparator = comparator || DEFAULT_COMPARATOR;
      if (typeof capacity !== "number" && capacity <= 0)
        throw new Error("mnemonist/FixedReverseHeap.constructor: capacity should be a number > 0.");
      if (typeof this.comparator !== "function")
        throw new Error("mnemonist/FixedReverseHeap.constructor: given comparator should be a function.");
      this.comparator = reverseComparator(this.comparator);
    }
    FixedReverseHeap.prototype.clear = function() {
      this.size = 0;
    };
    FixedReverseHeap.prototype.push = function(item) {
      if (this.size < this.capacity) {
        this.items[this.size] = item;
        Heap.siftDown(this.comparator, this.items, 0, this.size);
        this.size++;
      } else {
        if (this.comparator(item, this.items[0]) > 0)
          Heap.replace(this.comparator, this.items, item);
      }
      return this.size;
    };
    FixedReverseHeap.prototype.peek = function() {
      return this.items[0];
    };
    FixedReverseHeap.prototype.consume = function() {
      var items = consume(this.ArrayClass, this.comparator, this.items, this.size);
      this.size = 0;
      return items;
    };
    FixedReverseHeap.prototype.toArray = function() {
      return consume(this.ArrayClass, this.comparator, this.items.slice(0, this.size), this.size);
    };
    FixedReverseHeap.prototype.inspect = function() {
      var proxy = this.toArray();
      Object.defineProperty(proxy, "constructor", {
        value: FixedReverseHeap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      FixedReverseHeap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedReverseHeap.prototype.inspect;
    module.exports = FixedReverseHeap;
  }
});

// node_modules/mnemonist/fuzzy-map.js
var require_fuzzy_map = __commonJS({
  "node_modules/mnemonist/fuzzy-map.js"(exports, module) {
    var forEach = require_foreach();
    var identity = function(x) {
      return x;
    };
    function FuzzyMap(descriptor) {
      this.items = /* @__PURE__ */ new Map();
      this.clear();
      if (Array.isArray(descriptor)) {
        this.writeHashFunction = descriptor[0];
        this.readHashFunction = descriptor[1];
      } else {
        this.writeHashFunction = descriptor;
        this.readHashFunction = descriptor;
      }
      if (!this.writeHashFunction)
        this.writeHashFunction = identity;
      if (!this.readHashFunction)
        this.readHashFunction = identity;
      if (typeof this.writeHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
      if (typeof this.readHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMap.constructor: invalid hash function given.");
    }
    FuzzyMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
    };
    FuzzyMap.prototype.add = function(item) {
      var key = this.writeHashFunction(item);
      this.items.set(key, item);
      this.size = this.items.size;
      return this;
    };
    FuzzyMap.prototype.set = function(key, item) {
      key = this.writeHashFunction(key);
      this.items.set(key, item);
      this.size = this.items.size;
      return this;
    };
    FuzzyMap.prototype.get = function(key) {
      key = this.readHashFunction(key);
      return this.items.get(key);
    };
    FuzzyMap.prototype.has = function(key) {
      key = this.readHashFunction(key);
      return this.items.has(key);
    };
    FuzzyMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(function(value) {
        callback.call(scope, value, value);
      });
    };
    FuzzyMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      FuzzyMap.prototype[Symbol.iterator] = FuzzyMap.prototype.values;
    FuzzyMap.prototype.inspect = function() {
      var array = Array.from(this.items.values());
      Object.defineProperty(array, "constructor", {
        value: FuzzyMap,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FuzzyMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FuzzyMap.prototype.inspect;
    FuzzyMap.from = function(iterable, descriptor, useSet) {
      var map = new FuzzyMap(descriptor);
      forEach(iterable, function(value, key) {
        if (useSet)
          map.set(key, value);
        else
          map.add(value);
      });
      return map;
    };
    module.exports = FuzzyMap;
  }
});

// node_modules/mnemonist/multi-map.js
var require_multi_map = __commonJS({
  "node_modules/mnemonist/multi-map.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    function MultiMap(Container3) {
      this.Container = Container3 || Array;
      this.items = /* @__PURE__ */ new Map();
      this.clear();
      Object.defineProperty(this.items, "constructor", {
        value: MultiMap,
        enumerable: false
      });
    }
    MultiMap.prototype.clear = function() {
      this.size = 0;
      this.dimension = 0;
      this.items.clear();
    };
    MultiMap.prototype.set = function(key, value) {
      var container = this.items.get(key), sizeBefore;
      if (!container) {
        this.dimension++;
        container = new this.Container();
        this.items.set(key, container);
      }
      if (this.Container === Set) {
        sizeBefore = container.size;
        container.add(value);
        if (sizeBefore < container.size)
          this.size++;
      } else {
        container.push(value);
        this.size++;
      }
      return this;
    };
    MultiMap.prototype.delete = function(key) {
      var container = this.items.get(key);
      if (!container)
        return false;
      this.size -= this.Container === Set ? container.size : container.length;
      this.dimension--;
      this.items.delete(key);
      return true;
    };
    MultiMap.prototype.remove = function(key, value) {
      var container = this.items.get(key), wasDeleted, index2;
      if (!container)
        return false;
      if (this.Container === Set) {
        wasDeleted = container.delete(value);
        if (wasDeleted)
          this.size--;
        if (container.size === 0) {
          this.items.delete(key);
          this.dimension--;
        }
        return wasDeleted;
      } else {
        index2 = container.indexOf(value);
        if (index2 === -1)
          return false;
        this.size--;
        if (container.length === 1) {
          this.items.delete(key);
          this.dimension--;
          return true;
        }
        container.splice(index2, 1);
        return true;
      }
    };
    MultiMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    MultiMap.prototype.get = function(key) {
      return this.items.get(key);
    };
    MultiMap.prototype.multiplicity = function(key) {
      var container = this.items.get(key);
      if (typeof container === "undefined")
        return 0;
      return this.Container === Set ? container.size : container.length;
    };
    MultiMap.prototype.count = MultiMap.prototype.multiplicity;
    MultiMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var key;
      function inner(value) {
        callback.call(scope, value, key);
      }
      this.items.forEach(function(container, k) {
        key = k;
        container.forEach(inner);
      });
    };
    MultiMap.prototype.forEachAssociation = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    MultiMap.prototype.keys = function() {
      return this.items.keys();
    };
    MultiMap.prototype.values = function() {
      var iterator = this.items.values(), inContainer = false, countainer, step, i, l;
      if (this.Container === Set)
        return new Iterator(function next() {
          if (!inContainer) {
            step = iterator.next();
            if (step.done)
              return { done: true };
            inContainer = true;
            countainer = step.value.values();
          }
          step = countainer.next();
          if (step.done) {
            inContainer = false;
            return next();
          }
          return {
            done: false,
            value: step.value
          };
        });
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          countainer = step.value;
          i = 0;
          l = countainer.length;
        }
        if (i >= l) {
          inContainer = false;
          return next();
        }
        return {
          done: false,
          value: countainer[i++]
        };
      });
    };
    MultiMap.prototype.entries = function() {
      var iterator = this.items.entries(), inContainer = false, countainer, step, key, i, l;
      if (this.Container === Set)
        return new Iterator(function next() {
          if (!inContainer) {
            step = iterator.next();
            if (step.done)
              return { done: true };
            inContainer = true;
            key = step.value[0];
            countainer = step.value[1].values();
          }
          step = countainer.next();
          if (step.done) {
            inContainer = false;
            return next();
          }
          return {
            done: false,
            value: [key, step.value]
          };
        });
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          key = step.value[0];
          countainer = step.value[1];
          i = 0;
          l = countainer.length;
        }
        if (i >= l) {
          inContainer = false;
          return next();
        }
        return {
          done: false,
          value: [key, countainer[i++]]
        };
      });
    };
    MultiMap.prototype.containers = function() {
      return this.items.values();
    };
    MultiMap.prototype.associations = function() {
      return this.items.entries();
    };
    if (typeof Symbol !== "undefined")
      MultiMap.prototype[Symbol.iterator] = MultiMap.prototype.entries;
    MultiMap.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      MultiMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = MultiMap.prototype.inspect;
    MultiMap.prototype.toJSON = function() {
      return this.items;
    };
    MultiMap.from = function(iterable, Container3) {
      var map = new MultiMap(Container3);
      forEach(iterable, function(value, key) {
        map.set(key, value);
      });
      return map;
    };
    module.exports = MultiMap;
  }
});

// node_modules/mnemonist/fuzzy-multi-map.js
var require_fuzzy_multi_map = __commonJS({
  "node_modules/mnemonist/fuzzy-multi-map.js"(exports, module) {
    var MultiMap = require_multi_map();
    var forEach = require_foreach();
    var identity = function(x) {
      return x;
    };
    function FuzzyMultiMap(descriptor, Container3) {
      this.items = new MultiMap(Container3);
      this.clear();
      if (Array.isArray(descriptor)) {
        this.writeHashFunction = descriptor[0];
        this.readHashFunction = descriptor[1];
      } else {
        this.writeHashFunction = descriptor;
        this.readHashFunction = descriptor;
      }
      if (!this.writeHashFunction)
        this.writeHashFunction = identity;
      if (!this.readHashFunction)
        this.readHashFunction = identity;
      if (typeof this.writeHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
      if (typeof this.readHashFunction !== "function")
        throw new Error("mnemonist/FuzzyMultiMap.constructor: invalid hash function given.");
    }
    FuzzyMultiMap.prototype.clear = function() {
      this.items.clear();
      this.size = 0;
      this.dimension = 0;
    };
    FuzzyMultiMap.prototype.add = function(item) {
      var key = this.writeHashFunction(item);
      this.items.set(key, item);
      this.size = this.items.size;
      this.dimension = this.items.dimension;
      return this;
    };
    FuzzyMultiMap.prototype.set = function(key, item) {
      key = this.writeHashFunction(key);
      this.items.set(key, item);
      this.size = this.items.size;
      this.dimension = this.items.dimension;
      return this;
    };
    FuzzyMultiMap.prototype.get = function(key) {
      key = this.readHashFunction(key);
      return this.items.get(key);
    };
    FuzzyMultiMap.prototype.has = function(key) {
      key = this.readHashFunction(key);
      return this.items.has(key);
    };
    FuzzyMultiMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(function(value) {
        callback.call(scope, value, value);
      });
    };
    FuzzyMultiMap.prototype.values = function() {
      return this.items.values();
    };
    if (typeof Symbol !== "undefined")
      FuzzyMultiMap.prototype[Symbol.iterator] = FuzzyMultiMap.prototype.values;
    FuzzyMultiMap.prototype.inspect = function() {
      var array = Array.from(this);
      Object.defineProperty(array, "constructor", {
        value: FuzzyMultiMap,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FuzzyMultiMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = FuzzyMultiMap.prototype.inspect;
    FuzzyMultiMap.from = function(iterable, descriptor, Container3, useSet) {
      if (arguments.length === 3) {
        if (typeof Container3 === "boolean") {
          useSet = Container3;
          Container3 = Array;
        }
      }
      var map = new FuzzyMultiMap(descriptor, Container3);
      forEach(iterable, function(value, key) {
        if (useSet)
          map.set(key, value);
        else
          map.add(value);
      });
      return map;
    };
    module.exports = FuzzyMultiMap;
  }
});

// node_modules/mnemonist/hashed-array-tree.js
var require_hashed_array_tree = __commonJS({
  "node_modules/mnemonist/hashed-array-tree.js"(exports, module) {
    var DEFAULT_BLOCK_SIZE = 1024;
    function powerOfTwo(x) {
      return (x & x - 1) === 0;
    }
    function HashedArrayTree(ArrayClass, initialCapacityOrOptions) {
      if (arguments.length < 1)
        throw new Error("mnemonist/hashed-array-tree: expecting at least a byte array constructor.");
      var initialCapacity = initialCapacityOrOptions || 0, blockSize = DEFAULT_BLOCK_SIZE, initialLength = 0;
      if (typeof initialCapacityOrOptions === "object") {
        initialCapacity = initialCapacityOrOptions.initialCapacity || 0;
        initialLength = initialCapacityOrOptions.initialLength || 0;
        blockSize = initialCapacityOrOptions.blockSize || DEFAULT_BLOCK_SIZE;
      }
      if (!blockSize || !powerOfTwo(blockSize))
        throw new Error("mnemonist/hashed-array-tree: block size should be a power of two.");
      var capacity = Math.max(initialLength, initialCapacity), initialBlocks = Math.ceil(capacity / blockSize);
      this.ArrayClass = ArrayClass;
      this.length = initialLength;
      this.capacity = initialBlocks * blockSize;
      this.blockSize = blockSize;
      this.offsetMask = blockSize - 1;
      this.blockMask = Math.log2(blockSize);
      this.blocks = new Array(initialBlocks);
      for (var i = 0; i < initialBlocks; i++)
        this.blocks[i] = new this.ArrayClass(this.blockSize);
    }
    HashedArrayTree.prototype.set = function(index2, value) {
      if (this.length < index2)
        throw new Error("HashedArrayTree(" + this.ArrayClass.name + ").set: index out of bounds.");
      var block = index2 >> this.blockMask, i = index2 & this.offsetMask;
      this.blocks[block][i] = value;
      return this;
    };
    HashedArrayTree.prototype.get = function(index2) {
      if (this.length < index2)
        return;
      var block = index2 >> this.blockMask, i = index2 & this.offsetMask;
      return this.blocks[block][i];
    };
    HashedArrayTree.prototype.grow = function(capacity) {
      if (typeof capacity !== "number")
        capacity = this.capacity + this.blockSize;
      if (this.capacity >= capacity)
        return this;
      while (this.capacity < capacity) {
        this.blocks.push(new this.ArrayClass(this.blockSize));
        this.capacity += this.blockSize;
      }
      return this;
    };
    HashedArrayTree.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.grow(length);
      return this;
    };
    HashedArrayTree.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      var index2 = this.length;
      var block = index2 >> this.blockMask, i = index2 & this.offsetMask;
      this.blocks[block][i] = value;
      return ++this.length;
    };
    HashedArrayTree.prototype.pop = function() {
      if (this.length === 0)
        return;
      var lastBlock = this.blocks[this.blocks.length - 1];
      var i = --this.length & this.offsetMask;
      return lastBlock[i];
    };
    HashedArrayTree.prototype.inspect = function() {
      var proxy = new this.ArrayClass(this.length), block;
      for (var i = 0, l = this.length; i < l; i++) {
        block = i >> this.blockMask;
        proxy[i] = this.blocks[block][i & this.offsetMask];
      }
      proxy.type = this.ArrayClass.name;
      proxy.items = this.length;
      proxy.capacity = this.capacity;
      proxy.blockSize = this.blockSize;
      Object.defineProperty(proxy, "constructor", {
        value: HashedArrayTree,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      HashedArrayTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = HashedArrayTree.prototype.inspect;
    module.exports = HashedArrayTree;
  }
});

// node_modules/mnemonist/fixed-stack.js
var require_fixed_stack = __commonJS({
  "node_modules/mnemonist/fixed-stack.js"(exports, module) {
    var Iterator = require_iterator();
    var iterables = require_iterables();
    function FixedStack(ArrayClass, capacity) {
      if (arguments.length < 2)
        throw new Error("mnemonist/fixed-stack: expecting an Array class and a capacity.");
      if (typeof capacity !== "number" || capacity <= 0)
        throw new Error("mnemonist/fixed-stack: `capacity` should be a positive number.");
      this.capacity = capacity;
      this.ArrayClass = ArrayClass;
      this.items = new this.ArrayClass(this.capacity);
      this.clear();
    }
    FixedStack.prototype.clear = function() {
      this.size = 0;
    };
    FixedStack.prototype.push = function(item) {
      if (this.size === this.capacity)
        throw new Error("mnemonist/fixed-stack.push: stack capacity (" + this.capacity + ") exceeded!");
      this.items[this.size++] = item;
      return this.size;
    };
    FixedStack.prototype.pop = function() {
      if (this.size === 0)
        return;
      return this.items[--this.size];
    };
    FixedStack.prototype.peek = function() {
      return this.items[this.size - 1];
    };
    FixedStack.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.items.length; i < l; i++)
        callback.call(scope, this.items[l - i - 1], i, this);
    };
    FixedStack.prototype.toArray = function() {
      var array = new this.ArrayClass(this.size), l = this.size - 1, i = this.size;
      while (i--)
        array[i] = this.items[l - i];
      return array;
    };
    FixedStack.prototype.values = function() {
      var items = this.items, l = this.size, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    FixedStack.prototype.entries = function() {
      var items = this.items, l = this.size, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      FixedStack.prototype[Symbol.iterator] = FixedStack.prototype.values;
    FixedStack.prototype.toString = function() {
      return this.toArray().join(",");
    };
    FixedStack.prototype.toJSON = function() {
      return this.toArray();
    };
    FixedStack.prototype.inspect = function() {
      var array = this.toArray();
      array.type = this.ArrayClass.name;
      array.capacity = this.capacity;
      Object.defineProperty(array, "constructor", {
        value: FixedStack,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      FixedStack.prototype[Symbol.for("nodejs.util.inspect.custom")] = FixedStack.prototype.inspect;
    FixedStack.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/fixed-stack.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var stack = new FixedStack(ArrayClass, capacity);
      if (iterables.isArrayLike(iterable)) {
        var i, l;
        for (i = 0, l = iterable.length; i < l; i++)
          stack.items[i] = iterable[i];
        stack.size = l;
        return stack;
      }
      iterables.forEach(iterable, function(value) {
        stack.push(value);
      });
      return stack;
    };
    module.exports = FixedStack;
  }
});

// node_modules/mnemonist/static-interval-tree.js
var require_static_interval_tree = __commonJS({
  "node_modules/mnemonist/static-interval-tree.js"(exports, module) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var FixedStack = require_fixed_stack();
    function buildBST(intervals, endGetter, sortedIndices, tree, augmentations, i, low, high) {
      var mid = low + (high - low) / 2 | 0, midMinusOne = ~-mid, midPlusOne = -~mid;
      var current = sortedIndices[mid];
      tree[i] = current + 1;
      var end = endGetter ? endGetter(intervals[current]) : intervals[current][1];
      var left = i * 2 + 1, right = i * 2 + 2;
      var leftEnd = -Infinity, rightEnd = -Infinity;
      if (low <= midMinusOne) {
        leftEnd = buildBST(
          intervals,
          endGetter,
          sortedIndices,
          tree,
          augmentations,
          left,
          low,
          midMinusOne
        );
      }
      if (midPlusOne <= high) {
        rightEnd = buildBST(
          intervals,
          endGetter,
          sortedIndices,
          tree,
          augmentations,
          right,
          midPlusOne,
          high
        );
      }
      var augmentation = Math.max(end, leftEnd, rightEnd);
      var augmentationPointer = current;
      if (augmentation === leftEnd)
        augmentationPointer = augmentations[tree[left] - 1];
      else if (augmentation === rightEnd)
        augmentationPointer = augmentations[tree[right] - 1];
      augmentations[current] = augmentationPointer;
      return augmentation;
    }
    function StaticIntervalTree(intervals, getters) {
      this.size = intervals.length;
      this.intervals = intervals;
      var startGetter = null, endGetter = null;
      if (Array.isArray(getters)) {
        startGetter = getters[0];
        endGetter = getters[1];
      }
      var length = intervals.length;
      var IndicesArray = typed.getPointerArray(length + 1);
      var indices = new IndicesArray(length);
      var i;
      for (i = 1; i < length; i++)
        indices[i] = i;
      indices.sort(function(a, b) {
        a = intervals[a];
        b = intervals[b];
        if (startGetter) {
          a = startGetter(a);
          b = startGetter(b);
        } else {
          a = a[0];
          b = b[0];
        }
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      var height = Math.ceil(Math.log2(length + 1)), treeSize = Math.pow(2, height) - 1;
      var tree = new IndicesArray(treeSize);
      var augmentations = new IndicesArray(length);
      buildBST(
        intervals,
        endGetter,
        indices,
        tree,
        augmentations,
        0,
        0,
        length - 1
      );
      indices = null;
      this.height = height;
      this.tree = tree;
      this.augmentations = augmentations;
      this.startGetter = startGetter;
      this.endGetter = endGetter;
      this.stack = new FixedStack(IndicesArray, this.height);
    }
    StaticIntervalTree.prototype.intervalsContainingPoint = function(point) {
      var matches = [];
      var stack = this.stack;
      stack.clear();
      stack.push(0);
      var l = this.tree.length;
      var bstIndex, intervalIndex, interval, maxInterval, start, end, max, left, right;
      while (stack.size) {
        bstIndex = stack.pop();
        intervalIndex = this.tree[bstIndex] - 1;
        interval = this.intervals[intervalIndex];
        maxInterval = this.intervals[this.augmentations[intervalIndex]];
        max = this.endGetter ? this.endGetter(maxInterval) : maxInterval[1];
        if (point > max)
          continue;
        left = bstIndex * 2 + 1;
        if (left < l && this.tree[left] !== 0)
          stack.push(left);
        start = this.startGetter ? this.startGetter(interval) : interval[0];
        end = this.endGetter ? this.endGetter(interval) : interval[1];
        if (point >= start && point <= end)
          matches.push(interval);
        if (point < start)
          continue;
        right = bstIndex * 2 + 2;
        if (right < l && this.tree[right] !== 0)
          stack.push(right);
      }
      return matches;
    };
    StaticIntervalTree.prototype.intervalsOverlappingInterval = function(interval) {
      var intervalStart = this.startGetter ? this.startGetter(interval) : interval[0], intervalEnd = this.endGetter ? this.endGetter(interval) : interval[1];
      var matches = [];
      var stack = this.stack;
      stack.clear();
      stack.push(0);
      var l = this.tree.length;
      var bstIndex, intervalIndex, currentInterval, maxInterval, start, end, max, left, right;
      while (stack.size) {
        bstIndex = stack.pop();
        intervalIndex = this.tree[bstIndex] - 1;
        currentInterval = this.intervals[intervalIndex];
        maxInterval = this.intervals[this.augmentations[intervalIndex]];
        max = this.endGetter ? this.endGetter(maxInterval) : maxInterval[1];
        if (intervalStart > max)
          continue;
        left = bstIndex * 2 + 1;
        if (left < l && this.tree[left] !== 0)
          stack.push(left);
        start = this.startGetter ? this.startGetter(currentInterval) : currentInterval[0];
        end = this.endGetter ? this.endGetter(currentInterval) : currentInterval[1];
        if (intervalEnd >= start && intervalStart <= end)
          matches.push(currentInterval);
        if (intervalEnd < start)
          continue;
        right = bstIndex * 2 + 2;
        if (right < l && this.tree[right] !== 0)
          stack.push(right);
      }
      return matches;
    };
    StaticIntervalTree.prototype.inspect = function() {
      var proxy = this.intervals.slice();
      Object.defineProperty(proxy, "constructor", {
        value: StaticIntervalTree,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      StaticIntervalTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = StaticIntervalTree.prototype.inspect;
    StaticIntervalTree.from = function(iterable, getters) {
      if (iterables.isArrayLike(iterable))
        return new StaticIntervalTree(iterable, getters);
      return new StaticIntervalTree(Array.from(iterable), getters);
    };
    module.exports = StaticIntervalTree;
  }
});

// node_modules/mnemonist/utils/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/mnemonist/utils/binary-search.js"(exports) {
    exports.search = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      hi--;
      var current;
      while (lo <= hi) {
        mid = lo + hi >>> 1;
        current = array[mid];
        if (current > value) {
          hi = ~-mid;
        } else if (current < value) {
          lo = -~mid;
        } else {
          return mid;
        }
      }
      return -1;
    };
    exports.searchWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = ~-array.length, comparison;
      while (lo <= hi) {
        mid = lo + hi >>> 1;
        comparison = comparator(array[mid], value);
        if (comparison > 0) {
          hi = ~-mid;
        } else if (comparison < 0) {
          lo = -~mid;
        } else {
          return mid;
        }
      }
      return -1;
    };
    exports.lowerBound = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value <= array[mid]) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports.lowerBoundWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (comparator(value, array[mid]) <= 0) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports.lowerBoundIndices = function(array, indices, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value <= array[indices[mid]]) {
          hi = mid;
        } else {
          lo = -~mid;
        }
      }
      return lo;
    };
    exports.upperBound = function(array, value, lo, hi) {
      var mid = 0;
      lo = typeof lo !== "undefined" ? lo : 0;
      hi = typeof hi !== "undefined" ? hi : array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (value >= array[mid]) {
          lo = -~mid;
        } else {
          hi = mid;
        }
      }
      return lo;
    };
    exports.upperBoundWithComparator = function(comparator, array, value) {
      var mid = 0, lo = 0, hi = array.length;
      while (lo < hi) {
        mid = lo + hi >>> 1;
        if (comparator(value, array[mid]) >= 0) {
          lo = -~mid;
        } else {
          hi = mid;
        }
      }
      return lo;
    };
  }
});

// node_modules/mnemonist/utils/merge.js
var require_merge = __commonJS({
  "node_modules/mnemonist/utils/merge.js"(exports) {
    var typed = require_typed_arrays();
    var isArrayLike = require_iterables().isArrayLike;
    var binarySearch = require_binary_search();
    var FibonacciHeap = require_fibonacci_heap();
    function mergeArrays(a, b) {
      if (a.length === 0)
        return b.slice();
      if (b.length === 0)
        return a.slice();
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd <= bStart) {
        if (typed.isTypedArray(a))
          return typed.concat(a, b);
        return a.concat(b);
      }
      var array = new a.constructor(a.length + b.length);
      var i, l, v;
      for (i = 0, l = a.length; i < l; i++) {
        v = a[i];
        if (v <= bStart)
          array[i] = v;
        else
          break;
      }
      var aPointer = i, aLength = a.length, bPointer = 0, bLength = b.length, aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead <= bHead) {
          array[i++] = aHead;
          aPointer++;
        } else {
          array[i++] = bHead;
          bPointer++;
        }
      }
      while (aPointer < aLength)
        array[i++] = a[aPointer++];
      while (bPointer < bLength)
        array[i++] = b[bPointer++];
      return array;
    }
    function unionUniqueArrays(a, b) {
      if (a.length === 0)
        return b.slice();
      if (b.length === 0)
        return a.slice();
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd < bStart) {
        if (typed.isTypedArray(a))
          return typed.concat(a, b);
        return a.concat(b);
      }
      var array = new a.constructor();
      var i, l, v;
      for (i = 0, l = a.length; i < l; i++) {
        v = a[i];
        if (v < bStart)
          array.push(v);
        else
          break;
      }
      var aPointer = i, aLength = a.length, bPointer = 0, bLength = b.length, aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead <= bHead) {
          if (array.length === 0 || array[array.length - 1] !== aHead)
            array.push(aHead);
          aPointer++;
        } else {
          if (array.length === 0 || array[array.length - 1] !== bHead)
            array.push(bHead);
          bPointer++;
        }
      }
      while (aPointer < aLength) {
        aHead = a[aPointer++];
        if (array.length === 0 || array[array.length - 1] !== aHead)
          array.push(aHead);
      }
      while (bPointer < bLength) {
        bHead = b[bPointer++];
        if (array.length === 0 || array[array.length - 1] !== bHead)
          array.push(bHead);
      }
      return array;
    }
    exports.intersectionUniqueArrays = function(a, b) {
      if (a.length === 0 || b.length === 0)
        return new a.constructor(0);
      var tmp;
      if (a[0] > b[0]) {
        tmp = a;
        a = b;
        b = tmp;
      }
      var aEnd = a[a.length - 1], bStart = b[0];
      if (aEnd < bStart)
        return new a.constructor(0);
      var array = new a.constructor();
      var aPointer = binarySearch.lowerBound(a, bStart), aLength = a.length, bPointer = 0, bLength = binarySearch.upperBound(b, aEnd), aHead, bHead;
      while (aPointer < aLength && bPointer < bLength) {
        aHead = a[aPointer];
        bHead = b[bPointer];
        if (aHead < bHead) {
          aPointer = binarySearch.lowerBound(a, bHead, aPointer + 1);
        } else if (aHead > bHead) {
          bPointer = binarySearch.lowerBound(b, aHead, bPointer + 1);
        } else {
          array.push(aHead);
          aPointer++;
          bPointer++;
        }
      }
      return array;
    };
    function kWayMergeArrays(arrays) {
      var length = 0, max = -Infinity, al, i, l;
      var filtered = [];
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          continue;
        filtered.push(arrays[i]);
        length += al;
        if (al > max)
          max = al;
      }
      if (filtered.length === 0)
        return new arrays[0].constructor(0);
      if (filtered.length === 1)
        return filtered[0].slice();
      if (filtered.length === 2)
        return mergeArrays(filtered[0], filtered[1]);
      arrays = filtered;
      var array = new arrays[0].constructor(length);
      var PointerArray = typed.getPointerArray(max);
      var pointers = new PointerArray(arrays.length);
      var heap = new FibonacciHeap(function(a, b) {
        a = arrays[a][pointers[a]];
        b = arrays[b][pointers[b]];
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      for (i = 0; i < l; i++)
        heap.push(i);
      i = 0;
      var p, v;
      while (heap.size) {
        p = heap.pop();
        v = arrays[p][pointers[p]++];
        array[i++] = v;
        if (pointers[p] < arrays[p].length)
          heap.push(p);
      }
      return array;
    }
    function kWayUnionUniqueArrays(arrays) {
      var max = -Infinity, al, i, l;
      var filtered = [];
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          continue;
        filtered.push(arrays[i]);
        if (al > max)
          max = al;
      }
      if (filtered.length === 0)
        return new arrays[0].constructor(0);
      if (filtered.length === 1)
        return filtered[0].slice();
      if (filtered.length === 2)
        return unionUniqueArrays(filtered[0], filtered[1]);
      arrays = filtered;
      var array = new arrays[0].constructor();
      var PointerArray = typed.getPointerArray(max);
      var pointers = new PointerArray(arrays.length);
      var heap = new FibonacciHeap(function(a, b) {
        a = arrays[a][pointers[a]];
        b = arrays[b][pointers[b]];
        if (a < b)
          return -1;
        if (a > b)
          return 1;
        return 0;
      });
      for (i = 0; i < l; i++)
        heap.push(i);
      var p, v;
      while (heap.size) {
        p = heap.pop();
        v = arrays[p][pointers[p]++];
        if (array.length === 0 || array[array.length - 1] !== v)
          array.push(v);
        if (pointers[p] < arrays[p].length)
          heap.push(p);
      }
      return array;
    }
    exports.kWayIntersectionUniqueArrays = function(arrays) {
      var max = -Infinity, maxStart = -Infinity, minEnd = Infinity, first, last, al, i, l;
      for (i = 0, l = arrays.length; i < l; i++) {
        al = arrays[i].length;
        if (al === 0)
          return [];
        if (al > max)
          max = al;
        first = arrays[i][0];
        last = arrays[i][al - 1];
        if (first > maxStart)
          maxStart = first;
        if (last < minEnd)
          minEnd = last;
      }
      if (maxStart > minEnd)
        return [];
      if (maxStart === minEnd)
        return [maxStart];
      var a, b, array = arrays[0], aPointer, bPointer, aLimit, bLimit, aHead, bHead, start = maxStart;
      for (i = 1; i < l; i++) {
        a = array;
        b = arrays[i];
        array = new Array();
        aPointer = 0;
        bPointer = binarySearch.lowerBound(b, start);
        aLimit = a.length;
        bLimit = b.length;
        while (aPointer < aLimit && bPointer < bLimit) {
          aHead = a[aPointer];
          bHead = b[bPointer];
          if (aHead < bHead) {
            aPointer = binarySearch.lowerBound(a, bHead, aPointer + 1);
          } else if (aHead > bHead) {
            bPointer = binarySearch.lowerBound(b, aHead, bPointer + 1);
          } else {
            array.push(aHead);
            aPointer++;
            bPointer++;
          }
        }
        if (array.length === 0)
          return array;
        start = array[0];
      }
      return array;
    };
    exports.merge = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return mergeArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return kWayMergeArrays(arguments);
      }
      return null;
    };
    exports.unionUnique = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return unionUniqueArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return kWayUnionUniqueArrays(arguments);
      }
      return null;
    };
    exports.intersectionUnique = function() {
      if (arguments.length === 2) {
        if (isArrayLike(arguments[0]))
          return exports.intersectionUniqueArrays(arguments[0], arguments[1]);
      } else {
        if (isArrayLike(arguments[0]))
          return exports.kWayIntersectionUniqueArrays(arguments);
      }
      return null;
    };
  }
});

// node_modules/mnemonist/inverted-index.js
var require_inverted_index = __commonJS({
  "node_modules/mnemonist/inverted-index.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var helpers = require_merge();
    function identity(x) {
      return x;
    }
    function InvertedIndex(descriptor) {
      this.clear();
      if (Array.isArray(descriptor)) {
        this.documentTokenizer = descriptor[0];
        this.queryTokenizer = descriptor[1];
      } else {
        this.documentTokenizer = descriptor;
        this.queryTokenizer = descriptor;
      }
      if (!this.documentTokenizer)
        this.documentTokenizer = identity;
      if (!this.queryTokenizer)
        this.queryTokenizer = identity;
      if (typeof this.documentTokenizer !== "function")
        throw new Error("mnemonist/InvertedIndex.constructor: document tokenizer is not a function.");
      if (typeof this.queryTokenizer !== "function")
        throw new Error("mnemonist/InvertedIndex.constructor: query tokenizer is not a function.");
    }
    InvertedIndex.prototype.clear = function() {
      this.items = [];
      this.mapping = /* @__PURE__ */ new Map();
      this.size = 0;
      this.dimension = 0;
    };
    InvertedIndex.prototype.add = function(doc) {
      this.size++;
      var key = this.items.length;
      this.items.push(doc);
      var tokens = this.documentTokenizer(doc);
      if (!Array.isArray(tokens))
        throw new Error("mnemonist/InvertedIndex.add: tokenizer function should return an array of tokens.");
      var done = /* @__PURE__ */ new Set(), token, container;
      for (var i = 0, l = tokens.length; i < l; i++) {
        token = tokens[i];
        if (done.has(token))
          continue;
        done.add(token);
        container = this.mapping.get(token);
        if (!container) {
          container = [];
          this.mapping.set(token, container);
        }
        container.push(key);
      }
      this.dimension = this.mapping.size;
      return this;
    };
    InvertedIndex.prototype.get = function(query) {
      if (!this.size)
        return [];
      var tokens = this.queryTokenizer(query);
      if (!Array.isArray(tokens))
        throw new Error("mnemonist/InvertedIndex.query: tokenizer function should return an array of tokens.");
      if (!tokens.length)
        return [];
      var results = this.mapping.get(tokens[0]), c, i, l;
      if (typeof results === "undefined" || results.length === 0)
        return [];
      if (tokens.length > 1) {
        for (i = 1, l = tokens.length; i < l; i++) {
          c = this.mapping.get(tokens[i]);
          if (typeof c === "undefined" || c.length === 0)
            return [];
          results = helpers.intersectionUniqueArrays(results, c);
        }
      }
      var docs = new Array(results.length);
      for (i = 0, l = docs.length; i < l; i++)
        docs[i] = this.items[results[i]];
      return docs;
    };
    InvertedIndex.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.documents.length; i < l; i++)
        callback.call(scope, this.documents[i], i, this);
    };
    InvertedIndex.prototype.documents = function() {
      var documents = this.items, l = documents.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = documents[i++];
        return {
          value,
          done: false
        };
      });
    };
    InvertedIndex.prototype.tokens = function() {
      return this.mapping.keys();
    };
    if (typeof Symbol !== "undefined")
      InvertedIndex.prototype[Symbol.iterator] = InvertedIndex.prototype.documents;
    InvertedIndex.prototype.inspect = function() {
      var array = this.items.slice();
      Object.defineProperty(array, "constructor", {
        value: InvertedIndex,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      InvertedIndex.prototype[Symbol.for("nodejs.util.inspect.custom")] = InvertedIndex.prototype.inspect;
    InvertedIndex.from = function(iterable, descriptor) {
      var index2 = new InvertedIndex(descriptor);
      forEach(iterable, function(doc) {
        index2.add(doc);
      });
      return index2;
    };
    module.exports = InvertedIndex;
  }
});

// node_modules/mnemonist/sort/quick.js
var require_quick = __commonJS({
  "node_modules/mnemonist/sort/quick.js"(exports) {
    var LOS = new Float64Array(64);
    var HIS = new Float64Array(64);
    function inplaceQuickSort(array, lo, hi) {
      var p, i, l, r, swap2;
      LOS[0] = lo;
      HIS[0] = hi;
      i = 0;
      while (i >= 0) {
        l = LOS[i];
        r = HIS[i] - 1;
        if (l < r) {
          p = array[l];
          while (l < r) {
            while (array[r] >= p && l < r)
              r--;
            if (l < r)
              array[l++] = array[r];
            while (array[l] <= p && l < r)
              l++;
            if (l < r)
              array[r--] = array[l];
          }
          array[l] = p;
          LOS[i + 1] = l + 1;
          HIS[i + 1] = HIS[i];
          HIS[i++] = l;
          if (HIS[i] - LOS[i] > HIS[i - 1] - LOS[i - 1]) {
            swap2 = LOS[i];
            LOS[i] = LOS[i - 1];
            LOS[i - 1] = swap2;
            swap2 = HIS[i];
            HIS[i] = HIS[i - 1];
            HIS[i - 1] = swap2;
          }
        } else {
          i--;
        }
      }
      return array;
    }
    exports.inplaceQuickSort = inplaceQuickSort;
    function inplaceQuickSortIndices(array, indices, lo, hi) {
      var p, i, l, r, t, swap2;
      LOS[0] = lo;
      HIS[0] = hi;
      i = 0;
      while (i >= 0) {
        l = LOS[i];
        r = HIS[i] - 1;
        if (l < r) {
          t = indices[l];
          p = array[t];
          while (l < r) {
            while (array[indices[r]] >= p && l < r)
              r--;
            if (l < r)
              indices[l++] = indices[r];
            while (array[indices[l]] <= p && l < r)
              l++;
            if (l < r)
              indices[r--] = indices[l];
          }
          indices[l] = t;
          LOS[i + 1] = l + 1;
          HIS[i + 1] = HIS[i];
          HIS[i++] = l;
          if (HIS[i] - LOS[i] > HIS[i - 1] - LOS[i - 1]) {
            swap2 = LOS[i];
            LOS[i] = LOS[i - 1];
            LOS[i - 1] = swap2;
            swap2 = HIS[i];
            HIS[i] = HIS[i - 1];
            HIS[i - 1] = swap2;
          }
        } else {
          i--;
        }
      }
      return indices;
    }
    exports.inplaceQuickSortIndices = inplaceQuickSortIndices;
  }
});

// node_modules/mnemonist/kd-tree.js
var require_kd_tree = __commonJS({
  "node_modules/mnemonist/kd-tree.js"(exports, module) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var createTupleComparator = require_comparators().createTupleComparator;
    var FixedReverseHeap = require_fixed_reverse_heap();
    var inplaceQuickSortIndices = require_quick().inplaceQuickSortIndices;
    function squaredDistanceAxes(dimensions, axes, pivot, b) {
      var d;
      var dist = 0, step;
      for (d = 0; d < dimensions; d++) {
        step = axes[d][pivot] - b[d];
        dist += step * step;
      }
      return dist;
    }
    function reshapeIntoAxes(dimensions, data) {
      var l = data.length;
      var axes = new Array(dimensions), labels = new Array(l), axis;
      var PointerArray = typed.getPointerArray(l);
      var ids = new PointerArray(l);
      var d, i, row;
      var f = true;
      for (d = 0; d < dimensions; d++) {
        axis = new Float64Array(l);
        for (i = 0; i < l; i++) {
          row = data[i];
          axis[i] = row[1][d];
          if (f) {
            labels[i] = row[0];
            ids[i] = i;
          }
        }
        f = false;
        axes[d] = axis;
      }
      return { axes, ids, labels };
    }
    function buildTree(dimensions, axes, ids, labels) {
      var l = labels.length;
      var PointerArray = typed.getPointerArray(l + 1);
      var pivots = new PointerArray(l), lefts = new PointerArray(l), rights = new PointerArray(l);
      var stack = [[0, 0, ids.length, -1, 0]], step, parent, direction, median, pivot, lo, hi;
      var d, i = 0;
      while (stack.length !== 0) {
        step = stack.pop();
        d = step[0];
        lo = step[1];
        hi = step[2];
        parent = step[3];
        direction = step[4];
        inplaceQuickSortIndices(axes[d], ids, lo, hi);
        l = hi - lo;
        median = lo + (l >>> 1);
        pivot = ids[median];
        pivots[i] = pivot;
        if (parent > -1) {
          if (direction === 0)
            lefts[parent] = i + 1;
          else
            rights[parent] = i + 1;
        }
        d = (d + 1) % dimensions;
        if (median !== lo && median !== hi - 1) {
          stack.push([d, median + 1, hi, i, 1]);
        }
        if (median !== lo) {
          stack.push([d, lo, median, i, 0]);
        }
        i++;
      }
      return {
        axes,
        labels,
        pivots,
        lefts,
        rights
      };
    }
    function KDTree(dimensions, build) {
      this.dimensions = dimensions;
      this.visited = 0;
      this.axes = build.axes;
      this.labels = build.labels;
      this.pivots = build.pivots;
      this.lefts = build.lefts;
      this.rights = build.rights;
      this.size = this.labels.length;
    }
    KDTree.prototype.nearestNeighbor = function(query) {
      var bestDistance = Infinity, best = null;
      var dimensions = this.dimensions, axes = this.axes, pivots = this.pivots, lefts = this.lefts, rights = this.rights;
      var visited = 0;
      function recurse(d, node) {
        visited++;
        var left = lefts[node], right = rights[node], pivot = pivots[node];
        var dist = squaredDistanceAxes(
          dimensions,
          axes,
          pivot,
          query
        );
        if (dist < bestDistance) {
          best = pivot;
          bestDistance = dist;
          if (dist === 0)
            return;
        }
        var dx = axes[d][pivot] - query[d];
        d = (d + 1) % dimensions;
        if (dx > 0) {
          if (left !== 0)
            recurse(d, left - 1);
        } else {
          if (right !== 0)
            recurse(d, right - 1);
        }
        if (dx * dx < bestDistance) {
          if (dx > 0) {
            if (right !== 0)
              recurse(d, right - 1);
          } else {
            if (left !== 0)
              recurse(d, left - 1);
          }
        }
      }
      recurse(0, 0);
      this.visited = visited;
      return this.labels[best];
    };
    var KNN_HEAP_COMPARATOR_3 = createTupleComparator(3);
    var KNN_HEAP_COMPARATOR_2 = createTupleComparator(2);
    KDTree.prototype.kNearestNeighbors = function(k, query) {
      if (k <= 0)
        throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
      k = Math.min(k, this.size);
      if (k === 1)
        return [this.nearestNeighbor(query)];
      var heap = new FixedReverseHeap(Array, KNN_HEAP_COMPARATOR_3, k);
      var dimensions = this.dimensions, axes = this.axes, pivots = this.pivots, lefts = this.lefts, rights = this.rights;
      var visited = 0;
      function recurse(d, node) {
        var left = lefts[node], right = rights[node], pivot = pivots[node];
        var dist = squaredDistanceAxes(
          dimensions,
          axes,
          pivot,
          query
        );
        heap.push([dist, visited++, pivot]);
        var point = query[d], split = axes[d][pivot], dx = point - split;
        d = (d + 1) % dimensions;
        if (point < split) {
          if (left !== 0) {
            recurse(d, left - 1);
          }
        } else {
          if (right !== 0) {
            recurse(d, right - 1);
          }
        }
        if (dx * dx < heap.peek()[0] || heap.size < k) {
          if (point < split) {
            if (right !== 0) {
              recurse(d, right - 1);
            }
          } else {
            if (left !== 0) {
              recurse(d, left - 1);
            }
          }
        }
      }
      recurse(0, 0);
      this.visited = visited;
      var best = heap.consume();
      for (var i = 0; i < best.length; i++)
        best[i] = this.labels[best[i][2]];
      return best;
    };
    KDTree.prototype.linearKNearestNeighbors = function(k, query) {
      if (k <= 0)
        throw new Error("mnemonist/kd-tree.kNearestNeighbors: k should be a positive number.");
      k = Math.min(k, this.size);
      var heap = new FixedReverseHeap(Array, KNN_HEAP_COMPARATOR_2, k);
      var i, l, dist;
      for (i = 0, l = this.size; i < l; i++) {
        dist = squaredDistanceAxes(
          this.dimensions,
          this.axes,
          this.pivots[i],
          query
        );
        heap.push([dist, i]);
      }
      var best = heap.consume();
      for (i = 0; i < best.length; i++)
        best[i] = this.labels[this.pivots[best[i][1]]];
      return best;
    };
    KDTree.prototype.inspect = function() {
      var dummy = /* @__PURE__ */ new Map();
      dummy.dimensions = this.dimensions;
      Object.defineProperty(dummy, "constructor", {
        value: KDTree,
        enumerable: false
      });
      var i, j, point;
      for (i = 0; i < this.size; i++) {
        point = new Array(this.dimensions);
        for (j = 0; j < this.dimensions; j++)
          point[j] = this.axes[j][i];
        dummy.set(this.labels[i], point);
      }
      return dummy;
    };
    if (typeof Symbol !== "undefined")
      KDTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = KDTree.prototype.inspect;
    KDTree.from = function(iterable, dimensions) {
      var data = iterables.toArray(iterable);
      var reshaped = reshapeIntoAxes(dimensions, data);
      var result = buildTree(dimensions, reshaped.axes, reshaped.ids, reshaped.labels);
      return new KDTree(dimensions, result);
    };
    KDTree.fromAxes = function(axes, labels) {
      if (!labels)
        labels = typed.indices(axes[0].length);
      var dimensions = axes.length;
      var result = buildTree(axes.length, axes, typed.indices(labels.length), labels);
      return new KDTree(dimensions, result);
    };
    module.exports = KDTree;
  }
});

// node_modules/mnemonist/linked-list.js
var require_linked_list = __commonJS({
  "node_modules/mnemonist/linked-list.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    function LinkedList() {
      this.clear();
    }
    LinkedList.prototype.clear = function() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    };
    LinkedList.prototype.first = function() {
      return this.head ? this.head.item : void 0;
    };
    LinkedList.prototype.peek = LinkedList.prototype.first;
    LinkedList.prototype.last = function() {
      return this.tail ? this.tail.item : void 0;
    };
    LinkedList.prototype.push = function(item) {
      var node = { item, next: null };
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        this.tail.next = node;
        this.tail = node;
      }
      this.size++;
      return this.size;
    };
    LinkedList.prototype.unshift = function(item) {
      var node = { item, next: null };
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        if (!this.head.next)
          this.tail = this.head;
        node.next = this.head;
        this.head = node;
      }
      this.size++;
      return this.size;
    };
    LinkedList.prototype.shift = function() {
      if (!this.size)
        return void 0;
      var node = this.head;
      this.head = node.next;
      this.size--;
      return node.item;
    };
    LinkedList.prototype.forEach = function(callback, scope) {
      if (!this.size)
        return;
      scope = arguments.length > 1 ? scope : this;
      var n = this.head, i = 0;
      while (n) {
        callback.call(scope, n.item, i, this);
        n = n.next;
        i++;
      }
    };
    LinkedList.prototype.toArray = function() {
      if (!this.size)
        return [];
      var array = new Array(this.size);
      for (var i = 0, l = this.size, n = this.head; i < l; i++) {
        array[i] = n.item;
        n = n.next;
      }
      return array;
    };
    LinkedList.prototype.values = function() {
      var n = this.head;
      return new Iterator(function() {
        if (!n)
          return {
            done: true
          };
        var value = n.item;
        n = n.next;
        return {
          value,
          done: false
        };
      });
    };
    LinkedList.prototype.entries = function() {
      var n = this.head, i = 0;
      return new Iterator(function() {
        if (!n)
          return {
            done: true
          };
        var value = n.item;
        n = n.next;
        i++;
        return {
          value: [i - 1, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LinkedList.prototype[Symbol.iterator] = LinkedList.prototype.values;
    LinkedList.prototype.toString = function() {
      return this.toArray().join(",");
    };
    LinkedList.prototype.toJSON = function() {
      return this.toArray();
    };
    LinkedList.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: LinkedList,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      LinkedList.prototype[Symbol.for("nodejs.util.inspect.custom")] = LinkedList.prototype.inspect;
    LinkedList.from = function(iterable) {
      var list = new LinkedList();
      forEach(iterable, function(value) {
        list.push(value);
      });
      return list;
    };
    module.exports = LinkedList;
  }
});

// node_modules/mnemonist/lru-cache.js
var require_lru_cache = __commonJS({
  "node_modules/mnemonist/lru-cache.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCache(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-cache: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-cache: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    }
    LRUCache.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = {};
    };
    LRUCache.prototype.splayOnTop = function(pointer) {
      var oldHead = this.head;
      if (this.head === pointer)
        return this;
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.tail === pointer) {
        this.tail = previous;
      } else {
        this.backward[next] = previous;
      }
      this.forward[previous] = next;
      this.backward[oldHead] = pointer;
      this.head = pointer;
      this.forward[pointer] = oldHead;
      return this;
    };
    LRUCache.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCache.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCache.prototype.has = function(key) {
      return key in this.items;
    };
    LRUCache.prototype.get = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUCache.prototype.peek = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUCache.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      while (i < l) {
        callback.call(scope, values[pointer], keys[pointer], this);
        pointer = forward[pointer];
        i++;
      }
    };
    LRUCache.prototype.keys = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: key
        };
      });
    };
    LRUCache.prototype.values = function() {
      var i = 0, l = this.size;
      var pointer = this.head, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value
        };
      });
    };
    LRUCache.prototype.entries = function() {
      var i = 0, l = this.size;
      var pointer = this.head, keys = this.K, values = this.V, forward = this.forward;
      return new Iterator(function() {
        if (i >= l)
          return { done: true };
        var key = keys[pointer], value = values[pointer];
        i++;
        if (i < l)
          pointer = forward[pointer];
        return {
          done: false,
          value: [key, value]
        };
      });
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.iterator] = LRUCache.prototype.entries;
    LRUCache.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      var iterator = this.entries(), step;
      while (step = iterator.next(), !step.done)
        proxy.set(step.value[0], step.value[1]);
      Object.defineProperty(proxy, "constructor", {
        value: LRUCache,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      LRUCache.prototype[Symbol.for("nodejs.util.inspect.custom")] = LRUCache.prototype.inspect;
    LRUCache.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCache(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUCache;
  }
});

// node_modules/mnemonist/lru-cache-with-delete.js
var require_lru_cache_with_delete = __commonJS({
  "node_modules/mnemonist/lru-cache-with-delete.js"(exports, module) {
    var LRUCache = require_lru_cache();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUCacheWithDelete(Keys, Values, capacity) {
      if (arguments.length < 2) {
        LRUCache.call(this, Keys);
      } else {
        LRUCache.call(this, Keys, Values, capacity);
      }
      var PointerArray = typed.getPointerArray(this.capacity);
      this.deleted = new PointerArray(this.capacity);
      this.deletedSize = 0;
    }
    for (k in LRUCache.prototype)
      LRUCacheWithDelete.prototype[k] = LRUCache.prototype[k];
    var k;
    if (typeof Symbol !== "undefined")
      LRUCacheWithDelete.prototype[Symbol.iterator] = LRUCache.prototype[Symbol.iterator];
    LRUCacheWithDelete.prototype.clear = function() {
      LRUCache.prototype.clear.call(this);
      this.deletedSize = 0;
    };
    LRUCacheWithDelete.prototype.set = function(key, value) {
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUCacheWithDelete.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items[key];
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        delete this.items[this.K[pointer]];
      }
      this.items[key] = pointer;
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUCacheWithDelete.prototype.delete = function(key) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined") {
        return false;
      }
      delete this.items[key];
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return true;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return true;
    };
    LRUCacheWithDelete.prototype.remove = function(key, missing = void 0) {
      var pointer = this.items[key];
      if (typeof pointer === "undefined") {
        return missing;
      }
      var dead = this.V[pointer];
      delete this.items[key];
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return dead;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return dead;
    };
    LRUCacheWithDelete.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUCacheWithDelete(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUCacheWithDelete;
  }
});

// node_modules/mnemonist/lru-map.js
var require_lru_map = __commonJS({
  "node_modules/mnemonist/lru-map.js"(exports, module) {
    var LRUCache = require_lru_cache();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUMap(Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      this.capacity = capacity;
      if (typeof this.capacity !== "number" || this.capacity <= 0)
        throw new Error("mnemonist/lru-map: capacity should be positive number.");
      else if (!isFinite(this.capacity) || Math.floor(this.capacity) !== this.capacity)
        throw new Error("mnemonist/lru-map: capacity should be a finite positive integer.");
      var PointerArray = typed.getPointerArray(capacity);
      this.forward = new PointerArray(capacity);
      this.backward = new PointerArray(capacity);
      this.K = typeof Keys === "function" ? new Keys(capacity) : new Array(capacity);
      this.V = typeof Values === "function" ? new Values(capacity) : new Array(capacity);
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items = /* @__PURE__ */ new Map();
    }
    LRUMap.prototype.clear = function() {
      this.size = 0;
      this.head = 0;
      this.tail = 0;
      this.items.clear();
    };
    LRUMap.prototype.set = function(key, value) {
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUMap.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        pointer = this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUMap.prototype.has = function(key) {
      return this.items.has(key);
    };
    LRUMap.prototype.get = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      this.splayOnTop(pointer);
      return this.V[pointer];
    };
    LRUMap.prototype.peek = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined")
        return;
      return this.V[pointer];
    };
    LRUMap.prototype.splayOnTop = LRUCache.prototype.splayOnTop;
    LRUMap.prototype.forEach = LRUCache.prototype.forEach;
    LRUMap.prototype.keys = LRUCache.prototype.keys;
    LRUMap.prototype.values = LRUCache.prototype.values;
    LRUMap.prototype.entries = LRUCache.prototype.entries;
    if (typeof Symbol !== "undefined")
      LRUMap.prototype[Symbol.iterator] = LRUMap.prototype.entries;
    LRUMap.prototype.inspect = LRUCache.prototype.inspect;
    LRUMap.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-cache.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUMap(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUMap;
  }
});

// node_modules/mnemonist/lru-map-with-delete.js
var require_lru_map_with_delete = __commonJS({
  "node_modules/mnemonist/lru-map-with-delete.js"(exports, module) {
    var LRUMap = require_lru_map();
    var forEach = require_foreach();
    var typed = require_typed_arrays();
    var iterables = require_iterables();
    function LRUMapWithDelete(Keys, Values, capacity) {
      if (arguments.length < 2) {
        LRUMap.call(this, Keys);
      } else {
        LRUMap.call(this, Keys, Values, capacity);
      }
      var PointerArray = typed.getPointerArray(this.capacity);
      this.deleted = new PointerArray(this.capacity);
      this.deletedSize = 0;
    }
    for (k in LRUMap.prototype)
      LRUMapWithDelete.prototype[k] = LRUMap.prototype[k];
    var k;
    if (typeof Symbol !== "undefined")
      LRUMapWithDelete.prototype[Symbol.iterator] = LRUMap.prototype[Symbol.iterator];
    LRUMapWithDelete.prototype.clear = function() {
      LRUMap.prototype.clear.call(this);
      this.deletedSize = 0;
    };
    LRUMapWithDelete.prototype.set = function(key, value) {
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        this.V[pointer] = value;
        return;
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
    };
    LRUMapWithDelete.prototype.setpop = function(key, value) {
      var oldValue = null;
      var oldKey = null;
      var pointer = this.items.get(key);
      if (typeof pointer !== "undefined") {
        this.splayOnTop(pointer);
        oldValue = this.V[pointer];
        this.V[pointer] = value;
        return { evicted: false, key, value: oldValue };
      }
      if (this.size < this.capacity) {
        if (this.deletedSize > 0) {
          pointer = this.deleted[--this.deletedSize];
        } else {
          pointer = this.size;
        }
        this.size++;
      } else {
        pointer = this.tail;
        this.tail = this.backward[pointer];
        oldValue = this.V[pointer];
        oldKey = this.K[pointer];
        this.items.delete(this.K[pointer]);
      }
      this.items.set(key, pointer);
      this.K[pointer] = key;
      this.V[pointer] = value;
      this.forward[pointer] = this.head;
      this.backward[this.head] = pointer;
      this.head = pointer;
      if (oldKey) {
        return { evicted: true, key: oldKey, value: oldValue };
      } else {
        return null;
      }
    };
    LRUMapWithDelete.prototype.delete = function(key) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined") {
        return false;
      }
      this.items.delete(key);
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return true;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return true;
    };
    LRUMapWithDelete.prototype.remove = function(key, missing = void 0) {
      var pointer = this.items.get(key);
      if (typeof pointer === "undefined") {
        return missing;
      }
      var dead = this.V[pointer];
      this.items.delete(key);
      if (this.size === 1) {
        this.size = 0;
        this.head = 0;
        this.tail = 0;
        this.deletedSize = 0;
        return dead;
      }
      var previous = this.backward[pointer], next = this.forward[pointer];
      if (this.head === pointer) {
        this.head = next;
      }
      if (this.tail === pointer) {
        this.tail = previous;
      }
      this.forward[previous] = next;
      this.backward[next] = previous;
      this.size--;
      this.deleted[this.deletedSize++] = pointer;
      return dead;
    };
    LRUMapWithDelete.from = function(iterable, Keys, Values, capacity) {
      if (arguments.length < 2) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/lru-map.from: could not guess iterable length. Please provide desired capacity as last argument.");
      } else if (arguments.length === 2) {
        capacity = Keys;
        Keys = null;
        Values = null;
      }
      var cache = new LRUMapWithDelete(Keys, Values, capacity);
      forEach(iterable, function(value, key) {
        cache.set(key, value);
      });
      return cache;
    };
    module.exports = LRUMapWithDelete;
  }
});

// node_modules/mnemonist/multi-set.js
var require_multi_set = __commonJS({
  "node_modules/mnemonist/multi-set.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var FixedReverseHeap = require_fixed_reverse_heap();
    var MULTISET_ITEM_COMPARATOR = function(a, b) {
      if (a[1] > b[1])
        return -1;
      if (a[1] < b[1])
        return 1;
      return 0;
    };
    function MultiSet() {
      this.items = /* @__PURE__ */ new Map();
      Object.defineProperty(this.items, "constructor", {
        value: MultiSet,
        enumerable: false
      });
      this.clear();
    }
    MultiSet.prototype.clear = function() {
      this.size = 0;
      this.dimension = 0;
      this.items.clear();
    };
    MultiSet.prototype.add = function(item, count) {
      if (count === 0)
        return this;
      if (count < 0)
        return this.remove(item, -count);
      count = count || 1;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.add: given count should be a number.");
      this.size += count;
      const currentCount = this.items.get(item);
      if (currentCount === void 0)
        this.dimension++;
      else
        count += currentCount;
      this.items.set(item, count);
      return this;
    };
    MultiSet.prototype.set = function(item, count) {
      var currentCount;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.set: given count should be a number.");
      if (count <= 0) {
        currentCount = this.items.get(item);
        if (typeof currentCount !== "undefined") {
          this.size -= currentCount;
          this.dimension--;
        }
        this.items.delete(item);
        return this;
      }
      count = count || 1;
      currentCount = this.items.get(item);
      if (typeof currentCount === "number") {
        this.items.set(item, currentCount + count);
      } else {
        this.dimension++;
        this.items.set(item, count);
      }
      this.size += count;
      return this;
    };
    MultiSet.prototype.has = function(item) {
      return this.items.has(item);
    };
    MultiSet.prototype.delete = function(item) {
      var count = this.items.get(item);
      if (count === 0)
        return false;
      this.size -= count;
      this.dimension--;
      this.items.delete(item);
      return true;
    };
    MultiSet.prototype.remove = function(item, count) {
      if (count === 0)
        return;
      if (count < 0)
        return this.add(item, -count);
      count = count || 1;
      if (typeof count !== "number")
        throw new Error("mnemonist/multi-set.remove: given count should be a number.");
      var currentCount = this.items.get(item);
      if (typeof currentCount === "undefined")
        return;
      var newCount = Math.max(0, currentCount - count);
      if (newCount === 0) {
        this.items.delete(item);
        this.size -= currentCount;
        this.dimension--;
      } else {
        this.items.set(item, newCount);
        this.size -= count;
      }
      return;
    };
    MultiSet.prototype.edit = function(a, b) {
      var am = this.multiplicity(a);
      if (am === 0)
        return;
      var bm = this.multiplicity(b);
      this.items.set(b, am + bm);
      this.items.delete(a);
      return this;
    };
    MultiSet.prototype.multiplicity = function(item) {
      var count = this.items.get(item);
      if (typeof count === "undefined")
        return 0;
      return count;
    };
    MultiSet.prototype.get = MultiSet.prototype.multiplicity;
    MultiSet.prototype.count = MultiSet.prototype.multiplicity;
    MultiSet.prototype.frequency = function(item) {
      if (this.size === 0)
        return 0;
      var count = this.multiplicity(item);
      return count / this.size;
    };
    MultiSet.prototype.top = function(n) {
      if (typeof n !== "number" || n <= 0)
        throw new Error("mnemonist/multi-set.top: n must be a number > 0.");
      var heap = new FixedReverseHeap(Array, MULTISET_ITEM_COMPARATOR, n);
      var iterator = this.items.entries(), step;
      while (step = iterator.next(), !step.done)
        heap.push(step.value);
      return heap.consume();
    };
    MultiSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var i;
      this.items.forEach(function(multiplicity, value) {
        for (i = 0; i < multiplicity; i++)
          callback.call(scope, value, value);
      });
    };
    MultiSet.prototype.forEachMultiplicity = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      this.items.forEach(callback, scope);
    };
    MultiSet.prototype.keys = function() {
      return this.items.keys();
    };
    MultiSet.prototype.values = function() {
      var iterator = this.items.entries(), inContainer = false, step, value, multiplicity, i;
      return new Iterator(function next() {
        if (!inContainer) {
          step = iterator.next();
          if (step.done)
            return { done: true };
          inContainer = true;
          value = step.value[0];
          multiplicity = step.value[1];
          i = 0;
        }
        if (i >= multiplicity) {
          inContainer = false;
          return next();
        }
        i++;
        return {
          done: false,
          value
        };
      });
    };
    MultiSet.prototype.multiplicities = function() {
      return this.items.entries();
    };
    if (typeof Symbol !== "undefined")
      MultiSet.prototype[Symbol.iterator] = MultiSet.prototype.values;
    MultiSet.prototype.inspect = function() {
      return this.items;
    };
    if (typeof Symbol !== "undefined")
      MultiSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = MultiSet.prototype.inspect;
    MultiSet.prototype.toJSON = function() {
      return this.items;
    };
    MultiSet.from = function(iterable) {
      var set = new MultiSet();
      forEach(iterable, function(value) {
        set.add(value);
      });
      return set;
    };
    MultiSet.isSubset = function(A, B) {
      var iterator = A.multiplicities(), step, key, mA;
      if (A === B)
        return true;
      if (A.dimension > B.dimension)
        return false;
      while (step = iterator.next(), !step.done) {
        key = step.value[0];
        mA = step.value[1];
        if (B.multiplicity(key) < mA)
          return false;
      }
      return true;
    };
    MultiSet.isSuperset = function(A, B) {
      return MultiSet.isSubset(B, A);
    };
    module.exports = MultiSet;
  }
});

// node_modules/mnemonist/passjoin-index.js
var require_passjoin_index = __commonJS({
  "node_modules/mnemonist/passjoin-index.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    function countSubstringsL(k, s, l) {
      return ((Math.pow(k, 2) - Math.pow(Math.abs(s - l), 2)) / 2 | 0) + k + 1;
    }
    function countKeys(k, s) {
      var c = 0;
      for (var l = 0, m = s + 1; l < m; l++)
        c += countSubstringsL(k, s, l);
      return c;
    }
    function comparator(a, b) {
      if (a.length > b.length)
        return -1;
      if (a.length < b.length)
        return 1;
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    }
    function partition(k, l) {
      var m = k + 1, a = l / m | 0, b = a + 1, i, j;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      var tuples = new Array(k + 1);
      for (i = 0; i < smallSegments; i++)
        tuples[i] = [i * a, a];
      var offset = (i - 1) * a + a;
      for (j = 0; j < largeSegments; j++)
        tuples[i + j] = [offset + j * b, b];
      return tuples;
    }
    function segments(k, string) {
      var l = string.length, m = k + 1, a = l / m | 0, b = a + 1, o, i, j;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      var S = new Array(k + 1);
      for (i = 0; i < smallSegments; i++) {
        o = i * a;
        S[i] = string.slice(o, o + a);
      }
      var offset = (i - 1) * a + a;
      for (j = 0; j < largeSegments; j++) {
        o = offset + j * b;
        S[i + j] = string.slice(o, o + b);
      }
      return S;
    }
    function segmentPos(k, i, string) {
      if (i === 0)
        return 0;
      var l = string.length;
      var m = k + 1, a = l / m | 0, b = a + 1;
      var largeSegments = l - a * m, smallSegments = m - largeSegments;
      if (i <= smallSegments - 1)
        return i * a;
      var offset = i - smallSegments;
      return smallSegments * a + offset * b;
    }
    function multiMatchAwareInterval(k, delta, i, s, pi, li) {
      var start1 = pi - i, end1 = pi + i;
      var o = k - i;
      var start2 = pi + delta - o, end2 = pi + delta + o;
      var end3 = s - li;
      return [Math.max(0, start1, start2), Math.min(end1, end2, end3)];
    }
    function multiMatchAwareSubstrings(k, string, l, i, pi, li) {
      var s = string.length;
      var delta = s - l;
      var interval = multiMatchAwareInterval(k, delta, i, s, pi, li);
      var start = interval[0], stop = interval[1];
      var currentSubstring = "";
      var substrings = [];
      var substring, j, m;
      for (j = start, m = stop + 1; j < m; j++) {
        substring = string.slice(j, j + li);
        if (substring === currentSubstring)
          continue;
        substrings.push(substring);
        currentSubstring = substring;
      }
      return substrings;
    }
    function PassjoinIndex(levenshtein, k) {
      if (typeof levenshtein !== "function")
        throw new Error("mnemonist/passjoin-index: `levenshtein` should be a function returning edit distance between two strings.");
      if (typeof k !== "number" || k < 1)
        throw new Error("mnemonist/passjoin-index: `k` should be a number > 0");
      this.levenshtein = levenshtein;
      this.k = k;
      this.clear();
    }
    PassjoinIndex.prototype.clear = function() {
      this.size = 0;
      this.strings = [];
      this.invertedIndices = {};
    };
    PassjoinIndex.prototype.add = function(value) {
      var l = value.length;
      var stringIndex = this.size;
      this.strings.push(value);
      this.size++;
      var S = segments(this.k, value);
      var Ll = this.invertedIndices[l];
      if (typeof Ll === "undefined") {
        Ll = {};
        this.invertedIndices[l] = Ll;
      }
      var segment, matches, key, i, m;
      for (i = 0, m = S.length; i < m; i++) {
        segment = S[i];
        key = segment + i;
        matches = Ll[key];
        if (typeof matches === "undefined") {
          matches = [stringIndex];
          Ll[key] = matches;
        } else {
          matches.push(stringIndex);
        }
      }
      return this;
    };
    PassjoinIndex.prototype.search = function(query) {
      var s = query.length, k = this.k;
      var M = /* @__PURE__ */ new Set();
      var candidates, candidate, queryPos, querySegmentLength, key, S, P, l, m, i, n1, j, n2, y, n3;
      for (l = Math.max(0, s - k), m = s + k + 1; l < m; l++) {
        var Ll = this.invertedIndices[l];
        if (typeof Ll === "undefined")
          continue;
        P = partition(k, l);
        for (i = 0, n1 = P.length; i < n1; i++) {
          queryPos = P[i][0];
          querySegmentLength = P[i][1];
          S = multiMatchAwareSubstrings(
            k,
            query,
            l,
            i,
            queryPos,
            querySegmentLength
          );
          if (!S.length)
            S = [""];
          for (j = 0, n2 = S.length; j < n2; j++) {
            key = S[j] + i;
            candidates = Ll[key];
            if (typeof candidates === "undefined")
              continue;
            for (y = 0, n3 = candidates.length; y < n3; y++) {
              candidate = this.strings[candidates[y]];
              if (s <= k && l <= k || !M.has(candidate) && this.levenshtein(query, candidate) <= k)
                M.add(candidate);
            }
          }
        }
      }
      return M;
    };
    PassjoinIndex.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.strings.length; i < l; i++)
        callback.call(scope, this.strings[i], i, this);
    };
    PassjoinIndex.prototype.values = function() {
      var strings = this.strings, l = strings.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = strings[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      PassjoinIndex.prototype[Symbol.iterator] = PassjoinIndex.prototype.values;
    PassjoinIndex.prototype.inspect = function() {
      var array = this.strings.slice();
      Object.defineProperty(array, "constructor", {
        value: PassjoinIndex,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      PassjoinIndex.prototype[Symbol.for("nodejs.util.inspect.custom")] = PassjoinIndex.prototype.inspect;
    PassjoinIndex.from = function(iterable, levenshtein, k) {
      var index2 = new PassjoinIndex(levenshtein, k);
      forEach(iterable, function(string) {
        index2.add(string);
      });
      return index2;
    };
    PassjoinIndex.countKeys = countKeys;
    PassjoinIndex.comparator = comparator;
    PassjoinIndex.partition = partition;
    PassjoinIndex.segments = segments;
    PassjoinIndex.segmentPos = segmentPos;
    PassjoinIndex.multiMatchAwareInterval = multiMatchAwareInterval;
    PassjoinIndex.multiMatchAwareSubstrings = multiMatchAwareSubstrings;
    module.exports = PassjoinIndex;
  }
});

// node_modules/mnemonist/queue.js
var require_queue = __commonJS({
  "node_modules/mnemonist/queue.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    function Queue() {
      this.clear();
    }
    Queue.prototype.clear = function() {
      this.items = [];
      this.offset = 0;
      this.size = 0;
    };
    Queue.prototype.enqueue = function(item) {
      this.items.push(item);
      return ++this.size;
    };
    Queue.prototype.dequeue = function() {
      if (!this.size)
        return;
      var item = this.items[this.offset];
      if (++this.offset * 2 >= this.items.length) {
        this.items = this.items.slice(this.offset);
        this.offset = 0;
      }
      this.size--;
      return item;
    };
    Queue.prototype.peek = function() {
      if (!this.size)
        return;
      return this.items[this.offset];
    };
    Queue.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = this.offset, j = 0, l = this.items.length; i < l; i++, j++)
        callback.call(scope, this.items[i], j, this);
    };
    Queue.prototype.toArray = function() {
      return this.items.slice(this.offset);
    };
    Queue.prototype.values = function() {
      var items = this.items, i = this.offset;
      return new Iterator(function() {
        if (i >= items.length)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Queue.prototype.entries = function() {
      var items = this.items, i = this.offset, j = 0;
      return new Iterator(function() {
        if (i >= items.length)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value: [j++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Queue.prototype[Symbol.iterator] = Queue.prototype.values;
    Queue.prototype.toString = function() {
      return this.toArray().join(",");
    };
    Queue.prototype.toJSON = function() {
      return this.toArray();
    };
    Queue.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: Queue,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      Queue.prototype[Symbol.for("nodejs.util.inspect.custom")] = Queue.prototype.inspect;
    Queue.from = function(iterable) {
      var queue = new Queue();
      forEach(iterable, function(value) {
        queue.enqueue(value);
      });
      return queue;
    };
    Queue.of = function() {
      return Queue.from(arguments);
    };
    module.exports = Queue;
  }
});

// node_modules/mnemonist/stack.js
var require_stack = __commonJS({
  "node_modules/mnemonist/stack.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    function Stack() {
      this.clear();
    }
    Stack.prototype.clear = function() {
      this.items = [];
      this.size = 0;
    };
    Stack.prototype.push = function(item) {
      this.items.push(item);
      return ++this.size;
    };
    Stack.prototype.pop = function() {
      if (this.size === 0)
        return;
      this.size--;
      return this.items.pop();
    };
    Stack.prototype.peek = function() {
      return this.items[this.size - 1];
    };
    Stack.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0, l = this.items.length; i < l; i++)
        callback.call(scope, this.items[l - i - 1], i, this);
    };
    Stack.prototype.toArray = function() {
      var array = new Array(this.size), l = this.size - 1, i = this.size;
      while (i--)
        array[i] = this.items[l - i];
      return array;
    };
    Stack.prototype.values = function() {
      var items = this.items, l = items.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Stack.prototype.entries = function() {
      var items = this.items, l = items.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[l - i - 1];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Stack.prototype[Symbol.iterator] = Stack.prototype.values;
    Stack.prototype.toString = function() {
      return this.toArray().join(",");
    };
    Stack.prototype.toJSON = function() {
      return this.toArray();
    };
    Stack.prototype.inspect = function() {
      var array = this.toArray();
      Object.defineProperty(array, "constructor", {
        value: Stack,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      Stack.prototype[Symbol.for("nodejs.util.inspect.custom")] = Stack.prototype.inspect;
    Stack.from = function(iterable) {
      var stack = new Stack();
      forEach(iterable, function(value) {
        stack.push(value);
      });
      return stack;
    };
    Stack.of = function() {
      return Stack.from(arguments);
    };
    module.exports = Stack;
  }
});

// node_modules/mnemonist/set.js
var require_set = __commonJS({
  "node_modules/mnemonist/set.js"(exports) {
    exports.intersection = function() {
      if (arguments.length < 2)
        throw new Error("mnemonist/Set.intersection: needs at least two arguments.");
      var I = /* @__PURE__ */ new Set();
      var smallestSize = Infinity, smallestSet = null;
      var s, i, l = arguments.length;
      for (i = 0; i < l; i++) {
        s = arguments[i];
        if (s.size === 0)
          return I;
        if (s.size < smallestSize) {
          smallestSize = s.size;
          smallestSet = s;
        }
      }
      var iterator = smallestSet.values(), step, item, add, set;
      while (step = iterator.next(), !step.done) {
        item = step.value;
        add = true;
        for (i = 0; i < l; i++) {
          set = arguments[i];
          if (set === smallestSet)
            continue;
          if (!set.has(item)) {
            add = false;
            break;
          }
        }
        if (add)
          I.add(item);
      }
      return I;
    };
    exports.union = function() {
      if (arguments.length < 2)
        throw new Error("mnemonist/Set.union: needs at least two arguments.");
      var U = /* @__PURE__ */ new Set();
      var i, l = arguments.length;
      var iterator, step;
      for (i = 0; i < l; i++) {
        iterator = arguments[i].values();
        while (step = iterator.next(), !step.done)
          U.add(step.value);
      }
      return U;
    };
    exports.difference = function(A, B) {
      if (!A.size)
        return /* @__PURE__ */ new Set();
      if (!B.size)
        return new Set(A);
      var D = /* @__PURE__ */ new Set();
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          D.add(step.value);
      }
      return D;
    };
    exports.symmetricDifference = function(A, B) {
      var S = /* @__PURE__ */ new Set();
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          S.add(step.value);
      }
      iterator = B.values();
      while (step = iterator.next(), !step.done) {
        if (!A.has(step.value))
          S.add(step.value);
      }
      return S;
    };
    exports.isSubset = function(A, B) {
      var iterator = A.values(), step;
      if (A === B)
        return true;
      if (A.size > B.size)
        return false;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          return false;
      }
      return true;
    };
    exports.isSuperset = function(A, B) {
      return exports.isSubset(B, A);
    };
    exports.add = function(A, B) {
      var iterator = B.values(), step;
      while (step = iterator.next(), !step.done)
        A.add(step.value);
      return;
    };
    exports.subtract = function(A, B) {
      var iterator = B.values(), step;
      while (step = iterator.next(), !step.done)
        A.delete(step.value);
      return;
    };
    exports.intersect = function(A, B) {
      var iterator = A.values(), step;
      while (step = iterator.next(), !step.done) {
        if (!B.has(step.value))
          A.delete(step.value);
      }
      return;
    };
    exports.disjunct = function(A, B) {
      var iterator = A.values(), step;
      var toRemove = [];
      while (step = iterator.next(), !step.done) {
        if (B.has(step.value))
          toRemove.push(step.value);
      }
      iterator = B.values();
      while (step = iterator.next(), !step.done) {
        if (!A.has(step.value))
          A.add(step.value);
      }
      for (var i = 0, l = toRemove.length; i < l; i++)
        A.delete(toRemove[i]);
      return;
    };
    exports.intersectionSize = function(A, B) {
      var tmp;
      if (A.size > B.size) {
        tmp = A;
        A = B;
        B = tmp;
      }
      if (A.size === 0)
        return 0;
      if (A === B)
        return A.size;
      var iterator = A.values(), step;
      var I = 0;
      while (step = iterator.next(), !step.done) {
        if (B.has(step.value))
          I++;
      }
      return I;
    };
    exports.unionSize = function(A, B) {
      var I = exports.intersectionSize(A, B);
      return A.size + B.size - I;
    };
    exports.jaccard = function(A, B) {
      var I = exports.intersectionSize(A, B);
      if (I === 0)
        return 0;
      var U = A.size + B.size - I;
      return I / U;
    };
    exports.overlap = function(A, B) {
      var I = exports.intersectionSize(A, B);
      if (I === 0)
        return 0;
      return I / Math.min(A.size, B.size);
    };
  }
});

// node_modules/mnemonist/sparse-queue-set.js
var require_sparse_queue_set = __commonJS({
  "node_modules/mnemonist/sparse-queue-set.js"(exports, module) {
    var Iterator = require_iterator();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseQueueSet(capacity) {
      var ByteArray = getPointerArray(capacity);
      this.start = 0;
      this.size = 0;
      this.capacity = capacity;
      this.dense = new ByteArray(capacity);
      this.sparse = new ByteArray(capacity);
    }
    SparseQueueSet.prototype.clear = function() {
      this.start = 0;
      this.size = 0;
    };
    SparseQueueSet.prototype.has = function(member) {
      if (this.size === 0)
        return false;
      var index2 = this.sparse[member];
      var inBounds = index2 < this.capacity && (index2 >= this.start && index2 < this.start + this.size) || index2 < (this.start + this.size) % this.capacity;
      return inBounds && this.dense[index2] === member;
    };
    SparseQueueSet.prototype.enqueue = function(member) {
      var index2 = this.sparse[member];
      if (this.size !== 0) {
        var inBounds = index2 < this.capacity && (index2 >= this.start && index2 < this.start + this.size) || index2 < (this.start + this.size) % this.capacity;
        if (inBounds && this.dense[index2] === member)
          return this;
      }
      index2 = (this.start + this.size) % this.capacity;
      this.dense[index2] = member;
      this.sparse[member] = index2;
      this.size++;
      return this;
    };
    SparseQueueSet.prototype.dequeue = function() {
      if (this.size === 0)
        return;
      var index2 = this.start;
      this.size--;
      this.start++;
      if (this.start === this.capacity)
        this.start = 0;
      var member = this.dense[index2];
      this.sparse[member] = this.capacity;
      return member;
    };
    SparseQueueSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var c = this.capacity, l = this.size, i = this.start, j = 0;
      while (j < l) {
        callback.call(scope, this.dense[i], j, this);
        i++;
        j++;
        if (i === c)
          i = 0;
      }
    };
    SparseQueueSet.prototype.values = function() {
      var dense = this.dense, c = this.capacity, l = this.size, i = this.start, j = 0;
      return new Iterator(function() {
        if (j >= l)
          return {
            done: true
          };
        var value = dense[i];
        i++;
        j++;
        if (i === c)
          i = 0;
        return {
          value,
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseQueueSet.prototype[Symbol.iterator] = SparseQueueSet.prototype.values;
    SparseQueueSet.prototype.inspect = function() {
      var proxy = [];
      this.forEach(function(member) {
        proxy.push(member);
      });
      Object.defineProperty(proxy, "constructor", {
        value: SparseQueueSet,
        enumerable: false
      });
      proxy.capacity = this.capacity;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseQueueSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseQueueSet.prototype.inspect;
    module.exports = SparseQueueSet;
  }
});

// node_modules/mnemonist/sparse-map.js
var require_sparse_map = __commonJS({
  "node_modules/mnemonist/sparse-map.js"(exports, module) {
    var Iterator = require_iterator();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseMap(Values, length) {
      if (arguments.length < 2) {
        length = Values;
        Values = Array;
      }
      var ByteArray = getPointerArray(length);
      this.size = 0;
      this.length = length;
      this.dense = new ByteArray(length);
      this.sparse = new ByteArray(length);
      this.vals = new Values(length);
    }
    SparseMap.prototype.clear = function() {
      this.size = 0;
    };
    SparseMap.prototype.has = function(member) {
      var index2 = this.sparse[member];
      return index2 < this.size && this.dense[index2] === member;
    };
    SparseMap.prototype.get = function(member) {
      var index2 = this.sparse[member];
      if (index2 < this.size && this.dense[index2] === member)
        return this.vals[index2];
      return;
    };
    SparseMap.prototype.set = function(member, value) {
      var index2 = this.sparse[member];
      if (index2 < this.size && this.dense[index2] === member) {
        this.vals[index2] = value;
        return this;
      }
      this.dense[this.size] = member;
      this.sparse[member] = this.size;
      this.vals[this.size] = value;
      this.size++;
      return this;
    };
    SparseMap.prototype.delete = function(member) {
      var index2 = this.sparse[member];
      if (index2 >= this.size || this.dense[index2] !== member)
        return false;
      index2 = this.dense[this.size - 1];
      this.dense[this.sparse[member]] = index2;
      this.sparse[index2] = this.sparse[member];
      this.size--;
      return true;
    };
    SparseMap.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      for (var i = 0; i < this.size; i++)
        callback.call(scope, this.vals[i], this.dense[i]);
    };
    SparseMap.prototype.keys = function() {
      var size = this.size, dense = this.dense, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = dense[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    SparseMap.prototype.values = function() {
      var size = this.size, values = this.vals, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = values[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    SparseMap.prototype.entries = function() {
      var size = this.size, dense = this.dense, values = this.vals, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = [dense[i], values[i]];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseMap.prototype[Symbol.iterator] = SparseMap.prototype.entries;
    SparseMap.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Map();
      for (var i = 0; i < this.size; i++)
        proxy.set(this.dense[i], this.vals[i]);
      Object.defineProperty(proxy, "constructor", {
        value: SparseMap,
        enumerable: false
      });
      proxy.length = this.length;
      if (this.vals.constructor !== Array)
        proxy.type = this.vals.constructor.name;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseMap.prototype.inspect;
    module.exports = SparseMap;
  }
});

// node_modules/mnemonist/sparse-set.js
var require_sparse_set = __commonJS({
  "node_modules/mnemonist/sparse-set.js"(exports, module) {
    var Iterator = require_iterator();
    var getPointerArray = require_typed_arrays().getPointerArray;
    function SparseSet(length) {
      var ByteArray = getPointerArray(length);
      this.size = 0;
      this.length = length;
      this.dense = new ByteArray(length);
      this.sparse = new ByteArray(length);
    }
    SparseSet.prototype.clear = function() {
      this.size = 0;
    };
    SparseSet.prototype.has = function(member) {
      var index2 = this.sparse[member];
      return index2 < this.size && this.dense[index2] === member;
    };
    SparseSet.prototype.add = function(member) {
      var index2 = this.sparse[member];
      if (index2 < this.size && this.dense[index2] === member)
        return this;
      this.dense[this.size] = member;
      this.sparse[member] = this.size;
      this.size++;
      return this;
    };
    SparseSet.prototype.delete = function(member) {
      var index2 = this.sparse[member];
      if (index2 >= this.size || this.dense[index2] !== member)
        return false;
      index2 = this.dense[this.size - 1];
      this.dense[this.sparse[member]] = index2;
      this.sparse[index2] = this.sparse[member];
      this.size--;
      return true;
    };
    SparseSet.prototype.forEach = function(callback, scope) {
      scope = arguments.length > 1 ? scope : this;
      var item;
      for (var i = 0; i < this.size; i++) {
        item = this.dense[i];
        callback.call(scope, item, item);
      }
    };
    SparseSet.prototype.values = function() {
      var size = this.size, dense = this.dense, i = 0;
      return new Iterator(function() {
        if (i < size) {
          var item = dense[i];
          i++;
          return {
            value: item
          };
        }
        return {
          done: true
        };
      });
    };
    if (typeof Symbol !== "undefined")
      SparseSet.prototype[Symbol.iterator] = SparseSet.prototype.values;
    SparseSet.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Set();
      for (var i = 0; i < this.size; i++)
        proxy.add(this.dense[i]);
      Object.defineProperty(proxy, "constructor", {
        value: SparseSet,
        enumerable: false
      });
      proxy.length = this.length;
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      SparseSet.prototype[Symbol.for("nodejs.util.inspect.custom")] = SparseSet.prototype.inspect;
    module.exports = SparseSet;
  }
});

// node_modules/mnemonist/symspell.js
var require_symspell = __commonJS({
  "node_modules/mnemonist/symspell.js"(exports, module) {
    var forEach = require_foreach();
    var DEFAULT_MAX_DISTANCE = 2;
    var DEFAULT_VERBOSITY = 2;
    var VERBOSITY = /* @__PURE__ */ new Set([
      // Returns only the top suggestion
      0,
      // Returns suggestions with the smallest edit distance
      1,
      // Returns every suggestion (no early termination)
      2
    ]);
    var VERBOSITY_EXPLANATIONS = {
      0: "Returns only the top suggestion",
      1: "Returns suggestions with the smallest edit distance",
      2: "Returns every suggestion (no early termination)"
    };
    function createDictionaryItem(value) {
      var suggestions = /* @__PURE__ */ new Set();
      if (typeof value === "number")
        suggestions.add(value);
      return {
        suggestions,
        count: 0
      };
    }
    function createSuggestionItem(term, distance, count) {
      return {
        term: term || "",
        distance: distance || 0,
        count: count || 0
      };
    }
    function edits(word, distance, max, deletes) {
      deletes = deletes || /* @__PURE__ */ new Set();
      distance++;
      var deletedItem, l = word.length, i;
      if (l > 1) {
        for (i = 0; i < l; i++) {
          deletedItem = word.substring(0, i) + word.substring(i + 1);
          if (!deletes.has(deletedItem)) {
            deletes.add(deletedItem);
            if (distance < max)
              edits(deletedItem, distance, max, deletes);
          }
        }
      }
      return deletes;
    }
    function addLowestDistance(words, verbosity, item, suggestion, int, deletedItem) {
      var first = item.suggestions.values().next().value;
      if (verbosity < 2 && item.suggestions.size > 0 && words[first].length - deletedItem.length > suggestion.length - deletedItem.length) {
        item.suggestions = /* @__PURE__ */ new Set();
        item.count = 0;
      }
      if (verbosity === 2 || !item.suggestions.size || words[first].length - deletedItem.length >= suggestion.length - deletedItem.length) {
        item.suggestions.add(int);
      }
    }
    function damerauLevenshtein(source, target) {
      var m = source.length, n = target.length, H = [[]], INF = m + n, sd = /* @__PURE__ */ new Map(), i, l, j;
      H[0][0] = INF;
      for (i = 0; i <= m; i++) {
        if (!H[i + 1])
          H[i + 1] = [];
        H[i + 1][1] = i;
        H[i + 1][0] = INF;
      }
      for (j = 0; j <= n; j++) {
        H[1][j + 1] = j;
        H[0][j + 1] = INF;
      }
      var st = source + target, letter;
      for (i = 0, l = st.length; i < l; i++) {
        letter = st[i];
        if (!sd.has(letter))
          sd.set(letter, 0);
      }
      for (i = 1; i <= m; i++) {
        var DB = 0;
        for (j = 1; j <= n; j++) {
          var i1 = sd.get(target[j - 1]), j1 = DB;
          if (source[i - 1] === target[j - 1]) {
            H[i + 1][j + 1] = H[i][j];
            DB = j;
          } else {
            H[i + 1][j + 1] = Math.min(
              H[i][j],
              H[i + 1][j],
              H[i][j + 1]
            ) + 1;
          }
          H[i + 1][j + 1] = Math.min(
            H[i + 1][j + 1],
            H[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1)
          );
        }
        sd.set(source[i - 1], i);
      }
      return H[m + 1][n + 1];
    }
    function lookup(dictionary, words, verbosity, maxDistance, maxLength, input) {
      var length = input.length;
      if (length - maxDistance > maxLength)
        return [];
      var candidates = [input], candidateSet = /* @__PURE__ */ new Set(), suggestionSet = /* @__PURE__ */ new Set();
      var suggestions = [], candidate, item;
      while (candidates.length > 0) {
        candidate = candidates.shift();
        if (verbosity < 2 && suggestions.length > 0 && length - candidate.length > suggestions[0].distance)
          break;
        item = dictionary[candidate];
        if (item !== void 0) {
          if (typeof item === "number")
            item = createDictionaryItem(item);
          if (item.count > 0 && !suggestionSet.has(candidate)) {
            suggestionSet.add(candidate);
            var suggestItem = createSuggestionItem(
              candidate,
              length - candidate.length,
              item.count
            );
            suggestions.push(suggestItem);
            if (verbosity < 2 && length - candidate.length === 0)
              break;
          }
          item.suggestions.forEach((index2) => {
            var suggestion = words[index2];
            if (suggestionSet.has(suggestion))
              return;
            suggestionSet.add(suggestion);
            var distance = 0;
            if (input !== suggestion) {
              if (suggestion.length === candidate.length) {
                distance = length - candidate.length;
              } else if (length === candidate.length) {
                distance = suggestion.length - candidate.length;
              } else {
                var ii = 0, jj = 0;
                var l2 = suggestion.length;
                while (ii < l2 && ii < length && suggestion[ii] === input[ii]) {
                  ii++;
                }
                while (jj < l2 - ii && jj < length && suggestion[l2 - jj - 1] === input[length - jj - 1]) {
                  jj++;
                }
                if (ii > 0 || jj > 0) {
                  distance = damerauLevenshtein(
                    suggestion.substr(ii, l2 - ii - jj),
                    input.substr(ii, length - ii - jj)
                  );
                } else {
                  distance = damerauLevenshtein(suggestion, input);
                }
              }
            }
            if (verbosity < 2 && suggestions.length > 0 && suggestions[0].distance > distance) {
              suggestions = [];
            }
            if (verbosity < 2 && suggestions.length > 0 && distance > suggestions[0].distance) {
              return;
            }
            if (distance <= maxDistance) {
              var target = dictionary[suggestion];
              if (target !== void 0) {
                suggestions.push(createSuggestionItem(
                  suggestion,
                  distance,
                  target.count
                ));
              }
            }
          });
        }
        if (length - candidate.length < maxDistance) {
          if (verbosity < 2 && suggestions.length > 0 && length - candidate.length >= suggestions[0].distance)
            continue;
          for (var i = 0, l = candidate.length; i < l; i++) {
            var deletedItem = candidate.substring(0, i) + candidate.substring(i + 1);
            if (!candidateSet.has(deletedItem)) {
              candidateSet.add(deletedItem);
              candidates.push(deletedItem);
            }
          }
        }
      }
      if (verbosity === 0)
        return suggestions.slice(0, 1);
      return suggestions;
    }
    function SymSpell(options2) {
      options2 = options2 || {};
      this.clear();
      this.maxDistance = typeof options2.maxDistance === "number" ? options2.maxDistance : DEFAULT_MAX_DISTANCE;
      this.verbosity = typeof options2.verbosity === "number" ? options2.verbosity : DEFAULT_VERBOSITY;
      if (typeof this.maxDistance !== "number" || this.maxDistance <= 0)
        throw Error("mnemonist/SymSpell.constructor: invalid `maxDistance` option. Should be a integer greater than 0.");
      if (!VERBOSITY.has(this.verbosity))
        throw Error("mnemonist/SymSpell.constructor: invalid `verbosity` option. Should be either 0, 1 or 2.");
    }
    SymSpell.prototype.clear = function() {
      this.size = 0;
      this.dictionary = /* @__PURE__ */ Object.create(null);
      this.maxLength = 0;
      this.words = [];
    };
    SymSpell.prototype.add = function(word) {
      var item = this.dictionary[word];
      if (item !== void 0) {
        if (typeof item === "number") {
          item = createDictionaryItem(item);
          this.dictionary[word] = item;
        }
        item.count++;
      } else {
        item = createDictionaryItem();
        item.count++;
        this.dictionary[word] = item;
        if (word.length > this.maxLength)
          this.maxLength = word.length;
      }
      if (item.count === 1) {
        var number = this.words.length;
        this.words.push(word);
        var deletes = edits(word, 0, this.maxDistance);
        deletes.forEach((deletedItem) => {
          var target = this.dictionary[deletedItem];
          if (target !== void 0) {
            if (typeof target === "number") {
              target = createDictionaryItem(target);
              this.dictionary[deletedItem] = target;
            }
            if (!target.suggestions.has(number)) {
              addLowestDistance(
                this.words,
                this.verbosity,
                target,
                word,
                number,
                deletedItem
              );
            }
          } else {
            this.dictionary[deletedItem] = number;
          }
        });
      }
      this.size++;
      return this;
    };
    SymSpell.prototype.search = function(input) {
      return lookup(
        this.dictionary,
        this.words,
        this.verbosity,
        this.maxDistance,
        this.maxLength,
        input
      );
    };
    SymSpell.prototype.inspect = function() {
      var array = [];
      array.size = this.size;
      array.maxDistance = this.maxDistance;
      array.verbosity = this.verbosity;
      array.behavior = VERBOSITY_EXPLANATIONS[this.verbosity];
      for (var k in this.dictionary) {
        if (typeof this.dictionary[k] === "object" && this.dictionary[k].count)
          array.push([k, this.dictionary[k].count]);
      }
      Object.defineProperty(array, "constructor", {
        value: SymSpell,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      SymSpell.prototype[Symbol.for("nodejs.util.inspect.custom")] = SymSpell.prototype.inspect;
    SymSpell.from = function(iterable, options2) {
      var index2 = new SymSpell(options2);
      forEach(iterable, function(value) {
        index2.add(value);
      });
      return index2;
    };
    module.exports = SymSpell;
  }
});

// node_modules/mnemonist/trie-map.js
var require_trie_map = __commonJS({
  "node_modules/mnemonist/trie-map.js"(exports, module) {
    var forEach = require_foreach();
    var Iterator = require_iterator();
    var SENTINEL = String.fromCharCode(0);
    function TrieMap(Token) {
      this.mode = Token === Array ? "array" : "string";
      this.clear();
    }
    TrieMap.prototype.clear = function() {
      this.root = {};
      this.size = 0;
    };
    TrieMap.prototype.set = function(prefix, value) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = value;
      return this;
    };
    TrieMap.prototype.update = function(prefix, updateFunction) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = updateFunction(node[SENTINEL]);
      return this;
    };
    TrieMap.prototype.get = function(prefix) {
      var node = this.root, token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return;
      }
      if (!(SENTINEL in node))
        return;
      return node[SENTINEL];
    };
    TrieMap.prototype.delete = function(prefix) {
      var node = this.root, toPrune = null, tokenToPrune = null, parent, token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        parent = node;
        node = node[token];
        if (typeof node === "undefined")
          return false;
        if (toPrune !== null) {
          if (Object.keys(node).length > 1) {
            toPrune = null;
            tokenToPrune = null;
          }
        } else {
          if (Object.keys(node).length < 2) {
            toPrune = parent;
            tokenToPrune = token;
          }
        }
      }
      if (!(SENTINEL in node))
        return false;
      this.size--;
      if (toPrune)
        delete toPrune[tokenToPrune];
      else
        delete node[SENTINEL];
      return true;
    };
    TrieMap.prototype.has = function(prefix) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return false;
      }
      return SENTINEL in node;
    };
    TrieMap.prototype.find = function(prefix) {
      var isString = typeof prefix === "string";
      var node = this.root, matches = [], token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return matches;
      }
      var nodeStack = [node], prefixStack = [prefix], k;
      while (nodeStack.length) {
        prefix = prefixStack.pop();
        node = nodeStack.pop();
        for (k in node) {
          if (k === SENTINEL) {
            matches.push([prefix, node[SENTINEL]]);
            continue;
          }
          nodeStack.push(node[k]);
          prefixStack.push(isString ? prefix + k : prefix.concat(k));
        }
      }
      return matches;
    };
    TrieMap.prototype.values = function(prefix) {
      var node = this.root, nodeStack = [], token, i, l;
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      }
      nodeStack.push(node);
      return new Iterator(function() {
        var currentNode, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
          }
          if (hasValue)
            return { done: false, value: currentNode[SENTINEL] };
        }
        return { done: true };
      });
    };
    TrieMap.prototype.prefixes = function(prefix) {
      var node = this.root, nodeStack = [], prefixStack = [], token, i, l;
      var isString = this.mode === "string";
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      } else {
        prefix = isString ? "" : [];
      }
      nodeStack.push(node);
      prefixStack.push(prefix);
      return new Iterator(function() {
        var currentNode, currentPrefix, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          currentPrefix = prefixStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
            prefixStack.push(isString ? currentPrefix + k : currentPrefix.concat(k));
          }
          if (hasValue)
            return { done: false, value: currentPrefix };
        }
        return { done: true };
      });
    };
    TrieMap.prototype.keys = TrieMap.prototype.prefixes;
    TrieMap.prototype.entries = function(prefix) {
      var node = this.root, nodeStack = [], prefixStack = [], token, i, l;
      var isString = this.mode === "string";
      if (prefix) {
        for (i = 0, l = prefix.length; i < l; i++) {
          token = prefix[i];
          node = node[token];
          if (typeof node === "undefined")
            return Iterator.empty();
        }
      } else {
        prefix = isString ? "" : [];
      }
      nodeStack.push(node);
      prefixStack.push(prefix);
      return new Iterator(function() {
        var currentNode, currentPrefix, hasValue = false, k;
        while (nodeStack.length) {
          currentNode = nodeStack.pop();
          currentPrefix = prefixStack.pop();
          for (k in currentNode) {
            if (k === SENTINEL) {
              hasValue = true;
              continue;
            }
            nodeStack.push(currentNode[k]);
            prefixStack.push(isString ? currentPrefix + k : currentPrefix.concat(k));
          }
          if (hasValue)
            return { done: false, value: [currentPrefix, currentNode[SENTINEL]] };
        }
        return { done: true };
      });
    };
    if (typeof Symbol !== "undefined")
      TrieMap.prototype[Symbol.iterator] = TrieMap.prototype.entries;
    TrieMap.prototype.inspect = function() {
      var proxy = new Array(this.size);
      var iterator = this.entries(), step, i = 0;
      while (step = iterator.next(), !step.done)
        proxy[i++] = step.value;
      Object.defineProperty(proxy, "constructor", {
        value: TrieMap,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      TrieMap.prototype[Symbol.for("nodejs.util.inspect.custom")] = TrieMap.prototype.inspect;
    TrieMap.prototype.toJSON = function() {
      return this.root;
    };
    TrieMap.from = function(iterable) {
      var trie = new TrieMap();
      forEach(iterable, function(value, key) {
        trie.set(key, value);
      });
      return trie;
    };
    TrieMap.SENTINEL = SENTINEL;
    module.exports = TrieMap;
  }
});

// node_modules/mnemonist/trie.js
var require_trie = __commonJS({
  "node_modules/mnemonist/trie.js"(exports, module) {
    var forEach = require_foreach();
    var TrieMap = require_trie_map();
    var SENTINEL = String.fromCharCode(0);
    function Trie(Token) {
      this.mode = Token === Array ? "array" : "string";
      this.clear();
    }
    for (methodName in TrieMap.prototype)
      Trie.prototype[methodName] = TrieMap.prototype[methodName];
    var methodName;
    delete Trie.prototype.set;
    delete Trie.prototype.get;
    delete Trie.prototype.values;
    delete Trie.prototype.entries;
    Trie.prototype.add = function(prefix) {
      var node = this.root, token;
      for (var i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token] || (node[token] = {});
      }
      if (!(SENTINEL in node))
        this.size++;
      node[SENTINEL] = true;
      return this;
    };
    Trie.prototype.find = function(prefix) {
      var isString = typeof prefix === "string";
      var node = this.root, matches = [], token, i, l;
      for (i = 0, l = prefix.length; i < l; i++) {
        token = prefix[i];
        node = node[token];
        if (typeof node === "undefined")
          return matches;
      }
      var nodeStack = [node], prefixStack = [prefix], k;
      while (nodeStack.length) {
        prefix = prefixStack.pop();
        node = nodeStack.pop();
        for (k in node) {
          if (k === SENTINEL) {
            matches.push(prefix);
            continue;
          }
          nodeStack.push(node[k]);
          prefixStack.push(isString ? prefix + k : prefix.concat(k));
        }
      }
      return matches;
    };
    if (typeof Symbol !== "undefined")
      Trie.prototype[Symbol.iterator] = Trie.prototype.keys;
    Trie.prototype.inspect = function() {
      var proxy = /* @__PURE__ */ new Set();
      var iterator = this.keys(), step;
      while (step = iterator.next(), !step.done)
        proxy.add(step.value);
      Object.defineProperty(proxy, "constructor", {
        value: Trie,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Trie.prototype[Symbol.for("nodejs.util.inspect.custom")] = Trie.prototype.inspect;
    Trie.prototype.toJSON = function() {
      return this.root;
    };
    Trie.from = function(iterable) {
      var trie = new Trie();
      forEach(iterable, function(value) {
        trie.add(value);
      });
      return trie;
    };
    Trie.SENTINEL = SENTINEL;
    module.exports = Trie;
  }
});

// node_modules/mnemonist/vector.js
var require_vector = __commonJS({
  "node_modules/mnemonist/vector.js"(exports, module) {
    var Iterator = require_iterator();
    var forEach = require_foreach();
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var DEFAULT_GROWING_POLICY = function(currentCapacity) {
      return Math.max(1, Math.ceil(currentCapacity * 1.5));
    };
    var pointerArrayFactory = function(capacity) {
      var PointerArray = typed.getPointerArray(capacity);
      return new PointerArray(capacity);
    };
    function Vector(ArrayClass, initialCapacityOrOptions) {
      if (arguments.length < 1)
        throw new Error("mnemonist/vector: expecting at least a byte array constructor.");
      var initialCapacity = initialCapacityOrOptions || 0, policy = DEFAULT_GROWING_POLICY, initialLength = 0, factory = false;
      if (typeof initialCapacityOrOptions === "object") {
        initialCapacity = initialCapacityOrOptions.initialCapacity || 0;
        initialLength = initialCapacityOrOptions.initialLength || 0;
        policy = initialCapacityOrOptions.policy || policy;
        factory = initialCapacityOrOptions.factory === true;
      }
      this.factory = factory ? ArrayClass : null;
      this.ArrayClass = ArrayClass;
      this.length = initialLength;
      this.capacity = Math.max(initialLength, initialCapacity);
      this.policy = policy;
      this.array = new ArrayClass(this.capacity);
    }
    Vector.prototype.set = function(index2, value) {
      if (this.length < index2)
        throw new Error("Vector(" + this.ArrayClass.name + ").set: index out of bounds.");
      this.array[index2] = value;
      return this;
    };
    Vector.prototype.get = function(index2) {
      if (this.length < index2)
        return void 0;
      return this.array[index2];
    };
    Vector.prototype.applyPolicy = function(override) {
      var newCapacity = this.policy(override || this.capacity);
      if (typeof newCapacity !== "number" || newCapacity < 0)
        throw new Error("mnemonist/vector.applyPolicy: policy returned an invalid value (expecting a positive integer).");
      if (newCapacity <= this.capacity)
        throw new Error("mnemonist/vector.applyPolicy: policy returned a less or equal capacity to allocate.");
      return newCapacity;
    };
    Vector.prototype.reallocate = function(capacity) {
      if (capacity === this.capacity)
        return this;
      var oldArray = this.array;
      if (capacity < this.length)
        this.length = capacity;
      if (capacity > this.capacity) {
        if (this.factory === null)
          this.array = new this.ArrayClass(capacity);
        else
          this.array = this.factory(capacity);
        if (typed.isTypedArray(this.array)) {
          this.array.set(oldArray, 0);
        } else {
          for (var i = 0, l = this.length; i < l; i++)
            this.array[i] = oldArray[i];
        }
      } else {
        this.array = oldArray.slice(0, capacity);
      }
      this.capacity = capacity;
      return this;
    };
    Vector.prototype.grow = function(capacity) {
      var newCapacity;
      if (typeof capacity === "number") {
        if (this.capacity >= capacity)
          return this;
        newCapacity = this.capacity;
        while (newCapacity < capacity)
          newCapacity = this.applyPolicy(newCapacity);
        this.reallocate(newCapacity);
        return this;
      }
      newCapacity = this.applyPolicy();
      this.reallocate(newCapacity);
      return this;
    };
    Vector.prototype.resize = function(length) {
      if (length === this.length)
        return this;
      if (length < this.length) {
        this.length = length;
        return this;
      }
      this.length = length;
      this.reallocate(length);
      return this;
    };
    Vector.prototype.push = function(value) {
      if (this.capacity === this.length)
        this.grow();
      this.array[this.length++] = value;
      return this.length;
    };
    Vector.prototype.pop = function() {
      if (this.length === 0)
        return;
      return this.array[--this.length];
    };
    Vector.prototype.values = function() {
      var items = this.array, l = this.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[i];
        i++;
        return {
          value,
          done: false
        };
      });
    };
    Vector.prototype.entries = function() {
      var items = this.array, l = this.length, i = 0;
      return new Iterator(function() {
        if (i >= l)
          return {
            done: true
          };
        var value = items[i];
        return {
          value: [i++, value],
          done: false
        };
      });
    };
    if (typeof Symbol !== "undefined")
      Vector.prototype[Symbol.iterator] = Vector.prototype.values;
    Vector.prototype.inspect = function() {
      var proxy = this.array.slice(0, this.length);
      proxy.type = this.array.constructor.name;
      proxy.items = this.length;
      proxy.capacity = this.capacity;
      Object.defineProperty(proxy, "constructor", {
        value: Vector,
        enumerable: false
      });
      return proxy;
    };
    if (typeof Symbol !== "undefined")
      Vector.prototype[Symbol.for("nodejs.util.inspect.custom")] = Vector.prototype.inspect;
    Vector.from = function(iterable, ArrayClass, capacity) {
      if (arguments.length < 3) {
        capacity = iterables.guessLength(iterable);
        if (typeof capacity !== "number")
          throw new Error("mnemonist/vector.from: could not guess iterable length. Please provide desired capacity as last argument.");
      }
      var vector = new Vector(ArrayClass, capacity);
      forEach(iterable, function(value) {
        vector.push(value);
      });
      return vector;
    };
    function subClass(ArrayClass) {
      var SubClass = function(initialCapacityOrOptions) {
        Vector.call(this, ArrayClass, initialCapacityOrOptions);
      };
      for (var k in Vector.prototype) {
        if (Vector.prototype.hasOwnProperty(k))
          SubClass.prototype[k] = Vector.prototype[k];
      }
      SubClass.from = function(iterable, capacity) {
        return Vector.from(iterable, ArrayClass, capacity);
      };
      if (typeof Symbol !== "undefined")
        SubClass.prototype[Symbol.iterator] = SubClass.prototype.values;
      return SubClass;
    }
    Vector.Int8Vector = subClass(Int8Array);
    Vector.Uint8Vector = subClass(Uint8Array);
    Vector.Uint8ClampedVector = subClass(Uint8ClampedArray);
    Vector.Int16Vector = subClass(Int16Array);
    Vector.Uint16Vector = subClass(Uint16Array);
    Vector.Int32Vector = subClass(Int32Array);
    Vector.Uint32Vector = subClass(Uint32Array);
    Vector.Float32Vector = subClass(Float32Array);
    Vector.Float64Vector = subClass(Float64Array);
    Vector.PointerVector = subClass(pointerArrayFactory);
    module.exports = Vector;
  }
});

// node_modules/mnemonist/vp-tree.js
var require_vp_tree = __commonJS({
  "node_modules/mnemonist/vp-tree.js"(exports, module) {
    var iterables = require_iterables();
    var typed = require_typed_arrays();
    var inplaceQuickSortIndices = require_quick().inplaceQuickSortIndices;
    var lowerBoundIndices = require_binary_search().lowerBoundIndices;
    var Heap = require_heap();
    var getPointerArray = typed.getPointerArray;
    function comparator(a, b) {
      if (a.distance < b.distance)
        return 1;
      if (a.distance > b.distance)
        return -1;
      return 0;
    }
    function createBinaryTree(distance, items, indices) {
      var N = indices.length;
      var PointerArray = getPointerArray(N);
      var C = 0, nodes = new PointerArray(N), lefts = new PointerArray(N), rights = new PointerArray(N), mus = new Float64Array(N), stack = [0, 0, N], distances = new Float64Array(N), nodeIndex, vantagePoint, medianIndex, lo, hi, mid, mu, i, l;
      while (stack.length) {
        hi = stack.pop();
        lo = stack.pop();
        nodeIndex = stack.pop();
        vantagePoint = indices[hi - 1];
        hi--;
        l = hi - lo;
        nodes[nodeIndex] = vantagePoint;
        if (l === 0)
          continue;
        if (l === 1) {
          mu = distance(items[vantagePoint], items[indices[lo]]);
          mus[nodeIndex] = mu;
          C++;
          rights[nodeIndex] = C;
          nodes[C] = indices[lo];
          continue;
        }
        for (i = lo; i < hi; i++)
          distances[indices[i]] = distance(items[vantagePoint], items[indices[i]]);
        inplaceQuickSortIndices(distances, indices, lo, hi);
        medianIndex = lo + l / 2 - 1;
        if (medianIndex === (medianIndex | 0)) {
          mu = (distances[indices[medianIndex]] + distances[indices[medianIndex + 1]]) / 2;
        } else {
          mu = distances[indices[Math.ceil(medianIndex)]];
        }
        mus[nodeIndex] = mu;
        mid = lowerBoundIndices(distances, indices, mu, lo, hi);
        if (hi - mid > 0) {
          C++;
          rights[nodeIndex] = C;
          stack.push(C, mid, hi);
        }
        if (mid - lo > 0) {
          C++;
          lefts[nodeIndex] = C;
          stack.push(C, lo, mid);
        }
      }
      return {
        nodes,
        lefts,
        rights,
        mus
      };
    }
    function VPTree(distance, items) {
      if (typeof distance !== "function")
        throw new Error("mnemonist/VPTree.constructor: given `distance` must be a function.");
      if (!items)
        throw new Error("mnemonist/VPTree.constructor: you must provide items to the tree. A VPTree cannot be updated after its creation.");
      this.distance = distance;
      this.heap = new Heap(comparator);
      this.D = 0;
      var arrays = iterables.toArrayWithIndices(items);
      this.items = arrays[0];
      var indices = arrays[1];
      this.size = indices.length;
      var result = createBinaryTree(distance, this.items, indices);
      this.nodes = result.nodes;
      this.lefts = result.lefts;
      this.rights = result.rights;
      this.mus = result.mus;
    }
    VPTree.prototype.nearestNeighbors = function(k, query) {
      var neighbors = this.heap, stack = [0], tau = Infinity, nodeIndex, itemIndex, vantagePoint, leftIndex, rightIndex, mu, d;
      this.D = 0;
      while (stack.length) {
        nodeIndex = stack.pop();
        itemIndex = this.nodes[nodeIndex];
        vantagePoint = this.items[itemIndex];
        d = this.distance(vantagePoint, query);
        this.D++;
        if (d < tau) {
          neighbors.push({ distance: d, item: vantagePoint });
          if (neighbors.size > k)
            neighbors.pop();
          if (neighbors.size >= k)
            tau = neighbors.peek().distance;
        }
        leftIndex = this.lefts[nodeIndex];
        rightIndex = this.rights[nodeIndex];
        if (!leftIndex && !rightIndex)
          continue;
        mu = this.mus[nodeIndex];
        if (d < mu) {
          if (leftIndex && d < mu + tau)
            stack.push(leftIndex);
          if (rightIndex && d >= mu - tau)
            stack.push(rightIndex);
        } else {
          if (rightIndex && d >= mu - tau)
            stack.push(rightIndex);
          if (leftIndex && d < mu + tau)
            stack.push(leftIndex);
        }
      }
      var array = new Array(neighbors.size);
      for (var i = neighbors.size - 1; i >= 0; i--)
        array[i] = neighbors.pop();
      return array;
    };
    VPTree.prototype.neighbors = function(radius, query) {
      var neighbors = [], stack = [0], nodeIndex, itemIndex, vantagePoint, leftIndex, rightIndex, mu, d;
      this.D = 0;
      while (stack.length) {
        nodeIndex = stack.pop();
        itemIndex = this.nodes[nodeIndex];
        vantagePoint = this.items[itemIndex];
        d = this.distance(vantagePoint, query);
        this.D++;
        if (d <= radius)
          neighbors.push({ distance: d, item: vantagePoint });
        leftIndex = this.lefts[nodeIndex];
        rightIndex = this.rights[nodeIndex];
        if (!leftIndex && !rightIndex)
          continue;
        mu = this.mus[nodeIndex];
        if (d < mu) {
          if (leftIndex && d < mu + radius)
            stack.push(leftIndex);
          if (rightIndex && d >= mu - radius)
            stack.push(rightIndex);
        } else {
          if (rightIndex && d >= mu - radius)
            stack.push(rightIndex);
          if (leftIndex && d < mu + radius)
            stack.push(leftIndex);
        }
      }
      return neighbors;
    };
    VPTree.prototype.inspect = function() {
      var array = this.items.slice();
      Object.defineProperty(array, "constructor", {
        value: VPTree,
        enumerable: false
      });
      return array;
    };
    if (typeof Symbol !== "undefined")
      VPTree.prototype[Symbol.for("nodejs.util.inspect.custom")] = VPTree.prototype.inspect;
    VPTree.from = function(iterable, distance) {
      return new VPTree(distance, iterable);
    };
    module.exports = VPTree;
  }
});

// node_modules/mnemonist/index.js
var require_mnemonist = __commonJS({
  "node_modules/mnemonist/index.js"(exports, module) {
    var Heap = require_heap();
    var FibonacciHeap = require_fibonacci_heap();
    var SuffixArray = require_suffix_array();
    module.exports = {
      BiMap: require_bi_map(),
      BitSet: require_bit_set(),
      BitVector: require_bit_vector(),
      BloomFilter: require_bloom_filter(),
      BKTree: require_bk_tree(),
      CircularBuffer: require_circular_buffer(),
      DefaultMap: require_default_map(),
      DefaultWeakMap: require_default_weak_map(),
      FixedDeque: require_fixed_deque(),
      StaticDisjointSet: require_static_disjoint_set(),
      FibonacciHeap,
      MinFibonacciHeap: FibonacciHeap.MinFibonacciHeap,
      MaxFibonacciHeap: FibonacciHeap.MaxFibonacciHeap,
      FixedReverseHeap: require_fixed_reverse_heap(),
      FuzzyMap: require_fuzzy_map(),
      FuzzyMultiMap: require_fuzzy_multi_map(),
      HashedArrayTree: require_hashed_array_tree(),
      Heap,
      MinHeap: Heap.MinHeap,
      MaxHeap: Heap.MaxHeap,
      StaticIntervalTree: require_static_interval_tree(),
      InvertedIndex: require_inverted_index(),
      KDTree: require_kd_tree(),
      LinkedList: require_linked_list(),
      LRUCache: require_lru_cache(),
      LRUCacheWithDelete: require_lru_cache_with_delete(),
      LRUMap: require_lru_map(),
      LRUMapWithDelete: require_lru_map_with_delete(),
      MultiMap: require_multi_map(),
      MultiSet: require_multi_set(),
      PassjoinIndex: require_passjoin_index(),
      Queue: require_queue(),
      FixedStack: require_fixed_stack(),
      Stack: require_stack(),
      SuffixArray,
      GeneralizedSuffixArray: SuffixArray.GeneralizedSuffixArray,
      Set: require_set(),
      SparseQueueSet: require_sparse_queue_set(),
      SparseMap: require_sparse_map(),
      SparseSet: require_sparse_set(),
      SymSpell: require_symspell(),
      Trie: require_trie(),
      TrieMap: require_trie_map(),
      Vector: require_vector(),
      VPTree: require_vp_tree()
    };
  }
});

// node_modules/fast-copy/dist/esm/index.mjs
var toStringFunction = Function.prototype.toString;
var create = Object.create;
var toStringObject = Object.prototype.toString;
var LegacyCache = (
  /** @class */
  function() {
    function LegacyCache2() {
      this._keys = [];
      this._values = [];
    }
    LegacyCache2.prototype.has = function(key) {
      return !!~this._keys.indexOf(key);
    };
    LegacyCache2.prototype.get = function(key) {
      return this._values[this._keys.indexOf(key)];
    };
    LegacyCache2.prototype.set = function(key, value) {
      this._keys.push(key);
      this._values.push(value);
    };
    return LegacyCache2;
  }()
);
function createCacheLegacy() {
  return new LegacyCache();
}
function createCacheModern() {
  return /* @__PURE__ */ new WeakMap();
}
var createCache = typeof WeakMap !== "undefined" ? createCacheModern : createCacheLegacy;
function getCleanClone(prototype) {
  if (!prototype) {
    return create(null);
  }
  var Constructor = prototype.constructor;
  if (Constructor === Object) {
    return prototype === Object.prototype ? {} : create(prototype);
  }
  if (~toStringFunction.call(Constructor).indexOf("[native code]")) {
    try {
      return new Constructor();
    } catch (_a2) {
    }
  }
  return create(prototype);
}
function getRegExpFlagsLegacy(regExp) {
  var flags = "";
  if (regExp.global) {
    flags += "g";
  }
  if (regExp.ignoreCase) {
    flags += "i";
  }
  if (regExp.multiline) {
    flags += "m";
  }
  if (regExp.unicode) {
    flags += "u";
  }
  if (regExp.sticky) {
    flags += "y";
  }
  return flags;
}
function getRegExpFlagsModern(regExp) {
  return regExp.flags;
}
var getRegExpFlags = /test/g.flags === "g" ? getRegExpFlagsModern : getRegExpFlagsLegacy;
function getTagLegacy(value) {
  var type = toStringObject.call(value);
  return type.substring(8, type.length - 1);
}
function getTagModern(value) {
  return value[Symbol.toStringTag] || getTagLegacy(value);
}
var getTag = typeof Symbol !== "undefined" ? getTagModern : getTagLegacy;
var defineProperty = Object.defineProperty;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var _a = Object.prototype;
var hasOwnProperty = _a.hasOwnProperty;
var propertyIsEnumerable = _a.propertyIsEnumerable;
var SUPPORTS_SYMBOL = typeof getOwnPropertySymbols === "function";
function getStrictPropertiesModern(object) {
  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
}
var getStrictProperties = SUPPORTS_SYMBOL ? getStrictPropertiesModern : getOwnPropertyNames;
function copyOwnPropertiesStrict(value, clone, state) {
  var properties = getStrictProperties(value);
  for (var index2 = 0, length_1 = properties.length, property = void 0, descriptor = void 0; index2 < length_1; ++index2) {
    property = properties[index2];
    if (property === "callee" || property === "caller") {
      continue;
    }
    descriptor = getOwnPropertyDescriptor(value, property);
    if (!descriptor) {
      clone[property] = state.copier(value[property], state);
      continue;
    }
    if (!descriptor.get && !descriptor.set) {
      descriptor.value = state.copier(descriptor.value, state);
    }
    try {
      defineProperty(clone, property, descriptor);
    } catch (error) {
      clone[property] = descriptor.value;
    }
  }
  return clone;
}
function copyArrayLoose(array, state) {
  var clone = new state.Constructor();
  state.cache.set(array, clone);
  for (var index2 = 0, length_2 = array.length; index2 < length_2; ++index2) {
    clone[index2] = state.copier(array[index2], state);
  }
  return clone;
}
function copyArrayStrict(array, state) {
  var clone = new state.Constructor();
  state.cache.set(array, clone);
  return copyOwnPropertiesStrict(array, clone, state);
}
function copyArrayBuffer(arrayBuffer, _state) {
  return arrayBuffer.slice(0);
}
function copyBlob(blob, _state) {
  return blob.slice(0, blob.size, blob.type);
}
function copyDataView(dataView, state) {
  return new state.Constructor(copyArrayBuffer(dataView.buffer));
}
function copyDate(date, state) {
  return new state.Constructor(date.getTime());
}
function copyMapLoose(map, state) {
  var clone = new state.Constructor();
  state.cache.set(map, clone);
  map.forEach(function(value, key) {
    clone.set(key, state.copier(value, state));
  });
  return clone;
}
function copyMapStrict(map, state) {
  return copyOwnPropertiesStrict(map, copyMapLoose(map, state), state);
}
function copyObjectLooseLegacy(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      clone[key] = state.copier(object[key], state);
    }
  }
  return clone;
}
function copyObjectLooseModern(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  for (var key in object) {
    if (hasOwnProperty.call(object, key)) {
      clone[key] = state.copier(object[key], state);
    }
  }
  var symbols = getOwnPropertySymbols(object);
  for (var index2 = 0, length_3 = symbols.length, symbol = void 0; index2 < length_3; ++index2) {
    symbol = symbols[index2];
    if (propertyIsEnumerable.call(object, symbol)) {
      clone[symbol] = state.copier(object[symbol], state);
    }
  }
  return clone;
}
var copyObjectLoose = SUPPORTS_SYMBOL ? copyObjectLooseModern : copyObjectLooseLegacy;
function copyObjectStrict(object, state) {
  var clone = getCleanClone(state.prototype);
  state.cache.set(object, clone);
  return copyOwnPropertiesStrict(object, clone, state);
}
function copyPrimitiveWrapper(primitiveObject, state) {
  return new state.Constructor(primitiveObject.valueOf());
}
function copyRegExp(regExp, state) {
  var clone = new state.Constructor(regExp.source, getRegExpFlags(regExp));
  clone.lastIndex = regExp.lastIndex;
  return clone;
}
function copySelf(value, _state) {
  return value;
}
function copySetLoose(set, state) {
  var clone = new state.Constructor();
  state.cache.set(set, clone);
  set.forEach(function(value) {
    clone.add(state.copier(value, state));
  });
  return clone;
}
function copySetStrict(set, state) {
  return copyOwnPropertiesStrict(set, copySetLoose(set, state), state);
}
var isArray = Array.isArray;
var assign = Object.assign;
var getPrototypeOf = Object.getPrototypeOf || function(obj) {
  return obj.__proto__;
};
var DEFAULT_LOOSE_OPTIONS = {
  array: copyArrayLoose,
  arrayBuffer: copyArrayBuffer,
  blob: copyBlob,
  dataView: copyDataView,
  date: copyDate,
  error: copySelf,
  map: copyMapLoose,
  object: copyObjectLoose,
  regExp: copyRegExp,
  set: copySetLoose
};
var DEFAULT_STRICT_OPTIONS = assign({}, DEFAULT_LOOSE_OPTIONS, {
  array: copyArrayStrict,
  map: copyMapStrict,
  object: copyObjectStrict,
  set: copySetStrict
});
function getTagSpecificCopiers(options2) {
  return {
    Arguments: options2.object,
    Array: options2.array,
    ArrayBuffer: options2.arrayBuffer,
    Blob: options2.blob,
    Boolean: copyPrimitiveWrapper,
    DataView: options2.dataView,
    Date: options2.date,
    Error: options2.error,
    Float32Array: options2.arrayBuffer,
    Float64Array: options2.arrayBuffer,
    Int8Array: options2.arrayBuffer,
    Int16Array: options2.arrayBuffer,
    Int32Array: options2.arrayBuffer,
    Map: options2.map,
    Number: copyPrimitiveWrapper,
    Object: options2.object,
    Promise: copySelf,
    RegExp: options2.regExp,
    Set: options2.set,
    String: copyPrimitiveWrapper,
    WeakMap: copySelf,
    WeakSet: copySelf,
    Uint8Array: options2.arrayBuffer,
    Uint8ClampedArray: options2.arrayBuffer,
    Uint16Array: options2.arrayBuffer,
    Uint32Array: options2.arrayBuffer,
    Uint64Array: options2.arrayBuffer
  };
}
function createCopier(options2) {
  var normalizedOptions = assign({}, DEFAULT_LOOSE_OPTIONS, options2);
  var tagSpecificCopiers = getTagSpecificCopiers(normalizedOptions);
  var array = tagSpecificCopiers.Array, object = tagSpecificCopiers.Object;
  function copier(value, state) {
    state.prototype = state.Constructor = void 0;
    if (!value || typeof value !== "object") {
      return value;
    }
    if (state.cache.has(value)) {
      return state.cache.get(value);
    }
    state.prototype = getPrototypeOf(value);
    state.Constructor = state.prototype && state.prototype.constructor;
    if (!state.Constructor || state.Constructor === Object) {
      return object(value, state);
    }
    if (isArray(value)) {
      return array(value, state);
    }
    var tagSpecificCopier = tagSpecificCopiers[getTag(value)];
    if (tagSpecificCopier) {
      return tagSpecificCopier(value, state);
    }
    return typeof value.then === "function" ? value : object(value, state);
  }
  return function copy(value) {
    return copier(value, {
      Constructor: void 0,
      cache: createCache(),
      copier,
      prototype: void 0
    });
  };
}
function createStrictCopier(options2) {
  return createCopier(assign({}, DEFAULT_STRICT_OPTIONS, options2));
}
var copyStrict = createStrictCopier({});
var index = createCopier({});

// src/util.ts
var Config = class {
  constructor() {
    this.debug = kwin.readConfig("Debug", false);
    this.useProcessWhitelist = kwin.readConfig("UseProcessWhitelist", false);
    this.filterProcessName = kwin.readConfig("FilterProcessName", "krunner, yakuake, kded, polkit, plasmashell").split(",").map((x) => x.trim());
    this.filterClientCaption = kwin.readConfig("FilterClientCaption", "").split(",").map((x) => x.trim());
    this.tilePopups = kwin.readConfig("TilePopups", false);
    this.borders = kwin.readConfig("Borders", 1 /* NoBorderTiled */);
    this.insertionPoint = kwin.readConfig("InsertionPoint", 0 /* Left */);
    this.keepTiledBelow = kwin.readConfig("KeepTiledBelow", true);
    this.defaultEngine = kwin.readConfig("DefaultEngine", 0 /* BTree */);
    this.maximizeSingle = kwin.readConfig("MaximizeSingle", false);
    this.resizeAmount = kwin.readConfig("ResizeAmount", 10);
    this.timerDelay = kwin.readConfig("TimerDelay", 10);
    this.unfullscreen = kwin.readConfig("Unfullscreen", false);
    this.rotation = kwin.readConfig("Rotation", false);
  }
};
var config;
function createConfig() {
  config = new Config();
  printDebug("Config set - " + JSON.stringify(config), false);
}
var filterProcessCache = /* @__PURE__ */ new Set();
var filterCaptionCache = /* @__PURE__ */ new Set();
function printDebug(str, isError) {
  if (isError) {
    print("Polonium ERR: " + str);
  } else if (config.debug) {
    print("Polonium DBG: " + str);
  }
}
function doTileClient(client) {
  if (client.fullScreen || !client.moveable || !client.resizeable) {
    return false;
  }
  if ((client.dialog || client.splash || client.utility || client.transient) && !config.tilePopups) {
    return false;
  }
  if (client.specialWindow) {
    return false;
  }
  const cap = client.caption;
  if (filterCaptionCache.has(cap)) {
    return false;
  }
  for (const i of config.filterClientCaption) {
    if (i !== "" && cap.includes(i)) {
      filterProcessCache.add(cap);
      return false;
    }
  }
  const proc = client.resourceClass.toString();
  if (filterProcessCache.has(proc)) {
    return config.useProcessWhitelist;
  }
  for (const i of config.filterProcessName) {
    if (i !== "" && proc.includes(i)) {
      filterProcessCache.add(proc);
      return config.useProcessWhitelist;
    }
  }
  return !config.useProcessWhitelist;
}
function clientOnDesktop(client, desktop) {
  if (client.screen != desktop.screen || client.desktop != desktop.desktop && client.desktop != -1)
    return false;
  for (let i = 0; i < client.activities.length; i += 1) {
    if (client.activities[i] == desktop.activity)
      return true;
  }
  return false;
}
var GeometryTools;
((GeometryTools2) => {
  class QPoint {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    toString() {
      return "GtQPoint(" + this.x + ", " + this.y + ")";
    }
  }
  GeometryTools2.QPoint = QPoint;
  function directionFromPointInRect(rect, point) {
    const relativePoint = new QPoint(point.x - rect.x, point.y - rect.y);
    if (relativePoint.x < rect.width / 2) {
      if (relativePoint.y < rect.height / 2) {
        if (relativePoint.x > rect.width * relativePoint.y / rect.height) {
          return new Direction(true, false, true);
        } else {
          return new Direction(true, false, false);
        }
      } else {
        if (relativePoint.x > rect.width * relativePoint.y / rect.height) {
          return new Direction(false, false, true);
        } else {
          return new Direction(false, false, false);
        }
      }
    } else {
      if (relativePoint.y < rect.height / 2) {
        if (relativePoint.x < rect.width * relativePoint.y / rect.height) {
          return new Direction(true, true, true);
        } else {
          return new Direction(true, true, false);
        }
      } else {
        if (relativePoint.x < rect.width * relativePoint.y / rect.height) {
          return new Direction(false, true, true);
        } else {
          return new Direction(false, true, false);
        }
      }
    }
  }
  GeometryTools2.directionFromPointInRect = directionFromPointInRect;
  function isPointInRect(rect, point) {
    if (point.x < rect.x)
      return false;
    if (point.y < rect.y)
      return false;
    if (point.x > rect.x + rect.width)
      return false;
    if (point.y > rect.y + rect.height)
      return false;
    return true;
  }
  GeometryTools2.isPointInRect = isPointInRect;
  function rectCenter(rect) {
    return new QPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
  }
  GeometryTools2.rectCenter = rectCenter;
  function invertDirection2(direction) {
    return new Direction(!direction.above, !direction.right, direction.primary);
  }
  GeometryTools2.invertDirection = invertDirection2;
})(GeometryTools || (GeometryTools = {}));

// src/engine/common.ts
var Direction = class {
  constructor(above, right, primary) {
    this.above = above;
    this.right = right;
    this.primary = primary;
  }
  toString() {
    return "(" + (this.above ? "above" : "below") + ", " + (this.right ? "right" : "left") + ", " + (this.primary ? "vertical" : "horizontal") + ")";
  }
};
var Settings = class {
  constructor(qmlSettings) {
    if (qmlSettings == void 0) {
      this.insertionPoint = config.insertionPoint;
      this.rotation = config.rotation;
    } else {
      this.insertionPoint = qmlSettings.insertionPoint;
      this.rotation = qmlSettings.rotation;
    }
  }
  get lastActiveClient() {
    return workspace.previousActiveClient;
  }
  toQmlSettings(engine2) {
    return {
      engine: engine2,
      insertionPoint: this.insertionPoint,
      rotation: this.rotation
    };
  }
};

// src/engine/btree.ts
var import_mnemonist = __toESM(require_mnemonist());
var TreeNode = class {
  constructor() {
    this.parent = null;
    this.sibling = null;
    this.children = null;
    this.client = null;
    // the ratio between the size of the children nodes relative to parent. >0.5 means first child is bigger, <0.5 means smaller
    this.childRatio = 0.5;
  }
  // splits tile
  split() {
    if (this.children != null)
      return;
    this.children = [new TreeNode(), new TreeNode()];
    this.children[0].parent = this;
    this.children[0].sibling = this.children[1];
    this.children[1].parent = this;
    this.children[1].sibling = this.children[0];
  }
  // removes self
  remove() {
    if (this.children != null || this.sibling == null || this.parent == null)
      return;
    if (this.sibling.children != null) {
      this.parent.children = this.sibling.children;
      for (const child of this.parent.children) {
        child.parent = this.parent;
      }
    } else {
      this.parent.client = this.sibling.client;
      this.parent.children = null;
    }
    this.parent = null;
    this.sibling.parent = null;
    this.sibling.sibling = null;
    this.sibling = null;
  }
};
var RootNode = class extends TreeNode {
  constructor() {
    super(...arguments);
    this.parent = null;
    this.sibling = null;
  }
  remove() {
    this.children = null;
    this.client = null;
    this.childRatio = 0.5;
  }
};
var TilingEngine = class {
  constructor() {
    this.settings = new Settings();
    // turn the desktop into a string first so its indexed by primitive instead of reference
    this.rootNode = new RootNode();
    // changed when desktop is changed
    this.nodeMap = new import_mnemonist.BiMap();
  }
  buildLayout(rootTile) {
    this.nodeMap = new import_mnemonist.BiMap();
    let stack = [this.rootNode];
    let stackNext = [];
    this.nodeMap.set(this.rootNode, rootTile);
    let i = 0;
    if (this.settings.rotation) {
      i += 1;
    }
    while (stack.length > 0) {
      for (const node of stack) {
        if (node.children != null) {
          const tile = this.nodeMap.get(node);
          if (tile == null) {
            printDebug("No tile found for node", true);
            continue;
          }
          tile.split(i % 2 + 1);
          if (i % 2 == 0) {
            tile.tiles[0].relativeGeometry.width = tile.relativeGeometry.width * node.childRatio;
          } else {
            tile.tiles[0].relativeGeometry.height = tile.relativeGeometry.height * node.childRatio;
          }
          tile.tiles[0].oldRelativeGeometry = index(tile.tiles[0].relativeGeometry);
          this.nodeMap.set(node.children[0], tile.tiles[0]);
          stackNext.push(node.children[0]);
          if (i % 2 == 0) {
            tile.tiles[1].relativeGeometry.width = tile.relativeGeometry.width * (1 - node.childRatio);
          } else {
            tile.tiles[1].relativeGeometry.height = tile.relativeGeometry.height * (1 - node.childRatio);
          }
          tile.tiles[1].oldRelativeGeometry = index(tile.tiles[1].relativeGeometry);
          this.nodeMap.set(node.children[1], tile.tiles[1]);
          stackNext.push(node.children[1]);
        }
      }
      stack = stackNext;
      stackNext = [];
      i += 1;
    }
    return true;
  }
  // man would it be easy if i could just pass the tile in...
  updateTiles(rootTile) {
    let stack = [rootTile];
    let stackNext = [];
    let modifiedNode = null;
    findloop:
      while (stack.length > 0) {
        for (const tile of stack) {
          if (tile.oldRelativeGeometry != void 0) {
            const geometry = tile.relativeGeometry;
            const oldGeometry = tile.oldRelativeGeometry;
            if (geometry.width != oldGeometry.width || geometry.height != oldGeometry.height) {
              const modifiedTile2 = tile.parent;
              if (modifiedTile2 == null) {
                printDebug("Parent of modified tile is null", true);
                return false;
              }
              const modifiedNodeTest = this.nodeMap.inverse.get(modifiedTile2);
              if (modifiedNodeTest == void 0) {
                printDebug("No node found for modified tile", true);
                return false;
              }
              modifiedNode = modifiedNodeTest;
              break findloop;
            }
          }
          for (const child of tile.tiles) {
            stackNext.push(child);
          }
        }
        stack = stackNext;
        stackNext = [];
      }
    if (modifiedNode == null) {
      return true;
    }
    let modifiedTile = this.nodeMap.get(modifiedNode);
    const oldRatio = modifiedNode.childRatio;
    if (modifiedTile.tiles[0].relativeGeometry.height != modifiedTile.tiles[0].oldRelativeGeometry.height) {
      modifiedNode.childRatio = modifiedTile.tiles[0].relativeGeometry.height / modifiedTile.relativeGeometry.height;
    } else {
      modifiedNode.childRatio = modifiedTile.tiles[0].relativeGeometry.width / modifiedTile.relativeGeometry.width;
    }
    if (modifiedNode.childRatio > 0.95) {
      modifiedNode.childRatio = oldRatio;
    }
    modifiedTile.tiles[0].oldRelativeGeometry = index(modifiedTile.tiles[0].relativeGeometry);
    modifiedTile.tiles[1].oldRelativeGeometry = index(modifiedTile.tiles[1].relativeGeometry);
    return true;
  }
  resizeTile(tile, direction, amount) {
    const node = this.nodeMap.inverse.get(tile);
    if (node == void 0) {
      printDebug("Node not found", true);
      return false;
    }
    let parent = node.parent;
    if (parent == null || tile.parent == null) {
      printDebug("Parent not found", true);
      return false;
    }
    if (direction.primary) {
      if (tile.parent.layoutDirection == 1) {
        parent = parent.parent;
      }
    } else {
      if (tile.parent.layoutDirection == 2) {
        parent = parent.parent;
      }
    }
    if (parent == null) {
      printDebug("Parent not found", true);
      return false;
    }
    if (direction.primary) {
      if (direction.above) {
        parent.childRatio -= amount;
      } else {
        parent.childRatio += amount;
      }
    } else {
      if (direction.right) {
        parent.childRatio += amount;
      } else {
        parent.childRatio -= amount;
      }
    }
    while (parent.childRatio > 0.85) {
      parent.childRatio -= amount;
    }
    ;
    while (parent.childRatio < 0.15) {
      parent.childRatio += amount;
    }
    ;
    return true;
  }
  placeClients() {
    let ret = new Array();
    let stack = [this.rootNode];
    let stackNext = [];
    while (stack.length > 0) {
      for (const node of stack) {
        if (node.client != null) {
          let tile = this.nodeMap.get(node);
          if (tile == void 0) {
            printDebug("No tile found for node", true);
            continue;
          }
          ret.push([node.client, tile]);
        }
        if (node.children != null) {
          for (const child of node.children) {
            stackNext.push(child);
          }
        }
      }
      stack = stackNext;
      stackNext = [];
    }
    return ret;
  }
  addClient(client) {
    if (this.settings.insertionPoint == 2 /* Active */) {
      const lastClient = this.settings.lastActiveClient;
      if (lastClient != null && lastClient.tile != null) {
        const tile = lastClient.tile;
        if (this.nodeMap.inverse.has(tile) && tile.parent != null)
          return this.putClientInTile(client, tile);
      }
    }
    let stack = [this.rootNode];
    let stackNext = [];
    let i = 0;
    stackloop:
      while (stack.length > 0) {
        for (const node of stack) {
          if (node.children == null) {
            if (node.client != null) {
              node.split();
              node.children[0].client = node.client;
              node.children[1].client = client;
              node.client = null;
            } else {
              node.client = client;
            }
            break stackloop;
          } else {
            for (const child of node.children) {
              stackNext.push(child);
            }
          }
        }
        stack = stackNext;
        if (this.settings.insertionPoint == 1 /* Right */ && i % 2 == 0) {
          stack.reverse();
        }
        stackNext = [];
        i += 1;
      }
    return true;
  }
  putClientInTile(client, tile, direction) {
    const node = this.nodeMap.inverse.get(tile);
    if (node == void 0) {
      printDebug("No node found for tile", true);
      return false;
    }
    if (node.client == null) {
      node.client = client;
    } else {
      node.split();
      if (direction == void 0) {
        node.children[0].client = node.client;
        node.children[1].client = client;
      } else {
        let parent = node;
        let i = 0;
        while (parent.parent != null) {
          parent = parent.parent;
          i += 1;
        }
        if (i % 2 == 1) {
          if (direction.above) {
            node.children[0].client = client;
            node.children[1].client = node.client;
          } else {
            node.children[0].client = node.client;
            node.children[1].client = client;
          }
        } else {
          if (!direction.right) {
            node.children[0].client = client;
            node.children[1].client = node.client;
          } else {
            node.children[0].client = node.client;
            node.children[1].client = client;
          }
        }
      }
      node.client = null;
    }
    return true;
  }
  clientOfTile(tile) {
    const node = this.nodeMap.inverse.get(tile);
    if (node == void 0) {
      printDebug("No node found for tile", true);
      return null;
    }
    return node.client;
  }
  swapTiles(tileA, tileB) {
    const nodeA = this.nodeMap.inverse.get(tileA);
    const nodeB = this.nodeMap.inverse.get(tileB);
    if (nodeA == void 0 || nodeB == void 0) {
      printDebug("No node found for tile", true);
      return false;
    }
    if (nodeA.client == null || nodeB.client == null) {
      printDebug("No client in one of the nodes", true);
      return false;
    }
    let tmpClient = nodeA.client;
    nodeA.client = nodeB.client;
    nodeB.client = tmpClient;
    return true;
  }
  // cant copy code because indexed by string not object
  removeClient(client) {
    let stack = [this.rootNode];
    let stackNext = [];
    let deleteQueue = [];
    while (stack.length > 0) {
      for (const node of stack) {
        if (node.client == client) {
          deleteQueue.push(node);
        }
        if (node.children != null) {
          for (const child of node.children) {
            stackNext.push(child);
          }
        }
      }
      stack = stackNext;
      stackNext = [];
    }
    for (const node of deleteQueue) {
      node.remove();
    }
    return true;
  }
};

// src/engine/half.ts
var import_mnemonist2 = __toESM(require_mnemonist());
var Container = class {
  constructor(client) {
    this.client = client;
  }
};
var TilingEngine2 = class {
  constructor() {
    this.settings = new Settings();
    this.left = new Array();
    this.right = new Array();
    this.nodeMap = new import_mnemonist2.BiMap();
    this.middleSplit = 0.5;
  }
  buildLayout(rootTile) {
    if (this.right.length == 0 || this.left.length == 0) {
      let previousTile = rootTile;
      let topTile = previousTile;
      let mainArray;
      if (this.right.length == 0) {
        mainArray = this.left;
      } else {
        mainArray = this.right;
      }
      for (let i = 0; i < mainArray.length; i += 1) {
        let container = mainArray[i];
        if (i != mainArray.length - 1) {
          if (this.settings.rotation) {
            previousTile.split(1);
          } else {
            previousTile.split(2);
          }
          let height = 1 / mainArray.length;
          if (this.settings.rotation) {
            topTile.tiles[i].relativeGeometry.width = height;
          } else {
            topTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, topTile.tiles[i]);
          previousTile = topTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, previousTile);
        }
      }
    } else {
      if (this.settings.rotation) {
        rootTile.split(2);
      } else {
        rootTile.split(1);
      }
      let leftTile = rootTile.tiles[0];
      let rightTile = rootTile.tiles[1];
      let topLeftTile = leftTile;
      let topRightTile = rightTile;
      if (this.settings.rotation) {
        leftTile.relativeGeometry.height = this.middleSplit;
        rightTile.relativeGeometry.height = 1 - this.middleSplit;
      } else {
        leftTile.relativeGeometry.width = this.middleSplit;
        rightTile.relativeGeometry.width = 1 - this.middleSplit;
      }
      for (let i = 0; i < this.left.length; i += 1) {
        let container = this.left[i];
        if (i != this.left.length - 1) {
          if (this.settings.rotation) {
            leftTile.split(1);
          } else {
            leftTile.split(2);
          }
          let height = 1 / this.left.length;
          if (this.settings.rotation) {
            topLeftTile.tiles[i].relativeGeometry.width = height;
          } else {
            topLeftTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, topLeftTile.tiles[i]);
          leftTile = topLeftTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, leftTile);
        }
      }
      for (let i = 0; i < this.right.length; i += 1) {
        let container = this.right[i];
        if (i != this.right.length - 1) {
          if (this.settings.rotation) {
            rightTile.split(1);
          } else {
            rightTile.split(2);
          }
          let height = 1 / this.right.length;
          if (this.settings.rotation) {
            topRightTile.tiles[i].relativeGeometry.width = height;
          } else {
            topRightTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, topRightTile.tiles[i]);
          rightTile = topRightTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, rightTile);
        }
      }
    }
    return true;
  }
  updateTiles(rootTile) {
    if (this.left.length != 0 && this.right.length != 0) {
      if (rootTile.layoutDirection == 1) {
        this.middleSplit = rootTile.tiles[0].relativeGeometry.width;
      } else {
        this.middleSplit = rootTile.tiles[0].relativeGeometry.height;
      }
    }
    return true;
  }
  resizeTile(_tile, direction, amount) {
    if (this.settings.rotation && direction.primary) {
      if (direction.above) {
        this.middleSplit -= amount;
      } else {
        this.middleSplit += amount;
      }
    } else if (!(this.settings.rotation || direction.primary)) {
      if (direction.right) {
        this.middleSplit += amount;
      } else {
        this.middleSplit -= amount;
      }
    } else {
      return false;
    }
    while (this.middleSplit > 0.85) {
      this.middleSplit -= amount;
    }
    ;
    while (this.middleSplit < 0.15) {
      this.middleSplit += amount;
    }
    ;
    return true;
  }
  placeClients() {
    let ret = new Array();
    for (const container of this.left) {
      const tile = this.nodeMap.get(container);
      if (tile == void 0) {
        printDebug("No tile found for container", true);
        return ret;
      }
      ret.push([container.client, tile]);
    }
    for (const container of this.right) {
      const tile = this.nodeMap.get(container);
      if (tile == void 0) {
        printDebug("No tile found for container", true);
        return ret;
      }
      ret.push([container.client, tile]);
    }
    return ret;
  }
  addClient(client) {
    if (this.settings.insertionPoint == 2 /* Active */) {
      const lastClient = this.settings.lastActiveClient;
      if (lastClient != null && lastClient.tile != null) {
        const tile = lastClient.tile;
        if (this.nodeMap.inverse.has(tile) && tile.parent != null)
          return this.putClientInTile(client, tile);
      }
    }
    let mainArr;
    let secondArr;
    if (this.settings.insertionPoint == 0 /* Left */) {
      mainArr = this.left;
      secondArr = this.right;
    } else {
      mainArr = this.right;
      secondArr = this.left;
    }
    if (secondArr.length == 0) {
      secondArr.push(new Container(client));
    } else {
      mainArr.push(new Container(client));
    }
    return true;
  }
  putClientInTile(client, tile, direction) {
    const container = this.nodeMap.inverse.get(tile);
    if (container == void 0) {
      printDebug("No container found for tile", true);
      return false;
    }
    const newContainer = new Container(client);
    if (this.right.includes(container)) {
      const array = this.right;
      if ((direction == void 0 || !direction.right) && this.left.length == 0) {
        this.left.push(newContainer);
      } else {
        if (direction == void 0) {
          array.splice(array.indexOf(container), 0, newContainer);
        } else {
          if (direction.above && !this.settings.rotation || !direction.right && this.settings.rotation) {
            array.splice(array.indexOf(container), 0, newContainer);
          } else {
            array.splice(array.indexOf(container) + 1, 0, newContainer);
          }
        }
      }
    } else {
      const array = this.left;
      if ((direction == void 0 || direction.right) && this.right.length == 0) {
        this.right.push(newContainer);
      } else {
        if (direction == void 0) {
          array.splice(array.indexOf(container), 0, newContainer);
        } else {
          if (direction.above && !this.settings.rotation || !direction.right && this.settings.rotation) {
            array.splice(array.indexOf(container), 0, newContainer);
          } else {
            array.splice(array.indexOf(container) + 1, 0, newContainer);
          }
        }
      }
    }
    return true;
  }
  swapTiles(tileA, tileB) {
    const containerA = this.nodeMap.inverse.get(tileA);
    const containerB = this.nodeMap.inverse.get(tileB);
    if (containerA == null || containerB == null) {
      printDebug("No container found for tile", true);
      return false;
    }
    const tmpclient = containerA.client;
    containerA.client = containerB.client;
    containerB.client = tmpclient;
    return true;
  }
  clientOfTile(tile) {
    const container = this.nodeMap.inverse.get(tile);
    if (container == void 0) {
      printDebug("No container found for tile", true);
      return null;
    }
    return container.client;
  }
  removeClient(client) {
    for (let i = 0; i < this.left.length; i += 1) {
      if (this.left[i].client == client) {
        this.left.splice(i, 1);
        if (this.left.length == 0 && this.right.length != 0) {
          const container = this.right[0];
          this.left.push(container);
          this.right.splice(0, 1);
        }
        return true;
      }
    }
    for (let i = 0; i < this.right.length; i += 1) {
      if (this.right[i].client == client) {
        this.right.splice(i, 1);
        if (this.right.length == 0 && this.left.length > 1) {
          const container = this.left[this.left.length - 1];
          this.right.push(container);
          this.left.splice(this.left.length - 1, 1);
        }
        return true;
      }
    }
    printDebug("Client not found", true);
    return false;
  }
};

// src/engine/threecolumn.ts
var import_mnemonist3 = __toESM(require_mnemonist());
var Container2 = class {
  constructor(client) {
    this.client = client;
  }
};
var TilingEngine3 = class {
  constructor() {
    this.settings = new Settings();
    this.columns = [new Array(), new Array(), new Array()];
    this.leftSize = 0.25;
    this.rightSize = 0.25;
    this.nodeMap = new import_mnemonist3.BiMap();
  }
  buildLayout(rootTile) {
    let leftTile;
    let rightTile;
    let centerTile;
    if (this.columns[1].length == 0) {
      return true;
    }
    if (this.columns[0].length == 0 && this.columns[2].length == 0) {
      centerTile = rootTile;
    } else if (this.columns[0].length == 0 && this.columns[2].length != 0) {
      if (this.settings.rotation) {
        rootTile.split(2);
        rootTile.tiles[1].relativeGeometry.height = this.rightSize;
        rootTile.tiles[0].relativeGeometry.height = 1 - this.rightSize;
      } else {
        rootTile.split(1);
        rootTile.tiles[1].relativeGeometry.width = this.rightSize;
        rootTile.tiles[0].relativeGeometry.width = 1 - this.rightSize;
      }
      centerTile = rootTile.tiles[0];
      rightTile = rootTile.tiles[1];
    } else if (this.columns[0].length != 0 && this.columns[2].length == 0) {
      if (this.settings.rotation) {
        rootTile.split(2);
        rootTile.tiles[0].relativeGeometry.height = this.leftSize;
        rootTile.tiles[1].relativeGeometry.height = 1 - this.leftSize;
      } else {
        rootTile.split(1);
        rootTile.tiles[0].relativeGeometry.width = this.leftSize;
        rootTile.tiles[1].relativeGeometry.width = 1 - this.leftSize;
      }
      leftTile = rootTile.tiles[0];
      centerTile = rootTile.tiles[1];
    } else if (this.columns[0].length != 0 && this.columns[2].length != 0) {
      if (this.settings.rotation) {
        rootTile.split(2);
        rootTile.tiles[1].split(2);
        rootTile.tiles[0].relativeGeometry.height = this.leftSize;
        rootTile.tiles[2].relativeGeometry.height = this.rightSize;
        rootTile.tiles[1].relativeGeometry.height = 1 - this.leftSize - this.rightSize;
      } else {
        rootTile.split(1);
        rootTile.tiles[1].split(1);
        rootTile.tiles[0].relativeGeometry.width = this.leftSize;
        rootTile.tiles[2].relativeGeometry.width = this.rightSize;
        rootTile.tiles[1].relativeGeometry.width = 1 - this.leftSize - this.rightSize;
      }
      leftTile = rootTile.tiles[0];
      centerTile = rootTile.tiles[1];
      rightTile = rootTile.tiles[2];
    }
    if (leftTile != void 0) {
      let splitTile = leftTile;
      const left = this.columns[0];
      for (let i = 0; i < left.length; i += 1) {
        let container = left[i];
        if (i != left.length - 1) {
          let height = 1 / left.length;
          if (this.settings.rotation) {
            splitTile.split(1);
            leftTile.tiles[i].relativeGeometry.width = height;
          } else {
            splitTile.split(2);
            leftTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, leftTile.tiles[i]);
          splitTile = leftTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, splitTile);
        }
      }
    }
    if (rightTile != void 0) {
      let splitTile = rightTile;
      const right = this.columns[2];
      for (let i = 0; i < right.length; i += 1) {
        let container = right[i];
        if (i != right.length - 1) {
          let height = 1 / right.length;
          if (this.settings.rotation) {
            splitTile.split(1);
            rightTile.tiles[i].relativeGeometry.width = height;
          } else {
            splitTile.split(2);
            rightTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, rightTile.tiles[i]);
          splitTile = rightTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, splitTile);
        }
      }
    }
    if (centerTile != void 0) {
      let splitTile = centerTile;
      const center = this.columns[1];
      for (let i = 0; i < center.length; i += 1) {
        let container = center[i];
        if (i != center.length - 1) {
          let height = 1 / center.length;
          if (this.settings.rotation) {
            splitTile.split(1);
            centerTile.tiles[i].relativeGeometry.width = height;
          } else {
            splitTile.split(2);
            centerTile.tiles[i].relativeGeometry.height = height;
          }
          this.nodeMap.set(container, centerTile.tiles[i]);
          splitTile = centerTile.tiles[i + 1];
        } else {
          this.nodeMap.set(container, splitTile);
        }
      }
    }
    return true;
  }
  updateTiles(rootTile) {
    if (this.columns[0].length == 0 && this.columns[2].length != 0) {
      if (this.settings.rotation) {
        this.rightSize = rootTile.tiles[1].relativeGeometry.height;
      } else {
        this.rightSize = rootTile.tiles[1].relativeGeometry.width;
      }
    } else if (this.columns[0].length != 0 && this.columns[2].length == 0) {
      if (this.settings.rotation) {
        this.leftSize = rootTile.tiles[0].relativeGeometry.height;
      } else {
        this.leftSize = rootTile.tiles[0].relativeGeometry.width;
      }
    } else if (this.columns[0].length != 0 && this.columns[2].length != 0) {
      if (this.settings.rotation) {
        this.rightSize = rootTile.tiles[2].relativeGeometry.height;
        this.leftSize = rootTile.tiles[0].relativeGeometry.height;
      } else {
        this.rightSize = rootTile.tiles[2].relativeGeometry.width;
        this.leftSize = rootTile.tiles[0].relativeGeometry.width;
      }
    }
    return true;
  }
  resizeTile(tile, direction, amount) {
    const container = this.nodeMap.inverse.get(tile);
    if (container == null)
      return false;
    if (this.columns[0].includes(container)) {
      if (direction.right && !this.settings.rotation || !direction.above && this.settings.rotation) {
        this.leftSize += amount;
      } else {
        this.leftSize -= amount;
      }
    } else if (this.columns[1].includes(container)) {
      if (direction.right && !this.settings.rotation || !direction.above && this.settings.rotation) {
        this.rightSize -= amount;
      } else {
        this.leftSize -= amount;
      }
    } else if (this.columns[2].includes(container)) {
      if (direction.right && !this.settings.rotation || !direction.above && this.settings.rotation) {
        this.rightSize -= amount;
      } else {
        this.rightSize += amount;
      }
    }
    while (this.rightSize + this.leftSize > 0.85) {
      if (this.rightSize > this.leftSize) {
        this.rightSize -= amount;
      } else {
        this.leftSize -= amount;
      }
    }
    while (this.rightSize < 0.15) {
      this.rightSize += amount;
    }
    while (this.leftSize < 0.15) {
      this.leftSize += amount;
    }
    return true;
  }
  placeClients() {
    let ret = new Array();
    for (const column of this.columns) {
      for (const container of column) {
        const tile = this.nodeMap.get(container);
        if (tile == void 0) {
          printDebug("No tile found for container", true);
          return ret;
        }
        ret.push([container.client, tile]);
      }
    }
    return ret;
  }
  addClient(client) {
    if (this.settings.insertionPoint == 2 /* Active */) {
      const lastClient = this.settings.lastActiveClient;
      if (lastClient != null && lastClient.tile != null) {
        const tile = lastClient.tile;
        if (this.nodeMap.inverse.has(tile) && tile.parent != null)
          return this.putClientInTile(client, tile);
      }
    }
    if (this.columns[1].length == 0) {
      this.columns[1].push(new Container2(client));
    } else {
      let mainArr;
      let secondArr;
      if (this.settings.insertionPoint == 0 /* Left */) {
        mainArr = this.columns[0];
        secondArr = this.columns[2];
      } else {
        mainArr = this.columns[2];
        secondArr = this.columns[0];
      }
      if (mainArr.length > secondArr.length) {
        secondArr.push(new Container2(client));
      } else {
        mainArr.push(new Container2(client));
      }
    }
    return true;
  }
  putClientInTile(client, tile, direction) {
    const container = this.nodeMap.inverse.get(tile);
    const newContainer = new Container2(client);
    if (container == void 0) {
      printDebug("No container found for tile", true);
      return false;
    }
    let array;
    for (const column of this.columns) {
      if (column.includes(container)) {
        array = column;
        break;
      }
    }
    if (array == void 0) {
      printDebug("Container not registered", true);
      return false;
    }
    if (array == this.columns[1]) {
      if (direction == void 0) {
        array.splice(array.indexOf(container), 0, newContainer);
      } else {
        if (direction.right && !this.settings.rotation || !direction.above && this.settings.rotation && this.columns[2].length == 0) {
          this.columns[2].push(newContainer);
        } else if (!(direction.right && !this.settings.rotation || !direction.above && this.settings.rotation) && this.columns[0].length == 0) {
          this.columns[0].push(newContainer);
        } else {
          if (direction.above && !this.settings.rotation || !direction.right && this.settings.rotation) {
            array.splice(array.indexOf(container), 0, newContainer);
          } else {
            array.splice(array.indexOf(container) + 1, 0, newContainer);
          }
        }
      }
    } else {
      if (direction == void 0) {
        array.splice(array.indexOf(container), 0, newContainer);
      } else {
        if (direction.above && !this.settings.rotation || !direction.right && this.settings.rotation) {
          array.splice(array.indexOf(container), 0, newContainer);
        } else {
          array.splice(array.indexOf(container) + 1, 0, newContainer);
        }
      }
    }
    return true;
  }
  swapTiles(tileA, tileB) {
    const containerA = this.nodeMap.inverse.get(tileA);
    const containerB = this.nodeMap.inverse.get(tileB);
    if (containerA == null || containerB == null) {
      printDebug("No container found for tile", true);
      return false;
    }
    const tmpclient = containerA.client;
    containerA.client = containerB.client;
    containerB.client = tmpclient;
    return true;
  }
  clientOfTile(tile) {
    const container = this.nodeMap.inverse.get(tile);
    if (container == void 0) {
      printDebug("No container found for tile", true);
      return null;
    }
    return container.client;
  }
  removeClient(client) {
    for (let i = 0; i < this.columns.length; i += 1) {
      let column = this.columns[i];
      for (let j = 0; j < column.length; j += 1) {
        if (column[j].client == client) {
          column.splice(j, 1);
          if (this.columns[1].length == 0) {
            let columnToRemove = this.columns[0].length > this.columns[2].length ? this.columns[0] : this.columns[2];
            if (columnToRemove.length == 0) {
              return true;
            }
            const container = columnToRemove[columnToRemove.length - 1];
            column.push(container);
            columnToRemove.splice(columnToRemove.length - 1, 1);
          }
          return true;
        }
      }
    }
    return false;
  }
};

// src/engine/monocle.ts
var TilingEngine4 = class {
  constructor() {
    this.settings = new Settings();
    this.clients = new Array();
    this.rootTile = null;
  }
  // no tile modification needed
  buildLayout(rootTile) {
    this.rootTile = rootTile;
    return true;
  }
  updateTiles(rootTile) {
    this.rootTile = rootTile;
    return true;
  }
  resizeTile(_tile, _direction, _amount) {
    return true;
  }
  placeClients() {
    if (this.rootTile == null)
      return new Array();
    let ret = new Array();
    for (const client of this.clients) {
      ret.push([client, this.rootTile]);
    }
    return ret;
  }
  addClient(client) {
    this.clients.push(client);
    return true;
  }
  // also doesnt do anything right now 
  putClientInTile(client, _tile) {
    return this.addClient(client);
  }
  clientOfTile(_tile) {
    if (workspace.activeClient != null && this.clients.includes(workspace.activeClient)) {
      return workspace.activeClient;
    } else {
      return this.clients[0];
    }
  }
  // cant really do anything
  swapTiles(_rootTile, _tile) {
    return true;
  }
  removeClient(client) {
    this.clients.splice(this.clients.indexOf(client), 1);
    return true;
  }
};

// src/engine/kwin.ts
var import_mnemonist4 = __toESM(require_mnemonist());
var Tile = class {
  constructor(parent, relativeGeometry, layoutDirection) {
    this.tiles = new Array();
    this.windows = new Array();
    this.padding = 4;
    this.layoutDirection = layoutDirection;
    if (parent == null || relativeGeometry == null) {
      this.parent = null;
      this.relativeGeometry = null;
      return;
    }
    this.parent = parent;
    this.relativeGeometry = {
      x: relativeGeometry.x,
      y: relativeGeometry.y,
      width: relativeGeometry.width,
      height: relativeGeometry.height
    };
    parent.tiles.push(this);
  }
};
var RootTile = class extends Tile {
  constructor(layoutDirection) {
    super(null, null, layoutDirection);
    this.parent = null;
    this.relativeGeometry = null;
  }
};
var TilingEngine5 = class {
  constructor() {
    this.settings = new Settings();
    this.fakeRootTile = new RootTile(1);
    this.untiledClients = new Array();
    this.tileMap = new import_mnemonist4.BiMap();
  }
  buildLayout(rootTile) {
    this.tileMap.clear();
    this.tileMap.set(this.fakeRootTile, rootTile);
    let stack = [this.fakeRootTile];
    let stackNext = new Array();
    while (stack.length != 0) {
      for (const fakeTile of stack) {
        const realTile = this.tileMap.get(fakeTile);
        if (realTile == void 0) {
          printDebug("Could not find tile", true);
          return false;
        }
        let splitTile = realTile;
        for (let i = 1; i < fakeTile.tiles.length; i += 1) {
          splitTile.split(fakeTile.layoutDirection);
          splitTile = realTile.tiles[i];
        }
        for (let i = 0; i < fakeTile.tiles.length; i += 1) {
          this.tileMap.set(fakeTile.tiles[i], realTile.tiles[i]);
          stackNext.push(fakeTile.tiles[i]);
        }
        let geometry = fakeTile.relativeGeometry;
        if (geometry != null) {
          realTile.relativeGeometry.x = geometry.x;
          realTile.relativeGeometry.y = geometry.y;
          realTile.relativeGeometry.width = geometry.width;
          realTile.relativeGeometry.height = geometry.height;
        }
      }
      stack = stackNext;
      stackNext = [];
    }
    return true;
  }
  updateTiles(rootTile) {
    this.tileMap.clear();
    this.fakeRootTile = new RootTile(rootTile.layoutDirection);
    this.tileMap.set(this.fakeRootTile, rootTile);
    let stack = [rootTile];
    let stackNext = new Array();
    while (stack.length > 0) {
      for (const realTile of stack) {
        const fakeTile = this.tileMap.inverse.get(realTile);
        if (fakeTile == void 0) {
          printDebug("Could not find tile", true);
          return false;
        }
        for (const tile of realTile.tiles) {
          const newTile = new Tile(fakeTile, tile.relativeGeometry, tile.layoutDirection);
          for (let i = 0; i < realTile.windows.length; i += 1) {
            newTile.windows.push(realTile.windows[i]);
          }
          this.tileMap.set(newTile, tile);
          stackNext.push(tile);
        }
      }
      stack = stackNext;
      stackNext = [];
    }
    return true;
  }
  // may add in the future
  resizeTile(_tile, _direction, _amount) {
    return true;
  }
  placeClients() {
    let ret = new Array();
    for (const fakeTile of this.tileMap.keys()) {
      for (const client of fakeTile.windows) {
        ret.push([client, this.tileMap.get(fakeTile)]);
      }
    }
    for (const client of this.untiledClients) {
      ret.push([client, null]);
    }
    return ret;
  }
  // user tiles this if they want
  addClient(client) {
    this.untiledClients.push(client);
    return true;
  }
  putClientInTile(client, tile) {
    const fakeTile = this.tileMap.inverse.get(tile);
    if (fakeTile == void 0) {
      printDebug("Could not find tile", true);
      return false;
    }
    if (this.untiledClients.includes(client)) {
      this.untiledClients.splice(this.untiledClients.indexOf(client), 1);
    }
    fakeTile.windows.push(client);
    return true;
  }
  clientOfTile(tile) {
    if (this.tileMap.inverse.has(tile)) {
      const client = this.tileMap.inverse.get(tile).windows[0];
      if (client == void 0) {
        return null;
      } else {
        return client;
      }
    } else {
      return null;
    }
  }
  swapTiles(tileA, tileB) {
    const fakeTileA = this.tileMap.inverse.get(tileA);
    const fakeTileB = this.tileMap.inverse.get(tileB);
    if (fakeTileA == void 0 || fakeTileB == void 0) {
      printDebug("Could not find tiles", true);
      return false;
    }
    let tmparray = fakeTileA.windows;
    fakeTileA.windows = fakeTileB.windows;
    fakeTileB.windows = tmparray;
    return true;
  }
  removeClient(client) {
    if (this.untiledClients.includes(client)) {
      this.untiledClients.splice(this.untiledClients.indexOf(client), 1);
      return true;
    }
    for (const fakeTile of this.tileMap.keys()) {
      if (fakeTile.windows.includes(client)) {
        fakeTile.windows.splice(fakeTile.windows.indexOf(client), 1);
        return true;
      }
    }
    return true;
  }
};

// src/engine/engine.ts
var EngineTypes = /* @__PURE__ */ ((EngineTypes2) => {
  EngineTypes2[EngineTypes2["BTree"] = 0] = "BTree";
  EngineTypes2[EngineTypes2["Half"] = 1] = "Half";
  EngineTypes2[EngineTypes2["ThreeColumn"] = 2] = "ThreeColumn";
  EngineTypes2[EngineTypes2["Monocle"] = 3] = "Monocle";
  EngineTypes2[EngineTypes2["Kwin"] = 4] = "Kwin";
  EngineTypes2[EngineTypes2["_loop"] = 5] = "_loop";
  return EngineTypes2;
})(EngineTypes || {});
var Desktop2 = class {
  toString() {
    return "(" + this.screen + ", " + this.activity + ", " + this.desktop + ")";
  }
  constructor(screen, activity, desktop) {
    if (screen == void 0 || activity == void 0 || desktop == void 0) {
      this.screen = workspace.activeScreen;
      this.activity = workspace.currentActivity;
      this.desktop = workspace.currentDesktop;
    } else {
      this.screen = screen;
      this.activity = activity;
      this.desktop = desktop;
    }
  }
};
function engineForEnum(engine2) {
  switch (engine2) {
    case 0 /* BTree */:
      return new TilingEngine();
    case 1 /* Half */:
      return new TilingEngine2();
    case 2 /* ThreeColumn */:
      return new TilingEngine3();
    case 3 /* Monocle */:
      return new TilingEngine4();
    case 4 /* Kwin */:
    default:
      return new TilingEngine5();
  }
}
function isQmlSetting(setting) {
  return "insertionPoint" in setting;
}
var EngineManager = class {
  constructor() {
    this.engineTypes = /* @__PURE__ */ new Map();
    this.engines = /* @__PURE__ */ new Map();
    this.layoutBuilding = false;
    this.tileRebuildTimers = /* @__PURE__ */ new Map();
    this.getSettingsDbus = createDBusCall();
    this.getSettingsDbus.service = "org.polonium.SettingSaver";
    this.getSettingsDbus.path = "/saver";
    this.getSettingsDbus.dbusInterface = "org.polonium.SettingSaver";
    this.getSettingsDbus.method = "GetSettings";
    this.getSettingsDbus.finished.connect(((returnValues) => {
      if (returnValues[1].length == 0)
        return;
      let desktop = returnValues[0];
      let settings = JSON.parse(returnValues[1]);
      if (!isQmlSetting(settings)) {
        printDebug("Invalid settings for desktop " + returnValues[0], true);
        return;
      }
      let engine2;
      printDebug("Restoring settings for desktop " + returnValues[0] + " as " + returnValues[1], false);
      if (settings.engine != this.engineTypes.get(desktop)) {
        engine2 = engineForEnum(settings.engine);
        this.engineTypes.set(desktop, settings.engine);
        this.engines.set(desktop, engine2);
      } else {
        engine2 = this.engines.get(desktop);
      }
      if (engine2 == void 0)
        return;
      engine2.settings = new Settings(settings);
    }).bind(this));
  }
  createNewEngine(desktop) {
    this.engineTypes.set(desktop.toString(), config.defaultEngine);
    const engine2 = engineForEnum(config.defaultEngine);
    this.engines.set(desktop.toString(), engine2);
    if (dbusClientInstalled) {
      this.getSettingsDbus.arguments = [desktop.toString()];
      this.getSettingsDbus.call();
    }
    return engine2;
  }
  getEngine(desktop) {
    if (desktop === void 0) {
      desktop = new Desktop2();
    }
    return this.engines.get(desktop.toString()) ?? this.createNewEngine(desktop);
  }
  cycleEngine(desktop) {
    let engineType = this.engineTypes.get(desktop.toString());
    if (engineType == void 0) {
      printDebug("No engine found for desktop " + desktop, true);
      return false;
    }
    engineType += 1;
    this.setEngine(desktop, engineType, true);
    return true;
  }
  setEngine(desktop, engineType, dialog = false) {
    engineType %= 5 /* _loop */;
    printDebug("Setting engine for " + desktop + " to engine " + EngineTypes[engineType], false);
    this.engineTypes.set(desktop.toString(), engineType);
    const engine2 = engineForEnum(engineType);
    this.engines.set(desktop.toString(), engine2);
    if (dialog) {
      showDialog(EngineTypes[engineType]);
    }
    return true;
  }
  buildLayout(rootTile, desktop) {
    this.layoutBuilding = true;
    printDebug("Building layout for desktop " + desktop, false);
    while (rootTile.tiles.length > 0) {
      rootTile.tiles[0].remove();
    }
    const ret = this.getEngine(desktop).buildLayout(rootTile);
    let stack = [rootTile];
    let stackNext = [];
    while (stack.length != 0) {
      for (const tile of stack) {
        tile.generated = true;
        for (let i = 0; i < tile.tiles.length; i += 1) {
          stackNext.push(tile.tiles[i]);
        }
      }
      stack = stackNext;
      stackNext = [];
    }
    this.layoutBuilding = false;
    if (!rootTile.connected) {
      rootTile.connected = true;
      rootTile.layoutModified.connect(this.updateTilesSignal.bind(this, rootTile));
    }
    return ret;
  }
  updateTilesSignal(rootTile) {
    if (this.layoutBuilding)
      return;
    if (!this.tileRebuildTimers.has(rootTile)) {
      printDebug("Creating tile update timer", false);
      this.tileRebuildTimers.set(rootTile, createTimer());
      const timer = this.tileRebuildTimers.get(rootTile);
      timer.repeat = false;
      timer.triggered.connect(this.updateTiles.bind(this, rootTile));
      timer.interval = config.timerDelay;
    }
    this.tileRebuildTimers.get(rootTile).restart();
  }
  setSettings(desktop, qmlSettings) {
    const settings = new Settings(qmlSettings);
    this.getEngine(desktop).settings = settings;
  }
  removeSettings(desktop) {
    this.getEngine(desktop).settings = new Settings();
  }
  getSettings(desktop) {
    const engine2 = this.getEngine(desktop);
    const engineType = this.engineTypes.get(desktop.toString());
    if (engineType == void 0)
      return null;
    return engine2.settings.toQmlSettings(engineType);
  }
  updateTiles(rootTile) {
    if (this.layoutBuilding)
      return true;
    const desktop = new Desktop2();
    printDebug("Updating tiles for desktop " + desktop, false);
    return this.getEngine(desktop).updateTiles(rootTile);
  }
  resizeTile(tile, direction, amount) {
    this.layoutBuilding = true;
    const desktop = new Desktop2();
    const parent = tile.parent;
    if (parent == null)
      return false;
    let relativeAmount = 0;
    if (direction.primary) {
      relativeAmount = amount / parent.absoluteGeometry.height;
    } else {
      relativeAmount = amount / parent.absoluteGeometry.width;
    }
    printDebug("Resizing tile " + tile.absoluteGeometry + " in direction " + direction + " by " + amount + " pixels on desktop " + desktop, false);
    const ret = this.getEngine(desktop).resizeTile(tile, direction, relativeAmount);
    this.layoutBuilding = false;
    return ret;
  }
  placeClients(desktop) {
    printDebug("Placing clients for desktop " + desktop, false);
    return this.getEngine(desktop).placeClients();
  }
  addClient(client, optionalDesktop) {
    let desktops = new Array();
    if (!optionalDesktop) {
      if (client.desktop == -1) {
        for (let i = 0; i < workspace.desktops; i += 1) {
          for (const activity of client.activities) {
            const desktop = new Desktop2(client.screen, activity, i);
            desktops.push(desktop);
          }
        }
      } else {
        for (const activity of client.activities) {
          const desktop = new Desktop2(client.screen, activity, client.desktop);
          desktops.push(desktop);
        }
      }
    } else {
      desktops.push(optionalDesktop);
    }
    for (const desktop of desktops) {
      printDebug("Adding " + client.resourceClass + " to desktop " + desktop, false);
      if (!this.getEngine(desktop).addClient(client)) {
        return false;
      }
    }
    return true;
  }
  updateClientDesktop(client, oldDesktops) {
    printDebug("Updating desktop for client " + client.resourceClass, false);
    let newDesktops = new Array();
    if (client.desktop == -1) {
      for (let i = 0; i < workspace.desktops; i += 1) {
        for (const activity of client.activities) {
          const desktop = new Desktop2(client.screen, activity, i);
          newDesktops.push(desktop);
        }
      }
    } else {
      for (const activity of client.activities) {
        const desktop = new Desktop2(client.screen, activity, client.desktop);
        newDesktops.push(desktop);
      }
    }
    let newDesktopsStrings = newDesktops.map((x) => x.toString());
    let oldDesktopsStrings = oldDesktops.map((x) => x.toString());
    for (const desktop of oldDesktops) {
      if (newDesktopsStrings.includes(desktop.toString()))
        continue;
      if (!this.removeClient(client, desktop)) {
        return false;
      }
    }
    for (const desktop of newDesktops) {
      if (oldDesktopsStrings.includes(desktop.toString()))
        continue;
      if (!this.addClient(client, desktop)) {
        return false;
      }
    }
    return true;
  }
  putClientInTile(client, tile, direction) {
    printDebug("Placing " + client.resourceClass + " in " + tile.absoluteGeometry + " with direction " + direction, false);
    if (!this.getEngine().putClientInTile(client, tile, direction)) {
      return this.getEngine().addClient(client);
    } else {
      return true;
    }
  }
  clientOfTile(tile) {
    printDebug("Getting client of " + tile.absoluteGeometry, false);
    return this.getEngine().clientOfTile(tile);
  }
  swapTiles(tileA, tileB) {
    printDebug("Swapping clients of " + tileA.absoluteGeometry + " and " + tileB.absoluteGeometry, false);
    return this.getEngine().swapTiles(tileA, tileB);
  }
  removeClient(client, optionalDesktop) {
    let desktops = new Array();
    if (!optionalDesktop) {
      if (client.desktop == -1) {
        for (let i = 0; i < workspace.desktops; i += 1) {
          for (const activity of client.activities) {
            const desktop = new Desktop2(client.screen, activity, i);
            desktops.push(desktop);
          }
        }
      } else {
        for (const activity of client.activities) {
          const desktop = new Desktop2(client.screen, activity, client.desktop);
          desktops.push(desktop);
        }
      }
    } else {
      desktops.push(optionalDesktop);
    }
    for (const desktop of desktops) {
      printDebug("Removing " + client.resourceClass + " from desktop " + desktop, false);
      if (!this.getEngine(desktop).removeClient(client)) {
        return false;
      }
    }
    return true;
  }
};

// src/main.ts
var engine;
var setSettingsDbus;
var removeSettingsDbus;
function initMain() {
  engine = new EngineManager();
  setSettingsDbus = createDBusCall();
  setSettingsDbus.service = "org.polonium.SettingSaver";
  setSettingsDbus.path = "/saver";
  setSettingsDbus.dbusInterface = "org.polonium.SettingSaver";
  setSettingsDbus.method = "SetSettings";
  removeSettingsDbus = createDBusCall();
  removeSettingsDbus.service = "org.polonium.SettingSaver";
  removeSettingsDbus.path = "/saver";
  removeSettingsDbus.dbusInterface = "org.polonium.SettingSaver";
  removeSettingsDbus.method = "RemoveSettings";
}
var buildingLayout = false;
function rebuildLayout(isRepeat = false) {
  buildingLayout = true;
  let repeatRebuild = false;
  let desktops = new Array();
  for (let i = 0; i < workspace.numScreens; i += 1) {
    let desktop = new Desktop2();
    desktop.screen = i;
    desktops.push(desktop);
  }
  for (const desktop of desktops) {
    let tileManager = workspace.tilingForScreen(desktop.screen);
    if (tileManager == void 0) {
      printDebug("No root tile found for desktop " + desktop, true);
      return;
    }
    engine.buildLayout(tileManager.rootTile, desktop);
    const clientTiles = engine.placeClients(desktop);
    for (const clientTile of clientTiles) {
      const client = clientTile[0];
      const tile = clientTile[1];
      if (client == void 0) {
        printDebug("Undefined client found", true);
        continue;
      }
      if (client.isSingleTile) {
        client.setMaximize(false, false);
        repeatRebuild = true;
      }
      if (tile != null) {
        if (config.maximizeSingle && (tile == tileManager.rootTile || clientTiles.length == 1)) {
          client.isSingleTile = true;
          client.setMaximize(true, true);
        }
        client.wasTiled = true;
        if (config.borders == 1 /* NoBorderTiled */) {
          client.noBorder = true;
        }
        if (config.keepTiledBelow) {
          client.keepBelow = true;
        }
        if (!client.isSingleTile) {
          client.tile = tile;
        }
        client.lastTileCenter = GeometryTools.rectCenter(tile.absoluteGeometry);
        if (tile.absoluteGeometry.width < client.minSize.width) {
          const resizeAmount = client.minSize.width - tile.absoluteGeometry.width + tile.padding * 2;
          const screenArea = workspace.clientArea(6, client);
          const tileCenter = GeometryTools.rectCenter(tile.absoluteGeometry);
          if (GeometryTools.directionFromPointInRect(screenArea, tileCenter).right) {
            engine.resizeTile(tile, new Direction(true, false, false), resizeAmount);
          } else {
            engine.resizeTile(tile, new Direction(true, true, false), resizeAmount);
          }
          repeatRebuild = true;
        }
        if (tile.absoluteGeometry.height < client.minSize.height) {
          const resizeAmount = client.minSize.height - tile.absoluteGeometry.height + tile.padding * 2;
          const screenArea = workspace.clientArea(6, client);
          const tileCenter = GeometryTools.rectCenter(tile.absoluteGeometry);
          if (GeometryTools.directionFromPointInRect(screenArea, tileCenter).above) {
            engine.resizeTile(tile, new Direction(false, true, true), resizeAmount);
          } else {
            engine.resizeTile(tile, new Direction(true, true, true), resizeAmount);
          }
          repeatRebuild = true;
        }
      } else {
        client.wasTiled = false;
        if (config.borders == 1 /* NoBorderTiled */) {
          client.noBorder = false;
        }
        if (config.keepTiledBelow) {
          client.keepBelow = false;
        }
        client.tile = null;
      }
      if (client.hasBeenTiled == void 0) {
        client.desktopChanged.connect(clientDesktopChange.bind(this, client));
        client.activitiesChanged.connect(clientDesktopChange);
        client.screenChanged.connect(clientDesktopChange.bind(this, client));
        client.minimizedChanged.connect(clientMinimized.bind(this, client));
        client.quickTileModeChanged.connect(clientQuickTiled.bind(this, client));
        client.frameGeometryChanged.connect(clientGeometryChange);
        client.clientMaximizedStateChanged.connect(clientMaximized);
        client.fullScreenChanged.connect(clientFullScreen.bind(this, client));
        client.hasBeenTiled = true;
      }
    }
  }
  buildingLayout = false;
  if (!isRepeat && repeatRebuild) {
    let timer = createTimer();
    timer.repeat = false;
    timer.interval = config.timerDelay;
    timer.triggered.connect(rebuildLayout.bind(this, true));
    timer.start();
  }
}
function currentDesktopChange() {
  const clientList = workspace.clientList();
  for (let i = 0; i < clientList.length; i += 1) {
    const client = clientList[i];
    if (client.tile != null && client.screen == workspace.lastActiveScreen && client.activities.includes(workspace.lastActivity) && client.desktop == workspace.lastDesktop) {
      const tile = client.tile;
      client.tile = null;
      client.frameGeometry = tile.absoluteGeometry;
      client.frameGeometry.width -= tile.padding;
      client.frameGeometry.height -= tile.padding;
    }
  }
  workspace.lastActiveScreen = workspace.activeScreen;
  workspace.lastActivity = workspace.currentActivity;
  workspace.lastDesktop = workspace.currentDesktop;
  rebuildLayout();
}
function clientDesktopChange(client) {
  if (client.oldScreen == void 0 || client.oldActivities == void 0 || client.oldDesktop == void 0 || !client.wasTiled) {
    client.oldDesktop = client.desktop;
    client.oldScreen = client.screen;
    client.oldActivities = new Array();
    for (const activity of client.activities)
      client.oldActivities.push(activity);
    return;
  }
  const vdesktop = client.oldDesktop;
  const oldScreen = client.oldScreen;
  const activities = index(client.oldActivities);
  client.oldDesktop = client.desktop;
  client.oldScreen = client.screen;
  client.oldActivities = new Array();
  for (const activity of client.activities)
    client.oldActivities.push(activity);
  printDebug("Desktop, screen, or activity changed on " + client.resourceClass, false);
  let oldDesktops = new Array();
  if (vdesktop == -1) {
    for (let i = 0; i < workspace.desktops; i += 1) {
      for (const activity of activities) {
        const desktop = new Desktop2(oldScreen, activity, i);
        oldDesktops.push(desktop);
      }
    }
  } else {
    for (const activity of activities) {
      const desktop = new Desktop2(oldScreen, activity, vdesktop);
      oldDesktops.push(desktop);
    }
  }
  engine.updateClientDesktop(client, oldDesktops);
  rebuildLayout();
}
function tileClient(client, tile, direction) {
  if (tile != void 0) {
    let currentDesktop = new Desktop2();
    let desktops = new Array();
    if (client.desktop == -1) {
      for (let i = 0; i < workspace.desktops; i += 1) {
        for (const activity of client.activities) {
          const desktop = new Desktop2(client.screen, activity, i);
          desktops.push(desktop);
        }
      }
    } else {
      for (const activity of client.activities) {
        const desktop = new Desktop2(client.screen, activity, client.desktop);
        desktops.push(desktop);
      }
    }
    for (const desktop of desktops) {
      if (desktop.toString() == currentDesktop.toString()) {
        engine.putClientInTile(client, tile, direction);
      } else {
        engine.addClient(client, desktop);
      }
    }
  } else if (client.lastTileCenter != void 0) {
    const currentDesktop = new Desktop2();
    let desktops = new Array();
    if (client.desktop == -1) {
      for (let i = 0; i < workspace.desktops; i += 1) {
        for (const activity of client.activities) {
          const desktop = new Desktop2(client.screen, activity, i);
          desktops.push(desktop);
        }
      }
    } else {
      for (const activity of client.activities) {
        const desktop = new Desktop2(client.screen, activity, client.desktop);
        desktops.push(desktop);
      }
    }
    let tile2 = workspace.tilingForScreen(client.screen).bestTileForPosition(client.lastTileCenter.x, client.lastTileCenter.y);
    if (tile2 == null) {
      tile2 = workspace.tilingForScreen(client.screen).rootTile;
    }
    for (const desktop of desktops) {
      if (desktop.toString() == currentDesktop.toString()) {
        const directionA = GeometryTools.directionFromPointInRect(tile2.absoluteGeometry, client.lastTileCenter);
        engine.putClientInTile(client, tile2, directionA);
      } else {
        engine.addClient(client, desktop);
      }
    }
  } else {
    engine.addClient(client);
  }
  if (config.unfullscreen) {
    const clientList = workspace.clientList();
    const desktop = new Desktop2();
    for (let i = 0; i < clientList.length; i += 1) {
      if (clientList[i].fullScreen == true && clientOnDesktop(clientList[i], desktop)) {
        clientList[i].fullScreen = false;
        client.refullscreen = clientList[i];
      }
    }
  }
  rebuildLayout();
}
function untileClient(client, keepWasTiled = false) {
  if (!keepWasTiled) {
    client.wasTiled = false;
  }
  client.tile = null;
  engine.removeClient(client);
  if (config.borders == 1 /* NoBorderTiled */) {
    client.noBorder = false;
  }
  if (config.keepTiledBelow) {
    client.keepBelow = false;
  }
  if (client.refullscreen != void 0) {
    client.refullscreen.fullScreen = true;
    client.refullscreen = void 0;
  }
  rebuildLayout();
}
function clientGeometryChange(client, _oldgeometry) {
  if (client.oldScreen != client.screen) {
    clientDesktopChange(client);
    return;
  }
  if (client.minimized || buildingLayout || client.maximized == true || client.fullScreen || client.isSingleTile)
    return;
  let desktop = new Desktop2();
  if (client.screen != desktop.screen || !client.activities.includes(desktop.activity) || !(client.desktop == desktop.desktop || client.desktop == -1))
    return;
  if (client.wasTiled && client.tile == null) {
    printDebug(client.resourceClass + " was moved out of a tile", false);
    untileClient(client);
  } else if (!client.wasTiled && client.tile != null) {
    printDebug(client.resourceClass + " was moved into a tile", false);
    tileClient(client, client.tile, GeometryTools.directionFromPointInRect(client.tile.absoluteGeometry, workspace.cursorPos));
  }
}
function clientQuickTiled(client) {
  if (client.tile == null || client.tile.generated || buildingLayout)
    return;
  printDebug(client.resourceClass + " has been quick tiled", false);
  const tileCenter = GeometryTools.rectCenter(client.tile.absoluteGeometry);
  untileClient(client);
  let tile = workspace.tilingForScreen(client.screen).bestTileForPosition(tileCenter.x, tileCenter.y);
  if (tile == null) {
    tile = workspace.tilingForScreen(client.screen).rootTile;
  }
  const direction = GeometryTools.directionFromPointInRect(workspace.virtualScreenGeometry, tileCenter);
  tileClient(client, tile, direction);
}
function addClient(client) {
  client.oldDesktop = client.desktop;
  client.oldScreen = client.screen;
  client.oldActivities = new Array();
  client.maximized = false;
  client.isSingleTile = false;
  for (const activity of client.activities)
    client.oldActivities.push(activity);
  if (config.borders == 0 /* NoBorderAll */ || config.borders == 2 /* BorderSelected */) {
    client.noBorder = true;
  }
  if (doTileClient(client)) {
    printDebug("Adding and tiling " + client.resourceClass, false);
    tileClient(client);
  } else {
    printDebug("Adding and not tiling " + client.resourceClass, false);
  }
}
function removeClient(client) {
  printDebug(client.resourceClass + " was removed", false);
  if (client.tile != null || client.wasTiled == true) {
    untileClient(client);
  }
}
function clientFullScreen(client) {
  if (!client.wasTiled)
    return;
  if (client.fullScreen) {
    printDebug(client.resourceClass + " enabled fullscreen", false);
    untileClient(client, true);
  } else {
    printDebug(client.resourceClass + " disabled fullscreen", false);
    tileClient(client);
  }
}
function clientMinimized(client) {
  if (!client.wasTiled)
    return;
  if (client.minimized) {
    printDebug(client.resourceClass + " was minimized", false);
    untileClient(client, true);
  } else {
    printDebug(client.resourceClass + " was unminimized", false);
    tileClient(client);
  }
}
function clientMaximized(client, h, v) {
  const maximized = h || v;
  client.maximized = maximized;
  if (!client.wasTiled)
    return;
  if (client.isSingleTile && maximized == false) {
    client.isSingleTile = false;
    return;
  } else if (client.isSingleTile) {
    client.wasTiled = true;
    return;
  }
  printDebug("Maximize mode on " + client.resourceClass + " was changed to " + maximized, false);
  if (!maximized) {
    tileClient(client);
  } else {
    untileClient(client);
  }
  client.wasTiled = true;
}
function clientActivated(client) {
  if (workspace.tmpLastActiveClient != null) {
    if (config.borders == 2 /* BorderSelected */) {
      workspace.tmpLastActiveClient.noBorder = true;
    }
    workspace.previousActiveClient = workspace.tmpLastActiveClient;
  }
  workspace.tmpLastActiveClient = client;
  if (config.borders == 2 /* BorderSelected */ && client.tile != null) {
    client.noBorder = false;
  }
}
function settingsDialogRemove(qmlDesktop) {
  const desktop = new Desktop2(qmlDesktop.screen, qmlDesktop.activity, qmlDesktop.desktop);
  printDebug("Removing settings for desktop " + desktop.toString(), false);
  if (engine.engineTypes.get(desktop.toString()) != config.defaultEngine) {
    const clients = engine.placeClients(desktop).map((x) => x[0]);
    for (const client of clients) {
      client.wasTiled = false;
      client.tile = null;
    }
    engine.setEngine(desktop, config.defaultEngine);
    for (const client of clients) {
      if (client != void 0) {
        engine.addClient(client, desktop);
      }
    }
  } else {
    engine.removeSettings(desktop);
  }
  rebuildLayout();
  if (dbusClientInstalled) {
    removeSettingsDbus.arguments = [desktop.toString()];
    removeSettingsDbus.call();
  }
}
function settingsDialogSave(settings, qmlDesktop) {
  const desktop = new Desktop2(qmlDesktop.screen, qmlDesktop.activity, qmlDesktop.desktop);
  printDebug("Settings saved as " + JSON.stringify(settings) + " for desktop " + desktop.toString(), false);
  if (engine.engineTypes.get(desktop.toString()) != settings.engine) {
    const clients = engine.placeClients(desktop).map((x) => x[0]);
    for (const client of clients) {
      client.wasTiled = false;
      client.tile = null;
    }
    engine.setEngine(desktop, settings.engine);
    for (const client of clients) {
      if (client != void 0) {
        engine.addClient(client, desktop);
      }
    }
  }
  engine.setSettings(desktop, settings);
  rebuildLayout();
  if (dbusClientInstalled) {
    setSettingsDbus.arguments = [desktop.toString(), JSON.stringify(settings)];
    setSettingsDbus.call();
  }
}

// src/shortcuts.ts
function invertDirection(direction) {
  switch (direction) {
    case 0 /* Above */:
      return 1 /* Below */;
    case 1 /* Below */:
      return 0 /* Above */;
    case 3 /* Right */:
      return 2 /* Left */;
    case 2 /* Left */:
      return 3 /* Right */;
  }
}
function retileWindow() {
  let client = workspace.activeClient;
  if (client == null)
    return;
  if (client.tile != null) {
    printDebug("Untiling client " + client.resourceClass, false);
    untileClient(client);
  } else {
    printDebug("Retiling client " + client.resourceClass, false);
    tileClient(client);
  }
}
function tileAbove(client) {
  if (client.tile == null)
    return null;
  let geometry = client.frameGeometry;
  let coordOffset = 1 + client.tile.padding;
  let x = geometry.x + 1;
  let y = geometry.y - coordOffset;
  let tile = workspace.tilingForScreen(client.screen).bestTileForPosition(x, y);
  if (tile == null || client.tile == tile) {
    return null;
  } else {
    return tile;
  }
}
function tileBelow(client) {
  if (client.tile == null)
    return null;
  let geometry = client.frameGeometry;
  let coordOffset = 1 + geometry.height + client.tile.padding;
  let x = geometry.x + 1;
  let y = geometry.y + coordOffset;
  let tile = workspace.tilingForScreen(client.screen).bestTileForPosition(x, y);
  if (tile == null || client.tile == tile) {
    return null;
  } else {
    return tile;
  }
}
function tileLeft(client) {
  if (client.tile == null)
    return null;
  let geometry = client.frameGeometry;
  let coordOffset = 1 + client.tile.padding;
  let x = geometry.x - coordOffset;
  let y = geometry.y + 1;
  let tile = workspace.tilingForScreen(client.screen).bestTileForPosition(x, y);
  if (tile == null || client.tile == tile) {
    return null;
  } else {
    return tile;
  }
}
function tileRight(client) {
  if (client.tile == null)
    return null;
  let geometry = client.frameGeometry;
  let coordOffset = 1 + geometry.width + client.tile.padding;
  let x = geometry.x + coordOffset;
  let y = geometry.y + 1;
  let tile = workspace.tilingForScreen(client.screen).bestTileForPosition(x, y);
  if (tile == null || client.tile == tile) {
    return null;
  } else {
    return tile;
  }
}
function tileInDirection(client, direction) {
  switch (direction) {
    case 0 /* Above */:
      return tileAbove(client);
    case 1 /* Below */:
      return tileBelow(client);
    case 2 /* Left */:
      return tileLeft(client);
    case 3 /* Right */:
      return tileRight(client);
    default:
      return null;
  }
}
function focus(direction) {
  const client = workspace.activeClient;
  if (client == null || client.tile == null)
    return;
  const tile = tileInDirection(client, direction);
  if (tile == null)
    return;
  let newClient = engine.clientOfTile(tile);
  if (newClient == null)
    return;
  printDebug("Focusing " + newClient.resourceClass + " from " + client.resourceClass, false);
  workspace.activeClient = newClient;
}
function swap(direction) {
  const client = workspace.activeClient;
  if (client == null || client.tile == null)
    return;
  const tile = tileInDirection(client, direction);
  if (tile == null)
    return;
  printDebug("Swapping windows with " + client.resourceClass, false);
  engine.swapTiles(client.tile, tile);
  rebuildLayout();
}
function insert(direction) {
  const client = workspace.activeClient;
  if (client == null || client.tile == null)
    return;
  const tile = tileInDirection(client, direction);
  if (tile == null)
    return;
  const tileGeometry = index(tile.absoluteGeometry);
  untileClient(client);
  let newTile = workspace.tilingForScreen(client.screen).bestTileForPosition(tileGeometry.x + 1, tileGeometry.y + 1);
  if (newTile == null) {
    newTile = workspace.tilingForScreen(client.screen).rootTile;
  }
  printDebug("Inserting " + client.resourceClass + " in tile " + newTile, false);
  const oldGeometry = index(client.frameGeometry);
  tileClient(client, newTile, directionToEngineDirection(invertDirection(direction)));
  if (oldGeometry.height == client.frameGeometry.height && oldGeometry.width == client.frameGeometry.width && oldGeometry.x == client.frameGeometry.x && oldGeometry.y == client.frameGeometry.y) {
    swap(direction);
  }
}
function cycleEngine() {
  const desktop = new Desktop2();
  const clients = engine.placeClients(desktop).map((x) => x[0]);
  for (const client of clients) {
    client.wasTiled = false;
    client.tile = null;
  }
  engine.cycleEngine(desktop);
  for (const client of clients) {
    if (client != void 0) {
      engine.addClient(client, desktop);
    }
  }
  rebuildLayout();
}
function directionToEngineDirection(direction) {
  switch (direction) {
    case 0 /* Above */:
      return new Direction(true, true, true);
    case 1 /* Below */:
      return new Direction(false, true, true);
    case 2 /* Left */:
      return new Direction(true, false, false);
    case 3 /* Right */:
      return new Direction(true, true, false);
  }
}
function resizeTile(direction) {
  if (workspace.activeClient == null)
    return;
  const activeTile = workspace.activeClient.tile;
  if (activeTile == null)
    return;
  engine.resizeTile(activeTile, directionToEngineDirection(direction), config.resizeAmount);
  rebuildLayout();
}
function showSettingsDialog() {
  if (!settingsDialog.isVisible()) {
    const settings = engine.getSettings(new Desktop2());
    if (settings != null) {
      settingsDialog.setSettings(settings);
    }
    settingsDialog.show();
  } else {
    settingsDialog.saveAndHide();
  }
}
function switchEngine(e) {
  const desktop = new Desktop2();
  const clients = engine.placeClients(desktop).map((x) => x[0]);
  for (const client of clients) {
    client.wasTiled = false;
    client.tile = null;
  }
  engine.setEngine(desktop, e, true);
  for (const client of clients) {
    if (client != void 0) {
      engine.addClient(client, desktop);
    }
  }
  rebuildLayout();
}

// src/index.ts
var workspace;
var options;
var kwin;
var print;
var createTimer;
var createDBusCall;
var showDialog;
var settingsDialog;
var dbusClientInstalled = false;
function init(api, qmlObjects) {
  workspace = api.workspace;
  options = api.options;
  kwin = api.kwin;
  print = qmlObjects.rootScript.printQml;
  createTimer = qmlObjects.rootScript.createTimer;
  createDBusCall = qmlObjects.rootScript.createDBusCall;
  showDialog = qmlObjects.dialog.show;
  settingsDialog = qmlObjects.settings;
  createConfig();
  options.configChanged.connect(createConfig);
  workspace.clientAdded.connect(addClient);
  workspace.clientRemoved.connect(removeClient);
  workspace.currentDesktopChanged.connect(currentDesktopChange);
  workspace.currentActivityChanged.connect(currentDesktopChange);
  workspace.clientActivated.connect(clientActivated);
  kwin.registerShortcut("PoloniumRetileWindow", "Polonium: Untile/Retile Window", "Meta+Shift+Space", retileWindow);
  kwin.registerShortcut("PoloniumCycleLayouts", "Polonium: Cycle layouts", "Meta+\\", cycleEngine);
  kwin.registerShortcut("PoloniumRebuildLayout", "Polonium: Rebuild Layout", "Meta+Ctrl+Space", rebuildLayout);
  kwin.registerShortcut("PoloniumShowSettings", "Polonium: Show Settings Dialog", "Meta+|", showSettingsDialog);
  kwin.registerShortcut("PoloniumFocusAbove", "Polonium: Focus Above", "Meta+K", focus.bind(this, 0 /* Above */));
  kwin.registerShortcut("PoloniumSwapAbove", "Polonium: Swap Above", "Ctrl+Meta+K", swap.bind(this, 0 /* Above */));
  kwin.registerShortcut("PoloniumInsertAbove", "Polonium: Insert Above", "Meta+Shift+K", insert.bind(this, 0 /* Above */));
  kwin.registerShortcut("PoloniumFocusBelow", "Polonium: Focus Below", "Meta+J", focus.bind(this, 1 /* Below */));
  kwin.registerShortcut("PoloniumSwapBelow", "Polonium: Swap Below", "Ctrl+Meta+J", swap.bind(this, 1 /* Below */));
  kwin.registerShortcut("PoloniumInsertBelow", "Polonium: Insert Below", "Meta+Shift+J", insert.bind(this, 1 /* Below */));
  kwin.registerShortcut("PoloniumFocusLeft", "Polonium: Focus Left", "Meta+H", focus.bind(this, 2 /* Left */));
  kwin.registerShortcut("PoloniumSwapLeft", "Polonium: Swap Left", "Ctrl+Meta+H", swap.bind(this, 2 /* Left */));
  kwin.registerShortcut("PoloniumInsertLeft", "Polonium: Insert Left", "Meta+Shift+H", insert.bind(this, 2 /* Left */));
  kwin.registerShortcut("PoloniumFocusRight", "Polonium: Focus Right", "Meta+L", focus.bind(this, 3 /* Right */));
  kwin.registerShortcut("PoloniumSwapRight", "Polonium: Swap Right", "Ctrl+Meta+L", swap.bind(this, 3 /* Right */));
  kwin.registerShortcut("PoloniumInsertRight", "Polonium: Insert Right", "Meta+Shift+L", insert.bind(this, 3 /* Right */));
  kwin.registerShortcut("PoloniumResizeTileUp", "Polonium: Resize Tile Up", "Meta+Shift+Up", resizeTile.bind(this, 0 /* Above */));
  kwin.registerShortcut("PoloniumResizeTileDown", "Polonium: Resize Tile Down", "Meta+Shift+Down", resizeTile.bind(this, 1 /* Below */));
  kwin.registerShortcut("PoloniumResizeTileLeft", "Polonium: Resize Tile Left", "Meta+Shift+Left", resizeTile.bind(this, 2 /* Left */));
  kwin.registerShortcut("PoloniumResizeTileRight", "Polonium: Resize Tile Right", "Meta+Shift+Right", resizeTile.bind(this, 3 /* Right */));
  kwin.registerShortcut("PoloniumEngineBTree", "Polonium: Switch to BTree Engine", "", switchEngine.bind(this, 0));
  kwin.registerShortcut("PoloniumEngineHalf", "Polonium: Switch to Half Engine", "", switchEngine.bind(this, 1));
  kwin.registerShortcut("PoloniumEngineThreeColumn", "Polonium: Switch to Three Column Engine", "", switchEngine.bind(this, 2));
  kwin.registerShortcut("PoloniumEngineMonocle", "Polonium: Switch to Monocle Engine", "", switchEngine.bind(this, 3));
  kwin.registerShortcut("PoloniumEngineKWin", "Polonium: Switch to KWin Engine", "", switchEngine.bind(this, 4));
  workspace.lastActiveScreen = workspace.activeScreen;
  workspace.lastActivity = workspace.currentActivity;
  workspace.lastDesktop = workspace.currentDesktop;
  initMain();
  rebuildLayout();
  settingsDialog.saveSettings.connect(settingsDialogSave);
  settingsDialog.removeSettings.connect(settingsDialogRemove);
  let checkCall = createDBusCall();
  checkCall.service = "org.polonium.SettingSaver";
  checkCall.path = "/saver";
  checkCall.dbusInterface = "org.polonium.SettingSaver";
  checkCall.method = "Exists";
  checkCall.finished.connect((returnValues) => {
    dbusClientInstalled = returnValues[0];
    printDebug("DBus service is installed", false);
  });
  checkCall.call();
}
export {
  createDBusCall,
  createTimer,
  dbusClientInstalled,
  init,
  kwin,
  options,
  print,
  settingsDialog,
  showDialog,
  workspace
};

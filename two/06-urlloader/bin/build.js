/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//自己实现的模块

function add(a, b) {
    return (a - 0) + (b - 0)
}

function sub(a, b) {
    return (a - 0) - (b - 0)
}

// module.exports = {
//     add: add,
//     sub: sub
// }

//简写方式
//导出模块 模块对象具有两个方法 add, sub
module.exports = {
    add,
    sub
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(10)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./style.css", function() {
			var newContent = require("!!./node_modules/css-loader/index.js!./node_modules/autoprefixer-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(3)
var ieee754 = __webpack_require__(5)
var isArray = __webpack_require__(6)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//webpack app.js build.js
//把app.js 以及app.js中引用到的模块,打包到build.js中
//如果app.js和模块的代码发生变化,需要重新打包


//加载css模块

// 你可能需要一个合适的loader处理 这种文件类型
// You may need an appropriate loader to handle this file type.
__webpack_require__(1);


//实现页面上的加法运算

//使用模块中提供的加法功能,导入模块
//webpack2默认支持es6语法
const math = __webpack_require__(0);//可省略.js

//获取元素

let span = document.getElementById('result');

//给按钮注册事件
let btn = document.getElementById('btn');

btn.onclick = function() {
    let t1 = document.getElementById('txt1').value;
    let t2 = document.getElementById('txt2').value;

    span.innerHTML = math.add(t1, t2);
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(undefined);
// imports


// module
exports.push([module.i, "body{\r\n    background-color: skyblue;\r\n    background-image: url(" + __webpack_require__(12) + ");\r\n}\r\n\r\na {\r\n    transition: -webkit-transform 1s;\r\n    transition: transform 1s;\r\n    transition: transform 1s, -webkit-transform 1s;\r\n    border-radius: 5px;\r\n}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap) {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
  var base64 = new Buffer(JSON.stringify(sourceMap)).toString('base64');
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

  return '/*# ' + data + ' */';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4).Buffer))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(11);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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U3v/APtyCCCCCO+++6CD9tLCS2+++OCpCVCBCyyhylaHiCBCCCCGe+++yCDf999LDC2++++lCcJTCCCxCBCpCQJCCGe++++iCDf9R999LDCS2+62P888f7IhCZCvKPMP+++++yCCHd99BR999vDCCy188888885AOtK4+P3j+++yCCDP999xBBB1999PDU88888888j8P9pr1V496yCDBHf999hBtBBBR9999l88888888n8nWp8fvfCBCDTV9995BBB9tBBBBx9938888888708XEy/8880Mrz+d95hBBBN899JBBBBxe/888888v8AO/JwFuPPPPPPOOYQQQRXfdPPfbSQQQQ6d/8Az9/3/wA/8sd5FdZbz8wwBBBBN998AQ8899tJBBRjFHEyUnQGzgdp9hWxhwBBBBN99984AAA08899tNBBg18vro5/j0PfvfoBBBBFN99984gAOAAAQ088999NNBBBDJ0AATAQ/RBBFN999988wAAA+uIAAAQw8899999NNNNNOcuetN99999884wAAAAO+++uKAAAAw088899999999999998888wgAAAAO++C2+++uKAAAAAQw0888888888888wwAAAAAAO++++CCS2+++uOCAAAAAAAAAQwwAAAAAAAAAAGe++++yC/8QAJhEBAAICAgEDBAMBAAAAAAAAAQARITEQQUAgUWEwUHGRcIHRof/aAAgBAwEBPxD7r3B7/H2eyo5KiFOmDrZvrERI/ZU7w7ht4fmELvyzKzuT3+PsJRst+qmFGxyejqKmnJUB1mWdtvtojstnqrT3Guuh+/HBzQkwZiUOjVXLd/b/AHlj+07hN4fmXD/LN8Mx2Kz/ALMgE1NcEwaaMMQ4mbhTfv8AuEEaeMRRs+Z1YR5d8vtwFQwlRAU1H14zLqtXymWZI4qojvyHfBvkjge4fTPuOAau/wAzHPEfQbj5Dvg3z1EIunX9QAXK41sorfdxKa4fQb8l3wb5Yt2xgxa/8lo0o7jALoZorWz/ACFWg5PJd8G+XfJvgDayWS0pCkFu3PXku+DfBv0HFudTBVn6iqlrz15LKuF2p8Eo69HXBx1wAvUAKWP2eThgA16EHcU1wDx1wJASg0QT2FjmWEqLsHse78evL6DL8kSo8UL4SXT2hVlXLg10eNiPovA5RzDYIlkRGmdcPoNgjjwRi/on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"

/***/ })
/******/ ]);
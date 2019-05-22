// 'use strict'

var utils = require('./utils')
var mapHueToColor = utils.mapHueToColor
var getGradient = utils.getGradient

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var React = _interopDefault(require('react'))

/**
 * Modified version of Lea Verou's
 * {@link https://github.com/leaverou/conic-gradient conic-gradient}.
 *
 * @example
 * paintColorWheelToCanvas(document.querySelector('#canvas'), 250);
 *
 * @param   {HTMLCanvasElement} canvas Canvas to paint the color wheel
 * @param   {Number}            size   Color wheel radius in pixels
 * @returns {HTMLCanvasElement} canvas The passed canvas for easier chaining
 */
function paintColorWheelToCanvas(canvas, size) {
  var half = size / 2
  var radius = Math.sqrt(2) * half
  var deg = Math.PI / 180
  var pi2 = Math.PI * 2

  canvas.width = canvas.height = size
  var ctx = canvas.getContext('2d')

  // .02: To prevent empty blank line and corresponding moire
  // only non-alpha colors are cared now
  var thetaOffset = 0.5 * deg + 0.02

  // Transform coordinate system so that angles start from the top left, like in CSS
  ctx.translate(half, half)
  ctx.rotate(-Math.PI / 2)
  ctx.translate(-half, -half)

  for (var i = 0; i < 30; i += 0.5) {
    const h = i + 60
    const s = 60 - i / 3
    ctx.fillStyle = `hsl(${h}, ${s}%, 60%)`

    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = (i / 2) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 30; i < 60; i += 0.5) {
    const h = i + 60
    ctx.fillStyle = `hsl(${h}, 50%, 60%)`
    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = (i / 2) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 60; i < 90; i += 0.5) {
    const h = i + 60
    ctx.fillStyle = `hsl(${h}, 50%, 60%)`
    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = (i / 2) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 90; i < 120; i += 0.5) {
    const h = i + 60
    const s = 50 + (i - 90) / 3
    const l = 60 - (i - 90) / 3
    ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`
    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = (i / 2) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 120; i <= 120; i += 0.5) {
    const h = i + 60
    ctx.fillStyle = `hsl(${h}, 60%, 50%)`
    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = (i / 2) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset * 25)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 120; i < 180; i += 0.5) {
    const h = i + 60
    const s = 50 + (180 - i) / 6
    const l = 40 + (180 - i) / 6
    ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`
    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = ((i * 300) / 360) * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 215; i < 280; i += 0.5) {
    const h = 360 + (i - 215) * (-30 / (280 - 215))
    const s = 60 + ((i - 215) * 40) / (280 - 215)
    const l = 50 + ((i - 215) * 30) / (280 - 215)

    ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`

    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = i * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 280; i < 300; i += 0.5) {
    const h = 330 + ((i - 280) * 30) / (300 - 280)
    // const s = 100 + (i - 280) * (-40 / (360 - 280))
    const s = 100
    // const l = 80 + (i - 280) * (-30 / (360 - 280))
    const l = 80

    ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`
    // from 330 100 80

    // 390 60 60

    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = i * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  for (i = 300; i < 360; i += 0.5) {
    const h = i - 300
    const s = 100 + (i - 300) * (-40 / (360 - 300))
    const l = 80 + (i - 300) * (-20 / (360 - 300))

    ctx.fillStyle = `hsl(${h}, ${s}%, ${l}%)`
    // from 330 100 80

    // 390 60 60

    ctx.beginPath()
    ctx.moveTo(half, half)

    const beginArg = i * deg
    const endArg = Math.min(pi2, beginArg + thetaOffset)

    ctx.arc(half, half, radius, beginArg, endArg)

    ctx.closePath()
    ctx.fill()
  }

  return canvas
}

var TO_DEGREES = 180 / Math.PI

var normalizeAngle = function normalizeAngle(angle) {
  var mod = angle % 360
  if (mod < 215 && mod > 180) {
    mod = 215
  } else if (mod > 142 && mod <= 180) {
    mod = 142
  }

  return mod < 0 ? 360 + mod : mod
}

var getRotationFromCoords = function getRotationFromCoords(_ref, rect) {
  var x = _ref.x,
    y = _ref.y

  var cx = rect.left + rect.width / 2
  var cy = rect.top + rect.height / 2

  // this.setState({ x, y })

  return Math.atan2(y - cy, x - cx) * TO_DEGREES
}

var noop = function noop() {}

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

/**
 * Modified version of Denis Radin's
 * {@link https://github.com/PixelsCommander/Propeller Propeller}.
 */

var Rotator = (function() {
  function Rotator(element, options) {
    _classCallCheck(this, Rotator)

    this.active = false
    this._angle = 0
    this.element = element
    this.element.style.willChange = 'transform'

    this.initOptions(options)
    this.updateCSS()
    this.bindHandlers()
    this.addListeners()
  }

  _createClass(Rotator, [
    {
      key: 'initOptions',
      value: function initOptions(options) {
        options = options || {}

        this.onRotate = options.onRotate || noop
        this.onDragStart = options.onDragStart || noop
        this.onDragStop = options.onDragStop || noop

        this._angle = options.angle || 0
      },
    },
    {
      key: 'bindHandlers',
      value: function bindHandlers() {
        this.onRotationStart = this.onRotationStart.bind(this)
        this.onRotated = this.onRotated.bind(this)
        this.onRotationStop = this.onRotationStop.bind(this)
      },
    },
    {
      key: 'addListeners',
      value: function addListeners() {
        this.element.addEventListener('touchstart', this.onRotationStart, {
          passive: true,
        })
        this.element.addEventListener('touchmove', this.onRotated)
        this.element.addEventListener('touchend', this.onRotationStop, {
          passive: true,
        })
        this.element.addEventListener('touchcancel', this.onRotationStop, {
          passive: true,
        })

        this.element.addEventListener('mousedown', this.onRotationStart, {
          passive: true,
        })
        this.element.addEventListener('mousemove', this.onRotated)
        this.element.addEventListener('mouseup', this.onRotationStop, {
          passive: true,
        })
        this.element.addEventListener('mouseleave', this.onRotationStop)
      },
    },
    {
      key: 'removeListeners',
      value: function removeListeners() {
        this.element.removeEventListener('touchstart', this.onRotationStart)
        this.element.removeEventListener('touchmove', this.onRotated)
        this.element.removeEventListener('touchend', this.onRotationStop)
        this.element.removeEventListener('touchcancel', this.onRotationStop)

        this.element.removeEventListener('mousedown', this.onRotationStart)
        this.element.removeEventListener('mousemove', this.onRotated)
        this.element.removeEventListener('mouseup', this.onRotationStop)
        this.element.removeEventListener('mouseleave', this.onRotationStop)
      },
    },
    {
      key: 'destroy',
      value: function destroy() {
        this.onRotationStop()
        this.removeListeners()
      },
    },
    {
      key: 'onRotationStart',
      value: function onRotationStart(event) {
        this.initDrag()
        this.onDragStart(event)
      },
    },
    {
      key: 'onRotationStop',
      value: function onRotationStop() {
        if (this.active) {
          this.active = false
          this.onDragStop()
        }

        this.active = false
      },
    },
    {
      key: 'onRotated',
      value: function onRotated(event) {
        if (this.active) {
          event.preventDefault()

          var point = event.targetTouches ? event.targetTouches[0] : event

          this.updateAngleToMouse({
            x: point.clientX,
            y: point.clientY,
          })

          this.updateCSS()
          this.onRotate(this._angle)
        }
      },
    },
    {
      key: 'setAngleFromEvent',
      value: function setAngleFromEvent(ev) {
        var newAngle = getRotationFromCoords(
          { x: ev.clientX, y: ev.clientY },
          this.element.getBoundingClientRect(),
        )

        // atan2 gives values between -180 to 180 deg
        // add 90 degrees offset so that it starts from 0 deg (or red)
        // and then normalize negative values
        this._angle = normalizeAngle(newAngle + 90)

        this.updateCSS()
        this.onRotate(this._angle)
      },
    },
    {
      key: 'updateAngleToMouse',
      value: function updateAngleToMouse(newPoint) {
        var newMouseAngle = getRotationFromCoords(newPoint, this.element.getBoundingClientRect())

        if (!this.lastMouseAngle) {
          this.lastElementAngle = this._angle
          this.lastMouseAngle = newMouseAngle
        }

        this._angle = normalizeAngle(this.lastElementAngle + newMouseAngle - this.lastMouseAngle)
      },
    },
    {
      key: 'initDrag',
      value: function initDrag() {
        this.active = true
        this.lastMouseAngle = undefined
        this.lastElementAngle = undefined
      },
    },
    {
      key: 'updateCSS',
      value: function updateCSS() {
        this.element.style.transform = 'rotate(' + this._angle + 'deg)'
      },
    },
    {
      key: 'angle',
      get: function get() {
        return this._angle
      },
      set: function set(value) {
        if (this._angle !== value) {
          this._angle = normalizeAngle(value)
          this.updateCSS()
        }
      },
    },
  ])

  return Rotator
})()

function styleInject(css, ref) {
  if (ref === void 0) ref = {}
  var insertAt = ref.insertAt

  if (!css || typeof document === 'undefined') {
    return
  }

  var head = document.head || document.getElementsByTagName('head')[0]
  var style = document.createElement('style')
  style.type = 'text/css'

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild)
    } else {
      head.appendChild(style)
    }
  } else {
    head.appendChild(style)
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}

var css =
  ".color-picker {\n  display: block;\n  overflow: hidden;\n  width: 280px;\n  height: 280px;\n  position: absolute; }\n  .color-picker:focus {\n    outline: 0; }\n    .color-picker:focus .knob {\n      box-shadow: 0 0 30px rgba(0, 0, 0, 0.38), 0 0 15px rgba(0, 0, 0, 0.48); }\n  .color-picker,\n  .color-picker .palette,\n  .color-picker .rotator,\n  .color-picker .selector,\n  .color-picker .ripple,\n  .color-picker .knob {\n    -webkit-touch-callout: none;\n    -webkit-tap-highlight-color: transparent;\n    user-select: none;\n    box-sizing: border-box; }\n    .color-picker::before,\n    .color-picker .palette::before,\n    .color-picker .rotator::before,\n    .color-picker .selector::before,\n    .color-picker .ripple::before,\n    .color-picker .knob::before {\n      box-sizing: border-box; }\n  .color-picker .palette {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%;\n    background-size: 100% 100%;\n    border-radius: 50%;\n    overflow: hidden;\n    will-change: transform, opacity;\n    transition: transform 0.5s cubic-bezier(0.35, 0, 0.25, 1), opacity 0.5s cubic-bezier(0.35, 0, 0.25, 1); }\n    .color-picker .palette::before {\n      content: '';\n      display: block;\n      position: absolute;\n      width: 76%;\n      height: 76%;\n      top: 12%;\n      left: 12%;\n      background-color: #fff;\n      border-radius: 50%; }\n    .color-picker .palette.is-in {\n      transform: scale(1);\n      opacity: 1; }\n    .color-picker .palette.is-out {\n      transform: scale(0);\n      opacity: 0; }\n  .color-picker .rotator {\n    width: 100%;\n    height: 100%;\n    position: absolute; }\n    .color-picker .rotator.dragging {\n      z-index: 1; }\n    .color-picker .rotator.disabled {\n      pointer-events: none; }\n  .color-picker .knob {\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12), 0 0 5px rgba(0, 0, 0, 0.16);\n    border-radius: 50%;\n    position: absolute;\n    width: 7%;\n    height: 7%;\n    top: 2.5%;\n    left: 46.5%;\n    background-color: #fff;\n    transition: transform 0.4s cubic-bezier(0.35, 0, 0.25, 1);\n    outline: 0;\n    border-style: none; }\n    .color-picker .knob.is-in {\n      transform: scale(1); }\n    .color-picker .knob.is-out {\n      transform: scale(0); }\n  .color-picker:not(:focus) .knob:hover {\n    box-shadow: 0 0 50px rgba(0, 0, 0, 0.19), 0 0 15px rgba(0, 0, 0, 0.24); }\n  .color-picker .selector {\n    position: absolute;\n    width: 70%;\n    height: 70%;\n    top: 15%;\n    left: 15%;\n    padding: 0;\n    margin: 0;\n    border-radius: 50%;\n    background-color: #ff0000;\n    outline: 0;\n    cursor: pointer;\n    transition: transform 0.7s cubic-bezier(0.35, 0, 0.25, 1);\n    will-change: transform;\n    overflow: visible;\n    border: 6px solid #fff;\n }\n    .color-picker .selector::-moz-focus-inner {\n      border: 0; }\n    .color-picker .selector:hover {\n      box-shadow: 0 0 1px 1px #333; }\n    .color-picker .selector:focus {\n      box-shadow: 0 0 1px 2px #b2b2b2; }\n    .color-picker .selector.is-pressed {\n      animation: color-picker-beat 0.4s cubic-bezier(0.35, 0, 0.25, 1) forwards; }\n  .color-picker .ripple {\n    width: 20%;\n    height: 20%;\n    border-radius: 50%;\n    border: #ff0000 solid 8px;\n    opacity: 0;\n    position: absolute;\n    top: 40%;\n    left: 40%;\n    z-index: -1; }\n  .color-picker .is-rippling {\n    z-index: 0;\n    animation: color-picker-ripple 0.5s cubic-bezier(0.35, 0, 0.25, 1) forwards; }\n\n@keyframes color-picker-ripple {\n  0% {\n    transform: scale(1);\n    opacity: .3; }\n  50% {\n    opacity: .1; }\n  100% {\n    opacity: 0;\n    border-width: 0;\n    transform: scale(3.8); } }\n\n@keyframes color-picker-beat {\n  0% {\n    transform: scale(1); }\n  25% {\n    transform: scale(0.8); }\n  50% {\n    transform: scale(1); }\n  100% {\n    transform: scale(1); } }\n"
styleInject(css)

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass,
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  }

  return call && (typeof call === 'object' || typeof call === 'function') ? call : self
}

var noop$1 = function noop() {}

var ColorPicker = (function(_React$Component) {
  inherits(ColorPicker, _React$Component)

  function ColorPicker() {
    var _ref

    var _temp, _this, _ret

    classCallCheck(this, ColorPicker)

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = possibleConstructorReturn(
        this,
        (_ref = ColorPicker.__proto__ || Object.getPrototypeOf(ColorPicker)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
      _this)),
      (_this.paletteRef = React.createRef()),
      (_this.rotatorRef = React.createRef()),
      (_this.rotator = null),
      (_this.state = {
        isKnobIn: true,
        isPaletteIn: true,
        isPressed: false,
        isRippling: false,
        isDisabled: false,
        isDragging: false,
      }),
      (_this.onScroll = function(ev) {
        if (_this.state.isDisabled) return

        ev.preventDefault()
        // _this.setState({ x: newPoint.x, y: newPoint.y })

        if (ev.deltaY > 0) {
          _this.rotator.angle += _this.props.step
        } else {
          _this.rotator.angle -= _this.props.step
        }
        _this.updateColor(_this.rotator.angle)
      }),
      (_this.onKeyUp = function(ev) {
        if (ev.key === 'Enter') {
          _this.selectColor()
        }
      }),
      (_this.onKeyDown = function(ev) {
        if (_this.state.isDisabled) return

        var isIncrementing = ev.key === 'ArrowUp' || ev.key === 'ArrowRight'
        var isDecrementing = ev.key === 'ArrowDown' || ev.key === 'ArrowLeft'

        if (isIncrementing || isDecrementing) {
          ev.preventDefault()

          var multiplier = isIncrementing ? 1 : -1

          if (ev.ctrlKey) {
            multiplier *= 6
          } else if (ev.shiftKey) {
            multiplier *= 3
          }

          _this.rotator.angle += _this.props.step * multiplier
          _this.updateColor(_this.rotator.angle)
        }
      }),
      (_this.updateColor = function(hue) {
        var _this$props = _this.props,
          saturation = _this$props.saturation,
          luminosity = _this$props.luminosity,
          alpha = _this$props.alpha

        _this.props.onChange({
          hue: hue,
          saturation: saturation,
          luminosity: luminosity,
          alpha: alpha,
        })
      }),
      (_this.rotateToMouse = function(ev) {
        if (_this.isDisabled || ev.target !== _this.rotatorRef.current) return

        _this.rotator.setAngleFromEvent(ev)
      }),
      (_this.selectColor = function() {
        // _this.setState({ isPressed: true })

        if (!_this.state.isDisabled) {
          var _this$props2 = _this.props,
            hue = _this$props2.hue,
            saturation = _this$props2.saturation,
            luminosity = _this$props2.luminosity,
            alpha = _this$props2.alpha

          _this.props.onSelect({
            hue: hue,
            saturation: saturation,
            luminosity: luminosity,
            alpha: alpha,
          })

          _this.setState({ isRippling: true })
        } else {
          _this.setState({ isPaletteIn: true })
        }
      }),
      (_this.togglePicker = function() {
        _this.setState({
          isKnobIn: _this.state.isDisabled,
          isPressed: false,
        })
      }),
      (_this.hidePalette = function() {
        if (!_this.state.isDisabled) {
          _this.setState({ isPaletteIn: false })
        } else {
          _this.setState({ isDisabled: false })
        }
      }),
      (_this.stopRipple = function() {
        _this.setState({ isRippling: false })
      }),
      (_this.toggleKnob = function(ev) {
        // 'transitionend' fires for every transitioned property
        if (ev.propertyName === 'transform') {
          if (_this.state.isDisabled) {
            _this.setState({ isKnobIn: true })
          } else {
            _this.setState({ isDisabled: true })
          }
        }
      }),
      _temp)),
      possibleConstructorReturn(_this, _ret)
    )
  }

  createClass(ColorPicker, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this

        if (this.props.mouseScroll) {
          this.rotatorRef.current.addEventListener('wheel', this.onScroll)
        }

        paintColorWheelToCanvas(this.paletteRef.current, this.paletteRef.current.offsetWidth || 280)

        this.rotator = new Rotator(this.rotatorRef.current, {
          angle: this.props.hue,
          onRotate: this.updateColor,
          onDragStart: function onDragStart() {
            _this2.setState({ isDragging: true })
          },
          onDragStop: function onDragStop() {
            _this2.setState({ isDragging: false })
          },
        })
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.hue !== prevProps.hue) {
          this.rotator.angle = this.props.hue
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.rotator.destroy()
        this.rotator = null

        if (this.props.mouseScroll) {
          this.rotatorRef.current.removeEventListener('wheel', this.onScroll)
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _state = this.state,
          isRippling = _state.isRippling,
          isPressed = _state.isPressed,
          isPaletteIn = _state.isPaletteIn,
          isDragging = _state.isDragging,
          isKnobIn = _state.isKnobIn,
          isDisabled = _state.isDisabled
        var _props = this.props,
          hue = _props.hue
        //   saturation = _props.saturation,
        //   luminosity = _props.luminosity,
        //   alpha = _props.alpha

        var paletteClassName = 'palette ' + (isPaletteIn ? 'is-in' : 'is-out')
        var colorSelClassName = 'selector ' + (isPressed ? 'is-pressed' : '')
        var colorShadowClassName = 'ripple ' + (isRippling ? 'is-rippling' : '')
        var rotatorClassName =
          'rotator ' + (isDisabled ? 'disabled' : '') + ' ' + (isDragging ? 'dragging' : '')
        var knobClassName = 'knob ' + (isKnobIn ? 'is-in' : 'is-out')
        // var color = 'hsla(' + hue + ', ' + saturation + '%, ' + luminosity + '%, ' + alpha + ')'
        var color = mapHueToColor(hue)
        var gradient = getGradient(_props.hue, _props.hue2)

        return React.createElement(
          'div',
          {
            className: 'color-picker',
            tabIndex: '0',
            onKeyUp: this.onKeyUp,
            onKeyDown: this.onKeyDown,
          },
          React.createElement(
            'div',
            { className: paletteClassName, onTransitionEnd: this.toggleKnob },
            React.createElement('canvas', { ref: this.paletteRef }),
          ),
          React.createElement(
            'div',
            {
              ref: this.rotatorRef,
              className: rotatorClassName,
              onDoubleClick: this.rotateToMouse,
            },
            React.createElement('div', {
              onTransitionEnd: this.hidePalette,
              className: knobClassName,
            }),
          ),
          React.createElement('div', {
            className: colorShadowClassName,
            style: { borderColor: color },
            onAnimationEnd: this.stopRipple,
          }),
          React.createElement('button', {
            type: 'button',
            className: colorSelClassName,
            style: {
              backgroundColor: color,
              backgroundImage: gradient,
            },
            onClick: this.selectColor,
            onAnimationEnd: this.togglePicker,
          }),
        )
      },
    },
  ])
  return ColorPicker
})(React.Component)

ColorPicker.defaultProps = {
  hue: 0,
  saturation: 100,
  luminosity: 50,
  alpha: 1,
  step: 2,
  mouseScroll: false,
  onChange: noop$1,
  onSelect: noop$1,
}

module.exports = ColorPicker

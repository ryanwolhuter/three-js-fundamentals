import { MathUtils } from "three"

export function makeXYZGUI(gui, vector3, name, onChangeFn) {
  const folder = gui.addFolder(name)
  folder.add(vector3, 'x', -10, 10).onChange(onChangeFn)
  folder.add(vector3, 'y', 0, 10).onChange(onChangeFn)
  folder.add(vector3, 'z', -10, 10).onChange(onChangeFn)
  folder.open()
}

export function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement
  const pixelRatio = window.devicePixelRatio
  const width = canvas.clientWidth * pixelRatio | 0
  const height = canvas.clientHeight * pixelRatio | 0
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
  }
  return needResize
}

export function makeAxisGrid(node, label, units) {
  const helper = new AxisGridHelper(node, units)
  gui.add(helper, 'visible').name(label)
}

/* Turns both axes and grid visible on/off
dat.GUI requires a property that returns a bool
to decide to make a checkbox so we make a setter
and getter for `visible` which can can tell dat.GUI
to look at */
export class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 2
    node.add(axes)

    const grid = new THREE.GridHelper(units, units)
    grid.material.depthTest = false
    grid.renderOrder = 1
    node.add(grid)

    this.grid = grid
    this.axes = axes
    this.visible = false
  }

  get visible() {
    return this._visible
  }
  set visible(v) {
    this._visible = v
    this.grid.visible = v
    this.axes.visible = v
  }
}

export class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object
    this.prop = prop
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`
  }
  set value(hexString) {
    this.object[this.prop].set(hexString)
  }
}

export class DegRadHelper {
  constructor(obj, prop) {
    this.obj = obj
    this.prop = prop
  }

  get value() {
    return MathUtils.radToDeg(this.obj[this.prop])
  }
  set value(v) {
    this.obj[this.prop] = MathUtils.degToRad(v)
  }
}

export class StringToNumberHelper {
  constructor(obj, prop) {
    this.obj = obj
    this.prop = prop
  }
  get value() {
    return this.obj[this.prop]
  }
  set value(v) {
    this.obj[this.prop] = parseFloat(v)
  }
}

export class MinMaxGUIHelper {
  constructor(obj, minProp, maxProp, minDif) {
    this.obj = obj
    this.minProp = minProp
    this.maxProp = maxProp
    this.minDif = minDif
  }

  get min() {
    return this.obj[this.minProp]
  }
  set min(v) {
    this.obj[this.minProp] = v
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif)
  }
  get max() {
    return this.obj[this.maxProp]
  }
  set max(v) {
    this.obj[this.maxProp] = v
    this.min = this.min
  }
}
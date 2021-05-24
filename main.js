import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { Object3D, SplineCurve } from 'three'

const gui = new dat.GUI()

/* Turns both axes and grid visible on/off
dat.GUI requires a property that returns a bool
to decide to make a checkbox so we make a setter
and getter for `visible` which can can tell dat.GUI
to look at */
class AxisGridHelper {
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

function main() {
  console.log('starting...')

  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ canvas })
  const scene = new THREE.Scene()

  

  const fov = 40
  const aspect = 2
  const near = 0.1
  const far = 1000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  renderer.render(scene, camera)

  function resizeRendererToDisplaySize(renderer) {
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

  function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units)
    gui.add(helper, 'visible').name(label)
  }

  function render(time) {
    time *= 0.001

    // move target
    targetOrbit.rotation.y = time * .27
    targetBob.position.y = Math.sin(time * 2) * 4
    targetMesh.rotation.x = time * 7
    targetMesh.rotation.y = time * 13
    targetMaterial.emissive.setHSL(time * 10 % 1, 1, .25)
    targetMaterial.color.setHSL(time * 10 % 1, 1, .25)

    // move tank
    const tankTime = time * 0.5
    curve.getPointAt(tankTime % 1, tankPosition)
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget)
    tank.position.set(tankPosition.x, 0, tankPosition.y)
    tank.lookAt(tankTarget.x, 0, tankTarget.y)

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()
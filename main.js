
import './style.css'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function main() {

  const canvas = document.querySelector('#c')
  const renderer = new WebGLRenderer({ canvas })

  const fov = 45
  const aspect = 2  // the canvas default
  const near = 0.1
  const far = 100
  const camera = new PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 10, 20)

  const scene = new Scene()

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 5, 0)
  controls.update()

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }
    return needResize
  }

  function render(time) {
    time *= 0.001

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

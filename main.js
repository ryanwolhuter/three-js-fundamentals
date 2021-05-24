import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { resizeRendererToDisplaySize } from 'helpers'

const gui = new dat.GUI()

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

  function render(time) {

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
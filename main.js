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
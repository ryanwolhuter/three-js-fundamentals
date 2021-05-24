
import './style.css'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  BoxGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh
}from 'three'

function main() {
  const canvas = document.querySelector('#c')
  const renderer = new WebGLRenderer({ canvas })

  const fov = 75
  const aspect = 2  // the canvas default
  const near = 0.1
  const far = 5
  const camera = new PerspectiveCamera(fov, aspect, near, far)
  camera.position.z = 2

  const scene = new Scene()

  const boxWidth = 1
  const boxHeight = 1
  const boxDepth = 1
  const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth)

  const cubes = []  // just an array we can use to rotate the cubes
  const loader = new TextureLoader()

  const material = new MeshBasicMaterial({
    map: loader.load('./wall.jpeg'),
  })
  const cube = new Mesh(geometry, material)
  scene.add(cube)
  cubes.push(cube)  // add to our list of cubes to rotate

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

    cubes.forEach((cube, ndx) => {
      const speed = .2 + ndx * .1
      const rot = time * speed
      cube.rotation.x = rot
      cube.rotation.y = rot
    })

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

main()

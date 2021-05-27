
import './style.css'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  PlaneGeometry,
  MeshPhongMaterial,
  DoubleSide,
  Mesh,
  Box2,
  BoxGeometry,
  Sphere,
  SphereGeometry,
  AmbientLight,
  HemisphereLight,
  DirectionalLight,
  DirectionalLightHelper,
  PointLight,
  PointLightHelper,
  SpotLight,
  SpotLightHelper,
  MathUtils,
  Color
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { GUI } from 'dat.gui'
import {
  ColorGUIHelper,
  resizeRendererToDisplaySize,
  makeXYZGUI,
  DegRadHelper
} from './helpers'
import { MeshStandardMaterial } from 'three'
import { RectAreaLight } from 'three'

main()

function main() {

  const canvas = document.querySelector('#c')
  const renderer = new WebGLRenderer({ canvas })
  renderer.physicallyCorrectLights = true
  const gui = new GUI()
  RectAreaLightUniformsLib.init()

  /* 
    A PerspectiveCamera defines its frustrum based on 4 properties. 

    `near` - defines where the front of the frustrum starts

    `far` - defines where the the frustrum ends

    `fov` (field of view) - defines how tall the front and back of the frustrum are by computing the correct height to get the specified field of view at `near` units from the camera

    `aspect` - defines how wide the front and back of the frustrum are (width == height x aspect)
  */
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

  {
    const color = 0xffffff
    const intensity = 1
    const light = new PointLight(color, intensity)
    light.power = 800
    light.decay = 2
    light.distance = Infinity
    scene.add(light)

    function updateLight() {
      helper.update()
    }

    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('color')
    gui.add(light, 'decay', 0, 4, 0.01)
    gui.add(light, 'power', 0, 2000)

    makeXYZGUI(gui, light.position, 'position', updateLight)
  }
  {
    const planeSize = 40

    const loader = new TextureLoader()
    const texture = loader.load('checker.png')

    texture.wrapS = RepeatWrapping
    texture.wrapT = RepeatWrapping
    texture.magFilter = NearestFilter

    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const planeGeo = new PlaneGeometry(planeSize, planeSize)
    const planeMat = new MeshStandardMaterial({
      map: texture,
      side: DoubleSide
    })
    const mesh = new Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * -.5
    scene.add(mesh)
  }
  {
    const cubeSize = 4
    const cubeGeo = new BoxGeometry(cubeSize, cubeSize, cubeSize)
    const cubeMat = new MeshStandardMaterial({ color: '#8ac' })
    const mesh = new Mesh(cubeGeo, cubeMat)
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0)
    scene.add(mesh)
  }
  {
    const sphereRadius = 3
    const sphereWidthDivisions = 32
    const sphereHeightDivisions = 16
    const sphereGeo = new SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions)
    const sphereMat = new MeshStandardMaterial({ color: '#ca8' })
    const mesh = new Mesh(sphereGeo, sphereMat)
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
    scene.add(mesh)
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


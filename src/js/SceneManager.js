import * as THREE from 'three'
import Stats from 'stats.js'
import OrbitControlsModule from 'three-orbit-controls'
import Physics from './utils/physics'

// subjects
import SceneSubject from './sceneSubjects/SceneSubject'
import Ground from './sceneSubjects/Ground'

const OrbitControls = OrbitControlsModule(THREE)

// init Physics worker
Physics.scripts.worker = '/libs/physijs_worker.js'
Physics.scripts.ammo = '/libs/ammo.js'

export default class SceneManager {
  clock = new THREE.Clock()

  buildScene = () => {
    const scene = new Physics.Scene()
    scene.setGravity(new THREE.Vector3(0, -30, 0))
    scene.background = new THREE.Color('#000')
    scene.addEventListener('update', () => {
      scene.simulate(undefined, 2)
    })

    return scene
  }

  buildRender = ({ width, height }) => {
    const { canvas } = this

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1
    renderer.setPixelRatio(DPR)
    renderer.setSize(width, height)

    renderer.gammaInput = true
    renderer.gammaOutput = true

    return renderer
  }

  buildCamera = ({ width, height }) => {
    const aspectRatio = width / height
    const fieldOfView = 60
    const nearPlane = 1
    const farPlane = 100
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    camera.position.z = 20

    return camera
  }

  buildStats = () => {
    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)
  }

  buildOrbitControls = (camera) => {
    return new OrbitControls(camera)
  }

  createSceneSubjects = scene => {
    const sceneSubjects = [
      new SceneSubject(scene),
      new Ground(scene)
    ]

    return sceneSubjects
  }

  constructor(canvas, debugMode = false) {
    this.debugMode = debugMode
    this.canvas = canvas
    this.screenDimentions = {
      width: this.canvas.width,
      height: this.canvas.height
    }

    this.scene = this.buildScene()
    this.renderer = this.buildRender(this.screenDimentions)
    this.camera = this.buildCamera(this.screenDimentions)
    this.sceneSubjects = this.createSceneSubjects(this.scene)
    if (debugMode) {
      this.buildStats()
      this.buildOrbitControls(this.camera)
    }
  }

  update() {
    if (this.debugMode) this.stats.begin()

    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsedTime()

    this.sceneSubjects.map(s => s.update ? s.update(delta, elapsed) : null)

    this.scene.simulate()

    this.renderer.render(
      this.scene,
      this.camera
    )

    if (this.debugMode) this.stats.end()
  }

  resizeHandler() {
    const { width, height } = this.canvas

    this.screenDimentions = { width, height }

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }
}

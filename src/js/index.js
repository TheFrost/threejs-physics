import SceneManager from './SceneManager'
import { getNormUserCoords } from './utils/tools'

const canvas = document.getElementById('canvas')
const sceneManager = new SceneManager(canvas)
let isUserMoveCatch = false

const resizeCanvas = () => {
  canvas.style.width = '100%'
  canvas.style.height = '100%'

  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight

  sceneManager.resizeHandler()
}

const onUserMoveHandler = (e) => {
  if (!isUserMoveCatch) return
  sceneManager.userMoveHandler(getNormUserCoords(e))
}

const onUserCatchHandler = () => {
  isUserMoveCatch = true
  sceneManager.rayCasterControl(true)
}

const onUserUncatchHandler = () => {
  isUserMoveCatch = false
  sceneManager.rayCasterControl(false)
}

const bindEvents = () => {
  window.onresize = resizeCanvas
  resizeCanvas()

  window.addEventListener('mousemove', onUserMoveHandler, false)
  window.addEventListener('mousedown', onUserCatchHandler, false)
  window.addEventListener('mouseup', onUserUncatchHandler, false)
}

const render = () => {
  window.requestAnimationFrame(render)
  sceneManager.update()
}

bindEvents()
render()

import SceneManager from './SceneManager'
import { getNormUserCoords } from './utils/tools'
import {
  updateViewportState,
  viewportUserHandler,
  watchViewport
} from './utils/tornis'

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

  const target = e.touches
    ? e.touches[0]
    : e

  viewportUserHandler(target)
  sceneManager.userMoveHandler(getNormUserCoords(target))
}

const onUserCatchHandler = () => {
  isUserMoveCatch = true
}

const onUserUncatchHandler = () => {
  isUserMoveCatch = false
}

const bindEvents = () => {
  window.onresize = resizeCanvas
  resizeCanvas()

  window.addEventListener('mousemove', onUserMoveHandler, false)
  window.addEventListener('touchmove', onUserMoveHandler, false)
  window.addEventListener('mousedown', onUserCatchHandler, false)
  window.addEventListener('touchstart', onUserCatchHandler, false)
  window.addEventListener('mouseup', onUserUncatchHandler, false)
  window.addEventListener('touchend', onUserUncatchHandler, false)
  watchViewport((data) => sceneManager.viewportHandler(data))
}

const render = () => {
  window.requestAnimationFrame(render)
  sceneManager.update()
  updateViewportState()
}

bindEvents()
render()

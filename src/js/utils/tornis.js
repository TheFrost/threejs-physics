import { throttled, getMean } from './tools'

class Tornis {
  constructor () {
    this.isUserChange = false

    this.lastUserX = 0
    this.lastUserY = 0
    this.currUserX = 0
    this.currUserY = 0

    // array buffers for user velocity
    this.userXVelocity = []
    this.userYVelocity = []
    this.lastUserXVelocity = 0
    this.lastUserYVelocity = 0

    // initialise the watched function queue
    this.callbacks = []

    // throttled event handlers
    this.userThrottledHandler = throttled(75, (e) => this.userHandler(e))
  }

  userHandler ({ clientX, clientY }) {
    this.currUserX = clientX
    this.currUserY = clientY
  }

  formatData () {
    return {
      changed: this.isUserChange,
      x: Math.floor(this.lastUserX),
      y: Math.floor(this.lastUserY),
      velocity: {
        x: Math.floor(this.lastUserXVelocity) || 0,
        y: Math.floor(this.lastUserYVelocity) || 0
      }
    }
  }

  update () {
    const {
      currUserX,
      currUserY
    } = this

    this.isUserChange = false

    if (this.userXVelocity.length > 5) { this.userXVelocity.shift() }
    this.userXVelocity.push(currUserX - this.lastUserX)

    const meanUserXVelocity = getMean(this.userXVelocity)
    if (meanUserXVelocity !== this.lastUserXVelocity) {
      this.lastUserXVelocity = meanUserXVelocity
      this.isUserChange = true
    }

    if (currUserX !== this.lastUserX) {
      this.lastUserX = currUserX
      this.isUserChange = true
    }

    if (this.userYVelocity.length > 5) { this.userYVelocity.shift() }
    this.userYVelocity.push(currUserY - this.lastUserY)

    const meanUserYVelocity = getMean(this.userYVelocity)
    if (meanUserYVelocity !== this.lastUserYVelocity) {
      this.lastUserYVelocity = meanUserYVelocity
      this.isUserChange = true
    }

    if (currUserY !== this.lastUserY) {
      this.lastUserY = currUserY
      this.isUserChange = true
    }

    if (this.isUserChange) {
      this.callbacks.forEach(cb => cb(this.formatData()))
    }
  }

  watch (callback, callOnWatch = true) {
    if (typeof callback !== 'function') {
      throw new Error('Value passed to Watch is not a function')
    }

    if (callOnWatch) {
      const firstRunData = this.formatData()

      firstRunData.isUserChange = true

      callback(firstRunData)
    }

    this.callbacks.push(callback)
  }

  unwatch (callback) {
    if (typeof callback !== 'function') {
      throw new Error('The value passed to unwatch is not a function')
    }

    this.callbacks = this.callbacks.filter(cb => cb !== callback)
  }
}

// singleton
const TORNIS = new Tornis()

export const watchViewport = (callback, callOnWatch) => TORNIS.watch(callback, callOnWatch)
export const unwatchViewport = (callback) => TORNIS.unwatch(callback)
export const getViewportState = () => TORNIS.formatData()
export const updateViewportState = () => TORNIS.update()
export const viewportUserHandler = (e) => TORNIS.userThrottledHandler(e)

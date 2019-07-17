import * as THREE from 'three'

export const textureLoader = new THREE.TextureLoader()

export const getNormUserCoords = ({ clientX, clientY }) => ({
  x: (clientX / window.innerWidth) * 2 - 1,
  y: -(clientY / window.innerHeight) * 2 + 1
})

export const throttled = (delay, fn) => {
  let lastCall = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
}

export const getMean = (arr) => (Math.floor(arr.reduce((acc, curr) => {
  return acc + curr
}, 0) / arr.length))

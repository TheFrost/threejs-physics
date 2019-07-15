import * as THREE from 'three'

export const textureLoader = new THREE.TextureLoader()

export const getNormUserCoords = ({ clientX, clientY }) => ({
  x: (clientX / window.innerWidth) * 2 - 1,
  y: -(clientY / window.innerHeight) * 2 + 1
})

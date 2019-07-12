import * as THREE from 'three'
import Physics from '../utils/physics'

export default class SceneSubject {
  constructor (scene) {
    const box = new Physics.BoxMesh(
      new THREE.BoxBufferGeometry(5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0x888888 })
    )

    scene.add(box)
  }

  update (delta, time) {}
}

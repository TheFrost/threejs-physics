import * as THREE from 'three'
import Physics from '../utils/physics'

export default class SceneSubject {
  constructor (scene) {
    const box = new Physics.BoxMesh(
      new THREE.BoxBufferGeometry(5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff8888 })
    )

    box.position.y = 10

    scene.add(box)
  }

  update (delta, time) {}
}

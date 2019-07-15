import * as THREE from 'three'
import Physics from '../utils/physics'

export default class SceneSubject {
  wantsToBeIntersected = true

  constructor (scene) {
    this.mesh = new Physics.BoxMesh(
      new THREE.BoxBufferGeometry(5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff8888 })
    )

    this.mesh.position.y = 10

    scene.add(this.mesh)
  }

  triggerIntersection ({ x, y }) {
    this.mesh.position.x = x * 20
    this.mesh.position.y = y * 20
    this.mesh.__dirtyPosition = true

    this.mesh.setLinearVelocity(new THREE.Vector3(0, 0, 0))
    this.mesh.setAngularVelocity(new THREE.Vector3(0, 0, 0))
  }

  update (delta, time) {}
}

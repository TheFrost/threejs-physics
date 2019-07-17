import * as THREE from 'three'
import Physics from '../utils/physics'

export default class SceneSubject {
  wantsToBeIntersected = true

  constructor (scene) {
    this.mesh = new Physics.CylinderMesh(
      new THREE.CylinderBufferGeometry(3, 2, 5, 32),
      new THREE.MeshBasicMaterial({ color: 0xff8888 })
    )

    this.mesh.position.y = 10

    scene.add(this.mesh)
  }

  update (delta, time) {}

  viewportHandler ({ velocity }) {
    if (velocity.y === 0) return

    this.mesh.__dirtyPosition = true
    this.mesh.setLinearVelocity(new THREE.Vector3(
      0, -velocity.y, 0
    ))
    this.mesh.setAngularVelocity(new THREE.Vector3(
      velocity.y * 0.05, 0, 0
    ))
  }
}

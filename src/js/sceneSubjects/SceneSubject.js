import * as THREE from 'three'
import Physics from '../utils/physics'

export default class SceneSubject {
  wantsToBeIntersected = true

  constructor (scene) {
    const geometry = new THREE.CylinderBufferGeometry(2, 1.5, 4.5, 8)
    const material = Physics.createMaterial(
      new THREE.MeshNormalMaterial({
        flatShading: true
      }),
      0.8, 0.5
    )
    this.mesh = new Physics.CylinderMesh(
      geometry,
      material
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
      velocity.y * 0.1, 0, 0
    ))
  }
}

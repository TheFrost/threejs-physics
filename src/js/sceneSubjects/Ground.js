import * as THREE from 'three'
import Physics from '../utils/physics'

export default class Ground {
  constructor (scene) {
    const plane = new Physics.PlaneMesh(
      new THREE.PlaneGeometry(15, 15),
      Physics.createMaterial(
        new THREE.MeshBasicMaterial({ color: 0x888888 }),
        0.8, // high friction
        0.4 // low restitution
      ),
      0
    )

    plane.rotation.x = -Math.PI / 2
    plane.position.set(0, -6, 0)

    scene.add(plane)
  }

  update (delta, time) {}
}

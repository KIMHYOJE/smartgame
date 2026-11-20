import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const MODELS = {
  student: '/assets/models/ai/smart_glasses_student_animated.glb',
  proctor: '/assets/models/ai/classroom_proctor_animated.glb',
  desk: '/assets/models/ai/exam_desk_partition.glb',
  archive: '/assets/models/ai/answer_archive_camera.glb',
} as const

/** Visual-only classroom actors and props. Physics remains owned by Arena's procedural colliders. */
export class ClassroomActors {
  readonly group = new THREE.Group()
  private readonly loader = new GLTFLoader()
  private readonly anchors = [
    new THREE.Vector3(-14.4, 0, -8.8),
    new THREE.Vector3(-2.2, 0, -2.6),
    new THREE.Vector3(12.2, 0, 3.6),
    new THREE.Vector3(-9.2, 0, 9.8),
  ]

  constructor(scene: THREE.Scene) {
    this.group.name = 'AI_CLASSROOM_ASSETS'
    scene.add(this.group)
    void this.load()
  }

  private async load(): Promise<void> {
    const [student, proctor, desk, archive] = await Promise.all([
      this.loadOne(MODELS.student),
      this.loadOne(MODELS.proctor),
      this.loadOne(MODELS.desk),
      this.loadOne(MODELS.archive),
    ])
    if (desk) {
      desk.scene.scale.setScalar(1.35)
      desk.scene.position.set(0, 0, -12.3)
      this.group.add(desk.scene)
    }
    if (archive) {
      archive.scene.scale.setScalar(1.1)
      archive.scene.position.set(-18.2, 0, -15.7)
      archive.scene.rotation.y = Math.PI / 2
      this.group.add(archive.scene)
    }
    if (proctor) {
      proctor.scene.scale.setScalar(1.12)
      proctor.scene.position.set(0, 0, -13.5)
      proctor.scene.rotation.y = Math.PI
      this.group.add(proctor.scene)
    }
    if (student) {
      for (const [i, anchor] of this.anchors.entries()) {
        const clone = student.scene.clone(true)
        clone.scale.setScalar(0.92)
        clone.position.copy(anchor)
        clone.position.y = 0.1
        clone.rotation.y = i % 2 === 0 ? Math.PI : 0
        this.group.add(clone)
      }
    }
    this.group.traverse(obj => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }

  private loadOne(url: string): Promise<import('three/examples/jsm/loaders/GLTFLoader.js').GLTF | null> {
    return new Promise(resolve => this.loader.load(url, resolve, undefined, () => resolve(null)))
  }
}

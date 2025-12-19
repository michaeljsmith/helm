import {
  AmbientLight,
  BufferGeometry,
  DirectionalLight,
  Material,
  Mesh,
  PerspectiveCamera,
  Quaternion,
  Scene,
  WebGLRenderer,
} from "three";
import { Artifact } from "./artifacts/artifact.js";
import { Model } from "./models/model.js";
import { compileModelToThreeJs } from "./rendering/models/compile-model-to-three-js.js";
import { ModelInstance } from "./rendering/models/instances/model-instance.js";

export const mount = <State>(
  parentDiv: HTMLDivElement,
  world: (state: State) => Iterable<Artifact>,
  init: () => State,
) => {
  const state = init();

  const scene = new Scene();
  const sceneUpdater = newSceneUpdater(scene);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => {
    const artifacts = world(state);
    const modelInstances: ModelInstance[] = [];
    for (const artfifact of artifacts) {
      if (artfifact.type === "model-instance-artifact") {
        modelInstances.push(artfifact.instance);
      }
    }

    sceneUpdater(modelInstances);

    renderer.render(scene, camera);
  });
  parentDiv.appendChild(renderer.domElement);

  const color = 0xffffff;
  const intensity = 3;
  const light = new DirectionalLight(color, intensity);
  light.position.set(-3, 1, 2);
  scene.add(light);

  const ambientlight = new AmbientLight(0xffffff, 0.05);
  scene.add(ambientlight);

  camera.position.z = -1.0;
  camera.position.y = 1.0;
  camera.position.x = -3;

  camera.rotateY(-Math.PI / 2);
};

const newSceneUpdater = (
  scene: Scene,
): ((modelInstances: ModelInstance[]) => void) => {
  const currentMeshes: Mesh[] = [];
  const geometryAccessor = newGeometryAccessor();

  return (modelInstances) => {
    for (const currentMesh of currentMeshes) {
      scene.remove(currentMesh);
    }
    currentMeshes.splice(0, currentMeshes.length);

    for (const modelInstance of modelInstances) {
      const { geometry, material } = geometryAccessor(modelInstance.model);
      const mesh = new Mesh(geometry, material);
      const q = modelInstance.transform.rotation;
      mesh.applyQuaternion(new Quaternion(q[3], q[0], q[1], q[2]));
      const p = modelInstance.transform.position;
      mesh.position.set(p[0], p[1], p[2]);
      scene.add(mesh);
      currentMeshes.push(mesh);
    }
  };
};

const newGeometryAccessor = (): ((model: Model<unknown>) => {
  geometry: BufferGeometry;
  material: Material;
}) => {
  const geometryCache = new WeakMap<
    Model<unknown>,
    { geometry: BufferGeometry; material: Material }
  >();
  return (model) => {
    let results = geometryCache.get(model);
    if (results === undefined) {
      results = compileModelToThreeJs(model);
      geometryCache.set(model, results);
    }

    return results;
  };
};

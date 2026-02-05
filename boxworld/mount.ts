import {
  AmbientLight,
  BufferGeometry,
  Clock,
  DirectionalLight,
  Material,
  Mesh,
  PerspectiveCamera,
  Quaternion,
  Scene,
  WebGLRenderer,
} from "three";
import { PhysicsBody } from "../physics/physics-body.js";
import { updatePhysics } from "../physics/update-physics.js";
import { ArtifactSet } from "./artifact-set.js";
import { TerrainChunk } from "./maps/terrain/terrain-chunk.js";
import { Terrain } from "./maps/terrain/terrain.js";
import { Model } from "./models/model.js";
import { compileModelToThreeJs } from "./rendering/models/compile-model-to-three-js.js";
import { ModelInstance } from "./rendering/models/instances/model-instance.js";
import { compileTerrainChunkToThreeJs } from "./rendering/terrain/compile-terrain-chunk-to-three-js.js";

export const mount = <State>(
  parentDiv: HTMLDivElement,
  world: (state: State) => ArtifactSet,
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

  const clock = new Clock();

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(() => {
    const dt = clock.getDelta();

    const artifacts = world(state);
    const modelInstances: ModelInstance[] = [];
    const terrainChunks: TerrainChunk[] = [];
    const physicsBodies: PhysicsBody[] = [];
    for (const artfifact of artifacts.artifacts) {
      switch (artfifact.type) {
        case "model-instance-artifact":
          {
            modelInstances.push(artfifact.instance);
          }
          break;

        case "terrain-chunk-artifact":
          {
            terrainChunks.push(artfifact.chunk);
          }
          break;

        case "physics-body-artifact":
          {
            physicsBodies.push(artfifact.body);
          }
          break;

        default:
          throw ((x: never) => new Error("Unexpected " + x))(artfifact);
      }
    }

    updatePhysics(dt, physicsBodies);
    sceneUpdater(modelInstances, terrainChunks);

    const cameraPosition = artifacts.camera.transform.position;
    camera.position.set(
      cameraPosition[0],
      cameraPosition[1],
      cameraPosition[2],
    );
    const cameraRotation = artifacts.camera.transform.rotation;
    camera.quaternion.set(
      cameraRotation[1],
      cameraRotation[2],
      cameraRotation[3],
      cameraRotation[0],
    );

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
};

const newSceneUpdater = (
  scene: Scene,
): ((
  modelInstances: ModelInstance[],
  terrainChunks: TerrainChunk[],
) => void) => {
  const currentMeshes: Mesh[] = [];
  const modelGeometryAccessor = newModelGeometryAccessor();
  const terrainChunkGeometryAccessor = newTerrainChunkGeometryAccessor();

  return (modelInstances, terrainChunks) => {
    for (const currentMesh of currentMeshes) {
      scene.remove(currentMesh);
    }
    currentMeshes.splice(0, currentMeshes.length);

    for (const modelInstance of modelInstances) {
      const { geometry, material } = modelGeometryAccessor(modelInstance.model);
      const mesh = new Mesh(geometry, material);
      const q = modelInstance.transform.rotation;
      mesh.applyQuaternion(new Quaternion(q[3], q[0], q[1], q[2]));
      const p = modelInstance.transform.position;
      mesh.position.set(p[0], p[1], p[2]);
      scene.add(mesh);
      currentMeshes.push(mesh);
    }

    for (const terrainChunk of terrainChunks) {
      const { geometry, material } = terrainChunkGeometryAccessor(terrainChunk);
      const mesh = new Mesh(geometry, material);
      scene.add(mesh);
      currentMeshes.push(mesh);
    }
  };
};

type GeometryAndMaterial = {
  geometry: BufferGeometry;
  material: Material;
};

const newModelGeometryAccessor = (): ((
  model: Model<unknown>,
) => GeometryAndMaterial) => {
  const geometryCache = new WeakMap<Model<unknown>, GeometryAndMaterial>();
  return (model) => {
    let results = geometryCache.get(model);
    if (results === undefined) {
      results = compileModelToThreeJs(model);
      geometryCache.set(model, results);
    }

    return results;
  };
};

const newTerrainChunkGeometryAccessor = (): ((
  terrainChunk: TerrainChunk,
) => GeometryAndMaterial) => {
  const geometryCache = new WeakMap<
    Terrain,
    Map<string, GeometryAndMaterial>
  >();

  return (terrainChunk) => {
    let chunkGeometriesForTerrain = geometryCache.get(terrainChunk.terrain);
    if (chunkGeometriesForTerrain === undefined) {
      chunkGeometriesForTerrain = new Map();
      geometryCache.set(terrainChunk.terrain, chunkGeometriesForTerrain);
    }

    const [x, y] = terrainChunk.bounds.center;
    const [width, depth] = terrainChunk.bounds.dimensions;
    const chunkKey = `${x},${y}:${width},${depth}`;
    let chunkGeometry = chunkGeometriesForTerrain.get(chunkKey);
    if (chunkGeometry === undefined) {
      chunkGeometry = compileTerrainChunkToThreeJs(
        terrainChunk.terrain,
        terrainChunk.bounds,
      );
      chunkGeometriesForTerrain.set(chunkKey, chunkGeometry);
    }

    return chunkGeometry;
  };
};

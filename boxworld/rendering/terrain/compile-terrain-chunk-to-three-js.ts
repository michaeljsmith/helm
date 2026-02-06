import {
  BufferAttribute,
  BufferGeometry,
  Material,
  MeshPhongMaterial,
} from "three";
import { Aab2 } from "../../../math/aab.js";
import { Terrain } from "../../maps/terrain/terrain.js";
import { compileTerrainChunk } from "./compile-terrain-chunk.js";

const material = new MeshPhongMaterial({ color: 0x00ff00 });

export function compileTerrainChunkToThreeJs(
  terrain: Terrain,
  bounds: Aab2,
): { geometry: BufferGeometry; material: Material } {
  const results = compileTerrainChunk(terrain, bounds);

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(results.positions), 3),
  );
  geometry.setAttribute(
    "normal",
    new BufferAttribute(new Float32Array(results.normals), 3),
  );
  geometry.setAttribute(
    "color",
    new BufferAttribute(new Float32Array(results.colors), 3),
  );
  geometry.setIndex(results.indices);
  return { geometry, material };
}

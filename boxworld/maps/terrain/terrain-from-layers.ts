import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { Aab2 } from "../../../math/aab.js";
import { point2With } from "../../../math/point.js";
import { checkThat } from "../../../utils/preconditions/check-that.js";
import { converted, Layout } from "../layouts/layout.js";
import { TerrainCell } from "./terrain-cell.js";
import { TERRAIN_HOLE } from "./terrain-height.js";
import { TerrainLayer } from "./terrain-layer.js";
import { Terrain } from "./terrain.js";

export function terrain(layers: Layout<TerrainLayer>) {
  return converted<TerrainLayer, Terrain>(
    (layers) => terrainFromLayers([...layers]),
    layers,
  );
}

export function terrainFromLayers(layers: TerrainLayer[]): Terrain {
  const { center, dimensions } = boundariesOfLayers(layers);

  const left = center[0] - dimensions[0];
  const far = center[1] - dimensions[1];
  const right = center[0] + dimensions[0];
  const near = center[1] + dimensions[1];

  // Clear the terrain.
  const cells: TerrainCell[] = [];
  for (let x = left; x < right; ++x) {
    for (let z = far; z < near; ++z) {
      cells[(z - far) * dimensions[0] * 2 + (x - left)] = {
        corners: [
          [TERRAIN_HOLE, TERRAIN_HOLE],
          [TERRAIN_HOLE, TERRAIN_HOLE],
        ],
      };
    }
  }

  // Render each layer into the terrain.
  for (const layer of layers) {
    const layerCenter = layer.bounds.center;
    const layerDimensions = layer.bounds.dimensions;
    const layerLeft = layerCenter[0] - layerDimensions[0];
    const layerFar = layerCenter[1] - layerDimensions[1];
    const layerRight = layerCenter[0] + layerDimensions[0];
    const layerNear = layerCenter[1] + layerDimensions[1];
    for (let x = layerLeft; x < layerRight; ++x) {
      for (let z = layerFar; z < layerNear; ++z) {
        const index = (z - far) * dimensions[0] * 2 + (x - left);
        const cell = cells[index];
        for (let cornerX = 0; cornerX < 2; ++cornerX) {
          for (let cornerZ = 0; cornerZ < 2; ++cornerZ) {
            const existingHeight = cell.corners[cornerZ][cornerX];
            const layerHeight = layer.heightAt(x + cornerX, z + cornerZ);
            cell.corners[cornerZ][cornerX] =
              // If The layer has a hole here, set a hole.
              layerHeight === TERRAIN_HOLE
                ? TERRAIN_HOLE
                : // Else if there is currently a hole here, prefer the new value.
                  existingHeight === TERRAIN_HOLE
                  ? layerHeight
                  : // Else sum the heights.
                    existingHeight + layerHeight;
          }
        }
      }
    }
  }

  return { bounds: { center, dimensions }, cells };
}

function boundariesOfLayers(layers: TerrainLayer[]): Aab2 {
  checkThat(layers.length > 0);
  const left = Math.min(
    ...layers.map(
      (layer) => layer.bounds.center[0] - layer.bounds.dimensions[0],
    ),
  );
  const far = Math.min(
    ...layers.map(
      (layer) => layer.bounds.center[1] - layer.bounds.dimensions[1],
    ),
  );
  const right = Math.max(
    ...layers.map(
      (layer) => layer.bounds.center[0] + layer.bounds.dimensions[0],
    ),
  );
  const near = Math.max(
    ...layers.map(
      (layer) => layer.bounds.center[1] + layer.bounds.dimensions[1],
    ),
  );
  const halfWidth = (right - left) / 2;
  const halfDepth = (near - far) / 2;
  return {
    center: point2With(left + halfWidth, far + halfDepth),
    dimensions: aabDimensions2With(halfWidth, halfDepth),
  };
}

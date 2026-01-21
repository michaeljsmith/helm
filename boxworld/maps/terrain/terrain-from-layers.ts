import {
  AabDimensions2,
  aabDimensions2With,
} from "../../../math/aab-dimensions.js";
import { Point2, point2With } from "../../../math/point.js";
import { checkThat } from "../../../utils/preconditions/check-that.js";
import { converted, Layout } from "../layouts/layout.js";
import { TerrainCell } from "./terrain-cell.js";
import { TERRAIN_HOLE } from "./terrain-height.js";
import { TerrainLayer } from "./terrain-layer.js";
import { Terrain } from "./terrain.js";

export const terrain = (layers: Layout<TerrainLayer>) =>
  converted<TerrainLayer, Terrain>(
    (layers) => terrainFromLayers([...layers]),
    layers,
  );

export const terrainFromLayers = (layers: TerrainLayer[]): Terrain => {
  const { origin, dimensions } = boundariesOfLayers(layers);

  const [left, far] = origin;
  const right = left + dimensions[0];
  const near = far + dimensions[1];

  // Clear the terrain.
  const cells: TerrainCell[] = [];
  for (let x = left; x < right; ++x) {
    for (let z = far; z < near; ++z) {
      cells[(z - far) * dimensions[0] + (x - left)] = {
        corners: [
          [TERRAIN_HOLE, TERRAIN_HOLE],
          [TERRAIN_HOLE, TERRAIN_HOLE],
        ],
      };
    }
  }

  // Render each layer into the terrain.
  for (const layer of layers) {
    const [layerLeft, layerFar] = layer.origin;
    const layerRight = layerLeft + layer.dimensions[0];
    const layerNear = layerFar + layer.dimensions[1];
    for (let x = layerLeft; x < layerRight; ++x) {
      for (let z = layerFar; z < layerNear; ++z) {
        const index = (z - far) * dimensions[0] + (x - left);
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

  return { bounds: { origin, dimensions }, cells };
};

const boundariesOfLayers = (
  layers: TerrainLayer[],
): {
  origin: Point2;
  dimensions: AabDimensions2;
} => {
  checkThat(layers.length > 0);
  const left = Math.min(...layers.map((layer) => layer.origin[0]));
  const far = Math.min(...layers.map((layer) => layer.origin[1]));
  const right = Math.max(
    ...layers.map((layer) => layer.origin[0] + layer.dimensions[0]),
  );
  const near = Math.max(
    ...layers.map((layer) => layer.origin[1] + layer.dimensions[1]),
  );
  return {
    origin: point2With(left, far),
    dimensions: aabDimensions2With(right - left, near - far),
  };
};

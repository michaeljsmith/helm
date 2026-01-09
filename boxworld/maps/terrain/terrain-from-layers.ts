import { checkThat } from "../../../utils/preconditions/check-that.js";
import { TerrainDimensions } from "./terrain-dimensions.js";
import { TerrainHeight } from "./terrain-height.js";
import { TerrainLayer } from "./terrain-layer.js";
import { TerrainPosition } from "./terrain-position.js";
import { Terrain } from "./terrain.js";

export const terrainFromLayers = (layers: TerrainLayer[]): Terrain => {
  const { origin, dimensions } = boundariesOfLayers(layers);

  const left = origin[0];
  const right = left + dimensions[0];
  const far = origin[1];
  const near = far + dimensions[1];

  const heights: TerrainHeight[] = [];
  for (const layer of layers) {
    for (let x = left; x < right; ++x) {
      for (let z = far; z < near; ++z) {
        heights[(z - far) * dimensions[0] + (x - left)] = layer.heightAt(x, z);
      }
    }
  }

  return { origin, dimensions, heights };
};

const boundariesOfLayers = (
  layers: TerrainLayer[],
): {
  origin: TerrainPosition;
  dimensions: TerrainDimensions;
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
    origin: [left, far],
    dimensions: [right - left, near - far],
  };
};

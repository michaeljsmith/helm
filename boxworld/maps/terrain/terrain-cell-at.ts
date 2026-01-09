import { checkThat } from "../../../utils/preconditions/check-that.js";
import { TerrainHeight } from "./terrain-height.js";
import { Terrain } from "./terrain.js";

export const terrainCellAt = (
  terrain: Terrain,
  x: number,
  z: number,
): TerrainHeight => {
  const [left, far] = terrain.origin;
  const [width, depth] = terrain.dimensions;
  checkThat(x >= left);
  checkThat(x < left + width);
  checkThat(z >= far);
  checkThat(z < far + depth);
  const relativeX = x - terrain.origin[0];
  const relativeZ = z - terrain.origin[1];
  return terrain.heights[relativeZ * width + relativeX];
};

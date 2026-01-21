import { checkThat } from "../../../utils/preconditions/check-that.js";
import { TerrainCell } from "./terrain-cell.js";
import { Terrain } from "./terrain.js";

export const terrainCellAt = (
  terrain: Terrain,
  x: number,
  z: number,
): TerrainCell => {
  const [left, far] = terrain.bounds.origin;
  const [width, depth] = terrain.bounds.dimensions;
  checkThat(x >= left);
  checkThat(x < left + width);
  checkThat(z >= far);
  checkThat(z < far + depth);
  const relativeX = x - terrain.bounds.origin[0];
  const relativeZ = z - terrain.bounds.origin[1];
  return terrain.cells[relativeZ * width + relativeX];
};

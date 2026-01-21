import { checkThat } from "../../../utils/preconditions/check-that.js";
import { TerrainCell } from "./terrain-cell.js";
import { Terrain } from "./terrain.js";

export const terrainCellAt = (
  terrain: Terrain,
  x: number,
  z: number,
): TerrainCell => {
  const center = terrain.bounds.center;
  const dimensions = terrain.bounds.dimensions;
  const left = center[0] - dimensions[0];
  const far = center[1] - dimensions[1];
  const width = dimensions[0] * 2;
  const depth = dimensions[1] * 2;
  checkThat(x >= left);
  checkThat(x < left + width);
  checkThat(z >= far);
  checkThat(z < far + depth);
  const relativeX = x - left;
  const relativeZ = z - far;
  return terrain.cells[relativeZ * width + relativeX];
};

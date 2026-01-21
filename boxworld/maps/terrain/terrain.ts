import { TerrainBounds } from "./terrain-bounds.js";
import { TerrainCell } from "./terrain-cell.js";

export type Terrain = {
  bounds: TerrainBounds;
  cells: TerrainCell[];
};

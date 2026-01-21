import { Aab2 } from "../../../math/aab.js";
import { TerrainCell } from "./terrain-cell.js";

export type Terrain = {
  bounds: Aab2;
  cells: TerrainCell[];
};

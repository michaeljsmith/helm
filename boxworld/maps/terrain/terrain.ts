import { TerrainBounds } from "./terrain-bounds.js";
import { TerrainHeight } from "./terrain-height.js";

export type Terrain = {
  bounds: TerrainBounds;
  heights: TerrainHeight[];
};

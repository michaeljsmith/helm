import { TerrainDimensions } from "./terrain-dimensions.js";
import { TerrainHeight } from "./terrain-height.js";
import { TerrainPosition } from "./terrain-position.js";

export type Terrain = {
  origin: TerrainPosition;
  dimensions: TerrainDimensions;
  heights: TerrainHeight[];
};

import { TerrainDimensions } from "./terrain-dimensions.js";
import { TerrainPosition } from "./terrain-position.js";

export type TerrainBounds = {
  origin: TerrainPosition;
  dimensions: TerrainDimensions;
};

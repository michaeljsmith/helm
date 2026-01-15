import { TerrainBounds } from "./terrain-bounds.js";
import { Terrain } from "./terrain.js";

export type TerrainChunk = {
  terrain: Terrain;
  bounds: TerrainBounds;
};

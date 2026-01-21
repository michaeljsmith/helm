import { TerrainHeight } from "./terrain-height.js";

export type TerrainCell = {
  corners: [[TerrainHeight, TerrainHeight], [TerrainHeight, TerrainHeight]];
};

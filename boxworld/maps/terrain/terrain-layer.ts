import { TerrainDimensions } from "./terrain-dimensions.js";
import { TerrainHeight } from "./terrain-height.js";
import { TerrainPosition } from "./terrain-position.js";

export type TerrainLayer = {
  origin: TerrainPosition;
  dimensions: TerrainDimensions;
  heightAt: (x: number, z: number) => TerrainHeight;
};

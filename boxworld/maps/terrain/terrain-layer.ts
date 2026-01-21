import { TerrainBounds } from "./terrain-bounds.js";
import { TerrainHeight } from "./terrain-height.js";

export type TerrainLayer = {
  bounds: TerrainBounds;
  heightAt: (x: number, z: number) => TerrainHeight;
};

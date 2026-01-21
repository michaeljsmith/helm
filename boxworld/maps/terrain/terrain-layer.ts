import { Aab2 } from "../../../math/aab.js";
import { TerrainHeight } from "./terrain-height.js";

export type TerrainLayer = {
  bounds: Aab2;
  heightAt: (x: number, z: number) => TerrainHeight;
};

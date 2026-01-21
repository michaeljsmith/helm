import { AabDimensions2 } from "../../../math/aab-dimensions.js";
import { Point2 } from "../../../math/point.js";
import { TerrainHeight } from "./terrain-height.js";

export type TerrainLayer = {
  origin: Point2;
  dimensions: AabDimensions2;
  heightAt: (x: number, z: number) => TerrainHeight;
};

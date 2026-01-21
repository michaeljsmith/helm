import { AabDimensions2 } from "../../../math/aab-dimensions.js";
import { Point2 } from "../../../math/point.js";

export type TerrainBounds = {
  origin: Point2;
  dimensions: AabDimensions2;
};

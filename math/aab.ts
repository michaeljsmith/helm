import { AabDimensions } from "./aab-dimensions.js";
import { Point } from "./point.js";

export type Aab = {
  center: Point;
  dimensions: AabDimensions;
};

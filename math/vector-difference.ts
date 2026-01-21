import { Offset2, offset2With } from "./offset.js";
import { Point2 } from "./point.js";

export const vectorDifference2 = (p0: Point2, p1: Point2): Offset2 =>
  offset2With(p0[0] - p1[0], p0[1] - p1[1]);

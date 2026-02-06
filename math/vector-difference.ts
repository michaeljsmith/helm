import { Offset, Offset2, offset2With, offsetWith } from "./offset.js";
import { Point, Point2 } from "./point.js";

export function vectorDifference2(p0: Point2, p1: Point2): Offset2 {
  return offset2With(p0[0] - p1[0], p0[1] - p1[1]);
}

export function vectorDifference(p0: Point, p1: Point): Offset {
  return offsetWith(p0[0] - p1[0], p0[1] - p1[1], p0[2] - p1[2]);
}

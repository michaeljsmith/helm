import { Offset, Offset2 } from "./offset.js";
import { Point, Point2, point2With, pointWith } from "./point.js";

export const vectorAdd = (point: Point, offset: Offset): Point =>
  pointWith(point[0] + offset[0], point[1] + offset[1], point[2] + offset[2]);

export const vectorAdd2 = (point: Point2, offset: Offset2): Point2 =>
  point2With(point[0] + offset[0], point[1] + offset[1]);

export const vectorSubtract = (point: Point, offset: Offset): Point =>
  pointWith(point[0] - offset[0], point[1] - offset[1], point[2] - offset[2]);

export const vectorSubtract2 = (point: Point2, offset: Offset2): Point2 =>
  point2With(point[0] - offset[0], point[1] - offset[1]);

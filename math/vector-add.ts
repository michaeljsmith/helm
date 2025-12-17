import { Offset } from "./offset.js";
import { Point, pointWith } from "./point.js";

export const vectorAdd = (point: Point, offset: Offset): Point =>
  pointWith(point[0] + offset[0], point[1] + offset[1], point[2] + offset[2]);

export const vectorSubtract = (point: Point, offset: Offset): Point =>
  pointWith(point[0] - offset[0], point[1] - offset[1], point[2] - offset[2]);

import { Offset, Offset2 } from "./offset.js";
import { Point, Point2, point2With, pointWith } from "./point.js";

export function vectorAdd(point: Point, offset: Offset): Point {
  return pointWith(
    point[0] + offset[0],
    point[1] + offset[1],
    point[2] + offset[2],
  );
}

export function vectorAdd2(point: Point2, offset: Offset2): Point2 {
  return point2With(point[0] + offset[0], point[1] + offset[1]);
}

export function vectorSubtract(point: Point, offset: Offset): Point {
  return pointWith(
    point[0] - offset[0],
    point[1] - offset[1],
    point[2] - offset[2],
  );
}

export function vectorSubtract2(point: Point2, offset: Offset2): Point2 {
  return point2With(point[0] - offset[0], point[1] - offset[1]);
}

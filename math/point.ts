import { Vector2, Vector3 } from "./vector.js";

export type PointBrand = { __IS_POINT__: true };

export type Point2 = Vector2 & PointBrand;
export function point2With(x: number, y: number): Point2 {
  return new Float64Array([x, y]) as Point2;
}

export const ORIGIN2 = point2With(0, 0);

export type Point = Vector3 & PointBrand;
export function pointWith(x: number, y: number, z: number): Point {
  return new Float64Array([x, y, z]) as Point;
}

export const ORIGIN = pointWith(0, 0, 0);

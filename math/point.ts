import { Vector3 } from "./vector.js";

export type PointBrand = { __IS_POINT__: true };
export type Point = Vector3 & PointBrand;
export const pointWith = (x: number, y: number, z: number): Point => {
  return new Float64Array([x, y, z]) as Point;
};

export const ORIGIN = pointWith(0, 0, 0);

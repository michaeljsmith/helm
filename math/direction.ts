import { Offset, offsetWith } from "./offset.js";

type DirectionBrand = { __IS_DIRECTION__: true };
export type Direction = Offset & DirectionBrand;
export const directionWith = (x: number, y: number, z: number): Direction => {
  // Vector must have size 1.
  return offsetWith(x, y, z) as Direction;
};

export const X_AXIS = directionWith(1, 0, 0);
export const Y_AXIS = directionWith(0, 1, 0);
export const Z_AXIS = directionWith(0, 0, 1);

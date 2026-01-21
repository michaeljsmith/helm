import { Vector2, vector2With, Vector3, vector3With } from "./vector.js";

type OffsetBrand = { __IS_OFFSET__: true };

export type Offset2 = Vector2 & OffsetBrand;
export const offset2With = (x: number, y: number): Offset2 => {
  return vector2With(x, y) as Offset2;
};

export type Offset = Vector3 & OffsetBrand;
export const offsetWith = (x: number, y: number, z: number): Offset => {
  return vector3With(x, y, z) as Offset;
};

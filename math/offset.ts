import { Vector3, vector3With } from "./vector.js";

type OffsetBrand = { __IS_OFFSET__: true };
export type Offset = Vector3 & OffsetBrand;
export const offsetWith = (x: number, y: number, z: number): Offset => {
  return vector3With(x, y, z) as Offset;
};

import { Vector3 } from "./vector.js";

type OffsetBrand = { __IS_OFFSET__: true };
export type Offset = Vector3 & OffsetBrand;
export const offsetWith = (x: number, y: number, z: number): Offset => {
  return new Float64Array([x, y, z]) as Offset;
};

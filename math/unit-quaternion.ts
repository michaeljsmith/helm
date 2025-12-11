type UnitQuaternionBrand = { __IS_UNIT_QUATERNION__: true };
export type UnitQuaternion = Float64Array & UnitQuaternionBrand;
export const rotationMatrixWith = (
  w: number,
  x: number,
  y: number,
  z: number,
): UnitQuaternion => {
  return new Float64Array([w, x, y, z]) as UnitQuaternion;
};

export const IDENTITY_UNIT_QUATERNION = rotationMatrixWith(1, 0, 0, 0);

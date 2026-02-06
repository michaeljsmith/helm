type VectorBrand = { __IS_VECTOR__: true };
type LengthBrand<N extends number> = { __LENGTH__: N };

export type Vector2 = Float64Array & VectorBrand & LengthBrand<2>;
export function vector2With(x: number, y: number): Vector2 {
  return new Float64Array([x, y]) as Vector2;
}

export type Vector3 = Float64Array & VectorBrand & LengthBrand<3>;
export function vector3With(x: number, y: number, z: number): Vector3 {
  return new Float64Array([x, y, z]) as Vector3;
}

export type Vector4 = Float64Array & VectorBrand & LengthBrand<4>;
export function vector4With(
  x: number,
  y: number,
  z: number,
  w: number,
): Vector4 {
  return new Float64Array([x, y, z, w]) as Vector4;
}

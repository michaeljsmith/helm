type ColorBrand = { __IS_COLOR__: true };
type LengthBrand<N extends number> = { __LENGTH__: N };
export type Color3 = Uint8Array & ColorBrand & LengthBrand<3>;
export const color3With = (r: number, g: number, b: number): Color3 => {
  return new Uint8Array([r, g, b]) as Color3;
};

export type Color4 = Uint8Array & ColorBrand & LengthBrand<4>;
export const color4With = (
  r: number,
  g: number,
  b: number,
  a: number,
): Color4 => {
  return new Uint8Array([r, g, b, a]) as Color4;
};

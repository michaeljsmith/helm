import { Offset, Offset2, offset2With, offsetWith } from "./offset.js";

export function vectorScale(offset: Offset, scale: number): Offset {
  return offsetWith(scale * offset[0], scale * offset[1], scale * offset[2]);
}

export function vectorScale2(offset: Offset2, scale: number): Offset2 {
  return offset2With(scale * offset[0], scale * offset[1]);
}

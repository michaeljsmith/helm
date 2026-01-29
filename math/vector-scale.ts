import { Offset, Offset2, offset2With, offsetWith } from "./offset.js";

export const vectorScale = (offset: Offset, scale: number): Offset =>
  offsetWith(scale * offset[0], scale * offset[1], scale * offset[2]);

export const vectorScale2 = (offset: Offset2, scale: number): Offset2 =>
  offset2With(scale * offset[0], scale * offset[1]);

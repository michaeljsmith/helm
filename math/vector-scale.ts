import { Offset, offsetWith } from "./offset.js";

export const vectorScale = (offset: Offset, scale: number): Offset =>
  offsetWith(scale * offset[0], scale * offset[1], scale * offset[2]);

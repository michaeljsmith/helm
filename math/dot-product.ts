import { Offset2 } from "./offset.js";

export const dotProduct2 = (a: Offset2, b: Offset2): number =>
  a[0] * b[0] + a[1] * b[1];

import { Offset, offsetWith } from "./offset.js";

export const crossProduct = (a: Offset, b: Offset): Offset =>
  offsetWith(
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  );

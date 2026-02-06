import { dotProduct, dotProduct2 } from "./dot-product.js";
import { Offset, Offset2 } from "./offset.js";

export function vectorSizeSquared(v: Offset): number {
  return dotProduct(v, v);
}

export function vectorSize2Squared(v: Offset2): number {
  return dotProduct2(v, v);
}

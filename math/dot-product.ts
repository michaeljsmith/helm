import { AabDimensions, AabDimensions2 } from "./aab-dimensions.js";
import { Offset, Offset2 } from "./offset.js";

export function dotProduct2(a: Offset2, b: Offset2): number;
export function dotProduct2(
  dimensions: AabDimensions2,
  offset: Offset2,
): number;
export function dotProduct2(
  offset: Offset2,
  dimensions: AabDimensions2,
): number;
export function dotProduct2(
  a: Offset2 | AabDimensions2,
  b: Offset2 | AabDimensions2,
): number {
  return a[0] * b[0] + a[1] * b[1];
}

export function dotProduct(a: Offset, b: Offset): number;
export function dotProduct(dimensions: AabDimensions, offset: Offset): number;
export function dotProduct(offset: Offset, dimensions: AabDimensions): number;
export function dotProduct(
  a: Offset | AabDimensions,
  b: Offset | AabDimensions,
): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

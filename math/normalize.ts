import { Direction, Direction2 } from "./direction.js";
import { Offset, Offset2 } from "./offset.js";
import { vectorScale, vectorScale2 } from "./vector-scale.js";
import { vectorSize2Squared, vectorSizeSquared } from "./vector-size.js";

export function normalize(v: Offset): Direction {
  return vectorScale(v, 1 / Math.sqrt(vectorSizeSquared(v))) as Direction;
}

export function normalize2(v: Offset2): Direction2 {
  return vectorScale2(v, 1 / Math.sqrt(vectorSize2Squared(v))) as Direction2;
}

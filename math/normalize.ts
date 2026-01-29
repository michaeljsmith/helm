import { Direction, Direction2 } from "./direction.js";
import { Offset, Offset2 } from "./offset.js";
import { vectorScale, vectorScale2 } from "./vector-scale.js";
import { vectorSize2Squared, vectorSizeSquared } from "./vector-size.js";

export const normalize = (v: Offset): Direction =>
  vectorScale(v, 1 / Math.sqrt(vectorSizeSquared(v))) as Direction;

export const normalize2 = (v: Offset2): Direction2 =>
  vectorScale2(v, 1 / Math.sqrt(vectorSize2Squared(v))) as Direction2;

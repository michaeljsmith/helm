import { Direction } from "./direction.js";
import { Offset } from "./offset.js";
import { vectorScale } from "./vector-scale.js";
import { vectorSizeSquared } from "./vector-size.js";

export const normalize = (v: Offset): Direction =>
  vectorScale(v, 1 / Math.sqrt(vectorSizeSquared(v))) as Direction;

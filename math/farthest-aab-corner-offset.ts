import { AabDimensions2 } from "./aab-dimensions.js";
import { Direction2 } from "./direction.js";
import { Offset2, offset2With } from "./offset.js";

export const farthestAabCornerOffset2 = (
  dimensions: AabDimensions2,
  direction: Direction2,
): Offset2 =>
  offset2With(
    Math.sign(direction[0]) * dimensions[0],
    Math.sign(direction[1]) * dimensions[1],
  );

import { checkExists } from "../utils/preconditions/check-exists.js";
import { Vector2, Vector3 } from "./vector.js";

type AabbDimensionsBrand = { __IS_AAB_DIMENSIONS__: true };

export type AabDimensions2 = Vector2 & AabbDimensionsBrand;
export function aabDimensions2With(
  width: number,
  height: number,
): AabDimensions2 {
  return new Float64Array([width, height]) as AabDimensions2;
}

export type AabDimensions = Vector3 & AabbDimensionsBrand;
export function aabDimensionsWith(
  width: number,
  height: number,
  depth: number,
): AabDimensions {
  return new Float64Array([width, height, depth]) as AabDimensions;
}

export function aabDimensionWidth(dimensions: AabDimensions): number {
  return checkExists(dimensions.at(0));
}

export function aabDimensionHeight(dimensions: AabDimensions): number {
  return checkExists(dimensions.at(1));
}

export function aabDimensionDepth(dimensions: AabDimensions): number {
  return checkExists(dimensions.at(2));
}

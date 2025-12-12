import { checkExists } from "../utils/preconditions/check-exists.js";
import { Vector3 } from "./vector.js";

type AabbDimensionsBrand = { __IS_AAB_DIMENSIONS__: true };
export type AabDimensions = Vector3 & AabbDimensionsBrand;
export const aabDimensionsWith = (
  width: number,
  height: number,
  depth: number,
): AabDimensions => {
  return new Float64Array([width, height, depth]) as AabDimensions;
};

export const aabDimensionWidth = (dimensions: AabDimensions): number =>
  checkExists(dimensions.at(0));

export const aabDimensionHeight = (dimensions: AabDimensions): number =>
  checkExists(dimensions.at(1));

export const aabDimensionDepth = (dimensions: AabDimensions): number =>
  checkExists(dimensions.at(2));

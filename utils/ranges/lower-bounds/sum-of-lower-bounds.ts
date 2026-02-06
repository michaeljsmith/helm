import { naturalSummer } from "../../summers/natural-summer.js";
import { Summer } from "../../summers/summer.js";
import { LowerBound, NEGATIVE_INFINITY } from "./lower-bound.js";

export function sumOfLowerBounds<T>(
  summer: Summer<T>,
  x0: LowerBound<T>,
  x1: LowerBound<T>,
): LowerBound<T> {
  return x0 === NEGATIVE_INFINITY || x1 === NEGATIVE_INFINITY
    ? NEGATIVE_INFINITY
    : summer(x0, x1);
}

export function sumOfLowerBoundsNatural<T extends number | string>(
  x0: LowerBound<T>,
  x1: LowerBound<T>,
): LowerBound<T> {
  return sumOfLowerBounds(naturalSummer, x0, x1);
}

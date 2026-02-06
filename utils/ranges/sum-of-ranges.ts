import { naturalSummer } from "../summers/natural-summer.js";
import { Summer } from "../summers/summer.js";
import { sumOfLowerBounds } from "./lower-bounds/sum-of-lower-bounds.js";
import { lowerBoundOf, Range, rangeFromBounds, upperBoundOf } from "./range.js";
import { sumOfUpperBounds } from "./upper-bounds/sum-of-upper-bounds.js";

export function sumOfRanges<T>(
  summer: Summer<T>,
  range0: Range<T>,
  range1: Range<T>,
): Range<T> {
  const min = sumOfLowerBounds(
    summer,
    lowerBoundOf(range0),
    lowerBoundOf(range1),
  );
  const max = sumOfUpperBounds(
    summer,
    upperBoundOf(range0),
    upperBoundOf(range1),
  );
  return rangeFromBounds(min, max);
}

export function sumOfRangesNatural<T extends number | string>(
  x0: Range<T>,
  x1: Range<T>,
): Range<T> {
  return sumOfRanges(naturalSummer, x0, x1);
}

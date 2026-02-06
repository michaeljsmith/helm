import { Comparator } from "../comparators/comparator.js";
import { naturalComparator } from "../comparators/natural-comparator.js";
import { clampToLowerBound } from "./lower-bounds/clamp-to-lower-bound.js";
import { lowerBoundOf, Range, upperBoundOf } from "./range.js";
import { clampToUpperBound } from "./upper-bounds/clamp-to-upper-bound.js";

export function clampToRange<T>(
  comparator: Comparator<T>,
  range: Range<T>,
  value: T,
): T {
  return clampToLowerBound(
    comparator,
    lowerBoundOf(range),
    clampToUpperBound(comparator, upperBoundOf(range), value),
  );
}

export function clampToRangeNatural<T extends number | string>(
  range: Range<T>,
  value: T,
): T {
  return clampToRange(naturalComparator, range, value);
}

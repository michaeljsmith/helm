import { Comparator } from "../comparators/comparator.js";
import { naturalComparator } from "../comparators/natural-comparator.js";
import { maxOf } from "../max-of.js";
import { minOf } from "../min-of.js";
import { checkThat } from "../preconditions/check-that.js";
import { lowerBoundComparatorFor } from "./lower-bounds/lower-bound-comparator-for.js";
import { NEGATIVE_INFINITY } from "./lower-bounds/lower-bound.js";
import { lowerBoundOf, Range, rangeFromBounds, upperBoundOf } from "./range.js";
import { upperBoundComparatorFor } from "./upper-bounds/upper-bound-comparator-for.js";
import { POSITIVE_INFINITY } from "./upper-bounds/upper-bound.js";

export function intersectionOfRanges<T>(
  comparator: Comparator<T>,
  range0: Range<T>,
  range1: Range<T>,
): Range<T> {
  const min = maxOf(
    lowerBoundComparatorFor(comparator),
    lowerBoundOf(range0),
    lowerBoundOf(range1),
  );
  const max = minOf(
    upperBoundComparatorFor(comparator),
    upperBoundOf(range0),
    upperBoundOf(range1),
  );
  checkThat(
    min === NEGATIVE_INFINITY ||
      max === POSITIVE_INFINITY ||
      comparator(min, max) <= 0,
  );
  return rangeFromBounds(min, max);
}

export function intersectionOfRangesNatural<T extends number | string>(
  range0: Range<T>,
  range1: Range<T>,
): Range<T> {
  return intersectionOfRanges(naturalComparator, range0, range1);
}

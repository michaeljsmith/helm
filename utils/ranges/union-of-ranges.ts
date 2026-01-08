import { Comparator } from "../comparators/comparator.js";
import { naturalComparator } from "../comparators/natural-comparator.js";
import { maxOf } from "../max-of.js";
import { minOf } from "../min-of.js";
import { intersectionOfRanges } from "./intersection-of-ranges.js";
import { lowerBoundComparatorFor } from "./lower-bounds/lower-bound-comparator-for.js";
import { lowerBoundOf, Range, rangeFromBounds, upperBoundOf } from "./range.js";
import { upperBoundComparatorFor } from "./upper-bounds/upper-bound-comparator-for.js";

export const unionOfRanges = <T>(
  comparator: Comparator<T>,
  range0: Range<T>,
  range1: Range<T>,
): Range<T> => {
  // Check that the ranges overlap - if not, we cannot define the union using a Range.
  // This call will throw if there is no intersection.
  intersectionOfRanges(comparator, range0, range1);

  const min = minOf(
    lowerBoundComparatorFor(comparator),
    lowerBoundOf(range0),
    lowerBoundOf(range1),
  );
  const max = maxOf(
    upperBoundComparatorFor(comparator),
    upperBoundOf(range0),
    upperBoundOf(range1),
  );
  return rangeFromBounds(min, max);
};

export const unionOfRangesNatural = <T extends number | string>(
  range0: Range<T>,
  range1: Range<T>,
): Range<T> => unionOfRanges(naturalComparator, range0, range1);

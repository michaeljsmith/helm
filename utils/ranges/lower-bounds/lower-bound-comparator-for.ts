import { Comparator } from "../../comparators/comparator.js";
import { naturalComparator } from "../../comparators/natural-comparator.js";
import { LowerBound, NEGATIVE_INFINITY } from "./lower-bound.js";

export function lowerBoundComparatorFor<T>(
  comparator: Comparator<T>,
): Comparator<LowerBound<T>> {
  return (x0, x1) =>
    x0 === NEGATIVE_INFINITY && x1 === NEGATIVE_INFINITY
      ? 0
      : x0 === NEGATIVE_INFINITY
        ? -1
        : x1 === NEGATIVE_INFINITY
          ? 1
          : comparator(x0, x1);
}

export const naturalLowerBoundComparator =
  lowerBoundComparatorFor(naturalComparator);

import { Comparator } from "../../comparators/comparator.js";
import { naturalComparator } from "../../comparators/natural-comparator.js";
import { POSITIVE_INFINITY, UpperBound } from "./upper-bound.js";

export const upperBoundComparatorFor =
  <T>(comparator: Comparator<T>): Comparator<UpperBound<T>> =>
  (x0, x1) =>
    x0 === POSITIVE_INFINITY && x1 === POSITIVE_INFINITY
      ? 0
      : x0 === POSITIVE_INFINITY
        ? 1
        : x1 === POSITIVE_INFINITY
          ? -1
          : comparator(x0, x1);

export const naturalUpperBoundComparator =
  upperBoundComparatorFor(naturalComparator);

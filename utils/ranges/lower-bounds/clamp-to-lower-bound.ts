import { Comparator } from "../../comparators/comparator.js";
import { naturalComparator } from "../../comparators/natural-comparator.js";
import { maxOf } from "../../max-of.js";
import { LowerBound, NEGATIVE_INFINITY } from "./lower-bound.js";

export function clampToLowerBound<T>(
  comparator: Comparator<T>,
  bound: LowerBound<T>,
  value: T,
): T {
  return bound === NEGATIVE_INFINITY ? value : maxOf(comparator, value, bound);
}

export function clampToLowerBoundNatural<T extends number | string>(
  bound: LowerBound<T>,
  value: T,
): T {
  return clampToLowerBound(naturalComparator, bound, value);
}

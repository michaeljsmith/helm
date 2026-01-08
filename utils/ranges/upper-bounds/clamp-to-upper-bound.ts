import { Comparator } from "../../comparators/comparator.js";
import { naturalComparator } from "../../comparators/natural-comparator.js";
import { minOf } from "../../min-of.js";
import { POSITIVE_INFINITY, UpperBound } from "./upper-bound.js";

export const clampToUpperBound = <T>(
  comparator: Comparator<T>,
  bound: UpperBound<T>,
  value: T,
): T => (bound === POSITIVE_INFINITY ? value : minOf(comparator, value, bound));

export const clampToUpperBoundNatural = <T extends number | string>(
  bound: UpperBound<T>,
  value: T,
): T => clampToUpperBound(naturalComparator, bound, value);

import { Comparator } from "../../comparators/comparator.js";
import { naturalComparator } from "../../comparators/natural-comparator.js";
import { maxOf } from "../../max-of.js";
import { LowerBound, NEGATIVE_INFINITY } from "./lower-bound.js";

export const clampToLowerBound = <T>(
  comparator: Comparator<T>,
  bound: LowerBound<T>,
  value: T,
): T => (bound === NEGATIVE_INFINITY ? value : maxOf(comparator, value, bound));

export const clampToLowerBoundNatural = <T extends number | string>(
  bound: LowerBound<T>,
  value: T,
): T => clampToLowerBound(naturalComparator, bound, value);

import { Comparator } from "./comparators/comparator.js";
import { naturalComparator } from "./comparators/natural-comparator.js";

export function minOf<T>(comparator: Comparator<T>, x0: T, x1: T): T {
  return comparator(x0, x1) <= 0 ? x0 : x1;
}

export function minOfNatural<T extends number | string>(x0: T, x1: T): T {
  return minOf(naturalComparator, x0, x1);
}

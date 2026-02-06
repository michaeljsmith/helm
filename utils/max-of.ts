import { Comparator } from "./comparators/comparator.js";
import { naturalComparator } from "./comparators/natural-comparator.js";

export function maxOf<T>(comparator: Comparator<T>, x0: T, x1: T): T {
  return comparator(x0, x1) <= 0 ? x1 : x0;
}

export function maxOfNatural<T extends number | string>(x0: T, x1: T): T {
  return maxOf(naturalComparator, x0, x1);
}

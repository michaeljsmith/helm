import { Comparator } from "./comparators/comparator.js";
import { naturalComparator } from "./comparators/natural-comparator.js";

export const minOf = <T>(comparator: Comparator<T>, x0: T, x1: T): T =>
  comparator(x0, x1) <= 0 ? x0 : x1;

export const minOfNatural = <T extends number | string>(x0: T, x1: T): T =>
  minOf(naturalComparator, x0, x1);

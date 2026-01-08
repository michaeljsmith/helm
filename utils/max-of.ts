import { Comparator } from "./comparators/comparator.js";
import { naturalComparator } from "./comparators/natural-comparator.js";

export const maxOf = <T>(comparator: Comparator<T>, x0: T, x1: T): T =>
  comparator(x0, x1) <= 0 ? x1 : x0;

export const maxOfNatural = <T extends number | string>(x0: T, x1: T): T =>
  maxOf(naturalComparator, x0, x1);

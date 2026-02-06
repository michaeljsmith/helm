import { LowerBound, NEGATIVE_INFINITY } from "./lower-bounds/lower-bound.js";
import { POSITIVE_INFINITY, UpperBound } from "./upper-bounds/upper-bound.js";

export interface Range<T> {
  min?: T;
  max?: T;
}

export function lowerBoundOf<T>(range: Range<T>): LowerBound<T> {
  return range.min === undefined ? NEGATIVE_INFINITY : range.min;
}

export function upperBoundOf<T>(range: Range<T>): UpperBound<T> {
  return range.max === undefined ? POSITIVE_INFINITY : range.max;
}

export function rangeFromBounds<T>(
  lowerBound: LowerBound<T>,
  upperBound: UpperBound<T>,
): Range<T> {
  return {
    min: lowerBound === NEGATIVE_INFINITY ? undefined : lowerBound,
    max: upperBound === POSITIVE_INFINITY ? undefined : upperBound,
  };
}

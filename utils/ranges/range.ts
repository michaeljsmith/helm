import { LowerBound, NEGATIVE_INFINITY } from "./lower-bounds/lower-bound.js";
import { POSITIVE_INFINITY, UpperBound } from "./upper-bounds/upper-bound.js";

export interface Range<T> {
  min?: T;
  max?: T;
}

export const lowerBoundOf = <T>(range: Range<T>): LowerBound<T> =>
  range.min === undefined ? NEGATIVE_INFINITY : range.min;

export const upperBoundOf = <T>(range: Range<T>): UpperBound<T> =>
  range.max === undefined ? POSITIVE_INFINITY : range.max;

export const rangeFromBounds = <T>(
  lowerBound: LowerBound<T>,
  upperBound: UpperBound<T>,
): Range<T> => ({
  min: lowerBound === NEGATIVE_INFINITY ? undefined : lowerBound,
  max: upperBound === POSITIVE_INFINITY ? undefined : upperBound,
});

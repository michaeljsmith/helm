import { naturalSummer } from "../../summers/natural-summer.js";
import { Summer } from "../../summers/summer.js";
import { POSITIVE_INFINITY, UpperBound } from "./upper-bound.js";

export const sumOfUpperBounds = <T>(
  summer: Summer<T>,
  x0: UpperBound<T>,
  x1: UpperBound<T>,
): UpperBound<T> =>
  x0 === POSITIVE_INFINITY || x1 === POSITIVE_INFINITY
    ? POSITIVE_INFINITY
    : summer(x0, x1);

export const sumOfUpperBoundsNatural = <T extends number | string>(
  x0: UpperBound<T>,
  x1: UpperBound<T>,
): UpperBound<T> => sumOfUpperBounds(naturalSummer, x0, x1);

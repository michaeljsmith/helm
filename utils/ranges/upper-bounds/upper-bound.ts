export const POSITIVE_INFINITY = Symbol();
export type PositiveInfity = typeof POSITIVE_INFINITY;
export type UpperBound<T> = T | PositiveInfity;

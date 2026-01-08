export const NEGATIVE_INFINITY = Symbol();
export type NegativeInfity = typeof NEGATIVE_INFINITY;
export type LowerBound<T> = T | NegativeInfity;

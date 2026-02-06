export function naturalComparator<T extends number | string>(
  x0: T,
  x1: T,
): number {
  return x0 < x1 ? -1 : x0 > x1 ? 1 : 0;
}

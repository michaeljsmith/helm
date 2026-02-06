export function naturalSummer<T extends string | number>(x0: T, x1: T): T {
  return ((x0 as number) + (x1 as number)) as T;
}

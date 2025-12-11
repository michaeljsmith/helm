export function checkExists<T>(x: T | null | undefined): T;
export function checkExists<T>(x: T | null | undefined): T {
  if (x === null || x === undefined) {
    throw new Error("Value missing");
  }
  return x;
}

export const smoothStep = (t: number): number => {
  t = Math.max(0, Math.min(1.0, t));
  return t * t * (3.0 - 2.0 * t);
};

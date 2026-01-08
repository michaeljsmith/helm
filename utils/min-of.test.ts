import { minOfNatural } from "./min-of.js";

describe("minOf", () => {
  it("finds first as min", () => {
    const min = minOfNatural(1, 2);
    expect(min).toBe(1);
  });

  it("finds second as min", () => {
    const min = minOfNatural(3, 2);
    expect(min).toBe(2);
  });

  it("handles equality", () => {
    const min = minOfNatural(3, 3);
    expect(min).toBe(3);
  });
});

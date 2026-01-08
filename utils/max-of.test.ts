import { maxOfNatural } from "./max-of.js";

describe("maxOf", () => {
  it("finds first as max", () => {
    const max = maxOfNatural(1, 2);
    expect(max).toBe(2);
  });

  it("finds second as max", () => {
    const max = maxOfNatural(3, 2);
    expect(max).toBe(3);
  });

  it("handles equality", () => {
    const max = maxOfNatural(3, 3);
    expect(max).toBe(3);
  });
});

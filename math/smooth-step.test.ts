import { smoothStep } from "./smooth-step.js";

describe("smoothStep", () => {
  it("is 0 at 0", () => {
    expect(smoothStep(0)).toBe(0);
  });

  it("is 1 at 1", () => {
    expect(smoothStep(1)).toBe(1);
  });

  it("is intermediate value at 0.5", () => {
    const result = smoothStep(0.5);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });
});

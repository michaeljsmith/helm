import { intersectionOfRangesNatural } from "./intersection-of-ranges.js";
import { Range } from "./range.js";

describe("intersectionOfRanges", () => {
  it("finds intersection of trivial ranges", () => {
    const intersection = intersectionOfRangesNatural({}, {});
    expect(intersection).toEqual({});
  });

  it("finds intersection of closed ranges", () => {
    const range0: Range<number> = { min: 1, max: 5 };
    const range1: Range<number> = { min: 3, max: 7 };
    const intersection = intersectionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ min: 3, max: 5 });
  });

  it("finds intersection of closed/open ranges", () => {
    const range0: Range<number> = { min: 1 };
    const range1: Range<number> = { min: 3 };
    const intersection = intersectionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ min: 3 });
  });

  it("finds intersection of open/closed ranges", () => {
    const range0: Range<number> = { max: 1 };
    const range1: Range<number> = { max: 3 };
    const intersection = intersectionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ max: 1 });
  });

  it("finds intersection of closed/open range with open/closed range", () => {
    const range0: Range<number> = { min: 1 };
    const range1: Range<number> = { max: 3 };
    const intersection = intersectionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ min: 1, max: 3 });
  });

  it("catches empty intersection", () => {
    const range0: Range<number> = { max: 1 };
    const range1: Range<number> = { min: 3 };
    expect(() => intersectionOfRangesNatural(range0, range1)).toThrow();
  });
});

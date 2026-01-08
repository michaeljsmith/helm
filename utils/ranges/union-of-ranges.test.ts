import { Range } from "./range.js";
import { unionOfRangesNatural } from "./union-of-ranges.js";

describe("unionOfRanges", () => {
  it("finds union of trivial ranges", () => {
    const intersection = unionOfRangesNatural({}, {});
    expect(intersection).toEqual({});
  });

  it("finds union of closed ranges", () => {
    const range0: Range<number> = { min: 1, max: 5 };
    const range1: Range<number> = { min: 3, max: 7 };
    const intersection = unionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ min: 1, max: 7 });
  });

  it("finds union of closed/open ranges", () => {
    const range0: Range<number> = { min: 1 };
    const range1: Range<number> = { min: 3 };
    const intersection = unionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ min: 1 });
  });

  it("finds union of open/closed ranges", () => {
    const range0: Range<number> = { max: 1 };
    const range1: Range<number> = { max: 3 };
    const intersection = unionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({ max: 3 });
  });

  it("finds union of closed/open range with open/closed range", () => {
    const range0: Range<number> = { min: 1 };
    const range1: Range<number> = { max: 3 };
    const intersection = unionOfRangesNatural(range0, range1);
    expect(intersection).toEqual({});
  });

  it("catches empty intersection", () => {
    const range0: Range<number> = { max: 1 };
    const range1: Range<number> = { min: 3 };
    expect(() => unionOfRangesNatural(range0, range1)).toThrow();
  });
});

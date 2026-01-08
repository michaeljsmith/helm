import { applyLayout } from "./apply-layout.js";
import { converted, fixed, LiteralLayout, series } from "./layout.js";

type TestEntity = {
  start: [x: number, y: number, z: number];
  size: [x: number, y: number, z: number];
};

const literal: LiteralLayout<TestEntity> = {
  type: "literal-layout",
  construct: (start, size) => ({ start, size }),
};

describe("applyLayout", () => {
  it("lays out single literal", () => {
    const layout = fixed([1, 1, 2], literal);
    const entities = new Set(applyLayout(layout));
    expect(entities).toMatchSnapshot();
  });

  it("lays out series", () => {
    const layout = series([
      fixed([1, 1, 2], literal),
      fixed([2, 1, 1], literal),
    ]);
    const entities = new Set(applyLayout(layout));
    expect(entities).toMatchSnapshot();
  });

  it("lays out converted layout", () => {
    const layout = converted(
      (entities: Iterable<TestEntity>) =>
        [...entities]
          .map((e) => e.size[0] * e.size[1] * e.size[2])
          .reduce((x0, x1) => x0 + x1),
      fixed([1, 1, 2], literal),
    );
    const result = [...applyLayout(layout)].reduce((x0, x1) => x0 + x1);
    expect(result).toBe(2);
  });
});

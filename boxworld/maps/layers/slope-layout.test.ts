import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { direction2With } from "../../../math/direction.js";
import { point2With } from "../../../math/point.js";
import { fractionalProjectionForBounds, slope } from "./slope-layout.js";

describe("slopeLayout", () => {
  it("produces sloping heights", () => {
    const layerLayout = slope(0, 10, direction2With(1, 0));
    const layer = layerLayout.construct([1, 2], [1, 1]);
    expect(layer.heightAt(1.0, 1.0)).toEqual(0);
    expect(layer.heightAt(1.5, 1.5)).toEqual(5);
    expect(layer.heightAt(2.0, 2.0)).toEqual(10);
  });

  describe("fractionalProjectionForBounds", () => {
    it("finds position along upward direction", () => {
      const fractionalProjectionFor = fractionalProjectionForBounds(
        { center: point2With(1, 2), dimensions: aabDimensions2With(2, 1) },
        direction2With(0, 1),
      );
      expect(fractionalProjectionFor(point2With(3, 3))).toEqual(1);
      expect(fractionalProjectionFor(point2With(1, 2))).toEqual(0.5);
      expect(fractionalProjectionFor(point2With(-1, 1))).toEqual(0);
    });

    it("finds position along downward direction", () => {
      const fractionalProjectionFor = fractionalProjectionForBounds(
        { center: point2With(1, 2), dimensions: aabDimensions2With(2, 1) },
        direction2With(0, -1),
      );
      expect(fractionalProjectionFor(point2With(3, 3))).toEqual(0);
      expect(fractionalProjectionFor(point2With(1, 2))).toEqual(0.5);
      expect(fractionalProjectionFor(point2With(-1, 1))).toEqual(1);
    });

    it("finds position along horizontal direction", () => {
      const fractionalProjectionFor = fractionalProjectionForBounds(
        { center: point2With(1, 2), dimensions: aabDimensions2With(2, 1) },
        direction2With(1, 0),
      );
      expect(fractionalProjectionFor(point2With(3, 3))).toEqual(1);
      expect(fractionalProjectionFor(point2With(1, 2))).toEqual(0.5);
      expect(fractionalProjectionFor(point2With(-1, 1))).toEqual(0);
    });
  });
});

import { checkExists } from "../../../utils/preconditions/check-exists.js";
import { checkThat } from "../../../utils/preconditions/check-that.js";
import { clampToRangeNatural } from "../../../utils/ranges/clamp-to-range.js";
import { intersectionOfRangesNatural } from "../../../utils/ranges/intersection-of-ranges.js";
import { Range } from "../../../utils/ranges/range.js";
import { sumOfRangesNatural } from "../../../utils/ranges/sum-of-ranges.js";
import { Layout } from "./layout.js";

export const applyLayout = <T>(layout: Layout<T>): Iterable<T> => {
  const desiredSize = getDesiredSizeForLayout(layout);
  return constructLayout(
    layout,
    [0, 0],
    [checkExists(desiredSize[0].min), checkExists(desiredSize[1].min)],
  );
};

const constructLayout = function* <T>(
  layout: Layout<T>,
  start: [x: number, z: number],
  dimensions: [x: number, z: number],
): Generator<T> {
  switch (layout.type) {
    case "literal-layout": {
      yield layout.construct(start, dimensions);
      return;
    }

    case "converted-layout": {
      const inputResult = constructLayout(layout.input, start, dimensions);
      yield layout.convert(inputResult);
      return;
    }

    case "fixed-layout": {
      yield* constructLayout(layout.contents, start, dimensions);
      return;
    }

    case "series-layout": {
      let minimumTotalDepth: number = 0;
      for (const child of layout.children) {
        const [_childWidth, childDepth] = getDesiredSizeForLayout(child);

        minimumTotalDepth += childDepth.min ?? 0;
      }

      const [x] = start;
      let [, z] = start;
      const [assignedWidth, assignedDepth] = dimensions;
      let excessDepth = assignedDepth - minimumTotalDepth;

      for (const child of layout.children) {
        const [childWidthRange, childDepthRange] =
          getDesiredSizeForLayout(child);

        const childWidth = clampToRangeNatural(childWidthRange, assignedWidth);
        checkThat(assignedWidth >= childWidth);

        const minChildDepth = childDepthRange.min ?? 0;
        const childDepth = clampToRangeNatural(
          childDepthRange,
          minChildDepth + excessDepth,
        );
        excessDepth -= childDepth - minChildDepth;

        yield* constructLayout(child, [x, z], [childWidth, childDepth]);
        z -= childDepth; // The -z direction is forward.
      }
    }
  }
};

const getDesiredSizeForLayout = (
  layout: Layout<unknown>,
): [x: Range<number>, z: Range<number>] => {
  switch (layout.type) {
    case "literal-layout": {
      return [{}, {}];
    }

    case "converted-layout": {
      return getDesiredSizeForLayout(layout.input);
    }

    case "fixed-layout": {
      const [contentX, contentZ] = getDesiredSizeForLayout(layout.contents);
      return [
        intersectionOfRangesNatural(
          { min: layout.size[0], max: layout.size[0] },
          contentX,
        ),
        intersectionOfRangesNatural(
          { min: layout.size[1], max: layout.size[1] },
          contentZ,
        ),
      ];
    }

    case "series-layout": {
      let width: Range<number> = {};
      let totalDepth: Range<number> = { min: 0, max: 0 };

      for (const child of layout.children) {
        const [childWidth, childDepth] = getDesiredSizeForLayout(child);

        // If the children have a max dimension, ignore it - the container will
        // be as wide as it needs to be, and will create the child with the right
        // dimensions and centered.
        width = intersectionOfRangesNatural(width, {
          ...childWidth,
          max: undefined,
        });

        totalDepth = sumOfRangesNatural(totalDepth, childDepth);
      }

      return [width, totalDepth];
    }
  }
};

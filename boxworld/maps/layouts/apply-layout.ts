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
    [0, 0, 0],
    [
      checkExists(desiredSize[0].min),
      checkExists(desiredSize[1].min),
      checkExists(desiredSize[2].min),
    ],
  );
};

const constructLayout = function* <T>(
  layout: Layout<T>,
  start: [x: number, y: number, z: number],
  dimensions: [x: number, y: number, z: number],
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
        const [_childWidth, _childHeight, childDepth] =
          getDesiredSizeForLayout(child);

        minimumTotalDepth += childDepth.min ?? 0;
      }

      const [x, y] = start;
      let [, , z] = start;
      const [assignedWidth, assignedHeight, assignedDepth] = dimensions;
      let excessDepth = assignedDepth - minimumTotalDepth;

      for (const child of layout.children) {
        const [childWidthRange, childHeightRange, childDepthRange] =
          getDesiredSizeForLayout(child);

        const childWidth = clampToRangeNatural(childWidthRange, assignedWidth);
        checkThat(assignedWidth >= childWidth);

        const childHeight = clampToRangeNatural(
          childHeightRange,
          assignedHeight,
        );
        checkThat(assignedHeight >= childHeight);

        const minChildDepth = childDepthRange.min ?? 0;
        const childDepth = clampToRangeNatural(
          childDepthRange,
          minChildDepth + excessDepth,
        );
        excessDepth -= childDepth - minChildDepth;

        yield* constructLayout(
          child,
          [x, y, z],
          [childWidth, childHeight, childDepth],
        );
        z -= childDepth; // The -z direction is forward.
      }
    }
  }
};

const getDesiredSizeForLayout = (
  layout: Layout<unknown>,
): [x: Range<number>, y: Range<number>, z: Range<number>] => {
  switch (layout.type) {
    case "literal-layout": {
      return [{}, {}, {}];
    }

    case "converted-layout": {
      return getDesiredSizeForLayout(layout.input);
    }

    case "fixed-layout": {
      const [contentX, contentY, contentZ] = getDesiredSizeForLayout(
        layout.contents,
      );
      return [
        intersectionOfRangesNatural(
          { min: layout.size[0], max: layout.size[0] },
          contentX,
        ),
        intersectionOfRangesNatural(
          { min: layout.size[1], max: layout.size[1] },
          contentY,
        ),
        intersectionOfRangesNatural(
          { min: layout.size[2], max: layout.size[2] },
          contentZ,
        ),
      ];
    }

    case "series-layout": {
      let width: Range<number> = {};
      let height: Range<number> = {};
      let totalDepth: Range<number> = { min: 0, max: 0 };

      for (const child of layout.children) {
        const [childWidth, childHeight, childDepth] =
          getDesiredSizeForLayout(child);

        // If the children have a max dimension, ignore it - the container will
        // be as wide as it needs to be, and will create the child with the right
        // dimensions and centered.
        width = intersectionOfRangesNatural(width, {
          ...childWidth,
          max: undefined,
        });
        height = intersectionOfRangesNatural(height, {
          ...childHeight,
          max: undefined,
        });

        totalDepth = sumOfRangesNatural(totalDepth, childDepth);
      }

      return [width, height, totalDepth];
    }
  }
};

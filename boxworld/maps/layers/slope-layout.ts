import { Aab2 } from "../../../math/aab.js";
import { Direction2 } from "../../../math/direction.js";
import { farthestAabCornerOffset2 } from "../../../math/farthest-aab-corner-offset.js";
import { Point2 } from "../../../math/point.js";
import { project2 } from "../../../math/project.js";
import { vectorAdd2, vectorSubtract2 } from "../../../math/vector-add.js";
import { LiteralLayout } from "../layouts/layout.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";
import { layer } from "./layer-layout.js";

export const slope = (
  startHeight: number,
  endHeight: number,
  direction: Direction2,
): LiteralLayout<TerrainLayer> => {
  return layer((bounds) => {
    const fractionalProjectionFor = fractionalProjectionForBounds(
      bounds,
      direction,
    );
    return (position) =>
      startHeight +
      (endHeight - startHeight) * fractionalProjectionFor(position);
  });
};

// Visible for testing.
export const fractionalProjectionForBounds = (
  bounds: Aab2,
  direction: Direction2,
): ((position: Point2) => number) => {
  const cornerOffset = farthestAabCornerOffset2(bounds.dimensions, direction);
  const nearCorner = vectorSubtract2(bounds.center, cornerOffset);
  const farCorner = vectorAdd2(bounds.center, cornerOffset);
  const nearProjection = project2(direction, nearCorner);
  const farProjection = project2(direction, farCorner);
  return (position) => {
    const projection = project2(direction, position);
    return (projection - nearProjection) / (farProjection - nearProjection);
  };
};

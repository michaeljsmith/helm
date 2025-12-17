import { Offset } from "./offset.js";
import { Point } from "./point.js";
import { quaternionRotate } from "./quaternion-rotate.js";
import { RigidTransform } from "./rigid-transform.js";
import { vectorAdd } from "./vector-add.js";

export const rigidApply = (transform: RigidTransform, point: Point): Point => {
  // When we do the rotation, we are really treating the point as an offset from the origin.
  // We can express this without casting as `point - ORIGIN`, but we do a cast to avoid the inefficiency.
  const pointAsOffset = point as unknown as Offset;

  const rotatedPoint = quaternionRotate(transform.rotation, pointAsOffset);
  return vectorAdd(transform.position, rotatedPoint);
};

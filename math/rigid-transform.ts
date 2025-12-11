import { Point } from "./point.js";
import { UnitQuaternion } from "./unit-quaternion.js";

export type RigidTransform = {
  rotation: UnitQuaternion;
  position: Point;
};

export const rigidTransformWith = (
  rotation: UnitQuaternion,
  position: Point,
): RigidTransform => ({ rotation, position });

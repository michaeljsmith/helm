import { ORIGIN, Point } from "./point.js";
import { IDENTITY_UNIT_QUATERNION, UnitQuaternion } from "./unit-quaternion.js";

export type RigidTransform = {
  rotation: UnitQuaternion;
  position: Point;
};

export const rigidTransformWith = (
  rotation: UnitQuaternion,
  position: Point,
): RigidTransform => ({ rotation, position });

export const IDENTITY_RIGID = rigidTransformWith(
  IDENTITY_UNIT_QUATERNION,
  ORIGIN,
);

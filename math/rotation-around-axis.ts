import { Direction, X_AXIS, Y_AXIS, Z_AXIS } from "./direction.js";
import { UnitQuaternion, unitQuaternionWith } from "./unit-quaternion.js";

export const rotationAroundAxis = (
  axis: Direction,
  angle: number,
): UnitQuaternion => {
  const cos = Math.cos(angle / 2);
  const sin = Math.sin(angle / 2);

  const w = cos;
  const x = axis[0] * sin;
  const y = axis[1] * sin;
  const z = axis[2] * sin;

  return unitQuaternionWith(w, x, y, z);
};

export const rotationAroundX = (angle: number): UnitQuaternion =>
  rotationAroundAxis(X_AXIS, angle);

export const rotationAroundY = (angle: number): UnitQuaternion =>
  rotationAroundAxis(Y_AXIS, angle);

export const rotationAroundZ = (angle: number): UnitQuaternion =>
  rotationAroundAxis(Z_AXIS, angle);

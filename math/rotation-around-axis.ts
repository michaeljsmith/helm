import { Direction, X_AXIS, Y_AXIS, Z_AXIS } from "./direction.js";
import { UnitQuaternion, unitQuaternionWith } from "./unit-quaternion.js";

export function rotationAroundAxis(
  axis: Direction,
  angle: number,
): UnitQuaternion {
  const cos = Math.cos(angle / 2);
  const sin = Math.sin(angle / 2);

  const w = cos;
  const x = axis[0] * sin;
  const y = axis[1] * sin;
  const z = axis[2] * sin;

  return unitQuaternionWith(w, x, y, z);
}

export function rotationAroundX(angle: number): UnitQuaternion {
  return rotationAroundAxis(X_AXIS, angle);
}

export function rotationAroundY(angle: number): UnitQuaternion {
  return rotationAroundAxis(Y_AXIS, angle);
}

export function rotationAroundZ(angle: number): UnitQuaternion {
  return rotationAroundAxis(Z_AXIS, angle);
}

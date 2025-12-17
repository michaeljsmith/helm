import { Direction } from "./direction.js";
import { Offset, offsetWith } from "./offset.js";
import { Point } from "./point.js";
import { quaternionMultiply } from "./quaternion-multiply.js";
import { UnitQuaternion, unitQuaternionWith } from "./unit-quaternion.js";
import { Vector3 } from "./vector.js";

export function quaternionRotate(
  quaternion: UnitQuaternion,
  offset: Offset,
): Offset;
export function quaternionRotate(
  quaternion: UnitQuaternion,
  direction: Direction,
): Direction;
export function quaternionRotate(
  quaternion: UnitQuaternion,
  point: Point,
): Point;
export function quaternionRotate(
  quaternion: UnitQuaternion,
  vector: Vector3,
): Vector3 {
  const vectorAsQuat = unitQuaternionWith(0, vector[0], vector[1], vector[2]);

  const inverse = unitQuaternionWith(
    quaternion[0],
    -quaternion[1],
    -quaternion[2],
    -quaternion[3],
  );

  const resultAsQuat = quaternionMultiply(
    quaternionMultiply(quaternion, vectorAsQuat),
    inverse,
  );

  return offsetWith(resultAsQuat[1], resultAsQuat[2], resultAsQuat[3]);
}

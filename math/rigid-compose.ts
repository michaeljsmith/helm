import { Offset } from "./offset.js";
import { quaternionMultiply } from "./quaternion-multiply.js";
import { quaternionRotate } from "./quaternion-rotate.js";
import { RigidTransform, rigidTransformWith } from "./rigid-transform.js";
import { vectorAdd } from "./vector-add.js";

export const rigidCompose = (
  parent: RigidTransform,
  child: RigidTransform,
): RigidTransform => {
  const newRotation = quaternionMultiply(parent.rotation, child.rotation);
  // When we do the rotation, we are really treating the point as an offset from the origin.
  // We can express this without casting as `point - ORIGIN`, but we do a cast to avoid the inefficiency.
  const childPositionAsOffset = child.position as unknown as Offset;
  const rotatedChildPosition = quaternionRotate(
    parent.rotation,
    childPositionAsOffset,
  );

  return rigidTransformWith(
    newRotation,
    vectorAdd(parent.position, rotatedChildPosition),
  );
};

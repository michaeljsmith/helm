import { crossProduct } from "../../../math/cross-product.js";
import { directionNegate } from "../../../math/direction-negate.js";
import { Direction, directionWith } from "../../../math/direction.js";
import { ORIGIN } from "../../../math/point.js";
import { quaternionRotate } from "../../../math/quaternion-rotate.js";
import { rigidApply } from "../../../math/rigid-apply.js";
import { rigidCompose } from "../../../math/rigid-compose.js";
import {
  IDENTITY_RIGID,
  RigidTransform,
} from "../../../math/rigid-transform.js";
import { vectorAdd, vectorSubtract } from "../../../math/vector-add.js";
import { vectorScale } from "../../../math/vector-scale.js";
import { Color3 } from "../../color.js";
import { BoxModel } from "../../models/box-model.js";
import { Model } from "../../models/model.js";

export const compileModel = (
  model: Model<unknown>,
): {
  positions: number[];
  normals: number[];
  colors: number[];
  indices: number[];
} => {
  const context: CompileModelContext = {
    transform: IDENTITY_RIGID,
    positions: [],
    normals: [],
    colors: [],
    indices: [],
  };

  addModelRecurse(context, model);
  return {
    positions: context.positions,
    normals: context.normals,
    colors: context.colors,
    indices: context.indices,
  };
};

type CompileModelContext = {
  transform: RigidTransform;
  positions: number[];
  normals: number[];
  colors: number[];
  indices: number[];
};

const addModelRecurse = (
  context: CompileModelContext,
  model: Model<unknown>,
): void => {
  switch (model.type) {
    case "box-model": {
      return addBox(context, model);
    }

    case "transformed-model": {
      const childContext = {
        ...context,
        transform: rigidCompose(context.transform, model.transform),
      };
      return addModelRecurse(childContext, model.model);
    }

    case "union-model": {
      for (const childModel of model.models) {
        addModelRecurse(context, childModel);
      }
      break;
    }

    case "tag-model": {
      return;
    }
  }
};

const addBox = (context: CompileModelContext, model: BoxModel): void => {
  for (let axis = 0; axis < 3; ++axis) {
    const normalElements = [0, 0, 0];
    normalElements[axis] = 1;
    const rightElements = [0, 0, 0];
    rightElements[(axis + 1) % 3] = 1;

    const maybeNegateDirection = (negate: boolean, direction: Direction) =>
      negate ? directionNegate(direction) : direction;

    const dimensions: [number, number, number] = [0, 0, 0];
    dimensions[axis] = model.dimensions[0];
    dimensions[(axis + 1) % 3] = model.dimensions[1];
    dimensions[(axis + 2) % 3] = model.dimensions[2];
    for (let direction = 0; direction < 2; ++direction) {
      const normal = maybeNegateDirection(
        direction === 2,
        directionWith(normalElements[0], normalElements[1], normalElements[2]),
      );
      const right = maybeNegateDirection(
        direction === 2,
        directionWith(rightElements[0], rightElements[1], rightElements[2]),
      );

      addFace(context, normal, right, model.color, dimensions);
    }
  }
};

const addFace = (
  context: CompileModelContext,
  normal: Direction,
  right: Direction,
  color: Color3,
  dimensions: [number, number, number],
): void => {
  const up = crossProduct(right, normal);

  const scaledRight = vectorScale(right, 0.5 * dimensions[1]);
  const scaledUp = vectorScale(up, 0.5 * dimensions[2]);
  const scaledNormal = vectorScale(normal, 0.5 * dimensions[0]);

  const center = vectorAdd(ORIGIN, scaledNormal);
  const i0 = context.positions.length / 3;

  context.positions.push(
    ...rigidApply(
      context.transform,
      vectorAdd(vectorAdd(center, scaledRight), scaledUp),
    ),
    ...rigidApply(
      context.transform,
      vectorSubtract(vectorAdd(center, scaledRight), scaledUp),
    ),
    ...rigidApply(
      context.transform,
      vectorSubtract(vectorSubtract(center, scaledRight), scaledUp),
    ),
    ...rigidApply(
      context.transform,
      vectorAdd(vectorSubtract(center, scaledRight), scaledUp),
    ),
  );
  const transformedNormal = quaternionRotate(
    context.transform.rotation,
    normal,
  );
  context.normals.push(
    ...transformedNormal,
    ...transformedNormal,
    ...transformedNormal,
    ...transformedNormal,
  );
  context.colors.push(...color, ...color, ...color, ...color);

  context.indices.push(i0 + 0, i0 + 1, i0 + 2, i0 + 2, i0 + 3, i0 + 0);
};

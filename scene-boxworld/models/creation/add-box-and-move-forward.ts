import {
  aabDimensionDepth,
  AabDimensions,
} from "../../../math/aab-dimensions.js";
import { pointWith } from "../../../math/point.js";
import { rigidTransformWith } from "../../../math/rigid-transform.js";
import { IDENTITY_UNIT_QUATERNION } from "../../../math/unit-quaternion.js";
import { Color3 } from "../../color.js";
import { BoxModel } from "../box-model.js";
import { Model } from "../model.js";
import { TransformedModel } from "../transformed-model.js";
import { addModel } from "./add-model.js";
import { ModelCreationContext } from "./model-creation-context.js";
import { pushTransform } from "./push-transform.js";

export const addBoxAndMoveForward = <Tag>(
  context: ModelCreationContext<Tag>,
  color: Color3,
  dimensions: AabDimensions,
): void => {
  // Add a transformed box model.
  // The transform is forward half the depth of the box.
  const boxTransform = rigidTransformWith(
    IDENTITY_UNIT_QUATERNION,
    pointWith(0, 0, -aabDimensionDepth(dimensions) / 2),
  );
  const boxModel: BoxModel = { type: "box-model", color, dimensions };
  const transformedBoxModel: TransformedModel<[Model<Tag>]> = {
    type: "transformed-model",
    transform: boxTransform,
    model: boxModel,
  };
  addModel(context, transformedBoxModel);

  const tailTransform = rigidTransformWith(
    IDENTITY_UNIT_QUATERNION,
    pointWith(0, 0, -aabDimensionDepth(dimensions)),
  );

  pushTransform(context, tailTransform);
};

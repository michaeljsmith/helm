import { RigidTransform } from "../../../math/rigid-transform.js";
import { Model } from "../model.js";
import { TransformedModel } from "../transformed-model.js";
import { ModelCreationContext } from "./model-creation-context.js";

export const pushTransform = <Tag>(
  context: ModelCreationContext<Tag>,
  tailTransform: RigidTransform,
) => {
  const existingModels = context.models;
  const previousCloser = context.closer;
  context.models = [];
  context.closer = () => {
    const tailModel: Model<Tag> =
      context.models.length === 1
        ? context.models[0]
        : { type: "union-model", models: context.models };
    const transformedTailModel: TransformedModel<[Model<Tag>]> = {
      type: "transformed-model",
      transform: tailTransform,
      model: tailModel,
    };

    existingModels.push(transformedTailModel);

    context.models = existingModels;
    context.closer = previousCloser;
    previousCloser();
  };
};

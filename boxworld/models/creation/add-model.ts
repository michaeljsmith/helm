import { Model } from "../model.js";
import { ModelCreationContext } from "./model-creation-context.js";

export const addModel = <Tag>(
  context: ModelCreationContext<Tag>,
  model: Model<Tag>,
): void => {
  context.models.push(model);
};

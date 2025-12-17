import { Model } from "../model.js";
import { ModelCreationContext } from "./model-creation-context.js";

export const newModel = <Tag>(
  def: (context: ModelCreationContext<Tag>) => void,
): Model<Tag> => {
  const context: ModelCreationContext<Tag> = {
    closer: () => {},
    models: [],
  };
  def(context);
  context.closer();
  return context.models.length === 1
    ? context.models[0]
    : { type: "union-model", models: context.models };
};

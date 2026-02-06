import { Model } from "../model.js";
import { ModelCreationContext } from "./model-creation-context.js";

export function addModel<Tag>(
  context: ModelCreationContext<Tag>,
  model: Model<Tag>,
): void {
  context.models.push(model);
}

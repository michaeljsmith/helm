import { TagModel } from "../tag-model.js";
import { addModel } from './add-model.js';
import { ModelCreationContext } from "./model-creation-context.js";

export const addTag = <Tag>(
  context: ModelCreationContext<Tag>,
  tag: Tag,
): void => {
  const model: TagModel<Tag> = {
    type: "tag-model",
    tag,
  };
  addModel(context, model);
};

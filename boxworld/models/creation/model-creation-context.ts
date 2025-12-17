import { Model } from "../model.js";

export type ModelCreationContext<Tag> = {
  closer: () => void;
  models: Model<Tag>[];
};

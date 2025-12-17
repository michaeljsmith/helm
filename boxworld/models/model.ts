import { BoxModel } from "./box-model.js";
import { TagModel } from "./tag-model.js";
import { TransformedModel } from "./transformed-model.js";
import { UnionModel } from "./union-model.js";

export type Model<Tag> =
  | BoxModel
  | TransformedModel<[Model<Tag>]>
  | UnionModel<[Model<Tag>]>
  | TagModel<Tag>;

import { Unwrap } from "./unwrap.js";

export type UnionModel<WrappedChild> = {
  type: "union-model";
  models: Unwrap<WrappedChild>[];
};

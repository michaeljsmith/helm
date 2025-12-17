import { RigidTransform } from "../../math/rigid-transform.js";
import { Unwrap } from "./unwrap.js";

export type TransformedModel<WrappedChild> = {
  type: "transformed-model";
  transform: RigidTransform;
  model: Unwrap<WrappedChild>;
};

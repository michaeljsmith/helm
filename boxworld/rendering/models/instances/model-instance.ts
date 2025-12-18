import { RigidTransform } from "../../../../math/rigid-transform.js";
import { Model } from "../../../models/model.js";

export type ModelInstance = {
  model: Model<unknown>;
  transform: RigidTransform;
};

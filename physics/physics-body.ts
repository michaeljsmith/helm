import { Mutable } from "../entities/values/mutable.js";
import { DynamicsState } from "./dynamics-state.js";

export type PhysicsBody = {
  dynamics: Mutable<DynamicsState>;
};

import { ModelInstance } from "../rendering/models/instances/model-instance.js";

export type ModelInstanceArtifact = {
  type: "model-instance-artifact";
  instance: ModelInstance;
};

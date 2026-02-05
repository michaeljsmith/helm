import { PhysicsBody } from "../../physics/physics-body.js";

export type PhysicsBodyArtifact = {
  type: "physics-body-artifact";
  body: PhysicsBody;
};

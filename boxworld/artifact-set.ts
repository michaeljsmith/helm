import { Artifact } from "./artifacts/artifact.js";
import { Camera } from "./camera.js";

export type ArtifactSet = {
  camera: Camera;
  artifacts: Iterable<Artifact>;
};

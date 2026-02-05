import { ModelInstanceArtifact } from "./model-instance-artifact.js";
import { PhysicsBodyArtifact } from "./physics-body-artifact.js";
import { TerrainChunkArtifact } from "./terrain-chunk-artifact.js";

export type Artifact =
  | ModelInstanceArtifact
  | TerrainChunkArtifact
  | PhysicsBodyArtifact;

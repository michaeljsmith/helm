import { TerrainChunk } from "../maps/terrain/terrain-chunk.js";

export type TerrainChunkArtifact = {
  type: "terrain-chunk-artifact";
  chunk: TerrainChunk;
};

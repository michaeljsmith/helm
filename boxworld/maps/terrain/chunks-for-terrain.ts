import { TerrainBounds } from "./terrain-bounds.js";

export const CHUNK_SIZE_CELLS = 16;

// TODO: Select chunks to return based on camera position.
export const chunksForTerrain = function* (
  bounds: TerrainBounds,
): Iterable<TerrainBounds> {
  const [left, far] = bounds.origin;
  const [width, depth] = bounds.dimensions;
  for (
    let chunkFar = far;
    chunkFar < far + depth;
    chunkFar += CHUNK_SIZE_CELLS
  ) {
    for (
      let chunkLeft = left;
      chunkLeft < left + width;
      chunkLeft += CHUNK_SIZE_CELLS
    ) {
      const chunkWidth = Math.min(CHUNK_SIZE_CELLS, width - (chunkLeft - left));
      const chunkDepth = Math.min(CHUNK_SIZE_CELLS, depth - (chunkFar - far));
      yield {
        origin: [chunkLeft, chunkFar],
        dimensions: [chunkWidth, chunkDepth],
      };
    }
  }
};

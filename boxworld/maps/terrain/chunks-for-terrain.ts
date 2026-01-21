import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { Aab2 } from "../../../math/aab.js";
import { point2With } from "../../../math/point.js";

export const CHUNK_SIZE_CELLS = 16;

// TODO: Select chunks to return based on camera position.
export const chunksForTerrain = function* (bounds: Aab2): Iterable<Aab2> {
  const left = bounds.center[0] - bounds.dimensions[0];
  const far = bounds.center[1] - bounds.dimensions[1];
  const width = bounds.dimensions[0] * 2;
  const depth = bounds.dimensions[1] * 2;
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
        center: point2With(
          chunkLeft + chunkWidth / 2,
          chunkFar + chunkDepth / 2,
        ),
        dimensions: aabDimensions2With(chunkWidth / 2, chunkDepth / 2),
      };
    }
  }
};

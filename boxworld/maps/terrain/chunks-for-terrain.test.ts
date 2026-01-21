import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { point2With } from "../../../math/point.js";
import { CHUNK_SIZE_CELLS, chunksForTerrain } from "./chunks-for-terrain.js";

describe("chunksForTerrain", () => {
  it("handles empty terrain", () => {
    const chunks = [
      ...chunksForTerrain({
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(0, 0),
      }),
    ];
    expect(chunks).toEqual([]);
  });

  it("handles single chunk", () => {
    const chunks = [
      ...chunksForTerrain({
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(1, 1),
      }),
    ];
    expect(chunks).toEqual([
      { origin: point2With(1, 2), dimensions: aabDimensions2With(1, 1) },
    ]);
  });

  it("handles two chunks horizontally", () => {
    const chunks = [
      ...chunksForTerrain({
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(CHUNK_SIZE_CELLS + 1, 1),
      }),
    ];
    expect(chunks).toEqual([
      {
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(CHUNK_SIZE_CELLS, 1),
      },
      {
        origin: point2With(CHUNK_SIZE_CELLS + 1, 2),
        dimensions: aabDimensions2With(1, 1),
      },
    ]);
  });

  it("handles two chunks vertically", () => {
    const chunks = [
      ...chunksForTerrain({
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(1, CHUNK_SIZE_CELLS + 1),
      }),
    ];
    expect(chunks).toEqual([
      {
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(1, CHUNK_SIZE_CELLS),
      },
      {
        origin: point2With(1, CHUNK_SIZE_CELLS + 2),
        dimensions: aabDimensions2With(1, 1),
      },
    ]);
  });

  it("handles max size chunks", () => {
    const chunks = [
      ...chunksForTerrain({
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(CHUNK_SIZE_CELLS, CHUNK_SIZE_CELLS),
      }),
    ];
    expect(chunks).toEqual([
      {
        origin: point2With(1, 2),
        dimensions: aabDimensions2With(CHUNK_SIZE_CELLS, CHUNK_SIZE_CELLS),
      },
    ]);
  });
});

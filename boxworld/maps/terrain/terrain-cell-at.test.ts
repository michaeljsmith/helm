import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { point2With } from "../../../math/point.js";
import { terrainCellAt } from "./terrain-cell-at.js";
import { Terrain } from "./terrain.js";

describe("terrainCellAt", () => {
  it("looks up cells", () => {
    const terrain: Terrain = {
      bounds: {
        center: point2With(2, 4),
        dimensions: aabDimensions2With(1, 1),
      },
      cells: [
        {
          corners: [
            [1, 1],
            [1, 1],
          ],
        },
        {
          corners: [
            [2, 2],
            [2, 2],
          ],
        },
        {
          corners: [
            [3, 3],
            [3, 3],
          ],
        },
        {
          corners: [
            [4, 4],
            [4, 4],
          ],
        },
      ],
    };
    expect(terrainCellAt(terrain, 1, 3).corners).toEqual([
      [1, 1],
      [1, 1],
    ]);
    expect(terrainCellAt(terrain, 2, 3).corners).toEqual([
      [2, 2],
      [2, 2],
    ]);
    expect(terrainCellAt(terrain, 1, 4).corners).toEqual([
      [3, 3],
      [3, 3],
    ]);
    expect(terrainCellAt(terrain, 2, 4).corners).toEqual([
      [4, 4],
      [4, 4],
    ]);
  });

  it("catches out-of-bounds lookup", () => {
    const terrain: Terrain = {
      bounds: {
        center: point2With(1.5, 3.5),
        dimensions: aabDimensions2With(0.5, 0.5),
      },
      cells: [
        {
          corners: [
            [1, 1],
            [1, 1],
          ],
        },
      ],
    };
    expect(() => terrainCellAt(terrain, 2, 3)).toThrow();
    expect(() => terrainCellAt(terrain, 0, 3)).toThrow();
    expect(() => terrainCellAt(terrain, 1, 2)).toThrow();
    expect(() => terrainCellAt(terrain, 1, 4)).toThrow();
  });
});

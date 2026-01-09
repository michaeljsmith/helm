import { terrainCellAt } from "./terrain-cell-at.js";
import { Terrain } from "./terrain.js";

describe("terrainCellAt", () => {
  it("looks up cells", () => {
    const terrain: Terrain = {
      origin: [1, 3],
      dimensions: [2, 2],
      heights: [1, 2, 3, 4],
    };
    expect(terrainCellAt(terrain, 1, 3)).toBe(1);
    expect(terrainCellAt(terrain, 2, 3)).toBe(2);
    expect(terrainCellAt(terrain, 1, 4)).toBe(3);
    expect(terrainCellAt(terrain, 2, 4)).toBe(4);
  });

  it("catches out-of-bounds lookup", () => {
    const terrain: Terrain = {
      origin: [1, 3],
      dimensions: [1, 1],
      heights: [1],
    };
    expect(() => terrainCellAt(terrain, 2, 3)).toThrow();
    expect(() => terrainCellAt(terrain, 0, 3)).toThrow();
    expect(() => terrainCellAt(terrain, 1, 2)).toThrow();
    expect(() => terrainCellAt(terrain, 1, 4)).toThrow();
  });
});

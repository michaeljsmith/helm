import { layer as newLayer } from "../layers/layer-layout.js";
import { terrainCellAt } from "./terrain-cell-at.js";
import { terrainFromLayers } from "./terrain-from-layers.js";

describe("terrainFromLayers", () => {
  it("constructs terrain from single layer with size 1", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 0, 2], [1, 1, 1]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.origin).toEqual([1, 2]);
    expect(terrain.bounds.dimensions).toEqual([1, 1]);
    const height = terrainCellAt(terrain, 1, 2);
    expect(height).toBe(12);
  });

  it("constructs terrain from single layer with larger size", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 0, 2], [2, 1, 2]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.origin).toEqual([0, 1]);
    expect(terrain.bounds.dimensions).toEqual([2, 2]);
    expect(terrainCellAt(terrain, 0, 1)).toBe(1);
    expect(terrainCellAt(terrain, 0, 2)).toBe(2);
    expect(terrainCellAt(terrain, 1, 1)).toBe(11);
    expect(terrainCellAt(terrain, 1, 2)).toBe(12);
  });
});

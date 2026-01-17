import { layer as newLayer } from "../layers/layer-layout.js";
import { terrainCellAt } from "./terrain-cell-at.js";
import { terrainFromLayers } from "./terrain-from-layers.js";
import { TERRAIN_HOLE } from "./terrain-height.js";

describe("terrainFromLayers", () => {
  it("constructs terrain from single layer with size 1", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 0, 2], [1, 1, 1]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.origin).toEqual([1, 1]);
    expect(terrain.bounds.dimensions).toEqual([1, 1]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height).toBe(11);
  });

  it("constructs terrain from single layer with larger size", () => {
    const layerLayout = newLayer((x, y) => 10 * x + y);
    const layer = layerLayout.construct([1, 0, 2], [2, 1, 2]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.origin).toEqual([0, 0]);
    expect(terrain.bounds.dimensions).toEqual([2, 2]);
    expect(terrainCellAt(terrain, 0, 0)).toBe(0);
    expect(terrainCellAt(terrain, 0, 1)).toBe(1);
    expect(terrainCellAt(terrain, 1, 0)).toBe(10);
    expect(terrainCellAt(terrain, 1, 1)).toBe(11);
  });

  it("constructs terrain from multiple layers", () => {
    const layerLayout1 = newLayer((x, y) => 10 * x + y);
    const layer1 = layerLayout1.construct([1, 0, 2], [1, 1, 1]);
    const layerLayout2 = newLayer((x, y) => 10 * x + y);
    const layer2 = layerLayout2.construct([1, 0, 4], [1, 1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    expect(terrain.bounds.origin).toEqual([1, 1]);
    expect(terrain.bounds.dimensions).toEqual([1, 3]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height).toBe(11);
  });

  it("sums multiple layers", () => {
    const layerLayout1 = newLayer((_x, _y) => 1);
    const layer1 = layerLayout1.construct([1, 0, 2], [1, 1, 1]);
    const layerLayout2 = newLayer((_x, _y) => 2);
    const layer2 = layerLayout2.construct([1, 0, 2], [1, 1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height).toBe(3);
  });

  it("overwrites hole", () => {
    const layerLayout1 = newLayer((_x, _y) => TERRAIN_HOLE);
    const layer1 = layerLayout1.construct([1, 0, 2], [1, 1, 1]);
    const layerLayout2 = newLayer((_x, _y) => 2);
    const layer2 = layerLayout2.construct([1, 0, 2], [1, 1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height).toBe(2);
  });

  it("overwrites hole", () => {
    const layerLayout1 = newLayer((_x, _y) => 1);
    const layer1 = layerLayout1.construct([1, 0, 2], [1, 1, 1]);
    const layerLayout2 = newLayer((_x, _y) => TERRAIN_HOLE);
    const layer2 = layerLayout2.construct([1, 0, 2], [1, 1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height).toBe(TERRAIN_HOLE);
  });
});

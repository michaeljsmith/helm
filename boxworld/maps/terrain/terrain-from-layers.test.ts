import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { point2With } from "../../../math/point.js";
import { layer as newLayer } from "../layers/layer-layout.js";
import { terrainCellAt } from "./terrain-cell-at.js";
import { terrainFromLayers } from "./terrain-from-layers.js";
import { TERRAIN_HOLE } from "./terrain-height.js";

describe("terrainFromLayers", () => {
  it("constructs terrain from single layer with size 1", () => {
    const layerLayout = newLayer(
      () =>
        ([x, y]) =>
          10 * x + y,
    );
    const layer = layerLayout.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.center).toEqual(point2With(1.5, 1.5));
    expect(terrain.bounds.dimensions).toEqual(aabDimensions2With(0.5, 0.5));
    const height = terrainCellAt(terrain, 1, 1);
    expect(height.corners).toEqual([
      [11, 21],
      [12, 22],
    ]);
  });

  it("constructs terrain from single layer with larger size", () => {
    const layerLayout = newLayer(
      () =>
        ([x, y]) =>
          10 * x + y,
    );
    const layer = layerLayout.construct([1, 2], [2, 2]);
    const terrain = terrainFromLayers([layer]);
    expect(terrain.bounds.center).toEqual(point2With(1, 1));
    expect(terrain.bounds.dimensions).toEqual(aabDimensions2With(1, 1));
    expect(terrainCellAt(terrain, 0, 0).corners).toEqual([
      [0, 10],
      [1, 11],
    ]);
    expect(terrainCellAt(terrain, 0, 1).corners).toEqual([
      [1, 11],
      [2, 12],
    ]);
    expect(terrainCellAt(terrain, 1, 0).corners).toEqual([
      [10, 20],
      [11, 21],
    ]);
    expect(terrainCellAt(terrain, 1, 1).corners).toEqual([
      [11, 21],
      [12, 22],
    ]);
  });

  it("constructs terrain from multiple layers", () => {
    const layerLayout1 = newLayer(
      () =>
        ([x, y]) =>
          10 * x + y,
    );
    const layer1 = layerLayout1.construct([1, 2], [1, 1]);
    const layerLayout2 = newLayer(
      () =>
        ([x, y]) =>
          10 * x + y,
    );
    const layer2 = layerLayout2.construct([1, 4], [1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    expect(terrain.bounds.center).toEqual(point2With(1.5, 2.5));
    expect(terrain.bounds.dimensions).toEqual(aabDimensions2With(0.5, 1.5));
    const height = terrainCellAt(terrain, 1, 1);
    expect(height.corners).toEqual([
      [11, 21],
      [12, 22],
    ]);
  });

  it("sums multiple layers", () => {
    const layerLayout1 = newLayer(() => (_position) => 1);
    const layer1 = layerLayout1.construct([1, 2], [1, 1]);
    const layerLayout2 = newLayer(() => (_position) => 2);
    const layer2 = layerLayout2.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height.corners).toEqual([
      [3, 3],
      [3, 3],
    ]);
  });

  it("overwrites hole", () => {
    const layerLayout1 = newLayer(() => (_position) => TERRAIN_HOLE);
    const layer1 = layerLayout1.construct([1, 2], [1, 1]);
    const layerLayout2 = newLayer(() => (_position) => 2);
    const layer2 = layerLayout2.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height.corners).toEqual([
      [2, 2],
      [2, 2],
    ]);
  });

  it("overwrites hole", () => {
    const layerLayout1 = newLayer(() => (_position) => 1);
    const layer1 = layerLayout1.construct([1, 2], [1, 1]);
    const layerLayout2 = newLayer(() => (_position) => TERRAIN_HOLE);
    const layer2 = layerLayout2.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer1, layer2]);
    const height = terrainCellAt(terrain, 1, 1);
    expect(height.corners).toEqual([
      [TERRAIN_HOLE, TERRAIN_HOLE],
      [TERRAIN_HOLE, TERRAIN_HOLE],
    ]);
  });
});

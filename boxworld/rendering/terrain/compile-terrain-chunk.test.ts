import { layer as newLayer } from "../../maps/layers/layer-layout.js";
import { terrainFromLayers } from "../../maps/terrain/terrain-from-layers.js";
import { compileTerrainChunk } from "./compile-terrain-chunk.js";

describe("compileTerrainChunk", () => {
  it("compiles terrain chunk with single cell", () => {
    const layerLayout = newLayer((_x, _y) => 1);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer]);
    const chunk = compileTerrainChunk(terrain, {
      origin: [1, 1],
      dimensions: [1, 1],
    });
    expect(chunk).toMatchSnapshot();
  });

  it("compiles terrain chunk with multiple cells", () => {
    const layerLayout = newLayer((x, y) => x + y);
    const layer = layerLayout.construct([1, 0], [2, 2]);
    const terrain = terrainFromLayers([layer]);
    const chunk = compileTerrainChunk(terrain, {
      origin: [0, -2],
      dimensions: [2, 2],
    });
    expect(chunk).toMatchSnapshot();
  });
});

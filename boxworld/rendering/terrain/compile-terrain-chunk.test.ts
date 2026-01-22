import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { point2With } from "../../../math/point.js";
import { layer as newLayer } from "../../maps/layers/layer-layout.js";
import { terrainFromLayers } from "../../maps/terrain/terrain-from-layers.js";
import { compileTerrainChunk } from "./compile-terrain-chunk.js";

describe("compileTerrainChunk", () => {
  it("compiles terrain chunk with single cell", () => {
    const layerLayout = newLayer(() => (_position) => 1);
    const layer = layerLayout.construct([1, 2], [1, 1]);
    const terrain = terrainFromLayers([layer]);
    const chunk = compileTerrainChunk(terrain, {
      center: point2With(1.5, 1.5),
      dimensions: aabDimensions2With(0.5, 0.5),
    });
    expect(chunk).toMatchSnapshot();
  });

  it("compiles terrain chunk with multiple cells", () => {
    const layerLayout = newLayer(
      () =>
        ([x, y]) =>
          x + y,
    );
    const layer = layerLayout.construct([1, 0], [2, 2]);
    const terrain = terrainFromLayers([layer]);
    const chunk = compileTerrainChunk(terrain, {
      center: point2With(1, -1),
      dimensions: aabDimensions2With(1, 1),
    });
    expect(chunk).toMatchSnapshot();
  });
});

import { checkThat } from "../../../utils/preconditions/check-that.js";
import { LiteralLayout } from "../layouts/layout.js";
import { TerrainHeight } from "../terrain/terrain-height.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";

export const layer = (
  heightAt: (x: number, z: number) => TerrainHeight,
): LiteralLayout<TerrainLayer> => ({
  type: "literal-layout",
  construct: (start, size) => {
    const [width, _height, depth] = size;
    const [startX, _startY, startZ] = start;
    const layerSize: [number, number] = [width, depth];
    const left = startX - (width >> 1);
    const far = startZ - depth;
    const origin: [number, number] = [left, far];
    const layer: TerrainLayer = {
      origin,
      dimensions: layerSize,
      heightAt: (x, z) => {
        checkThat(x >= left);
        checkThat(x < left + width);
        checkThat(z >= far);
        checkThat(z < far + depth);
        return heightAt(x, z);
      },
    };
    return layer;
  },
});

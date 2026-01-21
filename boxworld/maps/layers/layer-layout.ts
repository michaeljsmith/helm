import { aabDimensions2With } from "../../../math/aab-dimensions.js";
import { Aab2 } from "../../../math/aab.js";
import { Point2, point2With } from "../../../math/point.js";
import { checkThat } from "../../../utils/preconditions/check-that.js";
import { LiteralLayout } from "../layouts/layout.js";
import { TerrainHeight } from "../terrain/terrain-height.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";

export const layer = (
  heightAt: (args: { position: Point2; bounds: Aab2 }) => TerrainHeight,
): LiteralLayout<TerrainLayer> => ({
  type: "literal-layout",
  construct: (start, size) => {
    const [width, depth] = size;
    const [startX, startZ] = start;
    const dimensions = aabDimensions2With(width / 2, depth / 2);
    const left = startX - (width >> 1);
    const far = startZ - depth;
    const center = point2With(left + width / 2, far + depth / 2);
    const bounds: Aab2 = { center, dimensions };
    const layer: TerrainLayer = {
      bounds,
      heightAt: (x, z) => {
        checkThat(x >= left);
        checkThat(x <= left + width);
        checkThat(z >= far);
        checkThat(z <= far + depth);
        return heightAt({ position: point2With(x, z), bounds });
      },
    };
    return layer;
  },
});

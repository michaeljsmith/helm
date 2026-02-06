import { LiteralLayout } from "../layouts/layout.js";
import { TerrainHeight } from "../terrain/terrain-height.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";
import { layer } from "./layer-layout.js";

export function flat(height: TerrainHeight): LiteralLayout<TerrainLayer> {
  return layer((_bounds) => (_position) => height);
}

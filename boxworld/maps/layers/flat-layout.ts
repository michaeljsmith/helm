import { LiteralLayout } from "../layouts/layout.js";
import { TerrainHeight } from "../terrain/terrain-height.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";
import { layer } from "./layer-layout.js";

export const flat = (height: TerrainHeight): LiteralLayout<TerrainLayer> =>
  layer((_bounds) => (_position) => height);

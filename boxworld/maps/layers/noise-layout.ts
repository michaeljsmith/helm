import {
  compositePerlinNoise,
  PerlinNoiseOctave,
} from "../../../geometry/fields/noise/composite-perlin-noise.js";
import { LiteralLayout } from "../layouts/layout.js";
import { TerrainLayer } from "../terrain/terrain-layer.js";
import { layer } from "./layer-layout.js";

export const noise = (
  seed: number,
  octaves: PerlinNoiseOctave[],
): LiteralLayout<TerrainLayer> => {
  const roundPrecision = 0.25;
  const round = (x: number) => roundPrecision * Math.round(x / roundPrecision);
  const noise = compositePerlinNoise(seed, octaves);
  return layer((_bounds) => (position) => round(noise(position)));
};

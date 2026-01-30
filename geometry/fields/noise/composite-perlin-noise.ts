import { Point2, point2With } from "../../../math/point.js";
import { perlinNoise } from "./perlin-noise.js";

export type PerlinNoiseOctave = {
  frequency: number;
  amplitude: number;
};

export const compositePerlinNoise = (
  seed: number,
  octaves: PerlinNoiseOctave[],
): ((position: Point2) => number) => {
  const octavesWithNoise = octaves.map((octave) => ({
    noise: perlinNoise(seed),
    ...octave,
  }));

  return ([x, y]): number => {
    return octavesWithNoise
      .map(
        ({ amplitude, frequency, noise }): number =>
          amplitude * noise(point2With(x * frequency, y * frequency)),
      )
      .reduce((l, r) => l + r);
  };
};

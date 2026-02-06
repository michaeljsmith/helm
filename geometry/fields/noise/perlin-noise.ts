import { dotProduct2 } from "../../../math/dot-product.js";
import { normalize2 } from "../../../math/normalize.js";
import { Offset2, offset2With } from "../../../math/offset.js";
import { Point2, point2With } from "../../../math/point.js";
import { smoothStep } from "../../../math/smooth-step.js";
import { vectorDifference2 } from "../../../math/vector-difference.js";
import { checkThat } from "../../../utils/preconditions/check-that.js";

export function perlinNoise(seed: number): (position: Point2) => number {
  return (position): number => {
    const cellX = Math.floor(position[0]);
    const cellY = Math.floor(position[1]);

    const offsets = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const dotProducts = offsets.map(([yOffset, xOffset]) => {
      const gradientVector = gradientVectorAt(
        seed,
        point2With(cellX + xOffset, cellY + yOffset),
      );

      const displacement = vectorDifference2(
        position,
        point2With(cellX + xOffset, cellY + yOffset),
      );

      return dotProduct2(gradientVector, displacement);
    });

    const fractionX = position[0] - cellX;
    const fractionY = position[1] - cellY;
    const [topLeft, topRight, bottomLeft, bottomRight] = dotProducts;
    const top = interpolate(topLeft, topRight, fractionX);
    const bottom = interpolate(bottomLeft, bottomRight, fractionX);
    return interpolate(top, bottom, fractionY);
  };
}

const gradientVectorTable: Offset2[] = [
  normalize2(offset2With(-1.0, -1.0)),
  normalize2(offset2With(0.0, -1.0)),
  normalize2(offset2With(1.0, -1.0)),
  normalize2(offset2With(1.0, 0.0)),
  normalize2(offset2With(1.0, 1.0)),
  normalize2(offset2With(0.0, 1.0)),
  normalize2(offset2With(-1.0, 1.0)),
  normalize2(offset2With(-1.0, 0.0)),
];

// position is expected to be integral.
function gradientVectorAt(seed: number, position: Point2): Offset2 {
  // const hash =
  //   (position[0] * 11 + position[1] * 7 + seed) % gradientVectorTable.length;
  const hash = hashPoint(seed, position);
  checkThat(hash >= 0);
  checkThat(hash < 1);
  const index = Math.floor(hash * gradientVectorTable.length);
  console.log(`index: ${index}, hash: ${hash}, position: ${position}`);
  return gradientVectorTable[index];
}

function hashPoint(seed: number, point: Point2): number {
  // Offset the coordinate by the seed
  //point = vectorAdd2(point, offset2With(seed * 1.234, seed * 1.902)); // Use a multiplier to avoid diagonal symmetry
  // IQ Hash.
  const x = offset2With(
    fractionalPart(point[0] * 123.34),
    fractionalPart(point[1] * 456.21),
  );
  const y = dotProduct2(
    x,
    offset2With(x[0] + 45.32 + seed, x[1] + 45.32 + seed),
  );
  const z = offset2With(x[0] + y, x[1] + y);
  const result = z[0] * z[1];
  return fractionalPart(result);
}

function fractionalPart(x: number): number {
  return x - Math.floor(x);
}

function interpolate(x0: number, x1: number, t: number): number {
  return x0 + (x1 - x0) * smoothStep(t);
}

import { Aab2 } from "../../../math/aab.js";
import { crossProduct } from "../../../math/cross-product.js";
import { Direction } from "../../../math/direction.js";
import { normalize } from "../../../math/normalize.js";
import { Point, pointWith } from "../../../math/point.js";
import { vectorDifference } from "../../../math/vector-difference.js";
import { terrainCellAt } from "../../maps/terrain/terrain-cell-at.js";
import { TERRAIN_HOLE } from "../../maps/terrain/terrain-height.js";
import { Terrain } from "../../maps/terrain/terrain.js";
import { TerrainRenderChunk } from "./terrain-render-chunk.js";

const CELL_SIZE = 1.0;

export function compileTerrainChunk(
  terrain: Terrain,
  bounds: Aab2,
): TerrainRenderChunk {
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const center = bounds.center;
  const dimensions = bounds.dimensions;
  const left = center[0] - dimensions[0];
  const far = center[1] - dimensions[1];
  const width = dimensions[0] * 2;
  const depth = dimensions[1] * 2;
  const right = left + width;
  const near = far + depth;
  for (let z = far; z < near; ++z) {
    for (let x = left; x < right; ++x) {
      const cell = terrainCellAt(terrain, x, z);

      if (
        cell.corners[0][0] === TERRAIN_HOLE ||
        cell.corners[0][1] === TERRAIN_HOLE ||
        cell.corners[1][0] === TERRAIN_HOLE ||
        cell.corners[1][1] === TERRAIN_HOLE
      ) {
        continue;
      }
      const corners = cell.corners as [[number, number], [number, number]];

      const i0 = positions.length / 3;

      function vertexPositionFor(corner: number): Point {
        const sideX = (corner & 2) >> 1;
        const sideZ = ((corner + 1) & 2) >> 1;
        const height = corners[sideZ][sideX];
        return pointWith(
          (x + sideX) * CELL_SIZE,
          height * CELL_SIZE,
          (z + sideZ) * CELL_SIZE,
        );
      }

      const p1 = vertexPositionFor(1);
      const p0 = vertexPositionFor(0);
      const p3 = vertexPositionFor(3);
      const forwardAlongPath = vectorDifference(p1, p0);
      const rightAlongPath = vectorDifference(p3, p0);
      const normal: Direction = normalize(
        crossProduct(forwardAlongPath, rightAlongPath),
      );
      for (let corner = 0; corner < 4; ++corner) {
        positions.push(...vertexPositionFor(corner));
        normals.push(...normal);
        colors.push(0, 1, 0);
      }

      indices.push(i0 + 0, i0 + 1, i0 + 2, i0 + 2, i0 + 3, i0 + 0);
    }
  }

  return {
    positions,
    normals,
    colors,
    indices,
  };
}

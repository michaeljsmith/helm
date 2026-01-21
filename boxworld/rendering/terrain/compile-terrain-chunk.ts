import { TerrainBounds } from "../../maps/terrain/terrain-bounds.js";
import { terrainCellAt } from "../../maps/terrain/terrain-cell-at.js";
import { TERRAIN_HOLE } from "../../maps/terrain/terrain-height.js";
import { Terrain } from "../../maps/terrain/terrain.js";
import { TerrainRenderChunk } from "./terrain-render-chunk.js";

const cellSize = 1.0;

export const compileTerrainChunk = (
  terrain: Terrain,
  bounds: TerrainBounds,
): TerrainRenderChunk => {
  const positions: number[] = [];
  const normals: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const [left, far] = bounds.origin;
  const [width, depth] = bounds.dimensions;
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
      for (let corner = 0; corner < 4; ++corner) {
        const sideX = (corner & 2) >> 1;
        const sideZ = ((corner + 1) & 2) >> 1;
        const height = corners[sideZ][sideX];
        positions.push(
          (x + sideX) * cellSize,
          height * cellSize,
          (z + sideZ) * cellSize,
        );
        normals.push(0, 1, 0);
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
};

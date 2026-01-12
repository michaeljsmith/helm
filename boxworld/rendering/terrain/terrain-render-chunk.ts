import { Aab } from "../../../math/aab.js";

export type TerrainRenderChunk = {
  bounds: Aab;
  positions: number[];
  normals: number[];
  colors: number[];
  indices: number[];
};

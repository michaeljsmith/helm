import { Aab2 } from "../../../math/aab.js";
import { Terrain } from "./terrain.js";

export type TerrainChunk = {
  terrain: Terrain;
  bounds: Aab2;
};

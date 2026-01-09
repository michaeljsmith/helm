export const TERRAIN_HOLE = Symbol();
export type TerrainHole = typeof TERRAIN_HOLE;
export type TerrainHeight = number | TerrainHole;

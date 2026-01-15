import { Artifact } from "./boxworld/artifacts/artifact.js";
import { color3With } from "./boxworld/color.js";
import { flat } from "./boxworld/maps/layers/flat-layout.js";
import { applyLayout } from "./boxworld/maps/layouts/apply-layout.js";
import { fixed, series } from "./boxworld/maps/layouts/layout.js";
import { chunksForTerrain } from "./boxworld/maps/terrain/chunks-for-terrain.js";
import { terrain } from "./boxworld/maps/terrain/terrain-from-layers.js";
import { Terrain } from "./boxworld/maps/terrain/terrain.js";
import { addModel } from "./boxworld/models/creation/add-model.js";
import { newModel } from "./boxworld/models/creation/new-model.js";
import { aabDimensionsWith } from "./math/aab-dimensions.js";
import { IDENTITY_RIGID } from "./math/rigid-transform.js";

const terrains = [
  ...applyLayout(
    terrain(series([fixed([2, 1, 2], flat(-1)), fixed([2, 1, 2], flat(0))])),
  ),
];

const model = newModel((context) => {
  addModel(context, {
    type: "box-model",
    color: color3With(255, 255, 0),
    dimensions: aabDimensionsWith(1, 1, 1),
  });
});

export const world = (): Iterable<Artifact> => [
  {
    ...artifactsForTerrain(terrains),
    type: "model-instance-artifact",
    instance: {
      model,
      transform: IDENTITY_RIGID,
    },
  },
];

const artifactsForTerrain = function* (
  terrains: Iterable<Terrain>,
): Iterable<Artifact> {
  for (const terrain of terrains) {
    for (const chunkBounds of chunksForTerrain(terrain.bounds)) {
      yield {
        type: "terrain-chunk-artifact",
        chunk: { terrain, bounds: chunkBounds },
      };
    }
  }
};
